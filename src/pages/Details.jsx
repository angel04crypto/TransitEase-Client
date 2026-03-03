import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../services/api';
import Loader from '../components/Loader';
import {
    LucideArrowLeft,
    LucideCheckCircle,
    LucideAlertCircle,
    LucideExternalLink,
    LucideWifi,
    LucideZap,
    LucideCoffee,
    LucideMonitor,
    LucideStar
} from 'lucide-react';
import { motion } from 'framer-motion';

const AMENITY_ICONS = {
    "Free Wi-Fi": LucideWifi,
    "Charging Port": LucideZap,
    "Meals Provided": LucideCoffee,
    "Entertainment": LucideMonitor,
};

const Details = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [transport, setTransport] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [bookingRequested, setBookingRequested] = useState(false);

    useEffect(() => {
        const fetchDetail = async () => {
            try {
                const response = await api.get(`/transports/${id}`);
                setTransport(response.data);
            } catch (err) {
                console.error('Error fetching details:', err);
                setError('The requested journey details could not be retrieved.');
            } finally {
                setLoading(false);
            }
        };

        fetchDetail();
    }, [id]);

    // ✅ UPDATED BOOKING LOGIC (ONLY THIS WAS CHANGED)
    const handleProceed = async () => {
        try {
            setBookingRequested(true);

            await api.post('/bookings', {
                transportId: transport._id,
                travelDate: new Date().toISOString().split('T')[0],
                price: transport.price
            });

            setTimeout(() => {
                window.open(transport.redirectUrl, '_blank');
            }, 1500);

        } catch (error) {
            console.error("Booking failed:", error);
            alert("Booking failed. Please login and try again.");
            setBookingRequested(false);
        }
    };

    if (loading) return <Loader fullScreen />;

    if (error || !transport) return (
        <div className="min-h-screen flex items-center justify-center container mx-auto px-6">
            <div className="premium-card p-16 text-center max-w-lg">
                <LucideAlertCircle className="mx-auto text-destructive mb-6" size={64} />
                <h3 className="text-3xl font-black mb-4">Journey Not Found</h3>
                <p className="text-muted-foreground text-lg mb-8">
                    {error || "This journey does not exist in our network."}
                </p>
                <button onClick={() => navigate('/results')} className="btn-primary">
                    Return to Results
                </button>
            </div>
        </div>
    );

    return (
        <div className="min-h-screen container mx-auto px-4 md:px-6 py-12">
            <button
                onClick={() => navigate(-1)}
                className="flex items-center gap-2 text-muted-foreground hover:text-primary font-black uppercase text-xs tracking-widest mb-12 py-2 group"
            >
                <LucideArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" /> Back to listings
            </button>

            <div className="grid lg:grid-cols-3 gap-12">
                {/* LEFT SIDE */}
                <div className="lg:col-span-2 space-y-12">
                    <section className="premium-card p-10 md:p-16">
                        <div className="flex flex-col md:flex-row justify-between gap-10">
                            <div className="flex-1 space-y-12">

                                <div>
                                    <h3 className="text-4xl font-black mb-2">{transport.departureTime}</h3>
                                    <p className="text-xl font-bold">{transport.source}</p>
                                </div>

                                <div>
                                    <h3 className="text-4xl font-black mb-2">{transport.arrivalTime}</h3>
                                    <p className="text-xl font-bold">{transport.destination}</p>
                                </div>

                            </div>

                            <div className="w-full md:w-64 space-y-8 bg-black/10 dark:bg-white/5 p-8 rounded-3xl border border-white/10">
                                <div className="text-center pb-6 border-b border-white/10">
                                    <h4 className="text-2xl font-black">{transport.provider}</h4>
                                    <p className="text-xs font-bold text-primary mt-1">
                                        {transport.vehicleNumber}
                                    </p>
                                </div>

                                <div className="flex items-center justify-between text-sm">
                                    <span className="font-bold opacity-60">Rating</span>
                                    <div className="flex gap-1 text-yellow-500">
                                        <LucideStar size={14} className="fill-yellow-500" />
                                        {transport.rating}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Amenities */}
                    <section className="space-y-6">
                        <h3 className="text-3xl font-black tracking-tight">
                            On-board Amenities
                        </h3>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
                            {transport.amenities?.map((amenity, idx) => {
                                const Icon = AMENITY_ICONS[amenity] || LucideCheckCircle;
                                return (
                                    <div key={idx} className="premium-card p-6 flex flex-col items-center gap-4 text-center">
                                        <Icon size={24} />
                                        <span className="text-xs font-black uppercase tracking-widest opacity-60">
                                            {amenity}
                                        </span>
                                    </div>
                                );
                            })}
                        </div>
                    </section>
                </div>

                {/* RIGHT SIDE */}
                <div className="space-y-8">
                    <div className="premium-card p-10 sticky top-28 overflow-hidden">
                        <h4 className="text-xl font-black mb-8">Fare Breakdown</h4>

                        <div className="py-8 flex justify-between items-end">
                            <div>
                                <p className="text-5xl font-black">
                                    ₹{transport.price}
                                </p>
                            </div>
                        </div>

                        {!bookingRequested ? (
                            <button
                                onClick={handleProceed}
                                className="w-full btn-primary !py-5 font-black uppercase tracking-widest text-lg"
                            >
                                Confirm Journey
                            </button>
                        ) : (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="w-full p-6 bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 rounded-3xl text-center space-y-4"
                            >
                                <LucideCheckCircle size={24} />
                                <p className="text-sm font-black uppercase tracking-widest">
                                    Redirecting to Partner...
                                </p>
                                <a
                                    href={transport.redirectUrl}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="inline-flex items-center gap-1.5 text-xs underline font-bold"
                                >
                                    Click here if redirect fails
                                    <LucideExternalLink size={12} />
                                </a>
                            </motion.div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Details;