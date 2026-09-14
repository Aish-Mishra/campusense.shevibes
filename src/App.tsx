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
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans selection:bg-pink-200">
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

      {/* Main Spacious Content Canvas */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 py-6 sm:py-8">
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

      {/* Spacious, uncrowded footer */}
      <footer className="border-t border-pink-200 bg-pink-50/50 py-6 mt-12 text-center text-xs text-slate-500">
        <div className="max-w-6xl mx-auto px-4 space-y-1">
          <p className="font-semibold text-slate-700">
            CampuSense • College Announcement Copilot
          </p>
          <p>
            Demystifying university notices, document checklists, and campus jargon for freshers.
          </p>
        </div>
      </footer>
    </div>
  );
}
