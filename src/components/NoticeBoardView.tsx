import React, { useState } from 'react';
import {
  Search,
  Clock,
  MapPin,
  ArrowRight,
  Sparkles,
  SlidersHorizontal,
  Zap,
  CheckCircle2,
  X,
  AlertTriangle,
} from 'lucide-react';
import { ClarifiedNotice } from '../types';

interface NoticeBoardViewProps {
  notices: ClarifiedNotice[];
  onSelectNotice: (notice: ClarifiedNotice) => void;
  onNewNotice: () => void;
  isSimpleMode: boolean;
  onToggleSimpleMode: () => void;
}

const QUICK_FILTERS = [
  { id: 'all', label: 'All Notices' },
  { id: 'urgent', label: '🚨 Urgent Only' },
  { id: 'academic', label: '📄 Certificates & Docs' },
  { id: 'exams', label: '⚠️ Attendance & Exams' },
  { id: 'hostel', label: '🏠 Hostel' },
];

export const NoticeBoardView: React.FC<NoticeBoardViewProps> = ({
  notices,
  onSelectNotice,
  onNewNotice,
  isSimpleMode,
  onToggleSimpleMode,
}) => {
  const [selectedFilter, setSelectedFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const filteredNotices = notices.filter((notice) => {
    if (selectedFilter === 'urgent' && notice.urgency !== 'CRITICAL') return false;
    if (selectedFilter === 'academic' && notice.category !== 'academic') return false;
    if (selectedFilter === 'exams' && notice.category !== 'exams') return false;
    if (selectedFilter === 'hostel' && notice.category !== 'hostel') return false;

    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return (
      notice.title.toLowerCase().includes(q) ||
      notice.tldr.toLowerCase().includes(q) ||
      notice.contactOrOffice.toLowerCase().includes(q) ||
      (notice.department && notice.department.toLowerCase().includes(q))
    );
  });

  return (
    <div className="space-y-6 pb-12">
      {/* Friendly Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#ebd2db] pb-4">
        <div>
          <h1 className="font-serif-heading text-2xl sm:text-3xl font-bold text-[#26141c]">
            College Notices
          </h1>
          <p className="text-xs sm:text-sm text-[#6e505d] mt-1">
            See exactly what you have to do, where to go, and when it’s due — in plain English.
          </p>
        </div>

        {/* Action Buttons: Complexity Toggle + Paste */}
        <div className="flex items-center gap-2 self-start sm:self-auto">
          <button
            type="button"
            onClick={onToggleSimpleMode}
            className={`inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer border ${
              isSimpleMode
                ? 'bg-[#8c2444] text-white border-[#8c2444] shadow-button-press'
                : 'bg-white text-[#8c2444] border-[#ebd0d9] hover:bg-[#fff0f4]'
            }`}
          >
            {isSimpleMode ? (
              <>
                <Zap className="w-3.5 h-3.5 text-yellow-300 fill-yellow-300" />
                <span>Simple Cards: ON</span>
              </>
            ) : (
              <>
                <SlidersHorizontal className="w-3.5 h-3.5 text-[#8c2444]" />
                <span>Show Detailed Cards</span>
              </>
            )}
          </button>

          <button
            type="button"
            onClick={onNewNotice}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-[#b8325a] hover:bg-[#a12448] text-white text-xs font-semibold shadow-button-press cursor-pointer transition-all"
          >
            <Sparkles className="w-3.5 h-3.5 text-rose-200" />
            <span>Explain a Notice</span>
          </button>
        </div>
      </div>

      {/* Quick Filter Buttons & Search */}
      <div className="space-y-3">
        {/* Buttons for reducing complexity: 1-click filters */}
        <div className="flex items-center gap-2 overflow-x-auto scrollbar-none pb-1">
          {QUICK_FILTERS.map((filter) => {
            const isSelected = selectedFilter === filter.id;
            return (
              <button
                key={filter.id}
                type="button"
                onClick={() => setSelectedFilter(filter.id)}
                className={`text-xs font-semibold px-3 py-1.5 rounded-lg border transition-all whitespace-nowrap cursor-pointer ${
                  isSelected
                    ? 'bg-[#8c2444] text-white border-[#8c2444] shadow-button-press'
                    : 'bg-white text-[#573d49] border-[#ebd0d9] hover:bg-[#fff2f5]'
                }`}
              >
                {filter.label}
              </button>
            );
          })}
        </div>

        {/* Minimal Search Bar */}
        <div className="relative">
          <Search className="w-4 h-4 text-[#997987] absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by keyword, room number, or certificate..."
            className="w-full bg-white border border-[#ebd0d9] rounded-lg pl-9 pr-8 py-2 text-xs sm:text-sm text-[#26141c] placeholder:text-[#997987] focus:outline-none focus:ring-1 focus:ring-[#b8325a]"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery('')}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#997987] hover:text-[#26141c] cursor-pointer"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* Notice List */}
      {filteredNotices.length === 0 ? (
        <div className="bg-white rounded-xl border border-[#ebd0d9] p-8 text-center space-y-3 shadow-paper">
          <p className="text-sm font-semibold text-[#26141c]">No notices match your filter</p>
          <p className="text-xs text-[#6e505d]">
            Try clicking "All Notices" or paste a new circular to explain it.
          </p>
          <button
            type="button"
            onClick={() => {
              setSelectedFilter('all');
              setSearchQuery('');
            }}
            className="text-xs font-bold text-[#8c2444] hover:underline cursor-pointer"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredNotices.map((notice) => {
            const completedCount = (notice.userCompletedSteps || []).length;
            const totalCount = notice.actionSteps.length;
            const isAllDone = totalCount > 0 && completedCount === totalCount;

            return (
              <div
                key={notice.id}
                onClick={() => onSelectNotice(notice)}
                className="bg-white hover:bg-[#fffbfc] border border-[#ebd0d9] hover:border-[#b8325a] rounded-xl p-5 shadow-paper transition-all cursor-pointer flex flex-col justify-between space-y-3 group"
              >
                {/* Notice Header: Urgency & Department */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between gap-2">
                    {notice.urgency === 'CRITICAL' ? (
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-[#fdf0f3] text-[#991d3c] border border-[#f7ccd7] flex items-center gap-1">
                        <AlertTriangle className="w-3 h-3 text-[#b8325a]" />
                        Urgent Action Needed
                      </span>
                    ) : (
                      <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-[#fdf5f7] text-[#73505c] border border-[#eed0d9]">
                        Notice
                      </span>
                    )}

                    {completedCount > 0 && (
                      <span className="text-[11px] font-semibold text-[#8c2444] flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#b8325a]" />
                        <span>
                          {completedCount}/{totalCount} done
                        </span>
                      </span>
                    )}
                  </div>

                  {/* Title */}
                  <h2 className="font-serif-heading text-lg font-bold text-[#26141c] group-hover:text-[#8c2444] transition-colors leading-snug line-clamp-2">
                    {notice.title}
                  </h2>

                  {/* Plain English TL;DR */}
                  <p className="text-xs text-[#593d4b] leading-relaxed line-clamp-2">
                    {notice.tldr}
                  </p>
                </div>

                {/* Key Info: Deadline & Room */}
                <div className="pt-3 border-t border-[#f2dde4] space-y-2.5">
                  <div className="flex flex-wrap items-center gap-3 text-xs text-[#6e4f5c]">
                    {notice.deadline && (
                      <span className="font-semibold text-[#8c2444] flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-[#b8325a]" />
                        <span>Due: {notice.deadline}</span>
                      </span>
                    )}

                    {notice.contactOrOffice && (
                      <span className="flex items-center gap-1 text-[#694e5b]">
                        <MapPin className="w-3.5 h-3.5 text-[#b8325a]" />
                        <span className="truncate max-w-[200px]">{notice.contactOrOffice}</span>
                      </span>
                    )}
                  </div>

                  {/* Button to view */}
                  <div className="flex items-center justify-between pt-1">
                    <span className="text-[11px] text-[#8c6b78]">
                      {notice.actionSteps.length} simple steps
                    </span>

                    <span className="text-xs font-bold text-[#8c2444] flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                      <span>See what to do</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
