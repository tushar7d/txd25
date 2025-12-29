# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

**Next.js App (from project root):**
- `npm run dev` - Start development server with Turbopack on http://localhost:3000
- `npm run build` - Build production application with Turbopack
- `npm start` - Start production server

**Sanity Studio (from `studio/` directory):**
- `npm run dev` - Start Studio development server on http://localhost:3333
- `npm run build` - Build Studio for deployment

**Running Both Locally:**
Open two terminals:
1. Terminal 1: `npm run dev` (Next.js app)
2. Terminal 2: `cd studio && npm run dev` (Sanity Studio)

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
- **Home Components**: Specialized components in `components/home/` for hero section, featured content, and case study cards
- **UI Components**: shadcn/ui components in `components/ui/` (buttons, dropdowns, navigation menus)

## Key Configuration

- **shadcn/ui**: Configured in `components.json` with aliases for easy imports
- **Import Aliases**:
  - `@/components` → `components/`
  - `@/lib` → `lib/`
  - `@/hooks` → `hooks/`
- **Content Schema**: Sanity schemas support fields (title, description, date, tags, author, readingTime, content, slug, featured, status)
- **Environment**: Requires `.env.local` file with Sanity environment variables
- **Sanity Configuration**: Uses Sanity project with plain text fields for MDX content storage
- **Fonts**: Custom fonts loaded from `public/fonts/` (Recoleta serif with multiple weights), plus IBM Plex Sans and Mono
- **Tailwind v4**: Uses CSS variables with oklch color space in `app/globals.css`

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

Sanity Studio runs as a standalone application separate from the Next.js app:
- **Location**: `studio/` directory at project root
- **Access**: Run `npm run dev` in `studio/` directory to start on `http://localhost:3333`
- **Configuration**: `studio/sanity.config.js`
- **Schemas**: Symlinked from `sanity/schemas/` for consistency with Next.js app
- **Plugins**: Structure Tool (for content management UI)
- **Content Format**: MDX content stored as plain text in the `content` field

**Running Locally:**
1. Terminal 1 - Next.js app (from project root): `npm run dev`
2. Terminal 2 - Sanity Studio: `cd studio && npm run dev`

Both apps can run simultaneously without conflicts.

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
1. Start the Studio: `cd studio && npm run dev` (runs on http://localhost:3333)
2. Authenticate with Google or GitHub OAuth
3. Select "Work" or "Writing" from sidebar
4. Click "Create" button
5. Fill in required fields (title, slug)
6. Write MDX content in the `content` text field
7. Set featured status and publish status as needed
8. Click "Publish" to make content available

Changes in Sanity Studio will be reflected in the Next.js app immediately when you refresh the pages.

## Revalidation & Performance

### Incremental Static Regeneration (ISR)
- Homepage and listing pages use ISR with 86400-second (1 day) fallback revalidation
- Pages are pre-generated at build time via `generateStaticParams()` for known routes
- Uses `revalidatePath()` for targeted route revalidation

### Webhook Revalidation
- Sanity webhooks trigger `/api/revalidate` endpoint when content is published
- Requires `SANITY_WEBHOOK_SECRET` environment variable for security
- Webhook signature verified in `app/api/revalidate/route.js`
- Immediately revalidates affected routes without waiting for ISR timeout

### Client Selection Strategy
- **Server Components** (default): Use `client` or `serverClient` from `lib/sanity.js`
- **Client Components**: Use `publicClient` which has CDN enabled for faster cached reads
- `content-utils.js` automatically selects appropriate client based on runtime context

## Directory Structure Overview

```
app/                   # Next.js App Router routes
├── api/              # API routes (webhooks, revalidation)
├── work/             # Work portfolio pages
├── writing/          # Blog/article pages
├── [layout].js       # Root layout with theme and navigation
└── page.js           # Homepage

components/           # React components
├── home/             # Homepage-specific components
├── ui/               # shadcn/ui components
├── navigation.js     # Main navigation component
├── toggle.js         # Theme toggle
└── theme-provider.js # Theme context wrapper

lib/                  # Utility functions and helpers
├── content-utils.js  # GROQ queries for Sanity (getAllWorkContent, getWorkContent, etc.)
├── mdx-components.js # Custom MDX component mappings
├── sanity.js         # Sanity client exports
└── utils.js          # General utilities

sanity/               # Sanity CMS configuration
├── lib/
│   └── client.js     # Three Sanity client instances
└── schemas/
    ├── work.js       # Work document schema
    ├── writing.js    # Writing document schema
    └── index.js      # Schema exports

studio/               # Sanity Studio (separate app)
├── sanity.config.js
└── schemas -> ../sanity/schemas  # Symlinked schemas

public/               # Static assets
├── fonts/            # Recoleta serif fonts (WOFF2)
├── images/           # Image files
└── [icons].svg       # SVG assets
```

## Common Development Tasks

### Adding a New Content Type
1. Create schema in `sanity/schemas/[type].js` following `work.js` pattern
2. Export in `sanity/schemas/index.js`
3. Create fetch utilities in `lib/content-utils.js`:
   - `getAll[Type]Content()` for listings
   - `get[Type]Content(slug)` for single items
   - `get[Type]Slugs()` for static generation
4. Create route files in `app/[type]/` and `app/[type]/[slug]/`
5. Use `generateStaticParams()` for static generation
6. Content appears immediately in Studio and next build

### Modifying MDX Rendering
- Edit custom components in `lib/mdx-components.js`
- Each key maps to an HTML element (e.g., `h1`, `p`, `img`)
- Components receive standard props and can use Tailwind classes
- Changes apply to all MDX content across work and writing pages

### Updating Theme Colors
- Edit CSS variables in `app/globals.css`
- Light mode: `@light { --color-name: oklch(...); }`
- Dark mode: `@dark { --color-name: oklch(...); }`
- Use oklch color space for better perceptual uniformity
- Apply to components via Tailwind `theme.colors` or inline CSS vars

### Debugging Content Fetching
- Check GROQ queries in `lib/content-utils.js` against Sanity documentation
- Use Sanity's query builder at https://www.sanity.io/manage
- Verify `.env.local` has correct credentials
- Use `serverClient` (with token) for write operations
- Use `publicClient` (CDN) for public read operations

## Technical Considerations

### URL Encoding in Dynamic Routes
- Slugs with spaces are URL-encoded: `"my article"` → `/writing/my%20article`
- Always decode with `decodeURIComponent(slug)` before Sanity queries
- See `app/writing/[slug]/page.js` for implementation pattern

### MDX Content Storage
- Content stored as plain text in Sanity `content` field (20-row text field)
- Supports full Markdown and MDX syntax
- No special processing needed; MDXRemote handles parsing
- Custom components in `lib/mdx-components.js` provide styling consistency

### Turbopack vs. Webpack
- Development uses Turbopack by default (`npm run dev --turbopack`)
- Production builds use standard Next.js build (Turbopack support for builds varies by Next.js version)
- If build issues occur, try standard build: `npm run build` (no Turbopack flag)
- `serverExternalPackages` in `next.config.mjs` pre-bundles jsdom/dompurify for compatibility

### Static Generation Strategy
- `generateStaticParams()` runs at build time and pre-generates all routes
- For content-heavy sites, consider pagination or on-demand generation
- ISR fallback (86400s) ensures stale content never blocks requests indefinitely
- Webhook revalidation provides immediate updates without full rebuild

## Environment Variables

| Variable | Purpose | Visibility |
|----------|---------|------------|
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | Sanity project identifier | Public (browser) |
| `NEXT_PUBLIC_SANITY_DATASET` | Sanity dataset name | Public (browser) |
| `NEXT_PUBLIC_SANITY_API_VERSION` | Sanity API version | Public (browser) |
| `SANITY_API_TOKEN` | Authentication for server-side writes | Server only |
| `SANITY_WEBHOOK_SECRET` | Validates webhook signature from Sanity | Server only |

All `NEXT_PUBLIC_*` variables are compiled into client bundles. Never put secrets in these.

## Known Issues & Quirks

### Emoji in Schema Preview
- Don't use emoji strings directly in `preview.media` property (causes React createElement errors)
- Remove `media` property or use proper Sanity icon references instead

### Content Format Limitations
- Sanity stores MDX as plain text; no rich editor or visual editing
- Authors must write valid Markdown/MDX syntax
- Consider adding a guide or template in Studio for content authors

### Build Time Considerations
- `generateStaticParams()` for dynamic routes runs at build time
- Very large content libraries may increase build duration
- Monitor Next.js build logs for performance metrics
