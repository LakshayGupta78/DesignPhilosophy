import { useState } from 'react';
import { motion } from 'framer-motion';

const spring = { type: 'spring' as const, stiffness: 170, damping: 26 };

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

/* Each cell gets a different color like Instagram's character grid */
const cellColors = [
    { bg: '#2563EB', text: 'white' },
    { bg: '#0A0A0A', text: 'rgba(255,255,255,0.4)' },
    { bg: '#F5F5F5', text: 'rgba(0,0,0,0.3)' },
    { bg: '#D300C5', text: 'white' },
    { bg: '#F15A24', text: 'white' },
    { bg: '#FFFFFF', text: 'rgba(0,0,0,0.2)' },
    { bg: '#F5F5F5', text: 'rgba(0,0,0,0.3)' },
    { bg: '#9FE870', text: 'rgba(0,0,0,0.4)' },
];

export default function WhitespaceGrid() {
    const [density, setDensity] = useState(0);

    return (
        <div className="space-y-24">
            {/* Top bento: explanation left on blue + grid demo right */}
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-0 rounded-3xl overflow-hidden" style={{ minHeight: '500px' }}>
                {/* Left: Explanation panel */}
                <div className="p-16 flex flex-col justify-between" style={{ background: '#2563EB' }}>
                    <div>
                        <h3 className="text-xs font-medium tracking-[0.2em] uppercase mb-6 text-white/50">
                            Whitespace Density
                        </h3>
                        <p className="text-2xl font-light leading-relaxed text-white/80 mb-8">
                            Drag the slider and watch the grid
                            <strong className="font-bold text-white"> breathe</strong>.
                        </p>
                    </div>

                    {/* Density controller */}
                    <div className="space-y-4">
                        <div className="flex items-center gap-4">
                            <span className="text-[10px] font-mono text-white/30">Dense</span>
                            <input
                                type="range"
                                min="0"
                                max="24"
                                value={density}
                                onChange={(e) => setDensity(parseInt(e.target.value))}
                                className="w-full"
                                style={{ accentColor: '#FFFFFF' }}
                            />
                            <span className="text-[10px] font-mono text-white/30">Airy</span>
                        </div>
                        <p className="text-xs font-mono text-white/40 text-right">{density}px gap</p>
                    </div>
                </div>

                {/* Right: Live bento grid with multi-colored cells */}
                <div className="p-8" style={{ background: '#F5F5F5' }}>
                    <motion.div
                        layout
                        transition={spring}
                        className="grid grid-cols-3 auto-rows-[120px] h-full"
                        style={{ gap: `${density}px` }}
                    >
                        {items.map((item, i) => {
                            const c = cellColors[i];
                            return (
                                <motion.div
                                    key={item.label}
                                    layout
                                    transition={spring}
                                    className={`${item.span} rounded-xl flex items-center justify-center cursor-default`}
                                    style={{ background: c.bg }}
                                    whileHover={{ scale: 1.02 }}
                                >
                                    <span className="text-xs font-mono" style={{ color: c.text }}>{item.label}</span>
                                </motion.div>
                            );
                        })}
                    </motion.div>
                </div>
            </div>

            {/* Insight callout */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={spring}
                className="rounded-2xl p-10"
                style={{ background: '#F5F5F5', borderLeft: '4px solid #2563EB' }}
            >
                <p className="text-lg md:text-xl font-medium leading-relaxed text-[#1a1a1a]">
                    <span style={{ color: '#2563EB' }}>Pattern:</span> Simone Sniekers uses the most whitespace (images float in vast empty space).
                    Raw Materials is the densest (content packed into rounded containers). Both are effective — the key is intentionality.
                </p>
            </motion.div>
        </div>
    );
}
