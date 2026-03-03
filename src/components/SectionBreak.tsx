import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

interface Props {
    heading: string;
    body: string;
    variant?: 'editorial' | 'statement';
    label?: string;
    stat?: { value: string; unit: string };
}

export default function SectionBreak({ heading, body, variant = 'editorial', label, stat }: Props) {
    const ref = useRef<HTMLElement>(null);
    const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
    const y = useTransform(scrollYProgress, [0, 1], [30, -30]);

    if (variant === 'statement') {
        /* --- Variant B: single huge statement, right-aligned stat, body below --- */
        return (
            <section
                ref={ref}
                className="min-h-screen flex flex-col justify-center px-10 md:px-20 lg:px-32 py-28 relative overflow-hidden"
                style={{ background: '#0A0A0A' }}
            >
                <div className="max-w-6xl w-full">
                    {label && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            className="mb-12 flex items-center gap-4"
                        >
                            <div className="w-8 h-px bg-white/20" />
                            <span className="text-[10px] font-mono tracking-[0.3em] uppercase text-white/30">
                                {label}
                            </span>
                        </motion.div>
                    )}

                    <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-12 lg:gap-20 items-end mb-16">
                        <motion.h3
                            style={{ y }}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ type: 'spring', stiffness: 150, damping: 24 }}
                            className="text-[clamp(2.2rem,4.5vw,4rem)] font-bold leading-[1.1] tracking-[-0.02em] text-white"
                        >
                            {heading}
                        </motion.h3>

                        {stat && (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ type: 'spring', stiffness: 170, damping: 26, delay: 0.2 }}
                                className="text-right"
                            >
                                <span className="text-[clamp(4rem,8vw,7rem)] font-black leading-none text-white">{stat.value}</span>
                                <span className="block text-xs font-mono tracking-[0.2em] uppercase text-white/30 mt-2">{stat.unit}</span>
                            </motion.div>
                        )}
                    </div>

                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3, duration: 0.8 }}
                        className="pt-8"
                        style={{ borderTop: '1px solid rgba(255,255,255,0.08)' }}
                    >
                        <p className="text-base md:text-lg font-light leading-relaxed max-w-2xl" style={{ color: 'rgba(255,255,255,0.4)' }}>
                            {body}
                        </p>
                    </motion.div>
                </div>
            </section>
        );
    }

    /* --- Variant A (editorial): Instagram-style, left-aligned with top bar and structured layout --- */
    return (
        <section
            ref={ref}
            className="min-h-screen flex flex-col px-10 md:px-20 lg:px-32 py-16 relative"
            style={{ background: '#0A0A0A' }}
        >
            {/* Top bar — minimal UI accent */}
            <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="flex items-center justify-between pb-10 mb-auto"
                style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}
            >
                <div className="flex items-center gap-4">
                    <div className="w-8 h-px bg-white/20" />
                    {label && (
                        <span className="text-[10px] font-mono tracking-[0.3em] uppercase text-white/30">
                            {label}
                        </span>
                    )}
                </div>
            </motion.div>

            {/* Main heading — large, left-aligned */}
            <motion.div style={{ y }} className="my-auto max-w-4xl">
                <motion.h3
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ type: 'spring', stiffness: 150, damping: 24 }}
                    className="text-[clamp(2.2rem,4.5vw,4rem)] font-normal leading-[1.2] tracking-[-0.01em] text-white"
                >
                    {heading}
                </motion.h3>
            </motion.div>

            {/* Bottom — body text + decorative line */}
            <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3, duration: 0.8 }}
                className="grid grid-cols-1 md:grid-cols-[1fr_1fr] gap-8 mt-auto pt-10"
                style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}
            >
                <p className="text-sm font-light leading-relaxed" style={{ color: 'rgba(255,255,255,0.35)' }}>
                    {body}
                </p>
                <div className="flex items-end justify-end">
                    <span className="text-[10px] font-mono tracking-[0.2em] uppercase text-white/15">
                        How Design Works — 2026
                    </span>
                </div>
            </motion.div>
        </section>
    );
}
