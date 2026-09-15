import React, { useState } from 'react';
import {
  Sparkles,
  ArrowRight,
  HelpCircle,
  AlertCircle,
  X,
  FileText,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';
import { FresherProfile, SourceType } from '../types';

interface DemoSample {
  id: string;
  label: string;
  category: string;
  text: string;
}

const DEMO_SAMPLES: DemoSample[] = [
  {
    id: 'doc-verify',
    label: '📄 Document Verification',
    category: 'Certificates',
    text: `UNIVERSITY ACADEMIC DIVISION - MANDATORY CERTIFICATE VERIFICATION
All newly admitted 1st year B.Tech students (Session 2026-27) must physically appear at the Admin Block Room 104 between 10:00 AM and 4:00 PM before 18th September 2026.
You must carry:
1. Original 10th and 12th Marksheets with 2 self-attested photocopies
2. Transfer Certificate / Migration Certificate
3. Medical Fitness Certificate stamped by CMO
4. Anti-ragging undertaking reference number (online reference)
5. 4 passport-size photographs
Failure to verify documents by 18th September will lead to withholding of provisional student roll numbers and mid-term admit cards.`,
  },
  {
    id: 'attendance-debar',
    label: '⚠️ Low Attendance Warning',
    category: 'Exams',
    text: `UNIVERSITY EXAMINATION DIVISION - MID-TERM DEBARMENT NOTICE
Students with aggregate lecture attendance below 75% in B.Tech 1st semester are prima facie debarred from appearing in Mid-Term Sessional Assessments starting 28th September 2026.
Students seeking condonation on medical grounds or university sports representation must submit a condonation petition along with medical fitness certificate stamped by the University Medical Officer to the Office of Dean Academics (Room A-202) no later than 21th September 2026 by 4:00 PM. Admit cards will only be issued upon clearance of library dues and signed condonation slip.`,
  },
  {
    id: 'hostel-rules',
    label: '🏠 Hostel Kettle / Heater Rule',
    category: 'Hostel',
    text: `OFFICE OF CHIEF HOSTEL WARDEN - RESTRICTION ON ELECTRICAL FIXTURES
It is observed that students in Block 1 and 2 are using high-wattage electrical appliances like immersion water rods, electric kettles, and induction stoves. Under Section 12 of Hostel Rules, these are strictly forbidden. Residents must voluntarily surrender all unauthorized fixtures to the Hostel Caretaker by Friday, 19th September. Non-compliance will attract a fine of Rs 2,500 and disciplinary notice sent to parents.`,
  },
];

interface SimplifyViewProps {
  inputText: string;
  setInputText: (text: string) => void;
  onClarify: () => void;
  isLoading: boolean;
  errorMsg: string | null;
  profile: FresherProfile;
  sourceType: SourceType;
  setSourceType: (type: SourceType) => void;
}

export const SimplifyView: React.FC<SimplifyViewProps> = ({
  inputText,
  setInputText,
  onClarify,
  isLoading,
  errorMsg,
  sourceType,
  setSourceType,
}) => {
  const [showTips, setShowTips] = useState(false);

  const handleSelectSample = (sample: DemoSample) => {
    setInputText(sample.text);
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6 pb-12">
      {/* Friendly Page Header */}
      <div className="text-center space-y-2 border-b border-[#ebd2db] pb-4">
        <h1 className="font-serif-heading text-2xl sm:text-3xl font-bold text-[#26141c]">
          Explain a Notice in Plain English
        </h1>
        <p className="text-xs sm:text-sm text-[#6e505d] max-w-xl mx-auto">
          Paste any confusing college circular, email, or WhatsApp message to get a simple, step-by-step checklist with room numbers and deadlines.
        </p>
      </div>

      {/* Buttons for reducing complexity: 1-click sample notices */}
      <div className="space-y-2">
        <span className="text-xs font-bold text-[#5c3e4c] block">
          Don't have a notice handy? Try an example:
        </span>
        <div className="flex flex-wrap gap-2">
          {DEMO_SAMPLES.map((sample) => (
            <button
              key={sample.id}
              type="button"
              onClick={() => handleSelectSample(sample)}
              className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-white border border-[#ebd0d9] hover:border-[#b8325a] hover:bg-[#fff5f7] text-[#73263d] transition-all cursor-pointer shadow-sm"
            >
              {sample.label}
            </button>
          ))}
        </div>
      </div>

      {/* Notice Input Card */}
      <div className="bg-white rounded-xl border border-[#ebd0d9] p-5 shadow-paper space-y-4">
        <div className="flex items-center justify-between gap-2">
          <label
            htmlFor="circular-input"
            className="text-xs font-bold uppercase tracking-wider text-[#3d2731]"
          >
            Paste Notice Text Here:
          </label>

          {inputText && (
            <button
              type="button"
              onClick={() => setInputText('')}
              className="text-xs font-semibold text-[#8c2444] hover:underline flex items-center gap-1 cursor-pointer"
            >
              <X className="w-3.5 h-3.5" />
              <span>Clear text</span>
            </button>
          )}
        </div>

        <textarea
          id="circular-input"
          rows={7}
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Paste official notification, circular PDF text, or forwarded WhatsApp message..."
          className="w-full bg-[#fdfafb] border border-[#edd2db] rounded-lg p-3.5 text-xs sm:text-sm text-[#26141c] placeholder:text-[#997c88] focus:outline-none focus:bg-white focus:ring-1 focus:ring-[#b8325a] leading-relaxed resize-y"
        />

        {errorMsg && (
          <div className="p-3 rounded-lg bg-[#fdf2f4] border border-[#f5ccd5] text-[#991d3c] text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        {/* Action Button */}
        <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-t border-[#f3dde3]">
          <span className="text-[11px] text-[#8c6b78]">
            Works on PDF text, WhatsApp forwards & circular photos
          </span>

          <button
            type="button"
            onClick={onClarify}
            disabled={isLoading || !inputText.trim()}
            className="px-5 py-2.5 rounded-lg bg-[#b8325a] hover:bg-[#a12448] disabled:opacity-40 text-white text-xs sm:text-sm font-bold shadow-button-press transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            {isLoading ? (
              <>
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                <span>Simplifying notice...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4 text-rose-200" />
                <span>Explain in Simple Words</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </div>
      </div>

      {/* Collapsible Helpful Tips (Closed by default to reduce complexity) */}
      <div className="bg-white rounded-xl border border-[#ebd0d9] shadow-paper overflow-hidden">
        <button
          type="button"
          onClick={() => setShowTips(!showTips)}
          className="w-full p-4 flex items-center justify-between text-left hover:bg-[#fffafb] cursor-pointer"
        >
          <div className="flex items-center gap-2">
            <HelpCircle className="w-4 h-4 text-[#b8325a]" />
            <span className="text-xs sm:text-sm font-bold text-[#24131a]">
              Helpful tips when visiting admin counters
            </span>
          </div>
          <div className="flex items-center gap-1 text-xs font-semibold text-[#8c2444]">
            <span>{showTips ? 'Hide tips' : 'Show tips'}</span>
            {showTips ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </div>
        </button>

        {showTips && (
          <div className="p-4 pt-0 border-t border-[#f3dde3] space-y-2.5 mt-3 text-xs text-[#5c404d]">
            <p>
              • <strong>Lunch break rule:</strong> College admin counters usually close from 1:00 PM to 2:00 PM. Go between 10:30 AM and 12:30 PM to avoid queues.
            </p>
            <p>
              • <strong>Photocopy rule:</strong> Keep at least 2 extra signed (self-attested) copies of all certificates in a clear folder.
            </p>
            <p>
              • <strong>Receipts:</strong> Never leave a counter without a token slip, acknowledgment stamp, or diary receipt number.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
