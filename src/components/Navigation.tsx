import React from 'react';
import {
  Sparkles,
  Layers,
  FileCheck2,
  BookOpen,
  UserCheck,
  Building2,
  Calendar,
  Compass,
} from 'lucide-react';
import { FresherProfile } from '../types';

export type AppPage = 'board' | 'simplify' | 'details' | 'glossary' | 'profile';

interface NavigationProps {
  currentPage: AppPage;
  onNavigate: (page: AppPage) => void;
  profile: FresherProfile;
  hasActiveNotice: boolean;
  activeNoticeTitle?: string;
  totalNoticesCount: number;
}

export const Navigation: React.FC<NavigationProps> = ({
  currentPage,
  onNavigate,
  profile,
  hasActiveNotice,
  activeNoticeTitle,
  totalNoticesCount,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-[#fffbfc]/95 backdrop-blur-md border-b border-[#ebd3da] transition-all">
      {/* Top Editorial Campus Bar */}
      <div className="border-b border-[#f3e1e6] bg-[#fdf5f7]/80 text-[11px] text-[#73535f] py-1.5 px-4 sm:px-8">
        <div className="max-w-6xl mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-2 truncate">
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#b8325a]" />
            <span className="font-semibold text-[#8c2444] tracking-tight">University Academic Session 2026–27</span>
            <span className="text-[#ebd0d8] hidden md:inline">•</span>
            <span className="hidden md:inline text-[#7a5d69]">Odd Semester • Term 1 Circular Bulletin</span>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <span className="hidden sm:flex items-center gap-1 text-[#8c6b77] font-mono text-[10px]">
              <Calendar className="w-3 h-3 text-[#b8325a]" />
              <span>Sept 14, 2026</span>
            </span>
            <span className="text-[#ebd0d8] hidden sm:inline">|</span>
            <button
              type="button"
              onClick={() => onNavigate('profile')}
              className="inline-flex items-center gap-1.5 font-medium text-[#7a2c47] hover:text-[#9c1e45] cursor-pointer"
            >
              <span className="w-4 h-4 rounded-full bg-[#fae1e7] text-[#8c2444] border border-[#f0cbd6] text-[9px] font-bold inline-flex items-center justify-center">
                {profile.name.charAt(0) || 'S'}
              </span>
              <span className="truncate max-w-[110px] sm:max-w-[160px] font-semibold">{profile.name}</span>
              <span className="text-[#997985] text-[10px]">({profile.year})</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Masthead Row */}
      <div className="max-w-6xl mx-auto px-4 sm:px-8">
        <div className="py-3 sm:py-3.5 flex items-center justify-between gap-4">
          {/* Brand Mark */}
          <div
            onClick={() => onNavigate('board')}
            className="flex items-center gap-3 cursor-pointer select-none group"
          >
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#b8325a] to-[#8c2444] text-white flex items-center justify-center shadow-button-press group-hover:brightness-105 transition-all">
              <Building2 className="w-5 h-5 text-rose-100" />
            </div>

            <div>
              <div className="flex items-baseline gap-2">
                <span className="font-serif-heading text-xl sm:text-2xl font-bold tracking-tight text-[#2b1720] group-hover:text-[#8c2444] transition-colors">
                  CampuSense
                </span>
                <span className="hidden sm:inline font-mono text-[10px] uppercase tracking-widest text-[#a84d68] border border-[#eed4dc] px-1.5 py-0.5 rounded bg-[#fff0f4]">
                  Notice Decoder
                </span>
              </div>
              <p className="text-[12px] text-[#785b67] tracking-tight leading-none mt-0.5">
                Plain-English translation of college circulars, rooms & deadlines
              </p>
            </div>
          </div>

          {/* Quick Action Button for Desktop */}
          <button
            type="button"
            onClick={() => onNavigate('simplify')}
            className="hidden md:inline-flex items-center gap-2 px-3.5 py-2 rounded-lg bg-[#fff0f3] hover:bg-[#ffe6ec] text-[#8c2444] border border-[#ebc2cf] text-xs font-semibold shadow-paper hover:border-[#b8325a] transition-all cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#b8325a]" />
            <span>Drop a New Circular</span>
          </button>
        </div>

        {/* Tactile Tab Navigation */}
        <nav className="flex items-center gap-1 sm:gap-2 -mb-px overflow-x-auto scrollbar-none pt-1">
          {/* Notice Board Tab */}
          <button
            type="button"
            onClick={() => onNavigate('board')}
            className={`flex items-center gap-2 px-3.5 sm:px-4 py-2 text-xs sm:text-sm font-semibold transition-all border-b-2 whitespace-nowrap cursor-pointer ${
              currentPage === 'board'
                ? 'border-[#b8325a] text-[#8c2444] bg-[#fff5f7] rounded-t-lg border-t border-x border-[#ecd4dc]'
                : 'border-transparent text-[#6e535e] hover:text-[#2b1720] hover:bg-[#faeff2]/60 rounded-t-lg'
            }`}
          >
            <Layers className="w-4 h-4" />
            <span>The Notice Board</span>
            <span
              className={`font-mono text-[10px] px-1.5 py-0.2 rounded-full ${
                currentPage === 'board'
                  ? 'bg-[#b8325a] text-white'
                  : 'bg-[#f0dce3] text-[#73505c]'
              }`}
            >
              {totalNoticesCount}
            </span>
          </button>

          {/* Decoder Desk Tab */}
          <button
            type="button"
            onClick={() => onNavigate('simplify')}
            className={`flex items-center gap-2 px-3.5 sm:px-4 py-2 text-xs sm:text-sm font-semibold transition-all border-b-2 whitespace-nowrap cursor-pointer ${
              currentPage === 'simplify'
                ? 'border-[#b8325a] text-[#8c2444] bg-[#fff5f7] rounded-t-lg border-t border-x border-[#ecd4dc]'
                : 'border-transparent text-[#6e535e] hover:text-[#2b1720] hover:bg-[#faeff2]/60 rounded-t-lg'
            }`}
          >
            <Sparkles className="w-4 h-4" />
            <span>Decoder Desk</span>
          </button>

          {/* Active Notice Dossier Tab */}
          <button
            type="button"
            onClick={() => onNavigate('details')}
            className={`flex items-center gap-2 px-3.5 sm:px-4 py-2 text-xs sm:text-sm font-semibold transition-all border-b-2 whitespace-nowrap cursor-pointer ${
              currentPage === 'details'
                ? 'border-[#b8325a] text-[#8c2444] bg-[#fff5f7] rounded-t-lg border-t border-x border-[#ecd4dc]'
                : 'border-transparent text-[#6e535e] hover:text-[#2b1720] hover:bg-[#faeff2]/60 rounded-t-lg'
            }`}
          >
            <FileCheck2 className="w-4 h-4" />
            <span>Active Circular Dossier</span>
            {hasActiveNotice && (
              <span className="w-2 h-2 rounded-full bg-[#b8325a] animate-pulse" />
            )}
          </button>

          {/* Campus Glossary Tab */}
          <button
            type="button"
            onClick={() => onNavigate('glossary')}
            className={`flex items-center gap-2 px-3.5 sm:px-4 py-2 text-xs sm:text-sm font-semibold transition-all border-b-2 whitespace-nowrap cursor-pointer ${
              currentPage === 'glossary'
                ? 'border-[#b8325a] text-[#8c2444] bg-[#fff5f7] rounded-t-lg border-t border-x border-[#ecd4dc]'
                : 'border-transparent text-[#6e535e] hover:text-[#2b1720] hover:bg-[#faeff2]/60 rounded-t-lg'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>Campus Jargon Lexicon</span>
          </button>

          {/* Profile / Dossier Tab */}
          <button
            type="button"
            onClick={() => onNavigate('profile')}
            className={`flex items-center gap-2 px-3.5 sm:px-4 py-2 text-xs sm:text-sm font-semibold transition-all border-b-2 whitespace-nowrap cursor-pointer ${
              currentPage === 'profile'
                ? 'border-[#b8325a] text-[#8c2444] bg-[#fff5f7] rounded-t-lg border-t border-x border-[#ecd4dc]'
                : 'border-transparent text-[#6e535e] hover:text-[#2b1720] hover:bg-[#faeff2]/60 rounded-t-lg'
            }`}
          >
            <UserCheck className="w-4 h-4" />
            <span>My Student Card</span>
          </button>
        </nav>
      </div>
    </header>
  );
};
