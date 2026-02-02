import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Stars, ChevronRight, Music, HeartHandshake, Camera, MessageCircleHeart, Quote, Smile, Volume2, VolumeX } from 'lucide-react';
import confetti from 'canvas-confetti';

const StitchSVG = ({ className }) => (
    <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M20 40C10 30 5 10 25 15C35 18 40 25 40 35" stroke="#0EA5E9" strokeWidth="4" strokeLinecap="round" />
        <path d="M80 40C90 30 95 10 75 15C65 18 60 25 60 35" stroke="#0EA5E9" strokeWidth="4" strokeLinecap="round" />
        <circle cx="50" cy="55" r="35" fill="#0EA5E9" fillOpacity="0.2" stroke="#0EA5E9" strokeWidth="2" />
        <circle cx="38" cy="50" r="8" fill="#1E293B" />
        <circle cx="62" cy="50" r="8" fill="#1E293B" />
        <circle cx="40" cy="48" r="2" fill="white" />
        <circle cx="64" cy="48" r="2" fill="white" />
        <path d="M45 65C45 65 50 70 55 65" stroke="#1E293B" strokeWidth="2" strokeLinecap="round" />
        <path d="M40 75C30 85 20 85 15 80" stroke="#0EA5E9" strokeWidth="3" strokeLinecap="round" />
        <path d="M60 75C70 85 80 85 85 80" stroke="#0EA5E9" strokeWidth="3" strokeLinecap="round" />
    </svg>
);

const App = () => {
    const [unlocked, setUnlocked] = useState(false);
    const [isTargetReached, setIsTargetReached] = useState(false);
    const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
    const [isMuted, setIsMuted] = useState(false);
    const audioRef = useRef(null);

    const targetDate = new Date('2026-02-06T00:00:00');

    useEffect(() => {
        const timer = setInterval(() => {
            const now = new Date();
            const difference = targetDate.getTime() - now.getTime();

            if (difference <= 0) {
                setIsTargetReached(true);
                clearInterval(timer);
            } else {
                setTimeLeft({
                    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
                    hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
                    minutes: Math.floor((difference / 1000 / 60) % 60),
                    seconds: Math.floor((difference / 1000) % 60)
                });
            }
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    useEffect(() => {
        if (unlocked) {
            const timer = setTimeout(() => {
                handleConfetti();
            }, 500);

            if (audioRef.current) {
                audioRef.current.play().catch(err => console.log("Audio play failed:", err));
            }

            return () => clearTimeout(timer);
        }
    }, [unlocked]);

    const toggleMute = () => {
        if (audioRef.current) {
            audioRef.current.muted = !audioRef.current.muted;
            setIsMuted(!isMuted);
        }
    };

    const handleConfetti = () => {
        const duration = 5 * 1000;
        const animationEnd = Date.now() + duration;
        const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

        const randomInRange = (min, max) => Math.random() * (max - min) + min;

        const interval = setInterval(function () {
            const timeLeft = animationEnd - Date.now();

            if (timeLeft <= 0) {
                return clearInterval(interval);
            }

            const particleCount = 50 * (timeLeft / duration);
            confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } });
            confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } });
        }, 250);
    };



    const FloatingHearts = () => {
        return (
            <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
                {[...Array(20)].map((_, i) => (
                    <motion.div
                        key={i}
                        initial={{
                            opacity: 0,
                            y: '100vh',
                            x: `${Math.random() * 100}vw`,
                            scale: Math.random() * 0.5 + 0.5
                        }}
                        animate={{
                            opacity: [0, 1, 0],
                            y: '-20vh',
                            x: `${Math.random() * 100}vw`
                        }}
                        transition={{
                            duration: Math.random() * 10 + 10,
                            repeat: Infinity,
                            ease: "linear",
                            delay: Math.random() * 20
                        }}
                        className="absolute text-romantic-300/30"
                    >
                        <Heart size={Math.random() * 40 + 20} fill="currentColor" />
                    </motion.div>
                ))}
            </div>
        );
    };

    const Gallery = () => {
        const items = [
            { id: 1, title: 'Our First Date', description: 'Everything started here...', color: 'bg-rose-200' },
            { id: 2, title: 'Summer Memories', description: 'The sun was bright, but you were brighter.', color: 'bg-pink-200' },
            { id: 3, title: 'Late Night Talks', description: 'Hours felt like seconds with you.', color: 'bg-indigo-100' },
            { id: 4, title: 'Together Always', description: 'My favorite place is being next to you.', color: 'bg-red-100' },
        ];

        return (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-12">
                {items.map((item, idx) => (
                    <motion.div
                        key={item.id}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: idx * 0.2 }}
                        className={`group relative overflow-hidden rounded-3xl h-64 ${item.color} glass shadow-xl hover:shadow-2xl transition-all duration-500`}
                    >
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent group-hover:from-black/40 transition-all duration-500" />
                        <div className="absolute inset-0 flex flex-col justify-end p-6">
                            <h3 className="text-2xl font-playfair font-bold text-white mb-2">{item.title}</h3>
                            <p className="text-white/90 text-sm opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-500">
                                {item.description}
                            </p>
                        </div>
                        <motion.div
                            className="absolute top-4 right-4 text-white/50 group-hover:text-white transition-colors"
                            whileHover={{ scale: 1.2, rotate: 10 }}
                        >
                            <Camera size={24} />
                        </motion.div>
                    </motion.div>
                ))}
            </div>
        );
    };

    return (
        <div className="relative min-h-screen selection:bg-romantic-200">
            <audio ref={audioRef} src="/happy-birthday-469282.mp3" loop />
            <FloatingHearts />

            <AnimatePresence>
                {unlocked && (
                    <motion.button
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        onClick={toggleMute}
                        className="fixed bottom-6 right-6 z-50 p-4 bg-white/80 glass rounded-full shadow-lg text-romantic-600 hover:bg-white transition-all group"
                        title={isMuted ? "Unmute Music" : "Mute Music"}
                    >
                        {isMuted ? <VolumeX size={24} /> : <Volume2 size={24} className="animate-pulse" />}
                    </motion.button>
                )}
            </AnimatePresence>

            <main className="relative z-10 container mx-auto px-4 py-8 md:py-12 flex flex-col items-center min-h-screen justify-center">
                {!isTargetReached ? (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex flex-col items-center text-center max-w-2xl mx-auto"
                    >
                        <div className="mb-8 relative">
                            <StitchSVG className="w-40 h-40 md:w-56 md:h-56 animate-float" />
                            <motion.div
                                animate={{ scale: [1, 1.2, 1] }}
                                transition={{ repeat: Infinity, duration: 1.5 }}
                                className="absolute top-0 right-0"
                            >
                                <Heart className="text-romantic-500 fill-romantic-500" size={32} />
                            </motion.div>
                        </div>

                        <h1 className="heading-romantic text-3xl md:text-5xl mb-6">Something special is coming...</h1>

                        <div className="grid grid-cols-4 gap-2 md:gap-4 mb-12">
                            {[
                                { label: 'Days', value: timeLeft.days },
                                { label: 'Hours', value: timeLeft.hours },
                                { label: 'Mins', value: timeLeft.minutes },
                                { label: 'Secs', value: timeLeft.seconds }
                            ].map((unit, i) => (
                                <div key={i} className="flex flex-col items-center">
                                    <div className="w-16 h-16 md:w-24 md:h-24 glass bg-white/50 rounded-2xl flex items-center justify-center text-2xl md:text-4xl font-bold text-romantic-600 mb-2">
                                        {String(unit.value).padStart(2, '0')}
                                    </div>
                                    <span className="text-xs md:text-sm text-slate-500 font-medium uppercase tracking-wider">{unit.label}</span>
                                </div>
                            ))}
                        </div>

                        <p className="text-slate-500 italic flex items-center gap-2">
                            <Stars size={18} className="text-romantic-400" />
                            Ohana means nobody gets left behind... especially on February 6th.
                            <Stars size={18} className="text-romantic-400" />
                        </p>
                    </motion.div>
                ) : !unlocked ? (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="flex flex-col items-center justify-center min-h-[85vh] text-center px-4"
                    >
                        <motion.div
                            animate={{
                                scale: [1, 1.1, 1],
                                rotate: [0, 5, -5, 0]
                            }}
                            transition={{ repeat: Infinity, duration: 2 }}
                            className="text-romantic-500 mb-6 md:mb-8"
                        >
                            <Heart className="w-20 h-20 md:w-28 md:h-28" fill="currentColor" strokeWidth={1} />
                        </motion.div>

                        <h1 className="heading-romantic text-4xl sm:text-5xl md:text-7xl mb-4 md:mb-6 leading-tight">
                            Hey Beautiful!
                        </h1>
                        <p className="text-base sm:text-lg md:text-xl text-slate-600 mb-8 md:mb-12 max-w-sm md:max-w-md mx-auto">
                            The day is finally here! <br className="hidden sm:block" /> Are you ready for your surprise?
                        </p>

                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => setUnlocked(true)}
                            className="px-8 py-4 md:px-10 md:py-5 bg-romantic-600 text-white rounded-full font-semibold text-lg md:text-xl shadow-lg hover:shadow-romantic-500/40 transition-all flex items-center gap-3 group"
                        >
                            Open My Surprise <ChevronRight className="w-5 h-5 md:w-6 md:h-6 group-hover:translate-x-1 transition-transform" />
                        </motion.button>

                        <div className="mt-12">
                            <StitchSVG className="w-32 h-32 md:w-40 md:h-40" />
                        </div>
                    </motion.div>
                ) : (
                    <div className="w-full max-w-4xl mx-auto px-2 sm:px-4">
                        <motion.header
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-center mb-12 md:mb-20"
                        >
                            <div className="inline-flex items-center justify-center p-2 md:p-3 bg-white/50 rounded-full mb-4 md:mb-6 glass">
                                <Stars className="text-romantic-500 animate-pulse w-5 h-5 md:w-6 md:h-6" />
                            </div>
                            <h1 className="heading-romantic text-3xl sm:text-4xl md:text-6xl mb-3 md:mb-4 px-2">
                                You're My Favorite Person
                            </h1>
                            <p className="text-slate-500 text-base md:text-lg px-4">Every moment with you is a gift I treasure.</p>
                        </motion.header>

                        <section className="mb-16 md:mb-24">
                            <div className="flex items-center gap-3 md:gap-4 mb-6 md:mb-8 px-2">
                                <HeartHandshake className="text-romantic-500 w-5 h-5 md:w-6 md:h-6" />
                                <h2 className="text-xl md:text-2xl font-semibold text-slate-700">Our Journey</h2>
                            </div>
                            <Gallery />
                        </section>

                        <section className="mb-16 md:mb-24 w-full">
                            <div className="flex items-center gap-3 md:gap-4 mb-6 md:mb-8 px-2">
                                <Smile className="text-stitch w-5 h-5 md:w-6 md:h-6" />
                                <h2 className="text-xl md:text-2xl font-semibold text-slate-700">Ohana Means Family</h2>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <motion.div
                                    whileHover={{ scale: 1.02 }}
                                    className="p-8 rounded-[2.5rem] bg-stitch-light/30 border border-stitch/20 glass flex flex-col items-center text-center"
                                >
                                    <StitchSVG className="w-32 h-32 mb-4" />
                                    <Quote className="text-stitch/40 mb-4" size={32} />
                                    <p className="text-stitch-dark font-playfair italic text-xl">
                                        "Ohana means family. Family means nobody gets left behind or forgotten."
                                    </p>
                                </motion.div>

                                <motion.div
                                    whileHover={{ scale: 1.02 }}
                                    className="p-8 rounded-[2.5rem] bg-angel-light/30 border border-angel/20 glass flex flex-col items-center text-center"
                                >
                                    <div className="w-32 h-32 mb-4 flex items-center justify-center">
                                        <Heart className="text-angel fill-angel/20 animate-heart-beat" size={64} />
                                    </div>
                                    <Quote className="text-angel/40 mb-4" size={32} />
                                    <p className="text-angel-dark font-playfair italic text-xl">
                                        "You're the Angel to my Stitch. My favorite adventure is you."
                                    </p>
                                </motion.div>
                            </div>
                        </section>

                        <section className="mb-16 md:mb-24 w-full">
                            <div className="flex items-center gap-3 md:gap-4 mb-6 md:mb-8 px-2">
                                <Music className="text-romantic-500 w-5 h-5 md:w-6 md:h-6" />
                                <h2 className="text-xl md:text-2xl font-semibold text-slate-700">Reasons Why...</h2>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
                                {[
                                    "Your infectious laugh",
                                    "The way you care for others",
                                    "Your amazing strength",
                                    "How you make me feel safe",
                                    "Your brilliant mind",
                                    "Just being you!"
                                ].map((reason, i) => (
                                    <motion.div
                                        key={i}
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        whileInView={{ opacity: 1, scale: 1 }}
                                        whileHover={{ y: -5, backgroundColor: 'white' }}
                                        viewport={{ once: true }}
                                        transition={{ delay: i * 0.1 }}
                                        className="p-5 md:p-6 rounded-2xl bg-white/40 glass text-romantic-800 font-medium text-center shadow-sm text-sm md:text-base"
                                    >
                                        {reason}
                                    </motion.div>
                                ))}
                            </div>
                        </section>

                        <motion.section
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            transition={{ duration: 1 }}
                            viewport={{ once: true }}
                            className="mb-16 md:mb-24 py-12 md:py-16 px-6 md:px-12 bg-white/60 glass rounded-[2rem] md:rounded-[3rem] text-center relative overflow-hidden"
                        >
                            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-romantic-400 to-transparent opacity-30" />

                            <MessageCircleHeart className="mx-auto mb-6 md:mb-8 text-romantic-400 w-10 h-10 md:w-12 md:h-12" />

                            <h2 className="heading-romantic text-2xl md:text-4xl mb-6 md:mb-8 italic px-2">
                                A Little Love Note
                            </h2>

                            <div className="space-y-4 md:space-y-6 text-base md:text-xl text-slate-700 font-light leading-relaxed max-w-2xl mx-auto px-2">
                                <p>
                                    From the moment we met, I knew there was something incredible about you.
                                    Your smile lights up my whole world, and your kindness inspires me every single day.
                                </p>
                                <p>
                                    Thank you for being you, and for choosing to share your life with me.
                                    I wanted to create this little corner of the internet just to remind you
                                    how much you are loved.
                                </p>
                                <p className="font-playfair font-bold text-xl md:text-2xl pt-4 text-romantic-700">
                                    Forever and Always, <br /> Your Biggest Fan
                                </p>
                            </div>

                            <div className="mt-12 flex justify-center gap-2">
                                {[...Array(3)].map((_, i) => (
                                    <Heart key={i} size={16} fill="#f43f5e" className="text-romantic-500" />
                                ))}
                            </div>
                        </motion.section>

                        <footer className="text-center pb-12">
                            <p className="text-slate-400 flex items-center justify-center gap-2">
                                Made with <motion.span animate={{ scale: [1, 1.3, 1] }} transition={{ repeat: Infinity, duration: 0.8 }} className="text-romantic-500">❤️</motion.span> by Me
                            </p>
                        </footer>
                    </div>
                )}
            </main>
        </div>
    );
};

export default App;
