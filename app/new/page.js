"use client";

import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";


import Slider from "react-slick";

const FadeIn = ({
  children,
  className,
  noVertical,
  delay,
  viewTriggerOffset,
}) => {
  const ref = useRef(null);
  const inView = useInView(ref, {
    once: true,
    margin: viewTriggerOffset ? "-128px" : "0px",
  });
  const fadeUpVariants = {
    initial: {
      opacity: 0,
      y: noVertical ? 0 : 24,
    },
    animate: {
      opacity: 1,
      y: 0,
    },
  };
  return (
    <motion.div
      animate={inView ? "animate" : "initial"}
      className={className}
      initial={false}
      ref={ref}
      transition={{
        duration: 1,
        delay: delay || 0,
        ease: [0.21, 0.47, 0.32, 0.98],
      }}
      variants={fadeUpVariants}
    >
      {children}
    </motion.div>
  );
};

const AboutMe = ({ h, d }) => {
  return (
    <div
      className={
        " mt-4  p-3 md:p-12 md:mx-0 md:mt-0 rounded-2xl sm:min-w-[320px]  md:flex md:justify-between md:items-center   "
      }
    >

      <div className="mb-4 md:mb-0 md:order-last">
        <img
          src="/images/pic.png"
          alt="Profile picture"
          className="w-[200px] h-[200px] md:w-[250px] md:h-[250px]  mx-auto md:mx-0"
        />
      </div>

      <div className="flex flex-col justify-between text-center  md:text-left md:w-[70%] ">
        <h1 className="mb-2 font-serif text-6xl font-black text-transparent select-none md:text-7xl animate-text bg-gradient-to-r from-teal-500 via-purple-500 to-orange-500 bg-clip-text">
          {h}
        </h1>
        <div className="space-y-2 text-black dark:text-white">
          <p className="mt-3 text-xl md:text-2xl select-none">{d}</p>
        </div>

        <div className="mt-4">
          <Link href={"/about"}>
            <button className="px-6 py-3 mx-auto mt-6 mb-6 bg-white dark:bg-gray-800 drop-shadow-lg transition transform hover:subpixel-antialiased hover:scale-105 rounded-full tetx-xl text-black dark:text-white font-serif font-semibold">
              More about me
            </button>
          </Link>

        </div>
      </div>
    </div>
  );
};

const Locked = () => {
  return (
    <div className="relative top-6 left-6">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-gray-700 dark:text-gray-300">
        <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" />
      </svg>
    </div>
  );
};

const CardHeader = ({ t, b }) => {
  return (
    <div className="mt-12 text-center h-[150px]">
      <div className="mb-1 text-xl text-gray-600 dark:text-gray-300">{t}</div>
      <div className="font-serif text-4xl font-bold text-gray-900 dark:text-gray-100">{b}</div>
    </div>
  );
};

const Heading = ({ children }) => {
  return (
    <div className="my-12 mt-24 font-serif text-6xl font-bold text-center text-black dark:text-white">
      {children}
    </div>
  );
};

const CaseStudyCard = ({ href, children, showLock = false }) => {
  return (
    <Link href={href}>
      <div className="flex flex-col justify-between p-0 transition duration-300 ease-out cursor-pointer w-full h-[500px] bg-gray-100 dark:bg-white/5 rounded-xl p-6 overflow-hidden group hover:scale-105">
        {showLock && <Locked />}
        {children}
      </div>
    </Link>
  );
};

const ImageStack = ({ imageSrc, variant = "default" }) => {
  const variants = {
    default: {
      left: "md:group-hover:translate-x-8 top-12 md:group-hover:rotate-6",
      center: "md:group-hover:-translate-x-8 top-12 md:group-hover:-rotate-6",
      right: "top-4"
    },
    spread: {
      left: "md:group-hover:translate-x-12 top-20",
      center: "md:group-hover:translate-x-2 top-12",
      right: "md:group-hover:-translate-x-12 top-4"
    },
    wide: {
      left: "md:group-hover:translate-x-12 top-16",
      center: "md:group-hover:-translate-x-12 top-16",
      right: "top-4"
    }
  };

  const positions = variants[variant] || variants.default;

  return (
    <div className="relative w-full h-full">
      <div
        className={`w-[200px] mx-auto h-[500px] bg-contain bg-no-repeat absolute m-auto left-0 right-0 transition ease-out duration-300 ${positions.left}`}
        style={{ backgroundImage: `url('${imageSrc}')` }}
      />
      <div
        className={`w-[200px] mx-auto h-[500px] bg-contain bg-no-repeat absolute m-auto left-0 right-0 transition ease-out duration-300 ${positions.center}`}
        style={{ backgroundImage: `url('${imageSrc}')` }}
      />
      <div
        className={`w-[200px] mx-auto h-[500px] bg-contain bg-no-repeat absolute m-auto left-0 right-0 transition ease-out duration-300 ${positions.right}`}
        style={{ backgroundImage: `url('${imageSrc}')` }}
      />
    </div>
  );
};

const ExpansionInd = () => {
  return (
    <CaseStudyCard href="/work/expansion-india">
      <CardHeader t="Revolut" b="Building for India" />
      <ImageStack imageSrc="/images/inlaunch1.png" variant="default" />
    </CaseStudyCard>
  );
};

const RevSnap = () => {
  return (
    <CaseStudyCard href="/work/building-snap">
      <CardHeader t="Revolut" b="Snap App" />
      <div
        className="w-[500px] h-full md:h-full ml-24 md:ml-16 mb-4 bg-contain bg-no-repeat md:group-hover:-translate-x-8 transition ease-out duration-300"
        style={{ backgroundImage: "url('/images/snapcov.png')" }}
      />
    </CaseStudyCard>
  );
};

const ZomTrack = () => {
  return (
    <CaseStudyCard href="/work/zomato">
      <CardHeader t="Zomato" b="Order Tracker" />
      <ImageStack imageSrc="/images/track.png" variant="spread" />
    </CaseStudyCard>
  );
};

const ExpCar = () => {
  return (
    <CaseStudyCard href="/work/expedia">
      <CardHeader t="Expedia" b="Car Rental" />
      <ImageStack imageSrc="/images/car.png" variant="wide" />
    </CaseStudyCard>
  );
};

const ZomPartner = () => {
  return (
    <CaseStudyCard href="/work/partner-app" showLock={true}>
      <CardHeader t="Zomato" b="Partner App" />
      <ImageStack imageSrc="/images/medal.png" variant="spread" />
    </CaseStudyCard>
  );
};

const RevWealthPro = () => {
  return (
    <CaseStudyCard href="/work/wealth-pro">
      <CardHeader t="Revolut" b="Wealth Protection" />
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
};
const SectionCasestudy = () => {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      <FadeIn delay={0.2}>
        <ExpansionInd />
      </FadeIn>
      <FadeIn delay={0.3}>
        <RevSnap />
      </FadeIn>
      <FadeIn delay={0.4}>
        <RevWealthPro />
      </FadeIn>

      <FadeIn delay={0.2}>
        <ZomTrack />
      </FadeIn>
      <FadeIn delay={0.3}>
        <ExpCar />
      </FadeIn>
      <FadeIn delay={0.4}>
        <ZomPartner />
      </FadeIn>
    </div>
  );
};

const SectionLogoSlider = () => {
  const settings = {
    autoplay: true,
    autoplaySpeed: 0,
    speed: 4000,
    cssEase: "linear",
    infinite: true,
    slidesToShow: 4,
    slidesToScroll: 1,
    initialSlide: 0,
    arrows: false,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 600,
        settings: {
          infinite: true,
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
    ],
  };

  const logos = [
    { src: "/logo/Revolut.svg", alt: "Revolut logo" },
    { src: "/logo/Zomato.svg", alt: "Zomato logo" },
    { src: "/logo/Expedia.svg", alt: "Expedia logo" },
    { src: "/logo/Hike.svg", alt: "Hike logo" },
    { src: "/logo/Makemytrip.svg", alt: "MakeMyTrip logo" },
  ];

  return (
    <div className="mt-[20px] mb-[80px] py-6 relative">
      <div className="absolute top-0 left-0 w-[60px] h-full bg-gradient-to-r from-white dark:from-[#111111] to-transparent z-10" />
      <div className="absolute top-0 right-0 w-[60px] h-full bg-gradient-to-r from-transparent to-white dark:to-[#111111] z-10" />
      <Slider {...settings}>
        {logos.map((logo, index) => (
          <div key={index} className="flex justify-center w-full">
            <img src={logo.src} alt={logo.alt} className="mx-auto" />
          </div>
        ))}
      </Slider>
    </div>
  );
};

const Home = () => {
  return (
    <section className="max-w-[1140px] mx-auto mt-24 md:px-0 z-10 text-black dark:text-white">
      <FadeIn delay={0.2}>
        <AboutMe
          h="Hello Everyone!"
          d="I'm Tushar Debnath, a product designer and design technologist with more than ten years of expertise in shaping products and creating impactful user experiences"
        />
      </FadeIn>
      <FadeIn delay={0.4}>
        <SectionLogoSlider />
      </FadeIn>
      <FadeIn delay={0.5}>
        <Heading className="mt-12">Case studies</Heading>
        <SectionCasestudy />
      </FadeIn>
    </section>
  );
};

export default Home;
