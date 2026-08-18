import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ACCENTS, INK, SPRING } from '../lib/theme';

/* "ชุมชน" in the previous version meant "community", not "design". */
const words = [
    { text: 'Design.', lang: 'English' },
    { text: 'デザイン。', lang: 'Japanese' },
    { text: 'Diseño.', lang: 'Spanish' },
    { text: 'การออกแบบ', lang: 'Thai' },
    { text: 'Дизайн.', lang: 'Russian' },
    { text: '디자인.', lang: 'Korean' },
    { text: 'التصميم.', lang: 'Arabic' },
    { text: 'डिज़ाइन।', lang: 'Hindi' },
    { text: 'Gestaltung.', lang: 'German' },
    { text: '设计。', lang: 'Chinese' },
];

export default function Interlude({ id }: { id: string }) {
    const [index, setIndex] = useState(0);

    useEffect(() => {
        const timer = window.setInterval(
            () => setIndex((prev) => (prev + 1) % words.length),
            2000
        );
        return () => window.clearInterval(timer);
    }, []);

    return (
        <section
            id={id}
            className="relative flex h-screen flex-col items-center justify-center px-6"
            style={{ background: ACCENTS.magenta.fill }}
        >
            <svg
                className="absolute top-14 right-6 left-6 h-6 w-[calc(100%-3rem)]"
                viewBox="0 0 1200 20"
                fill="none"
                preserveAspectRatio="none"
                aria-hidden="true"
            >
                <motion.line
                    x1="0" y1="10" x2="1200" y2="10"
                    stroke="#fff" strokeWidth="2" strokeDasharray="60 30"
                    initial={{ pathLength: 0, opacity: 0 }}
                    whileInView={{ pathLength: 1, opacity: 0.6 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.4, ease: 'easeOut' }}
                />
            </svg>

            {/* The reserved box keeps layout still between words, and the
                generous line-height stops Devanagari matras, Thai marks and
                Latin descenders from being clipped as each word blurs in. */}
            <div
                className="flex w-full items-center justify-center overflow-visible"
                style={{ minHeight: 'clamp(4.4rem, 16vw, 15rem)' }}
            >
                <AnimatePresence mode="wait">
                    <motion.h2
                        key={index}
                        initial={{ opacity: 0, y: 40, filter: 'blur(8px)' }}
                        animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                        exit={{ opacity: 0, y: -40, filter: 'blur(8px)' }}
                        transition={SPRING}
                        className="display display-safe text-center text-[clamp(3.2rem,12vw,11rem)] font-bold tracking-[-0.03em]"
                        style={{ color: INK }}
                    >
                        {words[index].text}
                    </motion.h2>
                </AnimatePresence>
            </div>

            <p className="mt-6 text-lg font-light tracking-wide text-white">is how it works.</p>
        </section>
    );
}
