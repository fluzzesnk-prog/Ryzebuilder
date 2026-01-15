
import React, { useState } from 'react';
import { X, UserCircle, Briefcase, Award, Save, CheckCircle2, ChevronDown, Key, AlertCircle } from 'lucide-react';
import { UserIdentity } from '../types';
import { cn } from '../lib/utils';

interface IdentityModalProps {
  identity: UserIdentity;
  onSave: (identity: UserIdentity) => void;
  onClose: () => void;
}

export default function IdentityModal({ identity, onSave, onClose }: IdentityModalProps) {
  const [formData, setFormData] = useState<UserIdentity>(identity);
  const [saved, setSaved] = useState(false);
  const [showAdvanced, setShowAdvanced] = useState(false);

  const handleSave = () => {
    onSave(formData);
    setSaved(true);
    setTimeout(() => {
      setSaved(false);
      onClose();
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-[150] flex items-center justify-center p-6 bg-background/90 backdrop-blur-xl animate-in fade-in duration-300">
      <div className="bg-card w-full max-w-lg rounded-[2.5rem] border border-white/10 shadow-[0_0_80px_rgba(0,255,255,0.05)] overflow-hidden">
        <div className="p-8 border-b border-white/5 flex items-center justify-between bg-white/[0.02]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center border border-primary/20">
              <UserCircle className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white tracking-tight">Meu Perfil Profissional</h2>
              <p className="text-[10px] text-neutral-500 font-bold uppercase tracking-widest">Identidade para Prospecção</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 text-neutral-500 hover:text-white transition-colors">
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-8 space-y-6 max-h-[70vh] overflow-y-auto custom-scrollbar">
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-[10px] font-black text-neutral-600 uppercase tracking-widest flex items-center gap-2">
                <Briefcase className="w-3 h-3" /> Nome da Sua Marca / Agência
              </label>
              <input 
                type="text" 
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                placeholder="Ex: Pedro Digital ou Agência Alpha"
                className="w-full bg-white/[0.02] border border-white/5 rounded-xl px-4 py-3 text-sm text-white focus:border-primary/40 outline-none transition-all"
              />
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black text-neutral-600 uppercase tracking-widest flex items-center gap-2">
                <Award className="w-3 h-3" /> Sua Especialidade
              </label>
              <input 
                type="text" 
                value={formData.specialty}
                onChange={(e) => setFormData({...formData, specialty: e.target.value})}
                placeholder="Ex: Especialista em UI/UX e Conversão"
                className="w-full bg-white/[0.02] border border-white/5 rounded-xl px-4 py-3 text-sm text-white focus:border-primary/40 outline-none transition-all"
              />
            </div>
          </div>

          <div className="p-4 bg-primary/5 rounded-2xl border border-primary/10">
            <p className="text-[10px] text-neutral-400 leading-relaxed italic">
              "Estes dados serão usados para que a IA gere scripts de venda e estratégias em SEU nome, garantindo autoridade máxima."
            </p>
          </div>

          {/* Seção "Escondida" / Avançada */}
          <div className="pt-2">
            <button 
              onClick={() => setShowAdvanced(!showAdvanced)}
              className="flex items-center gap-2 text-[8px] font-black text-neutral-700 hover:text-neutral-500 uppercase tracking-[0.2em] transition-colors"
            >
              <ChevronDown className={cn("w-3 h-3 transition-transform", showAdvanced && "rotate-180")} />
              Opções de Desenvolvedor
            </button>
            
            {showAdvanced && (
              <div className="mt-4 p-5 bg-black/40 border border-white/5 rounded-2xl space-y-4 animate-in slide-in-from-top-2 duration-300">
                <div className="flex items-center gap-3 text-amber-500/80 mb-1">
                  <Key className="w-4 h-4" />
                  <span className="text-[9px] font-black uppercase tracking-widest">Chave API Personalizada (Gemini)</span>
                </div>
                <input 
                  type="password" 
                  value={formData.apiKey || ''}
                  onChange={(e) => setFormData({...formData, apiKey: e.target.value})}
                  placeholder="Cole sua chave API aqui..."
                  className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3 text-xs text-primary font-mono outline-none focus:border-primary/50 transition-all"
                />
                <div className="flex items-start gap-2 p-3 bg-amber-500/5 rounded-lg border border-amber-500/10">
                  <AlertCircle className="w-3.5 h-3.5 text-amber-500 shrink-0 mt-0.5" />
                  <p className="text-[9px] text-neutral-500 leading-tight">
                    Ao inserir sua própria chave, você terá <span className="text-amber-500/80 font-bold">gerações ilimitadas</span> e maior velocidade, sem depender da cota global do sistema.
                  </p>
                </div>
              </div>
            )}
          </div>

          <button 
            onClick={handleSave}
            className="w-full py-4 bg-primary text-background rounded-2xl font-black uppercase tracking-widest text-xs flex items-center justify-center gap-3 hover:scale-[1.02] active:scale-95 transition-all shadow-xl shadow-primary/20"
          >
            {saved ? <CheckCircle2 className="w-5 h-5" /> : <Save className="w-5 h-5" />}
            {saved ? 'Salvo com Sucesso' : 'Salvar Perfil'}
          </button>
        </div>
      </div>
    </div>
  );
}
