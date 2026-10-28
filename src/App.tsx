import React, { useState, useEffect, useCallback } from 'react';
import { Header } from './components/Header';
import { WelcomeHero } from './components/WelcomeHero';
import { QuizView } from './components/QuizView';
import { ResultView } from './components/ResultView';
import { AdminLoginModal } from './components/AdminLoginModal';
import { AdminDashboard } from './components/AdminDashboard';
import {
  checkAdminAuth,
  logoutAdmin,
  getSubmissions,
  saveSubmission,
  fetchSubmissionsFromServer,
} from './utils/storage';
import { calculateScores, GradingResult } from './utils/grading';
import { StudentSubmission } from './types/quiz';

export default function App() {
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [showAdminLogin, setShowAdminLogin] = useState<boolean>(false);
  const [showAdminDashboard, setShowAdminDashboard] = useState<boolean>(false);
  const [submissions, setSubmissions] = useState<StudentSubmission[]>([]);

  // Navigation flow
  const [currentView, setCurrentView] = useState<'home' | 'quiz' | 'result'>('home');

  // Active quiz session info
  const [candidateInfo, setCandidateInfo] = useState<{
    studentName: string;
    className: string;
    mode: 'test' | 'practice';
    scope: 'all' | 'part1' | 'part2' | 'part3';
  } | null>(null);

  const [currentSubmission, setCurrentSubmission] = useState<StudentSubmission | null>(null);
  const [currentGrading, setCurrentGrading] = useState<GradingResult | null>(null);

  const handleRefreshSubmissions = useCallback(async () => {
    try {
      const updated = await fetchSubmissionsFromServer();
      if (Array.isArray(updated)) {
        setSubmissions(updated);
      }
    } catch (err) {
      console.warn('Failed to refresh submissions:', err);
    }
  }, []);

  // Initialize
  useEffect(() => {
    setIsAdmin(checkAdminAuth());
    setSubmissions(getSubmissions());
    handleRefreshSubmissions();

    // Listen to real-time BroadcastChannel updates across tabs
    let channel: BroadcastChannel | null = null;
    try {
      if (typeof window !== 'undefined' && 'BroadcastChannel' in window) {
        channel = new BroadcastChannel('tin11_submissions_sync');
        channel.onmessage = () => {
          handleRefreshSubmissions();
        };
      }
    } catch {
      // ignore
    }

    // Also listen to storage events
    const handleStorage = (e: StorageEvent) => {
      if (e.key === 'tin11_exam_submissions_v1') {
        handleRefreshSubmissions();
      }
    };
    window.addEventListener('storage', handleStorage);

    return () => {
      if (channel) channel.close();
      window.removeEventListener('storage', handleStorage);
    };
  }, [handleRefreshSubmissions]);

  const handleAdminLoginSuccess = async () => {
    setIsAdmin(true);
    setShowAdminDashboard(true);
    await handleRefreshSubmissions();
  };

  const handleOpenAdminDashboard = async () => {
    setShowAdminDashboard(true);
    await handleRefreshSubmissions();
  };

  const handleLogout = () => {
    logoutAdmin();
    setIsAdmin(false);
    setShowAdminDashboard(false);
  };

  // Start exam
  const handleStartQuiz = (info: {
    studentName: string;
    className: string;
    mode: 'test' | 'practice';
    scope: 'all' | 'part1' | 'part2' | 'part3';
  }) => {
    setCandidateInfo(info);
    setCurrentView('quiz');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Submit exam
  const handleSubmitQuiz = async (data: {
    part1: Record<number, 'A' | 'B' | 'C' | 'D'>;
    part2: Record<number, Record<'a' | 'b' | 'c' | 'd', boolean | null>>;
    part3: Record<number, Record<'a' | 'b' | 'c' | 'd', string>>;
    timeSpentSeconds: number;
  }) => {
    if (!candidateInfo) return;

    // Self-score initialization for Part 3
    const initialSelfScores: Record<number, Record<'a' | 'b' | 'c' | 'd', number>> = {};
    for (let i = 1; i <= 6; i++) {
      initialSelfScores[i] = {
        a: data.part3[i]?.a?.trim() ? 0.25 : 0,
        b: data.part3[i]?.b?.trim() ? 0.25 : 0,
        c: data.part3[i]?.c?.trim() ? 0.25 : 0,
        d: data.part3[i]?.d?.trim() ? 0.25 : 0,
      };
    }

    const grading = calculateScores(
      candidateInfo.scope,
      data.part1,
      data.part2,
      initialSelfScores
    );

    const submission: StudentSubmission = {
      id: `sub_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
      studentName: candidateInfo.studentName,
      className: candidateInfo.className,
      mode: candidateInfo.mode,
      scope: candidateInfo.scope,
      startedAt: new Date(Date.now() - data.timeSpentSeconds * 1000).toISOString(),
      submittedAt: new Date().toISOString(),
      timeSpentSeconds: data.timeSpentSeconds,
      part1Answers: data.part1,
      part2Answers: data.part2,
      part3Answers: data.part3,
      part3SelfScores: initialSelfScores,
      part1Score: grading.part1Score,
      part2Score: grading.part2Score,
      part3Score: grading.part3Score,
      totalScore: grading.totalScore,
      maxScore: grading.maxScore,
      percentage: grading.percentage,
      rating: grading.rating,
      feedback: grading.feedback,
    };

    await saveSubmission(submission);
    await handleRefreshSubmissions();

    setCurrentSubmission(submission);
    setCurrentGrading(grading);
    setCurrentView('result');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleRetry = () => {
    if (candidateInfo) {
      setCurrentView('quiz');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      setCurrentView('home');
    }
  };

  const handleGoHome = () => {
    setCurrentView('home');
    setCandidateInfo(null);
    setCurrentSubmission(null);
    setCurrentGrading(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-800 flex flex-col font-sans selection:bg-[#80C8F8]/40 selection:text-[#003865]">
      {/* Top Navigation */}
      <Header
        isAdmin={isAdmin}
        onOpenAdminLogin={() => setShowAdminLogin(true)}
        onOpenAdminDashboard={handleOpenAdminDashboard}
        onLogoutAdmin={handleLogout}
        onGoHome={handleGoHome}
        isHome={currentView === 'home'}
      />

      {/* Main View Flow */}
      <main className="flex-1">
        {currentView === 'home' && <WelcomeHero onStartQuiz={handleStartQuiz} />}

        {currentView === 'quiz' && candidateInfo && (
          <QuizView
            studentName={candidateInfo.studentName}
            className={candidateInfo.className}
            mode={candidateInfo.mode}
            scope={candidateInfo.scope}
            onSubmit={handleSubmitQuiz}
            onExit={handleGoHome}
          />
        )}

        {currentView === 'result' && currentSubmission && currentGrading && (
          <ResultView
            submission={currentSubmission}
            grading={currentGrading}
            onRetry={handleRetry}
            onGoHome={handleGoHome}
          />
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-white py-6 px-4 text-center text-xs text-slate-500 shadow-xs">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <div>
            <p className="font-bold text-slate-700">
              Hệ thống ôn luyện KTGK1 Môn Tin học 11 • Năm học 2026 - 2027
            </p>
            <p className="text-[11px] text-slate-500 mt-0.5 font-medium">
              Phạm vi kiến thức từ Bài 1 đến Bài 8 (Bộ sách Giáo dục phổ thông 2018)
            </p>
          </div>
          <div className="flex items-center gap-2 text-[11px]">
            <span>Trạng thái: <strong className="text-emerald-600 font-bold">Sẵn sàng ôn thi</strong></span>
          </div>
        </div>
      </footer>

      {/* Admin Login Modal */}
      <AdminLoginModal
        isOpen={showAdminLogin}
        onClose={() => setShowAdminLogin(false)}
        onSuccess={handleAdminLoginSuccess}
      />

      {/* Admin Control Dashboard */}
      {showAdminDashboard && isAdmin && (
        <AdminDashboard
          submissions={submissions}
          onRefresh={handleRefreshSubmissions}
          onClose={() => setShowAdminDashboard(false)}
          onLogout={handleLogout}
        />
      )}
    </div>
  );
}
