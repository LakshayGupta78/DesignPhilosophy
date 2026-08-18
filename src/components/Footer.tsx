import { TONE, ACCENTS } from '../lib/theme';
import Marquee from './Marquee';

const t = TONE.ink;

const links = [
    { href: 'https://lakshaydesigns.site', label: 'Created by Lakshay', arrow: '→', cursor: 'visit' },
    { href: 'https://godly.website', label: 'Godly Collection', arrow: '↗', cursor: 'source' },
];

export default function Footer({ id }: { id: string }) {
    return (
        <footer
            id={id}
            className="relative flex h-screen flex-col overflow-hidden"
            style={{ background: t.bg, color: t.text, borderTop: `1px solid ${t.line}` }}
        >
            <div className="flex flex-1 items-center overflow-hidden">
                <Marquee duration={48} pauseOnHover={false}>
                    <span className="display px-6 text-[clamp(4.5rem,15vw,15rem)] leading-[1.15] font-normal tracking-[-0.03em]">
                        Type <span style={{ color: ACCENTS.magenta.fill }}>·</span> Colour{' '}
                        <span style={{ color: ACCENTS.orange.fill }}>·</span> Grid{' '}
                        <span style={{ color: ACCENTS.blue.fill }}>·</span> Motion{' '}
                        <span style={{ color: ACCENTS.indigo.fill }}>·</span> Vibe{' '}
                        <span style={{ color: ACCENTS.sage.fill }}>·</span> Archetype{' '}
                        <span style={{ color: ACCENTS.rose.fill }}>·</span>{' '}
                    </span>
                </Marquee>
            </div>

            <div
                className="flex flex-wrap items-center gap-x-10 gap-y-3 px-6 pt-6 pb-14 md:px-14 lg:px-24"
                style={{ borderTop: `1px solid ${t.line}` }}
            >
                {links.map((l) => (
                    <a
                        key={l.href}
                        href={l.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        data-cursor={l.cursor}
                        className="text-lg font-normal transition-opacity hover:opacity-60 md:text-2xl"
                    >
                        {l.label} {l.arrow}
                    </a>
                ))}
                <span className="text-lg font-normal md:text-2xl" style={{ color: t.muted }}>
                    2026
                </span>
                <span className="text-lg font-normal md:ml-auto md:text-2xl" style={{ color: t.faint }}>
                    How Design Works
                </span>
            </div>
        </footer>
    );
}
