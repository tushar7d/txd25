# Portfolio CMS Studio

Standalone Sanity Studio for managing portfolio content (work and writing).

## Setup

1. Copy `.env` and add your Sanity project credentials:
   ```bash
   SANITY_STUDIO_PROJECT_ID=your-project-id-here
   SANITY_STUDIO_DATASET=production
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the Studio:
   ```bash
   npm run dev
   ```

   Studio will be available at `http://localhost:3333`

## How It Works

- **Schemas**: Symlinked from `../sanity/schemas` to maintain consistency with the Next.js app
- **Content Types**:
  - `work` - Portfolio projects
  - `writing` - Blog articles/writings
- **Authentication**: Uses Sanity's built-in OAuth (Google/GitHub)

## Running Alongside Next.js App

Terminal 1 - Next.js app (from project root):
```bash
npm run dev
# Runs on http://localhost:3000
```

Terminal 2 - Studio:
```bash
cd studio
npm run dev
# Runs on http://localhost:3333
```

## Production Build

```bash
npm run build
```

## Documentation

For schema structure and content guidelines, see the main project's CLAUDE.md file.
