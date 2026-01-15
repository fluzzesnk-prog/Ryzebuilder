
import React from 'react';
import { DollarSign, TrendingUp, ShieldCheck, Rocket, Zap, ExternalLink, MousePointer2, Star, Briefcase, Globe } from 'lucide-react';
import { Opportunity } from '../types';
import { cn } from '../lib/utils';

const OPPORTUNITIES: Opportunity[] = [
  {
    id: '1',
    title: 'Landing Page de Alta Conversão',
    niche: 'Infoprodutores & Afiliados',
    difficulty: 'Baixa',
    estimatedValue: 'R$ 800 - R$ 2.500',
    demand: 'Altíssima'
  },
  {
    id: '2',
    title: 'Sistema de Agendamento SaaS',
    niche: 'Estética & Saúde',
    difficulty: 'Média',
    estimatedValue: 'R$ 150/mês ou R$ 3.500 setup',
    demand: 'Recorrente'
  },
  {
    id: '3',
    title: 'Dashboard de Indicadores (BI)',
    niche: 'Pequenas Indústrias',
    difficulty: 'Alta',
    estimatedValue: 'R$ 5.000 - R$ 12.000',
    demand: 'Específica'
  },
  {
    id: '4',
    title: 'Cardápio Digital via QR Code',
    niche: 'Restaurantes & Bares',
    difficulty: 'Baixa',
    estimatedValue: 'R$ 500 setup + R$ 80/mês',
    demand: 'Massa'
  },
  {
    id: '5',
    title: 'Páginas de Lançamento Imobiliário',
    niche: 'Corretores & Construtoras',
    difficulty: 'Baixa',
    estimatedValue: 'R$ 1.500 - R$ 4.500',
    demand: 'Alta'
  },
  {
    id: '6',
    title: 'Área de Membros (LMS) Exclusiva',
    niche: 'Experts & Mentores',
    difficulty: 'Média',
    estimatedValue: 'R$ 2.500 - R$ 7.000',
    demand: 'Crescente'
  },
  {
    id: '7',
    title: 'Site Institucional Premium (Advocacia)',
    niche: 'Escritórios Jurídicos',
    difficulty: 'Média',
    estimatedValue: 'R$ 2.000 - R$ 5.500',
    demand: 'Sólida'
  },
  {
    id: '8',
    title: 'Portfólio de Luxo Interativo',
    niche: 'Arquitetos & Designers',
    difficulty: 'Média',
    estimatedValue: 'R$ 1.800 - R$ 4.000',
    demand: 'Alta'
  },
  {
    id: '9',
    title: 'Sistema de Gestão de Pet Shop',
    niche: 'Pet Shops & Veterinárias',
    difficulty: 'Alta',
    estimatedValue: 'R$ 3.000 setup + Mensalidade',
    demand: 'Recorrente'
  },
  {
    id: '10',
    title: 'Página de Bio Link Profissional',
    niche: 'Influencers & Creators',
    difficulty: 'Baixa',
    estimatedValue: 'R$ 150 - R$ 450',
    demand: 'Volume'
  }
];

interface OpportunityMarketProps {
  onSelect: (prompt: string) => void;
}

const OpportunityMarket: React.FC<OpportunityMarketProps> = ({ onSelect }) => {
  return (
    <div className="flex-1 overflow-y-auto p-6 md:p-12 lg:p-16 bg-black custom-scrollbar">
      <div className="max-w-6xl mx-auto space-y-12">
        <header className="space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-500/10 border border-green-500/20 text-green-400 text-[10px] font-bold tracking-widest uppercase">
            <DollarSign className="w-3 h-3" />
            Mercado e Monetização
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-white leading-tight">Mapa de <span className="text-primary italic">Oportunidades.</span></h1>
          <p className="text-neutral-500 max-w-2xl text-sm font-medium">
            Descubra o que o mercado está contratando agora. Identificamos as lacunas digitais onde empresas estão prontas para investir.
          </p>
        </header>

        <div className="grid grid-cols-1 gap-4">
          {OPPORTUNITIES.map((opt) => (
            <div 
              key={opt.id}
              className="bg-card/30 border border-white/5 rounded-3xl p-6 md:p-8 hover:bg-card hover:border-primary/20 transition-all flex flex-col lg:flex-row lg:items-center justify-between gap-6 group relative overflow-hidden"
            >
              {/* Background Decoration */}
              <div className="absolute top-0 right-0 p-4 opacity-[0.03] group-hover:opacity-[0.07] transition-opacity pointer-events-none">
                 <Briefcase className="w-32 h-32 text-white -rotate-12 translate-x-12 -translate-y-12" />
              </div>

              {/* Left Side: Title and Niche */}
              <div className="space-y-3 relative z-10 flex-1">
                <div className="flex flex-wrap items-center gap-3">
                   <h3 className="text-xl md:text-2xl font-black text-white group-hover:text-primary transition-colors tracking-tight">{opt.title}</h3>
                   <div className="flex items-center gap-1.5 bg-primary/10 text-primary px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest border border-primary/20">
                     <Star className="w-2.5 h-2.5 fill-primary" />
                     {opt.demand}
                   </div>
                </div>
                <div className="flex items-center gap-2 text-[10px] text-neutral-500 font-bold uppercase tracking-widest">
                  <Globe className="w-3.5 h-3.5 text-neutral-600" />
                  Nicho: <span className="text-neutral-300">{opt.niche}</span>
                </div>
              </div>

              {/* Right Side: Organized Grid for Metadata and Button */}
              <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center gap-6 lg:gap-10">
                
                {/* Difficulty Column */}
                <div className="min-w-[100px]">
                  <span className="text-[9px] text-neutral-600 font-black uppercase tracking-widest block mb-1.5">Dificuldade</span>
                  <div className="flex items-center gap-2">
                    <div className={cn(
                      "w-1.5 h-1.5 rounded-full shadow-[0_0_8px_currentColor]",
                      opt.difficulty === 'Baixa' ? 'text-green-500 bg-green-500' : opt.difficulty === 'Média' ? 'text-amber-500 bg-amber-500' : 'text-rose-500 bg-rose-500'
                    )} />
                    <span className={cn(
                      "text-xs font-black uppercase tracking-widest",
                      opt.difficulty === 'Baixa' ? 'text-green-400' : opt.difficulty === 'Média' ? 'text-amber-400' : 'text-rose-400'
                    )}>
                      {opt.difficulty}
                    </span>
                  </div>
                </div>

                {/* Ticket Column */}
                <div className="min-w-[140px]">
                  <span className="text-[9px] text-neutral-600 font-black uppercase tracking-widest block mb-1.5">Ticket Médio</span>
                  <span className="text-sm font-black text-white tabular-nums tracking-tight whitespace-nowrap">
                    {opt.estimatedValue}
                  </span>
                </div>

                {/* Action Button - Unified alignment */}
                <button 
                  onClick={() => onSelect(`Crie uma solução de alta performance para: ${opt.title}. Este projeto é focado no mercado de ${opt.niche}. Design ultra moderno, foco em conversão e experiência de usuário premium.`)}
                  className="w-full md:w-auto flex items-center justify-center gap-3 px-8 py-4 bg-primary text-background rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all hover:scale-105 active:scale-95 shadow-lg shadow-primary/20 group/btn"
                >
                  <Rocket className="w-4 h-4 group-hover/btn:animate-bounce" />
                  Abrir Briefing
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Sales Script CTA Card */}
        <div className="relative p-10 bg-primary/5 rounded-[2.5rem] border border-primary/10 overflow-hidden group">
          <div className="absolute -right-20 -bottom-20 w-80 h-80 bg-primary/10 blur-[100px] rounded-full group-hover:bg-primary/20 transition-all duration-1000" />
          
          <div className="flex flex-col md:flex-row items-center gap-10 relative z-10">
            <div className="w-20 h-20 rounded-3xl bg-primary/20 flex items-center justify-center shrink-0 border border-primary/20">
              <TrendingUp className="w-10 h-10 text-primary" />
            </div>
            <div className="space-y-4 text-center md:text-left flex-1">
              <h4 className="text-2xl font-bold text-white tracking-tight">Como monetizar o Ryze Builder?</h4>
              <p className="text-sm text-neutral-400 leading-relaxed max-w-2xl">
                O Ryze não é apenas um editor, é um gerador de ativos digitais. Você pode fechar contratos de <span className="text-white font-bold">R$ 1.500+</span> apenas entregando a estrutura que a IA gera aqui em minutos. O segredo está na <span className="text-primary italic">personalização final</span> e no acompanhamento do cliente.
              </p>
            </div>
            <div className="shrink-0 w-full md:w-auto">
              <button className="w-full md:w-auto px-10 py-5 bg-white text-black rounded-2xl text-xs font-black uppercase tracking-widest hover:bg-primary hover:scale-105 transition-all shadow-2xl">
                Baixar Script de Vendas
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OpportunityMarket;
