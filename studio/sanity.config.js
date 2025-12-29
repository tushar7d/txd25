import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { markdownSchema } from 'sanity-plugin-markdown'
import { schemaTypes } from './schemas'

export default defineConfig({
  name: 'default',
  title: 'Portfolio CMS',

  projectId: process.env.SANITY_STUDIO_PROJECT_ID || 'your-project-id',
  dataset: process.env.SANITY_STUDIO_DATASET || 'production',

  plugins: [
    structureTool(),
    markdownSchema()
  ],

  schema: {
    types: schemaTypes,
  },
})
