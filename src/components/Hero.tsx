import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function Hero() {
    const [scrollY, setScrollY] = useState(0);

    useEffect(() => {
        const handleScroll = () => setScrollY(window.scrollY);
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const opacity = Math.max(0, 1 - scrollY / 600);

    return (
        <section
            className="relative min-h-screen flex overflow-hidden"
            style={{ opacity }}
        >
            {/* Left: Magenta panel */}
            <div className="w-1/2 relative flex flex-col items-center justify-between p-16 lg:p-24" style={{ background: '#D300C5' }}>
                <div />

                <div>
                    <motion.h1
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4, type: 'spring', stiffness: 150, damping: 20 }}
                        className="text-[clamp(5rem,10vw,11rem)] font-light leading-[1] tracking-[-0.03em] text-white"
                    >
                        How<br />
                        Design<br />
                        Works
                    </motion.h1>
                </div>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.2, duration: 1 }}
                >
                    <motion.div
                        animate={{ y: [0, 8, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
                        className="w-10 h-10 rounded-full border-2 border-white/30 flex items-center justify-center text-white/40 text-lg"
                    >
                        ↓
                    </motion.div>
                </motion.div>
            </div>

            {/* Right: Lavender panel with decorative letter + bezier handles */}
            <div className="w-1/2 relative flex items-center justify-center" style={{ background: '#C4B5FD' }}>
                {/* Giant decorative letter */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.6, type: 'spring', stiffness: 100, damping: 20 }}
                    className="select-none"
                >
                    <span
                        className="text-[clamp(20rem,35vw,40rem)] font-black leading-none"
                        style={{ color: '#1a1a1a', opacity: 0.9 }}
                    >
                        D
                    </span>
                </motion.div>

                {/* Bezier control handles — tracing the D's curves */}
                <svg
                    className="absolute inset-0 w-full h-full"
                    viewBox="0 0 100 100"
                    preserveAspectRatio="none"
                    style={{ pointerEvents: 'none' }}
                >
                    {/* Curve tracing the outer bowl of D */}
                    <motion.path
                        d="M 55,12 C 78,18 90,35 90,50 C 90,65 78,82 55,88"
                        stroke="#D300C5"
                        strokeWidth="0.25"
                        fill="none"
                        opacity="0.35"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ delay: 1, duration: 1.5, ease: 'easeInOut' }}
                    />
                    {/* Inner counter curve */}
                    <motion.path
                        d="M 52,25 C 68,30 75,40 75,50 C 75,60 68,70 52,75"
                        stroke="#D300C5"
                        strokeWidth="0.2"
                        fill="none"
                        opacity="0.25"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ delay: 1.2, duration: 1.5, ease: 'easeInOut' }}
                    />
                    {/* Stem baseline */}
                    <motion.path
                        d="M 30,12 L 30,88"
                        stroke="#D300C5"
                        strokeWidth="0.15"
                        fill="none"
                        opacity="0.2"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ delay: 1.4, duration: 1, ease: 'easeInOut' }}
                    />
                </svg>

                {/* Bezier control points — positioned on the D's anatomy */}
                {[
                    { cx: 55, cy: 12, delay: 1.0 },   // top of bowl
                    { cx: 90, cy: 50, delay: 1.1 },   // apex of outer curve
                    { cx: 55, cy: 88, delay: 1.2 },   // bottom of bowl
                    { cx: 75, cy: 50, delay: 1.3 },   // apex of inner counter
                    { cx: 30, cy: 12, delay: 1.4 },   // top of stem
                    { cx: 30, cy: 88, delay: 1.5 },   // bottom of stem
                ].map((pt, i) => (
                    <motion.div
                        key={i}
                        className="absolute w-2.5 h-2.5 rounded-full"
                        style={{
                            left: `${pt.cx}%`,
                            top: `${pt.cy}%`,
                            background: '#D300C5',
                            transform: 'translate(-50%, -50%)',
                        }}
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 0.6, scale: 1 }}
                        transition={{ delay: pt.delay, type: 'spring', stiffness: 300, damping: 15 }}
                    />
                ))}
            </div>
        </section>
    );
}
