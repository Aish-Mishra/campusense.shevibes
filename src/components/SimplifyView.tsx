import React, { useState } from 'react';
import { Sparkles, FileText, Send, Building, Clock, ArrowRight } from 'lucide-react';
import { FresherProfile, SourceType } from '../types';

interface DemoSample {
  id: string;
  label: string;
  department: string;
  deadlinePreview: string;
  text: string;
}

const DEMO_SAMPLES: DemoSample[] = [
  {
    id: 'doc-verify',
    label: 'Document Verification',
    department: 'Academic Division',
    deadlinePreview: 'Sept 18, 4:00 PM',
    text: `UNIVERSITY ACADEMIC DIVISION - MANDATORY CERTIFICATE VERIFICATION
All newly admitted 1st year B.Tech students (Session 2026-27) must physically appear at the Admin Block Room 104 between 10:00 AM and 4:00 PM before 18th September 2026.
You must carry:
1. Original 10th and 12th Marksheets with 2 self-attested photocopies
2. Transfer Certificate / Migration Certificate
3. Medical Fitness Certificate
4. Anti-ragging affidavit reference number
5. 4 passport-size photographs
Failure to verify documents by 18th September will lead to withholding of provisional student roll numbers.`,
  },
  {
    id: 'attendance-debar',
    label: 'Attendance Warning',
    department: 'Examination Division',
    deadlinePreview: 'Sept 21, 4:00 PM',
    text: `UNIVERSITY EXAMINATION DIVISION - MID-TERM DEBARMENT NOTICE
Students with aggregate lecture attendance below 75% in B.Tech 1st semester are prima facie debarred from appearing in Mid-Term Sessional Assessments starting 28th September 2026.
Students seeking condonation on medical grounds or university sports representation must submit a condonation petition along with medical fitness certificate stamped by the University Medical Officer to the Office of Dean Academics (Room A-202) no later than 21st September 2026 by 4:00 PM. Admit cards will only be issued upon clearance of library dues and signed condonation slip.`,
  },
  {
    id: 'hostel-rules',
    label: 'Hostel Rules & Fines',
    department: 'Chief Hostel Warden',
    deadlinePreview: 'Sept 19 (Friday)',
    text: `OFFICE OF CHIEF HOSTEL WARDEN - RESTRICTION ON ELECTRICAL FIXTURES
It is observed that students in Block 1 and 2 are using high-wattage electrical appliances like immersion water rods, electric kettles, and induction stoves. Under Section 12 of Hostel Rules, these are strictly forbidden. Residents must voluntarily surrender all unauthorized fixtures to the Hostel Caretaker by Friday, 19th September. Non-compliance will attract a fine of Rs 2,500 and disciplinary action.`,
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
  const [activeSampleId, setActiveSampleId] = useState<string | null>(null);

  const handleSelectSample = (sample: DemoSample) => {
    setActiveSampleId(sample.id);
    setInputText(sample.text);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 py-4">
      {/* Page Header with Generous Spacing */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-pink-100 border border-pink-200 text-pink-900 text-xs font-semibold">
          <Sparkles className="w-3.5 h-3.5 text-pink-600" />
          <span>Notice Simplifier</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
          Translate Campus Circulars into Clear Action Steps
        </h1>
        <p className="text-slate-600 text-sm sm:text-base max-w-xl mx-auto">
          Paste any confusing university circular, WhatsApp forward, or notice board photo to get an instant checklist, deadlines, and decoded terms.
        </p>
      </div>

      {/* Main Pink Box - Spacious Form Container */}
      <div className="bg-pink-50 rounded-2xl border border-pink-200 p-6 sm:p-8 shadow-sm space-y-6">
        {/* Sample Selectors */}
        <div className="space-y-2.5">
          <label className="text-xs font-bold uppercase tracking-wider text-pink-900">
            Quick Try with Demo Notices:
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {DEMO_SAMPLES.map((sample) => {
              const isSelected = activeSampleId === sample.id || inputText === sample.text;
              return (
                <button
                  key={sample.id}
                  type="button"
                  onClick={() => handleSelectSample(sample)}
                  className={`p-3.5 rounded-xl text-left border transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-pink-200/70 border-pink-400 shadow-xs'
                      : 'bg-white/80 border-pink-200 hover:bg-pink-100/50 hover:border-pink-300'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-semibold text-xs text-slate-900">
                      {sample.label}
                    </span>
                    <span className="text-[10px] text-pink-700 font-medium">
                      {sample.deadlinePreview}
                    </span>
                  </div>
                  <div className="flex items-center gap-1 text-[11px] text-slate-600">
                    <Building className="w-3 h-3 text-pink-600 shrink-0" />
                    <span className="truncate">{sample.department}</span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Input Area */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-xs font-bold uppercase tracking-wider text-pink-900">
              Paste University Notice / Circular Text:
            </label>
            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-500">Source:</span>
              <select
                value={sourceType}
                onChange={(e) => setSourceType(e.target.value as SourceType)}
                className="text-xs bg-white border border-pink-200 rounded-lg px-2.5 py-1 text-slate-700 focus:outline-none focus:ring-1 focus:ring-pink-400 cursor-pointer"
              >
                <option value="circular">Official Circular</option>
                <option value="whatsapp">WhatsApp Forward</option>
                <option value="notice_board">Notice Board</option>
                <option value="email">University Email</option>
              </select>
            </div>
          </div>

          <textarea
            rows={8}
            value={inputText}
            onChange={(e) => {
              setInputText(e.target.value);
              setActiveSampleId(null);
            }}
            placeholder="Paste raw university announcement, dean's circular, exam office instructions, or hostel guidelines..."
            className="w-full p-4 rounded-xl border border-pink-300 bg-white/95 text-slate-900 text-sm leading-relaxed placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all resize-y shadow-inner"
          />
        </div>

        {/* Error Message if any */}
        {errorMsg && (
          <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-xs text-red-700 font-medium flex items-center gap-2">
            <span>{errorMsg}</span>
          </div>
        )}

        {/* Submit Button */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
          <div className="text-xs text-slate-500 flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-pink-600" />
            <span>Extracts strict deadlines, office rooms & required original certificates</span>
          </div>

          <button
            type="button"
            onClick={onClarify}
            disabled={isLoading || !inputText.trim()}
            className="w-full sm:w-auto px-7 py-3 rounded-xl bg-pink-600 hover:bg-pink-700 active:bg-pink-800 disabled:opacity-50 text-white text-sm font-bold shadow-sm transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            {isLoading ? (
              <>
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                <span>Simplifying Notice...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4" />
                <span>Simplify Notice</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </div>
      </div>

      {/* Helpful Mini Cards below */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
        <div className="bg-pink-50/70 border border-pink-200 rounded-xl p-4 text-center space-y-1">
          <div className="text-pink-800 font-bold text-sm">Action Steps</div>
          <p className="text-xs text-slate-600">
            Convert 2 pages of official circular text into an actionable step-by-step checklist.
          </p>
        </div>
        <div className="bg-pink-50/70 border border-pink-200 rounded-xl p-4 text-center space-y-1">
          <div className="text-pink-800 font-bold text-sm">Document List</div>
          <p className="text-xs text-slate-600">
            Know exactly which original marksheets, self-attested photocopies, and photos to carry.
          </p>
        </div>
        <div className="bg-pink-50/70 border border-pink-200 rounded-xl p-4 text-center space-y-1">
          <div className="text-pink-800 font-bold text-sm">Decoded Jargon</div>
          <p className="text-xs text-slate-600">
            Plain English explanations of complex college terms like Condonation, Debarment & ERP.
          </p>
        </div>
      </div>
    </div>
  );
};
