import type { ReactNode } from 'react';

interface Props {
    children: ReactNode;
    /** Seconds for one full cycle. Longer = slower. */
    duration?: number;
    /** Pause the loop while the pointer is over it. */
    pauseOnHover?: boolean;
    className?: string;
}

/**
 * A seamless marquee.
 *
 * The trick is that the track is `width: max-content` and holds exactly
 * two copies of the content, so animating it to -50% lands precisely one
 * copy along and the loop is invisible. Duplicating the *string* inside a
 * single span (the previous approach) does not work, because -50% is then
 * measured against the block container rather than the content.
 */
export default function Marquee({
    children,
    duration = 40,
    pauseOnHover = true,
    className = '',
}: Props) {
    return (
        <div
            className={`overflow-hidden ${pauseOnHover ? 'marquee-host' : ''} ${className}`}
            aria-hidden="true"
        >
            <div className="marquee" style={{ ['--marquee-duration' as string]: `${duration}s` }}>
                <div className="flex whitespace-nowrap">{children}</div>
                <div className="flex whitespace-nowrap">{children}</div>
            </div>
        </div>
    );
}
