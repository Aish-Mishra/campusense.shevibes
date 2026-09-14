import React from 'react';
import {
  Sparkles,
  FileText,
  FileCheck,
  BookOpen,
  User,
  GraduationCap,
} from 'lucide-react';
import { FresherProfile } from '../types';

export type AppPage = 'simplify' | 'details' | 'board' | 'glossary' | 'profile';

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
  totalNoticesCount,
}) => {
  const navItems: { id: AppPage; label: string; icon: React.ReactNode; badge?: string | number }[] = [
    {
      id: 'simplify',
      label: 'Simplify Notice',
      icon: <Sparkles className="w-4 h-4" />,
    },
    {
      id: 'details',
      label: 'Notice Details',
      icon: <FileCheck className="w-4 h-4" />,
      badge: hasActiveNotice ? 'Active' : undefined,
    },
    {
      id: 'board',
      label: 'Notice Board',
      icon: <FileText className="w-4 h-4" />,
      badge: totalNoticesCount,
    },
    {
      id: 'glossary',
      label: 'Campus Glossary',
      icon: <BookOpen className="w-4 h-4" />,
    },
    {
      id: 'profile',
      label: 'Profile',
      icon: <User className="w-4 h-4" />,
      badge: profile.year,
    },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-pink-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Top brand & student summary row */}
        <div className="py-3 flex items-center justify-between gap-4 border-b border-pink-100">
          <div
            onClick={() => onNavigate('board')}
            className="flex items-center gap-2.5 cursor-pointer select-none group"
          >
            <div className="w-9 h-9 rounded-xl bg-pink-600 flex items-center justify-center text-white shadow-xs group-hover:scale-105 transition-transform">
              <GraduationCap className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-base tracking-tight text-slate-900 group-hover:text-pink-900 transition-colors">
                  CampuSense
                </span>
                <span className="text-[10px] font-bold uppercase tracking-wider text-pink-700 bg-pink-100 border border-pink-200 px-2 py-0.5 rounded-full">
                  Fresher Copilot
                </span>
              </div>
              <p className="text-[11px] text-slate-500 hidden sm:block">
                Demystifying campus circulars, strict deadlines & official jargon
              </p>
            </div>
          </div>

          {/* Quick Profile Tag */}
          <button
            type="button"
            onClick={() => onNavigate('profile')}
            className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-pink-50 hover:bg-pink-100/80 border border-pink-200 text-xs text-pink-950 font-medium transition-all cursor-pointer"
          >
            <div className="w-2 h-2 rounded-full bg-pink-600" />
            <span className="truncate max-w-[130px] font-semibold">{profile.name}</span>
            <span className="text-slate-400 hidden sm:inline">•</span>
            <span className="text-slate-600 hidden sm:inline">{profile.branch}</span>
          </button>
        </div>

        {/* Page Navigation Tabs */}
        <nav className="flex items-center gap-1 sm:gap-2 py-2.5 overflow-x-auto scrollbar-none">
          {navItems.map((item) => {
            const isActive = currentPage === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => onNavigate(item.id)}
                className={`flex items-center gap-2 px-3.5 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all whitespace-nowrap cursor-pointer ${
                  isActive
                    ? 'bg-pink-100 text-pink-950 border border-pink-300 shadow-2xs'
                    : 'text-slate-600 hover:text-pink-900 hover:bg-pink-50/70 border border-transparent'
                }`}
              >
                <span className={isActive ? 'text-pink-700' : 'text-slate-400'}>
                  {item.icon}
                </span>
                <span>{item.label}</span>
                {item.badge !== undefined && (
                  <span
                    className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full ${
                      isActive
                        ? 'bg-pink-600 text-white'
                        : 'bg-pink-100 text-pink-800'
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </div>
    </header>
  );
};
