import Link from "next/link";
import { ArrowRight } from "lucide-react";

export const SectionHeader = ({ link, label }) => (
  <h1 className="font-mono mb-6 text-xl">
    FEATURED /{" "}
    <Link href={link}>
      <span className="inline-flex gap-2 justify-baseline group">
        <span>{label}</span>
        <ArrowRight className="transition-transform duration-200 group-hover:translate-x-2.5" />
      </span>
    </Link>
  </h1>
);
