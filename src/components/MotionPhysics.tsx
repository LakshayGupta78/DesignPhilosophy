import { useState } from 'react';
import { motion, useMotionValue, useTransform } from 'framer-motion';

const spring = { type: 'spring' as const, stiffness: 170, damping: 26 };

export default function MotionPhysics() {
    const [showModal, setShowModal] = useState(false);
    const dragX = useMotionValue(0);
    const dragRotate = useTransform(dragX, [-200, 200], [-10, 10]);

    return (
        <div className="space-y-32">
            {/* Intro */}
            <div className="max-w-2xl">
                <h3 className="text-xs font-medium tracking-[0.2em] uppercase mb-6" style={{ color: '#8E93FF' }}>
                    Spring Physics — Not Easing Curves
                </h3>
                <p className="text-2xl md:text-3xl font-light leading-relaxed" style={{ color: 'rgba(30,20,50,0.7)' }}>
                    Premium sites use <strong className="font-bold" style={{ color: '#1a1a1a' }}>spring physics</strong> for natural, non-linear motion.
                    Every animation below uses <code className="text-sm font-mono px-2 py-0.5 rounded" style={{ background: 'rgba(142,147,255,0.1)', color: '#8E93FF' }}>stiffness: 170, damping: 26</code>.
                </p>
            </div>

            {/* Bento: 2x2 grid of interactive demos */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-0 rounded-3xl overflow-hidden" style={{ minHeight: '600px' }}>
                {/* Cell 1: Draggable card */}
                <div className="p-16 flex flex-col justify-between" style={{ background: '#1a1a1a', minHeight: '300px' }}>
                    <p className="text-[10px] font-mono uppercase tracking-wider" style={{ color: 'rgba(255,255,255,0.2)' }}>Drag Me</p>
                    <div className="flex-1 flex items-center justify-center">
                        <motion.div
                            drag="x"
                            dragConstraints={{ left: -100, right: 100 }}
                            dragElastic={0.2}
                            style={{ x: dragX, rotate: dragRotate, background: '#8E93FF' }}
                            whileTap={{ scale: 0.95 }}
                            className="w-40 h-24 rounded-2xl flex items-center justify-center cursor-grab active:cursor-grabbing select-none"
                        >
                            <span className="text-sm font-bold text-white">← Drag →</span>
                        </motion.div>
                    </div>
                </div>

                {/* Cell 2: Spring modal toggle */}
                <div className="p-16 flex flex-col justify-between" style={{ background: '#8E93FF', minHeight: '300px' }}>
                    <p className="text-[10px] font-mono uppercase tracking-wider" style={{ color: 'rgba(0,0,0,0.3)' }}>Modal Animation</p>
                    <div className="flex-1 flex items-center justify-center relative">
                        <motion.button
                            onClick={() => setShowModal(!showModal)}
                            whileTap={{ scale: 0.95 }}
                            className="px-8 py-4 rounded-xl text-sm font-bold"
                            style={{ background: '#1a1a1a', color: '#fff' }}
                        >
                            {showModal ? 'Close' : 'Open'} Modal
                        </motion.button>

                        {showModal && (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.8, y: 20 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.8, y: 20 }}
                                transition={spring}
                                className="absolute inset-x-8 top-0 p-8 rounded-2xl"
                                style={{ background: '#fff', boxShadow: '0 30px 60px rgba(0,0,0,0.2)' }}
                            >
                                <p className="text-sm font-bold text-gray-900 mb-2">Spring Modal</p>
                                <p className="text-xs text-gray-500">Notice how the animation overshoots slightly then settles. That's spring physics.</p>
                            </motion.div>
                        )}
                    </div>
                </div>

                {/* Cell 3: Staggered list */}
                <div className="p-16" style={{ background: '#C4B5FD', minHeight: '300px' }}>
                    <p className="text-[10px] font-mono uppercase tracking-wider mb-8" style={{ color: 'rgba(0,0,0,0.3)' }}>Stagger Animation</p>
                    <div className="space-y-3">
                        {['Hero Section', 'Navigation', 'Content Grid', 'Footer'].map((item, i) => (
                            <motion.div
                                key={item}
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ ...spring, delay: i * 0.1 }}
                                className="px-5 py-3 rounded-xl text-sm font-medium"
                                style={{ background: 'rgba(0,0,0,0.06)', color: '#1a1a1a' }}
                            >
                                {item}
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* Cell 4: Marquee ticker */}
                <div className="p-16 flex flex-col justify-center overflow-hidden" style={{ background: '#2D2159', minHeight: '300px' }}>
                    <p className="text-[10px] font-mono uppercase tracking-wider mb-8" style={{ color: 'rgba(255,255,255,0.2)' }}>Marquee Ticker</p>
                    <div className="overflow-hidden">
                        <div className="animate-marquee whitespace-nowrap">
                            <span className="text-3xl font-black tracking-tight" style={{ color: '#8E93FF' }}>
                                {'ANIMATION IS MEANINGFUL • TICKERS BROADCAST ENERGY • PARALLAX CREATES IMMERSION • '.repeat(3)}
                            </span>
                        </div>
                    </div>
                    <p className="text-xs font-mono mt-8" style={{ color: 'rgba(255,255,255,0.2)' }}>
                        CSS @keyframes translateX(-50%) on duplicated content
                    </p>
                </div>
            </div>

            {/* Animation rule callout */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={spring}
                className="rounded-2xl p-10"
                style={{ background: 'rgba(142,147,255,0.06)', border: '1px solid rgba(142,147,255,0.12)', borderLeft: '4px solid #8E93FF' }}
            >
                <p className="text-lg md:text-xl font-medium leading-relaxed" style={{ color: '#1a1a1a' }}>
                    <span style={{ color: '#8E93FF' }}>Key:</span> Animation should never be decorative. Tickers broadcast energy, parallax creates immersion,
                    custom cursors provide affordance. Each serves an interaction goal.
                </p>
            </motion.div>
        </div>
    );
}
