import React, { useState } from 'react';
import { X, Search } from 'lucide-react';
import { JARGON_GLOSSARY } from '../data/sampleNotices';

interface JargonDictionaryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const JargonDictionaryModal: React.FC<JargonDictionaryModalProps> = ({
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;

  const [searchTerm, setSearchTerm] = useState('');

  const filteredItems = JARGON_GLOSSARY.filter(
    (item) =>
      item.term.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.definition.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 overflow-y-auto bg-slate-900/50">
      <div
        className="bg-pink-50 rounded-2xl shadow-xl border border-pink-200 w-full max-w-lg max-h-[85vh] flex flex-col overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-3.5 border-b border-pink-200 bg-pink-100/60 flex items-center justify-between">
          <h3 className="text-sm font-bold text-slate-900">
            Campus Glossary
          </h3>
          <button
            onClick={onClose}
            className="p-1 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-pink-200/50 cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Search */}
        <div className="p-3 border-b border-pink-200 bg-pink-100/30">
          <div className="relative">
            <Search className="w-3.5 h-3.5 text-pink-500 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search terms..."
              className="w-full bg-white border border-pink-200 rounded-lg pl-8 pr-3 py-1.5 text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-pink-600"
            />
          </div>
        </div>

        {/* List */}
        <div className="p-3 overflow-y-auto space-y-2.5 flex-1 text-xs">
          {filteredItems.length === 0 ? (
            <p className="text-center py-6 text-slate-400">
              No terms found.
            </p>
          ) : (
            filteredItems.map((item, idx) => (
              <div key={idx} className="p-3 rounded-xl border border-pink-200 bg-pink-100/70">
                <div className="font-bold text-pink-900 text-xs sm:text-sm mb-0.5">{item.term}</div>
                <div className="text-slate-700 mb-1">{item.definition}</div>
                <div className="text-pink-950 bg-pink-200/60 p-1.5 rounded text-[11px]">
                  {item.tipForFreshers}
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="p-2.5 border-t border-pink-200 bg-pink-100/50 flex justify-end">
          <button
            onClick={onClose}
            className="px-3.5 py-1 rounded-lg bg-pink-200 hover:bg-pink-300 text-pink-900 text-xs font-semibold cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

