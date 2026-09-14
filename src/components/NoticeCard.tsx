import React from 'react';
import { Clock, MapPin, CheckCircle2, ArrowRight } from 'lucide-react';
import { ClarifiedNotice, FresherProfile } from '../types';

interface NoticeCardProps {
  notice: ClarifiedNotice;
  profile: FresherProfile;
  onClick: () => void;
  onToggleStep?: (stepOrder: number) => void;
}

export const NoticeCard: React.FC<NoticeCardProps> = ({ notice, profile, onClick }) => {
  const isHostelSpecific = notice.category === 'hostel' || notice.title.toLowerCase().includes('hostel');
  const isHosteler = profile.residence === 'Hosteler';

  const isExempt = isHostelSpecific && !isHosteler;
  const completedCount = notice.userCompletedSteps?.length || 0;
  const totalSteps = notice.actionSteps.length;

  return (
    <div
      onClick={onClick}
      className="bg-white rounded-xl border border-pink-100 p-5 hover:border-pink-300 hover:shadow-sm transition-all cursor-pointer flex flex-col justify-between"
    >
      <div>
        {/* Top Badges */}
        <div className="flex items-center justify-between gap-2 mb-2.5">
          <span className="text-xs font-semibold text-pink-700 bg-pink-50 px-2 py-0.5 rounded">
            {notice.department || 'Campus Office'}
          </span>

          <div className="flex items-center gap-1.5">
            {isExempt ? (
              <span className="text-[11px] font-medium bg-slate-100 text-slate-600 px-2 py-0.5 rounded">
                Exempt for you
              </span>
            ) : notice.urgency === 'CRITICAL' ? (
              <span className="text-[11px] font-bold bg-rose-50 text-rose-700 border border-rose-200 px-2 py-0.5 rounded">
                Due Soon
              </span>
            ) : (
              <span className="text-[11px] font-medium bg-pink-50 text-pink-700 px-2 py-0.5 rounded">
                Important
              </span>
            )}
          </div>
        </div>

        {/* Title */}
        <h3 className="text-sm sm:text-base font-bold text-slate-900 leading-snug mb-2 hover:text-pink-600 transition-colors">
          {notice.title}
        </h3>

        {/* Short Plain-English Summary */}
        <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed mb-4">
          {notice.tldr || notice.summary}
        </p>
      </div>

      {/* Card Footer: Deadline & Action */}
      <div className="pt-3 border-t border-pink-50 flex items-center justify-between text-xs text-slate-500">
        <div className="flex items-center gap-1.5 truncate mr-2">
          <Clock className="w-3.5 h-3.5 text-pink-500 shrink-0" />
          <span className="truncate font-medium text-slate-700">
            {notice.deadline || 'No fixed deadline'}
          </span>
        </div>

        <div className="flex items-center gap-1 text-pink-600 font-semibold shrink-0">
          <span>{totalSteps > 0 ? `${completedCount}/${totalSteps} done` : 'View'}</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </div>
      </div>
    </div>
  );
};

