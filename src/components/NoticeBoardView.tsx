import React, { useState } from 'react';
import {
  Search,
  Building,
  Clock,
  AlertCircle,
  ArrowRight,
  Sparkles,
  CheckCircle2,
  FileText,
  Filter,
  Pin,
  MapPin,
  ChevronRight,
  ShieldAlert,
} from 'lucide-react';
import { ClarifiedNotice } from '../types';

interface NoticeBoardViewProps {
  notices: ClarifiedNotice[];
  onSelectNotice: (notice: ClarifiedNotice) => void;
  onNewNotice: () => void;
}

const CATEGORIES: { id: string; label: string }[] = [
  { id: 'all', label: 'All Dispatches' },
  { id: 'academic', label: 'Academic & Certificates' },
  { id: 'exams', label: 'Attendance & Exams' },
  { id: 'hostel', label: 'Hostel & Wardens' },
  { id: 'scholarships', label: 'Scholarships & Fees' },
];

export const NoticeBoardView: React.FC<NoticeBoardViewProps> = ({
  notices,
  onSelectNotice,
  onNewNotice,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const filteredNotices = notices.filter((notice) => {
    const matchesCat = selectedCategory === 'all' || notice.category === selectedCategory;
    const q = searchQuery.toLowerCase().trim();
    const matchesSearch =
      !q ||
      notice.title.toLowerCase().includes(q) ||
      notice.department.toLowerCase().includes(q) ||
      notice.tldr.toLowerCase().includes(q) ||
      (notice.tags && notice.tags.some((t) => t.toLowerCase().includes(q)));
    return matchesCat && matchesSearch;
  });

  // Find most urgent notice for top pin
  const pinnedNotice = notices.find((n) => n.urgency === 'CRITICAL');

  return (
    <div className="space-y-8 pb-12">
      {/* Top Editorial Board Header */}
      <div className="border-b border-[#ebd2db] pb-5 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="w-2 h-2 rounded-full bg-[#b8325a]" />
            <span className="font-mono text-[11px] uppercase tracking-widest text-[#8c3b53] font-semibold">
              Official Campus Bulletin
            </span>
          </div>
          <h1 className="font-serif-heading text-2xl sm:text-3xl lg:text-4xl font-bold text-[#26141c]">
            The Notice Board
          </h1>
          <p className="text-sm text-[#6e505d] mt-1.5 max-w-xl">
            Active circulars, departmental warnings, and deadlines decoded into step-by-step checklists.
          </p>
        </div>

        <button
          type="button"
          onClick={onNewNotice}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-[#b8325a] hover:bg-[#a12448] active:bg-[#871939] text-white text-xs sm:text-sm font-semibold shadow-button-press transition-all cursor-pointer self-start sm:self-auto"
        >
          <Sparkles className="w-4 h-4 text-rose-200" />
          <span>Decode Any Notice</span>
        </button>
      </div>

      {/* Pinned Urgent Dispatch (If any) */}
      {pinnedNotice && selectedCategory === 'all' && !searchQuery && (
        <div
          onClick={() => onSelectNotice(pinnedNotice)}
          className="bg-gradient-to-r from-[#fff4f6] via-[#fff8f9] to-[#fff4f6] border-2 border-[#f0cbd6] rounded-xl p-5 shadow-paper cursor-pointer hover:border-[#b8325a] transition-all group"
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 pb-2.5 border-b border-[#f3dbe2]">
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 text-[10px] font-mono font-bold uppercase tracking-wider bg-[#8c1d38] text-white px-2 py-0.5 rounded">
                <Pin className="w-3 h-3 rotate-45" />
                <span>Pinned Urgent Notice</span>
              </span>
              <span className="text-xs font-semibold text-[#8c2444]">
                {pinnedNotice.department}
              </span>
            </div>

            {pinnedNotice.deadline && (
              <span className="text-xs font-mono font-bold text-[#8c1d38] flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-[#b8325a]" />
                <span>Cutoff: {pinnedNotice.deadline}</span>
              </span>
            )}
          </div>

          <div className="pt-3 space-y-2">
            <h2 className="font-serif-heading text-lg sm:text-xl font-bold text-[#24131a] group-hover:text-[#8c2444] transition-colors">
              {pinnedNotice.title}
            </h2>
            <p className="text-xs sm:text-sm text-[#614552] leading-relaxed line-clamp-2">
              {pinnedNotice.tldr}
            </p>
          </div>

          <div className="mt-3 pt-3 border-t border-[#f3dbe2] flex items-center justify-between text-xs">
            <div className="flex items-center gap-4 text-[#755562]">
              {pinnedNotice.contactOrOffice && (
                <span className="flex items-center gap-1 font-medium">
                  <MapPin className="w-3.5 h-3.5 text-[#b8325a]" />
                  <span>{pinnedNotice.contactOrOffice}</span>
                </span>
              )}
              <span className="font-mono text-[11px]">
                {(pinnedNotice.userCompletedSteps || []).length}/{pinnedNotice.actionSteps.length} steps checked
              </span>
            </div>

            <span className="font-semibold text-[#8c2444] flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
              <span>Open Full Dossier</span>
              <ChevronRight className="w-4 h-4" />
            </span>
          </div>
        </div>
      )}

      {/* Filter and Search Bar */}
      <div className="bg-white rounded-xl border border-[#ebd2dc] p-4 shadow-paper space-y-3">
        {/* Search input */}
        <div className="relative">
          <Search className="w-4 h-4 text-[#967583] absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search circulars by keyword, room number, or required certificate..."
            className="w-full bg-[#fdf8fa] border border-[#ecd5de] rounded-lg pl-10 pr-4 py-2 text-xs sm:text-sm text-[#26141c] placeholder:text-[#997987] focus:outline-none focus:bg-white focus:ring-1 focus:ring-[#b8325a] focus:border-[#b8325a]"
          />
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none pt-0.5">
          {CATEGORIES.map((cat) => {
            const isSelected = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => setSelectedCategory(cat.id)}
                className={`text-xs font-semibold px-3 py-1.5 rounded-lg border transition-all whitespace-nowrap cursor-pointer ${
                  isSelected
                    ? 'bg-[#8c2444] text-white border-[#8c2444] shadow-button-press'
                    : 'bg-[#fcf5f7] text-[#634854] border-[#ebd4dc] hover:bg-[#faebf0] hover:text-[#26141c]'
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Notices Grid */}
      {filteredNotices.length === 0 ? (
        <div className="bg-white rounded-xl border border-dashed border-[#e6c7d2] p-12 text-center space-y-3">
          <FileText className="w-10 h-10 text-[#d49faa] mx-auto" />
          <h3 className="font-serif-heading text-lg font-bold text-[#26141c]">No circulars matched</h3>
          <p className="text-xs text-[#6e505d] max-w-sm mx-auto">
            No notices match your current search query. Try clearing the filter or paste a new circular to decode it.
          </p>
          <button
            type="button"
            onClick={() => {
              setSelectedCategory('all');
              setSearchQuery('');
            }}
            className="text-xs text-[#8c2444] font-bold hover:underline cursor-pointer pt-1"
          >
            Clear all filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {filteredNotices.map((notice) => {
            const completedCount = (notice.userCompletedSteps || []).length;
            const totalCount = notice.actionSteps.length;
            const progressPercent = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

            return (
              <div
                key={notice.id}
                onClick={() => onSelectNotice(notice)}
                className="bg-white hover:bg-[#fffbfc] border border-[#ebd0d9] hover:border-[#b8325a] rounded-xl p-5 transition-all shadow-paper hover:shadow-paper-hover cursor-pointer flex flex-col justify-between space-y-4 group"
              >
                <div className="space-y-3">
                  {/* Top Reference & Badge Row */}
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-mono text-[10px] text-[#8c4d61] bg-[#fcedf1] px-2 py-0.5 rounded border border-[#f2d3dc]">
                      {notice.department}
                    </span>

                    {notice.urgency === 'CRITICAL' ? (
                      <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-[#fdf0f3] text-[#991d3c] border border-[#f7ccd7]">
                        URGENT
                      </span>
                    ) : notice.urgency === 'IMPORTANT' ? (
                      <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-[#fef6ea] text-[#945717] border border-[#fae2c0]">
                        IMPORTANT
                      </span>
                    ) : (
                      <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-[#f2f7fc] text-[#1b5b94] border border-[#cfe2f5]">
                        NOTICE
                      </span>
                    )}
                  </div>

                  {/* Title */}
                  <h3 className="font-serif-heading text-lg font-bold text-[#26141c] group-hover:text-[#8c2444] transition-colors leading-snug line-clamp-2">
                    {notice.title}
                  </h3>

                  {/* Plain English TL;DR */}
                  <p className="text-xs text-[#5c404d] line-clamp-3 leading-relaxed">
                    {notice.tldr}
                  </p>
                </div>

                {/* Bottom Stats & Action */}
                <div className="pt-3 border-t border-[#f2dde4] space-y-2.5">
                  {/* Progress bar */}
                  <div className="space-y-1">
                    <div className="flex items-center justify-between text-[11px]">
                      <span className="text-[#785966]">Progress Checklist</span>
                      <span className="font-mono text-[11px] font-semibold text-[#8c2444]">
                        {completedCount} of {totalCount} completed
                      </span>
                    </div>
                    <div className="w-full bg-[#f5e4e8] h-1.5 rounded-full overflow-hidden">
                      <div
                        className="bg-[#b8325a] h-full transition-all duration-300 rounded-full"
                        style={{ width: `${progressPercent}%` }}
                      />
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-1">
                    {notice.deadline ? (
                      <span className="text-xs font-mono font-semibold text-[#8c2444] flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-[#b8325a]" />
                        <span>{notice.deadline.split(',')[0]}</span>
                      </span>
                    ) : (
                      <span className="text-xs text-[#8c6d7a]">Routine circular</span>
                    )}

                    <span className="text-xs font-semibold text-[#8c2444] group-hover:text-[#6e132e] flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                      <span>View Dossier</span>
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
