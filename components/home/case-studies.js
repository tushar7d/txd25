import { CaseStudyCard, CardHeader, ImageStack } from "./case-study-card";

export const ExpansionInd = () => (
  <CaseStudyCard href="/work/test">
    <CardHeader company="Revolut" title="Building for India" />
    <ImageStack imageSrc="/images/inlaunch1.png" variant="default" />
  </CaseStudyCard>
);

export const RevSnap = () => (
  <CaseStudyCard href="/work/building-snap">
    <CardHeader company="Revolut" title="Snap App" />
    <div
      className="w-[500px] h-full md:h-full ml-24 md:ml-16 mb-4 bg-contain bg-no-repeat md:group-hover:-translate-x-8 transition ease-out duration-300"
      style={{ backgroundImage: "url('/images/snapcov.png')" }}
    />
  </CaseStudyCard>
);

export const ZomTrack = () => (
  <CaseStudyCard href="/work/zomato">
    <CardHeader company="Zomato" title="Order Tracker" />
    <ImageStack imageSrc="/images/track.png" variant="spread" />
  </CaseStudyCard>
);

export const ExpCar = () => (
  <CaseStudyCard href="/work/expedia">
    <CardHeader company="Expedia" title="Car Rental" />
    <ImageStack imageSrc="/images/car.png" variant="wide" />
  </CaseStudyCard>
);

export const ZomPartner = () => (
  <CaseStudyCard href="/work/partner-app" showLock={true}>
    <CardHeader company="Zomato" title="Partner App" />
    <ImageStack imageSrc="/images/medal.png" variant="spread" />
  </CaseStudyCard>
);

export const RevWealthPro = () => (
  <CaseStudyCard href="/work/wealth-pro">
    <CardHeader company="Revolut" title="Wealth Protection" />
    <div className="relative w-full h-full transition ease-in-out md:group-hover:-translate-y-6">
      <div
        className="w-[200px] mx-auto h-[500px] bg-contain bg-no-repeat absolute m-auto left-0 md:group-hover:translate-x-8 right-0 top-12 md:group-hover:rotate-6 transition ease-out duration-300"
        style={{ backgroundImage: "url('/wp/01.png')" }}
      />
      <div
        className="w-[200px] mx-auto h-[500px] bg-contain bg-no-repeat absolute m-auto left-0 right-0 md:group-hover:-translate-x-8 top-12 md:group-hover:-rotate-6 transition ease-out duration-300"
        style={{ backgroundImage: "url('/wp/02.png')" }}
      />
      <div
        className="w-[200px] mx-auto h-[500px] bg-contain bg-no-repeat absolute m-auto left-0 right-0 top-4 transition ease-out duration-300"
        style={{ backgroundImage: "url('/wp/03.png')" }}
      />
    </div>
  </CaseStudyCard>
);
