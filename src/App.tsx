import Hero from './components/Hero';
import ChapterHeading from './components/ChapterHeading';
import VibeCheck from './components/VibeCheck';
import TypographyRules from './components/TypographyRules';
import ColorStory from './components/ColorStory';
import WhitespaceGrid from './components/WhitespaceGrid';
import MotionPhysics from './components/MotionPhysics';
import ArchetypeCards from './components/ArchetypeCards';
import Manifesto from './components/Manifesto';
import SectionBreak from './components/SectionBreak';
import Interlude from './components/Interlude';
import Footer from './components/Footer';
import Cursor from './components/Cursor';
import ChapterRail, { type RailItem } from './components/ChapterRail';
import SmoothScroll from './components/SmoothScroll';
import { ACCENTS } from './lib/theme';

/* Drives the rail, the keyboard shortcuts, and the progress bar colour. */
const RAIL: RailItem[] = [
    { id: 'hero', label: 'Start', accent: ACCENTS.magenta.fill },
    { id: 'ch-01', label: '01 Typography', accent: ACCENTS.magenta.fill },
    { id: 'ch-02', label: '02 Colour', accent: ACCENTS.orange.fill },
    { id: 'break-a', label: 'Interlude', accent: ACCENTS.blue.fill },
    { id: 'ch-03', label: '03 Whitespace', accent: ACCENTS.blue.fill },
    { id: 'interlude', label: 'Design.', accent: ACCENTS.magenta.fill },
    { id: 'ch-04', label: '04 Motion', accent: ACCENTS.indigo.fill },
    { id: 'ch-05', label: '05 Register', accent: ACCENTS.sage.fill },
    { id: 'break-b', label: 'Interlude', accent: ACCENTS.rose.fill },
    { id: 'ch-06', label: '06 Archetypes', accent: ACCENTS.rose.fill },
    { id: 'manifesto', label: 'Manifesto', accent: ACCENTS.magenta.fill },
    { id: 'footer', label: 'End', accent: ACCENTS.magenta.fill },
];

export default function App() {
    return (
        <SmoothScroll>
            <Cursor />
            <ChapterRail items={RAIL} />

            <main>
                <Hero />

                <ChapterHeading
                    id="ch-01"
                    number="01"
                    title="Typography Is the Interface"
                    subtitle="One typeface does all the work. Hierarchy comes from extreme scale contrast — 5:1 to 31:1 between display and body."
                    accent="magenta"
                >
                    <TypographyRules />
                </ChapterHeading>

                <ChapterHeading
                    id="ch-02"
                    number="02"
                    title="Colour Is a System"
                    subtitle="A neutral canvas, one strategic accent. Colour is never ornamental — it always has a job."
                    accent="orange"
                >
                    <ColorStory />
                </ChapterHeading>

                <SectionBreak
                    id="break-a"
                    variant="editorial"
                    label="Interlude"
                    accent="blue"
                    heading="The space between elements carries more meaning than the elements themselves."
                    body="The bento grid won because it turns empty space into rhythm. Every gap is a decision."
                />

                <ChapterHeading
                    id="ch-03"
                    number="03"
                    title="Whitespace as Structure"
                    subtitle="Gaps create rhythm, margins create hierarchy. The grid is invisible by design."
                    accent="blue"
                >
                    <WhitespaceGrid />
                </ChapterHeading>

                <Interlude id="interlude" />

                <ChapterHeading
                    id="ch-04"
                    number="04"
                    title="Motion With Intent"
                    subtitle="Spring physics, not easing curves. Stiffness and damping instead of duration. Nothing moves without a reason."
                    accent="indigo"
                    tone="ink"
                >
                    <MotionPhysics />
                </ChapterHeading>

                <ChapterHeading
                    id="ch-05"
                    number="05"
                    title="The Emotional Register"
                    subtitle="Warmth or precision. That one decision cascades into palette, radii, shadow, and voice."
                    accent="sage"
                >
                    <VibeCheck />
                </ChapterHeading>

                <SectionBreak
                    id="break-b"
                    variant="statement"
                    label="Interlude"
                    accent="rose"
                    heading="Every website has a personality. Most designers just never name it."
                    body="Jung's twelve archetypes describe fundamental human motivations. Applied to design, they turn arbitrary choices into inevitable ones."
                    stat={{ value: '12', unit: 'Archetypes' }}
                />

                <ChapterHeading
                    id="ch-06"
                    number="06"
                    title="Brand Archetypes"
                    subtitle="The Sage teaches, the Outlaw breaks rules, the Explorer discovers. Name the archetype and every other decision follows."
                    accent="rose"
                >
                    <ArchetypeCards />
                </ChapterHeading>

                <Manifesto id="manifesto" />
            </main>

            <Footer id="footer" />
        </SmoothScroll>
    );
}
