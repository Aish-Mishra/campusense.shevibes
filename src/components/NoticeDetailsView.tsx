import React, { useState } from 'react';
import {
  Clock,
  MapPin,
  CheckCircle2,
  Circle,
  AlertTriangle,
  Copy,
  Check,
  Send,
  ArrowLeft,
  Sparkles,
  Printer,
  ChevronDown,
  ChevronUp,
  Zap,
  SlidersHorizontal,
  Share2,
  FileText,
  HelpCircle,
  Building,
  Pin,
} from 'lucide-react';
import { ClarifiedNotice, FresherProfile } from '../types';

interface NoticeDetailsViewProps {
  notice: ClarifiedNotice;
  profile: FresherProfile;
  onToggleStep: (noticeId: string, stepOrder: number) => void;
  onBackToBoard: () => void;
  onNewNotice: () => void;
  onAskQuestion: (question: string) => Promise<string>;
  isSimpleMode: boolean;
  onToggleSimpleMode: () => void;
  isPinned?: boolean;
  onTogglePin?: () => void;
}

export const NoticeDetailsView: React.FC<NoticeDetailsViewProps> = ({
  notice,
  profile,
  onToggleStep,
  onBackToBoard,
  onNewNotice,
  onAskQuestion,
  isSimpleMode,
  onToggleSimpleMode,
  isPinned,
  onTogglePin,
}) => {
  const [copiedWhatsapp, setCopiedWhatsapp] = useState(false);
  const [userQuestion, setUserQuestion] = useState('');
  const [qaHistory, setQaHistory] = useState<Array<{ q: string; a: string }>>([]);
  const [isAsking, setIsAsking] = useState(false);

  // Collapsible section toggles for reducing complexity
  const [showJargon, setShowJargon] = useState(!isSimpleMode);
  const [showOfficeDetails, setShowOfficeDetails] = useState(!isSimpleMode);
  const [showAskDesk, setShowAskDesk] = useState(false);
  const [showFullNoticeText, setShowFullNoticeText] = useState(false);

  const completedSteps = notice.userCompletedSteps || [];
  const totalSteps = notice.actionSteps.length;
  const progressPercent =
    totalSteps > 0 ? Math.round((completedSteps.length / totalSteps) * 100) : 0;

  // Gather all unique items to bring
  const allItemsToBring = Array.from(
    new Set(notice.actionSteps.flatMap((s) => s.itemsToBring || []))
  );

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
          a: 'Could not connect right now. General rule: Always carry 2 self-attested photocopies of your original documents to the admin window.',
        },
      ]);
    } finally {
      setIsAsking(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-16">
      {/* Top Bar: Back & Complexity Reducer Buttons */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#ebd2db] pb-3">
        <button
          type="button"
          onClick={onBackToBoard}
          className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-[#8c2444] hover:text-[#66122c] bg-white hover:bg-[#fff0f4] px-3.5 py-1.5 rounded-lg transition-all cursor-pointer border border-[#ebd4dc] shadow-paper"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Notices</span>
        </button>

        {/* Buttons for reducing complexity */}
        <div className="flex items-center gap-2">
          {/* Pinterest Pin Button */}
          {onTogglePin && (
            <button
              type="button"
              onClick={onTogglePin}
              className={`inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg border transition-all cursor-pointer ${
                isPinned
                  ? 'bg-[#ffebee] text-[#991b3e] border-[#f8bbd0] shadow-sm'
                  : 'bg-white text-[#6b4c59] border-[#ebd0d9] hover:bg-[#fff0f4]'
              }`}
              title={isPinned ? 'Remove from My Pinboard' : 'Pin to My Pinboard'}
            >
              <Pin className={`w-3.5 h-3.5 ${isPinned ? 'fill-[#b8325a] text-[#b8325a]' : 'text-[#8c2444]'}`} />
              <span>{isPinned ? 'Pinned to Board' : 'Pin Notice'}</span>
            </button>
          )}

          {/* Simple Mode Switch */}
          <button
            type="button"
            onClick={onToggleSimpleMode}
            className={`inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-lg border transition-all cursor-pointer ${
              isSimpleMode
                ? 'bg-[#8c2444] text-white border-[#8c2444] shadow-button-press'
                : 'bg-white text-[#8c2444] border-[#ebd0d9] hover:bg-[#fff0f4]'
            }`}
          >
            {isSimpleMode ? (
              <>
                <Zap className="w-3.5 h-3.5 text-yellow-300 fill-yellow-300" />
                <span>Simple View: ON</span>
              </>
            ) : (
              <>
                <SlidersHorizontal className="w-3.5 h-3.5 text-[#8c2444]" />
                <span>Full Details</span>
              </>
            )}
          </button>

          {/* Quick WhatsApp Copy Button */}
          <button
            type="button"
            onClick={handleCopyWhatsapp}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#2b5936] bg-[#eef8f0] hover:bg-[#dcf2e1] px-3 py-1.5 rounded-lg border border-[#cde8d2] transition-all cursor-pointer"
          >
            {copiedWhatsapp ? (
              <>
                <Check className="w-3.5 h-3.5 text-[#2b5936]" />
                <span>Copied message!</span>
              </>
            ) : (
              <>
                <Share2 className="w-3.5 h-3.5 text-[#2b5936]" />
                <span>Copy for WhatsApp</span>
              </>
            )}
          </button>

          {/* Print Button */}
          <button
            type="button"
            onClick={() => window.print()}
            className="hidden sm:inline-flex items-center gap-1.5 text-xs font-semibold text-[#664b58] bg-white hover:bg-[#faf0f3] px-3 py-1.5 rounded-lg border border-[#ebd4dc] shadow-paper cursor-pointer"
          >
            <Printer className="w-3.5 h-3.5 text-[#8c2444]" />
            <span>Print</span>
          </button>
        </div>
      </div>

      {/* Main Notice Title & Summary */}
      <div className="bg-white rounded-xl border border-[#ebd0d9] p-5 sm:p-6 shadow-paper space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-2">
          {notice.urgency === 'CRITICAL' ? (
            <span className="text-[11px] font-bold px-2.5 py-1 rounded bg-[#fdf0f3] text-[#991d3c] border border-[#f7ccd7] flex items-center gap-1.5">
              <AlertTriangle className="w-3.5 h-3.5 text-[#b8325a]" />
              Urgent Notice
            </span>
          ) : (
            <span className="text-[11px] font-semibold px-2.5 py-1 rounded bg-[#fdf5f7] text-[#73505c] border border-[#eed0d9]">
              General Notice
            </span>
          )}

          {notice.deadline && (
            <span className="text-xs font-bold px-3 py-1 rounded bg-[#8c2444] text-white flex items-center gap-1.5 shadow-button-press">
              <Clock className="w-3.5 h-3.5 text-rose-200" />
              <span>Last Date: {notice.deadline}</span>
            </span>
          )}
        </div>

        <h1 className="font-serif-heading text-xl sm:text-2xl font-bold text-[#24131a] leading-snug">
          {notice.title}
        </h1>

        {/* 3-Second Plain English Summary */}
        <div className="p-4 rounded-lg bg-[#fff8fa] border-l-4 border-l-[#b8325a] border border-[#ebd2dc]">
          <span className="text-[11px] font-bold text-[#8c2444] uppercase tracking-wider block mb-1">
            What this notice means:
          </span>
          <p className="text-sm sm:text-base text-[#4a323d] leading-relaxed">
            {notice.tldr}
          </p>
        </div>

        {/* Quick 3-Pillar Info Box (Where, When, Who) */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
          {/* Who */}
          <div className="p-3 bg-[#fdf6f8] rounded-lg border border-[#f0d4dd] space-y-0.5">
            <span className="text-[10px] font-bold text-[#8c2444] uppercase tracking-wider block">
              Who is this for?
            </span>
            <p className="text-xs font-semibold text-[#26141c]">
              {notice.whoNeedsToAct.appliesTo}
            </p>
          </div>

          {/* Where */}
          <div className="p-3 bg-[#fdf6f8] rounded-lg border border-[#f0d4dd] space-y-0.5">
            <span className="text-[10px] font-bold text-[#8c2444] uppercase tracking-wider block">
              Where to go:
            </span>
            <p className="text-xs font-semibold text-[#26141c] truncate">
              {notice.contactOrOffice || 'Admin Block Counter'}
            </p>
          </div>

          {/* Last date */}
          <div className="p-3 bg-[#fdf6f8] rounded-lg border border-[#f0d4dd] space-y-0.5">
            <span className="text-[10px] font-bold text-[#8c2444] uppercase tracking-wider block">
              Last Date:
            </span>
            <p className="text-xs font-semibold text-[#26141c]">
              {notice.deadline || 'No fixed deadline'}
            </p>
          </div>
        </div>

        {/* What to carry / Items list (if any) */}
        {allItemsToBring.length > 0 && (
          <div className="p-3.5 bg-[#faf5f7] rounded-lg border border-[#ecd5de] space-y-2">
            <span className="text-xs font-bold text-[#8c2444] block">
              🎒 Things to carry with you:
            </span>
            <div className="flex flex-wrap gap-1.5">
              {allItemsToBring.map((item, idx) => (
                <span
                  key={idx}
                  className="text-xs font-semibold bg-white border border-[#ebd0d9] text-[#73263d] px-2.5 py-1 rounded-md shadow-sm"
                >
                  ✓ {item}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Step-by-Step Checklist */}
      <div className="bg-white rounded-xl border border-[#ebd0d9] p-5 sm:p-6 shadow-paper space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-[#f3dde3]">
          <div>
            <h2 className="font-serif-heading text-lg font-bold text-[#24131a]">
              What you need to do (Step-by-Step)
            </h2>
            <p className="text-xs text-[#6e505d] mt-0.5">
              Tap each item as you finish it.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <div className="w-20 sm:w-24 bg-[#f5e1e7] h-2 rounded-full overflow-hidden">
              <div
                className="bg-[#b8325a] h-full transition-all duration-300 rounded-full"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
            <span className="text-xs font-bold text-[#8c2444]">
              {completedSteps.length}/{totalSteps}
            </span>
          </div>
        </div>

        {/* Steps */}
        <div className="space-y-3">
          {notice.actionSteps.map((step) => {
            const isDone = completedSteps.includes(step.order);
            return (
              <div
                key={step.order}
                onClick={() => onToggleStep(notice.id, step.order)}
                className={`p-3.5 sm:p-4 rounded-lg border transition-all cursor-pointer flex items-start gap-3 ${
                  isDone
                    ? 'bg-[#fcf5f7] border-[#ecd4dc] opacity-75'
                    : 'bg-white border-[#ebd0d9] hover:border-[#b8325a] hover:bg-[#fffafb] shadow-sm'
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

                <div className="space-y-1 flex-1 min-w-0">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span
                      className={`text-sm font-bold ${
                        isDone ? 'line-through text-[#8c707d]' : 'text-[#26141c]'
                      }`}
                    >
                      Step {step.order}: {step.title}
                    </span>

                    {step.location && (
                      <span className="inline-flex items-center gap-1 text-[11px] text-[#8c2444] bg-[#fcedf1] px-2 py-0.5 rounded border border-[#f0cdd7]">
                        <MapPin className="w-3 h-3 text-[#b8325a]" />
                        <span>{step.location}</span>
                      </span>
                    )}
                  </div>

                  <p className="text-xs text-[#593d4b] leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Buttons for reducing complexity: Collapsible details */}
      <div className="space-y-3">
        {/* Toggle 1: Jargon Words Explained */}
        {notice.jargonDecoded && notice.jargonDecoded.length > 0 && (
          <div className="bg-white rounded-xl border border-[#ebd0d9] shadow-paper overflow-hidden">
            <button
              type="button"
              onClick={() => setShowJargon(!showJargon)}
              className="w-full p-4 flex items-center justify-between text-left hover:bg-[#fffafb] cursor-pointer"
            >
              <div className="flex items-center gap-2">
                <HelpCircle className="w-4 h-4 text-[#b8325a]" />
                <span className="text-sm font-bold text-[#24131a]">
                  Confusing words in this notice ({notice.jargonDecoded.length})
                </span>
              </div>
              <div className="flex items-center gap-1 text-xs font-semibold text-[#8c2444]">
                <span>{showJargon ? 'Hide' : 'Show explanations'}</span>
                {showJargon ? (
                  <ChevronUp className="w-4 h-4" />
                ) : (
                  <ChevronDown className="w-4 h-4" />
                )}
              </div>
            </button>

            {showJargon && (
              <div className="p-4 pt-0 border-t border-[#f3dde3] grid grid-cols-1 sm:grid-cols-2 gap-3 mt-3">
                {notice.jargonDecoded.map((jargon, idx) => (
                  <div
                    key={idx}
                    className="p-3 rounded-lg bg-[#fff8fa] border border-[#ebd4dc] space-y-1"
                  >
                    <span className="text-xs font-bold text-[#8c2444]">
                      {jargon.term}
                    </span>
                    <p className="text-xs text-[#5c404d] leading-relaxed">
                      {jargon.explanation}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Toggle 2: Office timings & What happens if missed */}
        <div className="bg-white rounded-xl border border-[#ebd0d9] shadow-paper overflow-hidden">
          <button
            type="button"
            onClick={() => setShowOfficeDetails(!showOfficeDetails)}
            className="w-full p-4 flex items-center justify-between text-left hover:bg-[#fffafb] cursor-pointer"
          >
            <div className="flex items-center gap-2">
              <Building className="w-4 h-4 text-[#b8325a]" />
              <span className="text-sm font-bold text-[#24131a]">
                Office timings & what happens if you miss the deadline
              </span>
            </div>
            <div className="flex items-center gap-1 text-xs font-semibold text-[#8c2444]">
              <span>{showOfficeDetails ? 'Hide' : 'Show details'}</span>
              {showOfficeDetails ? (
                <ChevronUp className="w-4 h-4" />
              ) : (
                <ChevronDown className="w-4 h-4" />
              )}
            </div>
          </button>

          {showOfficeDetails && (
            <div className="p-4 pt-0 border-t border-[#f3dde3] space-y-3 mt-3">
              {/* Timing */}
              <div className="p-3 bg-[#fdf6f8] rounded-lg border border-[#f0d4dd] text-xs text-[#6e4e5b]">
                <span className="font-bold text-[#8c2444] block mb-1">
                  ⏰ Working Counter Hours:
                </span>
                <p>
                  10:00 AM to 4:00 PM (Monday to Friday). Note: Lunch break is usually 1:00 PM – 2:00 PM; counters stop taking files by 12:45 PM.
                </p>
              </div>

              {/* What happens if missed */}
              {notice.consequencesIfMissed && (
                <div className="p-3 bg-[#fff8fa] rounded-lg border border-[#f2ccd6] text-xs text-[#991d3c]">
                  <span className="font-bold block mb-1">
                    ⚠️ What happens if you miss it:
                  </span>
                  <p>{notice.consequencesIfMissed}</p>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Toggle 3: Ask a question about this notice */}
        <div className="bg-white rounded-xl border border-[#ebd0d9] shadow-paper overflow-hidden">
          <button
            type="button"
            onClick={() => setShowAskDesk(!showAskDesk)}
            className="w-full p-4 flex items-center justify-between text-left hover:bg-[#fffafb] cursor-pointer"
          >
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#b8325a]" />
              <span className="text-sm font-bold text-[#24131a]">
                Have a question about this notice? (Ask Senior)
              </span>
            </div>
            <div className="flex items-center gap-1 text-xs font-semibold text-[#8c2444]">
              <span>{showAskDesk ? 'Close' : 'Ask question'}</span>
              {showAskDesk ? (
                <ChevronUp className="w-4 h-4" />
              ) : (
                <ChevronDown className="w-4 h-4" />
              )}
            </div>
          </button>

          {showAskDesk && (
            <div className="p-4 pt-0 border-t border-[#f3dde3] space-y-3 mt-3">
              {/* Chat History */}
              {qaHistory.length > 0 && (
                <div className="space-y-2 max-h-60 overflow-y-auto">
                  {qaHistory.map((item, idx) => (
                    <div key={idx} className="space-y-1 text-xs">
                      <div className="bg-[#fcedf1] p-2 rounded text-[#73263c] font-medium">
                        <strong>You:</strong> {item.q}
                      </div>
                      <div className="bg-[#fff9fa] p-2 rounded text-[#3b242e] border border-[#ebd2dc]">
                        <strong>Answer:</strong> {item.a}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Input */}
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={userQuestion}
                  onChange={(e) => setUserQuestion(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') handleSendQuestion();
                  }}
                  placeholder="e.g. Can I submit a DigiLocker printout?"
                  className="flex-1 bg-[#fdfafb] border border-[#edd2db] rounded-lg px-3 py-2 text-xs text-[#24131a] focus:outline-none focus:bg-white focus:ring-1 focus:ring-[#b8325a]"
                />
                <button
                  type="button"
                  onClick={() => handleSendQuestion()}
                  disabled={isAsking || !userQuestion.trim()}
                  className="px-3 py-2 bg-[#b8325a] hover:bg-[#a12448] disabled:opacity-50 text-white rounded-lg text-xs font-semibold cursor-pointer"
                >
                  {isAsking ? '...' : 'Ask'}
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Toggle 4: Original raw notice text (hidden by default) */}
        {notice.rawContent && (
          <div className="bg-white rounded-xl border border-[#ebd0d9] shadow-paper overflow-hidden">
            <button
              type="button"
              onClick={() => setShowFullNoticeText(!showFullNoticeText)}
              className="w-full p-4 flex items-center justify-between text-left hover:bg-[#fffafb] cursor-pointer"
            >
              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4 text-[#8c6b78]" />
                <span className="text-xs font-medium text-[#6e505d]">
                  Show original official notice text
                </span>
              </div>
              <span className="text-xs text-[#8c6b78]">
                {showFullNoticeText ? 'Hide' : 'View original'}
              </span>
            </button>

            {showFullNoticeText && (
              <div className="p-4 pt-0 border-t border-[#f3dde3] mt-3">
                <pre className="text-[11px] font-mono text-[#5c404d] bg-[#faf6f7] p-3 rounded-lg overflow-x-auto whitespace-pre-wrap leading-relaxed">
                  {notice.rawContent}
                </pre>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
