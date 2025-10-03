import Link from "next/link";
import { getAllWorkContent, getAllWritingContent } from "@/lib/content-utils";
import { ArrowRight } from "lucide-react";

export default async function Home() {
  const [workContent, writingContent] = await Promise.all([
    getAllWorkContent(),
    getAllWritingContent(),
  ]);

  const featuredWork = workContent
    .filter((item) => item.frontmatter.featured)
    .slice(0, 2);
  const featuredWriting = writingContent
    .filter((item) => item.frontmatter.featured)
    .slice(0, 2);

  console.log(featuredWork);
  return (
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
        <div className="grid grid-cols-1  md:grid-cols-2 gap-4 ">
          {featuredWork.length > 0 ? (
            featuredWork.map((item) => (
              <Link
                key={item.id}
                href={`/work/${encodeURIComponent(item.slug)}`}
              >
                <div className="bg-gray-100 dark:bg-gray-800 rounded-xl p-6 h-[200px] flex flex-col justify-between hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
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
            <div className="bg-gray-100 dark:bg-gray-800 rounded-xl p-6 h-[200px] flex items-center justify-center col-span-2">
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
                <div className="bg-gray-100 dark:bg-gray-800 rounded-xl p-6 h-[200px] flex flex-col justify-between hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
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
            <div className="bg-gray-100 dark:bg-gray-800 rounded-xl p-6 h-[200px] flex items-center justify-center col-span-2">
              <p className="text-gray-500">No featured writing available</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
