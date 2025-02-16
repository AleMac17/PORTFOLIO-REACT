'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

export default function About() {
    const { ref, inView } = useInView({
        triggerOnce: true,
        threshold: 0.3,
    });

    return (
        <section
            id="about"
            ref={ref}
            className="relative min-h-screen w-full flex items-center justify-center px-6 sm:px-16 overflow-hidden"
        >
            <motion.div
                initial={{ y: '100%' }}
                animate={inView ? { y: '0%' } : { y: '100%' }}
                transition={{ duration: 1.2, ease: 'easeInOut' }}
                className="absolute inset-0 bg-white"
            />

            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: 1, ease: 'easeOut', delay: 0.4 }}
                className="relative max-w-4xl text-center space-y-6 text-black"
            >
                <motion.h2
                    initial={{ opacity: 0, y: -10 }}
                    animate={
                        inView ? { opacity: 1, y: 0 } : { opacity: 0, y: -10 }
                    }
                    transition={{ duration: 1, ease: 'easeOut', delay: 0.6 }}
                    className="text-4xl sm:text-5xl font-bold tracking-tight text-primary-500"
                >
                    About Me
                </motion.h2>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={
                        inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
                    }
                    transition={{ duration: 0.8, delay: 0.8, ease: 'easeOut' }}
                    className="text-lg sm:text-xl leading-relaxed"
                >
                    I am a{' '}
                    <span className="text-primary-500 font-semibold">
                        full-stack developer
                    </span>{' '}
                    passionate about building
                    <span className="text-primary-500 font-semibold">
                        {' '}
                        scalable, high-performance, and user-centric
                        applications
                    </span>
                    . With a strong foundation in{' '}
                    <span className="text-primary-500 font-semibold">
                        React, NestJS, TypeORM, Redux, and CI/CD automation
                    </span>
                    , I specialize in{' '}
                    <strong>
                        bridging the gap between frontend and backend
                    </strong>{' '}
                    to deliver <strong>seamless user experiences</strong>.
                </motion.p>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={
                        inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
                    }
                    transition={{ duration: 0.8, delay: 1, ease: 'easeOut' }}
                    className="text-lg sm:text-xl leading-relaxed"
                >
                    I believe that{' '}
                    <strong>every line of code should be purposeful</strong>
                    —well-structured, maintainable, and efficient. My
                    development approach focuses on{' '}
                    <strong>clean architecture</strong>,{' '}
                    <strong>scalability</strong>, and{' '}
                    <strong>performance optimization</strong>.
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={
                        inView
                            ? { opacity: 1, scale: 1 }
                            : { opacity: 0, scale: 0.9 }
                    }
                    transition={{ duration: 0.8, delay: 1.2, ease: 'easeOut' }}
                    whileHover={{ scale: 1.05, transition: { duration: 0.3 } }}
                    className="border border-gray-300 rounded-lg p-6 bg-gray-100 text-gray-900 text-md sm:text-lg shadow-lg"
                >
                    <p className="italic">
                        "Great software is a{' '}
                        <strong>
                            balance of elegance, performance, and scalability
                        </strong>
                        . My mission is to craft{' '}
                        <strong>high-quality digital solutions</strong> that not
                        only solve problems but also
                        <strong className="text-primary-500">
                            {' '}
                            enhance user experience
                        </strong>
                        ."
                    </p>
                </motion.div>

                <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={
                        inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }
                    }
                    transition={{ duration: 1, delay: 1.4, ease: 'easeOut' }}
                    className="text-lg sm:text-xl leading-relaxed italic mt-4"
                >
                    "Coding isn't just about writing lines—it's about{' '}
                    <strong>creating impact</strong>."
                </motion.p>
            </motion.div>
        </section>
    );
}
