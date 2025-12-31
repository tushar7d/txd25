import { SpinningText } from "@/components/ui/spinning-text";

export const HeroSection = () => (
  <section className="mt-12 flex md:flex-row flex-col-reverse  gap-6 justify-between items-center md:pr-12">
    <div className="text-center md:text-left">
      <h1 className="mb-3 text-3xl font-serif font-medium text-orange-400">Intro</h1>
      <p className="max-w-225 text-3xl font-medium md:text-4xl/12">
        Designer and developer, who creates inovative products and experiences that drive growth
      </p>
      <p className="mt-4 text-xl/6 md:max-w-2/3 mx-auto md:mx-0">
        In the past 12 years I have partnered with industry leaders like Revolut, Expedia, Zomato,
        MakeMyTrip and currently Infoedge to deliver products that matter
      </p>
    </div>
    <div className="relative w-75 h-75 md:mr-6 flex items-center justify-center">
      <div className="absolute inset-0">
        <SpinningText radius={10} duration={20} className="w-full h-full text-xl font-bold z-0">
          TUSHAR DEBNATH • PRODUCT DESIGNER •
        </SpinningText>
      </div>
      <img
        src="/images/pic.png"
        alt="Tushar Debnath"
        className="w-50 h-50 rounded-full object-cover z-10"
      />
    </div>
  </section>
);
