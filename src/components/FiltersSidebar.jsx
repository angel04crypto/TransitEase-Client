import React from 'react';
import { LucideFilter, LucideStar, LucideClock, LucideTrendingDown } from 'lucide-react';
import { cn } from '../utils/cn';

const FiltersSidebar = ({ filters, setFilters }) => {
    const currentFilters = filters || {
        priceRange: [0, 10000],
        departureTime: 'any',
        rating: 0,
        transportType: 'any',
        sort: 'price-low'
    };

    const handlePriceChange = (e) => {
        setFilters(prev => ({ ...prev, priceRange: [0, parseInt(e.target.value)] }));
    };

    const handleTimeChange = (time) => {
        setFilters(prev => ({ ...prev, departureTime: time }));
    };

    const handleRatingChange = (rating) => {
        setFilters(prev => ({ ...prev, rating }));
    };

    return (
        <aside className="w-full md:w-80 premium-card p-8 h-fit sticky top-28 mb-10 overflow-hidden">
            <div className="flex items-center gap-3 mb-10 border-b border-white/5 pb-6">
                <div className="p-2 rounded-xl bg-primary/10 text-primary border border-primary/20">
                    <LucideFilter size={18} />
                </div>
                <h3 className="text-xl font-black tracking-tight text-gradient">Refine Journey</h3>
            </div>

            <div className="space-y-12">
                {/* Sorting Dropdown (Inside Sidebar for Mobile flow better) */}
                <div className="space-y-4">
                    <label className="text-xs font-black uppercase tracking-widest opacity-60 flex items-center gap-2">
                        <LucideTrendingDown size={14} /> Sort Results
                    </label>
                    <select
                        value={currentFilters.sort}
                        onChange={(e) => setFilters(prev => ({ ...prev, sort: e.target.value }))}
                        className="w-full bg-black/10 dark:bg-white/5 border border-white/10 rounded-xl px-4 py-3 outline-none focus:ring-2 ring-primary/40 font-bold transition-all appearance-none cursor-pointer"
                    >
                        <option value="price-low">Price: Low to High</option>
                        <option value="price-high">Price: High to Low</option>
                        <option value="rating-high">Rating: Highest First</option>
                        <option value="departure-early">Departure: Earliest</option>
                    </select>
                </div>

                {/* Price Ranger */}
                <div className="space-y-6">
                    <div className="flex justify-between items-center">
                        <label className="text-xs font-black uppercase tracking-widest opacity-60">Fare Range</label>
                        <span className="text-sm font-black text-primary">₹{currentFilters.priceRange[1]}</span>
                    </div>
                    <input
                        type="range"
                        min="0"
                        max="10000"
                        step="500"
                        value={currentFilters.priceRange[1]}
                        onChange={handlePriceChange}
                        className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-primary"
                    />
                </div>

                {/* Departure Time Slots */}
                <div className="space-y-4">
                    <label className="text-xs font-black uppercase tracking-widest opacity-60 flex items-center gap-2">
                        <LucideClock size={14} /> Departure Slot
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                        {[
                            { id: 'any', label: 'Anytime' },
                            { id: 'morning', label: 'Morning' },
                            { id: 'afternoon', label: 'Afternoon' },
                            { id: 'night', label: 'Night' }
                        ].map(({ id, label }) => (
                            <button
                                key={id}
                                onClick={() => handleTimeChange(id)}
                                className={cn(
                                    "py-3 rounded-xl border text-xs font-black uppercase tracking-widest transition-all",
                                    currentFilters.departureTime === id
                                        ? "bg-primary border-primary text-white shadow-lg shadow-primary/20"
                                        : "bg-white/5 border-white/5 text-muted-foreground hover:bg-white/10"
                                )}
                            >
                                {label}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Rating Filter */}
                <div className="space-y-4">
                    <label className="text-xs font-black uppercase tracking-widest opacity-60 flex items-center gap-2">
                        <LucideStar size={14} /> Minimum Star
                    </label>
                    <div className="flex gap-2">
                        {[3, 4, 4.5].map((rating) => (
                            <button
                                key={rating}
                                onClick={() => handleRatingChange(rating)}
                                className={cn(
                                    "flex-1 py-3 rounded-xl border text-xs font-black uppercase transition-all flex items-center justify-center gap-1",
                                    currentFilters.rating === rating
                                        ? "bg-primary border-primary text-white"
                                        : "bg-white/5 border-white/5 text-muted-foreground hover:bg-white/10"
                                )}
                            >
                                <LucideStar size={12} className={currentFilters.rating === rating ? "fill-white" : ""} />
                                {rating}+
                            </button>
                        ))}
                    </div>
                </div>

                {/* Reset Filters */}
                <button
                    onClick={() => setFilters({
                        priceRange: [0, 10000],
                        departureTime: 'any',
                        rating: 0,
                        transportType: 'any',
                        sort: 'price-low'
                    })}
                    className="w-full py-4 text-xs font-black uppercase tracking-widest text-muted-foreground hover:text-foreground border border-dashed border-white/10 rounded-xl hover:bg-white/5 transition-all"
                >
                    Reset All Filters
                </button>
            </div>

            {/* Aesthetic Background element */}
            <div className="absolute -bottom-10 -right-10 w-24 h-24 bg-primary/20 blur-[60px] rounded-full pointer-events-none" />
        </aside>
    );
};

export default FiltersSidebar;
