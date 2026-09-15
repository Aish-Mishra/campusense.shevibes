import React, { useState } from 'react';
import { User, Check, Home, GraduationCap, LogOut, UserCheck } from 'lucide-react';
import { FresherProfile } from '../types';

interface ProfileViewProps {
  profile: FresherProfile;
  onSaveProfile: (profile: FresherProfile) => void;
  onSwitchAccount?: () => void;
  onLogout?: () => void;
  isLoggedIn?: boolean;
}

const BRANCH_OPTIONS = [
  'Computer Science & Artificial Intelligence / CSAI',
  'Computer Science & Engineering (CSE)',
  'Information Technology (IT)',
  'Electronics & Communication (ECE)',
  'Mechanical Engineering',
  'Electrical Engineering',
];

const CSAI_SUBJECTS = [
  'Data Structures',
  'Database Management Systems',
  'Operating Systems',
  'Computer Networks',
  'Object Oriented Programming',
  'Artificial Intelligence',
  'Machine Learning',
  'Deep Learning',
  'Python Programming',
];

const SUBJECTS_BY_BRANCH: Record<string, string[]> = {
  'Computer Science & Artificial Intelligence / CSAI': CSAI_SUBJECTS,
  'Computer Science & Engineering (CSE)': [
    'Data Structures',
    'Database Management Systems',
    'Operating Systems',
    'Computer Networks',
    'Discrete Mathematics',
    'Theory of Computation',
  ],
  'Information Technology (IT)': [
    'Data Structures',
    'Web Technologies',
    'Software Engineering',
    'Database Management Systems',
    'Computer Networks',
  ],
  'Electronics & Communication (ECE)': [
    'Digital Electronics',
    'Signals and Systems',
    'Microprocessors',
    'Analog Circuits',
    'Electromagnetic Fields',
  ],
  'Mechanical Engineering': [
    'Thermodynamics',
    'Fluid Mechanics',
    'Strength of Materials',
    'Kinematics of Machinery',
  ],
  'Electrical Engineering': [
    'Circuit Analysis',
    'Power Systems',
    'Control Systems',
    'Electrical Machines',
  ],
};

export const ProfileView: React.FC<ProfileViewProps> = ({
  profile,
  onSaveProfile,
  onSwitchAccount,
  onLogout,
  isLoggedIn = true,
}) => {
  const [formData, setFormData] = useState<FresherProfile>(profile);
  const [isSaved, setIsSaved] = useState(false);

  const currentSubjects =
    SUBJECTS_BY_BRANCH[formData.branch] ||
    (formData.branch?.includes('CSAI') || formData.branch?.includes('Artificial Intelligence')
      ? CSAI_SUBJECTS
      : CSAI_SUBJECTS);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSaveProfile(formData);
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2500);
  };

  return (
    <div className="max-w-xl mx-auto space-y-6 pb-16">
      {/* Header */}
      <div className="text-center space-y-1.5 border-b border-[#ebd2db] pb-4">
        <h1 className="font-serif-heading text-2xl sm:text-3xl font-bold text-[#26141c]">
          My Student Profile
        </h1>
        <p className="text-xs sm:text-sm text-[#6e505d]">
          Set your year, branch, and hostel status so notices can tell you immediately if they apply to you.
        </p>
      </div>

      {/* Simple Profile Card */}
      <div className="bg-white rounded-xl border border-[#ebd0d9] p-5 shadow-paper space-y-3">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-full bg-[#fcedf1] border-2 border-[#ebd0d9] flex items-center justify-center text-[#8c2444] shrink-0 font-bold text-lg">
            {formData.name.charAt(0) || 'S'}
          </div>

          <div className="space-y-0.5 flex-1 min-w-0">
            <h2 className="font-serif-heading text-base sm:text-lg font-bold text-[#24131a] truncate">
              {formData.name || 'Student Name'}
            </h2>
            <p className="text-xs text-[#8c2444] font-semibold">
              {formData.branch || 'Branch'}{formData.subject ? ` • ${formData.subject}` : ''} • {formData.year}
            </p>
            <p className="text-xs text-[#6e505d] flex items-center gap-1">
              <Home className="w-3.5 h-3.5 text-[#b8325a]" />
              <span>{formData.residence}</span>
              <span>•</span>
              <span className="truncate">{formData.collegeName || 'Campus College'}</span>
            </p>
            {formData.rollNumber && (
              <p className="text-[11px] text-[#8c6b78] font-mono">
                Roll No: {formData.rollNumber}
              </p>
            )}
          </div>
        </div>

        {/* Account actions: Switch / Log out */}
        <div className="pt-2 border-t border-[#f3dde3] flex items-center justify-between text-xs">
          <span className="text-[11px] text-[#8c6b78]">
            {isLoggedIn ? '● Logged in' : '○ Guest Mode'}
          </span>

          <div className="flex items-center gap-2">
            {onSwitchAccount && (
              <button
                type="button"
                onClick={onSwitchAccount}
                className="font-semibold text-[#8c2444] hover:underline cursor-pointer"
              >
                Switch Student Account
              </button>
            )}

            {isLoggedIn && onLogout && (
              <>
                <span className="text-[#ecd6dd]">•</span>
                <button
                  type="button"
                  onClick={onLogout}
                  className="font-semibold text-[#991d3c] hover:underline flex items-center gap-1 cursor-pointer"
                >
                  <LogOut className="w-3 h-3" />
                  <span>Log Out</span>
                </button>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Edit Form */}
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-xl border border-[#ebd0d9] p-5 sm:p-6 shadow-paper space-y-4"
      >
        <h3 className="font-bold text-sm text-[#24131a] pb-2 border-b border-[#f3dde3]">
          Update Details
        </h3>

        {/* Full Name */}
        <div className="space-y-1">
          <label className="text-xs font-bold text-[#3d2731] block">
            Your Name:
          </label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            placeholder="e.g. Rahul Sharma"
            className="w-full bg-[#fdfafb] border border-[#edd2db] rounded-lg px-3.5 py-2 text-xs sm:text-sm text-[#26141c] focus:outline-none focus:bg-white focus:ring-1 focus:ring-[#b8325a]"
          />
        </div>

        {/* College Name */}
        <div className="space-y-1">
          <label className="text-xs font-bold text-[#3d2731] block">
            College or University:
          </label>
          <input
            type="text"
            value={formData.collegeName}
            onChange={(e) => setFormData({ ...formData, collegeName: e.target.value })}
            placeholder="e.g. Delhi Technological University"
            className="w-full bg-[#fdfafb] border border-[#edd2db] rounded-lg px-3.5 py-2 text-xs sm:text-sm text-[#26141c] focus:outline-none focus:bg-white focus:ring-1 focus:ring-[#b8325a]"
          />
        </div>

        {/* Year and Branch */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="space-y-1">
            <label className="text-xs font-bold text-[#3d2731] block">
              Current Year:
            </label>
            <select
              value={formData.year}
              onChange={(e) => setFormData({ ...formData, year: e.target.value })}
              className="w-full bg-[#fdfafb] border border-[#edd2db] rounded-lg px-3 py-2 text-xs sm:text-sm text-[#26141c] focus:outline-none focus:bg-white focus:ring-1 focus:ring-[#b8325a] cursor-pointer"
            >
              <option value="1st Year">1st Year (Fresher)</option>
              <option value="2nd Year">2nd Year</option>
              <option value="3rd Year">3rd Year</option>
              <option value="4th Year">4th Year</option>
            </select>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-[#3d2731] block">
              Select Your Branch:
            </label>
            <select
              value={formData.branch}
              onChange={(e) => {
                const newBranch = e.target.value;
                const subjects =
                  SUBJECTS_BY_BRANCH[newBranch] ||
                  (newBranch.includes('CSAI') || newBranch.includes('Artificial Intelligence')
                    ? CSAI_SUBJECTS
                    : CSAI_SUBJECTS);
                setFormData({
                  ...formData,
                  branch: newBranch,
                  subject: subjects[0] || '',
                });
              }}
              className="w-full bg-[#fdfafb] border border-[#edd2db] rounded-lg px-3 py-2 text-xs sm:text-sm text-[#26141c] focus:outline-none focus:bg-white focus:ring-1 focus:ring-[#b8325a] cursor-pointer"
            >
              <option value="">-- Select Your Branch --</option>
              {BRANCH_OPTIONS.map((b) => (
                <option key={b} value={b}>
                  {b}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Select Your Subject */}
        <div className="space-y-1">
          <label className="text-xs font-bold text-[#3d2731] block">
            Select Your Subject:
          </label>
          <select
            value={formData.subject || ''}
            onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
            className="w-full bg-[#fdfafb] border border-[#edd2db] rounded-lg px-3 py-2 text-xs sm:text-sm text-[#26141c] focus:outline-none focus:bg-white focus:ring-1 focus:ring-[#b8325a] cursor-pointer"
          >
            <option value="">-- Select Your Subject --</option>
            {currentSubjects.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>

        {/* Residence Status */}
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-[#3d2731] block">
            Where do you live?
          </label>
          <div className="grid grid-cols-2 gap-3">
            {(['Hosteler', 'Day Scholar'] as const).map((status) => {
              const isSelected = formData.residence === status;
              return (
                <button
                  key={status}
                  type="button"
                  onClick={() => setFormData({ ...formData, residence: status })}
                  className={`py-2.5 rounded-lg border text-center transition-all cursor-pointer font-semibold text-xs sm:text-sm ${
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
        </div>

        {/* Submit */}
        <div className="pt-2 border-t border-[#f3dde3] flex items-center justify-between">
          <span className="text-[11px] text-[#8c6b78]">
            Saved on your device
          </span>

          <button
            type="submit"
            className="px-5 py-2 rounded-lg bg-[#b8325a] hover:bg-[#a12448] text-white text-xs sm:text-sm font-semibold shadow-button-press transition-all flex items-center gap-1.5 cursor-pointer"
          >
            {isSaved ? (
              <>
                <Check className="w-4 h-4" />
                <span>Saved!</span>
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
