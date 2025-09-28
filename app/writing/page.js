
import Link from 'next/link'
import { getAllWritingContent } from '@/lib/content-utils'

export default async function Writing() {
  const posts = await getAllWritingContent()
  
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Writing</h1>
      
      {posts.length === 0 ? (
        <p className="text-gray-600">No articles found.</p>
      ) : (
        <div className="grid gap-6">
          {posts.map(({ slug, frontmatter }) => (
            <article key={slug} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
              <Link href={`/writing/${slug}`}>
                <h2 className="text-2xl font-semibold mb-2 hover:text-blue-600 transition-colors">
                  {frontmatter.title}
                </h2>
              </Link>
              
              {frontmatter.description && (
                <p className="text-gray-600 mb-4">{frontmatter.description}</p>
              )}
              
              <div className="flex items-center gap-4 text-sm text-gray-500">
                {frontmatter.date && (
                  <time>
                    {new Date(frontmatter.date).toLocaleDateString()}
                  </time>
                )}
                {frontmatter.readingTime && (
                  <span>{frontmatter.readingTime}</span>
                )}
                {frontmatter.author && (
                  <span>by {frontmatter.author}</span>
                )}
                {frontmatter.tags && (
                  <div className="flex gap-2">
                    {frontmatter.tags.map((tag) => (
                      <span key={tag} className="bg-gray-100 px-2 py-1 rounded text-xs">
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  )
}
  