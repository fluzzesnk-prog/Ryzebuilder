
import React, { useState, useRef, useEffect } from 'react';

import {
  Sparkles, History, Send, MessageSquare, Plus, Clock,
  ShieldCheck, LayoutGrid, Target, DollarSign, Menu, X, Home,
  ChevronRight, Layers, Box, Trash2, BrainCircuit, Palette, Radar, FolderOpen,
  Zap, HelpCircle, UserCircle, LogOut, LogIn
} from 'lucide-react';
import { GenerationStatus, AppView, VisualPreset } from '../types';
import { cn } from '../lib/utils';
import { useAuth } from '../contexts/AuthContext';

interface SidebarProps {
  onGenerate: (description: string) => void;
  onReset: () => void;
  status: GenerationStatus;
  history: string[];
  isCooldown?: boolean;
  onClearContext?: () => void;
  hasContext?: boolean;
  currentView: AppView;
  setView: (view: AppView) => void;
  onOpenIdentity: () => void;
  onOpenAuth: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({
  onGenerate, onReset, status, history, isCooldown, onClearContext,
  hasContext, currentView, setView, onOpenIdentity, onOpenAuth
}) => {
  const { user, signOut } = useAuth();
  const [description, setDescription] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [activePreset, setActivePreset] = useState<VisualPreset>('minimalist');
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [history]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (description.trim() && status !== GenerationStatus.GENERATING && !isCooldown) {
      onGenerate(`Style: ${activePreset}. Request: ${description}`);
      setDescription('');
      if (currentView !== 'builder') setView('builder');
      setIsOpen(false);
    }
  };

  const NavItem = ({ view, icon: Icon, label, badge, onClick, variant = 'default' }: { view?: AppView | 'chat', icon: any, label: string, badge?: string, onClick?: () => void, variant?: 'default' | 'danger' }) => {
    const isActive = view && currentView === view;
    return (
      <button
        onClick={onClick ? onClick : () => {
          if (view === 'chat') onReset();
          else if (view) setView(view);
          setIsOpen(false);
        }}
        className={cn(
          "w-full flex items-center justify-between px-4 py-3 rounded-xl transition-all duration-300 group",
          isActive ? "bg-primary text-background shadow-lg shadow-primary/20" :
            variant === 'danger' ? "text-red-400/70 hover:text-red-400 hover:bg-red-400/5" : "text-neutral-400 hover:text-white hover:bg-white/5"
        )}
      >
        <div className="flex items-center gap-3">
          <Icon className={cn("w-4 h-4", isActive ? "text-background" : variant === 'danger' ? "text-red-400/50 group-hover:text-red-400" : "text-primary/70 group-hover:text-primary")} />
          <span className="font-bold text-[10px] uppercase tracking-widest">{label}</span>
        </div>
        {badge && <span className={cn("text-[8px] px-1.5 py-0.5 rounded-md font-black", isActive ? "bg-background/20 text-background" : "bg-primary/10 text-primary")}>{badge}</span>}
      </button>
    );
  };

  return (
    <>
      <div className="lg:hidden fixed bottom-6 right-6 z-[70]">
        <button onClick={() => setIsOpen(!isOpen)} className="w-14 h-14 bg-primary text-background rounded-full flex items-center justify-center shadow-2xl border border-white/10">{isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}</button>
      </div>

      <aside className={cn("fixed lg:relative inset-y-0 left-0 z-50 w-[280px] lg:w-[320px] bg-background border-r border-white/5 flex flex-col h-screen overflow-hidden transition-transform duration-500 lg:translate-x-0", !isOpen ? "-translate-x-full" : "translate-x-0")}>
        <div className="p-6 border-b border-white/5">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <div className="bg-primary p-2 rounded-xl shadow-lg shadow-primary/20 shrink-0"><Sparkles className="text-background w-5 h-5" /></div>
              <div className="flex flex-col"><span className="font-black text-xs text-white">RYZE BUILDER</span><span className="text-[8px] font-bold text-neutral-600 uppercase tracking-widest mt-1">AI Business Suite</span></div>
            </div>
          </div>

          <div className="space-y-1 px-1">
            <p className="text-[8px] font-black text-neutral-600 uppercase tracking-widest px-3 mb-2">Workspace</p>
            <NavItem view="chat" icon={Home} label="Dashboard" />
            <NavItem view="builder" icon={LayoutGrid} label="Editor Visual" badge={hasContext ? "On" : undefined} />
            <NavItem view="projects" icon={FolderOpen} label="Meus Projetos" />

            {user ? (
              <>
                <NavItem onClick={onOpenIdentity} icon={UserCircle} label="Meu Perfil" badge="Pro" />
                <NavItem onClick={signOut} icon={LogOut} label="Sair da Conta" variant="danger" />
              </>
            ) : (
              <NavItem onClick={onOpenAuth} icon={LogIn} label="Entrar / Criar Conta" />
            )}
          </div>

          <div className="space-y-1 pt-6 px-1">
            <p className="text-[8px] font-black text-neutral-600 uppercase tracking-widest px-3 mb-2">Descoberta</p>
            <NavItem view="niches" icon={Target} label="Explorar Nichos" />
            <NavItem view="opportunities" icon={DollarSign} label="Oportunidades" />
          </div>

          <div className="space-y-1 pt-6 px-1">
            <p className="text-[8px] font-black text-neutral-600 uppercase tracking-widest px-3 mb-2">Vendas Ativas</p>
            <NavItem view="outreach" icon={Zap} label="Máquina de Vendas" />
            <NavItem view="prospector" icon={Radar} label="Lead Finder" />
            <NavItem view="intelligence" icon={BrainCircuit} label="Inteligência" />
          </div>
        </div>

        <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 py-4 space-y-4 custom-scrollbar bg-black/10">
          {user && (
            <div className="px-3 py-2 bg-primary/5 rounded-xl border border-primary/10 mb-4">
              <p className="text-[8px] font-black text-primary uppercase tracking-widest mb-1">Usuário Ativo</p>
              <p className="text-[10px] text-white font-medium truncate">{user.email}</p>
            </div>
          )}
          {history.length > 0 && (
            <div className="space-y-3">
              <p className="text-[8px] font-black text-neutral-700 uppercase tracking-widest px-2">Comandos da Sessão</p>
              {history.map((msg, idx) => (
                <div key={idx} className="bg-white/[0.01] border border-white/5 p-3 rounded-xl"><p className="text-[9px] text-neutral-600 leading-tight line-clamp-2">{msg}</p></div>
              ))}
            </div>
          )}
        </div>

        <div className="p-5 bg-background border-t border-white/5">
          <form onSubmit={handleSubmit} className="relative group">
            <textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Refinar projeto..." disabled={isCooldown} className={cn("w-full bg-card border border-white/10 rounded-xl p-3.5 pr-11 text-[11px] text-white outline-none transition-all resize-none h-20 shadow-inner", isCooldown && "opacity-50")} />
            <button type="submit" disabled={status === GenerationStatus.GENERATING || !description.trim() || isCooldown} className={cn("absolute bottom-2.5 right-2.5 p-2 rounded-lg transition-all", description.trim() && status !== GenerationStatus.GENERATING && !isCooldown ? "bg-primary text-background shadow-lg" : "text-neutral-700 bg-white/5")}>
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>
        </div>
      </aside>
      {isOpen && <div onClick={() => setIsOpen(false)} className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden" />}
    </>
  );
};


export default Sidebar;
