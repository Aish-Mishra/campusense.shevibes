import React, { useState } from 'react';
import { X, Sparkles, AlertCircle } from 'lucide-react';
import { ClarifiedNotice, FresherProfile, SourceType, NoticeCategory } from '../types';

interface NoticeAnalyzerModalProps {
  isOpen: boolean;
  profile: FresherProfile;
  onClose: () => void;
  onNoticeClarified: (notice: ClarifiedNotice) => void;
}

const PRESET_ANNOUNCEMENTS = [
  {
    name: '1. Admit Card & Attendance Warning',
    type: 'circular' as SourceType,
    text: `UNIVERSITY EXAMINATION DIVISION
CIRCULAR NO. UED/ODD-SEM/2026/09

Subject: Clearance of Debarred Candidates and Issuance of Sessional Hall Tickets (Autumn 2026).

It is brought to the notice of all concerned students of B.Tech / B.Arch First Semester that the automated attendance compilation as derived from the University ERP system designates candidates possessing aggregate lecture attendance beneath seventy-five percentum (75%) as prima facie debarred from appearing in the Mid-Term Sessional Assessments commencing 28th September 2026.

Those students claiming condonation on grounds of medical infirmity or institutional sports representation must submit their medical fitness certificates validated by the University Medical Officer along with a formal condonation petition to the Office of the Associate Dean (Academics) in Room A-202 no later than 21st September 2026 by 1600 hrs.

Admit cards shall be disbursed from respective departmental counters upon clearance of library dues and production of the signed condonation clearance slip.

Sd/-
Controller of Examinations`,
  },
  {
    name: '2. Mess & Hostel Penalty Notice',
    type: 'circular' as SourceType,
    text: `OFFICE OF THE PROCTOR & CHIEF HOSTEL WARDEN
NOTICE: RESTRICTION ON UNAUTHORISED ELECTRICAL FIXTURES

It has been observed during surprise vigilance rounds that residents of Block 1 and Block 2 are utilizing unauthorized heavy electrical appliances including immersion water heaters, electric kettles, and induction stoves exceeding rated socket loads.

In accordance with Section 12 of the Hostel Conduct Ordinance, the possession of high-wattage resistance appliances is strictly prohibited. Residents are instructed to voluntarily surrender all such unauthorized fixtures to the Hostel Caretaker's office by Friday, 19th September 2026, failing which a punitive levy of ₹2,500/- along with confiscation and disciplinary marking shall be executed without further show-cause notice.

By Order
Chief Proctor`,
  },
  {
    name: '3. Frantic WhatsApp Forward from Senior',
    type: 'whatsapp' as SourceType,
    text: `GUYS PLEASE LISTEN VERY IMPORTANT FROM CR MANISH 🚨
HOD told today that anyone who didn't submit the Anti-Ragging undertaking hardcopy to room 102 will be debarred from entering labs starting Monday!!
Also you have to take print of fee receipt and get it stamped from accounts counter otherwise library will not issue books and they will charge ₹500 fine.
Go tomorrow between 11 to 1 only because after 1pm counter clerk goes for lunch and will not sign. Bring 2 copies of admission slip and father's signature on the undertaking form.`,
  },
];

export const NoticeAnalyzerModal: React.FC<NoticeAnalyzerModalProps> = ({
  isOpen,
  profile,
  onClose,
  onNoticeClarified,
}) => {
  if (!isOpen) return null;

  const [rawText, setRawText] = useState('');
  const [sourceType, setSourceType] = useState<SourceType>('circular');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleApplyPreset = (preset: typeof PRESET_ANNOUNCEMENTS[0]) => {
    setRawText(preset.text);
    setSourceType(preset.type);
    setErrorMsg(null);
  };

  const handleClarify = async () => {
    if (!rawText.trim()) {
      setErrorMsg('Please paste announcement text or select a sample above.');
      return;
    }

    setIsLoading(true);
    setErrorMsg(null);

    try {
      const res = await fetch('/api/clarify-notice', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          rawText,
          sourceType,
          studentContext: profile,
        }),
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.error || 'Failed to clarify notice.');
      }

      const data = await res.json();

      let category: NoticeCategory = 'academic';
      const textLower = (data.title + ' ' + rawText).toLowerCase();
      if (textLower.includes('hostel') || textLower.includes('mess') || textLower.includes('warden')) {
        category = 'hostel';
      } else if (textLower.includes('exam') || textLower.includes('sessional') || textLower.includes('mid-term')) {
        category = 'exams';
      } else if (textLower.includes('scholarship') || textLower.includes('nsp') || textLower.includes('aid')) {
        category = 'scholarships';
      } else if (textLower.includes('library') || textLower.includes('book')) {
        category = 'library';
      }

      const newNotice: ClarifiedNotice = {
        id: `notice-${Date.now()}`,
        title: data.title || 'Clarified Campus Announcement',
        department: data.department || 'University Administration',
        category,
        sourceType,
        datePosted: 'Just now',
        urgency: data.urgency || 'IMPORTANT',
        deadline: data.deadline || null,
        isDeadlineStrict: Boolean(data.isDeadlineStrict),
        tldr: data.tldr || 'Here is the simplified summary of this announcement.',
        whoNeedsToAct: data.whoNeedsToAct || {
          appliesTo: '1st Year Students',
          exempt: 'Other batches',
          matchVerdict: 'MUST_ACT',
        },
        actionSteps: data.actionSteps || [],
        jargonDecoded: data.jargonDecoded || [],
        consequencesIfMissed: data.consequencesIfMissed || 'Consult academic desk.',
        contactOrOffice: data.contactOrOffice || 'Administrative Section',
        whatsappSummary: data.whatsappSummary || data.tldr || '',
        rawContent: rawText,
        tags: ['New', 'AI Clarified'],
        userCompletedSteps: [],
      };

      onNoticeClarified(newNotice);
      onClose();
    } catch (err: any) {
      console.error(err);
      setErrorMsg(err.message || 'Error occurred while clarifying. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 overflow-y-auto bg-slate-900/50">
      <div
        className="bg-white rounded-2xl shadow-xl border border-pink-100 w-full max-w-xl flex flex-col overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-4 border-b border-pink-100 flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold text-slate-900">
              Simplify a Campus Notice
            </h3>
            <p className="text-xs text-slate-500">
              Paste circular text or choose a sample to test
            </p>
          </div>
          <button
            onClick={onClose}
            disabled={isLoading}
            className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-100"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 space-y-4">
          {/* Quick Presets for Demo */}
          <div>
            <span className="text-xs font-semibold text-slate-600 block mb-1.5">
              Quick Samples (Click to load):
            </span>
            <div className="flex flex-wrap gap-1.5">
              {PRESET_ANNOUNCEMENTS.map((preset, idx) => (
                <button
                  key={idx}
                  type="button"
                  disabled={isLoading}
                  onClick={() => handleApplyPreset(preset)}
                  className="text-xs px-2.5 py-1.5 rounded-lg border border-pink-200 bg-pink-50/50 hover:bg-pink-100 text-pink-900 font-medium transition-colors"
                >
                  {preset.name}
                </button>
              ))}
            </div>
          </div>

          {/* Text Area */}
          <div>
            <textarea
              value={rawText}
              onChange={(e) => setRawText(e.target.value)}
              disabled={isLoading}
              rows={6}
              placeholder="Paste notice text, circular excerpt, or WhatsApp forward here..."
              className="w-full bg-white border border-pink-200 rounded-xl p-3 text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:outline-hidden focus:border-pink-500 font-mono"
            />
          </div>

          {/* Error Message */}
          {errorMsg && (
            <div className="p-2.5 rounded-lg bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          {/* Loading Indicator */}
          {isLoading && (
            <div className="p-3 rounded-lg bg-pink-50 border border-pink-200 flex items-center gap-2 text-xs font-medium text-pink-900">
              <span className="animate-spin w-4 h-4 border-2 border-pink-600 border-t-transparent rounded-full" />
              <span>AI is reading circular and generating your checklist...</span>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-pink-100 bg-white flex items-center justify-between">
          <button
            type="button"
            disabled={isLoading}
            onClick={onClose}
            className="px-3.5 py-1.5 rounded-lg text-slate-600 hover:bg-slate-100 text-xs font-semibold"
          >
            Cancel
          </button>

          <button
            type="button"
            disabled={isLoading || !rawText.trim()}
            onClick={handleClarify}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-pink-600 hover:bg-pink-700 disabled:opacity-50 text-white text-xs sm:text-sm font-semibold shadow-xs transition-colors"
          >
            <Sparkles className="w-4 h-4" />
            <span>{isLoading ? 'Simplifying...' : 'Simplify Notice'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};

