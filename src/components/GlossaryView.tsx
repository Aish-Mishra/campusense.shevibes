import React, { useState } from 'react';
import { Search, BookOpen, Lightbulb, X } from 'lucide-react';
import { JARGON_GLOSSARY } from '../data/sampleNotices';

const CATEGORIES = [
  'All Words',
  'Exams & Attendance',
  'Officers & Deans',
  'Certificates & Papers',
  'Hostel',
];

export const GlossaryView: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('All Words');

  const filteredItems = JARGON_GLOSSARY.filter((item) => {
    const matchesSearch =
      item.term.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.definition.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.tipForFreshers.toLowerCase().includes(searchTerm.toLowerCase());

    if (!matchesSearch) return false;
    if (activeCategory === 'All Words') return true;
    if (activeCategory === 'Exams & Attendance') {
      return ['condonation', 'debarment', 'sessional', 'backlog'].some((t) =>
        item.term.toLowerCase().includes(t)
      );
    }
    if (activeCategory === 'Officers & Deans') {
      return ['dsw', 'proctor', 'dean', 'hod', 'controller'].some((t) =>
        item.term.toLowerCase().includes(t)
      );
    }
    if (activeCategory === 'Certificates & Papers') {
      return ['self-attestation', 'affidavit', 'migration', 'bonafide', 'transcript'].some((t) =>
        item.term.toLowerCase().includes(t)
      );
    }
    if (activeCategory === 'Hostel') {
      return ['warden', 'mess', 'curfew', 'outpass', 'caretaker'].some((t) =>
        item.term.toLowerCase().includes(t)
      );
    }
    return true;
  });

  return (
    <div className="max-w-3xl mx-auto space-y-6 pb-16">
      {/* Header */}
      <div className="text-center space-y-2 border-b border-[#ebd2db] pb-4">
        <h1 className="font-serif-heading text-2xl sm:text-3xl font-bold text-[#26141c]">
          Campus Words Explained Simply
        </h1>
        <p className="text-xs sm:text-sm text-[#6e505d] max-w-xl mx-auto">
          Confused by terms like "Condonation", "Debarment", or "Self-Attestation"? Here is what they mean in plain English.
        </p>
      </div>

      {/* Search & Filter bar */}
      <div className="space-y-3">
        {/* Search */}
        <div className="relative">
          <Search className="w-4 h-4 text-[#967583] absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search words (e.g. Condonation, Debarment, Self-Attestation)..."
            className="w-full bg-white border border-[#edd2db] rounded-lg pl-9 pr-8 py-2 text-xs sm:text-sm text-[#24131a] placeholder:text-[#997c88] focus:outline-none focus:ring-1 focus:ring-[#b8325a]"
          />
          {searchTerm && (
            <button
              type="button"
              onClick={() => setSearchTerm('')}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#997987] hover:text-[#26141c] cursor-pointer"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Category buttons for reducing complexity */}
        <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none pb-1">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setActiveCategory(cat)}
              className={`text-xs font-semibold px-3 py-1.5 rounded-lg border transition-all whitespace-nowrap cursor-pointer ${
                activeCategory === cat
                  ? 'bg-[#8c2444] text-white border-[#8c2444] shadow-button-press'
                  : 'bg-white text-[#634854] border-[#ebd4dc] hover:bg-[#faebf0]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Glossary Items List */}
      {filteredItems.length === 0 ? (
        <div className="bg-white rounded-xl border border-[#e6c7d2] p-8 text-center space-y-2 shadow-paper">
          <p className="text-sm font-semibold text-[#26141c]">No words match your search</p>
          <button
            type="button"
            onClick={() => {
              setSearchTerm('');
              setActiveCategory('All Words');
            }}
            className="text-xs font-bold text-[#8c2444] hover:underline cursor-pointer"
          >
            Show All Words
          </button>
        </div>
      ) : (
        <div className="space-y-3">
          {filteredItems.map((item, idx) => (
            <div
              key={idx}
              className="bg-white rounded-xl border border-[#ebd0d9] p-4 sm:p-5 shadow-paper space-y-2"
            >
              <h2 className="font-bold text-base text-[#8c2444]">
                {item.term}
              </h2>

              <p className="text-xs sm:text-sm text-[#4a333e] leading-relaxed">
                {item.definition}
              </p>

              {item.tipForFreshers && (
                <div className="mt-2 p-2.5 bg-[#fff8fa] rounded-lg border border-[#f0d6df] text-xs text-[#6e4e5b] flex items-start gap-2">
                  <Lightbulb className="w-4 h-4 text-[#b8325a] shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-[#8c2444]">Quick Tip: </span>
                    <span>{item.tipForFreshers}</span>
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
