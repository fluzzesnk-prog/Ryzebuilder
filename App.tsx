
import React, { useState, useCallback, useEffect } from 'react';
import { Sparkles } from 'lucide-react';
import Sidebar from './components/Sidebar';
import PreviewArea from './components/PreviewArea';
import VoxenMoonChat from './components/ui/voxen-moon-chat';
import PublishModal from './components/PublishModal';
import NicheExplorer from './components/NicheExplorer';
import OpportunityMarket from './components/OpportunityMarket';
import IntelligenceCenter from './components/IntelligenceCenter';
import LeadProspector from './components/LeadProspector';
import ProjectManager from './components/ProjectManager';
import OutreachGenerator from './components/OutreachGenerator';
import TutorialOverlay from './components/TutorialOverlay';
import IdentityModal from './components/IdentityModal';
import { generateWebsite } from './services/geminiService';
import { GenerationStatus, AppView, SavedProject, UserIdentity } from './types';
import { cn } from './lib/utils';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import AuthModal from './components/AuthModal';

const STORAGE_KEY = 'ryze_saved_projects';
const IDENTITY_KEY = 'ryze_user_identity';
const TUTORIAL_KEY = 'ryze_tutorial_completed';



const AppContent: React.FC = () => {
  const { user, loading, signOut } = useAuth();
  const [status, setStatus] = useState<GenerationStatus>(GenerationStatus.IDLE);
  const [generatedHtml, setGeneratedHtml] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [history, setHistory] = useState<string[]>([]);
  const [lastDescription, setLastDescription] = useState<string>('');
  const [cooldown, setCooldown] = useState(false);
  const [savedProjects, setSavedProjects] = useState<SavedProject[]>([]);

  const [currentView, setCurrentView] = useState<AppView>('chat');
  const [isPublishModalOpen, setIsPublishModalOpen] = useState(false);
  const [isIdentityModalOpen, setIsIdentityModalOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [showTutorial, setShowTutorial] = useState(false);

  const [identity, setIdentity] = useState<UserIdentity>(() => {
    const stored = localStorage.getItem(IDENTITY_KEY);
    return stored ? JSON.parse(stored) : { name: '', specialty: 'Especialista Digital', experience: '5+ anos', apiKey: '' };
  });

  useEffect(() => {
    const isTutorialCompleted = localStorage.getItem(TUTORIAL_KEY);
    if (!isTutorialCompleted) setShowTutorial(true);

    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try { setSavedProjects(JSON.parse(stored)); } catch (e) { console.error(e); }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(savedProjects));
  }, [savedProjects]);

  useEffect(() => {
    localStorage.setItem(IDENTITY_KEY, JSON.stringify(identity));
  }, [identity]);

  const handleGenerate = useCallback(async (description: string) => {
    if (cooldown && !identity.apiKey) return;

    setStatus(GenerationStatus.GENERATING);
    setError('');
    setLastDescription(description);
    if (!identity.apiKey) setCooldown(true);
    setCurrentView('builder');

    try {
      const html = await generateWebsite(description, generatedHtml || undefined, identity.apiKey);
      setGeneratedHtml(html);
      setHistory(prev => [...prev, description]);
      setStatus(GenerationStatus.SUCCESS);
    } catch (err: any) {
      setError(err.message || 'Ocorreu um erro.');
      setStatus(GenerationStatus.ERROR);
    } finally {
      if (!identity.apiKey) setTimeout(() => setCooldown(false), 8000);
    }
  }, [generatedHtml, cooldown, identity.apiKey]);

  const handleSaveProject = () => {
    if (!generatedHtml) return;
    const projectName = lastDescription.slice(0, 30) + (lastDescription.length > 30 ? '...' : '');
    const newProject: SavedProject = {
      id: crypto.randomUUID(),
      name: projectName,
      html: generatedHtml,
      description: lastDescription,
      history: history,
      timestamp: Date.now(),
    };
    setSavedProjects(prev => [newProject, ...prev]);
  };

  const handleLoadProject = (project: SavedProject) => {
    setGeneratedHtml(project.html);
    setHistory(project.history);
    setLastDescription(project.description);
    setStatus(GenerationStatus.SUCCESS);
    setCurrentView('builder');
  };

  const handleReset = () => {
    setCurrentView('chat');
    setStatus(GenerationStatus.IDLE);
    setGeneratedHtml('');
    setHistory([]);
    setLastDescription('');
    setCooldown(false);
  };

  const renderMainContent = () => {
    switch (currentView) {
      case 'niches': return <NicheExplorer onSelectNiche={handleGenerate} />;
      case 'opportunities': return <OpportunityMarket onSelect={handleGenerate} />;
      case 'intelligence': return <IntelligenceCenter currentProjectDesc={lastDescription} identity={identity} />;
      case 'prospector': return <LeadProspector onSelectLead={handleGenerate} customApiKey={identity.apiKey} />;
      case 'outreach': return <OutreachGenerator currentProjectDesc={lastDescription} identity={identity} />;
      case 'projects': return <ProjectManager projects={savedProjects} onLoadProject={handleLoadProject} onDeleteProject={(id) => setSavedProjects(p => p.filter(x => x.id !== id))} onNewProject={handleReset} />;
      case 'builder':
      default: return <PreviewArea html={generatedHtml} status={status} errorMessage={error} onPublish={() => setIsPublishModalOpen(true)} onSave={handleSaveProject} onRetry={() => handleGenerate(lastDescription)} />;
    }
  };

  if (loading) {
    return (
      <div className="h-screen w-full flex items-center justify-center bg-[#030303]">
        <div className="flex flex-col items-center gap-6">
          <div className="relative">
            <div className="w-16 h-16 border-t-2 border-primary rounded-full animate-spin shadow-[0_0_15px_rgba(0,255,150,0.3)]" />
            <Sparkles className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-6 h-6 text-primary animate-pulse" />
          </div>
          <p className="text-[10px] font-black text-white/40 uppercase tracking-[0.3em] animate-pulse">Sincronizando Ryze Hub...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return <AuthModal isFullPage />;
  }

  if (currentView === 'chat') {
    return (
      <>
        {showTutorial && <TutorialOverlay onClose={() => setShowTutorial(false)} />}
        {isAuthModalOpen && <AuthModal onClose={() => setIsAuthModalOpen(false)} />}
        <VoxenMoonChat onGenerate={handleGenerate} isGenerating={status === GenerationStatus.GENERATING || (cooldown && !identity.apiKey)} onNavigate={setCurrentView} />
      </>
    );
  }

  return (
    <div className="flex h-screen w-full bg-background overflow-hidden relative selection:bg-primary/30">
      {showTutorial && <TutorialOverlay onClose={() => setShowTutorial(false)} />}
      {isPublishModalOpen && <PublishModal html={generatedHtml} onClose={() => setIsPublishModalOpen(false)} />}
      {isIdentityModalOpen && <IdentityModal identity={identity} onSave={setIdentity} onClose={() => setIsIdentityModalOpen(false)} />}
      {isAuthModalOpen && <AuthModal onClose={() => setIsAuthModalOpen(false)} />}

      <Sidebar
        onGenerate={handleGenerate} onReset={handleReset} status={status} history={history} isCooldown={cooldown && !identity.apiKey}
        onClearContext={() => { setGeneratedHtml(''); setHistory([]); setStatus(GenerationStatus.IDLE); }}
        hasContext={!!generatedHtml} currentView={currentView} setView={setCurrentView}
        onOpenIdentity={() => setIsIdentityModalOpen(true)}
        onOpenAuth={() => setIsAuthModalOpen(true)}
      />

      <main className="flex-1 flex flex-col relative min-w-0 bg-black/40 backdrop-blur-sm">
        {renderMainContent()}
      </main>
    </div>
  );
};


const App: React.FC = () => {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
};

export default App;
