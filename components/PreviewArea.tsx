
import React, { useMemo, useState, useEffect } from 'react';
import { Monitor, Smartphone, Tablet, ExternalLink, RefreshCw, XCircle, Globe, Rocket, RotateCcw, AlertTriangle, Save, Check, Cpu } from 'lucide-react';
import { GenerationStatus } from '../types';
import { cn } from '../lib/utils';

interface PreviewAreaProps {
  html: string;
  status: GenerationStatus;
  errorMessage?: string;
  onPublish: () => void;
  onSave: () => void;
  onRetry?: () => void;
}

type DeviceType = 'desktop' | 'tablet' | 'mobile';

const PreviewArea: React.FC<PreviewAreaProps> = ({ html, status, errorMessage, onPublish, onSave, onRetry }) => {
  const [device, setDevice] = useState<DeviceType>('desktop');
  const [isSaved, setIsSaved] = useState(false);
  const [loadingStep, setLoadingStep] = useState(0);

  const loadingMessages = [
    "Sintetizando layout neural...",
    "Otimizando grid responsiva...",
    "Aplicando estilos premium...",
    "Injetando inteligência de conversão...",
    "Finalizando interface de elite..."
  ];

  useEffect(() => {
    let interval: any;
    if (status === GenerationStatus.GENERATING) {
      interval = setInterval(() => {
        setLoadingStep(prev => (prev + 1) % loadingMessages.length);
      }, 2000);
    } else {
      setLoadingStep(0);
    }
    return () => clearInterval(interval);
  }, [status]);

  const safeHtml = useMemo(() => {
    if (!html) return '';

    const navigationShield = `
    <style>
      a { cursor: pointer !important; }
      ::-webkit-scrollbar { width: 0px; background: transparent; }
    </style>
    <script>
      document.addEventListener('click', function(e) {
        const link = e.target.closest('a');
        if (link) {
          e.preventDefault();
          e.stopPropagation();
          const href = link.getAttribute('href');
          if (href && href.startsWith('#')) {
            const targetId = href.substring(1);
            const targetEl = document.getElementById(targetId) || document.getElementsByName(targetId)[0];
            if (targetEl) targetEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        }
      }, true);
      document.addEventListener('submit', function(e) { e.preventDefault(); e.stopPropagation(); }, true);
      window.onbeforeunload = function() { return false; };
    </script>`;

    let processedHtml = html.replace(/<base[^>]*>/gi, '');
    if (processedHtml.includes('</body>')) {
      return processedHtml.replace('</body>', `${navigationShield}</body>`);
    } else {
      return processedHtml + navigationShield;
    }
  }, [html]);

  const handleSave = () => {
    onSave();
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  const getDeviceWidth = () => {
    switch (device) {
      case 'mobile': return 'max-w-[375px]';
      case 'tablet': return 'max-w-[768px]';
      default: return 'max-w-full';
    }
  };

  if (status === GenerationStatus.IDLE) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center bg-background p-8 text-center">
        <div className="w-20 h-20 bg-card rounded-2xl flex items-center justify-center mb-6 text-primary border border-white/5 shadow-xl">
          <Globe className="w-10 h-10" />
        </div>
        <h2 className="text-xl font-bold text-white mb-2">Aguardando Geração</h2>
        <p className="text-neutral-500 max-w-xs text-sm">Descreva sua visão para começar a construir seu site.</p>
      </div>
    );
  }

  if (status === GenerationStatus.ERROR) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center bg-background p-8 text-center animate-in fade-in zoom-in duration-300">
        <div className="w-16 h-16 rounded-full flex items-center justify-center mb-6 border bg-destructive/10 border-destructive/20">
          <XCircle className="w-8 h-8 text-destructive" />
        </div>
        <h2 className="text-xl font-bold text-white mb-2 tracking-tight">Falha na Geração</h2>
        <p className="text-neutral-400 text-sm max-w-md mb-8 leading-relaxed">{errorMessage}</p>
        <button onClick={onRetry} className="flex items-center gap-2 px-6 py-3 bg-primary text-background rounded-xl transition-all font-bold text-xs uppercase tracking-widest hover:scale-105">
          <RotateCcw className="w-4 h-4" /> Tentar Novamente
        </button>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col bg-black overflow-hidden">
      <div className="h-14 bg-background border-b border-white/5 flex items-center justify-between px-6 shrink-0 z-10">
        <div className="flex items-center gap-4">
          <div className="hidden sm:flex items-center bg-card p-1 rounded-lg border border-white/5 shadow-inner">
            <button onClick={() => setDevice('desktop')} className={cn("p-1.5 rounded transition-all", device === 'desktop' ? "bg-primary text-background" : "text-neutral-500")}><Monitor className="w-4 h-4" /></button>
            <button onClick={() => setDevice('tablet')} className={cn("p-1.5 rounded transition-all", device === 'tablet' ? "bg-primary text-background" : "text-neutral-500")}><Tablet className="w-4 h-4" /></button>
            <button onClick={() => setDevice('mobile')} className={cn("p-1.5 rounded transition-all", device === 'mobile' ? "bg-primary text-background" : "text-neutral-500")}><Smartphone className="w-4 h-4" /></button>
          </div>
        </div>

        <div className="flex items-center gap-4">
           {status === GenerationStatus.GENERATING && (
             <div className="flex items-center gap-2">
               <RefreshCw className="w-3 h-3 text-primary animate-spin" />
               <span className="text-[10px] font-bold text-primary uppercase tracking-widest hidden md:inline">Neural Processing...</span>
             </div>
           )}
           <div className="flex items-center gap-2">
              <button onClick={handleSave} disabled={status === GenerationStatus.GENERATING || !html} className={cn("flex items-center gap-2 px-4 py-1.5 border rounded-full transition-all font-bold text-[10px] uppercase tracking-widest", isSaved ? "bg-green-500/10 text-green-500 border-green-500/20" : "bg-white/5 border-white/10 text-neutral-400")}>
                {isSaved ? <Check className="w-3.5 h-3.5" /> : <Save className="w-3.5 h-3.5" />}
                {isSaved ? 'Salvo' : 'Salvar'}
              </button>
              <button onClick={onPublish} className="flex items-center gap-2 px-4 py-1.5 bg-primary/10 border border-primary/20 rounded-full text-primary hover:bg-primary hover:text-background transition-all font-bold text-[10px] uppercase tracking-widest"><Rocket className="w-3.5 h-3.5" />Publicar</button>
              <button onClick={() => { const nw = window.open(); if (nw) { nw.document.write(safeHtml); nw.document.close(); } }} className="text-neutral-500 hover:text-white p-2" title="Tela Cheia"><ExternalLink className="w-4 h-4" /></button>
           </div>
        </div>
      </div>

      <div className="flex-1 p-4 md:p-10 flex justify-center bg-black overflow-hidden relative">
        <div className={cn("w-full h-full bg-white rounded-xl shadow-[0_0_60px_rgba(0,255,255,0.05)] overflow-hidden transition-all duration-500 border border-white/10 relative", getDeviceWidth())}>
          {status === GenerationStatus.GENERATING && !html ? (
             <div className="absolute inset-0 z-50 bg-background flex flex-col items-center justify-center p-6 text-center">
                <div className="space-y-8 animate-in fade-in duration-700">
                  <div className="relative">
                    <div className="w-20 h-20 border-4 border-primary/10 border-t-primary rounded-full animate-spin mx-auto" />
                    <Cpu className="w-8 h-8 text-primary absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-pulse" />
                  </div>
                  <div className="space-y-3">
                    <p className="text-sm text-white font-black uppercase tracking-widest">{loadingMessages[loadingStep]}</p>
                    <p className="text-[10px] text-neutral-500 font-bold uppercase tracking-[0.2em]">Otimizando para conversão máxima</p>
                  </div>
                </div>
             </div>
          ) : (
            <iframe srcDoc={safeHtml} title="Website Preview" className="w-full h-full border-none" sandbox="allow-scripts allow-popups allow-forms allow-modals" />
          )}
        </div>
      </div>
    </div>
  );
};

export default PreviewArea;
