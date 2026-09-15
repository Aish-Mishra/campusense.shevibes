import React, { useState } from 'react';
import {
  Building2,
  Lock,
  Mail,
  Eye,
  EyeOff,
  ArrowRight,
  Sparkles,
  CheckCircle2,
  User,
  ShieldCheck,
} from 'lucide-react';
import { FresherProfile } from '../types';

interface LoginViewProps {
  onLogin: (profile: FresherProfile) => void;
  onContinueAsGuest: () => void;
  currentProfile: FresherProfile;
}

const DEMO_STUDENTS: Array<{
  id: string;
  name: string;
  rollNumber: string;
  email: string;
  collegeName: string;
  branch: string;
  year: string;
  residence: 'Hosteler' | 'Day Scholar';
}> = [
  {
    id: 'student-1',
    name: 'Rahul Sharma',
    rollNumber: '2026-CSE-049',
    email: 'rahul.s26@dtu.ac.in',
    collegeName: 'Delhi Technological University',
    branch: 'Computer Science (CSE)',
    year: '1st Year',
    residence: 'Hosteler',
  },
  {
    id: 'student-2',
    name: 'Aishwarya Verma',
    rollNumber: '01901012026',
    email: 'aish019btcseai26@igdtuw.ac.in',
    collegeName: 'IGDTUW Delhi',
    branch: 'CSE (Artificial Intelligence)',
    year: '1st Year',
    residence: 'Day Scholar',
  },
  {
    id: 'student-3',
    name: 'Ananya Gupta',
    rollNumber: '2026-IT-108',
    email: 'ananya.g26@nsut.ac.in',
    collegeName: 'NSUT Delhi',
    branch: 'Information Technology',
    year: '1st Year',
    residence: 'Hosteler',
  },
];

export const LoginView: React.FC<LoginViewProps> = ({
  onLogin,
  onContinueAsGuest,
  currentProfile,
}) => {
  const [identifier, setIdentifier] = useState(currentProfile.email || currentProfile.rollNumber || '');
  const [password, setPassword] = useState('campus2026');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [loginSuccess, setLoginSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!identifier.trim()) {
      setErrorMessage('Please enter your college roll number or email.');
      return;
    }
    if (!password.trim()) {
      setErrorMessage('Please enter your password or pin.');
      return;
    }

    setErrorMessage(null);
    setLoginSuccess(true);

    // Find if it matches one of our demo students
    const matched = DEMO_STUDENTS.find(
      (s) =>
        s.email.toLowerCase() === identifier.trim().toLowerCase() ||
        s.rollNumber.toLowerCase() === identifier.trim().toLowerCase()
    );

    const loggedInProfile: FresherProfile = matched
      ? {
          name: matched.name,
          year: matched.year,
          branch: matched.branch,
          residence: matched.residence,
          category: 'General',
          collegeName: matched.collegeName,
          rollNumber: matched.rollNumber,
          email: matched.email,
        }
      : {
          name: identifier.includes('@') ? identifier.split('@')[0] : 'Student (' + identifier + ')',
          year: '1st Year',
          branch: 'Computer Science (CSE)',
          residence: 'Hosteler',
          category: 'General',
          collegeName: 'Campus University',
          rollNumber: identifier.includes('@') ? '2026-CS-101' : identifier,
          email: identifier.includes('@') ? identifier : `${identifier.toLowerCase()}@college.edu.in`,
        };

    setTimeout(() => {
      onLogin(loggedInProfile);
    }, 600);
  };

  const handleQuickLogin = (student: (typeof DEMO_STUDENTS)[0]) => {
    setIdentifier(student.email);
    setPassword('••••••••');
    setErrorMessage(null);
    setLoginSuccess(true);
    setTimeout(() => {
      onLogin({
        name: student.name,
        year: student.year,
        branch: student.branch,
        residence: student.residence,
        category: 'General',
        collegeName: student.collegeName,
        rollNumber: student.rollNumber,
        email: student.email,
      });
    }, 400);
  };

  return (
    <div className="max-w-md mx-auto space-y-6 py-4 pb-16">
      {/* Brand Header */}
      <div className="text-center space-y-2">
        <div className="w-12 h-12 rounded-xl bg-[#8c2444] text-white flex items-center justify-center shadow-button-press mx-auto">
          <Building2 className="w-6 h-6 text-rose-100" />
        </div>
        <h1 className="font-serif-heading text-2xl sm:text-3xl font-bold text-[#26141c]">
          Student Sign In
        </h1>
        <p className="text-xs sm:text-sm text-[#6e505d] max-w-sm mx-auto">
          Log in with your college roll number or email so notices show whether they apply to you.
        </p>
      </div>

      {/* Buttons for reducing complexity: 1-Click Demo Login */}
      <div className="bg-[#fff8fa] rounded-xl border border-[#ebd0d9] p-4 shadow-paper space-y-2.5">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-[#8c2444] flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-[#b8325a]" />
            <span>1-Click Quick Login:</span>
          </span>
          <span className="text-[10px] text-[#8c6b78]">Tap to sign in instantly</span>
        </div>

        <div className="grid grid-cols-1 gap-2">
          {DEMO_STUDENTS.map((student) => (
            <button
              key={student.id}
              type="button"
              onClick={() => handleQuickLogin(student)}
              className="w-full text-left p-2.5 rounded-lg bg-white border border-[#ebd2dc] hover:border-[#b8325a] hover:bg-[#fff2f5] transition-all cursor-pointer flex items-center justify-between group shadow-sm"
            >
              <div className="min-w-0 pr-2">
                <p className="text-xs font-bold text-[#26141c] group-hover:text-[#8c2444] truncate">
                  {student.name} ({student.branch.split('(')[0].trim()})
                </p>
                <p className="text-[11px] text-[#785b67] truncate">
                  {student.collegeName} • {student.residence}
                </p>
              </div>
              <span className="text-xs font-bold text-[#8c2444] shrink-0 flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                Sign In →
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Main Login Form */}
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-xl border border-[#ebd0d9] p-6 shadow-paper space-y-4"
      >
        <div className="flex items-center justify-between pb-2 border-b border-[#f3dde3]">
          <h2 className="text-xs font-bold uppercase tracking-wider text-[#3d2731]">
            Or enter your college credentials:
          </h2>
          <span className="text-[11px] text-[#8c6b78] flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5 text-[#2b5936]" />
            Secure
          </span>
        </div>

        {/* Roll Number or Email */}
        <div className="space-y-1">
          <label className="text-xs font-bold text-[#3d2731] block">
            Roll Number or College Email:
          </label>
          <div className="relative">
            <Mail className="w-4 h-4 text-[#967583] absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={identifier}
              onChange={(e) => setIdentifier(e.target.value)}
              placeholder="e.g. 01901012026 or name@college.ac.in"
              className="w-full bg-[#fdfafb] border border-[#edd2db] rounded-lg pl-9 pr-3.5 py-2 text-xs sm:text-sm text-[#26141c] placeholder:text-[#997c88] focus:outline-none focus:bg-white focus:ring-1 focus:ring-[#b8325a]"
            />
          </div>
        </div>

        {/* Password */}
        <div className="space-y-1">
          <div className="flex items-center justify-between">
            <label className="text-xs font-bold text-[#3d2731] block">
              Password or Portal PIN:
            </label>
            <span className="text-[11px] text-[#8c6b78]">Default: campus2026</span>
          </div>
          <div className="relative">
            <Lock className="w-4 h-4 text-[#967583] absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your student password"
              className="w-full bg-[#fdfafb] border border-[#edd2db] rounded-lg pl-9 pr-9 py-2 text-xs sm:text-sm text-[#26141c] placeholder:text-[#997c88] focus:outline-none focus:bg-white focus:ring-1 focus:ring-[#b8325a]"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[#997987] hover:text-[#26141c] cursor-pointer"
            >
              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Remember Me */}
        <div className="flex items-center justify-between text-xs text-[#6e505d]">
          <label className="flex items-center gap-2 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              className="rounded border-[#ebd0d9] text-[#8c2444] focus:ring-[#b8325a]"
            />
            <span>Remember me on this browser</span>
          </label>
        </div>

        {errorMessage && (
          <p className="text-xs text-[#991d3c] bg-[#fdf2f4] p-2.5 rounded-lg border border-[#f5ccd5]">
            {errorMessage}
          </p>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full py-2.5 rounded-lg bg-[#b8325a] hover:bg-[#a12448] text-white text-xs sm:text-sm font-bold shadow-button-press transition-all flex items-center justify-center gap-2 cursor-pointer"
        >
          {loginSuccess ? (
            <>
              <CheckCircle2 className="w-4 h-4 text-emerald-200" />
              <span>Signed In! Loading Notices...</span>
            </>
          ) : (
            <>
              <span>Sign In to Dashboard</span>
              <ArrowRight className="w-4 h-4" />
            </>
          )}
        </button>

        {/* Continue as Guest button */}
        <div className="pt-2 text-center border-t border-[#f3dde3]">
          <button
            type="button"
            onClick={onContinueAsGuest}
            className="text-xs font-semibold text-[#8c2444] hover:underline cursor-pointer"
          >
            Or browse notices as a Guest without logging in
          </button>
        </div>
      </form>
    </div>
  );
};
