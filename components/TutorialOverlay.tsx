
import React, { useState } from 'react';
import { 
  Sparkles, Layout, BrainCircuit, Zap, Radar, 
  ChevronRight, X, Rocket, CheckCircle2, MousePointer2 
} from 'lucide-react';
import { cn } from '../lib/utils';

interface Step {
  title: string;
  description: string;
  icon: any;
  color: string;
}

const STEPS: Step[] = [
  {
    title: "Bem-vindo ao Ryze Builder",
    description: "Sua jornada para criar e vender produtos digitais de alta performance começa aqui. Vamos te mostrar como dominar o motor neural.",
    icon: Sparkles,
    color: "text-primary"
  },
  {
    title: "Criação Neural (Chat)",
    description: "No Dashboard, descreva sua ideia. Nossa IA não apenas cria o código, ela arquiteta uma estratégia visual completa em segundos.",
    icon: MousePointer2,
    color: "text-blue-400"
  },
  {
    title: "Editor de Elite",
    description: "Refine seu site em tempo real. Use comandos de linguagem natural para mudar cores, seções ou o tom de voz do seu projeto.",
    icon: Layout,
    color: "text-purple-400"
  },
  {
    title: "Inteligência de Vendas",
    description: "Gere headlines, scripts de vídeo e anúncios matadores. O Ryze prepara todo o seu arsenal de marketing automaticamente.",
    icon: BrainCircuit,
    color: "text-amber-400"
  },
  {
    title: "Escalando seu Lucro",
    description: "Use o Lead Finder para achar clientes reais e a Máquina de Vendas para prospectar. Você tem tudo para faturar R$ 1.500+ por projeto.",
    icon: Zap,
    color: "text-green-400"
  }
];

interface TutorialOverlayProps {
  onClose: () => void;
}

export default function TutorialOverlay({ onClose }: TutorialOverlayProps) {
  const [currentStep, setCurrentStep] = useState(0);

  const nextStep = () => {
    if (currentStep < STEPS.length - 1) {
      setCurrentStep(prev => prev + 1);
    } else {
      onClose();
    }
  };

  const activeStep = STEPS[currentStep];
  const Icon = activeStep.icon;

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-6 bg-background/80 backdrop-blur-md animate-in fade-in duration-500">
      <div className="relative w-full max-w-lg bg-card border border-white/10 rounded-[2.5rem] shadow-[0_0_100px_rgba(0,255,255,0.1)] overflow-hidden">
        
        {/* Progresso superior */}
        <div className="absolute top-0 left-0 w-full h-1.5 flex gap-1 px-8 pt-8">
          {STEPS.map((_, i) => (
            <div 
              key={i} 
              className={cn(
                "h-1 flex-1 rounded-full transition-all duration-500",
                i <= currentStep ? "bg-primary" : "bg-white/10"
              )} 
            />
          ))}
        </div>

        <button 
          onClick={onClose}
          className="absolute top-6 right-8 p-2 text-neutral-500 hover:text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="p-10 pt-20 flex flex-col items-center text-center space-y-8">
          <div className={cn(
            "w-20 h-20 rounded-3xl bg-white/[0.03] border border-white/10 flex items-center justify-center animate-in zoom-in duration-500",
            activeStep.color
          )}>
            <Icon className="w-10 h-10" />
          </div>

          <div className="space-y-3">
            <h2 className="text-2xl font-black text-white tracking-tight leading-tight">
              {activeStep.title}
            </h2>
            <p className="text-sm text-neutral-500 leading-relaxed font-medium">
              {activeStep.description}
            </p>
          </div>

          <div className="w-full pt-4">
            <button 
              onClick={nextStep}
              className="w-full py-5 bg-primary text-background rounded-2xl font-black uppercase tracking-widest text-xs flex items-center justify-center gap-3 hover:scale-[1.02] active:scale-95 transition-all shadow-xl shadow-primary/20"
            >
              {currentStep === STEPS.length - 1 ? (
                <>
                  <Rocket className="w-4 h-4" />
                  Começar a Construir
                </>
              ) : (
                <>
                  Próximo Passo
                  <ChevronRight className="w-4 h-4" />
                </>
              )}
            </button>
            
            <button 
              onClick={onClose}
              className="mt-4 text-[10px] text-neutral-600 font-bold uppercase tracking-widest hover:text-neutral-400 transition-colors"
            >
              Pular tutorial
            </button>
          </div>
        </div>

        <div className="p-6 bg-white/[0.02] border-t border-white/5 flex items-center justify-center">
           <p className="text-[9px] text-neutral-700 font-bold uppercase tracking-[0.3em]">
             Ryze Onboarding Experience v2.5
           </p>
        </div>
      </div>
    </div>
  );
}
