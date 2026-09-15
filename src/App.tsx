import React, { useState, useEffect } from 'react';
import { Navigation, AppPage } from './components/Navigation';
import { SimplifyView } from './components/SimplifyView';
import { NoticeDetailsView } from './components/NoticeDetailsView';
import { NoticeBoardView } from './components/NoticeBoardView';
import { GlossaryView } from './components/GlossaryView';
import { ProfileView } from './components/ProfileView';
import { ClarifiedNotice, FresherProfile, NoticeCategory, SourceType } from './types';
import { INITIAL_SAMPLE_NOTICES } from './data/sampleNotices';

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
      const res = await fetch('/api/clarify-notice', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          rawText: inputText,
          sourceType,
          studentContext: profile,
        }),
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.error || 'Failed to clarify notice.');
      }

      const data = await res.json();

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
      setErrorMsg(err.message || 'Error clarifying announcement. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleAskNoticeQuestion = async (question: string): Promise<string> => {
    const res = await fetch('/api/ask-notice', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        question,
        noticeText: activeNotice?.rawContent || '',
        noticeSummary: activeNotice,
        studentContext: profile,
      }),
    });

    if (!res.ok) {
      throw new Error('Failed to ask question');
    }
    const data = await res.json();
    return data.answer || 'Please contact your Class Representative or Academic Office.';
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
        activeNoticeTitle={activeNotice?.title}
        totalNoticesCount={notices.length}
      />

      {/* Main Content Canvas */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-8 py-6 sm:py-9">
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
            onAskQuestion={handleAskNoticeQuestion}
          />
        )}

        {currentPage === 'board' && (
          <NoticeBoardView
            notices={notices}
            onSelectNotice={handleSelectNotice}
            onNewNotice={() => setCurrentPage('simplify')}
          />
        )}

        {currentPage === 'glossary' && <GlossaryView />}

        {currentPage === 'profile' && (
          <ProfileView profile={profile} onSaveProfile={handleSaveProfile} />
        )}
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
              <span className="font-mono text-[10px] text-[#8c3b53] uppercase tracking-wider">
                Fresher Bulletin & Circular Dossier
              </span>
            </div>
            <p className="text-[11px] text-[#8c6b78] max-w-lg">
              Independent student-to-student notice decoder. Always verify physical certificate requirements at your college admin block window before deadline cutoffs.
            </p>
          </div>

          <div className="flex items-center gap-4 text-[11px] font-medium text-[#8c2444]">
            <button
              type="button"
              onClick={() => {
                setCurrentPage('board');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="hover:underline cursor-pointer"
            >
              Notice Board
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
              Lexicon
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
              Student Card
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}
