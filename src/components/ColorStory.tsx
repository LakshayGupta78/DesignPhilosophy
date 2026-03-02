import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const emotions = [
    { site: 'Elvina Prasad', color: '#808080', label: 'Professional Authority', pair: 'Grey + Black' },
    { site: 'Simone Sniekers', color: '#F15A24', label: 'Warmth → Purity', pair: 'Orange → White' },
    { site: 'Clauaskee', color: '#8E93FF', label: 'Creative Energy', pair: 'Lavender + Green' },
    { site: 'Raw Materials', color: '#FF6B6B', label: 'Bold Diversity', pair: 'Rainbow' },
    { site: 'Wise Design', color: '#9FE870', label: 'Trust + Growth', pair: 'Forest + Lime' },
    { site: 'Instagram Brand', color: '#D300C5', label: 'Playful + Premium', pair: 'Magenta + White' },
    { site: 'Sarah Fatmi', color: '#B2A6FF', label: 'Mystery + Wonder', pair: 'Purple + Navy' },
];

const spring = { type: 'spring' as const, stiffness: 170, damping: 26 };

export default function ColorStory() {
    const [activeColor, setActiveColor] = useState(0);
    const active = emotions[activeColor];

    return (
        <div className="space-y-32">
            {/* Split bento: swatch list + giant color specimen — like Instagram's split panels */}
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-0 rounded-3xl overflow-hidden" style={{ minHeight: '600px' }}>
                {/* Left: Color list on dark */}
                <div className="p-10 space-y-2" style={{ background: '#0A0A0A' }}>
                    <p className="text-[10px] font-mono uppercase tracking-wider mb-6 text-white/30">Color Psychology</p>
                    {emotions.map((e, i) => (
                        <motion.button
                            key={e.site}
                            onClick={() => setActiveColor(i)}
                            whileTap={{ scale: 0.97 }}
                            className="w-full text-left px-5 py-3.5 rounded-xl flex items-center gap-4 transition-all duration-200"
                            style={{
                                background: activeColor === i ? `${e.color}20` : 'transparent',
                                border: `1px solid ${activeColor === i ? `${e.color}40` : 'transparent'}`,
                            }}
                        >
                            <div
                                className="w-3.5 h-3.5 rounded-full shrink-0"
                                style={{
                                    background: e.color,
                                    boxShadow: activeColor === i ? `0 0 12px ${e.color}60` : 'none',
                                }}
                            />
                            <div>
                                <p className="text-sm font-medium text-white">{e.site}</p>
                                <p className="text-[11px] text-white/40">{e.pair}</p>
                            </div>
                        </motion.button>
                    ))}
                </div>

                {/* Right: Full-bleed active color — the color IS the content */}
                <AnimatePresence mode="wait">
                    <motion.div
                        key={activeColor}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="p-16 lg:p-24 flex flex-col justify-center"
                        style={{ background: active.color }}
                    >
                        <motion.p
                            initial={{ y: 20 }}
                            animate={{ y: 0 }}
                            transition={spring}
                            className="text-[clamp(3rem,6vw,6rem)] font-black leading-[0.95] tracking-[-0.03em] mb-8 text-white"
                        >
                            {active.label}
                        </motion.p>
                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 0.7 }}
                            transition={{ delay: 0.2 }}
                            className="text-lg font-light text-white/70"
                        >
                            {active.site} — {active.pair}
                        </motion.p>
                    </motion.div>
                </AnimatePresence>
            </div>

            {/* 2x2 bento: monochromatic pattern with colored accents — like Instagram's glyph grid */}
            <div className="space-y-8">
                <h3 className="text-xs font-medium tracking-[0.2em] uppercase" style={{ color: '#F15A24' }}>
                    The Monochromatic + One Pattern
                </h3>
                <p className="text-xl font-light leading-relaxed max-w-2xl" style={{ color: 'rgba(26,26,26,0.55)' }}>
                    Most premium sites use a neutral base and restrict strong color to <strong className="font-bold text-[#1a1a1a]">one strategic purpose</strong>.
                </p>

                {/* 5-cell bento row showing dark-light-dark-light sandwich */}
                <div className="grid grid-cols-5 gap-0 rounded-2xl overflow-hidden h-40">
                    {[
                        { bg: '#FFFFFF', label: 'Light', textColor: '#ccc' },
                        { bg: '#0F0F10', label: 'Dark', textColor: '#555' },
                        { bg: '#F15A24', label: 'Accent', textColor: 'rgba(255,255,255,0.6)' },
                        { bg: '#0F0F10', label: 'Dark', textColor: '#555' },
                        { bg: '#FFFFFF', label: 'Light', textColor: '#ccc' },
                    ].map((s, i) => (
                        <motion.div
                            key={i}
                            className="flex items-center justify-center"
                            style={{ background: s.bg }}
                            initial={{ scaleY: 0 }}
                            whileInView={{ scaleY: 1 }}
                            viewport={{ once: true }}
                            transition={{ ...spring, delay: i * 0.1 }}
                        >
                            <span className="text-xs font-mono" style={{ color: s.textColor }}>{s.label}</span>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
}
