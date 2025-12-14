# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

- `npm run dev` - Start development server with Turbopack
- `npm run build` - Build production application with Turbopack
- `npm start` - Start production server

## Project Architecture

This is a Next.js 16 application using the App Router with a content-driven architecture for blogging/portfolio functionality.

### Content Management System

The application uses Sanity.io as a headless CMS for MDX content storage:

- **Database**: Sanity datasets store MDX content and metadata
  - `work` document type - Work/project content
  - `writing` document type - Blog/article content
- **Content Processing**: Located in `lib/content-utils.js` using Sanity Client and GROQ queries
  - `getAllWorkContent()` / `getAllWritingContent()` - Gets all content with frontmatter from collections
  - `getWorkContent(slug)` / `getWritingContent(slug)` - Gets specific content by slug
  - `getWorkSlugs()` / `getWritingSlugs()` - Gets slugs for static generation
- **Sanity Client**: `lib/sanity.js` - Configured Sanity client instances (server, client, public)
- **Sanity Studio**: Embedded at `/studio` route for content management
- **MDX Rendering**: Uses `MDXRemote` from `next-mdx-remote-client/rsc` for server-side rendering
- **Custom Components**: `lib/mdx-components.js` defines custom React components for MDX rendering with Tailwind styling

### Route Structure

- `/` - Homepage (`app/page.js`)
- `/work` - Work portfolio listing (`app/work/page.js`)
- `/work/[slug]` - Individual work items (`app/work/[slug]/page.js`)
- `/writing` - Blog/article listing (`app/writing/page.js`)
- `/writing/[slug]` - Individual articles (`app/writing/[slug]/page.js`)
- `/studio` - Sanity Studio for content management (`app/studio/[[...tool]]/page.js`)

Both listing pages use `getAllWorkContent()` / `getAllWritingContent()` to display content cards with frontmatter data from Sanity. Dynamic pages use `getWorkContent()` / `getWritingContent()` to get raw MDX content and `MDXRemote` component for rendering, with `generateStaticParams()` for static generation.

### UI Framework

- **Styling**: Tailwind CSS v4 with custom base configuration
- **Components**: Radix UI primitives with shadcn/ui components in New York style
- **Theme**: Dark/light mode support via `next-themes` with system preference detection
- **Icons**: Lucide React for consistent iconography
- **Fonts**: Geist (sans) and Geist Mono fonts from Next.js Google Fonts

### Component Architecture

- **Layout**: `app/layout.js` provides root layout with theme provider and navigation
- **Navigation**: `components/navigation.js` - Responsive nav with mobile menu using Radix NavigationMenu
- **Theme Toggle**: `components/toggle.js` - Dark/light mode switcher
- **Theme Provider**: `components/theme-provider.js` - Wraps next-themes provider

## Key Configuration

- **shadcn/ui**: Configured in `components.json` with aliases for easy imports
- **Import Aliases**:
  - `@/components` → `components/`
  - `@/lib` → `lib/`
  - `@/hooks` → `hooks/`
- **Content Schema**: Sanity schemas support fields (title, description, date, tags, author, readingTime, content, slug, featured, status)
- **Environment**: Requires `.env.local` file with Sanity environment variables
- **Sanity Configuration**: Uses Sanity project with plain text fields for MDX content storage

## Environment Setup

Create a `.env.local` file in the project root:

```env
NEXT_PUBLIC_SANITY_PROJECT_ID=your-project-id-here
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2025-01-01
SANITY_API_TOKEN=your-sanity-token-here
```

### Getting Your Sanity Credentials

1. Visit https://www.sanity.io/manage
2. Create a new project or select an existing project
3. Copy the Project ID from your project settings
4. Go to API settings and create a new token with "Editor" role
5. Replace the placeholder values in `.env.local`

## Sanity Setup

### Schema Structure

Sanity schemas are located in `sanity/schemas/`:
- `work.js` - Work/project document type schema
- `writing.js` - Blog/article document type schema
- `index.js` - Schema exports

Both `work` and `writing` document types include these fields:
- `slug` (slug type, required, auto-generated from title)
- `title` (string, required)
- `description` (text)
- `date` (date)
- `author` (string)
- `tags` (array of strings)
- `readingTime` (string)
- `content` (text type, 20 rows - stores MDX/Markdown content as plain text)
- `featured` (boolean, default: false)
- `status` (string, options: "published", "draft", default: "published")

### Sanity Studio

The Sanity Studio is embedded in the Next.js application:
- **Location**: `/studio` route
- **Configuration**: `sanity/sanity.config.js`
- **Plugins**: Structure Tool (for content management UI)
- **Content Format**: MDX content stored as plain text in the `content` field
- **Access**: Navigate to http://localhost:3000/studio to manage content
- **Note**: Vision Tool removed for Next.js 16 compatibility

### Client Configuration

Sanity client configuration is located in `sanity/lib/client.js` with three instances:
- `client` - Default client for general use (non-CDN)
- `serverClient` - Server-side client with authentication token (non-CDN)
- `publicClient` - CDN-enabled client for public reads (faster cached responses)

These are re-exported from `lib/sanity.js` for easy importing throughout the application.

## Content Workflow

### Data Fetching Strategy
- **Homepage (`app/page.js`)**: Client-side rendering - fetches content dynamically using `useEffect`
- **Dynamic pages**: May use server-side or static generation depending on route configuration
- Content is fetched directly from Sanity using GROQ queries
- Changes to Sanity content appear immediately without requiring redeployment (when using CDN with revalidation)

### Development
- Content is fetched dynamically from Sanity during development
- Changes to Sanity content appear in local dev server
- Both work and writing document types are fully functional
- Use Sanity Studio at `/studio` to create and edit content

### GROQ Query Patterns

The application uses GROQ (Graph-Relational Object Queries) for data fetching:

**List all documents:**
```groq
*[_type == "work"] | order(_createdAt desc) {
  _id,
  "slug": slug.current,
  title,
  description,
  // ... other fields
}
```

**Get by slug:**
```groq
*[_type == "work" && slug.current == $slug][0] {
  // ... all fields including content
}
```

**Filter by tag:**
```groq
*[_type == "work" && $tag in tags] | order(_createdAt desc)
```

### URL Handling
- Dynamic routes properly handle URL encoding/decoding for slugs with spaces
- Slugs are automatically decoded using `decodeURIComponent()` before querying Sanity
- This ensures articles with spaces in slugs work correctly (e.g., "work test" → "work%20test" in URL)

## Important Notes

### Next.js 16 + Turbopack Compatibility
- The application uses Next.js 16 with Turbopack enabled by default
- Sanity Studio is compatible with this setup using the current configuration
- `serverExternalPackages` is configured in `next.config.mjs` to handle jsdom/dompurify dependencies
- Vision Tool and markdown plugins were removed for compatibility

### Migration from PocketBase
This project was migrated from PocketBase to Sanity.io while maintaining the same API surface:
- All content utility functions maintain identical signatures
- Page components require no changes
- MDX rendering pipeline remains unchanged
- Data shape is transformed to match previous PocketBase structure for backward compatibility

### Content Creation
To create content in Sanity Studio:
1. Navigate to `/studio`
2. Select "Work" or "Writing" from sidebar
3. Click "Create" button
4. Fill in required fields (title, slug)
5. Write MDX content in the `content` text field
6. Set featured status and publish status as needed
7. Click "Publish" to make content available
