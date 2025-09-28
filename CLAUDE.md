# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

- `npm run dev` - Start development server with Turbopack
- `npm run build` - Build production application with Turbopack
- `npm start` - Start production server

## Project Architecture

This is a Next.js 15 application using the App Router with a content-driven architecture for blogging/portfolio functionality.

### Content Management System

The application uses PocketBase as a headless CMS for MDX content storage:

- **Database**: PocketBase collections store MDX content and metadata
  - `work` collection - Work/project content
  - `writing` collection - Blog/article content
- **Content Processing**: Located in `lib/content-utils.js` using PocketBase SDK
  - `getAllWorkContent()` / `getAllWritingContent()` - Gets all content with frontmatter from collections
  - `getWorkContent(slug)` / `getWritingContent(slug)` - Gets specific content by slug
  - `getWorkSlugs()` / `getWritingSlugs()` - Gets slugs for static generation
- **PocketBase Client**: `lib/pocketbase.js` - Configured PocketBase client instance
- **MDX Rendering**: Uses `MDXRemote` from `next-mdx-remote-client/rsc` for server-side rendering
- **Custom Components**: `lib/mdx-components.js` defines custom React components for MDX rendering with Tailwind styling

### Route Structure

- `/` - Homepage (`app/page.js`)
- `/work` - Work portfolio listing (`app/work/page.js`)
- `/work/[slug]` - Individual work items (`app/work/[slug]/page.js`)
- `/writing` - Blog/article listing (`app/writing/page.js`)
- `/writing/[slug]` - Individual articles (`app/writing/[slug]/page.js`)

Both listing pages use `getAllWorkContent()` / `getAllWritingContent()` to display content cards with frontmatter data from PocketBase. Dynamic pages use `getWorkContent()` / `getWritingContent()` to get raw MDX content and `MDXRemote` component for rendering, with `generateStaticParams()` for static generation.

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
- **Content Schema**: PocketBase collections support fields (title, description, date, tags, author, readingTime, content, slug, featured, status)
- **Environment**: Requires `NEXT_PUBLIC_POCKETBASE_URL` environment variable for PocketBase connection
- **PocketBase Configuration**: Currently using `https://pb.endersmoon.in/` with API access enabled for content retrieval

## Content Workflow

### Development
- Content is fetched dynamically from PocketBase during development
- Changes to PocketBase content appear immediately in local dev server
- Both work and writing collections are fully functional

### Production Deployment
- Site uses static site generation (SSG) for optimal performance
- Content is fetched from PocketBase at build time and pre-rendered as static pages
- After adding new content to PocketBase, redeploy the site to Vercel to regenerate static pages with latest content
- This approach provides fast static performance while maintaining content management flexibility

### URL Handling
- Dynamic routes properly handle URL encoding/decoding for slugs with spaces
- Slugs are automatically decoded using `decodeURIComponent()` before querying PocketBase
- This ensures articles with spaces in slugs work correctly (e.g., "work test" → "work%20test" in URL)