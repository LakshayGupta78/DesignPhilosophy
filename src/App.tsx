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
import PinkBreak from './components/PinkBreak';
import Footer from './components/Footer';

export default function App() {
  return (
    <>
      {/* Hero */}
      <Hero />

      {/* Ch.01 — Typography Is the Interface */}
      <ChapterHeading
        number="01"
        title="Typography Is the Interface"
        subtitle="Across seven award-winning sites, a single typeface does all the work. Hierarchy emerges from extreme scale contrast — ratios of 5:1 to 31:1 between display and body text. The font is the design."
        bg="#FFFFFF"
        text="#1a1a1a"
        accent="#D300C5"
      >
        <TypographyRules />
      </ChapterHeading>

      {/* Separator */}
      <SectionBreak
        lines={[
          'What if you removed every decorative color?',
          'Monochromatic base. One strategic accent.',
          'That is the entire system.',
        ]}
        accent="#F15A24"
      />

      {/* Ch.02 — Color Is a System */}
      <ChapterHeading
        number="02"
        title="Color Is a System"
        subtitle="The monochromatic-plus-one pattern dominates premium digital design. A neutral canvas anchors the experience while a single strategic accent creates moments of meaning. Color is never ornamental."
        bg="#FFFFFF"
        text="#1a1a1a"
        accent="#F15A24"
      >
        <ColorStory />
      </ChapterHeading>

      {/* Pink visual break — cycling languages */}
      <PinkBreak />

      {/* Ch.03 — Whitespace as Structure */}
      <ChapterHeading
        number="03"
        title="Whitespace as Structure"
        subtitle="The bento grid organizes visual complexity into digestible modules. Gaps create rhythm, margins create hierarchy, and empty space communicates more than content ever could. The grid is invisible by design."
        bg="#FFFFFF"
        text="#1a1a1a"
        accent="#2563EB"
      >
        <WhitespaceGrid />
      </ChapterHeading>

      {/* Separator */}
      <SectionBreak
        lines={[
          'Does your animation serve the interaction?',
          'Spring physics replace easing curves.',
          'Mass. Stiffness. Damping. Nothing else.',
        ]}
        accent="#8E93FF"
      />

      {/* Ch.04 — Motion With Intent */}
      <ChapterHeading
        number="04"
        title="Motion With Intent"
        subtitle="Every animation in premium interfaces uses spring physics — stiffness and damping instead of duration and easing. Tickers broadcast energy. Parallax creates spatial depth. Nothing moves without a reason."
        bg="#FFFFFF"
        text="#1a1a1a"
        accent="#8E93FF"
      >
        <MotionPhysics />
      </ChapterHeading>

      {/* Separator */}
      <SectionBreak
        lines={[
          'Is this Cozy or Tech?',
          'The answer sets everything.',
          'Palette. Radius. Shadow. Type.',
        ]}
        accent="#8B9A46"
      />

      {/* Ch.05 — The Vibe Check */}
      <ChapterHeading
        number="05"
        title="The Emotional Register"
        subtitle="Every interface exists on a spectrum between warmth and precision. A single decision — cozy or technical — cascades into the color palette, corner radii, shadow behavior, and typographic voice of the entire system."
        bg="#FFFFFF"
        text="#1a1a1a"
        accent="#8B9A46"
      >
        <VibeCheck />
      </ChapterHeading>

      {/* Separator */}
      <SectionBreak
        lines={[
          'Are you The Sage or The Outlaw?',
          'Every design decision has a personality.',
          'Know the archetype. The rest follows.',
        ]}
        accent="#E11D48"
      />

      {/* Ch.06 — Brand Archetypes */}
      <ChapterHeading
        number="06"
        title="Brand Archetypes"
        subtitle="Carl Jung's framework maps every site to a personality — The Sage teaches, The Outlaw breaks rules, The Explorer discovers. Once identified, typography, color, navigation, and motion all follow a single coherent logic."
        bg="#FFFFFF"
        text="#1a1a1a"
        accent="#E11D48"
      >
        <ArchetypeCards />
      </ChapterHeading>

      {/* Manifesto */}
      <Manifesto />

      {/* Footer */}
      <Footer />
    </>
  );
}
