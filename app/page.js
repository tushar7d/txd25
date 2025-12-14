import { getAllWritingContent } from "@/lib/content-utils";
import { HeroSection } from "@/components/home/hero-section";
import { StaticWorkSection } from "@/components/home/static-work-section";
import { FeaturedContentSection } from "@/components/home/featured-content-section";

// On-demand revalidation via webhook (no automatic time-based revalidation)
// Falls back to 1 hour if webhook fails
export const revalidate = 3600;

export default async function Home() {
  // Fetch data at build time (SSG) and revalidate periodically (ISR)
  const writingContent = await getAllWritingContent();
  const featuredWriting = writingContent.filter((item) => item.frontmatter.featured).slice(0, 2);

  return (
    <div className="p-3 md:p-4 flex flex-col gap-24">
      <HeroSection />
      <StaticWorkSection />
      <FeaturedContentSection items={featuredWriting} type="writing" />
    </div>
  );
}
