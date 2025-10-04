import Link from "next/link";

export const ContentCard = ({ item, type }) => (
  <Link key={item.id} href={`/${type}/${encodeURIComponent(item.slug)}`}>
    <div className="bg-gray-100 dark:bg-white/5 rounded-xl p-6 h-[200px] flex flex-col justify-between hover:bg-gray-200 dark:hover:bg-white/8 transition-colors">
      <div>
        <h3 className="font-semibold text-lg mb-2">{item.frontmatter.title}</h3>
        <p className="text-gray-600 dark:text-gray-300 text-sm">{item.frontmatter.description}</p>
      </div>
      {type === "work" && item.frontmatter.tags?.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-3">
          {item.frontmatter.tags.slice(0, 3).map((tag) => (
            <span key={tag} className="bg-gray-200 dark:bg-gray-600 text-xs px-2 py-1 rounded">
              {tag}
            </span>
          ))}
        </div>
      )}
      {type === "writing" && (
        <div className="flex items-center justify-between mt-3">
          {item.frontmatter.readingTime && (
            <span className="text-xs text-gray-500">{item.frontmatter.readingTime}</span>
          )}
          {item.frontmatter.date && (
            <span className="text-xs text-gray-500">
              {new Date(item.frontmatter.date).toLocaleDateString()}
            </span>
          )}
        </div>
      )}
    </div>
  </Link>
);

export const EmptyState = ({ type }) => (
  <div className="bg-gray-100 dark:bg-white/5 rounded-xl p-6 h-[200px] flex items-center justify-center col-span-2">
    <p className="text-gray-500">No featured {type} available</p>
  </div>
);
