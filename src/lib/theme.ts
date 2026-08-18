/**
 * Accent system.
 *
 * Every accent carries three values so a component never has to guess
 * which text colour is safe:
 *   fill — use as a background
 *   on   — text colour that is legible ON `fill` (>= 4.5:1)
 *   ink  — darkened variant, legible as text on `paper` (>= 4.5:1)
 *   up   — lightened variant, legible as text on `ink` (>= 4.5:1)
 *
 * Ratios verified against paper (#F6F4EF) and ink (#100F14).
 */
export type Accent = {
    fill: string;
    on: string;
    ink: string;
    up: string;
};

export const ACCENTS = {
    magenta: { fill: '#D300C5', on: '#FFFFFF', ink: '#A2007A', up: '#D924CD' },
    orange: { fill: '#F15A24', on: '#100F14', ink: '#B23C10', up: '#F15A24' },
    blue: { fill: '#2563EB', on: '#FFFFFF', ink: '#1D4ED8', up: '#4177EE' },
    indigo: { fill: '#8E93FF', on: '#100F14', ink: '#4F46E5', up: '#8E93FF' },
    sage: { fill: '#8B9A46', on: '#100F14', ink: '#5A6626', up: '#8B9A46' },
    rose: { fill: '#E11D48', on: '#FFFFFF', ink: '#BE123C', up: '#E53A60' },
} as const satisfies Record<string, Accent>;

export type AccentName = keyof typeof ACCENTS;

export const PAPER = '#F6F4EF';
export const PAPER_2 = '#EDEAE2';
export const PAPER_3 = '#DFDBD1';
export const INK = '#100F14';
export const INK_2 = '#1C1B22';
export const INK_3 = '#2E2C36';

/** Section tone. Components read this instead of hardcoding hexes. */
export type Tone = 'paper' | 'ink';

export const TONE = {
    paper: {
        bg: PAPER,
        surface: PAPER_2,
        sunken: PAPER_3,
        text: INK,
        /* 7.39:1 — AAA, safe for body copy */
        muted: 'rgba(16,15,20,0.72)',
        /* 4.54:1 — AA, the floor for any real text */
        faint: 'rgba(16,15,20,0.58)',
        line: 'rgba(16,15,20,0.12)',
    },
    ink: {
        bg: INK,
        surface: INK_2,
        sunken: INK_3,
        text: PAPER,
        /* 10.69:1 */
        muted: 'rgba(246,244,239,0.78)',
        /* 7.06:1 */
        faint: 'rgba(246,244,239,0.62)',
        line: 'rgba(246,244,239,0.14)',
    },
} as const satisfies Record<Tone, Record<string, string>>;

/* ── Contrast maths, used by the Color chapter to audit itself ── */

export function hexToRgb(hex: string): [number, number, number] {
    const h = hex.replace('#', '');
    const full = h.length === 3 ? h.split('').map((c) => c + c).join('') : h;
    return [0, 2, 4].map((i) => parseInt(full.slice(i, i + 2), 16)) as [number, number, number];
}

export function luminance(rgb: [number, number, number]): number {
    const [r, g, b] = rgb.map((c) => {
        const s = c / 255;
        return s <= 0.03928 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4);
    });
    return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

export function contrast(a: string, b: string): number {
    const la = luminance(hexToRgb(a));
    const lb = luminance(hexToRgb(b));
    const hi = Math.max(la, lb);
    const lo = Math.min(la, lb);
    return (hi + 0.05) / (lo + 0.05);
}

/** WCAG grade for normal-size body text. */
export function grade(ratio: number): 'AAA' | 'AA' | 'AA Large' | 'Fail' {
    if (ratio >= 7) return 'AAA';
    if (ratio >= 4.5) return 'AA';
    if (ratio >= 3) return 'AA Large';
    return 'Fail';
}

/**
 * Text sitting on a saturated accent fill must use `accent.on` at FULL
 * opacity. White on magenta is only 4.59:1 to begin with, so dropping it
 * to 75% lands at 2.97:1 — under AA. On fills, hierarchy comes from size
 * and weight, never from opacity.
 */

/** The shared spring. One physics model for the whole essay. */
export const SPRING = { type: 'spring' as const, stiffness: 170, damping: 26 };
