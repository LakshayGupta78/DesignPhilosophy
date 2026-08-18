import { useEffect, useMemo, useState, type ReactNode } from 'react';
import Lenis from 'lenis';
import { LenisContext, type ScrollTo } from '../lib/lenisContext';

const prefersReducedMotion = () =>
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

export default function SmoothScroll({ children }: { children: ReactNode }) {
    // State rather than a ref, so consumers re-render once Lenis is live.
    const [lenis, setLenis] = useState<Lenis | null>(null);

    useEffect(() => {
        // Smooth-scroll hijacking is exactly what reduced-motion users are
        // opting out of, so leave native scrolling alone for them.
        if (prefersReducedMotion()) return;

        const instance = new Lenis({
            duration: 1.1,
            // Expo-out: quick pickup, long glide, no perceptible bounce.
            easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            orientation: 'vertical',
            smoothWheel: true,
            wheelMultiplier: 1,
            touchMultiplier: 1.6,
            // Touch platforms already have momentum; doubling it feels wrong.
            syncTouch: false,
        });

        setLenis(instance);

        let frame = requestAnimationFrame(function raf(time: number) {
            instance.raf(time);
            frame = requestAnimationFrame(raf);
        });

        return () => {
            cancelAnimationFrame(frame);
            instance.destroy();
            setLenis(null);
        };
    }, []);

    const value = useMemo(() => {
        const scrollTo: ScrollTo = (target, opts) => {
            if (lenis) {
                lenis.scrollTo(target, { offset: opts?.offset ?? 0, immediate: opts?.immediate });
                return;
            }
            if (typeof target === 'number') {
                window.scrollTo({ top: target, behavior: 'auto' });
                return;
            }
            const el =
                typeof target === 'string' ? document.querySelector<HTMLElement>(target) : target;
            if (el) window.scrollTo({ top: el.offsetTop + (opts?.offset ?? 0), behavior: 'auto' });
        };
        return { lenis, scrollTo };
    }, [lenis]);

    return <LenisContext.Provider value={value}>{children}</LenisContext.Provider>;
}
