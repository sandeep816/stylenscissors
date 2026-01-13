import {ImageIcon} from '@sanity/icons'
import {defineField, defineType} from 'sanity'

export const galleryType = defineType({
  name: 'gallery',
  title: 'Gallery Item',
  type: 'document',
  icon: ImageIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      fields: [
        defineField({
          name: 'alt',
          type: 'string',
          title: 'Alternative text',
        }),
      ],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'beforeImage',
      title: 'Before Image (for Before/After)',
      type: 'image',
      options: {
        hotspot: true,
      },
      fields: [
        defineField({
          name: 'alt',
          type: 'string',
          title: 'Alternative text',
        }),
      ],
    }),
    defineField({
      name: 'afterImage',
      title: 'After Image (for Before/After)',
      type: 'image',
      options: {
        hotspot: true,
      },
      fields: [
        defineField({
          name: 'alt',
          type: 'string',
          title: 'Alternative text',
        }),
      ],
    }),
    defineField({
      name: 'isBeforeAfter',
      title: 'Is Before/After',
      type: 'boolean',
      description: 'Check if this is a before/after comparison',
      initialValue: false,
    }),
    defineField({
      name: 'service',
      title: 'Service',
      type: 'reference',
      to: [{type: 'service'}],
      description: 'Which service does this showcase?',
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          {title: 'Haircut', value: 'haircut'},
          {title: 'Hair Color', value: 'color'},
          {title: 'Hair Treatment', value: 'treatment'},
          {title: 'Styling', value: 'styling'},
          {title: 'Bridal', value: 'bridal'},
          {title: 'Men\'s Services', value: 'mens'},
          {title: 'Other', value: 'other'},
        ],
      },
    }),
    defineField({
      name: 'featured',
      title: 'Featured',
      type: 'boolean',
      description: 'Show this in featured gallery section',
      initialValue: false,
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
      description: 'Lower numbers appear first',
      initialValue: 0,
    }),
  ],
  preview: {
    select: {
      title: 'title',
      media: 'image',
      category: 'category',
      isBeforeAfter: 'isBeforeAfter',
    },
    prepare({title, media, category, isBeforeAfter}) {
      const subtitle = [
        category && category,
        isBeforeAfter && 'Before/After',
      ]
        .filter(Boolean)
        .join(' • ')

      return {
        title,
        subtitle: subtitle || 'Gallery Item',
        media,
      }
    },
  },
  orderings: [
    {
      title: 'Display Order',
      name: 'orderAsc',
      by: [{field: 'order', direction: 'asc'}],
    },
    {
      title: 'Title',
      name: 'titleAsc',
      by: [{field: 'title', direction: 'asc'}],
    },
  ],
})
