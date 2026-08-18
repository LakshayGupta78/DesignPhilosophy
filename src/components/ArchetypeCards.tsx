import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ACCENTS, TONE, INK, PAPER, SPRING } from '../lib/theme';

const t = TONE.paper;
const a = ACCENTS.rose;

/**
 * Each card declares bg / fg / accent explicitly.
 *
 * On saturated fills `muted` is the full-opacity `on` colour — white at 75%
 * over magenta is only 2.97:1. Hierarchy on those cards comes from size and
 * weight instead.
 *
 * Previously the archetype name was rendered in the card's own colour on a
 * background of that same colour — "The Ruler", "The Creator" and "The
 * Magician" all measured 1.00:1 and were completely invisible. Cards now
 * alternate between paper and a vivid fill, and the accent is always a
 * verified pairing.
 */
const archetypes = [
    {
        site: 'Elvina Prasad',
        archetype: 'The Sage',
        bg: PAPER, fg: INK, muted: 'rgba(16,15,20,0.62)', accent: '#4A4852',
        evidence: 'Authoritative type. Teaches rather than sells.',
        nav: 'Minimal → full-screen overlay',
        trend: 'Contemporary Minimalism',
        wide: true,
    },
    {
        site: 'Simone Sniekers',
        archetype: 'The Ruler',
        bg: ACCENTS.orange.fill, fg: ACCENTS.orange.on, muted: INK, accent: '#3A1405',
        evidence: 'Curated gallery. Zero explanation.',
        nav: 'Fixed footer bar with scroll %',
        trend: 'Editorial Minimalism',
    },
    {
        site: 'Clauaskee',
        archetype: 'The Creator',
        bg: ACCENTS.indigo.fill, fg: ACCENTS.indigo.on, muted: INK, accent: '#241C6B',
        evidence: 'Custom everything. Form over function.',
        nav: 'Simple sticky header',
        trend: 'Neo-Brutalism',
    },
    {
        site: 'Raw Materials',
        archetype: 'The Outlaw',
        bg: INK, fg: PAPER, muted: TONE.ink.muted, accent: '#FFE838',
        evidence: 'Self-described unusual. ASCII art, rule-breaking nav.',
        nav: 'Sticky left sidebar with colours',
        trend: 'Neo-Brutalism',
    },
    {
        site: 'Wise Design',
        archetype: 'The Caregiver',
        bg: TONE.paper.surface, fg: INK, muted: 'rgba(16,15,20,0.62)', accent: ACCENTS.sage.ink,
        evidence: 'Accessibility first. Documentation is the product.',
        nav: 'Documentation sidebar + top nav',
        trend: 'System Design',
    },
    {
        site: 'Instagram Brand',
        archetype: 'The Magician',
        bg: ACCENTS.magenta.fill, fg: ACCENTS.magenta.on, muted: '#FFFFFF', accent: '#FFFFFF',
        evidence: 'Squircle geometry as a magical thread.',
        nav: 'Minimal sticky icon',
        trend: 'Brand Minimalism',
    },
    {
        site: 'Sarah Fatmi',
        archetype: 'The Explorer',
        bg: TONE.paper.sunken, fg: INK, muted: 'rgba(16,15,20,0.62)', accent: ACCENTS.indigo.ink,
        evidence: 'Scroll to explore. A journey, not a page.',
        nav: 'Zero navigation',
        trend: 'Illustrative Maximalism',
    },
];

export default function ArchetypeCards() {
    const [open, setOpen] = useState<string | null>(null);

    return (
        <div className="space-y-20">
            <div
                className="grid overflow-hidden rounded-3xl md:grid-cols-2 lg:grid-cols-3"
                style={{ border: `1px solid ${t.line}` }}
            >
                {archetypes.map((c, i) => {
                    const isOpen = open === c.site;
                    return (
                        <motion.button
                            key={c.site}
                            layout
                            onClick={() => setOpen(isOpen ? null : c.site)}
                            initial={{ opacity: 0, y: 26 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: '-50px' }}
                            transition={{ ...SPRING, delay: i * 0.05 }}
                            data-cursor={isOpen ? 'close' : 'expand'}
                            aria-expanded={isOpen}
                            className={`flex min-h-[290px] flex-col justify-between p-8 text-left md:p-10 ${c.wide ? 'md:col-span-2' : ''
                                }`}
                            style={{ background: c.bg, color: c.fg }}
                        >
                            {/* Collapsed, the card is typographic: the archetype is the
                                headline and everything else waits behind the +. */}
                            <div>
                                <div className="mb-8 flex items-center gap-3">
                                    <motion.span
                                        className="h-2.5 w-2.5 shrink-0 rounded-full"
                                        style={{ background: c.accent }}
                                        animate={{ scale: [1, 1.25, 1], opacity: [1, 0.6, 1] }}
                                        transition={{ duration: 2.4, repeat: Infinity, delay: i * 0.25 }}
                                    />
                                    <span
                                        className="font-mono text-[9px] tracking-[0.18em] uppercase"
                                        style={{ color: c.muted }}
                                    >
                                        {c.site}
                                    </span>
                                </div>

                                <h4
                                    className="display display-safe text-[clamp(1.6rem,2.6vw,2.3rem)] font-semibold tracking-[-0.02em]"
                                    style={{ color: c.fg }}
                                >
                                    {c.archetype}
                                </h4>

                                <AnimatePresence initial={false}>
                                    {isOpen && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: 'auto', opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
                                            className="overflow-hidden"
                                        >
                                            <div
                                                className="mt-5 border-t pt-5"
                                                style={{ borderColor: `${c.fg}22` }}
                                            >
                                                <p className="text-sm leading-relaxed" style={{ color: c.muted }}>
                                                    {c.evidence}
                                                </p>
                                                <p
                                                    className="mt-3 font-mono text-[9px] tracking-[0.18em] uppercase"
                                                    style={{ color: c.accent }}
                                                >
                                                    {c.trend}
                                                </p>
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>

                            <div
                                className="mt-6 flex items-center justify-between gap-4 border-t pt-6"
                                style={{ borderColor: `${c.fg}1F` }}
                            >
                                <span className="font-mono text-[9px] tracking-[0.16em] uppercase" style={{ color: c.muted }}>
                                    {c.nav}
                                </span>
                                <motion.span
                                    animate={{ rotate: isOpen ? 45 : 0 }}
                                    className="font-mono text-base leading-none"
                                    style={{ color: c.accent }}
                                >
                                    +
                                </motion.span>
                            </div>
                        </motion.button>
                    );
                })}
            </div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={SPRING}
                className="rounded-2xl p-8 md:p-10"
                style={{
                    background: t.surface,
                    border: `1px solid ${t.line}`,
                    borderLeft: `4px solid ${a.ink}`,
                }}
            >
                <p className="text-lg leading-relaxed font-medium md:text-xl" style={{ color: t.text }}>
                    <span style={{ color: a.ink }}>Key insight:</span> only 1 of 7 uses a
                    traditional top bar.
                </p>
            </motion.div>
        </div>
    );
}
