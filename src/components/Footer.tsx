export default function Footer() {
    return (
        <footer
            className="relative h-screen flex flex-col overflow-hidden"
            style={{ background: '#FFFFFF' }}
        >
            {/* Scrolling marquee — fills the viewport */}
            <div className="flex-1 flex items-center overflow-hidden">
                <div className="animate-marquee whitespace-nowrap">
                    <span
                        className="text-[clamp(8rem,15vw,16rem)] font-normal tracking-[-0.02em]"
                        style={{ color: '#1a1a1a' }}
                    >
                        {'Type   Color   Grid   Motion   Vibe   Archetype   Type   Color   Grid   Motion   Vibe   Archetype   '}
                    </span>
                </div>
            </div>

            {/* Bottom bar — matches Instagram exactly: regular weight, ~14px, spaced links */}
            <div
                className="px-10 md:px-20 lg:px-32 py-6 flex flex-wrap items-center gap-10"
                style={{ borderTop: '1px solid rgba(0,0,0,0.08)' }}
            >
                <a
                    href="https://lakshaydesigns.site"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[24px] font-normal text-[#1a1a1a] hover:opacity-60 transition-opacity"
                >
                    Created by Lakshay →
                </a>
                <a
                    href="https://godly.website"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[24px] font-normal text-[#1a1a1a] hover:opacity-60 transition-opacity"
                >
                    Godly Collection ↗
                </a>
                <span className="text-[24px] font-normal" style={{ color: '#1a1a1a' }}>
                    2026
                </span>
                <span className="ml-auto text-[24px] font-normal" style={{ color: 'rgba(0,0,0,0.35)' }}>
                    How Design Works
                </span>
            </div>
        </footer>
    );
}
