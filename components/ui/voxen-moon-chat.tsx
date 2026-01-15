
"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import { Textarea } from "./textarea";
import { Button } from "./button";
import { cn } from "../../lib/utils";
import BackgroundGradient from "./background-gradient";
import {
  ArrowUp,
  Paperclip,
  Loader2,
  Sparkles,
  Target,
  DollarSign,
  LayoutGrid,
  ChevronRight,
  Terminal,
  MousePointer2
} from "lucide-react";
import { AppView } from "../../types";

interface AutoResizeProps {
  minHeight: number;
  maxHeight?: number;
}

function useAutoResizeTextarea({ minHeight, maxHeight }: AutoResizeProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const adjustHeight = useCallback(
    (reset?: boolean) => {
      const textarea = textareaRef.current;
      if (!textarea) return;

      if (reset) {
        textarea.style.height = `${minHeight}px`;
        return;
      }

      textarea.style.height = `${minHeight}px`; // reset first
      const newHeight = Math.max(
        minHeight,
        Math.min(textarea.scrollHeight, maxHeight ?? Infinity)
      );
      textarea.style.height = `${newHeight}px`;
    },
    [minHeight, maxHeight]
  );

  useEffect(() => {
    if (textareaRef.current) textareaRef.current.style.height = `${minHeight}px`;
  }, [minHeight]);

  return { textareaRef, adjustHeight };
}

interface VoxenMoonChatProps {
  onGenerate: (desc: string) => void;
  isGenerating: boolean;
  onNavigate: (view: AppView) => void;
}

export default function VoxenMoonChat({ onGenerate, isGenerating, onNavigate }: VoxenMoonChatProps) {
  const [message, setMessage] = useState("");
  const { textareaRef, adjustHeight } = useAutoResizeTextarea({
    minHeight: 48,
    maxHeight: 150,
  });

  const handleSend = () => {
    if (message.trim() && !isGenerating) {
      onGenerate(message);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="relative w-full h-screen flex flex-col items-center overflow-x-hidden bg-background">
      <BackgroundGradient />

      {/* Header */}
      <header className="w-full h-20 px-6 md:px-12 flex items-center justify-between z-20 border-b border-white/5 bg-background/20 backdrop-blur-md">
        <div className="flex items-center gap-3">
          <div className="bg-primary p-2 rounded-xl shadow-[0_0_15px_rgba(0,255,255,0.2)]">
            <Sparkles className="text-background w-4 h-4" />
          </div>
          <div className="flex flex-col">
            <span className="font-black text-sm tracking-tighter text-white">RYZE STUDIO</span>
            <span className="text-[7px] font-bold text-neutral-500 uppercase tracking-widest -mt-0.5">Neural Hub</span>
          </div>
        </div>

        <nav className="hidden lg:flex items-center gap-2 p-1.5 bg-white/[0.03] rounded-2xl border border-white/5">
          <button onClick={() => onNavigate('niches')} className="px-5 py-2 text-[9px] font-black uppercase tracking-widest text-neutral-400 hover:text-white transition-all rounded-xl">Nichos</button>
          <button onClick={() => onNavigate('opportunities')} className="px-5 py-2 text-[9px] font-black uppercase tracking-widest text-neutral-400 hover:text-white transition-all rounded-xl">Mercado</button>
          <button onClick={() => onNavigate('builder')} className="px-6 py-2 bg-primary text-background text-[9px] font-black uppercase tracking-widest rounded-xl hover:scale-105 active:scale-95 transition-all shadow-lg shadow-primary/20">Editor</button>
        </nav>
        
        <button className="lg:hidden p-2 text-neutral-400" onClick={() => onNavigate('niches')}>
           <LayoutGrid className="w-5 h-5" />
        </button>
      </header>

      <div className="flex-1 w-full flex flex-col items-center justify-center z-10 px-6 py-20">
        <div className="text-center space-y-6 md:space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-1000">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/5 border border-primary/10 text-primary text-[8px] md:text-[9px] font-black tracking-[0.4em] uppercase mx-auto">
            <Terminal className="w-3 h-3" />
            Empowering Digital Creators
          </div>
          
          <div className="space-y-2 md:space-y-4">
            <h1 className="text-5xl md:text-8xl lg:text-9xl font-black text-white tracking-tighter leading-none">
              Build <span className="text-primary italic">Better.</span>
            </h1>
            <p className="text-sm md:text-lg lg:text-xl text-neutral-500 font-medium max-w-xl mx-auto leading-relaxed px-4">
              Crie produtos digitais de alta performance em minutos. Use a inteligência neural para validar suas ideias.
            </p>
          </div>
        </div>

        {/* Input area */}
        <div className="w-full max-w-2xl mt-12 md:mt-16 space-y-8 animate-in fade-in slide-in-from-bottom-12 duration-1000 delay-200">
          <div className="relative bg-card/40 backdrop-blur-3xl rounded-[2rem] border border-white/10 shadow-2xl focus-within:border-primary/40 focus-within:ring-4 focus-within:ring-primary/5 transition-all duration-500 overflow-hidden">
            <Textarea
              ref={textareaRef}
              value={message}
              onChange={(e) => {
                setMessage(e.target.value);
                adjustHeight();
              }}
              onKeyDown={handleKeyDown}
              placeholder="Descreva seu projeto aqui..."
              className={cn(
                "w-full px-8 py-6 resize-none border-none bg-transparent",
                "text-white text-base md:text-lg leading-relaxed font-medium",
                "focus-visible:ring-0 focus-visible:ring-offset-0",
                "placeholder:text-neutral-700 min-h-[70px]"
              )}
              style={{ overflow: "hidden" }}
            />

            <div className="flex items-center justify-between px-6 py-4 border-t border-white/5 bg-white/[0.01]">
              <div className="flex items-center gap-2">
                 <Button variant="ghost" size="icon" className="text-neutral-600 hover:text-white rounded-xl h-10 w-10">
                  <Paperclip className="w-4 h-4" />
                </Button>
                <span className="hidden sm:inline-flex text-[8px] font-black uppercase tracking-widest text-neutral-700">Ryze Alpha 2.5</span>
              </div>

              <Button
                onClick={handleSend}
                disabled={!message.trim() || isGenerating}
                className={cn(
                  "h-12 px-8 rounded-xl transition-all duration-500 font-black uppercase tracking-widest text-[10px] shadow-xl",
                  message.trim() && !isGenerating
                    ? "bg-primary text-background hover:scale-[1.05] active:scale-95 shadow-primary/30"
                    : "bg-white/5 text-neutral-700 cursor-not-allowed border border-white/5"
                )}
              >
                {isGenerating ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : <MousePointer2 className="w-4 h-4 mr-2" />}
                {isGenerating ? 'Processando' : 'Iniciar'}
              </Button>
            </div>
          </div>

          {/* Quick Access Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <button 
              onClick={() => onNavigate('niches')}
              className="flex items-center gap-4 p-5 bg-white/[0.02] border border-white/5 rounded-3xl hover:bg-primary/5 hover:border-primary/20 transition-all duration-500 group"
            >
              <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                <Target className="w-6 h-6" />
              </div>
              <div className="text-left">
                <p className="text-[10px] font-black text-white uppercase tracking-widest">Explorar Nichos</p>
                <p className="text-[8px] text-neutral-600 font-bold uppercase tracking-widest mt-0.5">O que vender hoje?</p>
              </div>
              <ChevronRight className="w-4 h-4 ml-auto text-neutral-800 group-hover:text-primary transition-all" />
            </button>

            <button 
              onClick={() => onNavigate('opportunities')}
              className="flex items-center gap-4 p-5 bg-white/[0.02] border border-white/5 rounded-3xl hover:bg-green-500/5 hover:border-green-500/20 transition-all duration-500 group"
            >
              <div className="w-12 h-12 rounded-2xl bg-green-500/10 flex items-center justify-center text-green-500 group-hover:scale-110 transition-transform">
                <DollarSign className="w-6 h-6" />
              </div>
              <div className="text-left">
                <p className="text-[10px] font-black text-white uppercase tracking-widest">Oportunidades</p>
                <p className="text-[8px] text-neutral-600 font-bold uppercase tracking-widest mt-0.5">Ganhos recorrentes</p>
              </div>
              <ChevronRight className="w-4 h-4 ml-auto text-neutral-800 group-hover:text-green-500 transition-all" />
            </button>
          </div>
        </div>
      </div>
      
      <footer className="w-full text-center text-neutral-800 py-8 z-10 text-[8px] font-black uppercase tracking-[0.5em] border-t border-white/5">
        Ryze Neural Network • {new Date().getFullYear()}
      </footer>
    </div>
  );
}
