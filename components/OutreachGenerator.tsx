
import React, { useState } from 'react';
import {
  Zap, MessageCircle, Instagram, Mail, Phone, Copy,
  Check, Loader2, Sparkles, Send, Target, Layout, ShieldCheck,
  ChevronRight, BrainCircuit
} from 'lucide-react';
import { GoogleGenAI } from "@google/genai";
import { cn } from '../lib/utils';
import { UserIdentity } from '../types';

interface OutreachGeneratorProps {
  currentProjectDesc: string;
  identity: UserIdentity;
}

type Channel = 'whatsapp' | 'instagram' | 'email' | 'coldcall';
type Tone = 'professional' | 'friendly' | 'urgent';

export default function OutreachGenerator({ currentProjectDesc, identity }: OutreachGeneratorProps) {
  const [selectedChannel, setSelectedChannel] = useState<Channel>('whatsapp');
  const [selectedTone, setSelectedTone] = useState<Tone>('friendly');
  const [loading, setLoading] = useState(false);
  const [script, setScript] = useState<string>('');
  const [copied, setCopied] = useState(false);

  const channels = [
    { id: 'whatsapp', icon: MessageCircle, label: 'WhatsApp', color: 'text-green-500', bg: 'bg-green-500/10' },
    { id: 'instagram', icon: Instagram, label: 'Instagram', color: 'text-pink-500', bg: 'bg-pink-500/10' },
    { id: 'email', icon: Mail, label: 'E-mail', color: 'text-blue-500', bg: 'bg-blue-500/10' },
    { id: 'coldcall', icon: Phone, label: 'Cold Call', color: 'text-amber-500', bg: 'bg-amber-500/10' },
  ];

  const tones = [
    { id: 'friendly', label: 'Amigável' },
    { id: 'professional', label: 'Profissional' },
    { id: 'urgent', label: 'Direto / Urgente' },
  ];

  const generateScript = async () => {
    setLoading(true);
    setCopied(false);
    try {
      const activeKey = identity.apiKey || import.meta.env.VITE_GEMINI_API_KEY;

      if (!activeKey || activeKey === 'PLACEHOLDER_API_KEY') {
        throw new Error("API Key não configurada. Configure VITE_GEMINI_API_KEY na Vercel.");
      }

      const ai = new GoogleGenAI({ apiKey: activeKey });

      const prompt = `
        Crie um script de prospecção de alta conversão para o canal: ${selectedChannel}.
        O tom de voz deve ser: ${selectedTone}.
        Contexto do serviço que EU (o usuário) estou oferecendo ao meu cliente: "${currentProjectDesc || 'Soluções de presença digital, sites de alta performance e automação'}".
        
        REGRAS CRÍTICAS DE IDENTIDADE:
        - Eu sou um especialista independente ou agência de soluções digitais.
        - Minha identidade profissional é: Nome: ${identity.name || '[Seu Nome]'}, Especialidade: ${identity.specialty || '[Sua Especialidade]'}.
        - JAMAIS cite "RYZE", "Equipe RYZE" ou qualquer nome de plataforma no script. 
        - A assinatura deve ser "${identity.name || '[Seu Nome]'} | ${identity.specialty || 'Especialista em Estratégia Digital'}".
        - O foco é na minha autoridade e no valor que entrego para o negócio do prospecto.

        ESTRUTURA DE COPY:
        - Use técnicas de copywriting (AIDA ou PAS).
        - Foque na dor específica do nicho do cliente e como minha solução resolve (velocidade, conversão, design).
        - Se for WhatsApp/Instagram, use Emojis de forma moderna e profissional.
        - Se for E-mail, inclua um Assunto (Subject line) impossível de ignorar.
        - Se for Cold Call, estruture como um roteiro de conversa com quebra de objeções.
        
        Idioma: Português do Brasil.
        Retorne APENAS o texto pronto do script.
      `;

      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: prompt,
        config: { temperature: 0.7 }
      });

      setScript(response.text || '');
    } catch (e) {
      console.error(e);
      setScript('O motor de vendas encontrou um erro. Tente novamente em instantes.');
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(script);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex-1 overflow-y-auto p-6 md:p-12 lg:p-16 bg-black custom-scrollbar">
      <div className="max-w-4xl mx-auto space-y-12">
        <header className="space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-[10px] font-black tracking-widest uppercase">
            <Zap className="w-3.5 h-3.5 animate-pulse" />
            Vendas e Prospecção
          </div>
          <h1 className="text-4xl md:text-5 kys:text-5xl font-black text-white leading-tight">Máquina de <span className="text-primary italic">Vendas.</span></h1>
          <p className="text-neutral-500 max-w-2xl text-sm font-medium">
            Gere abordagens irresistíveis para fechar SEUS contratos. Escolha o canal e a IA criará a copy que posiciona você como autoridade.
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          <div className="lg:col-span-1 space-y-8 animate-in fade-in slide-in-from-left-4 duration-500">
            <div className="space-y-4">
              <label className="text-[10px] font-black text-neutral-600 uppercase tracking-widest px-2">1. Canal de Abordagem</label>
              <div className="grid grid-cols-2 gap-3">
                {channels.map((ch) => (
                  <button
                    key={ch.id}
                    onClick={() => setSelectedChannel(ch.id as Channel)}
                    className={cn(
                      "flex flex-col items-center gap-3 p-4 rounded-2xl border transition-all duration-300",
                      selectedChannel === ch.id
                        ? "bg-white/[0.03] border-primary shadow-lg shadow-primary/5"
                        : "bg-white/[0.01] border-white/5 hover:border-white/20"
                    )}
                  >
                    <div className={cn("p-2 rounded-xl", selectedChannel === ch.id ? ch.bg : "bg-white/5")}>
                      <ch.icon className={cn("w-5 h-5", selectedChannel === ch.id ? ch.color : "text-neutral-600")} />
                    </div>
                    <span className={cn("text-[9px] font-black uppercase tracking-widest", selectedChannel === ch.id ? "text-white" : "text-neutral-600")}>
                      {ch.label}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <label className="text-[10px] font-black text-neutral-600 uppercase tracking-widest px-2">2. Tom de Voz</label>
              <div className="space-y-2">
                {tones.map((t) => (
                  <button
                    key={t.id}
                    onClick={() => setSelectedTone(t.id as Tone)}
                    className={cn(
                      "w-full px-4 py-3 rounded-xl border text-[10px] font-bold uppercase tracking-widest text-left transition-all",
                      selectedTone === t.id
                        ? "bg-primary/10 border-primary text-primary"
                        : "bg-white/5 border-white/5 text-neutral-500 hover:text-neutral-300"
                    )}
                  >
                    {t.label}
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={generateScript}
              disabled={loading}
              className="w-full py-5 bg-primary text-background rounded-2xl font-black uppercase tracking-widest text-xs flex items-center justify-center gap-3 hover:scale-105 active:scale-95 transition-all shadow-xl shadow-primary/20 disabled:opacity-50"
            >
              {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Sparkles className="w-5 h-5" />}
              Gerar Abordagem
            </button>
          </div>

          <div className="lg:col-span-2 space-y-6 animate-in fade-in slide-in-from-right-4 duration-500 delay-200">
            {script ? (
              <div className="bg-card border border-white/10 rounded-[2rem] overflow-hidden shadow-2xl">
                <div className="px-8 py-4 border-b border-white/5 bg-white/[0.02] flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <BrainCircuit className="w-4 h-4 text-primary" />
                    <span className="text-[10px] font-black text-neutral-500 uppercase tracking-widest">Script de Vendas Personalizado</span>
                  </div>
                  <button
                    onClick={handleCopy}
                    className={cn(
                      "flex items-center gap-2 px-3 py-1.5 rounded-lg text-[9px] font-black uppercase tracking-widest transition-all",
                      copied ? "bg-green-500/10 text-green-500" : "bg-white/5 text-neutral-400 hover:text-white"
                    )}
                  >
                    {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                    {copied ? 'Copiado' : 'Copiar'}
                  </button>
                </div>
                <div className="p-8">
                  <pre className="text-sm text-neutral-300 font-medium leading-relaxed whitespace-pre-wrap font-sans">
                    {script}
                  </pre>
                </div>
                <div className="px-8 py-6 bg-primary/5 border-t border-white/5">
                  <p className="text-[9px] text-primary font-black uppercase tracking-widest mb-1 flex items-center gap-2">
                    <Target className="w-3 h-3" /> Estratégia de Conversão
                  </p>
                  <p className="text-[10px] text-neutral-500 font-medium">
                    Este script foi otimizado para gerar curiosidade imediata. Lembre-se de substituir [Nome] e outros campos entre colchetes por dados reais do seu prospecto.
                  </p>
                </div>
              </div>
            ) : (
              <div className="h-[500px] border-2 border-dashed border-white/5 rounded-[2rem] flex flex-col items-center justify-center text-center p-12 opacity-30">
                <div className="w-20 h-20 rounded-full bg-white/5 flex items-center justify-center mb-6">
                  <Send className="w-8 h-8 text-neutral-700" />
                </div>
                <p className="text-xs font-black uppercase tracking-[0.4em] text-neutral-600">Aguardando geração de abordagem...</p>
                <p className="text-[10px] text-neutral-800 font-bold uppercase mt-2">Personalize sua prospecção e feche mais projetos</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
