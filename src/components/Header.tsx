import React from 'react';
import { Plus, User, BookOpen } from 'lucide-react';
import { FresherProfile } from '../types';

interface HeaderProps {
  profile: FresherProfile;
  onOpenProfile: () => void;
  onOpenAnalyzer: () => void;
  onOpenGlossary: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  profile,
  onOpenProfile,
  onOpenAnalyzer,
  onOpenGlossary,
}) => {
  return (
    <header className="border-b border-pink-100 bg-white sticky top-0 z-20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-3.5 flex items-center justify-between gap-4">
        {/* Simple Brand */}
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-pink-600 flex items-center justify-center text-white font-bold text-sm">
            CN
          </div>
          <div>
            <h1 className="text-base font-bold text-slate-900 leading-tight">
              Campus Notice Clarifier
            </h1>
            <p className="text-xs text-slate-500 hidden sm:block">
              Clear updates & checklists for college freshers
            </p>
          </div>
        </div>

        {/* Clean Controls */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Quick Glossary link */}
          <button
            id="btn-open-glossary"
            onClick={onOpenGlossary}
            className="text-xs text-slate-600 hover:text-pink-600 flex items-center gap-1 px-2.5 py-1.5 rounded-lg hover:bg-pink-50 transition-colors"
          >
            <BookOpen className="w-3.5 h-3.5 text-pink-500" />
            <span className="hidden sm:inline">Jargon Glossary</span>
          </button>

          {/* User Profile Pill */}
          <button
            id="btn-student-profile-toggle"
            onClick={onOpenProfile}
            className="flex items-center gap-1.5 text-xs text-slate-700 bg-pink-50 hover:bg-pink-100 border border-pink-200 px-2.5 py-1.5 rounded-lg transition-colors"
            title="Edit student profile"
          >
            <User className="w-3.5 h-3.5 text-pink-600" />
            <span className="font-medium max-w-[110px] truncate">{profile.name.split(' ')[0]}</span>
            <span className="text-pink-400">•</span>
            <span className="text-[11px] text-pink-700">{profile.residence}</span>
          </button>

          {/* Single Clear Primary Action */}
          <button
            id="btn-clarify-notice-cta"
            onClick={onOpenAnalyzer}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-pink-600 hover:bg-pink-700 text-white text-xs font-semibold shadow-xs transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span>Paste Notice</span>
          </button>
        </div>
      </div>
    </header>
  );
};

