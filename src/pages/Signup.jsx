import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth } from '../firebase/config';
import {
    LucideMail,
    LucideLock,
    LucideCompass,
    LucideArrowRight,
    LucideShieldCheck,
    LucideAlertTriangle,
    LucideUserCircle
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Signup = () => {
    const [formData, setFormData] = useState({ email: '', password: '', confirmPassword: '' });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        if (formData.password !== formData.confirmPassword) {
            setError("Passphrases do not match. Verification failed.");
            setLoading(false);
            return;
        }

        try {
            await createUserWithEmailAndPassword(auth, formData.email, formData.password);
            navigate('/dashboard');
        } catch (err) {
            console.error('Signup error:', err);
            setError(err.message || 'Verification process failed. Network error.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen container mx-auto flex items-center justify-center px-4 py-20 pb-40">
            <div className="flex flex-col lg:flex-row-reverse w-full max-w-5xl premium-card overflow-hidden shadow-[0_50px_100px_-20px_rgba(59,130,246,0.25)]">
                {/* Visual Side */}
                <div className="lg:w-1/2 p-12 bg-gradient-to-br from-violet-600 to-primary flex flex-col justify-between relative overflow-hidden text-white">
                    <div className="absolute inset-0 opacity-10 pointer-events-none bg-[radial-gradient(circle_at_2px_2px,rgba(255,255,255,0.15)_1px,transparent_0)] [background-size:32px_32px]" />
                    <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-white/20 blur-[100px] rounded-full" />

                    <Link to="/" className="flex items-center space-x-2 relative z-10 self-end lg:self-start">
                        <div className="bg-white/20 p-2 rounded-xl backdrop-blur-md border border-white/20 hover:scale-110 transition-transform">
                            <LucideCompass className="text-white w-8 h-8 rotate-45" />
                        </div>
                        <span className="text-3xl font-black tracking-tighter">TransitEase</span>
                    </Link>

                    <div className="relative z-10 space-y-6">
                        <h2 className="text-4xl md:text-5xl font-black leading-tight italic">Initiate your <br />global travel identity.</h2>
                        <div className="flex items-center gap-4 text-sm font-bold opacity-80 uppercase tracking-widest pl-1">
                            <LucideShieldCheck size={20} /> Encrypted Session Active
                        </div>
                    </div>

                    <div className="text-xs font-black uppercase tracking-[0.3em] opacity-40 relative z-10 text-right lg:text-left">
                        TransitEase Digital Engine v2.0
                    </div>
                </div>

                {/* Form Side */}
                <div className="lg:w-1/2 p-10 md:p-16 space-y-12">
                    <div>
                        <h3 className="text-4xl font-black tracking-tight mb-4">Request <span className="text-gradient">Access</span></h3>
                        <p className="text-muted-foreground font-medium">Join our network for direct booking access.</p>
                    </div>

                    <AnimatePresence mode="wait">
                        {error && (
                            <motion.div
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                className="p-5 bg-destructive/10 border border-destructive/20 text-destructive text-sm font-bold flex items-center gap-4 rounded-2xl"
                            >
                                <LucideAlertTriangle className="shrink-0" /> {error}
                            </motion.div>
                        )}
                    </AnimatePresence>

                    <form onSubmit={handleSubmit} className="space-y-8">
                        <div className="space-y-4">
                            <label className="text-[10px] font-black uppercase tracking-widest opacity-40 pl-1">Preferred Email</label>
                            <div className="relative group">
                                <LucideMail className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-primary transition-colors" size={20} />
                                <input
                                    type="email"
                                    required
                                    placeholder="Enter your email"
                                    className="w-full bg-black/10 dark:bg-white/5 border border-white/10 rounded-2xl pl-12 pr-4 py-5 outline-none focus:ring-2 ring-primary/40 font-bold transition-all"
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                />
                            </div>
                        </div>

                        <div className="space-y-4">
                            <label className="text-[10px] font-black uppercase tracking-widest opacity-40 pl-1">Security Phrase</label>
                            <div className="relative group">
                                <LucideLock className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-primary transition-colors" size={20} />
                                <input
                                    type="password"
                                    required
                                    placeholder="••••••••"
                                    className="w-full bg-black/10 dark:bg-white/5 border border-white/10 rounded-2xl pl-12 pr-4 py-5 outline-none focus:ring-2 ring-primary/40 font-bold transition-all"
                                    value={formData.password}
                                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                />
                            </div>
                        </div>

                        <div className="space-y-4">
                            <label className="text-[10px] font-black uppercase tracking-widest opacity-40 pl-1">Confirm Security Phrase</label>
                            <div className="relative group">
                                <LucideLock className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-primary transition-colors" size={20} />
                                <input
                                    type="password"
                                    required
                                    placeholder="••••••••"
                                    className="w-full bg-black/10 dark:bg-white/5 border border-white/10 rounded-2xl pl-12 pr-4 py-5 outline-none focus:ring-2 ring-primary/40 font-bold transition-all"
                                    value={formData.confirmPassword}
                                    onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full btn-primary !py-5 font-black uppercase tracking-widest text-lg flex items-center justify-center gap-3 transition-all hover:-translate-y-1 shadow-2xl shadow-primary/30"
                        >
                            {loading ? (
                                <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: "linear" }}>
                                    <LucideCompass size={24} />
                                </motion.div>
                            ) : (
                                <>
                                    Establish Account
                                    <LucideArrowRight size={20} />
                                </>
                            )}
                        </button>
                    </form>

                    <div className="text-center pt-8 border-t border-white/5">
                        <p className="text-muted-foreground font-medium mb-2">Already a member of our network?</p>
                        <Link to="/login" className="text-primary font-black uppercase text-xs tracking-[0.2em] hover:underline">Re-establish Login session</Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Signup;
