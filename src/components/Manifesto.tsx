import { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';

const takeaways = [
    { num: '01', text: 'One font is enough — if you master scale, weight, and spacing.' },
    { num: '02', text: 'Typography is the new hero image — oversized type replaces stock photography.' },
    { num: '03', text: 'Whitespace is not empty — it\'s the most powerful design element.' },
    { num: '04', text: 'Color should have a job — no decorative color on premium sites.' },
    { num: '05', text: 'Navigation is evolving — top-bars are the \"safe default,\" not the standard.' },
    { num: '06', text: 'Flat is the foundation — but selective depth creates moments of surprise.' },
    { num: '07', text: 'Animation should be meaningful — tickers broadcast, parallax immerses, cursors guide.' },
    { num: '08', text: 'The brand archetype drives everything — Sage, Outlaw, Explorer, all decisions follow.' },
    { num: '09', text: 'Constraint breeds creativity — strict limits force expression within boundaries.' },
    { num: '10', text: 'The design system is the brand — documentation IS the product.' },
];

const cellColors = ['#D300C5', '#F15A24', '#2563EB', '#9FE870', '#8E93FF', '#FF0050', '#E11D48', '#FACC15', '#808080', '#47F654'];

const spring = { type: 'spring' as const, stiffness: 170, damping: 26 };

export default function Manifesto() {
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) entry.target.classList.add('visible');
                });
            },
            { threshold: 0.2 }
        );

        if (ref.current) {
            ref.current.querySelectorAll('.reveal').forEach((el) => observer.observe(el));
        }
        return () => observer.disconnect();
    }, []);

    return (
        <section
            ref={ref}
            className="relative min-h-screen py-20 md:py-28 px-10 md:px-20 lg:px-32 overflow-hidden"
            style={{ background: '#FFFFFF', color: '#1a1a1a' }}
        >
            <div className="max-w-5xl mx-auto relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={spring}
                    className="mb-6"
                >
                    <span className="text-xs font-medium tracking-[0.3em] uppercase" style={{ color: '#FF0050' }}>
                        The Manifesto
                    </span>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ ...spring, delay: 0.1 }}
                    className="mb-20"
                >
                    <h2 className="text-[clamp(2.5rem,5vw,4.5rem)] font-extrabold leading-[1] tracking-[-0.03em]">
                        10 Takeaways
                    </h2>
                </motion.div>

                {/* Takeaway items with colored number badges */}
                <div className="space-y-0">
                    {takeaways.map((t, i) => (
                        <motion.div
                            key={t.num}
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true, margin: '-30px' }}
                            transition={{ ...spring, delay: i * 0.05 }}
                            className="flex items-start gap-6 py-7 group"
                            style={{ borderBottom: '1px solid rgba(0,0,0,0.06)' }}
                        >
                            {/* Colored number badge — bright colors in contained cells */}
                            <motion.div
                                className="w-10 h-10 rounded-xl shrink-0 flex items-center justify-center mt-1"
                                style={{ background: cellColors[i] }}
                                whileHover={{ scale: 1.15, rotate: 5 }}
                            >
                                <span className="font-mono text-xs font-bold text-white">{t.num}</span>
                            </motion.div>
                            <p className="text-xl md:text-2xl font-light leading-relaxed text-[#333] group-hover:text-[#1a1a1a] transition-colors duration-300">
                                {t.text}
                            </p>
                        </motion.div>
                    ))}
                </div>

                {/* Closing ticker — hot pink accent */}
                <div className="mt-24 overflow-hidden rounded-full py-3" style={{ background: '#FF0050', border: 'none' }}>
                    <div className="animate-marquee whitespace-nowrap">
                        <span className="text-xs font-bold tracking-[0.15em] text-white/60">
                            {'ONE FONT • EXTREME SCALE • WHITESPACE • COLOR HAS A JOB • SPRING PHYSICS • ARCHETYPES • CONSTRAINT = CREATIVITY • '.repeat(3)}
                        </span>
                    </div>
                </div>

                {/* Footer note */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.5 }}
                    className="mt-12 text-center"
                >
                    <p className="text-sm tracking-[0.1em]" style={{ color: 'rgba(0,0,0,0.3)' }}>
                        Built as a visual essay — each section demonstrates the rule it teaches.
                    </p>
                    <p className="text-xs mt-3 font-mono" style={{ color: 'rgba(0,0,0,0.2)' }}>
                        Based on analysis of 7 premium websites from Godly's 2026 collection.
                    </p>
                </motion.div>
            </div>
        </section>
    );
}
