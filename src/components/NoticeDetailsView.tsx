import React, { useState } from 'react';
import {
  Clock,
  MapPin,
  CheckCircle2,
  Circle,
  AlertCircle,
  Building,
  Copy,
  Check,
  Send,
  ArrowLeft,
  Share2,
  FileCheck,
  HelpCircle,
  AlertTriangle,
  Users,
  Sparkles,
  Printer,
  ChevronRight,
  ShieldAlert,
} from 'lucide-react';
import { ClarifiedNotice, FresherProfile } from '../types';

interface NoticeDetailsViewProps {
  notice: ClarifiedNotice;
  profile: FresherProfile;
  onToggleStep: (noticeId: string, stepOrder: number) => void;
  onBackToBoard: () => void;
  onNewNotice: () => void;
  onAskQuestion: (question: string) => Promise<string>;
}

export const NoticeDetailsView: React.FC<NoticeDetailsViewProps> = ({
  notice,
  profile,
  onToggleStep,
  onBackToBoard,
  onNewNotice,
  onAskQuestion,
}) => {
  const [copiedWhatsapp, setCopiedWhatsapp] = useState(false);
  const [userQuestion, setUserQuestion] = useState('');
  const [qaHistory, setQaHistory] = useState<Array<{ q: string; a: string }>>([]);
  const [isAsking, setIsAsking] = useState(false);

  const completedSteps = notice.userCompletedSteps || [];
  const totalSteps = notice.actionSteps.length;
  const progressPercent = totalSteps > 0 ? Math.round((completedSteps.length / totalSteps) * 100) : 0;

  const handleCopyWhatsapp = async () => {
    try {
      await navigator.clipboard.writeText(notice.whatsappSummary);
      setCopiedWhatsapp(true);
      setTimeout(() => setCopiedWhatsapp(false), 2500);
    } catch (e) {
      console.error(e);
    }
  };

  const handleSendQuestion = async (customQ?: string) => {
    const q = (customQ || userQuestion).trim();
    if (!q || isAsking) return;

    setIsAsking(true);
    setUserQuestion('');
    try {
      const ans = await onAskQuestion(q);
      setQaHistory((prev) => [...prev, { q, a: ans }]);
    } catch (err: any) {
      setQaHistory((prev) => [
        ...prev,
        {
          q,
          a: 'Senior Mentor server is busy right now. As a safe rule of thumb: always carry 2 spare self-attested photocopies of whatever document you are submitting.',
        },
      ]);
    } finally {
      setIsAsking(false);
    }
  };

  const QUICK_QUESTIONS = [
    'What if I have not received original Migration Certificate yet?',
    'Will the verification clerk accept DigiLocker printout?',
    'What is the best time of day to avoid counter rush?',
    'What happens if I miss the deadline by 1 day?',
  ];

  return (
    <div className="space-y-6 pb-16">
      {/* Top Breadcrumb & Actions */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#ebd2db] pb-4">
        <button
          type="button"
          onClick={onBackToBoard}
          className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-[#8c2444] hover:text-[#66122c] bg-white hover:bg-[#fff0f4] px-3.5 py-1.5 rounded-lg transition-all cursor-pointer border border-[#ebd4dc] shadow-paper"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Bulletin</span>
        </button>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => window.print()}
            className="hidden sm:inline-flex items-center gap-1.5 text-xs font-semibold text-[#664b58] bg-white hover:bg-[#faf0f3] px-3 py-1.5 rounded-lg border border-[#ebd4dc] shadow-paper cursor-pointer"
          >
            <Printer className="w-3.5 h-3.5 text-[#8c2444]" />
            <span>Print Checklist</span>
          </button>

          <button
            type="button"
            onClick={onNewNotice}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#8c2444] bg-[#fcedf1] hover:bg-[#fae2e8] px-3.5 py-1.5 rounded-lg border border-[#f0c8d4] transition-all cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#b8325a]" />
            <span>Decode Another Circular</span>
          </button>
        </div>
      </div>

      {/* Main Notice Dossier Header */}
      <div className="bg-white rounded-xl border border-[#ebd0d9] p-6 sm:p-7 shadow-paper space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-2.5 pb-3 border-b border-[#f3dde3]">
          <div className="flex items-center gap-2">
            <span className="font-mono text-[11px] font-bold text-[#8c2444] bg-[#fcedf1] px-2.5 py-0.5 rounded border border-[#f2d0db]">
              {notice.department}
            </span>
            <span className="text-[#ebd0d8]">•</span>
            <span className="text-xs text-[#7d5d6b] font-medium">Official Dispatch</span>
          </div>

          <div className="flex items-center gap-2">
            {notice.urgency === 'CRITICAL' ? (
              <span className="text-xs font-mono font-bold px-2.5 py-1 rounded bg-[#fdf0f3] text-[#991d3c] border border-[#f7ccd7] flex items-center gap-1">
                <ShieldAlert className="w-3.5 h-3.5 text-[#b8325a]" />
                STRICT COMPLIANCE
              </span>
            ) : (
              <span className="text-xs font-mono font-bold px-2.5 py-1 rounded bg-[#fef6ea] text-[#945717] border border-[#fae2c0]">
                GENERAL NOTICE
              </span>
            )}

            {notice.deadline && (
              <span className="text-xs font-mono font-bold px-3 py-1 rounded bg-[#8c2444] text-white flex items-center gap-1.5 shadow-button-press">
                <Clock className="w-3.5 h-3.5 text-rose-200" />
                <span>Cutoff: {notice.deadline}</span>
              </span>
            )}
          </div>
        </div>

        <h1 className="font-serif-heading text-2xl sm:text-3xl font-bold text-[#24131a] leading-tight">
          {notice.title}
        </h1>

        {/* Plain English Translation Block */}
        <div className="p-4 sm:p-5 rounded-lg bg-[#fff8fa] border-l-4 border-l-[#b8325a] border border-[#ebd2dc] space-y-1.5">
          <div className="flex items-center justify-between">
            <span className="font-mono text-[10px] uppercase tracking-wider text-[#8c2444] font-bold">
              The Plain English Meaning:
            </span>
            <span className="text-[11px] text-[#8c6978] italic">Senior Translation</span>
          </div>
          <p className="text-sm sm:text-base text-[#4a323d] leading-relaxed">
            {notice.tldr}
          </p>
        </div>
      </div>

      {/* Main Asymmetrical 2-Column Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left / Primary Column (7 cols): The Checklist & Decoded Terms */}
        <div className="lg:col-span-7 space-y-6">
          {/* Action Checklist */}
          <div className="bg-white rounded-xl border border-[#ebd0d9] p-5 sm:p-6 shadow-paper space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#f3dde3]">
              <div>
                <h2 className="font-serif-heading text-lg sm:text-xl font-bold text-[#24131a] flex items-center gap-2">
                  <FileCheck className="w-5 h-5 text-[#b8325a]" />
                  <span>Physical Action Checklist</span>
                </h2>
                <p className="text-xs text-[#6e505d] mt-0.5">
                  Tick items as you complete them so you don’t forget anything before heading to the counter.
                </p>
              </div>

              <div className="flex items-center gap-2.5 shrink-0">
                <div className="w-24 bg-[#f5e1e7] h-2 rounded-full overflow-hidden">
                  <div
                    className="bg-[#b8325a] h-full transition-all duration-300 rounded-full"
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>
                <span className="font-mono text-xs font-bold text-[#8c2444]">
                  {completedSteps.length}/{totalSteps} done
                </span>
              </div>
            </div>

            {/* Checklist Items */}
            <div className="space-y-3.5">
              {notice.actionSteps.map((step) => {
                const isDone = completedSteps.includes(step.order);
                return (
                  <div
                    key={step.order}
                    onClick={() => onToggleStep(notice.id, step.order)}
                    className={`p-4 rounded-lg border transition-all cursor-pointer flex items-start gap-3.5 ${
                      isDone
                        ? 'bg-[#fcf5f7] border-[#ecd4dc] opacity-75'
                        : 'bg-white border-[#ebd0d9] hover:border-[#b8325a] hover:bg-[#fffafb] shadow-paper'
                    }`}
                  >
                    <button
                      type="button"
                      className="mt-0.5 shrink-0 text-[#b8325a] cursor-pointer"
                    >
                      {isDone ? (
                        <CheckCircle2 className="w-5 h-5 text-[#8c2444] fill-[#fcedf1]" />
                      ) : (
                        <Circle className="w-5 h-5 text-[#bf9fa9]" />
                      )}
                    </button>

                    <div className="space-y-1.5 flex-1 min-w-0">
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <span
                          className={`text-sm font-bold ${
                            isDone ? 'line-through text-[#8c707d]' : 'text-[#26141c]'
                          }`}
                        >
                          Step {step.order}: {step.title}
                        </span>

                        {step.location && (
                          <span className="inline-flex items-center gap-1 text-[11px] font-mono text-[#8c2444] bg-[#fcedf1] px-2 py-0.5 rounded border border-[#f0cdd7] shrink-0">
                            <MapPin className="w-3 h-3 text-[#b8325a]" />
                            <span>{step.location}</span>
                          </span>
                        )}
                      </div>

                      <p className="text-xs text-[#593d4b] leading-relaxed">
                        {step.description}
                      </p>

                      {step.itemsToBring && step.itemsToBring.length > 0 && (
                        <div className="pt-2">
                          <span className="font-mono text-[10px] font-bold text-[#8c5264] uppercase tracking-wider block mb-1">
                            Physical items to carry:
                          </span>
                          <div className="flex flex-wrap gap-1.5">
                            {step.itemsToBring.map((item, i) => (
                              <span
                                key={i}
                                className="text-[11px] bg-[#fff5f7] border border-[#ebd0d9] text-[#78233e] px-2 py-0.5 rounded font-medium"
                              >
                                • {item}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Decoded Campus Jargon in this Notice */}
          {notice.jargonDecoded && notice.jargonDecoded.length > 0 && (
            <div className="bg-white rounded-xl border border-[#ebd0d9] p-5 sm:p-6 shadow-paper space-y-4">
              <div className="flex items-center gap-2 pb-2 border-b border-[#f3dde3]">
                <HelpCircle className="w-4 h-4 text-[#b8325a]" />
                <h2 className="font-serif-heading text-lg font-bold text-[#24131a]">
                  Administrative Terms in this Notice
                </h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {notice.jargonDecoded.map((jargon, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 rounded-lg bg-[#fff8fa] border border-[#ebd4dc] space-y-1"
                  >
                    <div className="text-xs font-bold text-[#8c2444]">
                      {jargon.term}
                    </div>
                    <p className="text-xs text-[#5c404d] leading-relaxed">
                      {jargon.explanation}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Interactive Senior Mentor Q&A */}
          <div className="bg-white rounded-xl border border-[#ebd0d9] p-5 sm:p-6 shadow-paper space-y-4">
            <div className="space-y-1 pb-2 border-b border-[#f3dde3]">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#b8325a]" />
                <h2 className="font-serif-heading text-lg font-bold text-[#24131a]">
                  Ask the Senior Desk
                </h2>
              </div>
              <p className="text-xs text-[#6e505d]">
                Have a specific question about missing certificates, affidavit formats, or counter timings for this notice?
              </p>
            </div>

            {/* Quick Prompt Chips */}
            <div className="flex flex-wrap gap-1.5">
              {QUICK_QUESTIONS.map((q, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => handleSendQuestion(q)}
                  disabled={isAsking}
                  className="text-xs bg-[#fdf5f7] hover:bg-[#fae6ec] border border-[#ebd0d9] text-[#734a58] px-2.5 py-1 rounded transition-all cursor-pointer text-left"
                >
                  {q}
                </button>
              ))}
            </div>

            {/* Chat History */}
            {qaHistory.length > 0 && (
              <div className="space-y-3 pt-2">
                {qaHistory.map((item, idx) => (
                  <div key={idx} className="space-y-2">
                    <div className="bg-[#fcedf1] border border-[#f0c8d4] rounded-lg p-3 text-xs text-[#73263c] font-medium ml-4">
                      <span className="font-bold text-[#8c2444]">You: </span>
                      {item.q}
                    </div>
                    <div className="bg-[#fff9fa] border border-[#ebd2dc] rounded-lg p-3.5 text-xs text-[#3b242e] leading-relaxed whitespace-pre-line mr-4 shadow-paper">
                      <span className="font-bold text-[#8c2444]">Senior Mentor: </span>
                      {item.a}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Input Bar */}
            <div className="flex items-center gap-2 pt-1">
              <input
                type="text"
                value={userQuestion}
                onChange={(e) => setUserQuestion(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') handleSendQuestion();
                }}
                placeholder="Type your question regarding this circular..."
                disabled={isAsking}
                className="flex-1 bg-[#fdfafb] border border-[#edd2db] rounded-lg px-3.5 py-2 text-xs sm:text-sm text-[#24131a] placeholder:text-[#997c88] focus:outline-none focus:bg-white focus:ring-1 focus:ring-[#b8325a]"
              />
              <button
                type="button"
                onClick={() => handleSendQuestion()}
                disabled={isAsking || !userQuestion.trim()}
                className="px-4 py-2 bg-[#b8325a] hover:bg-[#a12448] disabled:opacity-50 text-white rounded-lg text-xs sm:text-sm font-semibold flex items-center gap-1.5 cursor-pointer shadow-button-press transition-all"
              >
                {isAsking ? (
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <>
                    <span>Ask</span>
                    <Send className="w-3.5 h-3.5" />
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Right / Sidebar Column (5 cols): Office Location, Consequence & WhatsApp */}
        <div className="lg:col-span-5 space-y-5">
          {/* Office Location & Timings Card */}
          <div className="bg-white rounded-xl border border-[#ebd0d9] p-5 shadow-paper space-y-3">
            <span className="font-mono text-[10px] uppercase tracking-wider text-[#8c384e] font-bold block">
              Physical Submission Counter
            </span>

            <div className="flex items-start gap-2.5">
              <MapPin className="w-5 h-5 text-[#b8325a] shrink-0 mt-0.5" />
              <div>
                <h3 className="text-sm font-bold text-[#24131a]">
                  {notice.contactOrOffice}
                </h3>
                <p className="text-xs text-[#6e505d] mt-0.5">
                  Counters 2 & 3 • Student Affairs Window
                </p>
              </div>
            </div>

            <div className="p-3 bg-[#fdf6f8] rounded-lg border border-[#f0d4dd] text-xs text-[#6e4e5b] space-y-1">
              <div className="font-semibold text-[#8c2444] text-[11px] flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-[#b8325a]" />
                <span>Working Counter Hours:</span>
              </div>
              <p className="text-[11px] leading-relaxed">
                10:00 AM to 4:00 PM (Monday to Friday). Note: Lunch break is 1:00 PM – 2:00 PM, counters stop accepting tokens by 12:45 PM.
              </p>
            </div>
          </div>

          {/* Who Needs to Act / Who is Exempt */}
          <div className="bg-white rounded-xl border border-[#ebd0d9] p-5 shadow-paper space-y-3">
            <div className="flex items-center gap-2 pb-2 border-b border-[#f3dde3]">
              <Users className="w-4 h-4 text-[#b8325a]" />
              <h3 className="font-serif-heading text-base font-bold text-[#24131a]">
                Student Eligibility Check
              </h3>
            </div>

            <div className="space-y-3 text-xs">
              <div className="p-3 rounded-lg bg-[#fff5f7] border border-[#ebd0d9] space-y-1">
                <span className="font-mono text-[10px] font-bold text-[#8c2444] uppercase tracking-wider block">
                  Mandatory For:
                </span>
                <p className="text-xs font-semibold text-[#24131a]">
                  {notice.whoNeedsToAct.appliesTo}
                </p>
              </div>

              <div className="p-3 rounded-lg bg-[#faf6f7] border border-[#ecd5de] space-y-1">
                <span className="font-mono text-[10px] font-bold text-[#7a5b68] uppercase tracking-wider block">
                  Exempt / Not Applicable:
                </span>
                <p className="text-xs text-[#5c404d]">
                  {notice.whoNeedsToAct.exempt || 'No students are exempt. Universal compliance required.'}
                </p>
              </div>
            </div>
          </div>

          {/* Warnings & Real Consequences */}
          {notice.consequencesIfMissed && (
            <div className="bg-[#fff8fa] rounded-xl border border-[#f2ccd6] p-5 shadow-paper space-y-2">
              <div className="flex items-center gap-2 text-[#991d3c]">
                <AlertTriangle className="w-4 h-4 text-[#b8325a]" />
                <h3 className="font-mono text-xs font-bold uppercase tracking-wider">
                  What happens if ignored:
                </h3>
              </div>
              <p className="text-xs sm:text-sm text-[#54323f] leading-relaxed">
                {notice.consequencesIfMissed}
              </p>
            </div>
          )}

          {/* WhatsApp Group Share Box */}
          <div className="bg-[#fff5f7] rounded-xl border border-[#ebd0d9] p-5 shadow-paper space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-[#8c2444]">
                Hostel / Class WhatsApp Broadcast
              </span>
              <Share2 className="w-3.5 h-3.5 text-[#b8325a]" />
            </div>

            <p className="text-xs text-[#6e505d] leading-relaxed">
              Help your batchmates. Copy this pre-formatted summary with rooms and document requirements:
            </p>

            <button
              type="button"
              onClick={handleCopyWhatsapp}
              className="w-full py-2.5 px-4 rounded-lg bg-[#b8325a] hover:bg-[#a12448] text-white text-xs font-semibold shadow-button-press transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              {copiedWhatsapp ? (
                <>
                  <Check className="w-4 h-4" />
                  <span>Copied text to clipboard!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  <span>Copy Clean WhatsApp Text</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
