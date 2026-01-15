
import React from 'react';
import { Target, AlertCircle, Zap, ArrowRight, Scissors, Dumbbell, Utensils, Stethoscope, GraduationCap, Briefcase } from 'lucide-react';
import { Niche } from '../types';

const NICHES: Niche[] = [
  {
    id: 'barbearia',
    title: 'Barbearias e Estética',
    icon: 'Scissors',
    description: 'Um dos nichos que mais cresce e carece de automação simples.',
    problems: ['Filas de espera', 'Esquecimento de agendamentos', 'Falta de controle de recorrência'],
    solutions: ['Sistema de Agendamento Online', 'Programa de Fidelidade Digital', 'Landing Page com Galeria']
  },
  {
    id: 'fitness',
    title: 'Academias e Personal',
    icon: 'Dumbbell',
    description: 'Profissionais que precisam organizar treinos e pagamentos.',
    problems: ['Planilhas de treino confusas', 'Inadimplência', 'Baixa retenção de alunos'],
    solutions: ['Dashboard de Treinos', 'Sistema de Mensalidades', 'App de Acompanhamento de Metas']
  },
  {
    id: 'gastronomia',
    title: 'Restaurantes e Delivery',
    icon: 'Utensils',
    description: 'Foco total em experiência do cliente e agilidade no pedido.',
    problems: ['Taxas altas de apps de entrega', 'Cardápios físicos desatualizados', 'Dificuldade em reservas'],
    solutions: ['Cardápio Digital Interativo', 'Sistema de Pedidos Diretos', 'Plataforma de Reservas de Mesa']
  },
  {
    id: 'saude',
    title: 'Clínicas e Consultórios',
    icon: 'Stethoscope',
    description: 'Necessidade de organização e profissionalismo extremo.',
    problems: ['Telefone ocupado sempre', 'Perda de histórico de pacientes', 'Falta de presença digital'],
    solutions: ['Portal do Paciente', 'Agendamento com Confirmação SMS', 'Site Institucional Premium']
  },
  {
    id: 'educacao',
    title: 'Educação e Cursos',
    icon: 'GraduationCap',
    description: 'Explosão de criadores de conteúdo que precisam de estrutura.',
    problems: ['Plataformas de cursos caras', 'Baixo engajamento', 'Dificuldade em vender módulos'],
    solutions: ['Área de Membros Minimalista', 'Landing Page de Vendas', 'Sistema de Certificados']
  },
  {
    id: 'freelance',
    title: 'Freelancers & Consultores',
    icon: 'Briefcase',
    description: 'Profissionais liberais que precisam de uma vitrine profissional e gestão de clientes.',
    problems: ['Dificuldade em prospectar clientes', 'Gestão de projetos desorganizada', 'Processo de cobrança e faturas manual'],
    solutions: ['Portfólio de Alto Impacto', 'Gerenciador de Projetos Simples', 'Gerador de Faturas e Propostas']
  }
];

const IconMap: Record<string, any> = {
  Scissors, Dumbbell, Utensils, Stethoscope, GraduationCap, Briefcase
};

interface NicheExplorerProps {
  onSelectNiche: (nicheDescription: string) => void;
}

const NicheExplorer: React.FC<NicheExplorerProps> = ({ onSelectNiche }) => {
  return (
    <div className="flex-1 overflow-y-auto p-6 md:p-12 lg:p-16 bg-black custom-scrollbar">
      <div className="max-w-6xl mx-auto space-y-12">
        <header className="space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-[10px] font-black tracking-widest uppercase">
            <Target className="w-3.5 h-3.5" />
            Estratégia de Mercado
          </div>
          <h1 className="text-3xl md:text-5xl font-black text-white leading-tight">Explorar <span className="text-primary italic">Nichos.</span></h1>
          <p className="text-neutral-500 max-w-2xl text-sm md:text-base font-medium">
            Escolha um mercado para entender seus problemas e gere uma solução digital sob medida em segundos.
          </p>
        </header>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {NICHES.map((niche) => {
            const Icon = IconMap[niche.icon] || Briefcase;
            return (
              <div 
                key={niche.id}
                className="group relative bg-card border border-white/5 rounded-3xl p-6 md:p-8 hover:border-primary/40 transition-all duration-500 flex flex-col h-full overflow-hidden"
              >
                <div className="absolute -top-4 -right-4 opacity-[0.03] group-hover:opacity-[0.08] transition-opacity duration-500">
                  <Icon className="w-32 h-32 text-primary" />
                </div>
                
                <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mb-6 border border-primary/10">
                  <Icon className="w-6 h-6" />
                </div>

                <h3 className="text-xl font-bold text-white mb-3">{niche.title}</h3>
                <p className="text-xs text-neutral-500 mb-8 leading-relaxed font-medium">{niche.description}</p>

                <div className="space-y-6 flex-1">
                  <div className="space-y-3">
                    <span className="text-[9px] font-black text-destructive/80 uppercase tracking-widest flex items-center gap-2">
                      <AlertCircle className="w-3 h-3" /> Principais Dores
                    </span>
                    <ul className="text-[11px] text-neutral-400 space-y-2 px-1">
                      {niche.problems.map((p, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <span className="w-1 h-1 rounded-full bg-destructive/40 mt-1.5 shrink-0" />
                          <span>{p}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="space-y-3">
                    <span className="text-[9px] font-black text-primary uppercase tracking-widest flex items-center gap-2">
                      <Zap className="w-3 h-3" /> Solução Proposta
                    </span>
                    <ul className="text-[11px] text-neutral-300 space-y-2 px-1 font-semibold">
                      {niche.solutions.map((s, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <div className="w-1 h-1 rounded-full bg-primary mt-1.5 shrink-0 shadow-[0_0_8px_rgba(0,255,255,0.8)]" /> 
                          <span>{s}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <button 
                  onClick={() => onSelectNiche(`Crie uma solução premium para o nicho de ${niche.title}. Foco em resolver: ${niche.problems.join(', ')}. Estilo visual moderno e minimalista.`)}
                  className="mt-10 w-full py-4 bg-white/[0.03] hover:bg-primary hover:text-background rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all flex items-center justify-center gap-2 group/btn border border-white/5 active:scale-95"
                >
                  Gerar Produto
                  <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default NicheExplorer;
