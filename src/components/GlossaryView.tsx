import React, { useState } from 'react';
import { Search, BookOpen, Lightbulb, GraduationCap } from 'lucide-react';
import { JARGON_GLOSSARY } from '../data/sampleNotices';

export const GlossaryView: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredItems = JARGON_GLOSSARY.filter(
    (item) =>
      item.term.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.definition.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.tipForFreshers.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-4xl mx-auto space-y-8 py-4">
      {/* Header */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-pink-100 border border-pink-200 text-pink-900 text-xs font-semibold">
          <BookOpen className="w-3.5 h-3.5 text-pink-700" />
          <span>Campus Glossary</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">
          Decoded University Jargon & Rules
        </h1>
        <p className="text-sm text-slate-600 max-w-xl mx-auto">
          Confusing acronyms, administrative titles, and attendance terms explained in simple English for freshers.
        </p>
      </div>

      {/* Search Input - Pink Box */}
      <div className="bg-pink-50 rounded-2xl border border-pink-200 p-5 sm:p-6 shadow-sm">
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search terms like ERP, DSW, Condonation, Debarment, Self-Attestation..."
            className="w-full bg-white border border-pink-200 rounded-xl pl-10 pr-4 py-2.5 text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-pink-500"
          />
        </div>
      </div>

      {/* Glossary Cards List with spacious breathing room */}
      {filteredItems.length === 0 ? (
        <div className="bg-pink-50 rounded-2xl border border-pink-200 p-12 text-center space-y-2">
          <GraduationCap className="w-8 h-8 text-pink-400 mx-auto" />
          <h3 className="text-sm font-bold text-slate-800">No terms match your search</h3>
          <p className="text-xs text-slate-500">
            Try searching for common terms like ERP, DSW, or Attestation.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredItems.map((item, index) => (
            <div
              key={index}
              className="bg-pink-50 rounded-2xl border border-pink-200 p-6 sm:p-7 space-y-3 shadow-sm hover:border-pink-300 transition-colors"
            >
              <div className="flex items-center justify-between">
                <h3 className="text-base sm:text-lg font-bold text-slate-900">
                  {item.term}
                </h3>
                <span className="text-[11px] font-semibold text-pink-900 bg-pink-100 border border-pink-200 px-2.5 py-0.5 rounded-full">
                  Campus Concept
                </span>
              </div>

              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                {item.definition}
              </p>

              {item.tipForFreshers && (
                <div className="mt-3 p-3.5 rounded-xl bg-white border border-pink-200 flex items-start gap-2.5">
                  <Lightbulb className="w-4 h-4 text-pink-600 shrink-0 mt-0.5" />
                  <div className="space-y-0.5">
                    <span className="text-[11px] font-bold text-pink-900 uppercase tracking-wider block">
                      Fresher Survival Tip:
                    </span>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      {item.tipForFreshers}
                    </p>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
