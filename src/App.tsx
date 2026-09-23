import { useState, useEffect } from 'react';
import { VoiceCandidate } from './types';
import { getStoredCandidates } from './utils/storage';
import { Header } from './components/Header';
import { AuditionForm } from './components/AuditionForm';
import { SubmissionSuccess } from './components/SubmissionSuccess';
import { AdminJuryDashboard } from './components/AdminJuryDashboard';
import { AdminLogin } from './components/AdminLogin';
import worshipBg from './assets/images/soiree_restaures_bg_1790167495274.jpg';

export default function App() {
  const [currentView, setCurrentView] = useState<'form' | 'jury' | 'success'>('form');
  const [candidates, setCandidates] = useState<VoiceCandidate[]>([]);
  const [lastSubmittedCandidate, setLastSubmittedCandidate] = useState<VoiceCandidate | null>(null);
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState<boolean>(() => {
    return typeof window !== 'undefined' && sessionStorage.getItem('jfat_jury_auth') === 'true';
  });

  // Load candidates into memory ONLY when admin session is verified
  useEffect(() => {
    if (isAdminAuthenticated) {
      const list = getStoredCandidates();
      setCandidates(list);
    } else {
      setCandidates([]);
    }
  }, [isAdminAuthenticated]);

  const refreshCandidates = () => {
    if (isAdminAuthenticated) {
      const list = getStoredCandidates();
      setCandidates([...list]);
    }
  };

  const handleSubmissionSuccess = (candidate: VoiceCandidate) => {
    setLastSubmittedCandidate(candidate);
    setCurrentView('success');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNewSubmission = () => {
    setLastSubmittedCandidate(null);
    setCurrentView('form');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleLogoutJury = () => {
    sessionStorage.removeItem('jfat_jury_auth');
    setIsAdminAuthenticated(false);
    setCandidates([]);
    setCurrentView('form');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="relative min-h-screen bg-slate-200 flex flex-col font-sans text-slate-900 selection:bg-indigo-600 selection:text-white">
      
      {/* Background concert adoration / worship atmosphere */}
      <div 
        className="fixed inset-0 pointer-events-none z-0 bg-cover bg-center bg-no-repeat"
        style={{ 
          backgroundImage: `url(${worshipBg})`,
          filter: 'contrast(1.05) saturate(1.15) brightness(0.92)',
        }}
        aria-hidden="true"
      />

      {/* Atmospheric overlay balancing readability and the spiritual concert ambiance */}
      <div 
        className="fixed inset-0 pointer-events-none z-0 bg-gradient-to-b from-slate-900/40 via-slate-900/25 to-slate-900/50 backdrop-blur-[0.5px]"
        aria-hidden="true"
      />

      {/* Top Application Bar */}
      <Header
        currentView={currentView}
        onViewChange={(view) => {
          setCurrentView(view);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        candidateCount={candidates.length}
        isAdminAuthenticated={isAdminAuthenticated}
      />

      {/* Main View Area */}
      <main className="flex-1 pb-16 pt-4 relative z-10">
        {currentView === 'form' && (
          <AuditionForm onSuccess={handleSubmissionSuccess} />
        )}

        {currentView === 'success' && lastSubmittedCandidate && (
          <SubmissionSuccess
            candidate={lastSubmittedCandidate}
            onNewSubmission={handleNewSubmission}
            onViewJury={() => {
              setCurrentView('jury');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}

        {currentView === 'jury' && (
          isAdminAuthenticated ? (
            <AdminJuryDashboard
              candidates={candidates}
              onRefresh={refreshCandidates}
              onGoToForm={() => {
                setCurrentView('form');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              onLogout={handleLogoutJury}
            />
          ) : (
            <AdminLogin
              onLoginSuccess={() => {
                setIsAdminAuthenticated(true);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              onBackToForm={() => {
                setCurrentView('form');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            />
          )
        )}
      </main>

      {/* Professional Footer */}
      <footer className="border-t border-slate-200/80 bg-white/90 backdrop-blur-md py-7 text-xs text-slate-600 relative z-10">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-bold text-slate-800">JF &amp; Les Adorateur du Tabernacle Casting</span>
            <span>— Plateforme Officielle de Recrutement Vocal</span>
          </div>

          <div className="flex items-center gap-5 text-slate-500 text-xs">
            <span>Données protégées</span>
            <span>•</span>
            <span>Fluxio Agency</span>
            <span>•</span>
            <span>Édition 2026 - 2027</span>
          </div>
        </div>
      </footer>

    </div>
  );
}
