import { useState } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform } from 'framer-motion';
import { ACCENTS, TONE, INK, PAPER } from '../lib/theme';
import Marquee from './Marquee';

const t = TONE.ink;
const a = ACCENTS.indigo;

const PRESETS = [
    { name: 'Gentle', stiffness: 90, damping: 26, mass: 1 },
    { name: 'Default', stiffness: 170, damping: 26, mass: 1 },
    { name: 'Snappy', stiffness: 400, damping: 34, mass: 0.8 },
    { name: 'Bouncy', stiffness: 260, damping: 11, mass: 1 },
    { name: 'Molasses', stiffness: 40, damping: 18, mass: 2.4 },
];

function Slider({
    label, value, min, max, step, onChange,
}: {
    label: string; value: number; min: number; max: number; step: number; onChange: (v: number) => void;
}) {
    return (
        <div className="flex items-center gap-4">
            <label className="w-20 shrink-0 font-mono text-[10px] tracking-[0.14em] uppercase" style={{ color: t.muted }}>
                {label}
            </label>
            <input
                type="range" min={min} max={max} step={step} value={value}
                onChange={(e) => onChange(parseFloat(e.target.value))}
                className="w-full" aria-label={label}
                style={{
                    ['--track' as string]: 'rgba(246,244,239,0.22)',
                    ['--thumb' as string]: a.fill,
                }}
            />
            <span className="w-12 shrink-0 text-right font-mono text-[11px] tabular-nums" style={{ color: t.text }}>
                {value}
            </span>
        </div>
    );
}

export default function MotionPhysics() {
    const [stiffness, setStiffness] = useState(170);
    const [damping, setDamping] = useState(26);
    const [mass, setMass] = useState(1);
    const [showModal, setShowModal] = useState(false);
    const [flipped, setFlipped] = useState(false);
    const [runKey, setRunKey] = useState(0);

    const spring = { type: 'spring' as const, stiffness, damping, mass };

    const dragX = useMotionValue(0);
    const dragRotate = useTransform(dragX, [-160, 160], [-12, 12]);

    const activePreset = PRESETS.find(
        (p) => p.stiffness === stiffness && p.damping === damping && p.mass === mass
    );

    return (
        <div className="space-y-20">
            <div className="max-w-2xl">
                <h3 className="mb-5 font-mono text-[10px] tracking-[0.2em] uppercase" style={{ color: a.fill }}>
                    Spring Physics — Not Easing Curves
                </h3>
                <p className="text-xl leading-relaxed font-light md:text-2xl" style={{ color: t.muted }}>
                    <strong className="font-bold" style={{ color: t.text }}>Stiffness and damping</strong>,
                    not duration. Drag the numbers.
                </p>
            </div>

            {/* The control room */}
            <div className="overflow-hidden rounded-3xl" style={{ background: INK, border: `1px solid ${t.line}` }}>
                <div className="grid gap-x-12 gap-y-5 p-8 md:p-12 lg:grid-cols-3">
                    <Slider label="Stiffness" min={20} max={500} step={10} value={stiffness} onChange={setStiffness} />
                    <Slider label="Damping" min={4} max={60} step={1} value={damping} onChange={setDamping} />
                    <Slider label="Mass" min={0.2} max={3} step={0.1} value={mass} onChange={setMass} />
                </div>

                <div className="flex flex-wrap gap-2 px-8 pb-8 md:px-12" >
                    {PRESETS.map((p) => {
                        const on = activePreset?.name === p.name;
                        return (
                            <button
                                key={p.name}
                                onClick={() => { setStiffness(p.stiffness); setDamping(p.damping); setMass(p.mass); setRunKey((k) => k + 1); }}
                                data-cursor="apply"
                                aria-pressed={on}
                                className="rounded-full px-4 py-2 font-mono text-[10px] tracking-[0.14em] uppercase transition-colors duration-200"
                                style={{
                                    background: on ? a.fill : 'transparent',
                                    color: on ? a.on : t.muted,
                                    border: `1px solid ${on ? a.fill : t.line}`,
                                }}
                            >
                                {p.name}
                            </button>
                        );
                    })}
                    <button
                        onClick={() => setRunKey((k) => k + 1)}
                        data-cursor="replay"
                        className="ml-auto rounded-full px-4 py-2 font-mono text-[10px] tracking-[0.14em] uppercase"
                        style={{ background: PAPER, color: INK }}
                    >
                        ▶ Replay all
                    </button>
                </div>

                <pre
                    className="overflow-x-auto px-8 py-5 font-mono text-[11px] md:px-12"
                    style={{ background: 'rgba(0,0,0,0.4)', color: t.text, borderTop: `1px solid ${t.line}` }}
                >
                    {`transition={{ type: 'spring', stiffness: ${stiffness}, damping: ${damping}, mass: ${mass} }}`}
                </pre>
            </div>

            {/* Demos, all sharing the one live spring */}
            <div className="grid grid-cols-1 overflow-hidden rounded-3xl md:grid-cols-2">
                {/* Travel — the clearest read on overshoot */}
                <div className="flex min-h-[300px] flex-col justify-between p-8 md:p-12" style={{ background: INK, borderRight: `1px solid ${t.line}`, borderBottom: `1px solid ${t.line}` }}>
                    <p className="font-mono text-[10px] tracking-[0.14em] uppercase" style={{ color: t.faint }}>
                        Overshoot
                    </p>
                    <div className="my-8 flex-1">
                        <div className="relative h-full min-h-[90px] w-full rounded-xl" style={{ background: 'rgba(246,244,239,0.05)' }}>
                            <motion.div
                                key={`travel-${runKey}-${stiffness}-${damping}-${mass}`}
                                className="absolute top-1/2 h-14 w-14 -translate-y-1/2 rounded-2xl"
                                style={{ background: a.fill }}
                                initial={{ left: '2%' }}
                                animate={{ left: flipped ? '2%' : 'calc(100% - 3.5rem - 2%)' }}
                                transition={spring}
                            />
                        </div>
                    </div>
                    <button
                        onClick={() => setFlipped((f) => !f)}
                        data-cursor="launch"
                        className="self-start rounded-full px-5 py-2.5 font-mono text-[10px] tracking-[0.14em] uppercase"
                        style={{ background: a.fill, color: a.on }}
                    >
                        Launch →
                    </button>
                </div>

                {/* Drag */}
                <div className="flex min-h-[300px] flex-col justify-between p-8 md:p-12" style={{ background: INK, borderBottom: `1px solid ${t.line}` }}>
                    <p className="font-mono text-[10px] tracking-[0.14em] uppercase" style={{ color: t.faint }}>
                        Drag
                    </p>
                    <div className="flex flex-1 items-center justify-center">
                        <motion.div
                            drag="x"
                            dragConstraints={{ left: -110, right: 110 }}
                            dragElastic={0.25}
                            dragTransition={{ bounceStiffness: stiffness, bounceDamping: damping }}
                            style={{ x: dragX, rotate: dragRotate, background: PAPER }}
                            whileTap={{ scale: 0.95 }}
                            data-cursor="drag"
                            className="flex h-24 w-40 cursor-grab items-center justify-center rounded-2xl select-none active:cursor-grabbing"
                        >
                            <span className="text-sm font-bold" style={{ color: INK }}>← Drag →</span>
                        </motion.div>
                    </div>
                    <p className="font-mono text-[10px]" style={{ color: t.faint }}>
                        Release to feel the bounce
                    </p>
                </div>

                {/* Stagger */}
                <div className="min-h-[300px] p-8 md:p-12" style={{ background: a.fill, borderRight: `1px solid rgba(16,15,20,0.12)` }}>
                    <p className="mb-7 font-mono text-[10px] tracking-[0.14em] uppercase" style={{ color: INK }}>
                        Stagger
                    </p>
                    <div className="space-y-3">
                        {['Hero Section', 'Navigation', 'Content Grid', 'Footer'].map((item, i) => (
                            <motion.div
                                key={`${item}-${runKey}-${stiffness}-${damping}-${mass}`}
                                initial={{ opacity: 0, x: -28 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ ...spring, delay: i * 0.08 }}
                                className="rounded-xl px-5 py-3 text-sm font-medium"
                                style={{ background: 'rgba(16,15,20,0.10)', color: INK }}
                            >
                                {item}
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* Modal — now inside AnimatePresence, so it actually animates out */}
                <div className="relative flex min-h-[300px] flex-col justify-between overflow-hidden p-8 md:p-12" style={{ background: INK }}>
                    <p className="font-mono text-[10px] tracking-[0.14em] uppercase" style={{ color: t.faint }}>
                        Enter · exit
                    </p>
                    <div className="relative flex flex-1 items-center justify-center">
                        <button
                            onClick={() => setShowModal((s) => !s)}
                            data-cursor={showModal ? 'close' : 'open'}
                            className="rounded-xl px-8 py-4 text-sm font-bold"
                            style={{ background: PAPER, color: INK }}
                        >
                            {showModal ? 'Close' : 'Open'} modal
                        </button>

                        <AnimatePresence>
                            {showModal && (
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.8, y: 24 }}
                                    animate={{ opacity: 1, scale: 1, y: 0 }}
                                    exit={{ opacity: 0, scale: 0.8, y: 24 }}
                                    transition={spring}
                                    className="absolute inset-x-0 top-0 rounded-2xl p-7"
                                    style={{ background: PAPER, boxShadow: '0 30px 60px rgba(0,0,0,0.45)' }}
                                >
                                    <p className="text-sm leading-relaxed" style={{ color: INK }}>
                                        Low damping wobbles. High stiffness snaps.
                                    </p>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>
            </div>

            {/* Ticker */}
            <div className="overflow-hidden rounded-3xl py-10" style={{ background: INK, border: `1px solid ${t.line}` }}>
                <p className="mb-6 px-8 font-mono text-[10px] tracking-[0.14em] uppercase md:px-12" style={{ color: t.faint }}>
                    Hover to pause
                </p>
                <Marquee duration={34}>
                    <span className="px-6 text-3xl font-black tracking-tight" style={{ color: a.fill }}>
                        ANIMATION IS MEANINGFUL • TICKERS BROADCAST ENERGY • PARALLAX CREATES IMMERSION •
                    </span>
                </Marquee>
            </div>

            <div
                className="rounded-2xl p-8 md:p-10"
                style={{ background: 'rgba(142,147,255,0.10)', borderLeft: `4px solid ${a.fill}` }}
            >
                <p className="text-lg leading-relaxed font-medium md:text-xl" style={{ color: t.text }}>
                    <span style={{ color: a.fill }}>Key:</span> animation is never decorative.
                </p>
            </div>
        </div>
    );
}
