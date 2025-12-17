import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'work',
  title: 'Work',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3
    }),
    defineField({
      name: 'date',
      title: 'Date',
      type: 'date'
    }),
    defineField({
      name: 'author',
      title: 'Author',
      type: 'string'
    }),
    defineField({
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        layout: 'tags'
      }
    }),
    defineField({
      name: 'readingTime',
      title: 'Reading Time',
      type: 'string',
      placeholder: 'e.g., 5 min read'
    }),
    defineField({
      name: 'featured',
      title: 'Featured',
      type: 'boolean',
      initialValue: false
    }),
    defineField({
      name: 'status',
      title: 'Status',
      type: 'string',
      options: {
        list: [
          { title: 'Published', value: 'published' },
          { title: 'Draft', value: 'draft' }
        ]
      },
      initialValue: 'published'
    }),
    defineField({
      name: 'content',
      title: 'Content (MDX)',
      type: 'code',
      description: 'Write your content in Markdown/MDX format with syntax highlighting',
      options: {
        language: 'markdown',
        languageAlternatives: [
          { title: 'Markdown', value: 'markdown' },
          { title: 'MDX', value: 'mdx' },
          { title: 'Plain Text', value: 'text' }
        ],
        withFilename: false
      }
    })
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'description',
      featured: 'featured'
    },
    prepare({ title, subtitle, featured }) {
      return {
        title,
        subtitle: subtitle || '',
        media: featured ? '⭐' : '📄'
      }
    }
  }
})
