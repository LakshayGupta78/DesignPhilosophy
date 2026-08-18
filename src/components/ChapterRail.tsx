import { useEffect, useState, useCallback } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import { useLenis } from '../lib/lenisContext';

export interface RailItem {
    id: string;
    label: string;
    accent: string;
}

/**
 * Fixed chapter navigation: a progress bar across the top, a dot rail on
 * the right, and keyboard shortcuts (J/K or arrows to step chapters,
 * Home/End for the ends).
 */
export default function ChapterRail({ items }: { items: RailItem[] }) {
    const [activeIndex, setActiveIndex] = useState(0);
    const [hovered, setHovered] = useState<string | null>(null);
    const { scrollTo } = useLenis();

    const { scrollYProgress } = useScroll();
    const progress = useSpring(scrollYProgress, { stiffness: 220, damping: 40, mass: 0.4 });

    // Track which chapter owns the middle of the viewport.
    useEffect(() => {
        const compute = () => {
            const mid = window.scrollY + window.innerHeight * 0.4;
            let next = 0;
            items.forEach((item, i) => {
                const el = document.getElementById(item.id);
                if (el && el.offsetTop <= mid) next = i;
            });
            setActiveIndex(next);
        };
        compute();
        window.addEventListener('scroll', compute, { passive: true });
        window.addEventListener('resize', compute);
        return () => {
            window.removeEventListener('scroll', compute);
            window.removeEventListener('resize', compute);
        };
    }, [items]);

    const go = useCallback(
        (index: number) => {
            const clamped = Math.max(0, Math.min(items.length - 1, index));
            const el = document.getElementById(items[clamped].id);
            if (el) scrollTo(el);
        },
        [items, scrollTo]
    );

    useEffect(() => {
        const onKey = (e: KeyboardEvent) => {
            const t = e.target as HTMLElement;
            if (t.matches('input, textarea, select') || e.metaKey || e.ctrlKey) return;

            if (e.key === 'j' || e.key === 'ArrowDown') {
                e.preventDefault();
                go(activeIndex + 1);
            } else if (e.key === 'k' || e.key === 'ArrowUp') {
                e.preventDefault();
                go(activeIndex - 1);
            } else if (e.key === 'Home') {
                e.preventDefault();
                go(0);
            } else if (e.key === 'End') {
                e.preventDefault();
                go(items.length - 1);
            }
        };
        window.addEventListener('keydown', onKey);
        return () => window.removeEventListener('keydown', onKey);
    }, [activeIndex, go, items.length]);

    const active = items[activeIndex];

    return (
        <>
            {/* Top progress bar */}
            <div className="fixed top-0 right-0 left-0 z-50 h-[3px] bg-black/10 mix-blend-difference">
                <motion.div
                    className="h-full origin-left"
                    style={{ scaleX: progress, background: active.accent }}
                />
            </div>

            {/* Right-hand dot rail */}
            <nav
                aria-label="Chapters"
                className="fixed top-1/2 right-5 z-50 hidden -translate-y-1/2 flex-col items-end gap-1 lg:flex"
            >
                {items.map((item, i) => {
                    const isActive = i === activeIndex;
                    const isHovered = hovered === item.id;
                    return (
                        <button
                            key={item.id}
                            onClick={() => go(i)}
                            onMouseEnter={() => setHovered(item.id)}
                            onMouseLeave={() => setHovered(null)}
                            aria-current={isActive ? 'true' : undefined}
                            aria-label={item.label}
                            className="group flex items-center gap-3 py-1.5"
                        >
                            <motion.span
                                initial={false}
                                animate={{
                                    opacity: isHovered || isActive ? 1 : 0,
                                    x: isHovered || isActive ? 0 : 8,
                                }}
                                transition={{ type: 'spring', stiffness: 320, damping: 30 }}
                                className="rounded-full px-2.5 py-1 font-mono text-[9px] tracking-[0.14em] whitespace-nowrap uppercase"
                                style={{
                                    background: isActive ? item.accent : 'rgba(16,15,20,0.75)',
                                    color: '#fff',
                                }}
                            >
                                {item.label}
                            </motion.span>
                            <motion.span
                                initial={false}
                                animate={{
                                    width: isActive ? 26 : 12,
                                    backgroundColor: isActive ? item.accent : 'rgba(128,126,136,0.55)',
                                }}
                                transition={{ type: 'spring', stiffness: 320, damping: 30 }}
                                className="block h-[2px] rounded-full"
                            />
                        </button>
                    );
                })}
            </nav>

            {/* Bottom status bar */}
            <div className="fixed right-0 bottom-0 left-0 z-50 flex items-center justify-between px-5 py-3 text-[10px] mix-blend-difference md:px-8">
                <span className="font-mono tracking-[0.18em] text-white uppercase">
                    How Design Works
                </span>
                <span className="hidden font-mono tracking-[0.18em] text-white/75 uppercase md:block">
                    J / K to navigate
                </span>
            </div>
        </>
    );
}
