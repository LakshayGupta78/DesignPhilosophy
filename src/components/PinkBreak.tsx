import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const words = [
    { text: 'Design.', lang: 'English' },
    { text: 'デザイン。', lang: 'Japanese' },
    { text: 'Diseño.', lang: 'Spanish' },
    { text: 'ชุมชน', lang: 'Thai' },
    { text: 'Дизайн.', lang: 'Russian' },
    { text: '디자인.', lang: 'Korean' },
    { text: 'التصميم.', lang: 'Arabic' },
    { text: 'Gestaltung.', lang: 'German' },
];

const spring = { type: 'spring' as const, stiffness: 170, damping: 26 };

export default function PinkBreak() {
    const [index, setIndex] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setIndex((prev) => (prev + 1) % words.length);
        }, 2000);
        return () => clearInterval(timer);
    }, []);

    return (
        <section
            className="relative h-screen flex flex-col items-center justify-center overflow-hidden"
            style={{ background: '#E879F9' }}
        >
            {/* Dashed line across the top */}
            <svg className="absolute top-16 left-10 right-10 w-[calc(100%-80px)] h-6" viewBox="0 0 1200 20" fill="none">
                <motion.line
                    x1="0" y1="10" x2="1200" y2="10"
                    stroke="white"
                    strokeWidth="2"
                    strokeDasharray="60 30"
                    initial={{ pathLength: 0, opacity: 0 }}
                    whileInView={{ pathLength: 1, opacity: 0.6 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.5, ease: 'easeOut' }}
                />
            </svg>

            {/* Cycling language text */}
            <AnimatePresence mode="wait">
                <motion.h2
                    key={index}
                    initial={{ opacity: 0, y: 40, filter: 'blur(8px)' }}
                    animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                    exit={{ opacity: 0, y: -40, filter: 'blur(8px)' }}
                    transition={spring}
                    className="text-[clamp(4rem,12vw,12rem)] font-black leading-none tracking-[-0.04em] text-center"
                    style={{ color: '#0A0A0A' }}
                >
                    {words[index].text}
                </motion.h2>
            </AnimatePresence>

            <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="mt-6 text-lg font-light tracking-wide"
                style={{ color: 'rgba(0,0,0,0.4)' }}
            >
                is how it works.
            </motion.p>
        </section>
    );
}
