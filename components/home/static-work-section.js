import { FadeIn } from "./fade-in";
import { ExpansionInd, RevWealthPro, ZomTrack } from "./case-studies";
import { SectionHeader } from "./section-header";

export const StaticWorkSection = () => (
  <section>
    <SectionHeader link="/work" label="WORK" />
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <FadeIn delay={0.2}>
        <ExpansionInd />
      </FadeIn>
      <FadeIn delay={0.4}>
        <RevWealthPro />
      </FadeIn>
      <FadeIn delay={0.5}>
        <ZomTrack />
      </FadeIn>
    </div>
  </section>
);
