import { createContext, useContext } from 'react';
import type Lenis from 'lenis';

export type ScrollTo = (
    target: number | string | HTMLElement,
    opts?: { offset?: number; immediate?: boolean }
) => void;

export const LenisContext = createContext<{ lenis: Lenis | null; scrollTo: ScrollTo }>({
    lenis: null,
    scrollTo: () => { },
});

export const useLenis = () => useContext(LenisContext);
