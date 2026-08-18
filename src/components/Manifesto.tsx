import { motion } from 'framer-motion';
import { ACCENTS, TONE, INK, SPRING } from '../lib/theme';
import Marquee from './Marquee';

const t = TONE.ink;

/* Badge colours are drawn from the accent set, and each carries the text
   colour that is legible on it — the old badges put white on lime and
   yellow, which measured under 1.5:1. */
const badges = [
    ACCENTS.magenta, ACCENTS.orange, ACCENTS.blue, ACCENTS.sage, ACCENTS.indigo,
    ACCENTS.rose, ACCENTS.magenta, ACCENTS.orange, ACCENTS.blue, ACCENTS.sage,
];

const takeaways = [
    'One font is enough.',
    'Type is the hero image.',
    'Whitespace is not empty.',
    'Colour should have a job.',
    'Top bars are a default, not a standard.',
    'Flat foundation, selective depth.',
    'Motion must mean something.',
    'The archetype drives everything.',
    'Constraint breeds creativity.',
    'The design system is the brand.',
];

export default function Manifesto({ id }: { id: string }) {
    return (
        <section
            id={id}
            className="relative min-h-screen overflow-hidden px-6 py-24 md:px-14 md:py-28 lg:px-24"
            style={{ background: t.bg, color: t.text }}
        >
            <div className="relative z-10 mx-auto max-w-5xl">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={SPRING}
                    className="mb-5 flex items-center gap-4"
                >
                    <span className="h-px w-10" style={{ background: ACCENTS.magenta.up }} />
                    <span
                        className="font-mono text-[10px] tracking-[0.3em] uppercase"
                        style={{ color: ACCENTS.magenta.up }}
                    >
                        The Manifesto
                    </span>
                </motion.div>

                <motion.h2
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ ...SPRING, delay: 0.1 }}
                    className="display display-safe mb-16 text-[clamp(2.4rem,5.5vw,4.5rem)] font-semibold tracking-[-0.03em] md:mb-20"
                >
                    10 Takeaways
                </motion.h2>

                <ol className="space-y-0">
                    {takeaways.map((text, i) => {
                        const b = badges[i];
                        return (
                            <motion.li
                                key={i}
                                initial={{ opacity: 0, x: -26 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true, margin: '-30px' }}
                                transition={{ ...SPRING, delay: (i % 5) * 0.05 }}
                                className="group flex items-start gap-5 py-6 md:gap-6 md:py-7"
                                style={{ borderBottom: `1px solid ${t.line}` }}
                            >
                                <motion.span
                                    className="mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl"
                                    style={{ background: b.fill }}
                                    whileHover={{ scale: 1.15, rotate: 5 }}
                                    transition={SPRING}
                                >
                                    <span className="font-mono text-xs font-bold" style={{ color: b.on }}>
                                        {String(i + 1).padStart(2, '0')}
                                    </span>
                                </motion.span>
                                <p
                                    className="display text-xl leading-relaxed font-normal transition-colors duration-300 md:text-3xl"
                                    style={{ color: t.muted }}
                                >
                                    <span className="group-hover:text-[color:var(--color-paper)]">{text}</span>
                                </p>
                            </motion.li>
                        );
                    })}
                </ol>

                <div
                    className="mt-20 overflow-hidden rounded-full py-3.5"
                    style={{ background: ACCENTS.magenta.fill }}
                >
                    <Marquee duration={42}>
                        <span className="px-4 text-xs font-bold tracking-[0.16em] text-white">
                            ONE FONT • EXTREME SCALE • WHITESPACE • COLOUR HAS A JOB • SPRING PHYSICS •
                            ARCHETYPES • CONSTRAINT = CREATIVITY •
                        </span>
                    </Marquee>
                </div>

                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.2 }}
                    className="mt-14 text-center"
                >
                    <p className="font-mono text-[11px] tracking-[0.18em] uppercase" style={{ color: t.faint }}>
                        7 sites · Godly 2026
                    </p>
                </motion.div>
            </div>

            {/* Ambient wash so the dark closing chapter is not a flat slab */}
            <div
                aria-hidden="true"
                className="pointer-events-none absolute -top-40 -right-40 h-[500px] w-[500px] rounded-full opacity-20 blur-[120px]"
                style={{ background: ACCENTS.magenta.fill }}
            />
            <div
                aria-hidden="true"
                className="pointer-events-none absolute -bottom-40 -left-40 h-[420px] w-[420px] rounded-full opacity-15 blur-[120px]"
                style={{ background: ACCENTS.indigo.fill, color: INK }}
            />
        </section>
    );
}
