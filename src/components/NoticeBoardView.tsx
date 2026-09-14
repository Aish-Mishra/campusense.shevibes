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
} from 'lucide-react';
import { ClarifiedNotice, NoticeCategory } from '../types';

interface NoticeBoardViewProps {
  notices: ClarifiedNotice[];
  onSelectNotice: (notice: ClarifiedNotice) => void;
  onNewNotice: () => void;
}

const CATEGORIES: { id: string; label: string }[] = [
  { id: 'all', label: 'All Notices' },
  { id: 'academic', label: 'Academic & Documents' },
  { id: 'exams', label: 'Exams & Attendance' },
  { id: 'hostel', label: 'Hostel & Mess' },
  { id: 'library', label: 'Library' },
  { id: 'scholarships', label: 'Scholarships' },
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

  return (
    <div className="max-w-5xl mx-auto space-y-8 py-4">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">
            Campus Notice Board
          </h1>
          <p className="text-sm text-slate-600 mt-1">
            Browse all decoded campus circulars and track your pending requirements.
          </p>
        </div>

        <button
          type="button"
          onClick={onNewNotice}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-pink-600 hover:bg-pink-700 text-white text-xs sm:text-sm font-bold shadow-xs transition-all cursor-pointer self-start sm:self-auto"
        >
          <Sparkles className="w-4 h-4" />
          <span>Simplify New Notice</span>
        </button>
      </div>

      {/* Filter & Search Bar - Pink Box */}
      <div className="bg-pink-50 rounded-2xl border border-pink-200 p-5 sm:p-6 space-y-4 shadow-sm">
        {/* Search input */}
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search circulars by keyword, department, or document name..."
            className="w-full bg-white border border-pink-200 rounded-xl pl-10 pr-4 py-2.5 text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-pink-500"
          />
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          {CATEGORIES.map((cat) => {
            const isSelected = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => setSelectedCategory(cat.id)}
                className={`text-xs font-semibold px-3.5 py-1.5 rounded-xl border transition-all whitespace-nowrap cursor-pointer ${
                  isSelected
                    ? 'bg-pink-600 text-white border-pink-600 shadow-2xs'
                    : 'bg-white text-slate-700 border-pink-200 hover:bg-pink-100/60'
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Notices Grid with generous breathing space */}
      {filteredNotices.length === 0 ? (
        <div className="bg-pink-50 rounded-2xl border border-pink-200 p-12 text-center space-y-3">
          <FileText className="w-10 h-10 text-pink-400 mx-auto" />
          <h3 className="text-base font-bold text-slate-800">No circulars found</h3>
          <p className="text-xs text-slate-600 max-w-sm mx-auto">
            No notices match your current search or category filter. Try clearing filters or paste a new circular.
          </p>
          <button
            type="button"
            onClick={() => {
              setSelectedCategory('all');
              setSearchQuery('');
            }}
            className="text-xs text-pink-700 font-bold hover:underline cursor-pointer pt-1 inline-block"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredNotices.map((notice) => {
            const completedCount = (notice.userCompletedSteps || []).length;
            const totalCount = notice.actionSteps.length;

            return (
              <div
                key={notice.id}
                onClick={() => onSelectNotice(notice)}
                className="bg-pink-50 hover:bg-pink-100/60 border border-pink-200 hover:border-pink-300 rounded-2xl p-6 transition-all duration-200 cursor-pointer flex flex-col justify-between space-y-4 shadow-sm group"
              >
                <div className="space-y-3">
                  {/* Meta badges */}
                  <div className="flex items-center justify-between gap-2">
                    <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-pink-900 bg-pink-200/70 border border-pink-300 px-2.5 py-1 rounded-lg">
                      <Building className="w-3 h-3 text-pink-700" />
                      <span className="truncate max-w-[180px]">{notice.department}</span>
                    </span>

                    {notice.urgency === 'CRITICAL' ? (
                      <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-red-100 text-red-800 border border-red-200">
                        Critical
                      </span>
                    ) : notice.urgency === 'IMPORTANT' ? (
                      <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-800 border border-amber-200">
                        Important
                      </span>
                    ) : (
                      <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-800 border border-blue-200">
                        Notice
                      </span>
                    )}
                  </div>

                  {/* Title */}
                  <h3 className="text-base font-bold text-slate-900 group-hover:text-pink-900 transition-colors line-clamp-2">
                    {notice.title}
                  </h3>

                  {/* TL;DR */}
                  <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">
                    {notice.tldr}
                  </p>
                </div>

                {/* Footer details */}
                <div className="pt-3 border-t border-pink-200/80 space-y-3">
                  <div className="flex items-center justify-between text-xs text-slate-600">
                    {notice.deadline ? (
                      <span className="font-semibold text-pink-900 flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-pink-700" />
                        <span>{notice.deadline}</span>
                      </span>
                    ) : (
                      <span className="text-slate-400">No strict deadline</span>
                    )}

                    <span className="text-[11px] font-medium text-slate-500 flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5 text-pink-600" />
                      <span>
                        {completedCount}/{totalCount} steps done
                      </span>
                    </span>
                  </div>

                  <div className="flex items-center justify-between pt-1">
                    <span className="text-xs font-bold text-pink-800 group-hover:text-pink-950 flex items-center gap-1">
                      <span>View Action Checklist</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </span>

                    {notice.tags && notice.tags.length > 0 && (
                      <span className="text-[10px] text-pink-700 bg-white border border-pink-200 px-2 py-0.5 rounded-md">
                        #{notice.tags[0]}
                      </span>
                    )}
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
