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
      name: 'icon',
      title: 'Icon',
      type: 'string',
      description: 'Select an icon for this solution (matches keys in featureIconMap).',
      options: {
        list: [
          { title: 'Processor', value: 'processor' },
          { title: 'Memory', value: 'memory' },
          { title: 'Storage', value: 'storage' },
          { title: 'Display', value: 'display' },
          { title: 'Touch', value: 'touch' },
          { title: 'Security', value: 'security' },
          { title: 'Performance', value: 'performance' },
          { title: 'Connectivity', value: 'connectivity' },
          { title: 'Data', value: 'data' },
          { title: 'Remote', value: 'remote' },
          { title: 'Configuration', value: 'configuration' },
          { title: 'Time', value: 'time' },
          { title: 'Installation', value: 'installation' },
          // Add more as needed to match featureIconMap
        ],
      },
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
      name: 'products',
      title: 'Related Products',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'product' }] }],
      description: 'Products used in this solution.',
    },
    {
      name: 'qa',
      title: 'Questions & Answers',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'title', type: 'string', title: 'Title' },
            { name: 'question', type: 'string', title: 'Question' },
            { name: 'answer', type: 'text', title: 'Answer' },
          ],
        },
      ],
      description: 'Q&A pairs for the split Q&A section.',
    },
  ],
} 