import { useState } from 'react';
import { motion } from 'framer-motion';

const weights = [
    { value: 100, label: 'Thin' },
    { value: 300, label: 'Light' },
    { value: 400, label: 'Regular' },
    { value: 500, label: 'Medium' },
    { value: 700, label: 'Bold' },
    { value: 900, label: 'Black' },
];

const scaleData = [
    { site: 'Wise Design', h1: 80, body: 16, ratio: '5:1', color: '#9FE870' },
    { site: 'Elvina Prasad', h1: 178, body: 27, ratio: '6.6:1', color: '#E9D5FF' },
    { site: 'Simone Sniekers', h1: 120, body: 16, ratio: '7.5:1', color: '#F15A24' },
    { site: 'Sarah Fatmi', h1: 150, body: 16, ratio: '9.4:1', color: '#C4B5FD' },
    { site: 'Instagram Brand', h1: 200, body: 16, ratio: '12.5:1', color: '#D300C5' },
    { site: 'Clauaskee', h1: 500, body: 16, ratio: '31:1', color: '#A5F3FC' },
];

const spring = { type: 'spring' as const, stiffness: 170, damping: 26 };

export default function TypographyRules() {
    const [activeWeight, setActiveWeight] = useState(500);
    const [tracking, setTracking] = useState(0);
    const [hoveredBar, setHoveredBar] = useState<string | null>(null);

    return (
        <div className="space-y-32">
            {/* Rule 1 — Instagram bento: giant colored letter + text explanation */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 rounded-3xl overflow-hidden" style={{ minHeight: '600px' }}>
                {/* Left: Giant magenta letter on white — like Instagram's "a" section */}
                <div className="flex items-center justify-center p-16" style={{ background: '#FFFFFF' }}>
                    <motion.span
                        className="text-[clamp(15rem,25vw,25rem)] font-black leading-none select-none"
                        style={{ color: '#D300C5' }}
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ type: 'spring', stiffness: 100, damping: 20 }}
                    >
                        Aa
                    </motion.span>
                </div>

                {/* Right: Text explanation on white */}
                <div className="flex flex-col justify-center p-16 lg:p-20">
                    <h3 className="text-xs font-medium tracking-[0.2em] uppercase mb-6" style={{ color: '#D300C5' }}>
                        Rule 01 — The Single Typeface Doctrine
                    </h3>
                    <p className="text-2xl md:text-3xl font-light leading-relaxed mb-12" style={{ color: 'rgba(26,26,26,0.6)' }}>
                        5 of 7 premium websites use a <strong className="font-bold text-[#1a1a1a]">single font family</strong>.
                        Hierarchy emerges from scale, weight, and spacing — not font variety.
                    </p>

                    {/* Weight buttons */}
                    <div className="flex flex-wrap gap-2">
                        {weights.map((w) => (
                            <motion.button
                                key={w.value}
                                onClick={() => setActiveWeight(w.value)}
                                whileTap={{ scale: 0.96 }}
                                className="px-4 py-2 text-xs font-mono rounded-lg border transition-colors duration-200"
                                style={{
                                    background: activeWeight === w.value ? '#D300C5' : 'transparent',
                                    color: activeWeight === w.value ? '#fff' : 'rgba(26,26,26,0.4)',
                                    borderColor: activeWeight === w.value ? '#D300C5' : 'rgba(0,0,0,0.08)',
                                }}
                            >
                                {w.value}
                            </motion.button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Interactive specimen — magenta bento block */}
            <div className="rounded-3xl overflow-hidden" style={{ background: '#D300C5' }}>
                <div className="p-12 md:p-20">
                    <motion.p
                        layout
                        transition={spring}
                        className="text-[clamp(2.5rem,5vw,5rem)] leading-[1.1] text-white"
                        style={{ fontWeight: activeWeight, letterSpacing: `${tracking}em` }}
                    >
                        One font is enough — if you master scale, weight, and spacing.
                    </motion.p>
                </div>
                <div className="px-12 md:px-20 pb-10 flex items-center gap-6">
                    <label className="text-xs font-mono shrink-0 text-white/40">Tracking</label>
                    <input
                        type="range"
                        min="-0.05"
                        max="0.15"
                        step="0.005"
                        value={tracking}
                        onChange={(e) => setTracking(parseFloat(e.target.value))}
                        className="w-full max-w-sm"
                        style={{ accentColor: '#fff' }}
                    />
                    <span className="text-xs font-mono w-16 text-right text-white/70">{tracking.toFixed(3)}em</span>
                </div>
            </div>

            {/* Rule 2 — Bento grid: scale contrast bars */}
            <div className="space-y-12">
                <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-0 rounded-3xl overflow-hidden" style={{ minHeight: '500px' }}>
                    {/* Left: Explanation on black */}
                    <div className="p-16 flex flex-col justify-center" style={{ background: '#0A0A0A' }}>
                        <h3 className="text-xs font-medium tracking-[0.2em] uppercase mb-6" style={{ color: '#D300C5' }}>
                            Rule 02 — Extreme Scale Contrast
                        </h3>
                        <p className="text-2xl font-light leading-relaxed text-white/70">
                            The ratio between the largest heading and body text is consistently
                            <strong className="font-bold text-white"> 5:1 to 31:1</strong>.
                        </p>
                    </div>

                    {/* Right: Bar chart on light grey */}
                    <div className="p-10" style={{ background: '#F5F5F5' }}>
                        <div className="grid gap-3 h-full content-center">
                            {scaleData.map((s, i) => {
                                const barWidth = Math.min(100, (s.h1 / 500) * 100);
                                const isHovered = hoveredBar === s.site;
                                return (
                                    <motion.div
                                        key={s.site}
                                        initial={{ opacity: 0, x: -30 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ ...spring, delay: i * 0.08 }}
                                        onMouseEnter={() => setHoveredBar(s.site)}
                                        onMouseLeave={() => setHoveredBar(null)}
                                        className="rounded-xl p-4 flex items-center gap-6 transition-all duration-200 cursor-default"
                                        style={{
                                            background: isHovered ? '#FFFFFF' : 'transparent',
                                            boxShadow: isHovered ? '0 4px 20px rgba(0,0,0,0.06)' : 'none',
                                        }}
                                    >
                                        <span className="text-xs font-medium w-32 shrink-0 text-[#1a1a1a]">{s.site}</span>
                                        <div className="flex-1 relative h-6 rounded-full overflow-hidden" style={{ background: 'rgba(0,0,0,0.06)' }}>
                                            <motion.div
                                                className="absolute top-0 left-0 h-full rounded-full"
                                                style={{ background: s.color }}
                                                initial={{ width: 0 }}
                                                whileInView={{ width: `${barWidth}%` }}
                                                viewport={{ once: true }}
                                                transition={{ duration: 1, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                                            />
                                        </div>
                                        <span className="text-[10px] font-mono w-24 text-right shrink-0" style={{ color: s.color }}>{s.ratio}</span>
                                    </motion.div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
