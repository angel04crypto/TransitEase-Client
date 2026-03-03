import React from 'react';
import {
    LucideTrain,
    LucideBus,
    LucidePlane,
    LucideCar,
    LucideClock,
    LucideMapPin,
    LucideUser,
    LucideStar
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const TransportCard = ({ transport }) => {
    const navigate = useNavigate();

    const icons = {
        train: LucideTrain,
        bus: LucideBus,
        flight: LucidePlane,
        car: LucideCar,
    };

    const Icon = icons[transport.type.toLowerCase()] || LucideTrain;

    const handleBook = (e) => {
        e.stopPropagation();
        navigate(`/details/${transport._id}`);
    };

    return (
        <motion.div
            layout
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.01, boxShadow: '0 20px 40px -20px rgba(59, 130, 246, 0.2)' }}
            className="premium-card p-6 md:p-8 cursor-pointer group active:scale-95 transition-all overflow-hidden"
            onClick={() => navigate(`/details/${transport._id}`)}
        >
            <div className="flex flex-col md:flex-row gap-8 items-center">
                {/* Left side: Provider Info */}
                <div className="flex flex-col items-center md:items-start gap-4 w-full md:w-1/4 shrink-0">
                    <div className="p-4 rounded-2xl bg-primary/10 text-primary border border-primary/20 group-hover:rotate-12 transition-transform">
                        <Icon size={32} strokeWidth={2.5} />
                    </div>
                    <div className="text-center md:text-left">
                        <h4 className="text-2xl font-black tracking-tight">{transport.provider}</h4>
                        <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest bg-muted px-2 py-0.5 rounded-full inline-block mt-1">
                            {transport.vehicleNumber}
                        </p>
                    </div>
                </div>

                {/* Center: Journey Details */}
                <div className="flex-1 flex flex-col md:flex-row items-center justify-between w-full border-y md:border-y-0 md:border-x border-white/10 py-6 md:py-0 md:px-10 gap-6 md:gap-0">
                    <div className="text-center md:text-left">
                        <p className="text-3xl font-black leading-none mb-1">{transport.departureTime}</p>
                        <p className="text-sm font-bold text-muted-foreground">{transport.source}</p>
                    </div>

                    <div className="flex flex-col items-center gap-2 flex-grow max-w-[200px] w-full">
                        <p className="text-xs font-black text-muted-foreground">{transport.duration}</p>
                        <div className="relative flex items-center justify-center w-full">
                            <div className="h-0.5 w-full bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
                            <div className="absolute w-2 h-2 rounded-full bg-primary" />
                        </div>
                        <p className="text-[10px] font-black tracking-widest uppercase opacity-40">Direct Journey</p>
                    </div>

                    <div className="text-center md:text-right">
                        <p className="text-3xl font-black leading-none mb-1">{transport.arrivalTime}</p>
                        <p className="text-sm font-bold text-muted-foreground">{transport.destination}</p>
                    </div>
                </div>

                {/* Right side: Pricing & Actions */}
                <div className="flex flex-col items-center md:items-end justify-between w-full md:w-1/5 shrink-0 gap-6">
                    <div className="text-center md:text-right">
                        <p className="text-sm font-bold text-muted-foreground mb-1">Total Fare</p>
                        <p className="text-4xl font-black text-gradient leading-none tracking-tighter">₹{transport.price}</p>
                    </div>

                    <div className="flex flex-col gap-2 w-full">
                        <div className="flex items-center justify-center md:justify-end gap-1.5 text-xs font-bold text-emerald-500">
                            <LucideUser size={14} /> {transport.seatsAvailable} seats left
                        </div>
                        <button
                            onClick={handleBook}
                            className="w-full btn-primary !py-3 font-black uppercase text-sm tracking-widest shadow-xl shadow-primary/20 hover:-translate-y-1 active:translate-y-0 transition-transform"
                        >
                            Select Seats
                        </button>
                    </div>
                </div>
            </div>

            {/* Quick Ratings & Amenities footer */}
            <div className="mt-8 pt-6 border-t border-white/5 flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-4 text-xs font-black tracking-widest uppercase opacity-40">
                    <div className="flex items-center gap-1.5"><LucideStar className="text-yellow-500 fill-yellow-500" size={14} /> {transport.rating} Rating</div>
                    <span>•</span>
                    <div>{transport.amenities?.slice(0, 3).join(' • ')}</div>
                </div>
                <div className="text-[10px] font-black tracking-widest uppercase text-muted-foreground">
                    Operated by {transport.provider} Authorized
                </div>
            </div>
        </motion.div>
    );
};

export default TransportCard;
