import React, { useState } from 'react';
import { X, Check } from 'lucide-react';
import { FresherProfile } from '../types';

interface ProfileModalProps {
  isOpen: boolean;
  profile: FresherProfile;
  onClose: () => void;
  onSave: (updated: FresherProfile) => void;
}

export const ProfileModal: React.FC<ProfileModalProps> = ({
  isOpen,
  profile,
  onClose,
  onSave,
}) => {
  if (!isOpen) return null;

  const [formData, setFormData] = useState<FresherProfile>({ ...profile });

  const branches = [
    'Computer Science & Engg (CSE)',
    'CSE - Artificial Intelligence',
    'Electronics & Communication (ECE)',
    'Information Technology (IT)',
    'Mechanical Engineering',
    'Electrical Engineering',
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 overflow-y-auto bg-slate-900/50">
      <div
        className="bg-pink-50 rounded-2xl shadow-xl border border-pink-200 w-full max-w-sm overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-4 border-b border-pink-200 bg-pink-100/60 flex items-center justify-between">
          <h3 className="text-sm font-bold text-slate-900">
            Student Profile
          </h3>
          <button
            onClick={onClose}
            className="p-1 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-pink-200/50 cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-4 space-y-3 text-xs sm:text-sm">
          {/* Name */}
          <div>
            <label className="font-semibold text-slate-700 block mb-1">
              Name
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full bg-white border border-pink-200 rounded-lg px-3 py-1.5 text-xs text-slate-900 focus:outline-none focus:border-pink-600"
              required
            />
          </div>

          {/* Branch */}
          <div>
            <label className="font-semibold text-slate-700 block mb-1">
              Branch
            </label>
            <select
              value={formData.branch}
              onChange={(e) => setFormData({ ...formData, branch: e.target.value })}
              className="w-full bg-white border border-pink-200 rounded-lg px-3 py-1.5 text-xs text-slate-900 focus:outline-none focus:border-pink-600"
            >
              {branches.map((b) => (
                <option key={b} value={b}>
                  {b}
                </option>
              ))}
            </select>
          </div>

          {/* Residence Type */}
          <div>
            <label className="font-semibold text-slate-700 block mb-1">
              Residence
            </label>
            <div className="grid grid-cols-2 gap-2">
              {(['Hosteler', 'Day Scholar'] as const).map((status) => (
                <button
                  key={status}
                  type="button"
                  onClick={() => setFormData({ ...formData, residence: status })}
                  className={`py-1.5 px-3 rounded-lg border text-xs font-semibold text-center transition-colors cursor-pointer ${
                    formData.residence === status
                      ? 'border-pink-600 bg-pink-200 text-pink-900 font-bold'
                      : 'border-pink-200 bg-white text-slate-600 hover:bg-pink-100'
                  }`}
                >
                  {status === 'Hosteler' ? 'Hosteler' : 'Day Scholar'}
                </button>
              ))}
            </div>
          </div>

          {/* Footer */}
          <div className="pt-2 border-t border-pink-200 flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-3 py-1.5 rounded-lg text-slate-600 hover:bg-pink-200/50 text-xs font-semibold cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="inline-flex items-center gap-1 px-3.5 py-1.5 rounded-lg bg-pink-600 hover:bg-pink-700 text-white text-xs font-semibold cursor-pointer"
            >
              <Check className="w-3.5 h-3.5" />
              <span>Save</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

