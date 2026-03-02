import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

interface Props {
    lines: string[];
    accent?: string;
}

export default function SectionBreak({ lines, accent = '#8E93FF' }: Props) {
    const ref = useRef<HTMLElement>(null);
    const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
    const y = useTransform(scrollYProgress, [0, 1], [40, -40]);
    const opacity = useTransform(scrollYProgress, [0, 0.25, 0.75, 1], [0, 1, 1, 0]);

    return (
        <section
            ref={ref}
            className="relative py-28 md:py-36 px-10 md:px-20 lg:px-32 overflow-hidden"
            style={{ background: '#0A0A0A' }}
        >
            <motion.div style={{ y, opacity }} className="relative z-10 max-w-4xl">
                {lines.map((line, i) => (
                    <motion.p
                        key={i}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ type: 'spring', stiffness: 170, damping: 26, delay: i * 0.12 }}
                        className="text-[clamp(1.4rem,3vw,2.2rem)] font-light leading-relaxed mb-3"
                        style={{ color: line.endsWith('?') ? accent : 'rgba(255,255,255,0.5)' }}
                    >
                        {line}
                    </motion.p>
                ))}
            </motion.div>

            {/* Edge lines */}
            <div className="absolute top-0 left-0 right-0 h-px" style={{ background: 'rgba(255,255,255,0.04)' }} />
            <div className="absolute bottom-0 left-0 right-0 h-px" style={{ background: 'rgba(255,255,255,0.04)' }} />
        </section>
    );
}
