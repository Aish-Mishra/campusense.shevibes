import React, { useState } from 'react';
import { Search, BookOpen, Lightbulb, GraduationCap, Compass, HelpCircle } from 'lucide-react';
import { JARGON_GLOSSARY } from '../data/sampleNotices';

const CATEGORIES = [
  'All Concepts',
  'Exams & Attendance',
  'Administration & Officers',
  'Documents & Attestation',
  'Hostel & Life',
];

export const GlossaryView: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('All Concepts');

  const filteredItems = JARGON_GLOSSARY.filter((item) => {
    const matchesSearch =
      item.term.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.definition.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.tipForFreshers.toLowerCase().includes(searchTerm.toLowerCase());

    if (!matchesSearch) return false;
    if (activeCategory === 'All Concepts') return true;
    if (activeCategory === 'Exams & Attendance') {
      return ['condonation', 'debarment', 'sessional', 'backlog'].some((t) =>
        item.term.toLowerCase().includes(t)
      );
    }
    if (activeCategory === 'Administration & Officers') {
      return ['dsw', 'proctor', 'dean', 'hod', 'controller'].some((t) =>
        item.term.toLowerCase().includes(t)
      );
    }
    if (activeCategory === 'Documents & Attestation') {
      return ['self-attestation', 'affidavit', 'migration', 'bonafide', 'transcript'].some((t) =>
        item.term.toLowerCase().includes(t)
      );
    }
    if (activeCategory === 'Hostel & Life') {
      return ['warden', 'mess', 'curfew', 'outpass', 'caretaker'].some((t) =>
        item.term.toLowerCase().includes(t)
      );
    }
    return true;
  });

  return (
    <div className="space-y-8 pb-16">
      {/* Header */}
      <div className="border-b border-[#ebd2db] pb-5">
        <div className="flex items-center gap-2 mb-1.5">
          <span className="w-2 h-2 rounded-full bg-[#b8325a]" />
          <span className="font-mono text-[11px] uppercase tracking-widest text-[#8c3b53] font-semibold">
            The Fresher Lexicon
          </span>
        </div>
        <h1 className="font-serif-heading text-2xl sm:text-3xl lg:text-4xl font-bold text-[#26141c]">
          Decoded Campus Jargon
        </h1>
        <p className="text-sm text-[#6e505d] mt-1.5 max-w-2xl leading-relaxed">
          The unwritten translations of bureaucratic college vocabulary. What professors and circulars call “Condonation Petition”, “Debarment”, and “Proctorial Inquest” — explained in simple student English.
        </p>
      </div>

      {/* Search & Filter bar */}
      <div className="bg-white rounded-xl border border-[#ebd0d9] p-4 shadow-paper space-y-3">
        <div className="relative">
          <Search className="w-4 h-4 text-[#967583] absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search campus terms (e.g. Condonation, Debarment, Self-Attestation, DSW)..."
            className="w-full bg-[#fdfafb] border border-[#edd2db] rounded-lg pl-10 pr-4 py-2 text-xs sm:text-sm text-[#24131a] placeholder:text-[#997c88] focus:outline-none focus:bg-white focus:ring-1 focus:ring-[#b8325a]"
          />
        </div>

        {/* Categories */}
        <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none pt-0.5">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setActiveCategory(cat)}
              className={`text-xs font-semibold px-3 py-1.5 rounded-lg border transition-all whitespace-nowrap cursor-pointer ${
                activeCategory === cat
                  ? 'bg-[#8c2444] text-white border-[#8c2444] shadow-button-press'
                  : 'bg-[#fdf6f8] text-[#634854] border-[#ebd4dc] hover:bg-[#faebf0]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Glossary List */}
      {filteredItems.length === 0 ? (
        <div className="bg-white rounded-xl border border-dashed border-[#e6c7d2] p-12 text-center space-y-3">
          <BookOpen className="w-10 h-10 text-[#d49faa] mx-auto" />
          <h3 className="font-serif-heading text-lg font-bold text-[#26141c]">Term not found</h3>
          <p className="text-xs text-[#6e505d] max-w-sm mx-auto">
            We haven’t indexed this term yet. Ask the Senior Desk on any notice dossier to get a custom breakdown.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {filteredItems.map((item, index) => (
            <div
              key={index}
              className="bg-white rounded-xl border border-[#ebd0d9] p-5 sm:p-6 shadow-paper hover:border-[#b8325a] hover:shadow-paper-hover transition-all flex flex-col justify-between space-y-4"
            >
              <div className="space-y-2">
                <div className="flex items-start justify-between gap-2">
                  <h3 className="font-serif-heading text-lg font-bold text-[#24131a]">
                    {item.term}
                  </h3>
                  <span className="font-mono text-[10px] uppercase tracking-wider text-[#8c384e] bg-[#fcedf1] px-2 py-0.5 rounded border border-[#f2d0db]">
                    Campus Jargon
                  </span>
                </div>

                <p className="text-xs sm:text-sm text-[#543b47] leading-relaxed">
                  {item.definition}
                </p>
              </div>

              {item.tipForFreshers && (
                <div className="pt-3 border-t border-[#f2dde4]">
                  <div className="p-3 rounded-lg bg-[#fff8fa] border border-[#ebd4dc] space-y-1">
                    <span className="font-mono text-[10px] font-bold text-[#8c2444] uppercase tracking-wider flex items-center gap-1">
                      <Lightbulb className="w-3.5 h-3.5 text-[#b8325a]" />
                      <span>Senior Pro-Tip</span>
                    </span>
                    <p className="text-xs text-[#614552] leading-relaxed">
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
