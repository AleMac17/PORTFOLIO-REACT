'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FaLinkedin } from 'react-icons/fa';

export default function Contact() {
    const { ref, inView } = useInView({
        triggerOnce: true,
        threshold: 0.5,
    });

    return (
        <section
            id="contact"
            ref={ref}
            className="relative min-h-screen w-full flex items-center justify-center bg-gray-900 text-white overflow-hidden"
        >
            <motion.div
                initial={{ opacity: 0 }}
                animate={inView ? { opacity: 1 } : { opacity: 0 }}
                transition={{ duration: 1.5, ease: 'easeOut' }}
                className="absolute inset-0 bg-gradient-to-b from-gray-900 to-gray-800"
            />

            <motion.div
                initial={{ scale: 0, opacity: 0, y: 200 }}
                animate={
                    inView
                        ? {
                              scale: [0, 0.5, 1],
                              opacity: [0, 0.3, 1],
                              y: [200, -30, 0],
                          }
                        : {}
                }
                transition={{ duration: 1.8, ease: 'easeOut' }}
            >
                <a
                    href="https://www.linkedin.com/in/alejandro-maci%C3%A1/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="relative flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-transparent"
                >
                    {/* Pulsos de conexión */}
                    <motion.div
                        className="absolute w-24 h-24 sm:w-32 sm:h-32 rounded-full border-2 opacity-30"
                        initial={{ scale: 0.5, opacity: 0.5 }}
                        animate={{
                            scale: [0.5, 1.2, 0.8],
                            opacity: [0.5, 0.3, 0],
                            borderColor: ['#0077b5', 'white', '#0077b5'], // Alterna entre azul LinkedIn y blanco
                        }}
                        transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: 'easeInOut',
                        }}
                    />
                    <motion.div
                        className="absolute w-32 h-32 sm:w-40 sm:h-40 rounded-full border opacity-20"
                        initial={{ scale: 0.5, opacity: 0.5 }}
                        animate={{
                            scale: [0.5, 1.5, 0.9],
                            opacity: [0.5, 0.2, 0],
                            borderColor: ['#0077b5', 'white', '#0077b5'], // Alterna colores en cada pulso
                        }}
                        transition={{
                            duration: 2.5,
                            repeat: Infinity,
                            ease: 'easeInOut',
                        }}
                    />

                    <motion.div
                        whileHover={{
                            scale: 1.3,
                            filter: 'drop-shadow(0px 0px 30px rgba(0,150,255,0.8))',
                            color: 'rgba(0,150,255,1)',
                        }}
                        transition={{ duration: 0.8 }}
                    >
                        <FaLinkedin className="text-5xl sm:text-6xl relative z-10 text-primary-500 mix-blend-lighten" />
                    </motion.div>
                </a>
            </motion.div>
        </section>
    );
}
