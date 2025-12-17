import { MDXRemote } from 'next-mdx-remote-client/rsc'
import { mdxComponents } from '@/lib/mdx-components'
import { getWorkContent, getWorkSlugs } from '@/lib/content-utils'
import { notFound } from 'next/navigation'

// On-demand revalidation via webhook (fallback: 1 hour)
export const revalidate = 3600;

export async function generateStaticParams() {
  const slugs = await getWorkSlugs()
  return slugs
}

export async function generateMetadata({ params }) {
  const { slug } = await params
  
  try {
    const { frontmatter } = await getWorkContent(slug)
    return {
      title: frontmatter.title || `Work - ${slug}`,
      description: frontmatter.description || '',
    }
  } catch {
    return {
      title: `Work - ${slug}`,
    }
  }
}

export default async function WorkPage({ params }) {
  const { slug } = await params
  
  try {
    const { source, frontmatter } = await getWorkContent(slug)
    
    return (
      <article className="max-w-4xl mx-auto px-4 py-8">
        <header className="mb-8">
          <h1 className="text-4xl font-bold mb-4">{frontmatter.title}</h1>
          {frontmatter.description && (
            <p className="text-xl text-gray-600 mb-4">{frontmatter.description}</p>
          )}
          {frontmatter.date && (
            <time className="text-gray-500">
              {new Date(frontmatter.date).toLocaleDateString()}
            </time>
          )}
        </header>
        
        <div className="prose prose-lg max-w-none">
          <MDXRemote source={source} components={mdxComponents} />
        </div>
      </article>
    )
  } catch (error) {
    console.error('Error in WorkPage:', error)
    notFound()
  }
}