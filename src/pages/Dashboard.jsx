import React from 'react';
import { useAuth } from '../context/AuthContext';
import {
    LucideUser,
    LucideHistory,
    LucideSettings,
    LucideShieldCheck,
    LucideGlobe,
    LucideMapPin
} from 'lucide-react';
import { motion } from 'framer-motion';

const Dashboard = () => {
    const { user } = useAuth();

    return (
        <div className="min-h-screen container mx-auto px-4 md:px-6 py-12">
            <div className="flex flex-col md:flex-row gap-12">
                {/* User Info Sidebar */}
                <div className="w-full md:w-80 space-y-8">
                    <div className="premium-card p-10 text-center relative overflow-hidden group">
                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-violet-500" />
                        <div className="mx-auto w-24 h-24 rounded-full bg-primary/10 border-4 border-white/5 flex items-center justify-center mb-6 relative z-10">
                            <LucideUser className="text-primary" size={48} />
                        </div>
                        <h2 className="text-xl font-black mb-1 relative z-10">Active Member</h2>
                        <p className="text-sm text-muted-foreground font-black uppercase tracking-widest break-all relative z-10">{user?.email}</p>

                        <div className="mt-8 pt-8 border-t border-white/5 space-y-4 text-left relative z-10">
                            <div className="flex items-center gap-3 text-xs font-bold text-muted-foreground">
                                <LucideShieldCheck size={14} className="text-emerald-500" /> Verified Network Entry
                            </div>
                            <div className="flex items-center gap-3 text-xs font-bold text-muted-foreground">
                                <LucideGlobe size={14} className="text-blue-500" /> Member since {new Date().getFullYear()}
                            </div>
                        </div>

                        {/* Aesthetic element */}
                        <div className="absolute -bottom-10 -right-10 w-24 h-24 bg-primary/20 blur-[60px] rounded-full group-hover:scale-150 transition-transform duration-700" />
                    </div>

                    <div className="premium-card p-6 space-y-2">
                        <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl bg-primary text-white font-bold group">
                            <LucideHistory size={18} /> Booking Manifest
                        </button>
                        <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/5 text-muted-foreground hover:text-foreground font-bold transition-all transition-colors">
                            <LucideSettings size={18} /> Access Protocols
                        </button>
                    </div>
                </div>

                {/* Main Content Area */}
                <div className="flex-1 space-y-12">
                    <section>
                        <h3 className="text-3xl font-black tracking-tight mb-8">Travel <span className="text-gradient">Manifest</span></h3>

                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="premium-card p-16 text-center border-dashed border-white/10"
                        >
                            <LucideHistory className="mx-auto text-muted-foreground/20 mb-6" size={64} />
                            <h4 className="text-2xl font-black mb-2 opacity-60">No Recorded Journeys</h4>
                            <p className="text-muted-foreground max-w-sm mx-auto font-medium">
                                Your journey history will appear here once you initiate bookings through our partners.
                            </p>
                            <button className="mt-10 btn-primary">Plan New Trip</button>
                        </motion.div>
                    </section>

                    <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="premium-card p-8">
                            <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-6">
                                <LucideMapPin size={20} />
                            </div>
                            <h4 className="text-xl font-black mb-2">Saved Junctions</h4>
                            <p className="text-muted-foreground text-sm font-medium">Quickly access routes you frequent most in our network.</p>
                        </div>
                        <div className="premium-card p-8 opacity-40">
                            <div className="w-10 h-10 rounded-xl bg-white/5 text-white flex items-center justify-center mb-6">
                                <LucideSettings size={20} />
                            </div>
                            <h4 className="text-xl font-black mb-2">Network Preferences</h4>
                            <p className="text-muted-foreground text-sm font-medium">Tailor how TransitEase fetches transport data for you.</p>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
