import { useRef, useState, useCallback, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ACCENTS, INK } from '../lib/theme';

/* The letterform is generated from four parameters, so dragging a
   handle genuinely rebuilds the glyph rather than decorating it. */
type Params = { shoulder: number; bowl: number; stem: number; counter: number };

const DEFAULTS: Params = { shoulder: 318, bowl: 360, stem: 62, counter: 298 };

const RANGES: Record<keyof Params, [number, number]> = {
    shoulder: [215, 395],
    bowl: [265, 398],
    stem: [34, 108],
    counter: [225, 345],
};

const L = 90, T = 60, B = 440, MID = 250;

function buildD({ shoulder, bowl, stem, counter }: Params) {
    const innerL = L + stem;
    const innerT = T + 58;
    const innerB = B - 58;
    return [
        `M ${L},${T}`,
        `L 200,${T}`,
        `C ${shoulder},${T} ${bowl},${T + 78} ${bowl},${MID}`,
        `C ${bowl},${B - 78} ${shoulder},${B} 200,${B}`,
        `L ${L},${B} Z`,
        `M ${innerL},${innerT}`,
        `L 194,${innerT}`,
        `C ${counter - 26},${innerT} ${counter},${innerT + 54} ${counter},${MID}`,
        `C ${counter},${innerB - 54} ${counter - 26},${innerB} 194,${innerB}`,
        `L ${innerL},${innerB} Z`,
    ].join(' ');
}

const HANDLES: { key: keyof Params; y: number; label: string }[] = [
    { key: 'shoulder', y: T, label: 'shoulder' },
    { key: 'bowl', y: MID, label: 'bowl' },
    { key: 'counter', y: MID, label: 'counter' },
    { key: 'stem', y: B, label: 'stem' },
];

export default function Hero() {
    const [p, setP] = useState<Params>(DEFAULTS);
    const [dragging, setDragging] = useState<keyof Params | null>(null);
    const [touched, setTouched] = useState(false);
    const svgRef = useRef<SVGSVGElement>(null);
    const sectionRef = useRef<HTMLElement>(null);

    // Inner-content parallax only. The section itself never fades — the
    // old version animated the whole hero to opacity:0 while it still
    // occupied a full viewport, leaving a screen of dead colour to
    // scroll through.
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ['start start', 'end start'],
    });
    const titleY = useTransform(scrollYProgress, [0, 1], [0, 140]);
    const glyphY = useTransform(scrollYProgress, [0, 1], [0, -90]);

    const handleX = (key: keyof Params) =>
        key === 'stem' ? L + p.stem : p[key];

    const move = useCallback(
        (clientX: number, key: keyof Params) => {
            const svg = svgRef.current;
            if (!svg) return;
            const rect = svg.getBoundingClientRect();
            // viewBox is 460 wide and preserveAspectRatio keeps it square-ish,
            // so map through the rendered box rather than assuming 1:1.
            const vbX = ((clientX - rect.left) / rect.width) * 460;
            const [min, max] = RANGES[key];
            const raw = key === 'stem' ? vbX - L : vbX;
            setP((prev) => ({ ...prev, [key]: Math.max(min, Math.min(max, raw)) }));
            setTouched(true);
        },
        []
    );

    useEffect(() => {
        if (!dragging) return;
        const onMove = (e: PointerEvent) => move(e.clientX, dragging);
        const onUp = () => setDragging(null);
        window.addEventListener('pointermove', onMove);
        window.addEventListener('pointerup', onUp);
        return () => {
            window.removeEventListener('pointermove', onMove);
            window.removeEventListener('pointerup', onUp);
        };
    }, [dragging, move]);

    const nudge = (key: keyof Params, delta: number) => {
        const [min, max] = RANGES[key];
        setP((prev) => ({ ...prev, [key]: Math.max(min, Math.min(max, prev[key] + delta)) }));
        setTouched(true);
    };

    return (
        <section
            ref={sectionRef}
            id="hero"
            className="relative flex min-h-screen flex-col md:flex-row"
        >
            {/* Left — title */}
            <div
                className="relative flex w-full flex-col justify-between overflow-hidden px-8 py-14 md:w-1/2 md:px-14 md:py-16 lg:px-20"
                style={{ background: ACCENTS.magenta.fill }}
            >
                <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8, duration: 0.8 }}
                    className="font-mono text-[10px] tracking-[0.3em] text-white uppercase"
                >
                    A visual essay
                </motion.span>

                <motion.h1
                    style={{ y: titleY }}
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.25, type: 'spring', stiffness: 150, damping: 22 }}
                    className="display display-safe py-8 text-[clamp(3.4rem,9vw,9rem)] font-medium tracking-[-0.03em] text-white"
                >
                    How
                    <br />
                    Design
                    <br />
                    Works
                </motion.h1>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1, duration: 0.8 }}
                    className="flex items-end justify-between gap-6"
                >
                    <p className="max-w-xs text-sm leading-relaxed font-light text-white">
                        Six chapters on why premium sites feel premium.
                    </p>
                    <motion.div
                        animate={{ y: [0, 7, 0] }}
                        transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
                        className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2 border-white text-lg text-white"
                    >
                        ↓
                    </motion.div>
                </motion.div>
            </div>

            {/* Right — the interactive letterform */}
            <div
                className="relative flex w-full flex-col items-center justify-center overflow-hidden px-6 py-16 md:w-1/2"
                style={{ background: ACCENTS.indigo.fill }}
            >
                <motion.div style={{ y: glyphY }} className="w-full max-w-[520px]">
                    <svg
                        ref={svgRef}
                        viewBox="0 0 460 500"
                        className="w-full touch-none select-none"
                        role="img"
                        aria-label="An interactive letter D whose curves can be reshaped by dragging its control points"
                    >
                        <motion.path
                            d={buildD(p)}
                            fillRule="evenodd"
                            fill={INK}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.4, type: 'spring', stiffness: 110, damping: 20 }}
                            style={{ transformOrigin: 'center' }}
                        />

                        {/* Guide lines from each handle back to the glyph */}
                        {HANDLES.map(({ key, y }) => (
                            <motion.line
                                key={`line-${key}`}
                                x1={handleX(key)}
                                y1={y}
                                x2={key === 'stem' ? L : 200}
                                y2={y}
                                stroke={ACCENTS.magenta.fill}
                                strokeWidth="1.5"
                                strokeDasharray="5 5"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: dragging === key ? 0.9 : 0.35 }}
                            />
                        ))}

                        {/* Draggable control points */}
                        {HANDLES.map(({ key, y, label }, i) => {
                            const cx = handleX(key);
                            const isDragging = dragging === key;
                            return (
                                <g key={key}>
                                    <motion.circle
                                        cx={cx}
                                        cy={y}
                                        r={isDragging ? 15 : 11}
                                        fill={ACCENTS.magenta.fill}
                                        stroke="#fff"
                                        strokeWidth="3"
                                        className="cursor-grab active:cursor-grabbing"
                                        style={{ touchAction: 'none' }}
                                        tabIndex={0}
                                        role="slider"
                                        aria-label={`${label} control point`}
                                        aria-valuenow={Math.round(p[key])}
                                        aria-valuemin={RANGES[key][0]}
                                        aria-valuemax={RANGES[key][1]}
                                        onPointerDown={(e) => {
                                            e.preventDefault();
                                            setDragging(key);
                                        }}
                                        onKeyDown={(e) => {
                                            if (e.key === 'ArrowLeft') { e.preventDefault(); nudge(key, -6); }
                                            if (e.key === 'ArrowRight') { e.preventDefault(); nudge(key, 6); }
                                        }}
                                        initial={{ opacity: 0, scale: 0 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{
                                            delay: 0.9 + i * 0.09,
                                            type: 'spring',
                                            stiffness: 300,
                                            damping: 16,
                                        }}
                                    />
                                    {isDragging && (
                                        <text
                                            x={cx}
                                            y={y - 24}
                                            textAnchor="middle"
                                            className="font-mono"
                                            fontSize="13"
                                            fontWeight="700"
                                            fill={INK}
                                        >
                                            {label}
                                        </text>
                                    )}
                                </g>
                            );
                        })}
                    </svg>
                </motion.div>

                {/* Hint / reset */}
                <div className="mt-4 flex h-8 items-center gap-4">
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: touched ? 0 : 1 }}
                        transition={{ delay: touched ? 0 : 1.6, duration: 0.6 }}
                        className="font-mono text-[10px] tracking-[0.2em] uppercase"
                        style={{ color: INK }}
                    >
                        ← Drag the pink points
                    </motion.p>
                    <motion.button
                        initial={false}
                        animate={{ opacity: touched ? 1 : 0, pointerEvents: touched ? 'auto' : 'none' }}
                        onClick={() => { setP(DEFAULTS); setTouched(false); }}
                        data-cursor="reset"
                        className="rounded-full px-4 py-1.5 font-mono text-[10px] tracking-[0.2em] uppercase"
                        style={{ background: INK, color: '#fff' }}
                    >
                        Reset glyph
                    </motion.button>
                </div>
            </div>
        </section>
    );
}
