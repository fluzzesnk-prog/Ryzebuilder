
import React, { useState } from 'react';
import { BrainCircuit, Megaphone, Search, Newspaper, CheckCircle2, Loader2, Sparkles, Copy, Layout, Send } from 'lucide-react';
import { GoogleGenAI } from "@google/genai";
import { cn } from '../lib/utils';
import { UserIdentity } from '../types';

interface IntelligenceCenterProps {
  currentProjectDesc: string;
  identity: UserIdentity;
}

export default function IntelligenceCenter({ currentProjectDesc, identity }: IntelligenceCenterProps) {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<{
    headlines: string[];
    copy: string;
    keywords: string[];
    ads: string;
  } | null>(null);

  const generateIntelligence = async () => {
    if (!currentProjectDesc) return;
    setLoading(true);
    try {
      const activeKey = identity.apiKey || import.meta.env.VITE_GEMINI_API_KEY;

      if (!activeKey || activeKey === 'PLACEHOLDER_API_KEY') {
        throw new Error("API Key não configurada. Configure VITE_GEMINI_API_KEY na Vercel.");
      }

      // EMERGENCY STABILITY: API v1 Estável para garantir resposta JSON sem 404
      const ai = new GoogleGenAI({ apiKey: activeKey, apiVersion: 'v1' });

      const prompt = `
        Crie uma estratégia completa de marketing para este projeto: "${currentProjectDesc}".
        Imagine que você é o estrategista chefe da agência de ${identity.name || 'soluções digitais'} (${identity.specialty}).
        
        REGRAS IMPORTANTES:
        - Os textos são para o cliente final do negócio descrito.
        - Não mencione "Ryze" ou "Ryze Builder".
        - Foque na conversão e nos benefícios reais do produto/serviço.

        Formato JSON obrigatório com os seguintes campos:
        - headlines: Array com 5 headlines de alta conversão.
        - copy: Um script curto de VSL ou texto principal da página de vendas.
        - keywords: 10 palavras-chave SEO estratégicas.
        - ads: Uma copy de exemplo para Meta/Google Ads com chamada para ação (CTA).
      `;

      const response = await ai.models.generateContent({
        model: 'gemini-1.5-flash',
        contents: prompt,
        config: { responseMimeType: "application/json" }
      });

      const text = response.text?.trim() || "{}";
      const result = JSON.parse(text);
      setData(result);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const CopyBox = ({ title, content, icon: Icon }: any) => (
    <div className="bg-card border border-white/5 rounded-3xl p-6 space-y-4 hover:border-primary/20 transition-all group">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
            <Icon className="w-5 h-5" />
          </div>
          <h3 className="text-sm font-black uppercase tracking-widest text-white">{title}</h3>
        </div>
        <button className="p-2 hover:bg-white/5 rounded-lg text-neutral-600 hover:text-white transition-all">
          <Copy className="w-4 h-4" />
        </button>
      </div>
      <div className="text-xs text-neutral-400 leading-relaxed font-medium whitespace-pre-wrap bg-black/20 p-4 rounded-xl border border-white/5">
        {content}
      </div>
    </div>
  );

  return (
    <div className="flex-1 overflow-y-auto p-6 md:p-12 lg:p-16 bg-black custom-scrollbar">
      <div className="max-w-6xl mx-auto space-y-12">
        <header className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-[10px] font-black tracking-widest uppercase">
              <BrainCircuit className="w-3.5 h-3.5" />
              Intelligence Hub
            </div>
            <h1 className="text-4xl md:text-5xl font-black text-white leading-tight">Engenharia de <span className="text-primary italic">Conversão.</span></h1>
            <p className="text-neutral-500 max-w-xl text-sm font-medium">
              Extraia o máximo potencial de vendas do seu projeto. Geramos copy, anúncios e inteligência de SEO baseada no seu nicho.
            </p>
          </div>

          <button
            onClick={generateIntelligence}
            disabled={loading || !currentProjectDesc}
            className={cn(
              "px-8 py-4 rounded-2xl font-black uppercase tracking-widest text-[10px] flex items-center gap-3 transition-all active:scale-95 shadow-xl shadow-primary/10",
              loading ? "bg-white/5 text-neutral-600" : "bg-primary text-background hover:scale-105"
            )}
          >
            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
            {loading ? "Mapeando Mercado..." : "Gerar Ativos de Venda"}
          </button>
        </header>

        {!data && !loading && (
          <div className="py-20 flex flex-col items-center justify-center text-center space-y-6 opacity-30">
            <div className="w-20 h-20 rounded-full border-2 border-dashed border-neutral-700 flex items-center justify-center">
              <Megaphone className="w-10 h-10 text-neutral-700" />
            </div>
            <p className="text-xs font-black uppercase tracking-[0.3em] text-neutral-500">Aguardando geração de ativos...</p>
          </div>
        )}

        {data && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 animate-in fade-in slide-in-from-bottom-8 duration-700">
            <div className="space-y-6">
              <div className="bg-card border border-white/5 rounded-3xl p-8 space-y-6">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center text-amber-500">
                    <CheckCircle2 className="w-5 h-5" />
                  </div>
                  <h3 className="text-sm font-black uppercase tracking-widest text-white">Headlines Irresistíveis</h3>
                </div>
                <div className="space-y-3">
                  {data.headlines.map((h, i) => (
                    <div key={i} className="p-4 bg-white/[0.02] border border-white/5 rounded-xl text-xs text-white font-bold hover:border-primary/30 transition-all cursor-pointer">
                      {h}
                    </div>
                  ))}
                </div>
              </div>

              <CopyBox title="Texto Principal / VSL" content={data.copy} icon={Newspaper} />
            </div>

            <div className="space-y-6">
              <CopyBox title="Scripts de Anúncios (Ads)" content={data.ads} icon={Megaphone} />

              <div className="bg-card border border-white/5 rounded-3xl p-8 space-y-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-500">
                    <Search className="w-5 h-5" />
                  </div>
                  <h3 className="text-sm font-black uppercase tracking-widest text-white">Palavras-Chave SEO</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {data.keywords.map((k, i) => (
                    <span key={i} className="px-3 py-1.5 bg-white/5 border border-white/5 rounded-lg text-[10px] text-neutral-400 font-bold uppercase tracking-widest">
                      {k}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
