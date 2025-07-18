export default {
  name: 'solution',
  title: 'Solution',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'summary',
      title: 'Summary',
      type: 'text',
      description: 'Short summary for cards and SEO.',
      rows: 2,
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'heroImage',
      title: 'Hero Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      description: 'Icon or image for the solution card.',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'industries',
      title: 'Industries',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'Industries this solution serves (e.g., Corporate, Education, Healthcare).',
    },
    {
      name: 'body',
      title: 'Detailed Content',
      type: 'blockContent',
      description: 'Detailed description for the solution detail page.',
    },
    {
      name: 'products',
      title: 'Related Products',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'product' }] }],
      description: 'Products used in this solution.',
    },
  ],
} 