import { useState } from 'react';
import { motion } from 'framer-motion';
import { ACCENTS, TONE, INK, PAPER, SPRING } from '../lib/theme';

const weights = [
    { value: 200, label: 'Extra Light' },
    { value: 300, label: 'Light' },
    { value: 400, label: 'Regular' },
    { value: 500, label: 'Medium' },
    { value: 700, label: 'Bold' },
    { value: 900, label: 'Black' },
];

/* Bar colours are the darkened accent variants so the ratio labels stay
   legible on the light panel. The pastels used before measured as low as
   1.14:1 — the numbers were invisible. */
const scaleData = [
    { site: 'Wise Design', h1: 80, ratio: 5, color: ACCENTS.sage.ink },
    { site: 'Elvina Prasad', h1: 178, ratio: 6.6, color: ACCENTS.indigo.ink },
    { site: 'Simone Sniekers', h1: 120, ratio: 7.5, color: ACCENTS.orange.ink },
    { site: 'Sarah Fatmi', h1: 150, ratio: 9.4, color: ACCENTS.blue.ink },
    { site: 'Instagram Brand', h1: 200, ratio: 12.5, color: ACCENTS.magenta.ink },
    { site: 'Clauaskee', h1: 500, ratio: 31, color: ACCENTS.rose.ink },
];

const a = ACCENTS.magenta;
const t = TONE.paper;

function Slider({
    label, value, min, max, step, onChange, display, onDark,
}: {
    label: string; value: number; min: number; max: number; step: number;
    onChange: (v: number) => void; display: string; onDark?: boolean;
}) {
    // Full white on the magenta fill: 75% white lands at 2.97:1.
    const fg = onDark ? '#FFFFFF' : t.muted;
    return (
        <div className="flex items-center gap-4">
            <label className="w-20 shrink-0 font-mono text-[10px] tracking-[0.14em] uppercase" style={{ color: fg }}>
                {label}
            </label>
            <input
                type="range"
                min={min}
                max={max}
                step={step}
                value={value}
                onChange={(e) => onChange(parseFloat(e.target.value))}
                className="w-full"
                aria-label={label}
                style={{
                    ['--track' as string]: onDark ? 'rgba(255,255,255,0.28)' : 'rgba(16,15,20,0.16)',
                    ['--thumb' as string]: onDark ? '#fff' : INK,
                }}
            />
            <span
                className="w-20 shrink-0 text-right font-mono text-[11px] tabular-nums"
                style={{ color: onDark ? '#fff' : t.text }}
            >
                {display}
            </span>
        </div>
    );
}

export default function TypographyRules() {
    const [weight, setWeight] = useState(300);
    const [tracking, setTracking] = useState(-0.03);
    const [size, setSize] = useState(4.4);
    const [leading, setLeading] = useState(1.05);
    const [hovered, setHovered] = useState<string | null>(null);

    const css = `font-weight: ${weight};
font-size: ${size.toFixed(1)}rem;
letter-spacing: ${tracking.toFixed(3)}em;
line-height: ${leading.toFixed(2)};`;

    return (
        <div className="space-y-24">
            {/* Rule 01 — the single typeface doctrine */}
            <div
                className="grid grid-cols-1 overflow-hidden rounded-3xl lg:grid-cols-2"
                style={{ background: t.surface, border: `1px solid ${t.line}` }}
            >
                <div className="flex items-center justify-center p-10 md:p-16" style={{ background: PAPER }}>
                    <motion.span
                        className="display text-[clamp(9rem,22vw,20rem)] leading-[1.1] font-bold select-none"
                        style={{ color: a.fill, fontWeight: weight, letterSpacing: `${tracking}em` }}
                        initial={{ opacity: 0, scale: 0.85 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ type: 'spring', stiffness: 100, damping: 20 }}
                    >
                        Aa
                    </motion.span>
                </div>

                <div className="flex flex-col justify-center p-10 md:p-14 lg:p-16">
                    <h3 className="mb-5 font-mono text-[10px] tracking-[0.2em] uppercase" style={{ color: a.ink }}>
                        Rule 01 — The Single Typeface Doctrine
                    </h3>
                    <p className="mb-10 text-xl leading-relaxed font-light md:text-2xl" style={{ color: t.muted }}>
                        5 of 7 premium sites use a{' '}
                        <strong className="font-bold" style={{ color: t.text }}>single font family</strong>.
                        Hierarchy comes from scale and weight, not variety.
                    </p>

                    <div className="flex flex-wrap gap-2">
                        {weights.map((w) => {
                            const on = weight === w.value;
                            return (
                                <motion.button
                                    key={w.value}
                                    onClick={() => setWeight(w.value)}
                                    whileTap={{ scale: 0.95 }}
                                    data-cursor={w.label}
                                    aria-pressed={on}
                                    className="rounded-lg border px-4 py-2 font-mono text-xs transition-colors duration-200"
                                    style={{
                                        background: on ? a.fill : 'transparent',
                                        color: on ? a.on : t.muted,
                                        borderColor: on ? a.fill : t.line,
                                    }}
                                >
                                    {w.value}
                                </motion.button>
                            );
                        })}
                    </div>
                </div>
            </div>

            {/* Live specimen — four axes, and the CSS it produces */}
            <div className="overflow-hidden rounded-3xl" style={{ background: a.fill }}>
                <div className="p-8 md:p-14">
                    {/* No framer `layout` here: layout animation scales text nodes
                        and visibly distorts glyphs mid-transition. */}
                    <p
                        className="text-white transition-[font-variation-settings] duration-200"
                        style={{
                            fontWeight: weight,
                            letterSpacing: `${tracking}em`,
                            fontSize: `clamp(1.6rem, ${size}vw, ${size}rem)`,
                            lineHeight: leading,
                        }}
                    >
                        One font is enough — if you master scale, weight, and spacing.
                    </p>
                </div>

                <div
                    className="grid gap-x-10 gap-y-4 px-8 pt-8 pb-10 md:px-14 lg:grid-cols-2"
                    style={{ borderTop: '1px solid rgba(255,255,255,0.22)' }}
                >
                    <Slider onDark label="Weight" min={100} max={900} step={100} value={weight} onChange={setWeight} display={String(weight)} />
                    <Slider onDark label="Size" min={2} max={7} step={0.1} value={size} onChange={setSize} display={`${size.toFixed(1)}rem`} />
                    <Slider onDark label="Tracking" min={-0.06} max={0.16} step={0.005} value={tracking} onChange={setTracking} display={`${tracking.toFixed(3)}em`} />
                    <Slider onDark label="Leading" min={0.85} max={1.8} step={0.01} value={leading} onChange={setLeading} display={leading.toFixed(2)} />
                </div>

                <pre
                    className="overflow-x-auto px-8 py-5 font-mono text-[11px] leading-relaxed md:px-14"
                    style={{ background: 'rgba(0,0,0,0.28)', color: '#FFFFFF' }}
                >
                    {css}
                </pre>
            </div>

            {/* Rule 02 — scale contrast */}
            <div
                className="grid grid-cols-1 overflow-hidden rounded-3xl lg:grid-cols-[1fr_2fr]"
                style={{ border: `1px solid ${t.line}` }}
            >
                <div className="flex flex-col justify-center p-10 md:p-14" style={{ background: INK }}>
                    <h3 className="mb-5 font-mono text-[10px] tracking-[0.2em] uppercase" style={{ color: a.up }}>
                        Rule 02 — Extreme Scale Contrast
                    </h3>
                    <p className="text-xl leading-relaxed font-light md:text-2xl" style={{ color: TONE.ink.muted }}>
                        Display-to-body ratios run{' '}
                        <strong className="font-bold" style={{ color: TONE.ink.text }}>5:1 to 31:1</strong>.
                    </p>
                    <p className="mt-6 font-mono text-[10px] tracking-[0.14em] uppercase" style={{ color: TONE.ink.faint }}>
                        Hover a row to isolate it
                    </p>
                </div>

                <div className="p-6 md:p-10" style={{ background: t.surface }}>
                    <div className="grid h-full content-center gap-2">
                        {scaleData.map((s, i) => {
                            const isHovered = hovered === s.site;
                            const dimmed = hovered !== null && !isHovered;
                            return (
                                <motion.div
                                    key={s.site}
                                    initial={{ opacity: 0, x: -24 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ ...SPRING, delay: i * 0.07 }}
                                    onMouseEnter={() => setHovered(s.site)}
                                    onMouseLeave={() => setHovered(null)}
                                    animate={{ opacity: dimmed ? 0.4 : 1 }}
                                    className="flex cursor-default items-center gap-4 rounded-xl p-3 transition-colors duration-200 md:gap-6"
                                    style={{
                                        background: isHovered ? PAPER : 'transparent',
                                        boxShadow: isHovered ? '0 6px 24px rgba(16,15,20,0.09)' : 'none',
                                    }}
                                >
                                    <span className="w-24 shrink-0 text-[11px] font-medium md:w-32 md:text-xs" style={{ color: t.text }}>
                                        {s.site}
                                    </span>
                                    <div className="relative h-6 flex-1 overflow-hidden rounded-full" style={{ background: 'rgba(16,15,20,0.09)' }}>
                                        <motion.div
                                            className="absolute top-0 left-0 h-full rounded-full"
                                            style={{ background: s.color }}
                                            initial={{ width: 0 }}
                                            whileInView={{ width: `${Math.min(100, (s.h1 / 500) * 100)}%` }}
                                            viewport={{ once: true }}
                                            transition={{ duration: 1, delay: i * 0.09, ease: [0.16, 1, 0.3, 1] }}
                                        />
                                    </div>
                                    <span
                                        className="w-14 shrink-0 text-right font-mono text-[11px] font-medium tabular-nums"
                                        style={{ color: s.color }}
                                    >
                                        {s.ratio}:1
                                    </span>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
}
