import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { TONE, ACCENTS, type AccentName } from '../lib/theme';

interface Props {
    id: string;
    heading: string;
    body: string;
    variant?: 'editorial' | 'statement';
    label?: string;
    accent?: AccentName;
    stat?: { value: string; unit: string };
}

export default function SectionBreak({
    id,
    heading,
    body,
    variant = 'editorial',
    label,
    accent = 'magenta',
    stat,
}: Props) {
    const ref = useRef<HTMLElement>(null);
    const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
    // Applied to a wrapper, never to the same element that also animates y
    // on scroll-into-view — those two fought each other and the parallax
    // silently lost.
    const y = useTransform(scrollYProgress, [0, 1], [40, -40]);

    const t = TONE.ink;
    const a = ACCENTS[accent];

    if (variant === 'statement') {
        return (
            <section
                ref={ref}
                id={id}
                className="relative flex min-h-screen flex-col justify-center overflow-hidden px-6 py-28 md:px-14 lg:px-24"
                style={{ background: t.bg, color: t.text }}
            >
                <div className="w-full max-w-6xl">
                    {label && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            className="mb-12 flex items-center gap-4"
                        >
                            <div className="h-px w-8" style={{ background: a.fill }} />
                            <span
                                className="font-mono text-[10px] tracking-[0.3em] uppercase"
                                style={{ color: a.up }}
                            >
                                {label}
                            </span>
                        </motion.div>
                    )}

                    <motion.div style={{ y }}>
                        <div className="mb-16 grid grid-cols-1 items-end gap-12 lg:grid-cols-[1fr_auto] lg:gap-20">
                            <motion.h3
                                initial={{ opacity: 0, y: 40 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ type: 'spring', stiffness: 150, damping: 24 }}
                                className="display display-safe text-[clamp(2.1rem,4.5vw,4rem)] font-semibold tracking-[-0.02em]"
                            >
                                {heading}
                            </motion.h3>

                            {stat && (
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ type: 'spring', stiffness: 170, damping: 26, delay: 0.2 }}
                                    className="text-left lg:text-right"
                                >
                                    <span
                                        className="display text-[clamp(4rem,8vw,7rem)] leading-none font-bold"
                                        style={{ color: a.up }}
                                    >
                                        {stat.value}
                                    </span>
                                    <span
                                        className="mt-2 block font-mono text-[10px] tracking-[0.2em] uppercase"
                                        style={{ color: t.faint }}
                                    >
                                        {stat.unit}
                                    </span>
                                </motion.div>
                            )}
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.25, duration: 0.8 }}
                        className="pt-8"
                        style={{ borderTop: `1px solid ${t.line}` }}
                    >
                        <p
                            className="max-w-2xl text-base leading-relaxed font-light md:text-lg"
                            style={{ color: t.muted }}
                        >
                            {body}
                        </p>
                    </motion.div>
                </div>
            </section>
        );
    }

    return (
        <section
            ref={ref}
            id={id}
            className="relative flex min-h-screen flex-col px-6 py-20 md:px-14 lg:px-24"
            style={{ background: t.bg, color: t.text }}
        >
            <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="mb-auto flex items-center justify-between pb-10"
                style={{ borderBottom: `1px solid ${t.line}` }}
            >
                <div className="flex items-center gap-4">
                    <div className="h-px w-8" style={{ background: a.fill }} />
                    {label && (
                        <span
                            className="font-mono text-[10px] tracking-[0.3em] uppercase"
                            style={{ color: a.up }}
                        >
                            {label}
                        </span>
                    )}
                </div>
            </motion.div>

            <motion.div style={{ y }} className="my-auto max-w-4xl">
                <motion.h3
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ type: 'spring', stiffness: 150, damping: 24 }}
                    className="display display-safe text-[clamp(2.1rem,4.5vw,4rem)] font-normal tracking-[-0.01em]"
                >
                    {heading}
                </motion.h3>
            </motion.div>

            <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.25, duration: 0.8 }}
                className="mt-auto grid grid-cols-1 gap-8 pt-10 md:grid-cols-2"
                style={{ borderTop: `1px solid ${t.line}` }}
            >
                <p className="text-sm leading-relaxed font-light" style={{ color: t.muted }}>
                    {body}
                </p>
                <div className="flex items-end justify-start md:justify-end">
                    <span
                        className="font-mono text-[10px] tracking-[0.2em] uppercase"
                        style={{ color: t.faint }}
                    >
                        How Design Works — 2026
                    </span>
                </div>
            </motion.div>
        </section>
    );
}
