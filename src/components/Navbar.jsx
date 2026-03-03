import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from "../context/AuthContext";
import { LucideCompass, LucideUser, LucideLogOut, LucideChevronDown } from 'lucide-react';

const Navbar = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await logout();
            navigate('/login');
        } catch (error) {
            console.error('Logout failed:', error);
        }
    };

    return (
        <nav className="sticky top-0 z-50 w-full glass-morphism border-b bg-white/70 dark:bg-black/70 py-3">
            <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
                <Link to="/" className="flex items-center space-x-2 group">
                    <div className="bg-primary p-2 rounded-xl group-hover:rotate-12 transition-transform">
                        <LucideCompass className="text-white w-6 h-6" />
                    </div>
                    <span className="text-2xl font-black tracking-tighter text-gradient leading-none">
                        TransitEase
                    </span>
                </Link>

                <div className="hidden md:flex items-center space-x-8 font-medium">
                    <Link to="/results" className="hover:text-primary transition-colors">Find Transport</Link>
                    <Link to="/about" className="hover:text-primary transition-colors">Our Network</Link>
                    <Link to="/support" className="hover:text-primary transition-colors">Support</Link>
                </div>

                <div className="flex items-center space-x-4">
                    {user ? (
                        <div className="flex items-center space-x-4">
                            <Link to="/dashboard" className="flex items-center space-x-2 p-2 rounded-xl hover:bg-black/5 dark:hover:bg-white/5 transition-colors group">
                                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-violet-500 flex items-center justify-center text-white text-xs font-bold ring-2 ring-white dark:ring-black">
                                    {user.email?.[0].toUpperCase()}
                                </div>
                                <span className="hidden sm:block text-sm font-semibold max-w-[100px] truncate">{user.email}</span>
                            </Link>
                            <button
                                onClick={handleLogout}
                                className="p-2 rounded-xl text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-all"
                                title="Log Out"
                            >
                                <LucideLogOut size={20} />
                            </button>
                        </div>
                    ) : (
                        <div className="flex items-center space-x-2">
                            <Link to="/login" className="px-4 py-2 text-sm font-semibold hover:text-primary transition-colors">Login</Link>
                            <Link to="/signup" className="btn-primary flex items-center gap-2">
                                <LucideUser size={18} />
                                Start Now
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
