import { MDXRemote } from 'next-mdx-remote-client/rsc'
import { mdxComponents } from '@/lib/mdx-components'
import { getWritingContent, getWritingSlugs } from '@/lib/content-utils'
import { notFound } from 'next/navigation'

// On-demand revalidation via webhook (fallback: 1 hour)
export const revalidate = 3600;

export async function generateStaticParams() {
  const slugs = await getWritingSlugs()
  return slugs
}

export async function generateMetadata({ params }) {
  const { slug } = await params
  const decodedSlug = decodeURIComponent(slug)

  try {
    const { frontmatter } = await getWritingContent(decodedSlug)
    return {
      title: frontmatter.title || `Writing - ${slug}`,
      description: frontmatter.description || '',
    }
  } catch {
    return {
      title: `Writing - ${slug}`,
    }
  }
}

export default async function WritingPage({ params }) {
  const { slug } = await params
  const decodedSlug = decodeURIComponent(slug)

  try {
    const { source, frontmatter } = await getWritingContent(decodedSlug)
    
    return (
      <article className="max-w-4xl mx-auto px-4 py-8">
        <header className="mb-8">
          <h1 className="text-4xl font-bold mb-4">{frontmatter.title}</h1>
          {frontmatter.description && (
            <p className="text-xl text-gray-600 mb-4">{frontmatter.description}</p>
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
          </div>
        </header>
        
        <div className="prose prose-lg max-w-none">
          <MDXRemote source={source} components={mdxComponents} />
        </div>
      </article>
    )
  } catch (error) {
    console.error('Error in WritingPage:', error)
    notFound()
  }
}