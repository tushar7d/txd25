import fs from 'fs'
import path from 'path'
import { glob } from 'glob'
import matter from 'gray-matter'
// No separate serialize import needed for next-mdx-remote-client

const contentDirectory = path.join(process.cwd(), 'content')

// Get all MDX files from a directory
export async function getMdxFiles(directory = '') {
  const contentPath = path.join(contentDirectory, directory)
  const pattern = path.join(contentPath, '**/*.{md,mdx}').replace(/\\/g, '/')
  
  try {
    const files = await glob(pattern)
    return files.map(file => ({
      slug: path.relative(contentDirectory, file)
        .replace(/\.(md|mdx)$/, '')
        .replace(/\\/g, '/'),
      filePath: file,
    }))
  } catch (error) {
    console.error('Error reading MDX files:', error)
    return []
  }
}

// Get MDX file content and frontmatter
export async function getMdxContent(slug, directory = '') {
  const contentPath = path.join(contentDirectory, directory)
  const possiblePaths = [
    path.join(contentPath, `${slug}.mdx`),
    path.join(contentPath, `${slug}.md`),
    path.join(contentPath, slug, 'index.mdx'),
    path.join(contentDirectory, `${slug}.mdx`),
    path.join(contentDirectory, `${slug}.md`),
  ]

  let filePath = null
  for (const possiblePath of possiblePaths) {
    if (fs.existsSync(possiblePath)) {
      filePath = possiblePath
      break
    }
  }

  if (!filePath) {
    throw new Error(`MDX file not found for slug: ${slug}`)
  }

  const source = fs.readFileSync(filePath, 'utf8')
  const { data: frontmatter, content } = matter(source)

  return {
    source: content, // Return raw content for next-mdx-remote-client
    frontmatter,
    filePath,
  }
}

// Get all MDX content with frontmatter for listing pages
export async function getAllMdxContent(directory = '') {
  const files = await getMdxFiles(directory)
  
  const content = await Promise.all(
    files.map(async ({ slug, filePath }) => {
      const source = fs.readFileSync(filePath, 'utf8')
      const { data: frontmatter } = matter(source)
      
      return {
        slug,
        frontmatter,
        filePath,
      }
    })
  )

  // Sort by date if available, otherwise by slug
  return content.sort((a, b) => {
    if (a.frontmatter.date && b.frontmatter.date) {
      return new Date(b.frontmatter.date) - new Date(a.frontmatter.date)
    }
    return a.slug.localeCompare(b.slug)
  })
}
