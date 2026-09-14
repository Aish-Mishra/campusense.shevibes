import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Type } from "@google/genai";
import dotenv from "dotenv";
import { parseCampusNoticeLocal, answerNoticeQuestionLocal } from "./localNoticeParser.ts";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json({ limit: "10mb" }));

// Lazy initialization of Gemini client
let aiClient: GoogleGenAI | null = null;
function getGeminiClient(): GoogleGenAI | null {
  if (!process.env.GEMINI_API_KEY) {
    console.warn("GEMINI_API_KEY environment variable is missing.");
    return null;
  }
  if (!aiClient) {
    aiClient = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });
  }
  return aiClient;
}

// Health check
app.get("/api/health", (_req, res) => {
  res.json({
    status: "ok",
    hasApiKey: Boolean(process.env.GEMINI_API_KEY),
    timestamp: new Date().toISOString(),
  });
});

// Clarify Notice Endpoint
app.post("/api/clarify-notice", async (req, res) => {
  try {
    const { rawText, sourceType = "circular", studentContext } = req.body;

    if (!rawText || typeof rawText !== "string" || rawText.trim().length === 0) {
      return res.status(400).json({ error: "Announcement text is required." });
    }

    const ai = getGeminiClient();

    const systemPrompt = `You are "CampuSense AI", an elite university assistant specifically dedicated to helping first-year college students ("freshers").
Campus circulars, administration notices, and WhatsApp forwards are notorious for being bureaucratic, intimidating, vague, full of academic acronyms, or lacking clear action items.
Your job is to digest the announcement and output an ultra-clear, structured, jargon-free action guide for freshers.

Analyze the announcement carefully. Extract:
1. Clear descriptive title (not bureaucratic like "Circular Ref No 412/DSW/2026").
2. Department/Issuing authority.
3. Urgency level: "CRITICAL" (deadline within 48h or academic penalty), "IMPORTANT" (important procedure, longer window), or "INFORMATIONAL" (updates, talks, club drives, advisory).
4. Concrete deadline (date and time if given or inferred, else null) and whether it is strictly enforced.
5. Plain English TL;DR in 2-3 sentences explaining what is actually happening in student-friendly words.
6. Target audience: Exactly who must act (e.g. 1st year B.Tech, Hostelers only), who is exempt, and if student profile provided (${JSON.stringify(studentContext || {})}), whether this student must act.
7. Ordered Step-by-Step Action Checklist with physical location/room number, window hours, and exact documents/items to carry.
8. Decoded Jargon: Demystify cryptic college terms (e.g. ERP, Bonafide, Self-attestation, DSW, Proctorial, Backlog challan, TC/Migration, Anti-Ragging affidavit).
9. "What happens if I ignore this?" - The honest consequence (e.g. fine, hall ticket withheld, or zero penalty).
10. Key Office/Counter contact location & hours.
11. A clean, formatted WhatsApp-ready message with emojis suitable for class representatives to paste directly into Fresher WhatsApp batches.`;

    if (!ai) {
      const fallbackResult = parseCampusNoticeLocal(rawText, sourceType, studentContext);
      return res.json(fallbackResult);
    }

    const prompt = `Announcement Source Type: ${sourceType}
Student Profile: ${JSON.stringify(studentContext || { year: "1st Year", branch: "All", residence: "All" })}

ANNOUNCEMENT TEXT TO CLARIFY:
---
${rawText}
---`;

    try {
      const response = await ai.models.generateContent({
        model: "gemini-3.8-flash",
        contents: prompt,
        config: {
          systemInstruction: systemPrompt,
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              title: { type: Type.STRING },
              department: { type: Type.STRING },
              urgency: { type: Type.STRING, enum: ["CRITICAL", "IMPORTANT", "INFORMATIONAL"] },
              deadline: { type: Type.STRING, nullable: true },
              isDeadlineStrict: { type: Type.BOOLEAN },
              tldr: { type: Type.STRING },
              whoNeedsToAct: {
                type: Type.OBJECT,
                properties: {
                  appliesTo: { type: Type.STRING },
                  exempt: { type: Type.STRING },
                  matchVerdict: { type: Type.STRING, enum: ["MUST_ACT", "OPTIONAL", "NOT_APPLICABLE", "GENERAL"] },
                },
                required: ["appliesTo", "exempt", "matchVerdict"],
              },
              actionSteps: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    order: { type: Type.INTEGER },
                    title: { type: Type.STRING },
                    description: { type: Type.STRING },
                    location: { type: Type.STRING },
                    itemsToBring: {
                      type: Type.ARRAY,
                      items: { type: Type.STRING },
                    },
                  },
                  required: ["order", "title", "description", "location", "itemsToBring"],
                },
              },
              jargonDecoded: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    term: { type: Type.STRING },
                    explanation: { type: Type.STRING },
                  },
                  required: ["term", "explanation"],
                },
              },
              consequencesIfMissed: { type: Type.STRING },
              contactOrOffice: { type: Type.STRING },
              whatsappSummary: { type: Type.STRING },
            },
            required: [
              "title",
              "department",
              "urgency",
              "isDeadlineStrict",
              "tldr",
              "whoNeedsToAct",
              "actionSteps",
              "jargonDecoded",
              "consequencesIfMissed",
              "contactOrOffice",
              "whatsappSummary",
            ],
          },
        },
      });

      const parsed = JSON.parse(response.text || "{}");
      return res.json(parsed);
    } catch (geminiError: any) {
      console.warn(
        "Gemini API returned error (falling back to smart local campus parser):",
        geminiError?.message || geminiError
      );
      const fallbackResult = parseCampusNoticeLocal(rawText, sourceType, studentContext);
      return res.json(fallbackResult);
    }
  } catch (error: any) {
    console.error("Error clarifying notice with Gemini:", error);
    const fallbackResult = parseCampusNoticeLocal(req.body?.rawText || "", req.body?.sourceType, req.body?.studentContext);
    return res.json(fallbackResult);
  }
});

// Interactive Q&A for a specific notice
app.post("/api/ask-notice", async (req, res) => {
  try {
    const { noticeText, noticeSummary, question, studentContext } = req.body;

    if (!question || typeof question !== "string") {
      return res.status(400).json({ error: "Question is required." });
    }

    const ai = getGeminiClient();
    if (!ai) {
      const localAns = answerNoticeQuestionLocal(question, noticeText, noticeSummary, studentContext);
      return res.json({ answer: localAns });
    }

    const prompt = `You are a helpful, knowledgeable senior university mentor answering a fresher's specific question about a campus announcement.
Be direct, clear, reassuring, and practical. Highlight any potential pitfalls (like missing stamps or wrong counters).

ORIGINAL NOTICE:
${noticeText || "N/A"}

NOTICE SUMMARY:
${JSON.stringify(noticeSummary || {})}

STUDENT CONTEXT:
${JSON.stringify(studentContext || { year: "1st Year", branch: "Freshman" })}

FRESHER'S QUESTION:
"${question}"

Provide a direct, friendly 2 to 4 sentence answer. Use bullet points if listing items.`;

    try {
      const response = await ai.models.generateContent({
        model: "gemini-3.8-flash",
        contents: prompt,
      });

      return res.json({ answer: response.text });
    } catch (geminiErr: any) {
      console.warn(
        "Gemini Q&A API returned error (falling back to local answer engine):",
        geminiErr?.message || geminiErr
      );
      const localAns = answerNoticeQuestionLocal(question, noticeText, noticeSummary, studentContext);
      return res.json({ answer: localAns });
    }
  } catch (error: any) {
    console.error("Error asking question:", error);
    const localAns = answerNoticeQuestionLocal(
      req.body?.question || "",
      req.body?.noticeText,
      req.body?.noticeSummary,
      req.body?.studentContext
    );
    return res.json({ answer: localAns });
  }
});

// Setup Vite middleware for development or serve dist for production
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (_req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
