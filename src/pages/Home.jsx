import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    LucideTrain,
    LucideBus,
    LucidePlane,
    LucideCar,
    LucideSearch,
    LucideMapPin,
    LucideCalendar,
    LucideArrowRightLeft,
    LucideTrendingUp
} from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '../utils/cn';

const TRANSPORT_TYPES = [
    { id: 'Train', icon: LucideTrain, label: 'Trains' },
    { id: 'Bus', icon: LucideBus, label: 'Buses' },
    { id: 'Flight', icon: LucidePlane, label: 'Flights' },
    { id: 'Car', icon: LucideCar, label: 'Cars' },
];

const Home = () => {
    const navigate = useNavigate();
    const [selectedType, setSelectedType] = useState('Train');
    const [formData, setFormData] = useState({
        from: '',
        to: '',
        date: new Date().toISOString().split('T')[0],
    });

    const handleSearch = (e) => {
        e.preventDefault();
        const params = new URLSearchParams({
            ...formData,
            type: selectedType
        });
        navigate(`/results?${params.toString()}`);
    };

    return (
        <div className="relative min-h-screen">
            {/* Hero Background with Gradient & Blur */}
            <div className="absolute inset-x-0 -top-20 -z-10 h-[600px] overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-primary/10 via-background/80 to-background" />
                <div className="absolute top-1/4 -left-1/4 h-[500px] w-[500px] rounded-full bg-primary/20 blur-[120px] animate-pulse" />
                <div className="absolute top-1/3 -right-1/4 h-[500px] w-[500px] rounded-full bg-violet-500/10 blur-[120px]" />
            </div>

            <main className="container mx-auto px-4 md:px-6 pt-16 pb-32">
                {/* Hero Section Content */}
                <section className="text-center max-w-4xl mx-auto mb-16">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-widest mb-6 border border-primary/20">
                            <LucideTrendingUp size={14} /> Simplified Travel Planning
                        </span>
                        <h1 className="text-5xl md:text-7xl font-black tracking-tight mb-8 leading-[1.1]">
                            Escape the ordinary. <br />
                            Find your <span className="text-gradient">ideal journey.</span>
                        </h1>
                        <p className="text-xl text-muted-foreground mb-12 max-w-2xl mx-auto font-medium">
                            Your multi-transport aggregator for trains, buses, flights, and cars. Compare, choose, and travel with ease.
                        </p>
                    </motion.div>

                    {/* Search Card Container */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.2, duration: 0.5 }}
                        className="premium-card p-6 md:p-10 shadow-2xl relative z-10"
                    >
                        {/* Tabs */}
                        <div className="flex flex-wrap items-center justify-center gap-4 mb-10 border-b border-white/10 pb-6">
                            {TRANSPORT_TYPES.map(({ id, icon: Icon, label }) => (
                                <button
                                    key={id}
                                    onClick={() => setSelectedType(id)}
                                    className={cn(
                                        "group relative flex items-center gap-2 px-6 py-3 rounded-xl transition-all font-bold text-sm",
                                        selectedType === id
                                            ? "bg-primary text-white shadow-lg shadow-primary/30"
                                            : "text-muted-foreground hover:bg-white/5 hover:text-foreground"
                                    )}
                                >
                                    <Icon size={18} className={cn(selectedType === id ? "animate-bounce" : "group-hover:scale-110 transition-transform")} />
                                    {label}
                                    {selectedType === id && (
                                        <motion.div
                                            layoutId="activeTab"
                                            className="absolute inset-0 bg-primary/10 -z-10 rounded-xl"
                                            transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                        />
                                    )}
                                </button>
                            ))}
                        </div>

                        {/* Inputs Grid */}
                        <form onSubmit={handleSearch} className="grid grid-cols-1 md:grid-cols-4 gap-6 items-end">
                            <div className="space-y-3 text-left">
                                <label className="text-xs font-bold uppercase tracking-widest opacity-60 flex items-center gap-2 pl-1">
                                    <LucideMapPin size={14} /> Origin
                                </label>
                                <div className="relative group">
                                    <input
                                        type="text"
                                        required
                                        placeholder="Where from?"
                                        className="w-full bg-black/10 dark:bg-white/5 border border-white/10 rounded-xl px-4 py-4 focus:ring-2 ring-primary/40 outline-none transition-all placeholder:font-medium font-bold text-lg"
                                        value={formData.from}
                                        onChange={(e) => setFormData({ ...formData, from: e.target.value })}
                                    />
                                </div>
                            </div>

                            <div className="hidden md:flex items-center justify-center pb-4 opacity-40 hover:opacity-100 transition-opacity cursor-pointer">
                                <LucideArrowRightLeft className="text-primary" size={24} />
                            </div>

                            <div className="space-y-3 text-left">
                                <label className="text-xs font-bold uppercase tracking-widest opacity-60 flex items-center gap-2 pl-1">
                                    <LucideMapPin size={14} /> Destination
                                </label>
                                <input
                                    type="text"
                                    required
                                    placeholder="Where to?"
                                    className="w-full bg-black/10 dark:bg-white/5 border border-white/10 rounded-xl px-4 py-4 focus:ring-2 ring-primary/40 outline-none transition-all placeholder:font-medium font-bold text-lg"
                                    value={formData.to}
                                    onChange={(e) => setFormData({ ...formData, to: e.target.value })}
                                />
                            </div>

                            <div className="space-y-3 text-left">
                                <label className="text-xs font-bold uppercase tracking-widest opacity-60 flex items-center gap-2 pl-1">
                                    <LucideCalendar size={14} /> Travel Date
                                </label>
                                <input
                                    type="date"
                                    required
                                    className="w-full bg-black/10 dark:bg-white/5 border border-white/10 rounded-xl px-4 py-4 focus:ring-2 ring-primary/40 outline-none transition-all font-bold text-lg"
                                    value={formData.date}
                                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                                />
                            </div>

                            <div className="md:col-span-4 mt-6">
                                <button
                                    type="submit"
                                    className="w-full md:w-auto px-12 py-5 btn-primary text-lg flex items-center justify-center gap-3 mx-auto"
                                >
                                    <LucideSearch className="w-5 h-5" />
                                    Search Journeys
                                </button>
                            </div>
                        </form>
                    </motion.div>
                </section>

                {/* Feature Highlights */}
                <section className="grid md:grid-cols-3 gap-8 mt-24">
                    <FeatureCard
                        title="Aggregated Booking"
                        desc="One interface, all transport modes. We save you from hopping between multiple browser tabs."
                    />
                    <FeatureCard
                        title="Real-time Updates"
                        desc="Get live price fluctuations and seat availability notifications as they happen on partner sites."
                    />
                    <FeatureCard
                        title="Zero Internal Fees"
                        desc="We provide the search service for free. You book directly on the provider's official portal."
                    />
                </section>
            </main>
        </div>
    );
};

const FeatureCard = ({ title, desc }) => (
    <div className="p-8 rounded-2xl bg-white/5 border border-white/5 hover:border-primary/20 transition-all group">
        <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
            <div className="w-3 h-3 rounded-full bg-primary" />
        </div>
        <h3 className="text-2xl font-black mb-4 group-hover:text-primary transition-colors">{title}</h3>
        <p className="text-muted-foreground leading-relaxed font-medium">{desc}</p>
    </div>
);

export default Home;
