import { useState, useEffect } from 'react';
import { motion, AnimatePresence, LayoutGroup } from 'framer-motion';

/* ------------------------------------------------------------------------------ */

const platforms = [
    { name: 'LinkedIn', icon: '/images/platforms/linkedin.webp' },
    { name: 'Medium', icon: '/images/platforms/medium.webp' },
    { name: 'Dev.to', icon: '/images/platforms/dev.webp' },
    { name: 'X', icon: '/images/platforms/x.webp' },
    { name: 'Substack', icon: '/images/platforms/substack.webp' },
];

export function Tagline() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isFinal, setIsFinal] = useState(false);

    useEffect(() => {
        // This effect handles the infinite cycling logic
        if (!isFinal) {
            const timer = setTimeout(() => {
                if (currentIndex === platforms.length - 1) {
                    setIsFinal(true);
                } else {
                    setCurrentIndex(prev => prev + 1);
                }
            }, 1500);
            return () => clearTimeout(timer);
        } else {
            const timer = setTimeout(() => {
                setIsFinal(false);
                setCurrentIndex(0);
            }, 2500);
            return () => clearTimeout(timer);
        }
    }, [currentIndex, isFinal]);

    return (
        <div className="text-center mb-1 p-0">
            <LayoutGroup>
                <motion.h3
                    layout
                    className="text-2xl sm:text-4xl font-semibold text-white mb-2 flex flex-wrap items-center justify-center gap-x-4 gap-y-4 min-h-[140px] md:min-h-[100px]"
                    style={{ fontFamily: 'Inter, sans-serif', letterSpacing: '-0.02em' }}
                >
                    <motion.span
                        layout
                        transition={{
                            layout: { type: "spring", stiffness: 160, damping: 24 }
                        }}
                        className="whitespace-nowrap"
                    >
                        Write Once.
                    </motion.span>

                    <AnimatePresence mode="wait">
                        {!isFinal ? (
                            <motion.div
                                key="cycling-platforms"
                                layout
                                initial={{ y: "100%", opacity: 0 }}
                                animate={{ y: "0%", opacity: 1 }}
                                exit={{ y: "-100%", opacity: 0 }}
                                transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
                                className="flex items-center gap-4 py-2"
                            >
                                <span className="whitespace-nowrap text-white/90">Post on</span>

                                <div className="relative w-16 h-16 md:w-20 md:h-20 flex items-center justify-center overflow-hidden">
                                    <AnimatePresence mode="wait">
                                        <motion.div
                                            key={platforms[currentIndex].name}
                                            initial={{ y: "100%", opacity: 0 }}
                                            animate={{ y: "0%", opacity: 1 }}
                                            exit={{ y: "-100%", opacity: 0 }}
                                            transition={{
                                                duration: 0.6,
                                                ease: [0.4, 0, 0.2, 1]
                                            }}
                                            className={`w-full h-full flex items-center justify-center p-2 bg-white rounded-[6px] shadow-sm border border-white/30`}
                                        >
                                            <img
                                                src={platforms[currentIndex].icon}
                                                alt={platforms[currentIndex].name}
                                                height={64}
                                                width={64}
                                                className="w-full h-full object-contain"
                                            />
                                        </motion.div>
                                    </AnimatePresence>
                                </div>
                            </motion.div>
                        ) : (
                            <motion.span
                                key="final-tagline"
                                layout
                                initial={{ y: "100%", opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                exit={{ y: "-100%", opacity: 0 }}
                                transition={{
                                    duration: 0.8,
                                    ease: [0.4, 0, 0.2, 1],
                                    layout: { type: "spring", stiffness: 160, damping: 24 }
                                }}
                                className="text-white whitespace-nowrap py-2"
                            >
                                Post Everywhere!
                            </motion.span>
                        )}
                    </AnimatePresence>
                </motion.h3>
            </LayoutGroup>
        </div>
    );
}
