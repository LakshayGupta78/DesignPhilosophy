import { useState } from 'react';
import { motion } from 'framer-motion';
import { ACCENTS, TONE, INK, PAPER, SPRING } from '../lib/theme';

const t = TONE.paper;
const a = ACCENTS.blue;

const items = [
    { label: 'Hero', span: 'col-span-2 row-span-2' },
    { label: 'Nav', span: 'col-span-1 row-span-1' },
    { label: 'Card', span: 'col-span-1 row-span-1' },
    { label: 'Feature', span: 'col-span-2 row-span-1' },
    { label: 'Sidebar', span: 'col-span-1 row-span-2' },
    { label: 'Content', span: 'col-span-1 row-span-1' },
    { label: 'Footer', span: 'col-span-2 row-span-1' },
    { label: 'CTA', span: 'col-span-1 row-span-1' },
];

/* Each cell pairs a fill with the text colour that is legible on it. */
const cells = [
    { bg: ACCENTS.blue.fill, fg: ACCENTS.blue.on },
    { bg: INK, fg: TONE.ink.muted },
    { bg: PAPER, fg: TONE.paper.faint },
    { bg: ACCENTS.magenta.fill, fg: ACCENTS.magenta.on },
    { bg: ACCENTS.orange.fill, fg: ACCENTS.orange.on },
    { bg: PAPER, fg: TONE.paper.faint },
    { bg: TONE.paper.sunken, fg: TONE.paper.muted },
    { bg: ACCENTS.sage.fill, fg: ACCENTS.sage.on },
];

function Slider({
    label, value, min, max, step, display, onChange,
}: {
    label: string; value: number; min: number; max: number; step: number; display: string; onChange: (v: number) => void;
}) {
    return (
        <div className="flex items-center gap-4">
            <label className="w-16 shrink-0 font-mono text-[10px] tracking-[0.14em] uppercase text-white">
                {label}
            </label>
            <input
                type="range" min={min} max={max} step={step} value={value}
                onChange={(e) => onChange(parseFloat(e.target.value))}
                className="w-full" aria-label={label}
                style={{
                    ['--track' as string]: 'rgba(255,255,255,0.3)',
                    ['--thumb' as string]: '#fff',
                }}
            />
            <span className="w-12 shrink-0 text-right font-mono text-[11px] tabular-nums text-white">
                {display}
            </span>
        </div>
    );
}

export default function WhitespaceGrid() {
    const [gap, setGap] = useState(12);
    const [radius, setRadius] = useState(12);
    const [pad, setPad] = useState(24);

    return (
        <div className="space-y-20">
            <div
                className="grid grid-cols-1 overflow-hidden rounded-3xl lg:grid-cols-[minmax(280px,1fr)_2fr]"
                style={{ border: `1px solid ${t.line}` }}
            >
                <div className="flex flex-col justify-between gap-10 p-8 md:p-12" style={{ background: a.fill }}>
                    <div>
                        <h3 className="mb-5 font-mono text-[10px] tracking-[0.2em] uppercase text-white/70">
                            Whitespace Density
                        </h3>
                        <p className="text-xl leading-relaxed font-light text-white md:text-2xl">
                            Same eight modules. Move the sliders and watch them go from
                            cramped to <strong className="font-bold text-white">composed</strong>.
                        </p>
                    </div>

                    <div className="space-y-4">
                        <Slider label="Gap" min={0} max={28} step={1} value={gap} display={`${gap}px`} onChange={setGap} />
                        <Slider label="Radius" min={0} max={32} step={1} value={radius} display={`${radius}px`} onChange={setRadius} />
                        <Slider label="Padding" min={0} max={56} step={2} value={pad} display={`${pad}px`} onChange={setPad} />
                    </div>
                </div>

                <div
                    className="transition-[padding] duration-200"
                    style={{ background: t.surface, padding: `${pad}px`, borderLeft: `1px solid ${t.line}` }}
                >
                    <motion.div
                        layout
                        transition={SPRING}
                        className="grid h-full auto-rows-[110px] grid-cols-3"
                        style={{ gap: `${gap}px` }}
                    >
                        {items.map((item, i) => {
                            const c = cells[i];
                            return (
                                <motion.div
                                    key={item.label}
                                    layout
                                    transition={SPRING}
                                    className={`${item.span} flex cursor-default items-center justify-center`}
                                    style={{ background: c.bg, borderRadius: `${radius}px` }}
                                    whileHover={{ scale: 1.03, zIndex: 1 }}
                                    data-cursor={item.label}
                                >
                                    <span className="font-mono text-[10px] tracking-[0.1em] uppercase" style={{ color: c.fg }}>
                                        {item.label}
                                    </span>
                                </motion.div>
                            );
                        })}
                    </motion.div>
                </div>
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
                    <span style={{ color: a.ink }}>Pattern:</span> Sniekers floats images in
                    vast space. Raw Materials packs them tight. Both work — what matters is intent,
                    not amount.
                </p>
            </motion.div>
        </div>
    );
}
