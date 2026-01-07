
import { HeroSection } from "@/components/home/hero-section";
import { CompaniesCarousel } from "@/components/home/companies-carousel";
import { StaticWorkSection } from "@/components/home/static-work-section";




export default async function Home() {

 

  return (
    <div className="p-3 md:p-4 flex flex-col gap-24 overflow-visible">
      <HeroSection />
      <CompaniesCarousel />
      <StaticWorkSection />
     
    </div>
  );
}
