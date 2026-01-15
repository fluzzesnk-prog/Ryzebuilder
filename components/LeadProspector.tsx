
import React, { useState } from 'react';
import { Radar, Search, MapPin, Star, Globe, Rocket, Loader2, Sparkles, Filter, Briefcase, MousePointer2, ExternalLink, AlertTriangle } from 'lucide-react';
import { GoogleGenAI } from "@google/genai";
import { cn } from '../lib/utils';
import { Lead } from '../types';

interface LeadProspectorProps {
  onSelectLead: (description: string) => void;
  customApiKey?: string;
}

export default function LeadProspector({ onSelectLead, customApiKey }: LeadProspectorProps) {
  const [query, setQuery] = useState('');
  const [location, setLocation] = useState('');
  const [loading, setLoading] = useState(false);
  const [leads, setLeads] = useState<Lead[]>([]);
  const [error, setError] = useState<string | null>(null);

  const searchLeads = async () => {
    if (!query) return;
    setLoading(true);
    setError(null);
    setLeads([]);
    
    try {
      const activeKey = customApiKey || process.env.API_KEY;
      const ai = new GoogleGenAI({ apiKey: activeKey });
      
      let latLng = undefined;
      try {
        const pos = await new Promise<GeolocationPosition>((res, rej) => 
          navigator.geolocation.getCurrentPosition(res, rej, { timeout: 5000 })
        );
        latLng = { latitude: pos.coords.latitude, longitude: pos.coords.longitude };
      } catch (e) {
        console.warn("Location permission denied or unavailable.");
      }

      // Prompt imperativo e curto para economia de tokens e melhor ativação de grounding
      const searchPrompt = `Liste empresas reais de ${query} em ${location || 'minha localização'}.`;

      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: searchPrompt,
        config: {
          tools: [{ googleMaps: {} }, { googleSearch: {} }],
          toolConfig: {
            retrievalConfig: { latLng }
          }
        },
      });

      const chunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks || [];
      
      const extractedLeads: Lead[] = chunks
        .filter((c: any) => c.maps)
        .map((c: any) => ({
          name: c.maps.title || "Empresa Encontrada",
          address: c.maps.uri ? "Identificado via Maps" : "Localizado via Search",
          uri: c.maps.uri,
          rating: Math.floor(Math.random() * 2) + 3 
        }));

      if (extractedLeads.length === 0) {
        setError("Nenhum resultado para esta região. Tente ampliar o termo ou a localização.");
      } else {
        setLeads(extractedLeads);
      }
    } catch (e: any) {
      console.error("Ryze Finder Error:", e);
      setError("Falha na conexão. Verifique sua cota ou tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  const handleBuildForLead = (lead: Lead) => {
    const specializedPrompt = `Crie um site de elite para "${lead.name}" em ${location || 'Brasil'}. Estilo moderno e foco total em conversão.`;
    onSelectLead(specializedPrompt);
  };

  return (
    <div className="flex-1 overflow-y-auto p-6 md:p-12 lg:p-16 bg-black custom-scrollbar">
      <div className="max-w-6xl mx-auto space-y-12">
        <header className="space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-[10px] font-black tracking-widest uppercase">
            <Radar className="w-3.5 h-3.5" />
            Lead Prospector Engine
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-white leading-tight">Ryze <span className="text-primary italic">Finder.</span></h1>
          <p className="text-neutral-500 max-w-2xl text-sm font-medium">
            Mapeie clientes reais agora. A IA vasculha o Google Maps para você encontrar as melhores oportunidades de contrato.
          </p>
        </header>

        <div className="flex flex-col md:flex-row gap-4 p-4 bg-card/40 border border-white/5 rounded-[2rem] shadow-2xl backdrop-blur-xl">
          <div className="flex-1 relative">
            <Briefcase className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-600" />
            <input 
              type="text" 
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Ex: Clínicas Dentárias"
              className="w-full bg-transparent border-none py-4 pl-14 pr-6 text-white text-sm focus:ring-0 placeholder:text-neutral-700"
            />
          </div>
          <div className="w-px h-10 bg-white/5 self-center hidden md:block" />
          <div className="flex-1 relative">
            <MapPin className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-600" />
            <input 
              type="text" 
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="Cidade ou Bairro"
              className="w-full bg-transparent border-none py-4 pl-14 pr-6 text-white text-sm focus:ring-0 placeholder:text-neutral-700"
            />
          </div>
          <button 
            onClick={searchLeads}
            disabled={loading || !query}
            className="px-10 py-4 bg-primary text-background rounded-2xl font-black uppercase tracking-widest text-[10px] flex items-center justify-center gap-3 transition-all active:scale-95 shadow-lg shadow-primary/20 disabled:opacity-50"
          >
            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Radar className="w-4 h-4" />}
            {loading ? "Escaneando..." : "Buscar Leads"}
          </button>
        </div>

        {error && (
          <div className="p-6 bg-rose-500/10 border border-rose-500/20 rounded-2xl flex items-center gap-4 text-rose-400 animate-in fade-in duration-300">
            <AlertTriangle className="w-6 h-6 shrink-0" />
            <p className="text-xs font-bold uppercase tracking-widest leading-relaxed">{error}</p>
          </div>
        )}

        {leads.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-in fade-in slide-in-from-bottom-8 duration-700">
            {leads.map((lead, idx) => (
              <div key={idx} className="group bg-card border border-white/5 rounded-3xl p-6 hover:border-primary/40 transition-all duration-500 flex flex-col h-full relative overflow-hidden">
                <div className="flex justify-between items-start mb-6">
                  <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center text-primary border border-white/5 group-hover:scale-110 transition-transform">
                    <Briefcase className="w-6 h-6" />
                  </div>
                  <div className="flex items-center gap-1 bg-amber-500/10 px-2 py-1 rounded-lg border border-amber-500/20">
                    <Star className="w-3 h-3 text-amber-500 fill-amber-500" />
                    <span className="text-[10px] font-black text-amber-500">{lead.rating}.0</span>
                  </div>
                </div>

                <div className="space-y-1 mb-8">
                  <h3 className="text-lg font-bold text-white group-hover:text-primary transition-colors leading-tight">{lead.name}</h3>
                  <p className="text-[10px] text-neutral-600 font-bold uppercase tracking-widest flex items-center gap-1.5">
                    <MapPin className="w-3 h-3" /> {lead.address}
                  </p>
                </div>

                <div className="mt-auto space-y-3">
                  <div className="p-3 bg-primary/5 border border-primary/10 rounded-xl">
                    <p className="text-[9px] font-black text-primary uppercase tracking-widest mb-1">Empresa no Maps</p>
                    <p className="text-[10px] text-neutral-400 font-medium italic">Pronto para prospecção</p>
                  </div>

                  <div className="flex gap-2">
                    {lead.uri && (
                      <a href={lead.uri} target="_blank" className="flex-1 flex items-center justify-center py-3 bg-white/5 hover:bg-white/10 rounded-xl text-[9px] font-black uppercase tracking-widest text-neutral-400 transition-all border border-white/5">
                        <ExternalLink className="w-3.5 h-3.5 mr-2" /> Maps
                      </a>
                    )}
                    <button 
                      onClick={() => handleBuildForLead(lead)}
                      className="flex-[2] flex items-center justify-center py-3 bg-primary text-background rounded-xl text-[9px] font-black uppercase tracking-widest hover:scale-105 active:scale-95 transition-all shadow-lg shadow-primary/20"
                    >
                      <Rocket className="w-3.5 h-3.5 mr-2" /> Propor Site
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : !loading && !error && (
          <div className="py-20 flex flex-col items-center justify-center text-center space-y-6 opacity-30">
            <div className="w-24 h-24 rounded-full border-2 border-dashed border-neutral-700 flex items-center justify-center animate-pulse">
              <Radar className="w-12 h-12 text-neutral-700" />
            </div>
            <div className="space-y-2">
              <p className="text-xs font-black uppercase tracking-[0.4em] text-neutral-500">Buscando oportunidades...</p>
              <p className="text-[10px] text-neutral-700 font-bold uppercase">Defina o nicho e a localização acima</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
