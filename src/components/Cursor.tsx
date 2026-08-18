import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

/**
 * A two-part cursor: a small solid dot that tracks the pointer exactly,
 * and a ring that lags behind on a spring. The ring expands and labels
 * itself over anything interactive.
 *
 * This is the essay's own argument about cursors-as-affordance, applied
 * to the essay. Disabled on touch and for reduced-motion users.
 */
/** Capability check, evaluated once — a fine pointer and no reduced-motion. */
function supportsCustomCursor() {
    if (typeof window === 'undefined') return false;
    return (
        window.matchMedia('(hover: hover) and (pointer: fine)').matches &&
        !window.matchMedia('(prefers-reduced-motion: reduce)').matches
    );
}

export default function Cursor() {
    const [enabled] = useState(supportsCustomCursor);
    const [label, setLabel] = useState<string | null>(null);
    const [active, setActive] = useState(false);
    const [pressed, setPressed] = useState(false);

    const x = useMotionValue(-100);
    const y = useMotionValue(-100);
    const ringX = useSpring(x, { stiffness: 380, damping: 32, mass: 0.5 });
    const ringY = useSpring(y, { stiffness: 380, damping: 32, mass: 0.5 });

    useEffect(() => {
        if (!enabled) return;

        document.body.classList.add('has-cursor');

        const onMove = (e: PointerEvent) => {
            x.set(e.clientX);
            y.set(e.clientY);

            const el = (e.target as HTMLElement | null)?.closest<HTMLElement>(
                'a, button, input, [data-cursor]'
            );
            setActive(Boolean(el));
            setLabel(el?.dataset.cursor ?? null);
        };

        const onDown = () => setPressed(true);
        const onUp = () => setPressed(false);
        const onLeave = () => {
            x.set(-100);
            y.set(-100);
        };

        window.addEventListener('pointermove', onMove, { passive: true });
        window.addEventListener('pointerdown', onDown);
        window.addEventListener('pointerup', onUp);
        document.addEventListener('pointerleave', onLeave);

        return () => {
            document.body.classList.remove('has-cursor');
            window.removeEventListener('pointermove', onMove);
            window.removeEventListener('pointerdown', onDown);
            window.removeEventListener('pointerup', onUp);
            document.removeEventListener('pointerleave', onLeave);
        };
    }, [enabled, x, y]);

    if (!enabled) return null;

    const size = label ? 66 : active ? 44 : 30;

    return (
        <div
            className="pointer-events-none fixed inset-0 z-[100] mix-blend-difference"
            aria-hidden="true"
        >
            {/* Lagging ring */}
            <motion.div
                className="absolute top-0 left-0 flex items-center justify-center rounded-full border"
                style={{ x: ringX, y: ringY, translateX: '-50%', translateY: '-50%' }}
                initial={false}
                animate={{
                    width: size,
                    height: size,
                    scale: pressed ? 0.82 : 1,
                    backgroundColor: label ? 'rgba(255,255,255,1)' : 'rgba(255,255,255,0)',
                    borderColor: label ? 'rgba(255,255,255,1)' : 'rgba(255,255,255,0.8)',
                }}
                transition={{ type: 'spring', stiffness: 380, damping: 30 }}
            >
                {label && (
                    <motion.span
                        initial={{ opacity: 0, scale: 0.6 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="font-mono text-[8px] font-bold tracking-[0.12em] text-black uppercase"
                    >
                        {label}
                    </motion.span>
                )}
            </motion.div>

            {/* Exact-tracking dot */}
            <motion.div
                className="absolute top-0 left-0 h-1.5 w-1.5 rounded-full bg-white"
                style={{ x, y, translateX: '-50%', translateY: '-50%' }}
                initial={false}
                animate={{ opacity: label ? 0 : 1 }}
            />
        </div>
    );
}
