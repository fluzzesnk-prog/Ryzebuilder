
import React, { useState } from 'react';
import { X, Copy, Check, Database, Code, Rocket, ExternalLink, Lightbulb, Globe, FileCode, CloudUpload, Download } from 'lucide-react';
import { Button } from './ui/button';
import { cn } from '../lib/utils';

interface PublishModalProps {
  html: string;
  onClose: () => void;
}

const PublishModal: React.FC<PublishModalProps> = ({ html, onClose }) => {
  const [copied, setCopied] = useState(false);
  const [showGuide, setShowGuide] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(html);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const blob = new Blob([html], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'index.html';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-6 bg-background/90 backdrop-blur-xl animate-in fade-in duration-300">
      <div className="bg-card w-full max-w-4xl max-h-[90vh] rounded-3xl border border-white/10 shadow-[0_0_100px_rgba(0,0,0,0.8)] flex flex-col overflow-hidden">
        
        {/* Header */}
        <div className="p-6 border-b border-white/5 flex items-center justify-between bg-white/[0.02]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center border border-primary/20">
              <Rocket className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white tracking-tight">Publicar Projeto</h2>
              <p className="text-xs text-neutral-500 font-medium">Seu site pronto para ser lançado.</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-white/5 rounded-full text-neutral-500 hover:text-white transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-10 custom-scrollbar">
          
          {/* Step-by-Step Launch Guide */}
          <div className="space-y-6">
            <div className="flex items-center gap-2">
              <label className="text-xs font-bold uppercase tracking-[0.2em] text-primary/70 flex items-center gap-2">
                <Globe className="w-3 h-3" />
                Passo a passo para publicação
              </label>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 bg-white/[0.02] border border-white/5 rounded-2xl space-y-3">
                <div className="w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center">
                  <Download className="w-4 h-4 text-blue-400" />
                </div>
                <h4 className="text-sm font-bold text-white">1. Baixe o Arquivo</h4>
                <p className="text-xs text-neutral-500 leading-relaxed">
                  Clique no botão de download abaixo para baixar o seu site como um arquivo <code className="text-primary/80">index.html</code>.
                </p>
              </div>

              <div className="p-4 bg-white/[0.02] border border-white/5 rounded-2xl space-y-3">
                <div className="w-8 h-8 rounded-lg bg-purple-500/10 flex items-center justify-center">
                  <CloudUpload className="w-4 h-4 text-purple-400" />
                </div>
                <h4 className="text-sm font-bold text-white">2. Hospede Grátis</h4>
                <p className="text-xs text-neutral-500 leading-relaxed">
                  Arraste o arquivo baixado para o <a href="https://app.netlify.com/drop" target="_blank" className="text-primary hover:underline inline-flex items-center gap-0.5 font-bold">Netlify Drop <ExternalLink className="w-2 h-2" /></a>.
                </p>
              </div>

              <div className="p-4 bg-white/[0.02] border border-white/5 rounded-2xl space-y-3">
                <div className="w-8 h-8 rounded-lg bg-green-500/10 flex items-center justify-center">
                  <Rocket className="w-4 h-4 text-green-400" />
                </div>
                <h4 className="text-sm font-bold text-white">3. Link ao vivo</h4>
                <p className="text-xs text-neutral-500 leading-relaxed">
                  Em segundos você terá uma URL pública. Para sites mais complexos, use <a href="https://vercel.com" target="_blank" className="text-primary hover:underline">Vercel</a>.
                </p>
              </div>
            </div>
          </div>

          {/* Export Actions */}
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row gap-3">
              <button 
                onClick={handleDownload}
                className="flex-1 flex items-center justify-center gap-2 px-6 py-4 bg-primary text-background rounded-2xl font-bold uppercase tracking-widest text-xs hover:scale-[1.02] active:scale-95 transition-all shadow-lg shadow-primary/20"
              >
                <Download className="w-4 h-4" />
                Baixar index.html
              </button>
              
              <button 
                onClick={handleCopy}
                className="flex-1 flex items-center justify-center gap-2 px-6 py-4 bg-white/5 border border-white/10 text-white rounded-2xl font-bold uppercase tracking-widest text-xs hover:bg-white/10 transition-all"
              >
                {copied ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
                {copied ? 'Código Copiado' : 'Copiar código HTML'}
              </button>
            </div>

            <div className="relative group">
              <div className="flex items-center justify-between mb-2">
                <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-neutral-500 flex items-center gap-2">
                  <Code className="w-3 h-3" />
                  Preview do Código
                </label>
              </div>
              <pre className="w-full bg-black/60 border border-white/5 rounded-2xl p-6 text-sm font-mono text-neutral-500 overflow-x-auto max-h-[200px] leading-relaxed custom-scrollbar">
                {html}
              </pre>
            </div>
          </div>

          {/* Database Guide Toggle */}
          <div className="pt-4 border-t border-white/5">
            <Button
              onClick={() => setShowGuide(!showGuide)}
              className={cn(
                "w-full h-auto py-6 rounded-2xl flex flex-col items-center gap-2 transition-all border shadow-none",
                showGuide 
                  ? "bg-primary/5 border-primary/30 text-primary" 
                  : "bg-white/[0.02] border-white/5 hover:border-white/20 text-white"
              )}
            >
              <Database className={cn("w-6 h-6 transition-transform duration-500", showGuide && "rotate-12")} />
              <span className="font-bold tracking-tight">Precisa de Banco de Dados?</span>
              <span className="text-[10px] uppercase tracking-widest opacity-50 font-bold">Veja como conectar formulários</span>
            </Button>

            {/* The Step-by-Step Guide */}
            {showGuide && (
              <div className="mt-6 p-6 bg-white/[0.01] border border-white/5 rounded-2xl animate-in slide-in-from-top-4 duration-500">
                <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
                  <Lightbulb className="w-5 h-5 text-yellow-500" />
                  Integração Simples com Supabase
                </h3>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="flex gap-4">
                      <div className="w-6 h-6 rounded-full bg-primary/20 text-primary text-[10px] flex items-center justify-center shrink-0 font-bold mt-1">1</div>
                      <p className="text-sm text-neutral-400">Crie um projeto no <a href="https://supabase.com" target="_blank" className="text-primary hover:underline">Supabase</a>.</p>
                    </div>
                    <div className="flex gap-4">
                      <div className="w-6 h-6 rounded-full bg-primary/20 text-primary text-[10px] flex items-center justify-center shrink-0 font-bold mt-1">2</div>
                      <p className="text-sm text-neutral-400">Insira as chaves de API no script abaixo.</p>
                    </div>
                  </div>
                  
                  <div className="bg-black/40 p-4 rounded-xl border border-white/5">
                    <pre className="text-[10px] text-primary/80 leading-tight overflow-x-auto">
{`<script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2"></script>
<script>
  const supabase = supabase.createClient('URL', 'KEY')
</script>`}
                    </pre>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 bg-white/[0.02] border-t border-white/5 flex items-center justify-center">
          <p className="text-[10px] text-neutral-600 font-bold uppercase tracking-[0.3em]">
            Ryze Engine • Exportação via Iframe Habilitada
          </p>
        </div>
      </div>
    </div>
  );
};

export default PublishModal;
