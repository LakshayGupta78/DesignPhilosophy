import { motion } from 'framer-motion';

const chapters = [
    { label: 'The Vibe Check', id: 'ch-01' },
    { label: 'Typography', id: 'ch-02' },
    { label: 'Color', id: 'ch-03' },
    { label: 'Whitespace', id: 'ch-04' },
    { label: 'Motion', id: 'ch-05' },
    { label: 'Archetypes', id: 'ch-06' },
];

const spring = { type: 'spring' as const, stiffness: 170, damping: 26 };

export default function Footer() {
    const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

    return (
        <footer
            className="relative px-10 md:px-20 lg:px-32 overflow-hidden"
            style={{ background: '#FFFFFF' }}
        >
            {/* Oversized scrolling text marquee */}
            <div className="py-20 overflow-hidden border-t" style={{ borderColor: 'rgba(0,0,0,0.06)' }}>
                <div className="animate-marquee whitespace-nowrap">
                    <span className="text-[clamp(4rem,10vw,10rem)] font-black tracking-[-0.04em] text-[#1a1a1a]">
                        {'Layout   Home   Gradient   Type   Layout   Home   Gradient   Type   '}
                    </span>
                </div>
            </div>

            {/* Chapter nav links */}
            <div
                className="py-8 flex flex-wrap gap-6"
                style={{ borderTop: '1px solid rgba(0,0,0,0.06)' }}
            >
                {chapters.map((ch) => (
                    <motion.button
                        key={ch.id}
                        onClick={scrollToTop}
                        whileHover={{ y: -2 }}
                        transition={spring}
                        className="text-sm font-medium text-[#1a1a1a] hover:opacity-60 transition-opacity"
                    >
                        {ch.label} →
                    </motion.button>
                ))}
            </div>

            {/* Bottom row: credit + meta */}
            <div
                className="py-6 flex flex-wrap items-center justify-between gap-4"
                style={{ borderTop: '1px solid rgba(0,0,0,0.06)' }}
            >
                <a
                    href="https://lakshaydesigns.site"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm font-medium hover:opacity-60 transition-opacity"
                    style={{ color: '#1a1a1a' }}
                >
                    Created by Lakshay ↗
                </a>
                <div className="flex items-center gap-6">
                    <a
                        href="https://godly.website"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm hover:opacity-60 transition-opacity"
                        style={{ color: 'rgba(0,0,0,0.35)' }}
                    >
                        Godly Collection ↗
                    </a>
                    <span className="text-sm" style={{ color: 'rgba(0,0,0,0.2)' }}>
                        2026
                    </span>
                </div>
            </div>
        </footer>
    );
}
