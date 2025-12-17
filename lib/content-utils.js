import { client, publicClient } from './sanity.js'

// Use publicClient for browser, client for server
const getClient = () => {
  // Check if we're in the browser
  if (typeof window !== 'undefined') {
    return publicClient
  }
  return client
}

// Base query projection for list views (exclude content)
const listProjection = `{
  _id,
  "slug": slug.current,
  title,
  description,
  date,
  author,
  tags,
  readingTime,
  featured,
  status,
  _createdAt,
  _updatedAt
}`

// Full projection for detail views (include content)
const detailProjection = `{
  _id,
  "slug": slug.current,
  title,
  description,
  date,
  author,
  tags,
  readingTime,
  featured,
  status,
  content,
  _createdAt,
  _updatedAt
}`

// Transform Sanity document to match PocketBase shape
function transformToFrontmatter(doc) {
  return {
    id: doc._id,
    slug: doc.slug,
    frontmatter: {
      title: doc.title,
      description: doc.description || '',
      date: doc.date,
      author: doc.author || '',
      tags: Array.isArray(doc.tags) ? doc.tags : [],
      readingTime: doc.readingTime || '',
      featured: doc.featured || false,
      status: doc.status || 'published'
    },
    created: doc._createdAt,
    updated: doc._updatedAt
  }
}

// Get all content from a specific collection
export async function getAllContent(collection = 'posts') {
  try {
    const query = `*[_type == "${collection}"] | order(_createdAt desc) ${listProjection}`
    const sanityClient = getClient()
    const records = await sanityClient.fetch(query)

    return records.map(transformToFrontmatter)
  } catch (error) {
    console.error(`Error fetching all content from ${collection}:`, error)
    return []
  }
}

// Get specific content by slug
export async function getContent(slug, collection = 'posts') {
  try {
    const query = `*[_type == "${collection}" && slug.current == $slug][0] ${detailProjection}`
    const sanityClient = getClient()
    const record = await sanityClient.fetch(query, { slug })

    if (!record) {
      throw new Error(`Content not found: ${slug}`)
    }

    // Handle both old text format and new code field format
    let contentString = ''
    if (record.content) {
      // If content is an object (code field), extract the code property
      if (typeof record.content === 'object' && record.content.code) {
        contentString = record.content.code
      } else if (typeof record.content === 'string') {
        // If content is a string (old text field), use it directly
        contentString = record.content
      }
    }

    return {
      ...transformToFrontmatter(record),
      source: contentString // The MDX/Markdown content as string
    }
  } catch (error) {
    console.error(`Error fetching content ${slug} from ${collection}:`, error)
    throw new Error(`Content not found: ${slug}`)
  }
}

// Get all work content
export async function getAllWorkContent() {
  return getAllContent('work')
}

// Get specific work content
export async function getWorkContent(slug) {
  return getContent(slug, 'work')
}

// Get all writing content
export async function getAllWritingContent() {
  return getAllContent('writing')
}

// Get specific writing content
export async function getWritingContent(slug) {
  return getContent(slug, 'writing')
}

// Get all slugs for static generation
export async function getAllSlugs(collection = 'posts') {
  try {
    const query = `*[_type == "${collection}"]{ "slug": slug.current }`
    const sanityClient = getClient()
    const records = await sanityClient.fetch(query)

    return records.map(record => ({ slug: record.slug }))
  } catch (error) {
    console.error(`Error fetching slugs from ${collection}:`, error)
    return []
  }
}

// Get work slugs for static generation
export async function getWorkSlugs() {
  return getAllSlugs('work')
}

// Get writing slugs for static generation
export async function getWritingSlugs() {
  return getAllSlugs('writing')
}

// Utility functions for working with tags

// Get all unique tags from a collection
export async function getAllTags(collection = 'posts') {
  try {
    const query = `*[_type == "${collection}"]{ tags }`
    const sanityClient = getClient()
    const records = await sanityClient.fetch(query)

    const allTags = new Set()
    records.forEach(record => {
      if (Array.isArray(record.tags)) {
        record.tags.forEach(tag => allTags.add(tag))
      }
    })

    return Array.from(allTags).sort()
  } catch (error) {
    console.error(`Error fetching tags from ${collection}:`, error)
    return []
  }
}

// Get content filtered by tag
export async function getContentByTag(tag, collection = 'posts') {
  try {
    const query = `*[_type == "${collection}" && $tag in tags] | order(_createdAt desc) ${listProjection}`
    const sanityClient = getClient()
    const records = await sanityClient.fetch(query, { tag })

    return records.map(transformToFrontmatter)
  } catch (error) {
    console.error(`Error fetching content by tag ${tag} from ${collection}:`, error)
    return []
  }
}

// Get work content by tag
export async function getWorkByTag(tag) {
  return getContentByTag(tag, 'work')
}

// Get writing content by tag
export async function getWritingByTag(tag) {
  return getContentByTag(tag, 'writing')
}
