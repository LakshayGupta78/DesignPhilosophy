import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ACCENTS, TONE, INK, PAPER, SPRING, contrast, grade } from '../lib/theme';

/**
 * Wise and Instagram publish their palettes, so those two use the
 * documented values. The five portfolio sites do not, so those are
 * sampled from the sites themselves.
 */
const palettes = [
    { site: 'Elvina Prasad', color: '#808080', second: '#000000', label: 'Professional Authority', pair: 'Grey + Black' },
    { site: 'Simone Sniekers', color: '#F15A24', second: '#FFFFFF', label: 'Warmth → Purity', pair: 'Orange → White' },
    { site: 'Clauaskee', color: '#8E93FF', second: '#47F654', label: 'Creative Energy', pair: 'Lavender + Green' },
    { site: 'Raw Materials', color: '#FF6B6B', second: '#FFFF00', label: 'Bold Diversity', pair: 'Rainbow' },
    { site: 'Wise Design', color: '#9FE870', second: '#163300', label: 'Trust + Growth', pair: 'Bright Green + Forest' },
    { site: 'Instagram Brand', color: '#C13584', second: '#F77737', label: 'Playful + Premium', pair: 'Magenta + Sunset' },
    { site: 'Sarah Fatmi', color: '#B2A6FF', second: '#1B1245', label: 'Mystery + Wonder', pair: 'Purple + Navy' },
];

const t = TONE.paper;
const a = ACCENTS.orange;

/** Pick whichever of ink/white actually reads on this background. */
function readableOn(bg: string) {
    const onInk = contrast(INK, bg);
    const onWhite = contrast('#FFFFFF', bg);
    return onInk >= onWhite
        ? { color: INK, ratio: onInk, name: 'ink' }
        : { color: '#FFFFFF', ratio: onWhite, name: 'white' };
}

export default function ColorStory() {
    const [active, setActive] = useState(0);
    const current = palettes[active];
    const fg = useMemo(() => readableOn(current.color), [current.color]);

    return (
        <div className="space-y-24">
            <div
                className="grid grid-cols-1 overflow-hidden rounded-3xl lg:grid-cols-[minmax(240px,1fr)_2fr]"
                style={{ border: `1px solid ${t.line}` }}
            >
                {/* Palette list */}
                <div className="p-6 md:p-8" style={{ background: INK }}>
                    <p className="mb-6 font-mono text-[10px] tracking-[0.2em] uppercase" style={{ color: TONE.ink.faint }}>
                        Color Psychology
                    </p>
                    <div className="space-y-1.5">
                        {palettes.map((e, i) => {
                            const on = active === i;
                            return (
                                <motion.button
                                    key={e.site}
                                    onClick={() => setActive(i)}
                                    whileTap={{ scale: 0.98 }}
                                    data-cursor="view"
                                    aria-pressed={on}
                                    className="flex w-full items-center gap-4 rounded-xl px-4 py-3 text-left transition-colors duration-200"
                                    style={{
                                        background: on ? 'rgba(246,244,239,0.10)' : 'transparent',
                                        border: `1px solid ${on ? 'rgba(246,244,239,0.22)' : 'transparent'}`,
                                    }}
                                >
                                    <span className="flex shrink-0 -space-x-1.5">
                                        <span
                                            className="h-3.5 w-3.5 rounded-full ring-1 ring-black/30"
                                            style={{
                                                background: e.color,
                                                boxShadow: on ? `0 0 0 3px ${e.color}44` : 'none',
                                            }}
                                        />
                                        <span
                                            className="h-3.5 w-3.5 rounded-full ring-1 ring-black/30"
                                            style={{ background: e.second }}
                                        />
                                    </span>
                                    <span>
                                        <span className="block text-sm font-medium" style={{ color: TONE.ink.text }}>
                                            {e.site}
                                        </span>
                                        <span className="block text-[11px]" style={{ color: TONE.ink.muted }}>
                                            {e.pair}
                                        </span>
                                    </span>
                                </motion.button>
                            );
                        })}
                    </div>
                </div>

                {/* Active swatch — text colour is derived, not guessed */}
                <div className="relative min-h-[380px]">
                    <AnimatePresence mode="popLayout">
                        <motion.div
                            key={active}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="absolute inset-0 flex flex-col justify-between p-8 md:p-14 lg:p-16"
                            style={{ background: current.color }}
                        >
                            <div className="flex justify-end">
                                <span
                                    className="rounded-full px-3 py-1.5 font-mono text-[10px] tracking-[0.14em] uppercase"
                                    style={{
                                        background: fg.color,
                                        color: current.color,
                                    }}
                                >
                                    {fg.ratio.toFixed(2)}:1 · {grade(fg.ratio)}
                                </span>
                            </div>

                            <div>
                                <motion.p
                                    initial={{ y: 18, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    transition={SPRING}
                                    className="display display-safe mb-6 text-[clamp(2.2rem,5.5vw,5rem)] font-semibold tracking-[-0.025em]"
                                    style={{ color: fg.color }}
                                >
                                    {current.label}
                                </motion.p>
                                <p className="text-base font-light md:text-lg" style={{ color: fg.color }}>
                                    {current.site} — {current.pair}
                                </p>
                                <p className="mt-6 font-mono text-[10px] tracking-[0.16em] uppercase" style={{ color: fg.color }}>
                                    {current.color} + {current.second} · label auto-set to {fg.name}
                                </p>
                            </div>
                        </motion.div>
                    </AnimatePresence>
                </div>
            </div>

            {/* The rule this page follows on itself */}
            <div
                className="rounded-2xl p-8 md:p-10"
                style={{
                    background: t.surface,
                    border: `1px solid ${t.line}`,
                    borderLeft: `4px solid ${a.ink}`,
                }}
            >
                <p className="text-lg leading-relaxed font-medium md:text-xl" style={{ color: t.text }}>
                    <span style={{ color: a.ink }}>The rule:</span> a colour is only on brand if
                    something legible can sit on it. Every swatch above computes its own label
                    colour rather than guessing.
                </p>
            </div>

            {/* Monochromatic + one */}
            <div className="space-y-8">
                <h3 className="font-mono text-[10px] tracking-[0.2em] uppercase" style={{ color: a.ink }}>
                    The Monochromatic + One Pattern
                </h3>
                <p className="max-w-2xl text-xl leading-relaxed font-light" style={{ color: t.muted }}>
                    A neutral base, and strong colour reserved for{' '}
                    <strong className="font-bold" style={{ color: t.text }}>one job</strong>.
                </p>

                <div
                    className="grid h-40 grid-cols-5 overflow-hidden rounded-2xl"
                    style={{ border: `1px solid ${t.line}` }}
                >
                    {[
                        { bg: PAPER, label: 'Light', fg: 'rgba(16,15,20,0.55)' },
                        { bg: INK, label: 'Dark', fg: 'rgba(246,244,239,0.55)' },
                        { bg: a.fill, label: 'Accent', fg: a.on },
                        { bg: INK, label: 'Dark', fg: 'rgba(246,244,239,0.55)' },
                        { bg: PAPER, label: 'Light', fg: 'rgba(16,15,20,0.55)' },
                    ].map((s, i) => (
                        <motion.div
                            key={i}
                            className="flex items-center justify-center"
                            style={{
                                background: s.bg,
                                // Paper-on-paper cells vanished entirely without a divider.
                                borderRight: i < 4 ? `1px solid ${t.line}` : 'none',
                            }}
                            initial={{ scaleY: 0 }}
                            whileInView={{ scaleY: 1 }}
                            viewport={{ once: true }}
                            transition={{ ...SPRING, delay: i * 0.08 }}
                        >
                            <span className="font-mono text-[10px] tracking-[0.14em] uppercase" style={{ color: s.fg }}>
                                {s.label}
                            </span>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
}
