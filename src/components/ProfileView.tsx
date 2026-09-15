import React, { useState } from 'react';
import { User, Check, Building, GraduationCap, Home, Sparkles, CreditCard, ShieldCheck } from 'lucide-react';
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
    <div className="max-w-2xl mx-auto space-y-8 pb-16">
      {/* Header */}
      <div className="border-b border-[#ebd2db] pb-4">
        <div className="flex items-center gap-2 mb-1.5">
          <span className="w-2 h-2 rounded-full bg-[#b8325a]" />
          <span className="font-mono text-[11px] uppercase tracking-widest text-[#8c3b53] font-semibold">
            Student Identity & Eligibility
          </span>
        </div>
        <h1 className="font-serif-heading text-2xl sm:text-3xl font-bold text-[#26141c]">
          My Student Card
        </h1>
        <p className="text-sm text-[#6e505d] mt-1">
          Set your branch, year, and hostel residence so CampuSense can instantly highlight which circulars apply to you.
        </p>
      </div>

      {/* Realistic Campus Student Card Preview */}
      <div className="bg-gradient-to-br from-[#fff5f7] via-[#ffffff] to-[#fff0f4] rounded-xl border-2 border-[#ebd0d9] p-6 shadow-paper space-y-4 relative overflow-hidden">
        {/* Decorative background watermark */}
        <div className="absolute right-4 -bottom-6 text-[#f7dce4] opacity-35 pointer-events-none select-none">
          <GraduationCap className="w-36 h-36" />
        </div>

        <div className="flex items-center justify-between border-b border-[#f3dde3] pb-3">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-md bg-[#8c2444] text-white flex items-center justify-center font-bold text-xs">
              U
            </div>
            <span className="font-serif-heading font-bold text-sm text-[#26141c] truncate max-w-[280px]">
              {formData.collegeName || 'Delhi Technological University'}
            </span>
          </div>

          <span className="font-mono text-[10px] uppercase tracking-wider text-[#8c2444] bg-[#fcedf1] px-2 py-0.5 rounded border border-[#f0cdd7]">
            2026–27
          </span>
        </div>

        <div className="flex items-start gap-4 pt-1">
          <div className="w-16 h-20 rounded-lg bg-[#fcf0f3] border-2 border-[#ebd0d9] flex flex-col items-center justify-center text-[#8c2444] shrink-0">
            <User className="w-8 h-8 opacity-75" />
            <span className="text-[9px] font-mono font-bold mt-1 text-[#a34760]">PHOTO</span>
          </div>

          <div className="space-y-1 flex-1 min-w-0">
            <h3 className="font-serif-heading text-lg font-bold text-[#24131a] truncate">
              {formData.name || 'Rahul Sharma'}
            </h3>
            <p className="font-mono text-xs text-[#8c2444] font-semibold">
              {formData.branch || 'Computer Science (CSE)'} • {formData.year}
            </p>
            <div className="flex items-center gap-2 pt-1 text-xs text-[#6e505d]">
              <span className="inline-flex items-center gap-1 font-medium bg-white px-2 py-0.5 rounded border border-[#ebd2dc]">
                <Home className="w-3 h-3 text-[#b8325a]" />
                <span>{formData.residence}</span>
              </span>
              <span className="font-mono text-[10px] text-[#8c6b78]">
                ID: CS-2026-049
              </span>
            </div>
          </div>
        </div>

        <div className="pt-2 border-t border-dashed border-[#ecd5de] flex items-center justify-between text-[10px] font-mono text-[#8c6d7a]">
          <span>VERIFIED STUDENT RECORD</span>
          <span>CAMPUSENSE REGISTER</span>
        </div>
      </div>

      {/* Edit Form */}
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-xl border border-[#ebd0d9] p-6 shadow-paper space-y-5"
      >
        <h2 className="font-serif-heading text-lg font-bold text-[#24131a] pb-2 border-b border-[#f3dde3]">
          Update Your Academic Details
        </h2>

        {/* Full Name */}
        <div className="space-y-1">
          <label className="text-xs font-bold uppercase tracking-wider text-[#3d2731] block">
            Student Full Name:
          </label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            placeholder="e.g. Rahul Sharma"
            className="w-full bg-[#fdfafb] border border-[#edd2db] rounded-lg px-3.5 py-2 text-sm text-[#26141c] focus:outline-none focus:bg-white focus:ring-1 focus:ring-[#b8325a]"
          />
        </div>

        {/* College Name */}
        <div className="space-y-1">
          <label className="text-xs font-bold uppercase tracking-wider text-[#3d2731] block">
            University / Institute Name:
          </label>
          <input
            type="text"
            value={formData.collegeName}
            onChange={(e) => setFormData({ ...formData, collegeName: e.target.value })}
            placeholder="e.g. Delhi Technological University"
            className="w-full bg-[#fdfafb] border border-[#edd2db] rounded-lg px-3.5 py-2 text-sm text-[#26141c] focus:outline-none focus:bg-white focus:ring-1 focus:ring-[#b8325a]"
          />
        </div>

        {/* Year and Branch Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="text-xs font-bold uppercase tracking-wider text-[#3d2731] block">
              Academic Year:
            </label>
            <select
              value={formData.year}
              onChange={(e) => setFormData({ ...formData, year: e.target.value })}
              className="w-full bg-[#fdfafb] border border-[#edd2db] rounded-lg px-3 py-2 text-sm text-[#26141c] focus:outline-none focus:bg-white focus:ring-1 focus:ring-[#b8325a] cursor-pointer"
            >
              <option value="1st Year">1st Year (Fresher)</option>
              <option value="2nd Year">2nd Year (Sophomore)</option>
              <option value="3rd Year">3rd Year (Junior)</option>
              <option value="4th Year">4th Year (Final Year)</option>
            </select>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold uppercase tracking-wider text-[#3d2731] block">
              Branch / Department:
            </label>
            <input
              type="text"
              value={formData.branch}
              onChange={(e) => setFormData({ ...formData, branch: e.target.value })}
              placeholder="e.g. Computer Science (CSE)"
              className="w-full bg-[#fdfafb] border border-[#edd2db] rounded-lg px-3.5 py-2 text-sm text-[#26141c] focus:outline-none focus:bg-white focus:ring-1 focus:ring-[#b8325a]"
            />
          </div>
        </div>

        {/* Residence Status */}
        <div className="space-y-2">
          <label className="text-xs font-bold uppercase tracking-wider text-[#3d2731] block">
            Hostel / Day Scholar:
          </label>
          <div className="grid grid-cols-2 gap-3">
            {(['Hosteler', 'Day Scholar'] as const).map((status) => {
              const isSelected = formData.residence === status;
              return (
                <button
                  key={status}
                  type="button"
                  onClick={() => setFormData({ ...formData, residence: status })}
                  className={`p-3 rounded-lg border text-center transition-all cursor-pointer font-semibold text-xs sm:text-sm ${
                    isSelected
                      ? 'bg-[#8c2444] text-white border-[#8c2444] shadow-button-press'
                      : 'bg-[#fdf6f8] text-[#543b47] border-[#ebd0d9] hover:bg-[#faeaf0]'
                  }`}
                >
                  {status}
                </button>
              );
            })}
          </div>
          <p className="text-[11px] text-[#7d5e6c]">
            Hostel circulars (e.g. electric appliance checks, curfew rules) will be prioritized if you are a Hosteler.
          </p>
        </div>

        {/* Submit */}
        <div className="pt-2 border-t border-[#f3dde3] flex items-center justify-between">
          <span className="text-xs text-[#8c6b78]">
            Saved securely in your browser cache
          </span>

          <button
            type="submit"
            className="px-5 py-2.5 rounded-lg bg-[#b8325a] hover:bg-[#a12448] text-white text-xs sm:text-sm font-semibold shadow-button-press transition-all flex items-center gap-2 cursor-pointer"
          >
            {isSaved ? (
              <>
                <Check className="w-4 h-4" />
                <span>Card Updated!</span>
              </>
            ) : (
              <span>Save Student Card</span>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};
