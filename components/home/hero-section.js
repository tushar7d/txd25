import { SpinningText } from "@/components/ui/spinning-text";

export const HeroSection = () => (
  <section className="mt-12 flex gap-6 justify-between items-center pr-12">
    <div>
      <h1 className="mb-3 text-3xl font-serif font-medium text-orange-400">Intro</h1>
      <p className="max-w-[900px] text-4xl font-medium md:text-4xl/12">
        Designer and developer, who creates inovative products and experiences that drive growth
      </p>
      <p className="mt-4 text-xl/6 max-w-2/3">
        In the past 12 years I have partnered with industry leaders like Revolut, Expedia, Zomato,
        MakeMyTrip and currently Infoedge to deliver products that matter
      </p>
    </div>
    <div className="relative w-[300px] h-[300px] mr-6 flex items-center justify-center">
      <div className="absolute inset-0">
        <SpinningText radius={10} duration={20} className="w-full h-full text-xl font-bold z-0">
          TUSHAR DEBNATH • PRODUCT DESIGNER •
        </SpinningText>
      </div>
      <img
        src="/images/pic.png"
        alt="Tushar Debnath"
        className="w-[200px] h-[200px] rounded-full object-cover z-10"
      />
    </div>
  </section>
);
