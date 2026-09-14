import React from 'react';
import { Clock, AlertCircle, ArrowRight, CheckCircle2 } from 'lucide-react';
import { ClarifiedNotice } from '../types';

interface DeadlinesBannerProps {
  notices: ClarifiedNotice[];
  onSelectNotice: (notice: ClarifiedNotice) => void;
}

export const DeadlinesBanner: React.FC<DeadlinesBannerProps> = ({
  notices,
  onSelectNotice,
}) => {
  // Filter notices with deadlines that have pending action steps
  const actionableDeadlines = notices
    .filter((n) => n.deadline && n.urgency !== 'INFORMATIONAL')
    .slice(0, 3);

  if (actionableDeadlines.length === 0) return null;

  return (
    <div className="bg-gradient-to-r from-pink-50 via-rose-50/70 to-pink-50 text-slate-900 border border-pink-200/80 rounded-2xl p-5 sm:p-6 shadow-xs mb-8">
      <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-pink-100 text-pink-700 border border-pink-200">
            <Clock className="w-5 h-5 animate-pulse" />
          </div>
          <div>
            <h2 className="text-base sm:text-lg font-bold tracking-tight text-slate-900">
              Upcoming Deadlines You Can't Afford to Miss
            </h2>
            <p className="text-xs text-slate-600">
              Clear actions required for 1st Year enrollment & academic clearance
            </p>
          </div>
        </div>

        <span className="text-xs px-2.5 py-1 rounded-full bg-white border border-pink-200 text-pink-700 font-semibold shadow-2xs">
          {actionableDeadlines.length} Active Deadlines
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {actionableDeadlines.map((n) => {
          const completedCount = n.userCompletedSteps?.length || 0;
          const totalCount = n.actionSteps.length;
          const isAllDone = totalCount > 0 && completedCount === totalCount;

          return (
            <div
              key={n.id}
              onClick={() => onSelectNotice(n)}
              className="group bg-white hover:bg-pink-50/50 border border-pink-100 hover:border-pink-300 rounded-xl p-3.5 transition-all cursor-pointer flex flex-col justify-between shadow-2xs"
            >
              <div>
                <div className="flex items-center justify-between text-[11px] mb-1.5">
                  <span className="font-semibold text-rose-600 flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {n.deadline}
                  </span>
                  <span className="px-1.5 py-0.5 rounded text-[10px] uppercase font-bold bg-pink-50 text-pink-700 border border-pink-200">
                    {n.urgency}
                  </span>
                </div>

                <h4 className="text-xs sm:text-sm font-semibold text-slate-900 group-hover:text-pink-600 transition-colors line-clamp-1 mb-1">
                  {n.title}
                </h4>

                <p className="text-[11px] text-slate-600 line-clamp-2 mb-2 leading-relaxed">
                  {n.tldr}
                </p>
              </div>

              <div className="pt-2 border-t border-pink-100/70 flex items-center justify-between text-[11px] text-slate-500">
                <span className="flex items-center gap-1">
                  {isAllDone ? (
                    <span className="text-pink-600 font-medium flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3" /> Done
                    </span>
                  ) : (
                    <span>
                      {completedCount}/{totalCount} tasks completed
                    </span>
                  )}
                </span>
                <span className="text-pink-600 font-semibold group-hover:translate-x-1 transition-transform flex items-center gap-0.5">
                  View <ArrowRight className="w-3 h-3" />
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
