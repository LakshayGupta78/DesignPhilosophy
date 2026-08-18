import { useRef, type ReactNode } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { ACCENTS, TONE, type AccentName, type Tone } from '../lib/theme';

interface Props {
    id: string;
    number: string;
    title: string;
    subtitle: string;
    children: ReactNode;
    accent: AccentName;
    tone?: Tone;
}

/**
 * Scroll-driven word reveal.
 *
 * The un-revealed state used to be the text colour at 15% alpha, which
 * measured 1.35:1 against paper — effectively invisible, and most of every
 * subtitle sat in that state. It now rests at 4.6:1 (AA) and resolves to
 * 17:1, so the effect still reads as a reveal but the copy is legible the
 * whole way through.
 */
function RevealText({ text, base, active }: { text: string; base: string; active: string }) {
    const ref = useRef<HTMLParagraphElement>(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ['start 0.9', 'start 0.35'],
    });
    const smooth = useSpring(scrollYProgress, { stiffness: 200, damping: 40, mass: 0.4 });
    const words = text.split(' ');

    return (
        <p ref={ref} className="max-w-3xl text-lg leading-relaxed font-light md:text-xl">
            {words.map((word, i) => (
                <Word key={i} progress={smooth} index={i} total={words.length} base={base} active={active}>
                    {word}
                </Word>
            ))}
        </p>
    );
}

function Word({
    progress,
    index,
    total,
    base,
    active,
    children,
}: {
    progress: ReturnType<typeof useSpring>;
    index: number;
    total: number;
    base: string;
    active: string;
    children: ReactNode;
}) {
    const start = index / total;
    const end = (index + 1) / total;
    const color = useTransform(progress, [start, end], [base, active]);
    return <motion.span style={{ color }}>{children} </motion.span>;
}

export default function ChapterHeading({
    id,
    number,
    title,
    subtitle,
    children,
    accent,
    tone = 'paper',
}: Props) {
    const sectionRef = useRef<HTMLElement>(null);
    const t = TONE[tone];
    const a = ACCENTS[accent];
    // On dark sections the vivid fill reads well; on paper we need the
    // darkened variant to clear 4.5:1.
    const accentText = tone === 'ink' ? a.up : a.ink;

    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ['start end', 'end start'],
    });
    const markY = useTransform(scrollYProgress, [0, 1], [60, -60]);

    return (
        <section
            ref={sectionRef}
            id={id}
            className="relative min-h-screen scroll-mt-0 overflow-hidden px-6 py-24 md:px-14 md:py-28 lg:px-24"
            style={{ background: t.bg, color: t.text }}
        >
            {/* Oversized chapter numeral, parallaxed behind the content */}
            <motion.span
                aria-hidden="true"
                style={{ y: markY, color: accentText, opacity: 0.07 }}
                className="display pointer-events-none absolute -top-8 right-2 text-[clamp(9rem,26vw,26rem)] leading-none font-bold tracking-[-0.05em] select-none md:right-10"
            >
                {number}
            </motion.span>

            <div className="relative mx-auto max-w-7xl">
                <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-80px' }}
                    transition={{ duration: 0.6 }}
                    className="mb-5 flex items-center gap-4"
                >
                    <span className="h-px w-10" style={{ background: accentText }} />
                    <span
                        className="font-mono text-[10px] font-medium tracking-[0.3em] uppercase"
                        style={{ color: accentText }}
                    >
                        Chapter {number}
                    </span>
                </motion.div>

                <motion.h2
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-80px' }}
                    transition={{ type: 'spring', stiffness: 140, damping: 22 }}
                    className="display display-safe mb-8 text-[clamp(2.4rem,5.5vw,4.5rem)] font-semibold tracking-[-0.03em]"
                >
                    {title}
                </motion.h2>

                <div className="mb-16 md:mb-24">
                    <RevealText text={subtitle} base={t.faint} active={t.text} />
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-60px' }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                >
                    {children}
                </motion.div>
            </div>
        </section>
    );
}
