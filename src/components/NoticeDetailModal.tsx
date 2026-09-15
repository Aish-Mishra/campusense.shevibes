import React, { useState } from 'react';
import {
  X,
  Clock,
  MapPin,
  CheckCircle2,
  Circle,
  AlertTriangle,
  Copy,
  Check,
  Send,
  Building,
} from 'lucide-react';
import { ClarifiedNotice, FresherProfile } from '../types';
import { answerNoticeQuestionLocal } from '../../localNoticeParser';

interface NoticeDetailModalProps {
  notice: ClarifiedNotice | null;
  profile: FresherProfile;
  onClose: () => void;
  onToggleStep: (noticeId: string, stepOrder: number) => void;
}

export const NoticeDetailModal: React.FC<NoticeDetailModalProps> = ({
  notice,
  profile,
  onClose,
  onToggleStep,
}) => {
  if (!notice) return null;

  const [copiedWhatsapp, setCopiedWhatsapp] = useState(false);
  const [userQuestion, setUserQuestion] = useState('');
  const [qaHistory, setQaHistory] = useState<Array<{ q: string; a: string }>>([]);
  const [isAsking, setIsAsking] = useState(false);

  const completedSteps = notice.userCompletedSteps || [];

  const handleCopyWhatsapp = () => {
    navigator.clipboard.writeText(notice.whatsappSummary);
    setCopiedWhatsapp(true);
    setTimeout(() => setCopiedWhatsapp(false), 2000);
  };

  const handleAskQuestion = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const q = userQuestion.trim();
    if (!q || isAsking) return;

    setIsAsking(true);
    setUserQuestion('');

    try {
      let answer = '';
      try {
        const res = await fetch('/api/ask-notice', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            noticeText: notice.rawContent,
            noticeSummary: {
              title: notice.title,
              department: notice.department,
              deadline: notice.deadline,
              tldr: notice.tldr,
              whoNeedsToAct: notice.whoNeedsToAct,
              actionSteps: notice.actionSteps,
            },
            question: q,
            studentContext: profile,
          }),
        });

        if (res.ok) {
          const data = await res.json();
          answer = data.answer || '';
        }
      } catch (e) {
        console.warn('API question answer fallback triggered:', e);
      }

      if (!answer) {
        answer = answerNoticeQuestionLocal(
          q,
          notice.rawContent,
          {
            title: notice.title,
            department: notice.department,
            deadline: notice.deadline,
            tldr: notice.tldr,
            whoNeedsToAct: notice.whoNeedsToAct,
            actionSteps: notice.actionSteps,
          },
          profile
        );
      }

      setQaHistory((prev) => [...prev, { q, a: answer }]);
    } catch (err) {
      const fallbackAns = answerNoticeQuestionLocal(q, notice.rawContent, notice, profile);
      setQaHistory((prev) => [
        ...prev,
        {
          q,
          a: fallbackAns || 'Please confirm with your department counter.',
        },
      ]);
    } finally {
      setIsAsking(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 overflow-y-auto bg-slate-900/50">
      <div
        className="bg-white rounded-2xl shadow-xl border border-pink-100 w-full max-w-2xl max-h-[90vh] flex flex-col overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Simple Header */}
        <div className="p-5 border-b border-pink-100 flex items-start justify-between gap-3">
          <div>
            <div className="flex items-center gap-2 mb-1.5 text-xs">
              <span className="font-semibold text-pink-700 bg-pink-50 px-2 py-0.5 rounded">
                {notice.department}
              </span>
              {notice.deadline && (
                <span className="text-slate-600 flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-pink-500" />
                  Due: <strong>{notice.deadline}</strong>
                </span>
              )}
            </div>
            <h2 className="text-base sm:text-lg font-bold text-slate-900 leading-snug">
              {notice.title}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 overflow-y-auto space-y-5 flex-1 text-xs sm:text-sm">
          {/* 1. Summary */}
          <div className="bg-pink-50/40 border border-pink-100 rounded-xl p-3.5">
            <h3 className="font-bold text-pink-900 mb-1">Summary in Plain English</h3>
            <p className="text-slate-700 leading-relaxed">
              {notice.tldr || notice.summary}
            </p>
          </div>

          {/* 2. Who Needs To Act */}
          <div className="bg-white border border-pink-100 rounded-xl p-3.5 space-y-1">
            <h3 className="font-bold text-slate-900">Who needs to act?</h3>
            <p className="text-slate-600">
              <span className="font-medium text-slate-800">Applies to:</span> {notice.whoNeedsToAct.appliesTo}
            </p>
            {notice.whoNeedsToAct.exempt && (
              <p className="text-slate-500 text-xs">
                <span className="font-medium text-slate-700">Exempt:</span> {notice.whoNeedsToAct.exempt}
              </p>
            )}
          </div>

          {/* 3. Action Checklist */}
          {notice.actionSteps.length > 0 && (
            <div>
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-bold text-slate-900">Action Checklist</h3>
                <span className="text-xs text-slate-500">
                  {completedSteps.length} of {notice.actionSteps.length} completed
                </span>
              </div>
              <div className="space-y-2">
                {notice.actionSteps.map((step) => {
                  const isDone = completedSteps.includes(step.order);
                  return (
                    <div
                      key={step.order}
                      onClick={() => onToggleStep(notice.id, step.order)}
                      className={`p-3 rounded-xl border flex items-start gap-2.5 cursor-pointer transition-colors ${
                        isDone ? 'bg-pink-50/30 border-pink-200' : 'bg-white border-pink-100 hover:border-pink-200'
                      }`}
                    >
                      <div className="mt-0.5 shrink-0">
                        {isDone ? (
                          <CheckCircle2 className="w-4 h-4 text-pink-600 fill-pink-50" />
                        ) : (
                          <Circle className="w-4 h-4 text-slate-300" />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className={`font-semibold text-xs sm:text-sm ${isDone ? 'line-through text-slate-400' : 'text-slate-900'}`}>
                          {step.title}
                        </p>
                        <p className={`text-xs mt-0.5 ${isDone ? 'text-slate-400' : 'text-slate-600'}`}>
                          {step.description}
                        </p>
                        {step.location && (
                          <span className="inline-flex items-center gap-1 text-[11px] text-pink-700 mt-1 font-medium">
                            <MapPin className="w-3 h-3 text-pink-400" />
                            {step.location}
                          </span>
                        )}
                        {step.itemsToBring && step.itemsToBring.length > 0 && (
                          <div className="flex flex-wrap gap-1 mt-1.5">
                            {step.itemsToBring.map((item, idx) => (
                              <span key={idx} className="text-[11px] bg-slate-100 text-slate-700 px-1.5 py-0.5 rounded">
                                📄 {item}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* 4. Location & WhatsApp Share */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3 bg-pink-50/20 border border-pink-100 rounded-xl">
            {notice.contactOrOffice && (
              <div className="flex items-center gap-2">
                <Building className="w-4 h-4 text-pink-600 shrink-0" />
                <span className="text-xs text-slate-700">
                  <strong>Office / Counter:</strong> {notice.contactOrOffice}
                </span>
              </div>
            )}
            <button
              onClick={handleCopyWhatsapp}
              className="inline-flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-lg border border-pink-200 bg-white hover:bg-pink-50 text-slate-700 text-xs font-semibold transition-colors"
            >
              {copiedWhatsapp ? <Check className="w-3.5 h-3.5 text-pink-600" /> : <Copy className="w-3.5 h-3.5 text-pink-600" />}
              <span>{copiedWhatsapp ? 'Copied to Clipboard!' : 'Copy for WhatsApp'}</span>
            </button>
          </div>

          {/* 5. Ask a Question (AI Assistant) */}
          <div className="border-t border-pink-100 pt-4">
            <h3 className="font-bold text-slate-900 mb-2">Have a question about this notice?</h3>
            {qaHistory.length > 0 && (
              <div className="space-y-2 mb-3">
                {qaHistory.map((item, idx) => (
                  <div key={idx} className="text-xs space-y-1">
                    <p className="font-semibold text-pink-900">Q: {item.q}</p>
                    <p className="bg-pink-50 p-2.5 rounded-lg text-slate-700 border border-pink-100">
                      {item.a}
                    </p>
                  </div>
                ))}
              </div>
            )}
            <form onSubmit={handleAskQuestion} className="flex gap-2">
              <input
                type="text"
                value={userQuestion}
                onChange={(e) => setUserQuestion(e.target.value)}
                placeholder="Ask e.g. 'Can I submit DigiLocker marksheet?'"
                disabled={isAsking}
                className="flex-1 bg-white border border-pink-200 rounded-lg px-3 py-2 text-xs text-slate-900 placeholder:text-slate-400 focus:outline-hidden focus:border-pink-500"
              />
              <button
                type="submit"
                disabled={!userQuestion.trim() || isAsking}
                className="px-3 py-2 rounded-lg bg-pink-600 hover:bg-pink-700 disabled:opacity-50 text-white font-semibold text-xs flex items-center gap-1"
              >
                <span>{isAsking ? 'Thinking...' : 'Ask'}</span>
                <Send className="w-3 h-3" />
              </button>
            </form>
          </div>
        </div>

        {/* Footer */}
        <div className="p-3.5 border-t border-pink-100 bg-white flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-pink-50 hover:bg-pink-100 text-pink-700 text-xs font-semibold"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

