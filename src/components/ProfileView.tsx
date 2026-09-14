import React, { useState } from 'react';
import { User, Check, Building, GraduationCap, Home, Sparkles } from 'lucide-react';
import { FresherProfile } from '../types';

interface ProfileViewProps {
  profile: FresherProfile;
  onSaveProfile: (profile: FresherProfile) => void;
}

export const ProfileView: React.FC<ProfileViewProps> = ({
  profile,
  onSaveProfile,
}) => {
  const [formData, setFormData] = useState<FresherProfile>(profile);
  const [isSaved, setIsSaved] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSaveProfile(formData);
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2500);
  };

  return (
    <div className="max-w-2xl mx-auto space-y-8 py-4">
      {/* Header */}
      <div className="text-center space-y-2">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-pink-100 border border-pink-200 text-pink-900 text-xs font-semibold">
          <User className="w-3.5 h-3.5 text-pink-700" />
          <span>Student Context</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">
          My Student Profile
        </h1>
        <p className="text-sm text-slate-600">
          CampuSense uses your year, branch, and hostel status to highlight which circulars apply to you.
        </p>
      </div>

      {/* Main Form - Pink Box */}
      <form
        onSubmit={handleSubmit}
        className="bg-pink-50 rounded-2xl border border-pink-200 p-6 sm:p-8 space-y-6 shadow-sm"
      >
        {/* Full Name */}
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-pink-950 uppercase tracking-wider block">
            Student Name
          </label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            placeholder="e.g. Rahul Sharma"
            className="w-full bg-white border border-pink-200 rounded-xl px-4 py-2.5 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-pink-500"
          />
        </div>

        {/* College Name */}
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-pink-950 uppercase tracking-wider block">
            University / Institute
          </label>
          <input
            type="text"
            value={formData.collegeName}
            onChange={(e) => setFormData({ ...formData, collegeName: e.target.value })}
            placeholder="e.g. Delhi Technological University"
            className="w-full bg-white border border-pink-200 rounded-xl px-4 py-2.5 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-pink-500"
          />
        </div>

        {/* Year and Branch Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-pink-950 uppercase tracking-wider block">
              Academic Year
            </label>
            <select
              value={formData.year}
              onChange={(e) => setFormData({ ...formData, year: e.target.value })}
              className="w-full bg-white border border-pink-200 rounded-xl px-4 py-2.5 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-pink-500 cursor-pointer"
            >
              <option value="1st Year">1st Year (Fresher)</option>
              <option value="2nd Year">2nd Year (Sophomore)</option>
              <option value="3rd Year">3rd Year (Junior)</option>
              <option value="4th Year">4th Year (Final Year)</option>
            </select>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-pink-950 uppercase tracking-wider block">
              Branch / Program
            </label>
            <input
              type="text"
              value={formData.branch}
              onChange={(e) => setFormData({ ...formData, branch: e.target.value })}
              placeholder="e.g. Computer Science (CSE)"
              className="w-full bg-white border border-pink-200 rounded-xl px-4 py-2.5 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-pink-500"
            />
          </div>
        </div>

        {/* Residence Status */}
        <div className="space-y-2">
          <label className="text-xs font-bold text-pink-950 uppercase tracking-wider block">
            Campus Residence
          </label>
          <div className="grid grid-cols-2 gap-3">
            {(['Hosteler', 'Day Scholar'] as const).map((status) => {
              const isSelected = formData.residence === status;
              return (
                <button
                  key={status}
                  type="button"
                  onClick={() => setFormData({ ...formData, residence: status })}
                  className={`p-3 rounded-xl border text-center transition-all cursor-pointer font-semibold text-xs sm:text-sm ${
                    isSelected
                      ? 'bg-pink-600 text-white border-pink-600 shadow-2xs'
                      : 'bg-white text-slate-700 border-pink-200 hover:bg-pink-100/50'
                  }`}
                >
                  {status}
                </button>
              );
            })}
          </div>
          <p className="text-[11px] text-slate-500">
            Hostel circulars and appliance inspections will be automatically flagged based on this choice.
          </p>
        </div>

        {/* Submit Button */}
        <div className="pt-2 flex items-center justify-between">
          <span className="text-xs text-slate-500">
            Saved locally in your browser
          </span>

          <button
            type="submit"
            className="px-6 py-2.5 rounded-xl bg-pink-600 hover:bg-pink-700 text-white text-xs sm:text-sm font-bold shadow-xs transition-all flex items-center gap-2 cursor-pointer"
          >
            {isSaved ? (
              <>
                <Check className="w-4 h-4" />
                <span>Profile Saved!</span>
              </>
            ) : (
              <span>Save Profile</span>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};
