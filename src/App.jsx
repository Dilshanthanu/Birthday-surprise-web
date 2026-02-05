import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Stars, ChevronRight, Music, HeartHandshake, Camera, MessageCircleHeart, Quote, Smile, Volume2, VolumeX, X } from 'lucide-react';
import confetti from 'canvas-confetti';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

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
    const [selectedImage, setSelectedImage] = useState(null);
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
        const containerRef = useRef(null);
        const allImages = [
            "WhatsApp Image 2026-02-05 at 19.45.23.jpeg",
            "WhatsApp Image 2026-02-05 at 19.45.49.jpeg",
            "WhatsApp Image 2026-02-05 at 19.45.51.jpeg",
            "WhatsApp Image 2026-02-05 at 19.45.56.jpeg",
            "WhatsApp Image 2026-02-05 at 19.45.59.jpeg",
            "WhatsApp Image 2026-02-05 at 19.46.00.jpeg",
            "WhatsApp Image 2026-02-05 at 19.46.02 (1).jpeg",
            "WhatsApp Image 2026-02-05 at 19.46.02.jpeg",
            "WhatsApp Image 2026-02-05 at 19.46.03 (1).jpeg",
            "WhatsApp Image 2026-02-05 at 19.46.03.jpeg",
            "WhatsApp Image 2026-02-05 at 19.46.05.jpeg",
            "WhatsApp Image 2026-02-05 at 19.46.07.jpeg",
            "WhatsApp Image 2026-02-05 at 19.46.08.jpeg",
            "WhatsApp Image 2026-02-05 at 19.46.09.jpeg",
            "WhatsApp Image 2026-02-05 at 19.46.13.jpeg",
            "WhatsApp Image 2026-02-05 at 19.46.14.jpeg",
            "WhatsApp Image 2026-02-05 at 19.46.15 (1).jpeg",
            "WhatsApp Image 2026-02-05 at 19.46.15.jpeg",
            "WhatsApp Image 2026-02-05 at 19.46.16.jpeg",
            "WhatsApp Image 2026-02-05 at 19.46.17 (1).jpeg",
            "WhatsApp Image 2026-02-05 at 19.46.17.jpeg",
            "WhatsApp Image 2026-02-05 at 19.46.18 (1).jpeg",
            "WhatsApp Image 2026-02-05 at 19.46.18.jpeg",
            "WhatsApp Image 2026-02-05 at 19.46.19 (1).jpeg",
            "WhatsApp Image 2026-02-05 at 19.46.19.jpeg",
            "WhatsApp Image 2026-02-05 at 19.46.20 (1).jpeg",
            "WhatsApp Image 2026-02-05 at 19.46.20.jpeg",
            "WhatsApp Image 2026-02-05 at 19.46.21 (1).jpeg",
            "WhatsApp Image 2026-02-05 at 19.46.21.jpeg",
            "WhatsApp Image 2026-02-05 at 19.46.22 (1).jpeg",
            "WhatsApp Image 2026-02-05 at 19.46.22.jpeg",
            "WhatsApp Image 2026-02-05 at 19.46.23 (1).jpeg",
            "WhatsApp Image 2026-02-05 at 19.46.23.jpeg",
            "WhatsApp Image 2026-02-05 at 19.46.24 (1).jpeg",
            "WhatsApp Image 2026-02-05 at 19.46.24.jpeg"
        ];

        const colors = ['bg-rose-100', 'bg-pink-100', 'bg-indigo-100', 'bg-red-100', 'bg-orange-100', 'bg-purple-100', 'bg-blue-100', 'bg-teal-100'];
        const titles = [
            "Pure Happiness", "Eternal Love", "Sweet Memories", "Together Forever", "My Everything",
            "Favorite Adventure", "Heart & Soul", "Our Story", "Beautiful Moments", "Infinite Joy",
            "Best Days", "Perfect Match", "Hand in Hand", "Soulmates", "True Love",
            "Sunshine Moments", "Dream Come True", "Simply Us", "Golden Hours", "Cherished Times",
            "Love Always", "Our Journey", "Magic Moments", "Sparkling Smiles", "Special Bond",
            "Always You", "Perfect Day", "Lovely Memories", "Pure Bliss", "My Person",
            "Happy Times", "Sweet Heart", "Forever Mine", "Beautiful You", "Our Love"
        ];
        const descriptions = [
            "Your smile is my favorite sight.", "Every moment with you is a treasure.", "Building a life of beautiful memories.",
            "I'm so lucky to have you in my life.", "You make every day feel like a dream.", "My favorite place is being by your side.",
            "You are the best thing that ever happened to me.", "Our love story is my favorite one.", "Capturing the magic of us.",
            "Life is so much brighter with you.", "To many more adventures together.", "You and me, against the world.",
            "Falling in love with you every single day.", "Thank you for being you.", "You complete me in every way.",
            "Spreading love and happiness.", "May our love continue to grow.", "Treasuring every second we spend together.",
            "You are my sunshine on a cloudy day.", "Feeling blessed to have you.", "You are my heart's desire.",
            "The journey of a thousand miles starts with you.", "Making magic wherever we go.", "Your laughter is music to my ears.",
            "A bond that can never be broken.", "It was always you.", "Making every day count.", "Memories that will last a lifetime.",
            "Pure bliss in every moment.", "You're my person, now and forever.", "Happy vibes only.", "Sweet moments like these.",
            "Forever is a long time, but I'd spend it with you.", "You're beautiful inside and out.", "Our love is a beautiful journey."
        ];

        const items = allImages.map((img, idx) => ({
            id: idx + 1,
            title: titles[idx] || `Memory ${idx + 1}`,
            description: descriptions[idx] || "Creating beautiful memories together.",
            color: colors[idx % colors.length],
            image: `/images/${img}`
        }));

        useGSAP(() => {
            const cards = gsap.utils.toArray('.gallery-card');

            cards.forEach((card, i) => {
                gsap.fromTo(card,
                    {
                        opacity: 0,
                        y: 100,
                        rotateX: -20,
                        scale: 0.8
                    },
                    {
                        opacity: 1,
                        y: 0,
                        rotateX: 0,
                        scale: 1,
                        duration: 1.2,
                        ease: "power4.out",
                        scrollTrigger: {
                            trigger: card,
                            start: "top bottom-=100",
                            toggleActions: "play none none reverse"
                        },
                        delay: i * 0.1
                    }
                );
            });
        }, { scope: containerRef });



        return (
            <div ref={containerRef} className="grid grid-cols-1 md:grid-cols-2 gap-8 my-16">
                {items.map((item, idx) => (
                    <div
                        key={item.id}
                        onClick={() => setSelectedImage(item)}
                        className={`gallery-card group relative overflow-hidden rounded-[2rem] h-80 ${item.color} glass shadow-xl transition-shadow duration-500 cursor-pointer hover:shadow-2xl`}
                    >
                        <div className="absolute inset-0 overflow-hidden">
                            <img
                                src={item.image}
                                alt={item.title}
                                className="w-full h-full object-cover opacity-80"
                            />
                        </div>

                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

                        <div className="card-content absolute inset-0 flex flex-col justify-end p-8">
                            <h3 className="text-2xl md:text-3xl font-playfair font-bold text-white mb-3">
                                {item.title}
                            </h3>
                            <p className="text-white/90 text-sm md:text-base max-w-[90%]">
                                {item.description}
                            </p>
                        </div>

                        <div className="absolute top-6 right-6 text-white/70">
                            <Camera size={28} />
                        </div>
                    </div>
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
                        <div className="mb-8 relative">
                            <motion.div
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 1 }}
                                className="w-48 h-48 md:w-64 md:h-64 rounded-full overflow-hidden border-4 border-romantic-200 shadow-2xl mx-auto"
                            >
                                <motion.div
                                    animate={{
                                        boxShadow: [
                                            "0 0 20px rgba(244, 63, 94, 0.2)",
                                            "0 0 40px rgba(244, 63, 94, 0.4)",
                                            "0 0 20px rgba(244, 63, 94, 0.2)"
                                        ]
                                    }}
                                    transition={{ repeat: Infinity, duration: 2 }}
                                    className="w-full h-full"
                                >
                                    <img
                                        src="/images/WhatsApp Image 2026-02-05 at 19.46.21.jpeg"
                                        alt="Beautiful"
                                        className="w-full h-full object-cover"
                                    />
                                </motion.div>
                            </motion.div>
                            <motion.div
                                animate={{ scale: [1, 1.2, 1] }}
                                transition={{ repeat: Infinity, duration: 1.5 }}
                                className="absolute -top-4 -right-4 text-romantic-500"
                            >
                                <Heart fill="currentColor" size={40} />
                            </motion.div>
                        </div>

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

                            <div className="mt-12 flex flex-col items-center gap-6">
                                <motion.div
                                    whileInView={{ opacity: 1, y: 0 }}
                                    initial={{ opacity: 0, y: 20 }}
                                    className="w-32 h-32 md:w-40 md:h-40 rounded-2xl overflow-hidden shadow-lg rotate-3 hover:rotate-0 transition-transform duration-500"
                                >
                                    <img
                                        src="/images/WhatsApp Image 2026-02-05 at 19.46.03.jpeg"
                                        alt="Us"
                                        className="w-full h-full object-cover"
                                    />
                                </motion.div>
                                <div className="flex justify-center gap-2">
                                    {[...Array(3)].map((_, i) => (
                                        <Heart key={i} size={16} fill="#f43f5e" className="text-romantic-500" />
                                    ))}
                                </div>
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

            <AnimatePresence>
                {selectedImage && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setSelectedImage(null)}
                        className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm"
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            onClick={(e) => e.stopPropagation()}
                            className="relative max-w-5xl w-full max-h-[90vh] rounded-3xl overflow-hidden bg-white/10 glass shadow-2xl"
                        >
                            <button
                                onClick={() => setSelectedImage(null)}
                                className="absolute top-4 right-4 p-2 rounded-full bg-black/50 text-white border border-white/20 hover:bg-black/70 transition-colors z-10"
                            >
                                <X size={24} />
                            </button>

                            <div className="flex flex-col md:flex-row h-full">
                                <div className="md:w-2/3 h-[50vh] md:h-auto overflow-hidden">
                                    <img
                                        src={selectedImage.image}
                                        alt={selectedImage.title}
                                        className="w-full h-full object-contain"
                                    />
                                </div>
                                <div className="md:w-1/3 p-8 flex flex-col justify-center bg-white/5">
                                    <h3 className="text-3xl font-playfair font-bold text-white mb-4">
                                        {selectedImage.title}
                                    </h3>
                                    <p className="text-white/80 text-lg leading-relaxed mb-6">
                                        {selectedImage.description}
                                    </p>
                                    <div className="flex gap-2">
                                        <Heart size={20} fill="#f43f5e" className="text-rose-500" />
                                        <span className="text-white/60 italic">Cherished Moment</span>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default App;
