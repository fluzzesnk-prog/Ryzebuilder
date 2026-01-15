
import React from 'react';
import { FolderOpen, Calendar, Trash2, ArrowUpRight, Box, Clock, Layout, Search, Plus } from 'lucide-react';
import { SavedProject } from '../types';
import { cn } from '../lib/utils';

interface ProjectManagerProps {
  projects: SavedProject[];
  onLoadProject: (project: SavedProject) => void;
  onDeleteProject: (id: string) => void;
  onNewProject: () => void;
}

export default function ProjectManager({ projects, onLoadProject, onDeleteProject, onNewProject }: ProjectManagerProps) {
  const formatDate = (timestamp: number) => {
    return new Intl.DateTimeFormat('pt-BR', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(new Date(timestamp));
  };

  return (
    <div className="flex-1 overflow-y-auto p-6 md:p-12 lg:p-16 bg-black custom-scrollbar">
      <div className="max-w-6xl mx-auto space-y-12">
        <header className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-[10px] font-black tracking-widest uppercase">
              <FolderOpen className="w-3.5 h-3.5" />
              Project Repository
            </div>
            <h1 className="text-4xl md:text-5xl font-black text-white leading-tight">Meus <span className="text-primary italic">Projetos.</span></h1>
            <p className="text-neutral-500 max-w-xl text-sm font-medium">
              Acesse e gerencie todos os seus sites salvos. Retome edições ou exporte códigos finalizados.
            </p>
          </div>
          
          <button 
            onClick={onNewProject}
            className="px-8 py-4 bg-primary text-background rounded-2xl font-black uppercase tracking-widest text-[10px] flex items-center gap-3 hover:scale-105 active:scale-95 transition-all shadow-xl shadow-primary/20"
          >
            <Plus className="w-4 h-4" />
            Novo Projeto
          </button>
        </header>

        {projects.length === 0 ? (
          <div className="py-32 flex flex-col items-center justify-center text-center space-y-6 opacity-30">
            <div className="w-24 h-24 rounded-full border-2 border-dashed border-neutral-700 flex items-center justify-center">
              <Box className="w-10 h-10 text-neutral-700" />
            </div>
            <div className="space-y-2">
              <p className="text-xs font-black uppercase tracking-[0.4em] text-neutral-500">Nenhum projeto salvo ainda</p>
              <button onClick={onNewProject} className="text-[10px] text-primary font-bold uppercase hover:underline">Começar agora</button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-in fade-in slide-in-from-bottom-8 duration-700">
            {projects.map((project) => (
              <div 
                key={project.id}
                className="group bg-card border border-white/5 rounded-3xl p-6 hover:border-primary/40 transition-all duration-500 flex flex-col h-full relative"
              >
                <div className="flex justify-between items-start mb-6">
                  <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary border border-primary/10 group-hover:scale-110 transition-transform">
                    <Layout className="w-6 h-6" />
                  </div>
                  <div className="flex items-center gap-1.5 text-[9px] font-black text-neutral-600 uppercase tracking-widest bg-black/40 px-3 py-1.5 rounded-full border border-white/5">
                    <Clock className="w-3 h-3" />
                    {formatDate(project.timestamp)}
                  </div>
                </div>

                <div className="space-y-2 mb-8 flex-1">
                  <h3 className="text-lg font-bold text-white group-hover:text-primary transition-colors leading-tight line-clamp-1">{project.name}</h3>
                  <p className="text-xs text-neutral-500 leading-relaxed line-clamp-2 italic">
                    "{project.description}"
                  </p>
                </div>

                <div className="flex gap-2 pt-4 border-t border-white/5">
                  <button 
                    onClick={() => onLoadProject(project)}
                    className="flex-1 flex items-center justify-center py-3.5 bg-primary text-background rounded-xl text-[9px] font-black uppercase tracking-widest hover:scale-[1.02] active:scale-95 transition-all shadow-lg shadow-primary/10"
                  >
                    <ArrowUpRight className="w-3.5 h-3.5 mr-2" /> Abrir Editor
                  </button>
                  <button 
                    onClick={() => { if(confirm('Excluir este projeto permanentemente?')) onDeleteProject(project.id) }}
                    className="w-12 flex items-center justify-center bg-white/5 hover:bg-destructive/10 text-neutral-600 hover:text-destructive rounded-xl transition-all border border-white/5"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
