import { useState } from 'react';
import { motion } from 'framer-motion';
import { ACCENTS, TONE, INK, SPRING } from '../lib/theme';

type Vibe = 'cozy' | 'tech';

const vibes = {
    cozy: {
        bg: '#F3EEE4',
        text: '#2B2620',
        accent: ACCENTS.sage.ink,
        accentFill: ACCENTS.sage.fill,
        radius: 24,
        font: '"Instrument Serif", Georgia, serif',
        weight: 400,
        shadow: '0 22px 60px -18px rgba(90,102,38,0.45)',
        label: 'Warm',
        tokens: [
            { key: 'Palette', val: 'Oat, sage, cream' },
            { key: 'Radius', val: '24px — generous' },
            { key: 'Shadow', val: 'Coloured, diffused' },
            { key: 'Type', val: 'Expressive serif' },
            { key: 'Motion', val: 'Slow, settling' },
        ],
    },
    tech: {
        bg: '#0B0B10',
        text: '#EDEDF2',
        accent: '#7CF2A0',
        accentFill: '#7CF2A0',
        radius: 8,
        font: '"Inter", system-ui, sans-serif',
        weight: 800,
        shadow: '0 0 40px -6px rgba(124,242,160,0.35)',
        label: 'Precision',
        tokens: [
            { key: 'Palette', val: 'Midnight, signal, void' },
            { key: 'Radius', val: '8px — engineered' },
            { key: 'Shadow', val: 'Glow, tight' },
            { key: 'Type', val: 'Tight grotesque' },
            { key: 'Motion', val: 'Fast, exact' },
        ],
    },
} as const;

const t = TONE.paper;

export default function VibeCheck() {
    const [vibe, setVibe] = useState<Vibe>('cozy');
    const v = vibes[vibe];

    return (
        <div className="space-y-10">
            <div
                className="grid grid-cols-1 overflow-hidden rounded-3xl lg:grid-cols-[190px_1fr_290px]"
                style={{ border: `1px solid ${t.line}` }}
            >
                {/* Toggle */}
                <div className="p-7" style={{ background: INK }}>
                    <p className="mb-6 font-mono text-[10px] tracking-[0.2em] uppercase" style={{ color: TONE.ink.faint }}>
                        Register
                    </p>
                    <div className="flex gap-2 lg:flex-col">
                        {(['cozy', 'tech'] as Vibe[]).map((key) => {
                            const on = vibe === key;
                            const conf = vibes[key];
                            return (
                                <motion.button
                                    key={key}
                                    onClick={() => setVibe(key)}
                                    whileTap={{ scale: 0.96 }}
                                    data-cursor={key}
                                    aria-pressed={on}
                                    className="flex-1 rounded-xl px-4 py-3 text-left text-sm font-semibold transition-colors duration-300"
                                    style={{
                                        background: on ? conf.accentFill : 'transparent',
                                        color: on ? INK : TONE.ink.muted,
                                        border: `1px solid ${on ? conf.accentFill : TONE.ink.line}`,
                                    }}
                                >
                                    {key === 'cozy' ? 'Cozy' : 'Tech'}
                                </motion.button>
                            );
                        })}
                    </div>
                </div>

                {/* Specimen. The whole panel cross-fades in place — the previous
                    version unmounted a grid column mid-swap, which collapsed the
                    layout to two columns and snapped back on every toggle. */}
                <motion.div
                    className="relative flex min-h-[360px] items-center justify-center overflow-hidden"
                    animate={{ background: v.bg }}
                    transition={{ duration: 0.45 }}
                >
                    <motion.div
                        key={vibe}
                        initial={{ opacity: 0, scale: 0.96 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={SPRING}
                        className="text-center"
                    >
                        <span
                            className="block text-[clamp(6rem,16vw,13rem)] leading-none tracking-[-0.03em] select-none"
                            style={{
                                fontFamily: v.font,
                                fontWeight: v.weight,
                                color: v.text,
                                textShadow: v.shadow,
                            }}
                        >
                            Aa
                        </span>
                        <span
                            className="mt-4 block font-mono text-[10px] tracking-[0.24em] uppercase"
                            style={{ color: v.accent }}
                        >
                            {v.label}
                        </span>
                    </motion.div>

                    {/* Radius made visible */}
                    <motion.div
                        className="absolute right-6 bottom-6 h-14 w-14 border-2"
                        animate={{ borderRadius: v.radius, borderColor: v.accent }}
                        transition={SPRING}
                    />
                </motion.div>

                {/* Tokens */}
                <motion.div
                    className="flex flex-col justify-center p-8"
                    animate={{ background: v.bg }}
                    transition={{ duration: 0.45 }}
                    style={{ borderLeft: `1px solid rgba(128,128,128,0.22)` }}
                >
                    <p className="mb-6 font-mono text-[10px] tracking-[0.2em] uppercase" style={{ color: v.accent }}>
                        Design Tokens
                    </p>
                    <div className="space-y-4">
                        {v.tokens.map((tok, i) => (
                            <motion.div
                                key={tok.key}
                                initial={{ opacity: 0, x: 12 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ ...SPRING, delay: i * 0.06 }}
                            >
                                <p className="font-mono text-[9px] tracking-[0.18em] uppercase" style={{ color: v.text, opacity: 0.55 }}>
                                    {tok.key}
                                </p>
                                <motion.p
                                    key={tok.val}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="text-sm font-medium"
                                    style={{ color: v.text }}
                                >
                                    {tok.val}
                                </motion.p>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </div>

            <p className="max-w-3xl text-base leading-relaxed font-light md:text-lg" style={{ color: t.muted }}>
                One decision — warm or precise — cascades into every token underneath it.
            </p>
        </div>
    );
}
