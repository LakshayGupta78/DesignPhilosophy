import { useRef, useEffect, useState, type ReactNode } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

interface Props {
    number: string;
    title: string;
    subtitle: string;
    children: ReactNode;
    bg?: string;
    text?: string;
    accent?: string;
}

function HighlightedText({ text, color }: { text: string; color: string }) {
    const ref = useRef<HTMLParagraphElement>(null);
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;

        const handleScroll = () => {
            const rect = el.getBoundingClientRect();
            const windowHeight = window.innerHeight;
            const start = windowHeight;
            const end = windowHeight * 0.3;
            const current = rect.top;
            const p = Math.max(0, Math.min(1, (start - current) / (start - end)));
            setProgress(p);
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        handleScroll();
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const words = text.split(' ');
    const highlightedWords = Math.floor(progress * words.length);

    return (
        <p ref={ref} className="text-lg md:text-xl font-light max-w-3xl leading-relaxed">
            {words.map((word, i) => (
                <span
                    key={i}
                    className="transition-colors duration-300"
                    style={{
                        color: i < highlightedWords ? color : `${color}25`,
                    }}
                >
                    {word}{' '}
                </span>
            ))}
        </p>
    );
}

export default function ChapterHeading({ number, title, subtitle, children, bg = '#050511', text = '#FAF9F6', accent = '#47F654' }: Props) {
    const sectionRef = useRef<HTMLElement>(null);
    const [isVisible, setIsVisible] = useState(false);

    // Parallax for the title
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ['start end', 'end start'],
    });
    const numberOpacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setIsVisible(true);
                        entry.target.querySelectorAll('.reveal').forEach((el) => {
                            el.classList.add('visible');
                        });
                    }
                });
            },
            { threshold: 0.05 }
        );
        if (sectionRef.current) observer.observe(sectionRef.current);
        return () => observer.disconnect();
    }, []);

    return (
        <section
            ref={sectionRef}
            className="relative min-h-screen py-20 md:py-28 px-10 md:px-20 lg:px-32 overflow-hidden"
            style={{ background: bg, color: text }}
        >
            <div className="max-w-7xl mx-auto">
                {/* Chapter number — parallax fade */}
                <motion.div
                    className="mb-4"
                    style={{ opacity: numberOpacity }}
                >
                    <span className="text-xs font-medium tracking-[0.3em] uppercase" style={{ color: accent }}>
                        Chapter {number}
                    </span>
                </motion.div>

                {/* Title */}
                <div className="mb-8">
                    <div
                        className="transition-all duration-700"
                        style={{
                            opacity: isVisible ? 1 : 0,
                            transform: isVisible ? 'translateY(0)' : 'translateY(50px)',
                        }}
                    >
                        <h2 className="text-[clamp(2.5rem,5vw,4.5rem)] font-extrabold leading-[0.95] tracking-[-0.03em]">
                            {title}
                        </h2>
                    </div>
                </div>

                {/* Subtitle — scroll-driven word highlighting */}
                <div className="mb-16 md:mb-20">
                    <HighlightedText text={subtitle} color={text} />
                </div>

                {/* Content — reveal on scroll */}
                <div
                    className="reveal transition-all duration-1000"
                    style={{ transitionDelay: '0.4s' }}
                >
                    {children}
                </div>
            </div>
        </section>
    );
}
