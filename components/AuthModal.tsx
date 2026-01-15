
import React, { useState } from 'react';
import { supabase } from '../lib/supabase';
import { X, Mail, Lock, Loader2, ArrowRight, Github, Sparkles } from 'lucide-react';
import { cn } from '../lib/utils';
import { useAuth } from '../contexts/AuthContext';


interface AuthModalProps {
    onClose?: () => void;
    isFullPage?: boolean;
}

const AuthModal: React.FC<AuthModalProps> = ({ onClose, isFullPage }) => {
    const [isSignUp, setIsSignUp] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');

    const handleAuth = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setMessage('');

        try {
            if (isSignUp) {
                const { error } = await supabase.auth.signUp({
                    email,
                    password,
                });
                if (error) throw error;
                setMessage('Verifique seu e-mail para confirmar o cadastro!');
            } else {
                const { error } = await supabase.auth.signInWithPassword({
                    email,
                    password,
                });
                if (error) throw error;
                if (onClose) onClose();
            }
        } catch (err: any) {
            setError(err.message || 'Ocorreu um erro na autenticação.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={cn(
            "inset-0 z-[60] flex items-center justify-center p-4 animate-in fade-in duration-500",
            isFullPage ? "fixed bg-[#030303]" : "fixed bg-black/80 backdrop-blur-sm"
        )}>
            {/* Background Glows for Full Page */}
            {isFullPage && (
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <div className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] bg-primary/10 rounded-full blur-[140px] animate-pulse" />
                    <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] bg-blue-600/5 rounded-full blur-[140px] animate-pulse delay-700" />

                    {/* Ryze Logo Background decoration */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.02] scale-[2]">
                        <Sparkles className="w-96 h-96 text-primary" />
                    </div>
                </div>
            )}

            <div className="relative w-full max-w-[420px] bg-[#0A0A0A] border border-white/10 rounded-[32px] p-10 shadow-2xl overflow-hidden group">

                {/* Decorative Elements */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:bg-primary/10 transition-all duration-700" />

                {!isFullPage && onClose && (
                    <button
                        onClick={onClose}
                        className="absolute top-6 right-6 p-2 rounded-full hover:bg-white/5 text-neutral-400 hover:text-white transition-colors"
                    >
                        <X className="w-5 h-5" />
                    </button>
                )}

                <div className="relative space-y-8">
                    <div className="text-center space-y-4">
                        <div className="inline-flex items-center justify-center w-14 h-14 bg-primary/10 rounded-2xl border border-primary/20 mb-2 shadow-inner">
                            <Sparkles className="w-7 h-7 text-primary" />
                        </div>
                        <h2 className="text-3xl font-black text-white tracking-tight">
                            {isSignUp ? 'Criar Conta' : 'Acesse o Ryze'}
                        </h2>
                        <p className="text-sm text-neutral-400 font-medium max-w-[280px] mx-auto leading-relaxed">
                            {isSignUp ? 'Inicie sua jornada na inteligência artificial de elite.' : 'Entre para gerenciar seus projetos e prospectar leads.'}
                        </p>
                    </div>

                    <form onSubmit={handleAuth} className="space-y-5">
                        <div className="space-y-2">
                            <label className="text-[10px] font-black text-neutral-500 uppercase tracking-widest pl-1">E-mail Corporativo</label>
                            <div className="relative group/input">
                                <Mail className="absolute left-4 top-4 w-4 h-4 text-neutral-600 group-focus-within/input:text-primary transition-colors" />
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full bg-white/[0.02] border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-sm text-white focus:border-primary/50 focus:bg-white/[0.04] outline-none transition-all placeholder:text-neutral-800"
                                    placeholder="exemplo@email.com"
                                    required
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-[10px] font-black text-neutral-500 uppercase tracking-widest pl-1">Senha Segura</label>
                            <div className="relative group/input">
                                <Lock className="absolute left-4 top-4 w-4 h-4 text-neutral-600 group-focus-within/input:text-primary transition-colors" />
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full bg-white/[0.02] border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-sm text-white focus:border-primary/50 focus:bg-white/[0.04] outline-none transition-all placeholder:text-neutral-800"
                                    placeholder="••••••••"
                                    required
                                    minLength={6}
                                />
                            </div>
                        </div>

                        {error && (
                            <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-xs text-center font-bold animate-in zoom-in-95 duration-200">
                                {error}
                            </div>
                        )}

                        {message && (
                            <div className="p-4 rounded-xl bg-green-500/10 border border-green-500/20 text-green-400 text-xs text-center font-bold animate-in zoom-in-95 duration-200">
                                {message}
                            </div>
                        )}

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-white text-black font-black py-4 rounded-2xl hover:bg-neutral-100 active:scale-[0.97] transition-all flex items-center justify-center gap-2 group/btn shadow-[0_10px_20px_-10px_rgba(255,255,255,0.2)]"
                        >
                            {loading ? (
                                <Loader2 className="w-5 h-5 animate-spin" />
                            ) : (
                                <>
                                    {isSignUp ? 'Finalizar Cadastro' : 'Entrar na Plataforma'}
                                    <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                                </>
                            )}
                        </button>
                    </form>

                    <div className="relative py-2">
                        <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-white/5"></div></div>
                        <div className="relative flex justify-center text-[10px] uppercase font-black"><span className="bg-[#0A0A0A] px-3 text-neutral-600 tracking-widest">Sincronização Neural</span></div>
                    </div>

                    <div className="text-center">
                        <button
                            onClick={() => { setIsSignUp(!isSignUp); setError(''); setMessage(''); }}
                            className="text-xs text-neutral-500 hover:text-white transition-colors py-2"
                        >
                            {isSignUp ? 'Já possui acesso? ' : 'Ainda não é um membro? '}
                            <span className="text-primary font-black hover:underline">{isSignUp ? 'Fazer Login' : 'Solicitar Acesso'}</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AuthModal;
