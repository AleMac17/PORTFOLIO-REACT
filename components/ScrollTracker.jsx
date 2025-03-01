'use client';

import { useMenu } from '@/context/MenuContext';
import { useScroll, useTransform, motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { FaArrowUp } from 'react-icons/fa';

export default function ScrollTracker() {
    const { isMenuOpen } = useMenu();
    const { scrollYProgress } = useScroll();

    const strokeOffset = useTransform(scrollYProgress, [0, 1], [251.2, 0]);

    const [isFull, setIsFull] = useState(false);
    const [showArrow, setShowArrow] = useState(false);

    useEffect(() => {
        const unsubscribe = scrollYProgress.on('change', (value) => {
            if (value >= 1) {
                setIsFull(true);
                setTimeout(() => {
                    setIsFull(false);
                    setShowArrow(true);
                }, 1200);
            } else {
                setShowArrow(false);
            }
        });

        return () => unsubscribe();
    }, [scrollYProgress]);

    if (isMenuOpen) return null;
    
    return (
        <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50">
            <motion.div
                className="relative flex items-center justify-center cursor-pointer"
                animate={isFull ? { scale: 1.3 } : { scale: 1 }}
                transition={{ duration: 0.4, ease: 'easeOut' }}
                onClick={() => {
                    if (showArrow)
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
            >
                {isFull && (
                    <>
                        {[...Array(10)].map((_, i) => (
                            <motion.div
                                key={i}
                                className="absolute w-2 h-2 bg-white rounded-full"
                                initial={{ opacity: 1, scale: 1, x: 0, y: 0 }}
                                animate={{
                                    opacity: 0,
                                    scale: [1, 1.5, 0],
                                    x: [
                                        0,
                                        Math.cos((i / 10) * Math.PI * 2) * 30,
                                    ],
                                    y: [
                                        0,
                                        Math.sin((i / 10) * Math.PI * 2) * 30,
                                    ],
                                }}
                                transition={{ duration: 1, ease: 'easeOut' }}
                            />
                        ))}
                    </>
                )}

                <svg className="w-12 h-12 drop-shadow-lg" viewBox="0 0 100 100">
                    <circle
                        cx="50"
                        cy="50"
                        r="40"
                        fill="rgba(255, 255, 255, 0.1)"
                    />

                    <motion.circle
                        cx="50"
                        cy="50"
                        r="40"
                        fill="none"
                        stroke="url(#gradient)"
                        strokeWidth="5"
                        strokeDasharray="251.2"
                        strokeDashoffset={strokeOffset}
                        transition={{ ease: 'easeOut', duration: 0.5 }}
                    />

                    {showArrow && (
                        <motion.foreignObject
                            x="30"
                            y="30"
                            width="40"
                            height="40"
                            initial={{ opacity: 0, scale: 0.5 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.4, ease: 'easeOut' }}
                        >
                            <div className="flex items-center justify-center w-full h-full">
                                <FaArrowUp className="text-white text-4xl" />
                            </div>
                        </motion.foreignObject>
                    )}

                    <defs>
                        <linearGradient
                            id="gradient"
                            x1="0%"
                            y1="0%"
                            x2="100%"
                            y2="0%"
                        >
                            <stop
                                offset="0%"
                                stopColor="#ffffff"
                                stopOpacity="0.3"
                            />
                            <stop
                                offset="100%"
                                stopColor="#aaaaaa"
                                stopOpacity="1"
                            />
                        </linearGradient>
                    </defs>
                </svg>
            </motion.div>
        </div>
    );
}
