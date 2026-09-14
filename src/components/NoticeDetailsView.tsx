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
          a: 'Could not fetch answer right now. Please verify with the campus administrative counter.',
        },
      ]);
    } finally {
      setIsAsking(false);
    }
  };

  const QUICK_QUESTIONS = [
    'What documents must I carry?',
    'Where is the submission counter located?',
    'What happens if I miss this deadline?',
    'Can I submit online or via DigiLocker?',
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-8 py-4">
      {/* Navigation Top Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <button
          type="button"
          onClick={onBackToBoard}
          className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-pink-800 hover:text-pink-950 bg-pink-100/70 hover:bg-pink-200/70 px-4 py-2 rounded-xl transition-all cursor-pointer border border-pink-200"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Notice Board</span>
        </button>

        <button
          type="button"
          onClick={onNewNotice}
          className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-slate-700 hover:text-slate-900 bg-white hover:bg-pink-50 px-4 py-2 rounded-xl transition-all cursor-pointer border border-pink-200 shadow-2xs"
        >
          <Sparkles className="w-4 h-4 text-pink-600" />
          <span>Simplify Another Notice</span>
        </button>
      </div>

      {/* Notice Title & Meta Header Card */}
      <div className="bg-pink-50 rounded-2xl border border-pink-200 p-6 sm:p-8 space-y-4 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-2.5">
          <div className="flex items-center gap-2 text-xs font-semibold text-pink-900 bg-pink-200/70 px-3 py-1.5 rounded-lg border border-pink-300">
            <Building className="w-3.5 h-3.5 text-pink-700" />
            <span>{notice.department}</span>
          </div>

          <div className="flex items-center gap-2">
            {notice.urgency === 'CRITICAL' ? (
              <span className="text-xs font-bold px-3 py-1 rounded-full bg-red-100 text-red-800 border border-red-200 flex items-center gap-1.5">
                <AlertCircle className="w-3.5 h-3.5" />
                Critical Priority
              </span>
            ) : notice.urgency === 'IMPORTANT' ? (
              <span className="text-xs font-bold px-3 py-1 rounded-full bg-amber-100 text-amber-800 border border-amber-200 flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5" />
                Important Notice
              </span>
            ) : (
              <span className="text-xs font-bold px-3 py-1 rounded-full bg-blue-100 text-blue-800 border border-blue-200">
                Informational
              </span>
            )}

            {notice.deadline && (
              <span className="text-xs font-bold px-3 py-1 rounded-full bg-pink-600 text-white flex items-center gap-1.5 shadow-2xs">
                <Clock className="w-3.5 h-3.5" />
                <span>Deadline: {notice.deadline}</span>
              </span>
            )}
          </div>
        </div>

        <h1 className="text-xl sm:text-2xl font-bold text-slate-900 leading-snug">
          {notice.title}
        </h1>

        {/* TL;DR Plain English Summary */}
        <div className="p-4 sm:p-5 rounded-xl bg-white/90 border border-pink-200 space-y-1.5">
          <span className="text-[11px] font-bold uppercase tracking-wider text-pink-900">
            Plain English Summary
          </span>
          <p className="text-slate-700 text-sm sm:text-base leading-relaxed">
            {notice.tldr}
          </p>
        </div>
      </div>

      {/* Action Checklist Box */}
      <div className="bg-pink-50 rounded-2xl border border-pink-200 p-6 sm:p-8 space-y-6 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-pink-200/80">
          <div>
            <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <FileCheck className="w-5 h-5 text-pink-700" />
              <span>Step-by-Step Action Checklist</span>
            </h2>
            <p className="text-xs text-slate-600 mt-0.5">
              Click checkboxes as you complete each task to track your progress.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-32 bg-pink-200/70 h-2.5 rounded-full overflow-hidden">
              <div
                className="bg-pink-600 h-full transition-all duration-300 rounded-full"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
            <span className="text-xs font-bold text-pink-950 min-w-16 text-right">
              {completedSteps.length} of {totalSteps} done
            </span>
          </div>
        </div>

        {/* Steps List */}
        <div className="space-y-4">
          {notice.actionSteps.map((step) => {
            const isDone = completedSteps.includes(step.order);
            return (
              <div
                key={step.order}
                onClick={() => onToggleStep(notice.id, step.order)}
                className={`p-4 sm:p-5 rounded-xl border transition-all cursor-pointer flex items-start gap-4 ${
                  isDone
                    ? 'bg-pink-200/40 border-pink-300/80 opacity-75'
                    : 'bg-white border-pink-200 hover:border-pink-400 hover:shadow-xs'
                }`}
              >
                <button
                  type="button"
                  className="mt-0.5 text-pink-700 hover:text-pink-900 shrink-0 cursor-pointer"
                >
                  {isDone ? (
                    <CheckCircle2 className="w-5 h-5 text-pink-700 fill-pink-100" />
                  ) : (
                    <Circle className="w-5 h-5 text-slate-400" />
                  )}
                </button>

                <div className="space-y-2 flex-1 min-w-0">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <h3
                      className={`text-sm sm:text-base font-bold ${
                        isDone ? 'line-through text-slate-500' : 'text-slate-900'
                      }`}
                    >
                      Step {step.order}: {step.title}
                    </h3>

                    {step.location && (
                      <span className="inline-flex items-center gap-1 text-xs text-pink-900 bg-pink-100 px-2.5 py-1 rounded-md border border-pink-200 shrink-0">
                        <MapPin className="w-3 h-3 text-pink-700" />
                        <span>{step.location}</span>
                      </span>
                    )}
                  </div>

                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {step.description}
                  </p>

                  {step.itemsToBring && step.itemsToBring.length > 0 && (
                    <div className="pt-2">
                      <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block mb-1.5">
                        Items to carry:
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {step.itemsToBring.map((item, i) => (
                          <span
                            key={i}
                            className="text-xs bg-pink-100/70 border border-pink-200 text-pink-950 px-2.5 py-1 rounded-md"
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

      {/* Target Audience & Eligibility Box */}
      <div className="bg-pink-50 rounded-2xl border border-pink-200 p-6 sm:p-8 space-y-4 shadow-sm">
        <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
          <Users className="w-4 h-4 text-pink-700" />
          <span>Who Needs to Act?</span>
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-4 bg-white/90 rounded-xl border border-pink-200 space-y-1">
            <span className="text-[11px] font-bold text-pink-900 uppercase tracking-wider">
              Must Take Action:
            </span>
            <p className="text-xs sm:text-sm text-slate-800 font-medium">
              {notice.whoNeedsToAct.appliesTo}
            </p>
          </div>

          <div className="p-4 bg-white/90 rounded-xl border border-pink-200 space-y-1">
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
              Exempt / Not Applicable:
            </span>
            <p className="text-xs sm:text-sm text-slate-600">
              {notice.whoNeedsToAct.exempt || 'No exemptions specified.'}
            </p>
          </div>
        </div>
      </div>

      {/* Decoded Campus Jargon Box */}
      {notice.jargonDecoded && notice.jargonDecoded.length > 0 && (
        <div className="bg-pink-50 rounded-2xl border border-pink-200 p-6 sm:p-8 space-y-4 shadow-sm">
          <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <HelpCircle className="w-4 h-4 text-pink-700" />
            <span>Campus Jargon in this Notice Decoded</span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            {notice.jargonDecoded.map((jargon, idx) => (
              <div
                key={idx}
                className="p-4 rounded-xl bg-white border border-pink-200 space-y-1.5"
              >
                <div className="text-xs sm:text-sm font-bold text-pink-950">
                  {jargon.term}
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {jargon.explanation}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Warnings & Consequences Box */}
      {notice.consequencesIfMissed && (
        <div className="bg-pink-50 rounded-2xl border border-pink-200 p-5 sm:p-6 shadow-sm flex items-start gap-3.5">
          <div className="p-2 rounded-xl bg-amber-100 text-amber-800 shrink-0">
            <AlertTriangle className="w-5 h-5" />
          </div>
          <div className="space-y-1">
            <h3 className="text-xs sm:text-sm font-bold text-slate-900">
              Consequences if Deadline is Missed:
            </h3>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
              {notice.consequencesIfMissed}
            </p>
          </div>
        </div>
      )}

      {/* Venue & WhatsApp Copy Bar */}
      <div className="bg-pink-50 rounded-2xl border border-pink-200 p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm">
        <div className="space-y-1 text-center sm:text-left">
          <span className="text-[11px] font-bold uppercase tracking-wider text-pink-900">
            Office & Counter Location
          </span>
          <p className="text-sm font-bold text-slate-900 flex items-center gap-1.5 justify-center sm:justify-start">
            <MapPin className="w-4 h-4 text-pink-700" />
            <span>{notice.contactOrOffice}</span>
          </p>
        </div>

        <button
          type="button"
          onClick={handleCopyWhatsapp}
          className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-pink-600 hover:bg-pink-700 text-white text-xs sm:text-sm font-bold shadow-xs transition-all flex items-center justify-center gap-2 cursor-pointer"
        >
          {copiedWhatsapp ? (
            <>
              <Check className="w-4 h-4" />
              <span>Copied for WhatsApp!</span>
            </>
          ) : (
            <>
              <Share2 className="w-4 h-4" />
              <span>Copy WhatsApp Summary</span>
            </>
          )}
        </button>
      </div>

      {/* Interactive Senior Mentor Q&A Box */}
      <div className="bg-pink-50 rounded-2xl border border-pink-200 p-6 sm:p-8 space-y-5 shadow-sm">
        <div className="space-y-1">
          <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-pink-700" />
            <span>Still Have Questions? Ask Senior Mentor AI</span>
          </h2>
          <p className="text-xs text-slate-600">
            Ask any question about documents, venue rooms, or exceptions regarding this circular.
          </p>
        </div>

        {/* Quick Question Chips */}
        <div className="flex flex-wrap gap-2">
          {QUICK_QUESTIONS.map((q, i) => (
            <button
              key={i}
              type="button"
              onClick={() => handleSendQuestion(q)}
              disabled={isAsking}
              className="text-xs bg-white hover:bg-pink-100/70 border border-pink-200 text-pink-950 px-3 py-1.5 rounded-lg transition-all cursor-pointer"
            >
              {q}
            </button>
          ))}
        </div>

        {/* Q&A Chat History */}
        {qaHistory.length > 0 && (
          <div className="space-y-3 pt-2">
            {qaHistory.map((item, idx) => (
              <div key={idx} className="space-y-2">
                <div className="bg-pink-100/70 border border-pink-200 rounded-xl p-3 text-xs sm:text-sm text-pink-950 font-medium ml-4">
                  <span className="font-bold text-pink-900">You: </span>
                  {item.q}
                </div>
                <div className="bg-white border border-pink-200 rounded-xl p-4 text-xs sm:text-sm text-slate-800 leading-relaxed whitespace-pre-line mr-4 shadow-2xs">
                  <span className="font-bold text-pink-800">Senior Mentor: </span>
                  {item.a}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Input Bar */}
        <div className="flex items-center gap-2 pt-2">
          <input
            type="text"
            value={userQuestion}
            onChange={(e) => setUserQuestion(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleSendQuestion();
            }}
            placeholder="Type your question about this notice..."
            disabled={isAsking}
            className="flex-1 bg-white border border-pink-300 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-pink-500"
          />
          <button
            type="button"
            onClick={() => handleSendQuestion()}
            disabled={isAsking || !userQuestion.trim()}
            className="px-4 py-2.5 bg-pink-600 hover:bg-pink-700 disabled:opacity-50 text-white rounded-xl text-xs sm:text-sm font-bold flex items-center gap-1.5 cursor-pointer shadow-xs transition-all"
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
  );
};
