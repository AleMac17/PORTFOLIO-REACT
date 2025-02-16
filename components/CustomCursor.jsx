'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

export default function CustomCursor() {
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [isHovering, setIsHovering] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const updatePosition = (e) => {
            if (!isMobile) {
                setPosition({ x: e.clientX, y: e.clientY });
            }
        };

        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768);
        };

        checkMobile();
        window.addEventListener('mousemove', updatePosition);
        window.addEventListener('resize', checkMobile);

        return () => {
            window.removeEventListener('mousemove', updatePosition);
            window.removeEventListener('resize', checkMobile);
        };
    }, [isMobile]);

    useEffect(() => {
        if (isMobile) return;

        const elements = document.querySelectorAll(
            'a, button, input, textarea',
        );

        const handleMouseEnter = () => setIsHovering(true);
        const handleMouseLeave = () => setIsHovering(false);

        elements.forEach((el) => {
            el.addEventListener('mouseenter', handleMouseEnter);
            el.addEventListener('mouseleave', handleMouseLeave);
        });

        return () => {
            elements.forEach((el) => {
                el.removeEventListener('mouseenter', handleMouseEnter);
                el.removeEventListener('mouseleave', handleMouseLeave);
            });
        };
    }, [isMobile]);

    if (isMobile) return null;

    return (
        <motion.div
            className="fixed top-0 left-0 w-6 h-6 pointer-events-none z-[9999]"
            animate={{
                x: position.x - 12,
                y: position.y - 12,
                scale: isHovering ? 1.8 : 1,
                backgroundColor: isHovering
                    ? 'rgba(0, 160, 220, 0.2)'
                    : 'transparent',
                borderColor: isHovering ? 'rgba(0, 160, 220, 0.8)' : '#ffffff',
                borderRadius: isHovering ? '50%' : '0%',
                opacity: 1,
            }}
            transition={{
                type: 'tween',
                ease: 'easeOut',
                duration: 0.1,
            }}
        >
            <div className="w-full h-full border border-sky-800 rounded-full" />
        </motion.div>
    );
}
