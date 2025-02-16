'use client';

import { useState } from 'react';
import { MenuIcon, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export function Menu() {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => setIsOpen(!isOpen);
    const closeMenu = () => setIsOpen(false);

    const textVariants = {
        hidden: { opacity: 0, y: 50, filter: 'blur(8px)' },
        visible: (i) => ({
            opacity: 1,
            y: 0,
            filter: 'blur(0px)',
            transition: { duration: 1.2, delay: i * 0.2, ease: 'easeInOut' },
        }),
    };

    return (
        <>
            <button onClick={toggleMenu} className="focus:outline-none">
                <MenuIcon className="w-7 h-7 text-gray-300 hover:text-white transition-colors cursor-pointer" />
            </button>

            <AnimatePresence>
                {isOpen && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 0.5 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 1, ease: 'easeInOut' }}
                            className="fixed inset-0 bg-black backdrop-blur-2xl z-40"
                            onClick={closeMenu}
                        />

                        <motion.div
                            initial={{ opacity: 0, y: '-100%' }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: '-100%' }}
                            transition={{ duration: 1.2, ease: 'easeInOut' }}
                            className="fixed inset-0 bg-gray-900 text-white z-50 flex flex-col justify-center items-center py-24 px-12"
                        >
                            <motion.button
                                onClick={closeMenu}
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{
                                    duration: 1,
                                    ease: 'easeOut',
                                    delay: 0.5,
                                }}
                                className="absolute top-8 right-8"
                            >
                                <X className="w-8 h-8 text-gray-400 hover:text-white transition duration-300" />
                            </motion.button>

                            <nav className="w-full max-w-4xl flex flex-col items-center space-y-20 text-center">
                                {['About', 'Projects', 'Contact'].map(
                                    (item, index) => (
                                        <motion.a
                                            key={item}
                                            href={`#${item.toLowerCase()}`}
                                            onClick={closeMenu}
                                            variants={textVariants}
                                            initial="hidden"
                                            animate="visible"
                                            custom={index}
                                            exit="hidden"
                                            className="relative text-6xl sm:text-7xl font-bold tracking-wide group transition-all duration-500"
                                            whileHover={{
                                                scale: 1.05,
                                                textShadow:
                                                    '0px 0px 15px rgba(255, 255, 255, 0.8)',
                                            }}
                                        >
                                            {item}

                                            <motion.div
                                                initial={{ scaleX: 0 }}
                                                animate={{ scaleX: 1 }}
                                                transition={{
                                                    duration: 1,
                                                    ease: 'easeOut',
                                                    delay: 0.3,
                                                }}
                                                className="absolute left-1/2 -bottom-6 h-[4px] bg-primary-500 origin-center transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 w-24"
                                            />
                                        </motion.a>
                                    ),
                                )}
                            </nav>

                            <motion.p
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{
                                    duration: 1.2,
                                    ease: 'easeInOut',
                                    delay: 1,
                                }}
                                className="text-lg text-gray-400 italic mt-16 tracking-wide"
                            >
                                "Good design is obvious. Great design is
                                transparent."
                            </motion.p>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </>
    );
}
