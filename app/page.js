"use client";

import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { getAllWorkContent, getAllWritingContent } from "@/lib/content-utils";
import { ArrowRight } from "lucide-react";

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
      <div className="flex flex-col justify-between  transition duration-300 ease-out cursor-pointer w-full h-[500px] bg-gray-100 dark:bg-white/5 rounded-xl p-6 overflow-hidden group hover:scale-105">
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

  const featuredWork = workContent
    .filter((item) => item.frontmatter.featured)
    .slice(0, 2);
  const featuredWriting = writingContent
    .filter((item) => item.frontmatter.featured)
    .slice(0, 2);

  return (
    <>
      <div className="p-3 md:p-4 flex  flex-col gap-24 ">
        <section className="mt-12">
          <h1 className=" font-mono mb-6  text-xl font-medium text-orange-400 ">
            INTRO
          </h1>
          <p className=" max-w-[900px] text-4xl font-medium  md:text-5xl/14  ">
            Designer and developer, who creates inovative products and experiences
            that drive growth
          </p>
          <p className="mt-4 text-2xl/9 max-w-2/3">
            In the past 12 years I have partnered with industry leaders like
            Revolut, Expedia, Zomato, MakeMyTrip and currently Infoedge to deliver
            products that matter
          </p>
        </section>
        <section>
          <h1 className=" font-mono mb-6  text-xl ">
            FEATURED /{" "}
            <a href="/work">
              {" "}
              <div className="inline-flex gap-2 justify-baseline group">
                <div>WORK</div>{" "}
                <ArrowRight className="transition-transform duration-200 group-hover:translate-x-2.5" />
              </div>
            </a>{" "}
          </h1>
          <div className="grid grid-cols-1  md:grid-cols-3 gap-4 ">

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
        <section>
          <h1 className=" font-mono mb-6  text-xl ">
            FEATURED /{" "}
            <a href="/work">
              {" "}
              <div className="inline-flex gap-2 justify-baseline group">
                <div>WORK</div>{" "}
                <ArrowRight className="transition-transform duration-200 group-hover:translate-x-2.5" />
              </div>
            </a>{" "}
          </h1>
          <div className="grid grid-cols-1  md:grid-cols-2 gap-4 ">
            {featuredWork.length > 0 ? (
              featuredWork.map((item) => (
                <Link
                  key={item.id}
                  href={`/work/${encodeURIComponent(item.slug)}`}
                >
                  <div className="bg-gray-100 dark:bg-white/5  rounded-xl p-6 h-[200px] flex flex-col justify-between hover:bg-gray-200 dark:hover:bg-white/8 transition-colors">
                    <div>
                      <h3 className="font-semibold text-lg mb-2">
                        {item.frontmatter.title}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300 text-sm">
                        {item.frontmatter.description}
                      </p>
                    </div>
                    {item.frontmatter.tags &&
                      item.frontmatter.tags.length > 0 && (
                        <div className="flex flex-wrap gap-2 mt-3">
                          {item.frontmatter.tags.slice(0, 3).map((tag) => (
                            <span
                              key={tag}
                              className="bg-gray-200 dark:bg-gray-600 text-xs px-2 py-1 rounded"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}
                  </div>
                </Link>
              ))
            ) : (
              <div className="bg-gray-100 dark:bg-white/5  rounded-xl p-6 h-[200px] flex items-center justify-center col-span-2">
                <p className="text-gray-500">No featured work available</p>
              </div>
            )}
          </div>
        </section>
        <section>
          <h1 className=" font-mono mb-6  text-xl ">
            FEATURED /{" "}
            <a href="/writing">
              {" "}
              <div className="inline-flex gap-2 justify-baseline group">
                <div>WRITING</div>{" "}
                <ArrowRight className="transition-transform duration-200 group-hover:translate-x-2.5" />
              </div>
            </a>{" "}
          </h1>
          <div className="grid grid-cols-1  md:grid-cols-2 gap-4 ">
            {featuredWriting.length > 0 ? (
              featuredWriting.map((item) => (
                <Link
                  key={item.id}
                  href={`/writing/${encodeURIComponent(item.slug)}`}
                >
                  <div className="bg-gray-100 dark:bg-white/5  rounded-xl p-6 h-[200px] flex flex-col justify-between hover:bg-gray-200 dark:hover:bg-white/8 transition-colors">
                    <div>
                      <h3 className="font-semibold text-lg mb-2">
                        {item.frontmatter.title}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300 text-sm">
                        {item.frontmatter.description}
                      </p>
                    </div>
                    <div className="flex items-center justify-between mt-3">
                      {item.frontmatter.readingTime && (
                        <span className="text-xs text-gray-500">
                          {item.frontmatter.readingTime}
                        </span>
                      )}
                      {item.frontmatter.date && (
                        <span className="text-xs text-gray-500">
                          {new Date(item.frontmatter.date).toLocaleDateString()}
                        </span>
                      )}
                    </div>
                  </div>
                </Link>
              ))
            ) : (
              <div className="bg-gray-100 dark:bg-white/5  rounded-xl p-6 h-[200px] flex items-center justify-center col-span-2">
                <p className="text-gray-500">No featured writing available</p>
              </div>
            )}
          </div>
        </section>
      </div>

  
    </>
  );
}
