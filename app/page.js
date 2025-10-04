"use client";

import { useEffect, useState } from "react";
import { getAllWorkContent, getAllWritingContent } from "@/lib/content-utils";
import { HeroSection } from "@/components/home/hero-section";
import { StaticWorkSection } from "@/components/home/static-work-section";
import { FeaturedContentSection } from "@/components/home/featured-content-section";

export default function Home() {
  const [workContent, setWorkContent] = useState([]);
  const [writingContent, setWritingContent] = useState([]);

  useEffect(() => {
    async function loadContent() {
      const [work, writing] = await Promise.all([
        getAllWorkContent(),
        getAllWritingContent(),
      ]);
      setWorkContent(work);
      setWritingContent(writing);
    }
    loadContent();
  }, []);

  const featuredWork = workContent.filter((item) => item.frontmatter.featured).slice(0, 2);
  const featuredWriting = writingContent.filter((item) => item.frontmatter.featured).slice(0, 2);

  return (
    <div className="p-3 md:p-4 flex flex-col gap-24">
      <HeroSection />
      <StaticWorkSection />
      <FeaturedContentSection items={featuredWork} type="work" />
      <FeaturedContentSection items={featuredWriting} type="writing" />
    </div>
  );
}
