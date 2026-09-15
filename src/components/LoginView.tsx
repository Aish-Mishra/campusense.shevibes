import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
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
  GraduationCap,
  Home,
  Check,
  IdCard,
  KeyRound,
  Compass,
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
  collegeShort: string;
  branch: string;
  year: string;
  residence: 'Hosteler' | 'Day Scholar';
  avatarBg: string;
  avatarText: string;
  highlight: string;
}> = [
  {
    id: 'student-2',
    name: 'Aishwarya Verma',
    rollNumber: '01901012026',
    email: 'aish019btcseai26@igdtuw.ac.in',
    collegeName: 'Indira Gandhi Delhi Technical University for Women',
    collegeShort: 'IGDTUW Delhi',
    branch: 'Computer Science & Artificial Intelligence / CSAI',
    year: '1st Year',
    residence: 'Day Scholar',
    avatarBg: 'bg-[#fce7ed]',
    avatarText: 'text-[#8c2444]',
    highlight: 'Your Saved Profile',
  },
  {
    id: 'student-1',
    name: 'Rahul Sharma',
    rollNumber: '2026-CSE-049',
    email: 'rahul.s26@dtu.ac.in',
    collegeName: 'Delhi Technological University',
    collegeShort: 'DTU Delhi',
    branch: 'B.Tech Computer Engineering',
    year: '1st Year',
    residence: 'Hosteler',
    avatarBg: 'bg-[#fbeaf0]',
    avatarText: 'text-[#b8325a]',
    highlight: 'Hosteler Demo',
  },
  {
    id: 'student-3',
    name: 'Ananya Gupta',
    rollNumber: '2026-IT-108',
    email: 'ananya.g26@nsut.ac.in',
    collegeName: 'Netaji Subhas University of Technology',
    collegeShort: 'NSUT Delhi',
    branch: 'B.Tech Information Technology',
    year: '1st Year',
    residence: 'Hosteler',
    avatarBg: 'bg-[#faedf2]',
    avatarText: 'text-[#7d223f]',
    highlight: 'Hosteler Demo',
  },
];

export const LoginView: React.FC<LoginViewProps> = ({
  onLogin,
  onContinueAsGuest,
  currentProfile,
}) => {
  const [activeTab, setActiveTab] = useState<'quick' | 'manual'>('quick');
  const [identifier, setIdentifier] = useState(
    currentProfile.email || currentProfile.rollNumber || ''
  );
  const [password, setPassword] = useState('campus2026');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const [selectedStudentId, setSelectedStudentId] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!identifier.trim()) {
      setErrorMessage('Please enter your college roll number or email.');
      return;
    }
    if (!password.trim()) {
      setErrorMessage('Please enter your password or PIN.');
      return;
    }

    setErrorMessage(null);
    setIsAuthenticating(true);

    // Find if matches demo list
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
          name: identifier.includes('@')
            ? identifier.split('@')[0].replace('.', ' ')
            : `Student (${identifier})`,
          year: '1st Year',
          branch: 'Computer Science (CSE)',
          residence: 'Hosteler',
          category: 'General',
          collegeName: 'Campus University',
          rollNumber: identifier.includes('@') ? '2026-CS-101' : identifier,
          email: identifier.includes('@')
            ? identifier
            : `${identifier.toLowerCase()}@college.edu.in`,
        };

    setTimeout(() => {
      onLogin(loggedInProfile);
    }, 550);
  };

  const handleQuickLogin = (student: (typeof DEMO_STUDENTS)[0]) => {
    setSelectedStudentId(student.id);
    setIsAuthenticating(true);
    setErrorMessage(null);

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
    }, 450);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.28, ease: 'easeOut' }}
      className="max-w-xl mx-auto py-3 sm:py-6 pb-20 space-y-6"
    >
      {/* Editorial Decorative Header */}
      <div className="text-center space-y-3">
        {/* Animated Pill Badge */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#fcedf2] border border-[#f3ccd8] text-[#8c2444] text-[11px] font-semibold tracking-wide"
        >
          <span className="w-2 h-2 rounded-full bg-[#b8325a] animate-pulse" />
          <span>Student Access Portal</span>
          <span className="text-[#ebd0d9]">•</span>
          <span className="font-mono text-[10px] text-[#733346]">Batch 2026–27</span>
        </motion.div>

        <h1 className="font-serif-heading text-3xl sm:text-4xl font-bold text-[#26141c] tracking-tight">
          Welcome to CampuSense
        </h1>

        <p className="text-xs sm:text-sm text-[#694d59] max-w-md mx-auto leading-relaxed">
          Sign in to unlock personalized circular highlights, room directions, and instant eligibility alerts for your branch and residence.
        </p>

        {/* University badges list */}
        <div className="flex items-center justify-center gap-2 pt-1 text-[11px] text-[#8c6575] font-medium flex-wrap">
          <span className="px-2 py-0.5 rounded bg-white border border-[#ebd0d9]">IGDTUW</span>
          <span className="px-2 py-0.5 rounded bg-white border border-[#ebd0d9]">DTU</span>
          <span className="px-2 py-0.5 rounded bg-white border border-[#ebd0d9]">NSUT</span>
          <span className="px-2 py-0.5 rounded bg-white border border-[#ebd0d9]">All Affiliated Colleges</span>
        </div>
      </div>

      {/* Main Interactive Login Shell */}
      <div className="bg-white rounded-2xl border border-[#ead0da] shadow-paper overflow-hidden">
        {/* Animated Navigation Segment Switcher */}
        <div className="p-2 border-b border-[#f3dde4] bg-[#fffbfc] flex gap-2">
          <button
            type="button"
            onClick={() => {
              setActiveTab('quick');
              setErrorMessage(null);
            }}
            className={`relative flex-1 py-2.5 px-3 rounded-xl text-xs sm:text-sm font-bold transition-colors flex items-center justify-center gap-2 cursor-pointer ${
              activeTab === 'quick' ? 'text-[#8c2444]' : 'text-[#7d5f6d] hover:text-[#26141c]'
            }`}
          >
            {activeTab === 'quick' && (
              <motion.div
                layoutId="loginTabIndicator"
                className="absolute inset-0 bg-[#fcedf2] rounded-xl border border-[#f0cdd7] shadow-sm"
                transition={{ type: 'spring', stiffness: 450, damping: 35 }}
              />
            )}
            <span className="relative z-10 flex items-center gap-1.5">
              <IdCard className="w-4 h-4 text-[#b8325a]" />
              <span>1-Click Student Pass</span>
            </span>
          </button>

          <button
            type="button"
            onClick={() => {
              setActiveTab('manual');
              setErrorMessage(null);
            }}
            className={`relative flex-1 py-2.5 px-3 rounded-xl text-xs sm:text-sm font-bold transition-colors flex items-center justify-center gap-2 cursor-pointer ${
              activeTab === 'manual' ? 'text-[#8c2444]' : 'text-[#7d5f6d] hover:text-[#26141c]'
            }`}
          >
            {activeTab === 'manual' && (
              <motion.div
                layoutId="loginTabIndicator"
                className="absolute inset-0 bg-[#fcedf2] rounded-xl border border-[#f0cdd7] shadow-sm"
                transition={{ type: 'spring', stiffness: 450, damping: 35 }}
              />
            )}
            <span className="relative z-10 flex items-center gap-1.5">
              <KeyRound className="w-4 h-4 text-[#b8325a]" />
              <span>Portal ID Login</span>
            </span>
          </button>
        </div>

        {/* Tab Content Canvas with Fluid Switching Animation */}
        <div className="p-5 sm:p-7">
          <AnimatePresence mode="wait">
            {activeTab === 'quick' ? (
              <motion.div
                key="quick-pass"
                initial={{ opacity: 0, x: -14 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 14 }}
                transition={{ duration: 0.22, ease: 'easeOut' }}
                className="space-y-4"
              >
                <div className="flex items-center justify-between pb-1 border-b border-[#f5e3e9]">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-[#b8325a]" />
                    <span className="text-xs font-bold uppercase tracking-wider text-[#3d2731]">
                      Select Your Student Card
                    </span>
                  </div>
                  <span className="text-[11px] text-[#8c6b78] font-medium">
                    1 tap to sign in
                  </span>
                </div>

                {/* Cards Grid */}
                <div className="grid grid-cols-1 gap-3">
                  {DEMO_STUDENTS.map((student) => {
                    const isSelected = selectedStudentId === student.id && isAuthenticating;

                    return (
                      <motion.button
                        key={student.id}
                        type="button"
                        whileHover={{ scale: 1.012, y: -1 }}
                        whileTap={{ scale: 0.988 }}
                        onClick={() => handleQuickLogin(student)}
                        disabled={isAuthenticating}
                        className={`w-full text-left p-4 rounded-xl border transition-all cursor-pointer relative overflow-hidden group shadow-sm ${
                          isSelected
                            ? 'bg-[#fff0f4] border-[#b8325a] ring-2 ring-[#b8325a]/40'
                            : 'bg-[#fffbfc] border-[#ebd4dc] hover:border-[#cf92a5] hover:bg-[#fff9fa]'
                        }`}
                      >
                        <div className="flex items-start gap-3.5">
                          {/* Student Initial Badge */}
                          <div
                            className={`w-11 h-11 rounded-xl ${student.avatarBg} ${student.avatarText} border border-[#ebd0d9] flex items-center justify-center font-bold text-sm shrink-0 shadow-sm transition-transform group-hover:scale-105`}
                          >
                            {student.name
                              .split(' ')
                              .map((n) => n[0])
                              .join('')}
                          </div>

                          {/* Student Info */}
                          <div className="flex-1 min-w-0 pr-2">
                            <div className="flex items-center justify-between gap-2">
                              <h3 className="text-sm font-bold text-[#26141c] group-hover:text-[#8c2444] transition-colors truncate">
                                {student.name}
                              </h3>
                              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-[#fcedf1] text-[#8c2444] border border-[#f0cdd7] shrink-0">
                                {student.collegeShort}
                              </span>
                            </div>

                            <p className="text-xs text-[#5c404d] font-medium mt-0.5 truncate">
                              {student.branch} • {student.year}
                            </p>

                            <div className="flex items-center gap-3 mt-2 text-[11px] text-[#7d5f6d]">
                              <span className="font-mono text-[#8c4b5e] bg-white px-1.5 py-0.5 rounded border border-[#f0d4dd]">
                                {student.rollNumber}
                              </span>
                              <span className="flex items-center gap-1 font-medium">
                                <Home className="w-3.5 h-3.5 text-[#b8325a]" />
                                {student.residence}
                              </span>
                            </div>
                          </div>

                          {/* Action Arrow or Checkmark */}
                          <div className="shrink-0 self-center">
                            {isSelected ? (
                              <div className="w-7 h-7 rounded-full bg-[#8c2444] text-white flex items-center justify-center animate-bounce">
                                <Check className="w-4 h-4" />
                              </div>
                            ) : (
                              <div className="w-7 h-7 rounded-full bg-[#fcedf2] text-[#8c2444] group-hover:bg-[#8c2444] group-hover:text-white flex items-center justify-center transition-colors">
                                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                              </div>
                            )}
                          </div>
                        </div>

                        {/* Top corner subtle banner */}
                        {student.highlight === 'Your Saved Profile' && (
                          <div className="absolute top-0 right-0 bg-[#8c2444] text-white text-[9px] font-bold px-2 py-0.5 rounded-bl-lg tracking-wider uppercase">
                            Active Student
                          </div>
                        )}
                      </motion.button>
                    );
                  })}
                </div>

                <div className="pt-2 flex items-center justify-between text-xs text-[#8c6b78]">
                  <span className="flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-[#2b5936]" />
                    <span>Instant demo authentication without passwords</span>
                  </span>

                  <button
                    type="button"
                    onClick={() => setActiveTab('manual')}
                    className="font-bold text-[#8c2444] hover:underline cursor-pointer"
                  >
                    Use custom roll number →
                  </button>
                </div>
              </motion.div>
            ) : (
              <motion.form
                key="manual-form"
                initial={{ opacity: 0, x: 14 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -14 }}
                transition={{ duration: 0.22, ease: 'easeOut' }}
                onSubmit={handleSubmit}
                className="space-y-4"
              >
                <div className="flex items-center justify-between pb-1 border-b border-[#f5e3e9]">
                  <h2 className="text-xs font-bold uppercase tracking-wider text-[#3d2731]">
                    Enter College Roll Number / Email
                  </h2>
                  <span className="text-[11px] text-[#8c6b78] flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#2b5936]" />
                    Official Portal Sync
                  </span>
                </div>

                {/* Roll Number or Email Input */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-[#3d2731] block">
                    University Roll Number or Campus Email:
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-[#967583] absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      value={identifier}
                      onChange={(e) => setIdentifier(e.target.value)}
                      placeholder="e.g. 01901012026 or aish@igdtuw.ac.in"
                      className="w-full bg-[#fdfafb] border border-[#edd2db] rounded-xl pl-10 pr-4 py-2.5 text-xs sm:text-sm text-[#26141c] placeholder:text-[#997c88] focus:outline-none focus:bg-white focus:ring-2 focus:ring-[#b8325a]/30 focus:border-[#b8325a] transition-all"
                    />
                  </div>
                  <div className="flex items-center gap-2 pt-0.5">
                    <span className="text-[11px] text-[#8c6b78]">Quick fill:</span>
                    <button
                      type="button"
                      onClick={() => setIdentifier('01901012026')}
                      className="text-[11px] font-semibold text-[#8c2444] hover:underline cursor-pointer"
                    >
                      IGDTUW Roll No
                    </button>
                    <span className="text-[#ecd0d8]">•</span>
                    <button
                      type="button"
                      onClick={() => setIdentifier('rahul.s26@dtu.ac.in')}
                      className="text-[11px] font-semibold text-[#8c2444] hover:underline cursor-pointer"
                    >
                      DTU Email
                    </button>
                  </div>
                </div>

                {/* Password Input */}
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-bold text-[#3d2731] block">
                      Portal Password or 4-digit PIN:
                    </label>
                    <span className="text-[11px] text-[#8c6b78]">Default: campus2026</span>
                  </div>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-[#967583] absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter portal password or PIN"
                      className="w-full bg-[#fdfafb] border border-[#edd2db] rounded-xl pl-10 pr-10 py-2.5 text-xs sm:text-sm text-[#26141c] placeholder:text-[#997c88] focus:outline-none focus:bg-white focus:ring-2 focus:ring-[#b8325a]/30 focus:border-[#b8325a] transition-all"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#997987] hover:text-[#26141c] cursor-pointer"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                {/* Remember Me */}
                <div className="flex items-center justify-between text-xs text-[#6e505d] pt-1">
                  <label className="flex items-center gap-2 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      className="rounded border-[#ebd0d9] text-[#8c2444] focus:ring-[#b8325a]"
                    />
                    <span>Remember me on this campus device</span>
                  </label>
                </div>

                {/* Animated Error Display */}
                <AnimatePresence>
                  {errorMessage && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="text-xs text-[#991d3c] bg-[#fdf2f4] p-3 rounded-xl border border-[#f5ccd5] flex items-center gap-2"
                    >
                      <span className="w-2 h-2 rounded-full bg-[#991d3c]" />
                      <span>{errorMessage}</span>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Submit Action */}
                <motion.button
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  type="submit"
                  disabled={isAuthenticating}
                  className="w-full py-3 rounded-xl bg-[#b8325a] hover:bg-[#a12448] text-white text-xs sm:text-sm font-bold shadow-button-press transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  {isAuthenticating ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      <span>Verifying Student Portal...</span>
                    </>
                  ) : (
                    <>
                      <span>Sign In with College Credentials</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </motion.button>
              </motion.form>
            )}
          </AnimatePresence>
        </div>

        {/* Guest Footer Strip */}
        <div className="p-4 bg-[#faf5f7] border-t border-[#f0d8df] text-center">
          <button
            type="button"
            onClick={onContinueAsGuest}
            className="text-xs font-semibold text-[#8c2444] hover:text-[#5e142b] hover:underline cursor-pointer inline-flex items-center gap-1.5"
          >
            <span>Or browse circulars as a Guest without signing in</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </motion.div>
  );
};
