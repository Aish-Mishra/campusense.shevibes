import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Navigation, AppPage } from './components/Navigation';
import { SimplifyView } from './components/SimplifyView';
import { NoticeDetailsView } from './components/NoticeDetailsView';
import { NoticeBoardView } from './components/NoticeBoardView';
import { GlossaryView } from './components/GlossaryView';
import { ProfileView } from './components/ProfileView';
import { LoginView } from './components/LoginView';
import { ClarifiedNotice, FresherProfile, NoticeCategory, SourceType } from './types';
import { INITIAL_SAMPLE_NOTICES } from './data/sampleNotices';
import { parseCampusNoticeLocal } from '../localNoticeParser';

const DEFAULT_PROFILE: FresherProfile = {
  name: 'Fresher Student',
  year: '1st Year',
  branch: 'Computer Science (CSE)',
  residence: 'Hosteler',
  category: 'General',
  collegeName: 'Campus University',
};

export default function App() {
  const [currentPage, setCurrentPage] = useState<AppPage>('board');

  const [notices, setNotices] = useState<ClarifiedNotice[]>(() => {
    try {
      const saved = localStorage.getItem('campussense_notices');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    return INITIAL_SAMPLE_NOTICES;
  });

  const [profile, setProfile] = useState<FresherProfile>(() => {
    try {
      const saved = localStorage.getItem('campussense_profile');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    return DEFAULT_PROFILE;
  });

  const [isSimpleMode, setIsSimpleMode] = useState<boolean>(() => {
    try {
      const saved = localStorage.getItem('campussense_simple_mode');
      if (saved !== null) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    return true; // Default to Simple Mode to prevent data overload
  });

  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(() => {
    try {
      const saved = localStorage.getItem('campussense_is_logged_in');
      if (saved !== null) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    return true;
  });

  const [pinnedNoticeIds, setPinnedNoticeIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('campussense_pinned_ids');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          return parsed.filter((id) =>
            INITIAL_SAMPLE_NOTICES.some((n) => n.id === id)
          );
        }
      }
    } catch (e) {
      console.error(e);
    }
    return ['notice-doc-verification'];
  });

  // Keep pinnedNoticeIds strictly in sync with valid existing notices
  useEffect(() => {
    const validIds = pinnedNoticeIds.filter((id) =>
      notices.some((n) => n.id === id)
    );
    if (validIds.length !== pinnedNoticeIds.length) {
      setPinnedNoticeIds(validIds);
      try {
        localStorage.setItem('campussense_pinned_ids', JSON.stringify(validIds));
      } catch (e) {
        console.error(e);
      }
    }
  }, [notices, pinnedNoticeIds]);

  const handleTogglePin = (noticeId: string) => {
    setPinnedNoticeIds((prev) => {
      const updated = prev.includes(noticeId)
        ? prev.filter((id) => id !== noticeId)
        : [...prev, noticeId];
      try {
        localStorage.setItem('campussense_pinned_ids', JSON.stringify(updated));
      } catch (e) {
        console.error(e);
      }
      return updated;
    });
  };

  const [activeNotice, setActiveNotice] = useState<ClarifiedNotice>(
    () => notices[0] || INITIAL_SAMPLE_NOTICES[0]
  );
  const [inputText, setInputText] = useState('');
  const [sourceType, setSourceType] = useState<SourceType>('circular');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    try {
      localStorage.setItem('campussense_notices', JSON.stringify(notices));
    } catch (e) {
      console.error(e);
    }
  }, [notices]);

  useEffect(() => {
    try {
      localStorage.setItem('campussense_profile', JSON.stringify(profile));
    } catch (e) {
      console.error(e);
    }
  }, [profile]);

  useEffect(() => {
    try {
      localStorage.setItem('campussense_simple_mode', JSON.stringify(isSimpleMode));
    } catch (e) {
      console.error(e);
    }
  }, [isSimpleMode]);

  useEffect(() => {
    try {
      localStorage.setItem('campussense_is_logged_in', JSON.stringify(isLoggedIn));
    } catch (e) {
      console.error(e);
    }
  }, [isLoggedIn]);

  const handleLogin = (newProfile: FresherProfile) => {
    setProfile(newProfile);
    setIsLoggedIn(true);
    setCurrentPage('board');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentPage('login');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleToggleStep = (noticeId: string, stepOrder: number) => {
    setNotices((prevNotices) =>
      prevNotices.map((n) => {
        if (n.id !== noticeId) return n;
        const currentCompleted = n.userCompletedSteps || [];
        const nextCompleted = currentCompleted.includes(stepOrder)
          ? currentCompleted.filter((s) => s !== stepOrder)
          : [...currentCompleted, stepOrder];

        const updatedNotice = { ...n, userCompletedSteps: nextCompleted };
        if (activeNotice && activeNotice.id === noticeId) {
          setActiveNotice(updatedNotice);
        }
        return updatedNotice;
      })
    );
  };

  const handleClarifyNotice = async () => {
    if (!inputText.trim()) {
      setErrorMsg('Please paste announcement text or select a demo sample.');
      return;
    }

    setIsLoading(true);
    setErrorMsg(null);

    try {
      let data: any = null;

      try {
        const res = await fetch('/api/clarify-notice', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            rawText: inputText,
            sourceType,
            studentContext: profile,
          }),
        });

        if (res.ok) {
          data = await res.json();
        }
      } catch (networkErr) {
        console.warn('Backend API unavailable, using local campus decoder:', networkErr);
      }

      // If backend was not reached or returned an issue, run smart local campus parser
      if (!data || !data.title) {
        data = parseCampusNoticeLocal(inputText, sourceType, profile);
      }

      let category: NoticeCategory = 'academic';
      const textLower = (data.title + ' ' + inputText).toLowerCase();
      if (textLower.includes('hostel') || textLower.includes('mess') || textLower.includes('warden')) {
        category = 'hostel';
      } else if (textLower.includes('exam') || textLower.includes('sessional') || textLower.includes('attendance')) {
        category = 'exams';
      } else if (textLower.includes('library') || textLower.includes('book')) {
        category = 'library';
      }

      const newNotice: ClarifiedNotice = {
        id: `notice-${Date.now()}`,
        title: data.title || 'Clarified Campus Notice',
        department: data.department || 'University Administration',
        category,
        sourceType,
        datePosted: 'Just now',
        urgency: data.urgency || 'IMPORTANT',
        deadline: data.deadline || null,
        isDeadlineStrict: Boolean(data.isDeadlineStrict),
        tldr: data.tldr || 'Here is the simplified summary of this announcement.',
        whoNeedsToAct: data.whoNeedsToAct || {
          appliesTo: '1st Year Students',
          exempt: 'Other batches',
          matchVerdict: 'MUST_ACT',
        },
        actionSteps: data.actionSteps || [],
        jargonDecoded: data.jargonDecoded || [],
        consequencesIfMissed: data.consequencesIfMissed || 'Contact department desk for details.',
        contactOrOffice: data.contactOrOffice || 'Administration Counter',
        whatsappSummary: data.whatsappSummary || data.tldr || '',
        rawContent: inputText,
        tags: ['Decoded Circular'],
        userCompletedSteps: [],
      };

      setNotices((prev) => [newNotice, ...prev]);
      setActiveNotice(newNotice);
      // Seamlessly navigate to the clean Notice Details view!
      setCurrentPage('details');
    } catch (err: any) {
      console.error('Clarification error:', err);
      // Fallback one last time to ensure user is never blocked
      try {
        const fallbackData = parseCampusNoticeLocal(inputText, sourceType, profile);
        const fallbackNotice: ClarifiedNotice = {
          id: `notice-${Date.now()}`,
          title: fallbackData.title || 'Clarified Campus Notice',
          department: fallbackData.department || 'University Administration',
          category: 'academic',
          sourceType,
          datePosted: 'Just now',
          urgency: fallbackData.urgency || 'IMPORTANT',
          deadline: fallbackData.deadline || null,
          isDeadlineStrict: Boolean(fallbackData.isDeadlineStrict),
          tldr: fallbackData.tldr || 'Here is the simplified summary.',
          whoNeedsToAct: fallbackData.whoNeedsToAct || {
            appliesTo: '1st Year Students',
            exempt: 'Other batches',
            matchVerdict: 'MUST_ACT',
          },
          actionSteps: fallbackData.actionSteps || [],
          jargonDecoded: fallbackData.jargonDecoded || [],
          consequencesIfMissed: fallbackData.consequencesIfMissed || 'Contact department desk.',
          contactOrOffice: fallbackData.contactOrOffice || 'Administration Counter',
          whatsappSummary: fallbackData.whatsappSummary || fallbackData.tldr || '',
          rawContent: inputText,
          tags: ['Decoded Circular'],
          userCompletedSteps: [],
        };
        setNotices((prev) => [fallbackNotice, ...prev]);
        setActiveNotice(fallbackNotice);
        setCurrentPage('details');
      } catch (finalErr) {
        setErrorMsg('Please enter a valid notice text.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleSelectNotice = (notice: ClarifiedNotice) => {
    setActiveNotice(notice);
    setCurrentPage('details');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSaveProfile = (newProfile: FresherProfile) => {
    setProfile(newProfile);
  };

  return (
    <div className="min-h-screen bg-[#faf6f7] text-[#26141c] flex flex-col selection:bg-[#fcedf1] selection:text-[#8c2444]">
      {/* Top Navigation */}
      <Navigation
        currentPage={currentPage}
        onNavigate={(page) => {
          setCurrentPage(page);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        profile={profile}
        hasActiveNotice={Boolean(activeNotice)}
        totalNoticesCount={notices.length}
        isSimpleMode={isSimpleMode}
        onToggleSimpleMode={() => setIsSimpleMode((prev) => !prev)}
        isLoggedIn={isLoggedIn}
        onLogout={handleLogout}
      />

      {/* Main Content Canvas */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-8 py-6 sm:py-9">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentPage}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.22, ease: 'easeOut' }}
          >
            {currentPage === 'login' && (
              <LoginView
                onLogin={handleLogin}
                onContinueAsGuest={() => {
                  setIsLoggedIn(false);
                  setCurrentPage('board');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                currentProfile={profile}
              />
            )}

            {currentPage === 'simplify' && (
              <SimplifyView
                inputText={inputText}
                setInputText={setInputText}
                onClarify={handleClarifyNotice}
                isLoading={isLoading}
                errorMsg={errorMsg}
                profile={profile}
                sourceType={sourceType}
                setSourceType={setSourceType}
              />
            )}

            {currentPage === 'details' && (
              <NoticeDetailsView
                notice={activeNotice || notices[0]}
                profile={profile}
                onToggleStep={handleToggleStep}
                onBackToBoard={() => setCurrentPage('board')}
                onNewNotice={() => setCurrentPage('simplify')}
                isSimpleMode={isSimpleMode}
                onToggleSimpleMode={() => setIsSimpleMode((prev) => !prev)}
                isPinned={pinnedNoticeIds.includes((activeNotice || notices[0]).id)}
                onTogglePin={() => handleTogglePin((activeNotice || notices[0]).id)}
              />
            )}

            {currentPage === 'board' && (
              <NoticeBoardView
                notices={notices}
                onSelectNotice={handleSelectNotice}
                onNewNotice={() => setCurrentPage('simplify')}
                isSimpleMode={isSimpleMode}
                onToggleSimpleMode={() => setIsSimpleMode((prev) => !prev)}
                pinnedNoticeIds={pinnedNoticeIds}
                onTogglePin={handleTogglePin}
              />
            )}

            {currentPage === 'glossary' && <GlossaryView />}

            {currentPage === 'profile' && (
              <ProfileView
                profile={profile}
                onSaveProfile={handleSaveProfile}
                onSwitchAccount={() => {
                  setCurrentPage('login');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                onLogout={handleLogout}
                isLoggedIn={isLoggedIn}
              />
            )}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Editorial Campus Footer */}
      <footer className="border-t border-[#ebd2db] bg-[#fffbfc] py-8 text-xs text-[#735360]">
        <div className="max-w-6xl mx-auto px-4 sm:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="space-y-1 text-center sm:text-left">
            <div className="flex items-center justify-center sm:justify-start gap-2">
              <span className="font-serif-heading font-bold text-sm text-[#26141c]">
                CampuSense
              </span>
              <span className="text-[#ebd0d8]">•</span>
              <span className="text-[11px] text-[#8c3b53] font-medium">
                College Notices in Plain English
              </span>
            </div>
            <p className="text-[11px] text-[#8c6b78] max-w-lg">
              Demystifying confusing university circulars, room locations, and document checklists for freshers.
            </p>
          </div>

          <div className="flex items-center gap-4 text-[11px] font-semibold text-[#8c2444]">
            <button
              type="button"
              onClick={() => {
                setCurrentPage('board');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="hover:underline cursor-pointer"
            >
              Notices
            </button>
            <span className="text-[#ecd6dd]">•</span>
            <button
              type="button"
              onClick={() => {
                setCurrentPage('simplify');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="hover:underline cursor-pointer"
            >
              Explain a Notice
            </button>
            <span className="text-[#ecd6dd]">•</span>
            <button
              type="button"
              onClick={() => {
                setCurrentPage('glossary');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="hover:underline cursor-pointer"
            >
              Campus Words
            </button>
            <span className="text-[#ecd6dd]">•</span>
            <button
              type="button"
              onClick={() => {
                setCurrentPage('profile');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="hover:underline cursor-pointer"
            >
              My Profile
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}
