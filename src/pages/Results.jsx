import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import api from '../services/api';
import TransportCard from '../components/TransportCard';
import FiltersSidebar from '../components/FiltersSidebar';
import Loader from '../components/Loader';
import {
    LucideAlertCircle,
    LucideSearch,
    LucideArrowRight,
    LucideRefreshCw
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Results = () => {
    const [searchParams] = useSearchParams();
    const [transports, setTransports] = useState([]);
    const [filteredTransports, setFilteredTransports] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [filters, setFilters] = useState({
        priceRange: [0, 10000],
        departureTime: 'any',
        rating: 0,
        transportType: searchParams.get('type') || 'any',
        sort: 'price-low'
    });

    const fetchData = async () => {
        setLoading(true);
        setError(null);
        try {
            const query = {
                type: searchParams.get('type')?.toLowerCase(),
                source: searchParams.get('from'),
                destination: searchParams.get('to'),
                date: searchParams.get('date'),
                minPrice: filters.priceRange[0],
                maxPrice: filters.priceRange[1],
                minRating: filters.rating,
                sortBy: filters.sort === 'price-low' ? 'price_asc' :
                    filters.sort === 'price-high' ? 'price_desc' :
                        filters.sort === 'rating-high' ? 'rating_desc' :
                            filters.sort === 'duration-asc' ? 'duration_asc' : 'newest'
            };
            const response = await api.get('/transports', { params: query });
            setTransports(response.data);
            setFilteredTransports(response.data);
        } catch (err) {
            console.error('Error fetching transports:', err);
            setError('Failed to fetch journeys. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, [searchParams]);

    useEffect(() => {
        let results = [...transports];

        // Apply Price Filter
        results = results.filter(t => t.price <= filters.priceRange[1]);

        // Apply Time Filter
        if (filters.departureTime !== 'any') {
            results = results.filter(t => {
                const hour = parseInt(t.departureTime.split(':')[0]);
                if (filters.departureTime === 'morning') return hour >= 5 && hour < 12;
                if (filters.departureTime === 'afternoon') return hour >= 12 && hour < 18;
                if (filters.departureTime === 'night') return hour >= 18 || hour < 5;
                return true;
            });
        }

        // Apply Rating Filter
        if (filters.rating > 0) {
            results = results.filter(t => t.rating >= filters.rating);
        }

        // Apply Sorting
        results.sort((a, b) => {
            if (filters.sort === 'price-low') return a.price - b.price;
            if (filters.sort === 'price-high') return b.price - a.price;
            if (filters.sort === 'rating-high') return b.rating - a.rating;
            if (filters.sort === 'departure-early') return a.departureTime.localeCompare(b.departureTime);
            return 0;
        });

        setFilteredTransports(results);
    }, [filters, transports]);

    return (
        <div className="min-h-screen container mx-auto px-4 md:px-6 py-12">
            {/* Results Header */}
            <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-16">
                <div>
                    <h2 className="text-4xl md:text-5xl font-black tracking-tight mb-2">Available <span className="text-gradient">Journeys</span></h2>
                    <p className="text-muted-foreground font-black uppercase text-xs tracking-[0.2em] flex items-center gap-2">
                        {searchParams.get('from')} <LucideArrowRight size={14} className="text-primary" /> {searchParams.get('to')}
                        <span className="opacity-40">•</span> {searchParams.get('date')}
                    </p>
                </div>
                <button
                    onClick={fetchData}
                    className="p-4 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all text-muted-foreground hover:text-primary active:rotate-180"
                    title="Reload Results"
                >
                    <LucideRefreshCw size={24} />
                </button>
            </div>

            <div className="flex flex-col lg:flex-row gap-12">
                {/* Filters Sidebar */}
                <FiltersSidebar filters={filters} setFilters={setFilters} />

                {/* Main Content Area */}
                <div className="flex-1 min-w-0">
                    <AnimatePresence mode="wait">
                        {loading ? (
                            <motion.div
                                key="loader"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="space-y-6"
                            >
                                {[1, 2, 3].map(i => (
                                    <div key={i} className="premium-card p-10 h-64 animate-pulse pointer-events-none opacity-40 overflow-hidden relative">
                                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent skew-x-12 translate-x-full animate-shimmer" />
                                        <div className="h-8 w-48 bg-white/10 rounded-xl mb-6" />
                                        <div className="h-20 w-full bg-white/5 rounded-2xl" />
                                    </div>
                                ))}
                            </motion.div>
                        ) : error ? (
                            <motion.div
                                key="error"
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="premium-card p-16 text-center"
                            >
                                <LucideAlertCircle className="mx-auto text-destructive mb-6" size={64} />
                                <h3 className="text-3xl font-black mb-4">Connection Failed</h3>
                                <p className="text-muted-foreground text-lg mb-8 max-w-md mx-auto">{error}</p>
                                <button onClick={fetchData} className="btn-primary">Try Connecting Again</button>
                            </motion.div>
                        ) : filteredTransports.length === 0 ? (
                            <motion.div
                                key="empty"
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="premium-card p-24 text-center border-dashed border-white/10"
                            >
                                <LucideSearch className="mx-auto text-muted-foreground/20 mb-8" size={80} />
                                <h3 className="text-3xl font-black mb-4 opacity-80">Route Not Found</h3>
                                <p className="text-muted-foreground text-lg mb-10 max-w-sm mx-auto font-medium">
                                    We couldn't find any journeys for this specific search. <br />Try adjusting your filters or destination.
                                </p>
                                <button onClick={() => setFilters({
                                    priceRange: [0, 10000],
                                    departureTime: 'any',
                                    rating: 0,
                                    transportType: 'any',
                                    sort: 'price-low'
                                })} className="text-primary font-black uppercase text-sm tracking-widest hover:underline">
                                    Reset All Active Filters
                                </button>
                            </motion.div>
                        ) : (
                            <motion.div
                                key="list"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="space-y-8"
                            >
                                {filteredTransports.map((transport) => (
                                    <TransportCard key={transport._id} transport={transport} />
                                ))}

                                <div className="p-8 text-center text-xs font-black tracking-widest uppercase opacity-20 mt-12">
                                    End of Available Listings for This Network
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
};

export default Results;
