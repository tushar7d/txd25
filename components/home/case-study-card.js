import Link from "next/link";

const LockIcon = () => (
  <div className="relative top-6 left-6">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="w-6 h-6 text-gray-700 dark:text-gray-300"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z"
      />
    </svg>
  </div>
);

export const CardHeader = ({ company, title }) => (
  <div className="mt-12 text-center h-[150px]">
    <div className="mb-1 text-xl font-medium uppercase text-gray-600 dark:text-gray-300">
      {company}
    </div>
    <div className="font-serif text-4xl font-bold text-gray-900 dark:text-gray-100">
      {title}
    </div>
  </div>
);

export const CaseStudyCard = ({ href, children, showLock = false }) => (
  <Link href={href}>
    <div className="flex flex-col justify-between transition duration-300 ease-out cursor-pointer w-full h-[500px] bg-gray-100 dark:bg-white/5 rounded-xl p-6 overflow-hidden group hover:scale-105">
      {showLock && <LockIcon />}
      {children}
    </div>
  </Link>
);

const IMAGE_STACK_VARIANTS = {
  default: {
    left: "md:group-hover:translate-x-8 top-12 md:group-hover:rotate-6",
    center: "md:group-hover:-translate-x-8 top-12 md:group-hover:-rotate-6",
    right: "top-4",
  },
  spread: {
    left: "md:group-hover:translate-x-12 top-20",
    center: "md:group-hover:translate-x-2 top-12",
    right: "md:group-hover:-translate-x-12 top-4",
  },
  wide: {
    left: "md:group-hover:translate-x-12 top-16",
    center: "md:group-hover:-translate-x-12 top-16",
    right: "top-4",
  },
};

export const ImageStack = ({ imageSrc, variant = "default" }) => {
  const positions = IMAGE_STACK_VARIANTS[variant] || IMAGE_STACK_VARIANTS.default;
  const baseClasses = "w-[200px] mx-auto h-[500px] bg-contain bg-no-repeat absolute m-auto left-0 right-0 transition ease-out duration-300";

  return (
    <div className="relative w-full h-full">
      {["left", "center", "right"].map((position) => (
        <div
          key={position}
          className={`${baseClasses} ${positions[position]}`}
          style={{ backgroundImage: `url('${imageSrc}')` }}
        />
      ))}
    </div>
  );
};
