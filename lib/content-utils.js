import pb from './pocketbase.js'

// Get all content from a specific collection
export async function getAllContent(collection = 'posts') {
  try {
    const records = await pb.collection(collection).getFullList({
      sort: '-created',
      fields: 'id,slug,title,description,date,author,tags,readingTime,featured,status,created,updated'
    })

    return records.map(record => ({
      id: record.id,
      slug: record.slug,
      frontmatter: {
        title: record.title,
        description: record.description,
        date: record.date,
        author: record.author,
        tags: Array.isArray(record.tags) ? record.tags : [],
        readingTime: record.readingTime,
        featured: record.featured || false,
        status: record.status || 'published'
      },
      created: record.created,
      updated: record.updated
    }))
  } catch (error) {
    console.error(`Error fetching all content from ${collection}:`, error)
    return []
  }
}

// Get specific content by slug
export async function getContent(slug, collection = 'posts') {
  try {
    const record = await pb.collection(collection).getFirstListItem(`slug="${slug}"`, {
      fields: '*'
    })

    return {
      id: record.id,
      slug: record.slug,
      source: record.content, // The MDX content
      frontmatter: {
        title: record.title,
        description: record.description,
        date: record.date,
        author: record.author,
        tags: Array.isArray(record.tags) ? record.tags : [],
        readingTime: record.readingTime,
        featured: record.featured || false,
        status: record.status || 'published'
      },
      created: record.created,
      updated: record.updated
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
    const records = await pb.collection(collection).getFullList({
      fields: 'slug'
    })

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
    const records = await pb.collection(collection).getFullList({
      fields: 'tags'
    })

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
    const records = await pb.collection(collection).getFullList({
      filter: `tags ~ "${tag}"`,
      sort: '-created',
      fields: 'id,slug,title,description,date,author,tags,readingTime,featured,status,created,updated'
    })

    return records.map(record => ({
      id: record.id,
      slug: record.slug,
      frontmatter: {
        title: record.title,
        description: record.description,
        date: record.date,
        author: record.author,
        tags: Array.isArray(record.tags) ? record.tags : [],
        readingTime: record.readingTime,
        featured: record.featured || false,
        status: record.status || 'published'
      },
      created: record.created,
      updated: record.updated
    }))
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