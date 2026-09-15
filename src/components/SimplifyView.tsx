import React, { useState } from 'react';
import {
  Sparkles,
  ArrowRight,
  Clock,
  Building,
  HelpCircle,
  FileSpreadsheet,
  AlertCircle,
  CheckCircle2,
  Bookmark,
  Scroll,
} from 'lucide-react';
import { FresherProfile, SourceType } from '../types';

interface DemoSample {
  id: string;
  code: string;
  label: string;
  department: string;
  deadlinePreview: string;
  urgency: 'CRITICAL' | 'IMPORTANT' | 'NOTICE';
  text: string;
}

const DEMO_SAMPLES: DemoSample[] = [
  {
    id: 'doc-verify',
    code: 'ACAD-2026/09',
    label: 'Mandatory Certificate Verification',
    department: 'Academic Division (UG)',
    deadlinePreview: 'Sept 18, 4:00 PM',
    urgency: 'CRITICAL',
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
    code: 'EXAM-2026/75',
    label: 'Mid-Term Attendance Debarment & Condonation',
    department: 'Examination Division',
    deadlinePreview: 'Sept 21, 4:00 PM',
    urgency: 'CRITICAL',
    text: `UNIVERSITY EXAMINATION DIVISION - MID-TERM DEBARMENT NOTICE
Students with aggregate lecture attendance below 75% in B.Tech 1st semester are prima facie debarred from appearing in Mid-Term Sessional Assessments starting 28th September 2026.
Students seeking condonation on medical grounds or university sports representation must submit a condonation petition along with medical fitness certificate stamped by the University Medical Officer to the Office of Dean Academics (Room A-202) no later than 21st September 2026 by 4:00 PM. Admit cards will only be issued upon clearance of library dues and signed condonation slip.`,
  },
  {
    id: 'hostel-rules',
    code: 'CHW-2026/SEC12',
    label: 'Hostel Electrical Fixtures Inspection & Fines',
    department: 'Chief Hostel Warden',
    deadlinePreview: 'Sept 19, 5:00 PM',
    urgency: 'IMPORTANT',
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
  const [activeSampleId, setActiveSampleId] = useState<string | null>(null);

  const handleSelectSample = (sample: DemoSample) => {
    setActiveSampleId(sample.id);
    setInputText(sample.text);
  };

  const wordCount = inputText.trim() ? inputText.trim().split(/\s+/).length : 0;

  return (
    <div className="space-y-8 pb-12">
      {/* Editorial Page Header */}
      <div className="border-b border-[#ebd2db] pb-5">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-2">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-[#fcedf1] border border-[#f0cad5] text-[#8c2444] font-mono text-[11px] font-semibold uppercase tracking-wider">
            <Scroll className="w-3.5 h-3.5 text-[#b8325a]" />
            <span>Campus Decoder Desk</span>
          </div>

          <div className="text-xs text-[#7e5c69] font-medium">
            Confidential & student-friendly • No ads, no jargon
          </div>
        </div>

        <h1 className="font-serif-heading text-2xl sm:text-3xl lg:text-4xl font-bold text-[#26141c] tracking-tight">
          What does this college notice actually want me to do?
        </h1>
        <p className="text-[#694e5b] text-sm sm:text-base mt-2 max-w-3xl leading-relaxed">
          University circulars are famously written in archaic, threatening legal prose. Paste any official circular, dean’s notification, or forwarded WhatsApp warning to get the room number, documents to bring, and the honest consequences if you ignore it.
        </p>
      </div>

      {/* Main Layout: Asymmetric 2-Column Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Main Work Desk (8 cols) */}
        <div className="lg:col-span-8 space-y-6">
          {/* Dispatch Picker: Realistic Campus Slips */}
          <div className="space-y-2.5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-[#634854] flex items-center gap-1.5">
                <Bookmark className="w-3.5 h-3.5 text-[#b8325a]" />
                <span>Try an authentic campus notice:</span>
              </span>
              <span className="text-[11px] text-[#8c6b78]">Click to load real university text</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {DEMO_SAMPLES.map((sample) => {
                const isSelected = activeSampleId === sample.id || inputText === sample.text;
                return (
                  <button
                    key={sample.id}
                    type="button"
                    onClick={() => handleSelectSample(sample)}
                    className={`p-3.5 rounded-lg text-left transition-all cursor-pointer border ${
                      isSelected
                        ? 'bg-[#fff2f5] border-[#b8325a] shadow-button-press ring-1 ring-[#b8325a]/40'
                        : 'bg-white border-[#ebd4dc] hover:border-[#cf92a5] hover:bg-[#fff9fa] shadow-paper'
                    }`}
                  >
                    <div className="flex items-center justify-between text-[10px] font-mono text-[#8c4b5e] mb-1">
                      <span>{sample.code}</span>
                      <span className="font-medium text-[#b8325a]">{sample.deadlinePreview.split(',')[0]}</span>
                    </div>

                    <h3 className="font-semibold text-xs text-[#26141c] line-clamp-2 leading-snug">
                      {sample.label}
                    </h3>

                    <div className="mt-2 pt-2 border-t border-[#f2dde4] flex items-center justify-between text-[11px] text-[#73525f]">
                      <span className="truncate max-w-[120px]">{sample.department}</span>
                      <span
                        className={`text-[9px] font-bold px-1.5 py-0.2 rounded ${
                          sample.urgency === 'CRITICAL'
                            ? 'bg-[#fcedf1] text-[#991b3e] border border-[#f5c7d4]'
                            : 'bg-[#fef6ea] text-[#925413] border border-[#fae2c0]'
                        }`}
                      >
                        {sample.urgency}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Primary Input Container */}
          <div className="bg-white rounded-xl border border-[#ebd0d9] p-5 sm:p-6 shadow-paper space-y-4">
            {/* Input Header Strip */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#f3e1e6]">
              <div>
                <label
                  htmlFor="circular-input"
                  className="text-xs font-bold uppercase tracking-wider text-[#3d2731] block"
                >
                  Raw Circular / Forwarded Text:
                </label>
                <span className="text-[11px] text-[#785b67]">
                  Paste from PDF, departmental email, or student WhatsApp group
                </span>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-xs text-[#735360] font-medium">Source:</span>
                <select
                  value={sourceType}
                  onChange={(e) => setSourceType(e.target.value as SourceType)}
                  className="text-xs bg-[#fdf5f7] border border-[#ebd0d9] rounded-md px-2.5 py-1 text-[#3d2731] font-medium focus:outline-none focus:ring-1 focus:ring-[#b8325a] cursor-pointer"
                >
                  <option value="circular">Official PDF Circular</option>
                  <option value="whatsapp">Class Rep WhatsApp Forward</option>
                  <option value="notice_board">Physical Notice Board Photo</option>
                  <option value="email">Departmental Email</option>
                </select>
              </div>
            </div>

            {/* Textarea */}
            <div className="relative">
              <textarea
                id="circular-input"
                rows={9}
                value={inputText}
                onChange={(e) => {
                  setInputText(e.target.value);
                  setActiveSampleId(null);
                }}
                placeholder="Paste the announcement text here...

Example:
'Ref No: DTU/Acad/2026/Circular-42
All newly registered first-year candidates are hereby directed to present themselves for physical document scrutiny at Admin Block, Room 104 with 2 sets of self-attested copies...'"
                className="w-full p-4 rounded-lg border border-[#edd2db] bg-[#fdfafb] text-[#2b161f] text-sm leading-relaxed placeholder:text-[#997e8a] focus:outline-none focus:bg-white focus:ring-1 focus:ring-[#b8325a] focus:border-[#b8325a] transition-all resize-y font-mono-code text-[13px]"
              />
            </div>

            {/* Footer Stats & Submit Button */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 pt-1">
              <div className="flex items-center gap-3 text-xs text-[#785b67]">
                <span className="font-mono text-[11px] bg-[#faedf1] text-[#8c2444] px-2 py-0.5 rounded border border-[#ebd0d9]">
                  {wordCount} words
                </span>
                <span className="hidden sm:inline text-[#ebd0d8]">•</span>
                <span className="text-[11px]">
                  Extracts room numbers, required documents & cutoffs
                </span>
              </div>

              <button
                type="button"
                onClick={onClarify}
                disabled={isLoading || !inputText.trim()}
                className="px-6 py-2.5 rounded-lg bg-[#b8325a] hover:bg-[#a12448] active:bg-[#871939] text-white text-xs sm:text-sm font-semibold shadow-button-press disabled:opacity-50 disabled:shadow-none transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                {isLoading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>Analyzing Administrative Prose...</span>
                  </>
                ) : (
                  <>
                    <span>Translate into Action Steps</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>

            {/* Error Message */}
            {errorMsg && (
              <div className="p-3 bg-[#fdf2f4] border border-[#f5c7d2] rounded-lg text-xs text-[#9c1e40] font-medium flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{errorMsg}</span>
              </div>
            )}
          </div>
        </div>

        {/* Right Margin: Real Senior Student Notes (4 cols) */}
        <div className="lg:col-span-4 space-y-5">
          {/* Senior Survival Notes Card */}
          <div className="bg-[#fff9fa] rounded-xl border border-[#ebd0d9] p-5 shadow-paper space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#f2dde4]">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#b8325a]" />
                <h3 className="font-serif-heading text-base font-bold text-[#26141c]">
                  The Senior Survival Desk
                </h3>
              </div>
              <span className="font-mono text-[9px] uppercase tracking-wider text-[#915569] bg-[#faedf1] px-1.5 py-0.5 rounded border border-[#ecd2da]">
                Unwritten Rules
              </span>
            </div>

            <p className="text-xs text-[#6e4f5c] leading-relaxed">
              Things official university notices will <strong className="text-[#26141c]">never</strong> tell you out loud:
            </p>

            <div className="space-y-3.5 text-xs text-[#523a45]">
              <div className="p-3 rounded-lg bg-white border border-[#ebd6de] space-y-1">
                <div className="font-semibold text-[#8c2444] text-[11px] uppercase tracking-wider flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-[#b8325a]" />
                  <span>The Counter Lunch Rule</span>
                </div>
                <p className="text-[12px] leading-snug text-[#5c424e]">
                  Notice boards say lunch is 1:00 PM – 2:00 PM, but admin counters shut their windows at 12:40 PM sharp. Never go after 12:15 PM.
                </p>
              </div>

              <div className="p-3 rounded-lg bg-white border border-[#ebd6de] space-y-1">
                <div className="font-semibold text-[#8c2444] text-[11px] uppercase tracking-wider flex items-center gap-1.5">
                  <FileSpreadsheet className="w-3.5 h-3.5 text-[#b8325a]" />
                  <span>Self-Attestation Etiquette</span>
                </div>
                <p className="text-[12px] leading-snug text-[#5c424e]">
                  Sign your normal signature with current date at the bottom-right margin in blue pen. Never sign across your marksheet table.
                </p>
              </div>

              <div className="p-3 rounded-lg bg-white border border-[#ebd6de] space-y-1">
                <div className="font-semibold text-[#8c2444] text-[11px] uppercase tracking-wider flex items-center gap-1.5">
                  <AlertCircle className="w-3.5 h-3.5 text-[#b8325a]" />
                  <span>DigiLocker Traps</span>
                </div>
                <p className="text-[12px] leading-snug text-[#5c424e]">
                  Showing the DigiLocker app on your phone will get you rejected at 90% of university verification desks. Carry physical paper photocopies.
                </p>
              </div>
            </div>

            <div className="pt-2 text-[11px] text-[#7d5e6c] font-medium border-t border-[#f2dde4] flex items-center justify-between">
              <span>Have a question about a room?</span>
              <span className="text-[#8c2444] font-semibold">Check Active Dossier</span>
            </div>
          </div>

          {/* Quick Notice Format Guide */}
          <div className="border border-dashed border-[#e6c9d3] rounded-xl p-4 bg-[#fcf5f7]/60 text-xs text-[#735360] space-y-2">
            <span className="font-mono text-[10px] uppercase tracking-wider text-[#995267] font-semibold block">
              Pro-Tip for Indian College Circulars:
            </span>
            <p className="leading-relaxed text-[11px]">
              If a notice says <em>"Strict compliance is solicited under penal action"</em>, it usually just means carry 2 photocopies and get an initial from the clerk before 4 PM.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
