import React from 'react';
import {
  Sparkles,
  Layers,
  FileCheck2,
  BookOpen,
  UserCheck,
  Building2,
  Zap,
  SlidersHorizontal,
  LogIn,
  LogOut,
  User,
} from 'lucide-react';
import { FresherProfile } from '../types';

export type AppPage = 'board' | 'simplify' | 'details' | 'glossary' | 'profile' | 'login';

interface NavigationProps {
  currentPage: AppPage;
  onNavigate: (page: AppPage) => void;
  profile: FresherProfile;
  hasActiveNotice: boolean;
  totalNoticesCount: number;
  isSimpleMode: boolean;
  onToggleSimpleMode: () => void;
  isLoggedIn: boolean;
  onLogout: () => void;
}

export const Navigation: React.FC<NavigationProps> = ({
  currentPage,
  onNavigate,
  profile,
  hasActiveNotice,
  totalNoticesCount,
  isSimpleMode,
  onToggleSimpleMode,
  isLoggedIn,
  onLogout,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-[#fffbfc]/95 backdrop-blur-md border-b border-[#ebd3da] transition-all">
      {/* Clean Main Masthead */}
      <div className="max-w-6xl mx-auto px-4 sm:px-8">
        <div className="py-3 sm:py-3.5 flex items-center justify-between gap-3">
          {/* Logo & Plain Title */}
          <div
            onClick={() => onNavigate('board')}
            className="flex items-center gap-2.5 sm:gap-3 cursor-pointer select-none group"
          >
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-[#8c2444] text-white flex items-center justify-center shadow-button-press group-hover:brightness-105 transition-all shrink-0">
              <Building2 className="w-5 h-5 text-rose-100" />
            </div>

            <div>
              <div className="flex items-center gap-2">
                <span className="font-serif-heading text-xl sm:text-2xl font-bold tracking-tight text-[#2b1720] group-hover:text-[#8c2444] transition-colors">
                  CampuSense
                </span>
                <span className="hidden sm:inline text-[11px] font-semibold text-[#8c2444] bg-[#fcedf1] border border-[#ebd0d9] px-2 py-0.5 rounded-full">
                  Plain English
                </span>
              </div>
              <p className="text-[11px] sm:text-xs text-[#785b67] tracking-tight leading-none mt-0.5">
                Simple translations for confusing college notices
              </p>
            </div>
          </div>

          {/* Right Action Controls */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Direct Complexity Reducer Button */}
            <button
              type="button"
              onClick={onToggleSimpleMode}
              title={
                isSimpleMode
                  ? 'Currently in Simple View. Click to show full official details.'
                  : 'Click to hide clutter and show only the essentials.'
              }
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 sm:py-2 rounded-lg text-xs font-bold transition-all cursor-pointer border ${
                isSimpleMode
                  ? 'bg-[#8c2444] text-white border-[#8c2444] shadow-button-press'
                  : 'bg-[#fff0f4] text-[#8c2444] border-[#ebd0d9] hover:bg-[#ffe6ec]'
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
                  <span>Full View</span>
                </>
              )}
            </button>

            {/* Student Login / Profile badge button */}
            {isLoggedIn ? (
              <div className="flex items-center gap-1.5 sm:gap-2">
                <button
                  type="button"
                  onClick={() => onNavigate('profile')}
                  title="View Student Profile"
                  className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 sm:py-2 rounded-lg bg-[#fcedf1] border border-[#f0cdd7] text-[#8c2444] text-xs font-bold hover:bg-[#fae1e8] transition-all cursor-pointer truncate max-w-[140px] sm:max-w-[180px]"
                >
                  <div className="w-4 h-4 rounded-full bg-[#8c2444] text-white flex items-center justify-center text-[9px] shrink-0 font-bold">
                    {profile.name.charAt(0)}
                  </div>
                  <span className="truncate">{profile.name.split(' ')[0]}</span>
                </button>

                <button
                  type="button"
                  onClick={onLogout}
                  title="Log Out / Switch Account"
                  className="p-1.5 sm:p-2 rounded-lg text-[#8c6b78] hover:text-[#8c2444] hover:bg-[#fcf0f3] border border-transparent hover:border-[#ebd0d9] transition-all cursor-pointer"
                >
                  <LogOut className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                </button>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => onNavigate('login')}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 sm:py-2 rounded-lg bg-[#b8325a] hover:bg-[#a12448] text-white text-xs font-bold shadow-button-press transition-all cursor-pointer"
              >
                <LogIn className="w-3.5 h-3.5" />
                <span>Student Login</span>
              </button>
            )}
          </div>
        </div>

        {/* Clean, Simple Tabs */}
        <nav className="flex items-center gap-1 sm:gap-2 -mb-px overflow-x-auto scrollbar-none pt-1">
          {/* Notices Tab */}
          <button
            type="button"
            onClick={() => onNavigate('board')}
            className={`flex items-center gap-1.5 sm:gap-2 px-3.5 sm:px-4 py-2 text-xs sm:text-sm font-semibold transition-all border-b-2 whitespace-nowrap cursor-pointer ${
              currentPage === 'board'
                ? 'border-[#b8325a] text-[#8c2444] bg-[#fff5f7] rounded-t-lg border-t border-x border-[#ecd4dc]'
                : 'border-transparent text-[#6e535e] hover:text-[#2b1720] hover:bg-[#faeff2]/60 rounded-t-lg'
            }`}
          >
            <Layers className="w-4 h-4" />
            <span>Notices</span>
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

          {/* Explain Notice Tab */}
          <button
            type="button"
            onClick={() => onNavigate('simplify')}
            className={`flex items-center gap-1.5 sm:gap-2 px-3.5 sm:px-4 py-2 text-xs sm:text-sm font-semibold transition-all border-b-2 whitespace-nowrap cursor-pointer ${
              currentPage === 'simplify'
                ? 'border-[#b8325a] text-[#8c2444] bg-[#fff5f7] rounded-t-lg border-t border-x border-[#ecd4dc]'
                : 'border-transparent text-[#6e535e] hover:text-[#2b1720] hover:bg-[#faeff2]/60 rounded-t-lg'
            }`}
          >
            <Sparkles className="w-4 h-4" />
            <span>Explain a Notice</span>
          </button>

          {/* Notice Details Tab */}
          <button
            type="button"
            onClick={() => onNavigate('details')}
            className={`flex items-center gap-1.5 sm:gap-2 px-3.5 sm:px-4 py-2 text-xs sm:text-sm font-semibold transition-all border-b-2 whitespace-nowrap cursor-pointer ${
              currentPage === 'details'
                ? 'border-[#b8325a] text-[#8c2444] bg-[#fff5f7] rounded-t-lg border-t border-x border-[#ecd4dc]'
                : 'border-transparent text-[#6e535e] hover:text-[#2b1720] hover:bg-[#faeff2]/60 rounded-t-lg'
            }`}
          >
            <FileCheck2 className="w-4 h-4" />
            <span>Notice Details</span>
            {hasActiveNotice && (
              <span className="w-2 h-2 rounded-full bg-[#b8325a]" />
            )}
          </button>

          {/* Campus Words Tab */}
          <button
            type="button"
            onClick={() => onNavigate('glossary')}
            className={`flex items-center gap-1.5 sm:gap-2 px-3.5 sm:px-4 py-2 text-xs sm:text-sm font-semibold transition-all border-b-2 whitespace-nowrap cursor-pointer ${
              currentPage === 'glossary'
                ? 'border-[#b8325a] text-[#8c2444] bg-[#fff5f7] rounded-t-lg border-t border-x border-[#ecd4dc]'
                : 'border-transparent text-[#6e535e] hover:text-[#2b1720] hover:bg-[#faeff2]/60 rounded-t-lg'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>Campus Words</span>
          </button>

          {/* Profile or Login Tab */}
          <button
            type="button"
            onClick={() => onNavigate(isLoggedIn ? 'profile' : 'login')}
            className={`flex items-center gap-1.5 sm:gap-2 px-3.5 sm:px-4 py-2 text-xs sm:text-sm font-semibold transition-all border-b-2 whitespace-nowrap cursor-pointer ${
              currentPage === 'profile' || currentPage === 'login'
                ? 'border-[#b8325a] text-[#8c2444] bg-[#fff5f7] rounded-t-lg border-t border-x border-[#ecd4dc]'
                : 'border-transparent text-[#6e535e] hover:text-[#2b1720] hover:bg-[#faeff2]/60 rounded-t-lg'
            }`}
          >
            {isLoggedIn ? (
              <>
                <UserCheck className="w-4 h-4" />
                <span>My Profile</span>
              </>
            ) : (
              <>
                <LogIn className="w-4 h-4" />
                <span>Student Login</span>
              </>
            )}
          </button>
        </nav>
      </div>
    </header>
  );
};
