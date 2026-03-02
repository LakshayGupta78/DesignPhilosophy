import { motion } from 'framer-motion';

const archetypes = [
    {
        site: 'Elvina Prasad',
        archetype: 'The Sage',
        color: '#808080',
        bg: '#F5F5F5',
        textColor: '#1a1a1a',
        subColor: 'rgba(26,26,26,0.5)',
        evidence: '"Human Centred" tagline, authoritative typography, educational portfolio.',
        nav: 'Minimal → full-screen overlay',
        trend: 'Contemporary Minimalism',
    },
    {
        site: 'Simone Sniekers',
        archetype: 'The Ruler',
        color: '#F15A24',
        bg: '#F15A24',
        textColor: '#FFFFFF',
        subColor: 'rgba(255,255,255,0.6)',
        evidence: 'Curated gallery with zero explanation — the work speaks for itself.',
        nav: 'Fixed footer bar with scroll %',
        trend: 'Editorial Minimalism',
    },
    {
        site: 'Clauaskee',
        archetype: 'The Creator',
        color: '#8E93FF',
        bg: '#8E93FF',
        textColor: '#FFFFFF',
        subColor: 'rgba(255,255,255,0.6)',
        evidence: 'Custom everything — fonts, illustrations. Form over function.',
        nav: 'Simple sticky header',
        trend: 'Neo-Brutalism',
    },
    {
        site: 'Raw Materials',
        archetype: 'The Outlaw',
        color: '#FFFF00',
        bg: '#0A0A0A',
        textColor: '#FFFFFF',
        subColor: 'rgba(255,255,255,0.5)',
        evidence: '"Unusual" self-identification, rule-breaking sidebar nav, ASCII art.',
        nav: 'Sticky left sidebar with colors',
        trend: 'Neo-Brutalism',
    },
    {
        site: 'Wise Design',
        archetype: 'The Caregiver',
        color: '#9FE870',
        bg: '#FFFFFF',
        textColor: '#1a1a1a',
        subColor: 'rgba(26,26,26,0.5)',
        evidence: 'Accessibility-first, clear documentation, financial empowerment.',
        nav: 'Documentation sidebar + top nav',
        trend: 'System Design',
    },
    {
        site: 'Instagram Brand',
        archetype: 'The Magician',
        color: '#D300C5',
        bg: '#D300C5',
        textColor: '#FFFFFF',
        subColor: 'rgba(255,255,255,0.6)',
        evidence: 'Squircle geometry as magical thread, simple shapes into identity.',
        nav: 'Minimal sticky icon',
        trend: 'Brand Minimalism',
    },
    {
        site: 'Sarah Fatmi',
        archetype: 'The Explorer',
        color: '#B2A6FF',
        bg: '#F5F5F5',
        textColor: '#1a1a1a',
        subColor: 'rgba(26,26,26,0.5)',
        evidence: '"Scroll to explore" mechanic, narrative journey through landscape.',
        nav: 'Zero navigation',
        trend: 'Illustrative Maximalism',
    },
];

const spring = { type: 'spring' as const, stiffness: 170, damping: 26 };

export default function ArchetypeCards() {
    return (
        <div className="space-y-24">
            {/* Instagram-style bento grid — each card IS its archetype's color */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-0 rounded-3xl overflow-hidden">
                {archetypes.map((a, i) => (
                    <motion.div
                        key={a.site}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: '-50px' }}
                        transition={{ ...spring, delay: i * 0.06 }}
                        className={`p-10 flex flex-col justify-between ${i === 0 ? 'md:col-span-2 lg:col-span-2' : ''
                            }`}
                        style={{
                            background: a.bg,
                            minHeight: '280px',
                        }}
                    >
                        <div>
                            <div className="flex items-center gap-3 mb-6">
                                <motion.div
                                    className="w-3 h-3 rounded-full shrink-0"
                                    style={{ background: a.color, boxShadow: `0 0 14px ${a.color}60` }}
                                    animate={{ scale: [1, 1.2, 1] }}
                                    transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
                                />
                                <span className="text-[10px] font-mono uppercase tracking-wider" style={{ color: a.subColor }}>{a.trend}</span>
                            </div>

                            <h4 className="text-xl font-bold mb-1" style={{ color: a.textColor }}>{a.site}</h4>
                            <p className="text-sm font-semibold mb-4" style={{ color: a.color }}>{a.archetype}</p>
                            <p className="text-sm leading-relaxed" style={{ color: a.subColor }}>{a.evidence}</p>
                        </div>

                        <div className="pt-6 mt-6" style={{ borderTop: `1px solid ${a.textColor === '#FFFFFF' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.06)'}` }}>
                            <p className="text-[10px] font-mono uppercase tracking-wider" style={{ color: a.subColor }}>{a.nav}</p>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Insight callout */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={spring}
                className="rounded-2xl p-10"
                style={{ background: '#F5F5F5', borderLeft: '4px solid #E11D48' }}
            >
                <p className="text-lg md:text-xl font-medium leading-relaxed text-[#1a1a1a]">
                    <span style={{ color: '#E11D48' }}>Key Insight:</span> Only 1 of 7 sites uses traditional top-bar navigation.
                    The trend is moving toward footers, sidebars, overlays, and zero-nav for narrative experiences.
                </p>
            </motion.div>
        </div>
    );
}
