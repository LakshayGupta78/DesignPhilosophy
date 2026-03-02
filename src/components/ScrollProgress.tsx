import { useState, useEffect } from 'react';

export default function ScrollProgress() {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            const scrollTop = window.scrollY;
            const docHeight = document.documentElement.scrollHeight - window.innerHeight;
            setProgress(docHeight > 0 ? Math.round((scrollTop / docHeight) * 100) : 0);
        };
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <div className="fixed bottom-0 left-0 right-0 z-50 h-10 glass flex items-center justify-between px-6 text-xs font-mono">
            <span className="text-acid tabular-nums">{progress}%</span>
            <span className="opacity-40 tracking-[0.15em] uppercase text-[10px]">How Design Works</span>
            <span className="opacity-40">{progress === 100 ? '✓ Complete' : 'Scroll ↓'}</span>
        </div>
    );
}
