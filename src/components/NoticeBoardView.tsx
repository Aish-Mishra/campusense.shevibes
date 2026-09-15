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
  Pin,
  Heart,
  LayoutGrid,
  Layers,
  Bookmark,
  Check,
  Coffee,
  FileText,
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { ClarifiedNotice } from '../types';

interface NoticeBoardViewProps {
  notices: ClarifiedNotice[];
  onSelectNotice: (notice: ClarifiedNotice) => void;
  onNewNotice: () => void;
  isSimpleMode: boolean;
  onToggleSimpleMode: () => void;
  pinnedNoticeIds?: string[];
  onTogglePin?: (noticeId: string) => void;
}

// Pastel washi tape styles for the Pinterest board cards
const WASHI_TAPES = [
  {
    bg: 'bg-[#fcd3de]/80 border-[#f8b2c4]/70',
    rotate: 'rotate-[-1.5deg]',
  },
  {
    bg: 'bg-[#d8edd9]/80 border-[#b8dfba]/70',
    rotate: 'rotate-[1.2deg]',
  },
  {
    bg: 'bg-[#faecc8]/80 border-[#edd59a]/70',
    rotate: 'rotate-[-0.8deg]',
  },
  {
    bg: 'bg-[#ede3f8]/80 border-[#d7c4f0]/70',
    rotate: 'rotate-[1.8deg]',
  },
  {
    bg: 'bg-[#ffe4d4]/80 border-[#fccab0]/70',
    rotate: 'rotate-[-1.2deg]',
  },
];

export const NoticeBoardView: React.FC<NoticeBoardViewProps> = ({
  notices,
  onSelectNotice,
  onNewNotice,
  isSimpleMode,
  onToggleSimpleMode,
  pinnedNoticeIds = [],
  onTogglePin,
}) => {
  const [selectedFilter, setSelectedFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [boardViewMode, setBoardViewMode] = useState<'pinterest' | 'grid'>(() => {
    try {
      const saved = localStorage.getItem('campussense_board_mode');
      if (saved === 'pinterest' || saved === 'grid') return saved;
    } catch (e) {
      console.error(e);
    }
    return 'pinterest';
  });

  const handleSetViewMode = (mode: 'pinterest' | 'grid') => {
    setBoardViewMode(mode);
    try {
      localStorage.setItem('campussense_board_mode', mode);
    } catch (e) {
      console.error(e);
    }
  };

  const quickFilters = [
    { id: 'all', label: 'All Notices' },
    {
      id: 'pinned',
      label: `📌 My Pinboard (${pinnedNoticeIds.length})`,
      highlight: pinnedNoticeIds.length > 0,
    },
    { id: 'urgent', label: '🚨 Urgent Only' },
    { id: 'academic', label: '📄 Certificates & Docs' },
    { id: 'exams', label: '⚠️ Attendance & Exams' },
    { id: 'hostel', label: '🏠 Hostel' },
  ];

  const filteredNotices = notices.filter((notice) => {
    // Pinned filter
    if (selectedFilter === 'pinned' && !pinnedNoticeIds.includes(notice.id)) {
      return false;
    }
    // Category/urgency filters
    if (selectedFilter === 'urgent' && notice.urgency !== 'CRITICAL') return false;
    if (selectedFilter === 'academic' && notice.category !== 'academic') return false;
    if (selectedFilter === 'exams' && notice.category !== 'exams') return false;
    if (selectedFilter === 'hostel' && notice.category !== 'hostel') return false;

    // Search query
    if (!searchQuery.trim()) return true;

    const q = searchQuery.trim().toLowerCase();
    const searchableText = [
      notice.title,
      notice.department,
      notice.tldr,
      notice.deadline,
      notice.contactOrOffice,
      notice.consequencesIfMissed,
      notice.whatsappSummary,
      notice.rawContent,
      notice.category,
      notice.urgency,
      notice.whoNeedsToAct?.appliesTo,
      notice.whoNeedsToAct?.exempt,
      ...(notice.actionSteps || []).flatMap((step) => [
        step.title,
        step.description,
        step.location,
        ...(step.itemsToBring || []),
      ]),
      ...(notice.jargonDecoded || []).flatMap((item) => [
        item.term,
        item.explanation,
      ]),
      ...(notice.tags || []),
    ]
      .filter(Boolean)
      .join(' ')
      .toLowerCase();

    return searchableText.includes(q);
  });

  return (
    <div className="space-y-6 pb-14">
      {/* Friendly Page Header & Board Switcher */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#ebd2db] pb-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="font-serif-heading text-2xl sm:text-3xl font-bold text-[#26141c]">
              College Notices & Pinboard
            </h1>
            <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-[#faebef] text-[#992244] border border-[#f2d0db] flex items-center gap-1">
              <span>✨</span>
              <span>Pinterest Mood</span>
            </span>
          </div>
          <p className="text-xs sm:text-sm text-[#6e505d] mt-1">
            Curate what’s important, pin campus circulars to your desk, and see deadlines in plain English.
          </p>
        </div>

        {/* Controls: View Style Switcher + Simple Mode + Explain Notice */}
        <div className="flex flex-wrap items-center gap-2 self-start md:self-auto">
          {/* Pinterest vs Grid Toggle */}
          <div className="inline-flex items-center bg-[#f7edf0] p-0.5 rounded-lg border border-[#ebd0d9]">
            <button
              type="button"
              onClick={() => handleSetViewMode('pinterest')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-bold transition-all cursor-pointer ${
                boardViewMode === 'pinterest'
                  ? 'bg-white text-[#8c2444] shadow-xs'
                  : 'text-[#6e505d] hover:text-[#2b1720]'
              }`}
              title="Aesthetic Pinterest Moodboard layout"
            >
              <Pin className="w-3.5 h-3.5 fill-[#8c2444] text-[#8c2444]" />
              <span>Pinboard</span>
            </button>
            <button
              type="button"
              onClick={() => handleSetViewMode('grid')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-bold transition-all cursor-pointer ${
                boardViewMode === 'grid'
                  ? 'bg-white text-[#8c2444] shadow-xs'
                  : 'text-[#6e505d] hover:text-[#2b1720]'
              }`}
              title="Compact grid layout"
            >
              <LayoutGrid className="w-3.5 h-3.5" />
              <span>Grid</span>
            </button>
          </div>

          {/* Simple Mode Toggle */}
          <button
            type="button"
            onClick={onToggleSimpleMode}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer border ${
              isSimpleMode
                ? 'bg-[#8c2444] text-white border-[#8c2444] shadow-button-press'
                : 'bg-white text-[#8c2444] border-[#ebd0d9] hover:bg-[#fff0f4]'
            }`}
          >
            {isSimpleMode ? (
              <>
                <Zap className="w-3.5 h-3.5 text-yellow-300 fill-yellow-300" />
                <span className="hidden sm:inline">Simple: ON</span>
                <span className="sm:hidden">Simple</span>
              </>
            ) : (
              <>
                <SlidersHorizontal className="w-3.5 h-3.5 text-[#8c2444]" />
                <span className="hidden sm:inline">Detailed Cards</span>
                <span className="sm:hidden">Details</span>
              </>
            )}
          </button>

          {/* Explain Notice Button */}
          <button
            type="button"
            onClick={onNewNotice}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-[#b8325a] hover:bg-[#a12448] text-white text-xs font-semibold shadow-button-press cursor-pointer transition-all"
          >
            <Sparkles className="w-3.5 h-3.5 text-rose-200" />
            <span>Explain Notice</span>
          </button>
        </div>
      </div>

      {/* Pinterest Aesthetic Study Desk / Sticky Notes Bar */}
      <div className="bg-[#fff9fa] border border-[#ebd0d9] rounded-2xl p-4 sm:p-5 relative shadow-paper overflow-hidden">
        {/* Header row for sticky notes */}
        <div className="flex items-center justify-between gap-2 mb-3">
          <div className="flex items-center gap-2">
            <span className="flex items-center justify-center w-6 h-6 rounded-full bg-[#b8325a] text-white text-xs shadow-xs">
              📌
            </span>
            <span className="font-serif-heading font-bold text-sm sm:text-base text-[#2b1720]">
              Campus Moodboard & Fresher Sticky Notes
            </span>
          </div>
          <div className="flex items-center gap-2 text-xs text-[#8c6b78]">
            <span className="hidden sm:inline">Click 📌 on any card to pin it to your board</span>
            {pinnedNoticeIds.length > 0 && (
              <span className="font-semibold text-[#8c2444] bg-[#ffebee] px-2 py-0.5 rounded-full border border-[#f8bbd0]">
                {pinnedNoticeIds.length} Pinned
              </span>
            )}
          </div>
        </div>

        {/* Aesthetic Sticky Memos Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 pt-1">
          {/* Memo 1: Rose Blush (Verification) */}
          <div className="relative bg-[#fff1f4] border border-[#f7ccd7] rounded-xl p-3.5 shadow-sm transform hover:-translate-y-0.5 transition-transform">
            {/* Washi tape */}
            <div className="absolute -top-2.5 left-1/2 -translate-x-1/2 w-16 h-4 bg-[#fcd4df]/90 border border-[#f0b5c5]/70 rounded-xs shadow-xs rotate-[-2deg]" />
            <div className="pt-1 space-y-1">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold tracking-wider text-[#992244] uppercase flex items-center gap-1">
                  🌸 Physical Verification
                </span>
                <span className="text-[10px] bg-white/90 px-1.5 py-0.2 rounded text-[#992244] font-semibold">
                  Rm 104
                </span>
              </div>
              <p className="text-xs text-[#40202a] font-medium leading-relaxed">
                Bring 3 self-attested photocopies of Class 10 & 12 marksheets with originals in a transparent sleeve.
              </p>
              <div className="pt-1 flex items-center justify-between text-[10px] text-[#8c4b60]">
                <span>#Freshers2026</span>
                <span className="font-bold text-[#992244]">Due Sept 18</span>
              </div>
            </div>
          </div>

          {/* Memo 2: Sage Matcha (Hostel & Mess) */}
          <div className="relative bg-[#f4f9f4] border border-[#cfe4d2] rounded-xl p-3.5 shadow-sm transform hover:-translate-y-0.5 transition-transform">
            {/* Washi tape */}
            <div className="absolute -top-2.5 left-1/2 -translate-x-1/2 w-16 h-4 bg-[#d8ecd9]/90 border border-[#b8dab9]/70 rounded-xs shadow-xs rotate-[2deg]" />
            <div className="pt-1 space-y-1">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold tracking-wider text-[#2e5936] uppercase flex items-center gap-1">
                  ☕ Hostel & Mess Note
                </span>
                <span className="text-[10px] bg-white/90 px-1.5 py-0.2 rounded text-[#2e5936] font-semibold">
                  Curfew 9 PM
                </span>
              </div>
              <p className="text-xs text-[#203624] font-medium leading-relaxed">
                Mess rebate requires coupon submitted 4 days in advance. Gate turnstiles lock at 9:00 PM sharp.
              </p>
              <div className="pt-1 flex items-center justify-between text-[10px] text-[#4d7554]">
                <span>#HostelLife</span>
                <span className="font-bold text-[#2e5936]">Hostel Office</span>
              </div>
            </div>
          </div>

          {/* Memo 3: Vanilla Buttercup (Book-Bank) */}
          <div className="relative bg-[#fffdf2] border border-[#f5e6bf] rounded-xl p-3.5 shadow-sm transform hover:-translate-y-0.5 transition-transform">
            {/* Washi tape */}
            <div className="absolute -top-2.5 left-1/2 -translate-x-1/2 w-16 h-4 bg-[#faecc6]/90 border border-[#edd59a]/70 rounded-xs shadow-xs rotate-[-1deg]" />
            <div className="pt-1 space-y-1">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold tracking-wider text-[#825c15] uppercase flex items-center gap-1">
                  ✨ Free Book-Bank
                </span>
                <span className="text-[10px] bg-white/90 px-1.5 py-0.2 rounded text-[#825c15] font-semibold">
                  Library
                </span>
              </div>
              <p className="text-xs text-[#3b2b0f] font-medium leading-relaxed">
                Collect Calculus & Programming textbooks at Circulation Section. First-come basis with provisional ID!
              </p>
              <div className="pt-1 flex items-center justify-between text-[10px] text-[#7d602a]">
                <span>#FreeBooks</span>
                <span className="font-bold text-[#825c15]">Save ₹4,000</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Filter Buttons & Search */}
      <div className="space-y-3">
        <div className="flex items-center gap-2 overflow-x-auto scrollbar-none pb-1">
          {quickFilters.map((filter) => {
            const isSelected = selectedFilter === filter.id;
            return (
              <button
                key={filter.id}
                type="button"
                onClick={() => setSelectedFilter(filter.id)}
                className={`text-xs font-semibold px-3 py-1.5 rounded-lg border transition-all whitespace-nowrap cursor-pointer ${
                  isSelected
                    ? 'bg-[#8c2444] text-white border-[#8c2444] shadow-button-press'
                    : filter.highlight
                    ? 'bg-[#fff0f4] text-[#8c2444] border-[#f5ccd7] hover:bg-[#ffe5ec]'
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

      {/* Notice Cards */}
      {filteredNotices.length === 0 ? (
        <div className="bg-white rounded-2xl border border-[#ebd0d9] p-8 text-center space-y-3 shadow-paper">
          <p className="text-sm font-semibold text-[#26141c]">
            {selectedFilter === 'pinned'
              ? 'No notices pinned yet!'
              : 'No notices match your filter'}
          </p>
          <p className="text-xs text-[#6e505d] max-w-md mx-auto">
            {selectedFilter === 'pinned'
              ? 'Click the 📌 Pin button on any circular on the board to save your personal essentials here.'
              : 'Try clicking "All Notices" or paste a new circular to explain it.'}
          </p>
          <button
            type="button"
            onClick={() => {
              setSelectedFilter('all');
              setSearchQuery('');
            }}
            className="text-xs font-bold text-[#8c2444] hover:underline cursor-pointer"
          >
            Show All Notices
          </button>
        </div>
      ) : boardViewMode === 'pinterest' ? (
        /* PINTEREST MOODBOARD LAYOUT */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 items-start">
          {filteredNotices.map((notice, index) => {
            const isPinned = pinnedNoticeIds.includes(notice.id);
            const completedCount = (notice.userCompletedSteps || []).length;
            const totalCount = notice.actionSteps.length;
            const washi = WASHI_TAPES[index % WASHI_TAPES.length];

            return (
              <motion.div
                key={notice.id}
                whileHover={{ y: -4 }}
                transition={{ duration: 0.2 }}
                onClick={() => onSelectNotice(notice)}
                className="relative bg-white hover:bg-[#fffcfd] border border-[#ebd0d9] hover:border-[#b8325a] rounded-2xl p-5 shadow-paper hover:shadow-[0_12px_30px_-6px_rgba(184,50,90,0.12)] transition-all cursor-pointer flex flex-col justify-between space-y-3.5 group pt-6"
              >
                {/* Washi Tape strip across top */}
                <div
                  className={`absolute -top-2.5 left-1/2 -translate-x-1/2 w-20 h-4.5 ${washi.bg} ${washi.rotate} border rounded-xs shadow-xs pointer-events-none backdrop-blur-[1px]`}
                />

                {/* Top Row: Category pill + Pin Action Button */}
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-1.5">
                    {notice.urgency === 'CRITICAL' ? (
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-[#fdf0f3] text-[#991d3c] border border-[#f7ccd7] flex items-center gap-1">
                        <AlertTriangle className="w-3 h-3 text-[#b8325a]" />
                        Urgent Action
                      </span>
                    ) : (
                      <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-[#fdf5f7] text-[#73505c] border border-[#eed0d9]">
                        {notice.category === 'academic'
                          ? '📜 Academic'
                          : notice.category === 'hostel'
                          ? '🏡 Hostel'
                          : notice.category === 'scholarships'
                          ? '🎓 Scholarship'
                          : notice.category === 'exams'
                          ? '⚠️ Exams'
                          : 'Notice'}
                      </span>
                    )}
                  </div>

                  {/* 1-Click Pin Button */}
                  {onTogglePin && (
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        onTogglePin(notice.id);
                      }}
                      className={`flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-semibold transition-all cursor-pointer border ${
                        isPinned
                          ? 'bg-[#ffebee] text-[#991b3e] border-[#f8bbd0] shadow-xs'
                          : 'bg-white/80 text-[#7a5a67] border-[#ebd4dc] hover:bg-[#fff0f4] hover:text-[#991b3e]'
                      }`}
                      title={isPinned ? 'Unpin from My Board' : 'Pin to My Board'}
                    >
                      <Pin
                        className={`w-3 h-3 ${
                          isPinned
                            ? 'fill-[#b8325a] text-[#b8325a]'
                            : 'text-[#8c2444]'
                        }`}
                      />
                      <span>{isPinned ? 'Pinned' : 'Pin'}</span>
                    </button>
                  )}
                </div>

                {/* Title and TL;DR */}
                <div className="space-y-2">
                  <h2 className="font-serif-heading text-base sm:text-lg font-bold text-[#26141c] group-hover:text-[#8c2444] transition-colors leading-snug">
                    {notice.title}
                  </h2>

                  <p className="text-xs text-[#593d4b] leading-relaxed line-clamp-3">
                    {notice.tldr}
                  </p>
                </div>

                {/* Pinterest Mini Checklist / Step Preview */}
                {notice.actionSteps && notice.actionSteps.length > 0 && (
                  <div className="bg-[#faf4f6] rounded-xl p-2.5 space-y-1.5 border border-[#f0dee5]">
                    <div className="flex items-center justify-between text-[10px] font-bold text-[#734e5c] uppercase tracking-wider">
                      <span>Action Steps ({notice.actionSteps.length})</span>
                      {completedCount > 0 && (
                        <span className="text-[#8c2444] font-bold">
                          {completedCount}/{totalCount} done
                        </span>
                      )}
                    </div>
                    <div className="space-y-1 text-xs text-[#3d2531]">
                      {notice.actionSteps.slice(0, 2).map((step, idx) => (
                        <div
                          key={step.order || idx}
                          className="flex items-start gap-1.5 text-[11px] text-[#4d323f]"
                        >
                          <span className="w-4 h-4 rounded-full bg-white border border-[#ebd0d9] text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5 text-[#8c2444]">
                            {idx + 1}
                          </span>
                          <span className="line-clamp-1 font-medium">{step.title}</span>
                        </div>
                      ))}
                      {notice.actionSteps.length > 2 && (
                        <p className="text-[10px] text-[#8c6b78] pl-5 font-semibold">
                          +{notice.actionSteps.length - 2} more step{notice.actionSteps.length - 2 > 1 ? 's' : ''}
                        </p>
                      )}
                    </div>
                  </div>
                )}

                {/* Bottom Info: Due Date, Office, and Action CTA */}
                <div className="pt-2 border-t border-[#f2dde4] space-y-2">
                  <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
                    {notice.deadline ? (
                      <span className="font-semibold text-[#8c2444] flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-[#b8325a]" />
                        <span className="text-[11px]">Due: {notice.deadline}</span>
                      </span>
                    ) : (
                      <span className="text-[11px] text-[#73505c]">No hard deadline</span>
                    )}

                    {notice.contactOrOffice && (
                      <span className="flex items-center gap-1 text-[#694e5b] text-[11px] truncate max-w-[130px]">
                        <MapPin className="w-3 h-3 text-[#b8325a]" />
                        <span className="truncate">{notice.contactOrOffice}</span>
                      </span>
                    )}
                  </div>

                  <div className="flex items-center justify-between pt-1">
                    <span className="text-[10px] text-[#8c6b78] font-medium">
                      {notice.department}
                    </span>

                    <span className="text-xs font-bold text-[#8c2444] flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                      <span>View Steps</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      ) : (
        /* COMPACT GRID LAYOUT */
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredNotices.map((notice) => {
            const isPinned = pinnedNoticeIds.includes(notice.id);
            const completedCount = (notice.userCompletedSteps || []).length;
            const totalCount = notice.actionSteps.length;

            return (
              <div
                key={notice.id}
                onClick={() => onSelectNotice(notice)}
                className="bg-white hover:bg-[#fffbfc] border border-[#ebd0d9] hover:border-[#b8325a] rounded-xl p-5 shadow-paper transition-all cursor-pointer flex flex-col justify-between space-y-3 group"
              >
                {/* Notice Header: Urgency & Pin Action */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
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

                    {/* Pin button in grid */}
                    {onTogglePin && (
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          onTogglePin(notice.id);
                        }}
                        className={`p-1.5 rounded-lg border transition-all cursor-pointer ${
                          isPinned
                            ? 'bg-[#ffebee] text-[#991b3e] border-[#f8bbd0]'
                            : 'bg-white text-[#7a5a67] border-[#ebd4dc] hover:bg-[#fff0f4]'
                        }`}
                        title={isPinned ? 'Unpin notice' : 'Pin notice to board'}
                      >
                        <Pin
                          className={`w-3.5 h-3.5 ${
                            isPinned
                              ? 'fill-[#b8325a] text-[#b8325a]'
                              : 'text-[#8c2444]'
                          }`}
                        />
                      </button>
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
