# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

- `npm run dev` - Start development server with Turbopack
- `npm run build` - Build production application with Turbopack
- `npm start` - Start production server

## Project Architecture

This is a Next.js 15 application using the App Router with a content-driven architecture for blogging/portfolio functionality.

### Content Management System

The application uses a file-based MDX content system:

- **Content Directory**: `content/` - Contains MDX files organized by content type
  - `content/work/` - Work/project content
  - `content/writing/` - Blog/article content
- **MDX Processing**: Located in `lib/mdx-utils.js`
  - `getAllMdxContent(directory)` - Gets all MDX files with frontmatter from a directory
  - `getMdxContent(slug, directory)` - Gets specific MDX content and serializes it
  - `getMdxFiles(directory)` - Gets file paths for all MDX files
- **Custom Components**: `lib/mdx-components.js` defines custom React components for MDX rendering with Tailwind styling

### Route Structure

- `/` - Homepage (`app/page.js`)
- `/work` - Work portfolio listing (`app/work/page.js`)
- `/work/[slug]` - Individual work items (`app/work/[slug]/page.js`)
- `/writing` - Blog/article listing (`app/writing/page.js`)
- `/writing/[slug]` - Individual articles (`app/writing/[slug]/page.js`)

Both listing pages use `getAllMdxContent()` to display content cards with frontmatter data. Dynamic pages use `getMdxContent()` with `generateStaticParams()` for static generation.

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
- **Content**: MDX files support standard frontmatter (title, description, date, tags, author, readingTime)