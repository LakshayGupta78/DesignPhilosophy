import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

type Vibe = 'cozy' | 'tech';

const vibes = {
    cozy: {
        bg: '#FAF9F6',
        surface: 'rgba(139, 154, 70, 0.08)',
        border: 'rgba(0,0,0,0.08)',
        text: '#2C2A29',
        accent: '#8B9A46',
        radius: '24px',
        heading: '"Playfair Display", serif',
        shadow: '0 20px 60px -15px rgba(139, 154, 70, 0.2)',
        label: 'Warm',
        h1: 'Aa',
        tokens: [
            { key: 'Palette', val: 'Oat, Sage, Cream' },
            { key: 'Radius', val: '24px' },
            { key: 'Shadow', val: 'Colored, diffused' },
            { key: 'Type', val: 'Expressive serif' },
        ],
    },
    tech: {
        bg: '#050511',
        surface: 'rgba(255, 255, 255, 0.04)',
        border: 'rgba(255,255,255,0.08)',
        text: '#FFFFFF',
        accent: '#47F654',
        radius: '10px',
        heading: '"Inter", sans-serif',
        shadow: '0 0 30px -5px rgba(71, 246, 84, 0.15)',
        label: 'Precision',
        h1: 'Aa',
        tokens: [
            { key: 'Palette', val: 'Midnight, Acid, Void' },
            { key: 'Radius', val: '10px' },
            { key: 'Shadow', val: 'Glow, tight' },
            { key: 'Type', val: 'Tight sans-serif' },
        ],
    },
};

const spring = { type: 'spring' as const, stiffness: 170, damping: 26 };

export default function VibeCheck() {
    const [vibe, setVibe] = useState<Vibe>('cozy');
    const v = vibes[vibe];

    return (
        <div className="space-y-0">
            {/* Bento: 3-column grid — toggle | specimen | tokens */}
            <div className="grid grid-cols-1 lg:grid-cols-[200px_1fr_280px] gap-0 rounded-3xl overflow-hidden" style={{ minHeight: '500px' }}>

                {/* Left: Vertical toggle strip */}
                <div className="p-8 flex flex-col justify-between" style={{ background: '#0A0A0A' }}>
                    <div>
                        <p className="text-[10px] font-mono uppercase tracking-wider mb-8 text-white/25">Register</p>
                        {(['cozy', 'tech'] as Vibe[]).map((key) => (
                            <motion.button
                                key={key}
                                onClick={() => setVibe(key)}
                                whileTap={{ scale: 0.96 }}
                                className="w-full text-left px-4 py-3 mb-2 rounded-xl text-sm font-semibold transition-all duration-300"
                                style={{
                                    background: vibe === key ? (key === 'cozy' ? '#8B9A46' : '#47F654') : 'transparent',
                                    color: vibe === key ? (key === 'cozy' ? '#fff' : '#050511') : 'rgba(255,255,255,0.3)',
                                    border: `1px solid ${vibe === key ? 'transparent' : 'rgba(255,255,255,0.06)'}`,
                                }}
                            >
                                {key === 'cozy' ? '☀ Cozy' : '⚡ Tech'}
                            </motion.button>
                        ))}
                    </div>
                </div>

                {/* Center: Giant type specimen */}
                <AnimatePresence mode="wait">
                    <motion.div
                        key={vibe}
                        initial={{ opacity: 0, scale: 0.97 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.97 }}
                        transition={spring}
                        className="flex items-center justify-center"
                        style={{ background: v.bg }}
                    >
                        <div className="text-center">
                            <motion.span
                                className="text-[clamp(8rem,18vw,16rem)] font-black leading-none tracking-[-0.04em] select-none block"
                                style={{ fontFamily: v.heading, color: v.text, textShadow: v.shadow }}
                            >
                                {v.h1}
                            </motion.span>
                            <span
                                className="text-xs font-mono tracking-[0.2em] uppercase mt-4 block"
                                style={{ color: v.accent }}
                            >
                                {v.label}
                            </span>
                        </div>
                    </motion.div>
                </AnimatePresence>

                {/* Right: Token list */}
                <AnimatePresence mode="wait">
                    <motion.div
                        key={vibe + '-tokens'}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="p-8 flex flex-col justify-center"
                        style={{ background: v.bg, borderLeft: `1px solid ${v.border}` }}
                    >
                        <p className="text-[10px] font-mono uppercase tracking-wider mb-6" style={{ color: v.accent }}>
                            Design Tokens
                        </p>
                        <div className="space-y-4">
                            {v.tokens.map((t, i) => (
                                <motion.div
                                    key={t.key}
                                    initial={{ opacity: 0, x: 10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ ...spring, delay: i * 0.08 }}
                                >
                                    <p className="text-[10px] font-mono uppercase tracking-wider" style={{ color: `${v.text}40` }}>
                                        {t.key}
                                    </p>
                                    <p className="text-sm font-medium" style={{ color: v.text }}>
                                        {t.val}
                                    </p>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                </AnimatePresence>
            </div>
        </div>
    );
}
