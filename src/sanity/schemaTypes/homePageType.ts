import { DocumentIcon } from '@sanity/icons'
import { defineArrayMember, defineField, defineType } from 'sanity'

export const homePageType = defineType({
  name: 'homePage',
  title: 'Home Page',
  type: 'document',
  icon: DocumentIcon,
  fields: [
    defineField({
      name: 'heroSection',
      title: 'Hero Section',
      type: 'object',
      fields: [
        defineField({
          name: 'title',
          title: 'Hero Title',
          type: 'string',
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: 'subtitle',
          title: 'Hero Subtitle',
          type: 'text',
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: 'image',
          title: 'Hero Image',
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
      ],
    }),
    defineField({
      name: 'aboutPreview',
      title: 'About Preview Section',
      type: 'object',
      fields: [
        defineField({
          name: 'title',
          title: 'Section Title',
          type: 'string',
          initialValue: 'About Style & Scissors',
        }),
        defineField({
          name: 'description',
          title: 'Description',
          type: 'text',
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: 'images',
          title: 'Images',
          type: 'array',
          description: 'Add exactly 4 images for the grid layout',
          of: [
            defineArrayMember({
              type: 'image',
              options: { hotspot: true },
              fields: [
                defineField({
                  name: 'alt',
                  type: 'string',
                  title: 'Alternative Text',
                }),
              ],
            }),
          ],
          validation: (Rule) => Rule.max(4),
        }),
        defineField({
          name: 'badge',
          title: 'Floating Badge',
          type: 'object',
          fields: [
            defineField({
              name: 'value',
              title: 'Value',
              type: 'string',
              initialValue: '4.9',
            }),
            defineField({
              name: 'label',
              title: 'Label',
              type: 'string',
              initialValue: 'Client Rating',
            }),
          ],
        }),
      ],
    }),
    defineField({
      name: 'whyChooseSection',
      title: 'Why Choose Section',
      type: 'object',
      fields: [
        defineField({
          name: 'label',
          title: 'Section Label',
          type: 'string',
          initialValue: 'WHY US',
        }),
        defineField({
          name: 'title',
          title: 'Section Title',
          type: 'string',
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: 'subtitle',
          title: 'Subtitle',
          type: 'text',
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: 'statistics',
          title: 'Statistics',
          type: 'array',
          of: [
            defineArrayMember({
              type: 'object',
              fields: [
                defineField({
                  name: 'number',
                  title: 'Number/Value',
                  type: 'string',
                  description: 'e.g., "2500+", "12+", "15", "4.9"',
                  validation: (Rule) => Rule.required(),
                }),
                defineField({
                  name: 'label',
                  title: 'Label',
                  type: 'string',
                  description: 'e.g., "Happy Clients", "Years Experience"',
                  validation: (Rule) => Rule.required(),
                }),
                defineField({
                  name: 'icon',
                  title: 'Icon Type',
                  type: 'string',
                  options: {
                    list: [
                      { title: 'Users/People', value: 'users' },
                      { title: 'Clock', value: 'clock' },
                      { title: 'Award/Shield', value: 'award' },
                      { title: 'Star', value: 'star' },
                    ],
                  },
                  validation: (Rule) => Rule.required(),
                }),
              ],
            }),
          ],
          validation: (Rule) => Rule.min(4).max(4),
        }),
        defineField({
          name: 'features',
          title: 'Features',
          type: 'array',
          of: [
            defineArrayMember({
              type: 'object',
              fields: [
                defineField({
                  name: 'title',
                  title: 'Feature Title',
                  type: 'string',
                  validation: (Rule) => Rule.required(),
                }),
                defineField({
                  name: 'description',
                  title: 'Description',
                  type: 'text',
                  validation: (Rule) => Rule.required(),
                }),
                defineField({
                  name: 'icon',
                  title: 'Icon Type',
                  type: 'string',
                  options: {
                    list: [
                      { title: 'Shield', value: 'shield' },
                      { title: 'Sparkle/Star', value: 'sparkle' },
                      { title: 'Heart', value: 'heart' },
                      { title: 'Diamond', value: 'diamond' },
                    ],
                  },
                  validation: (Rule) => Rule.required(),
                }),
              ],
            }),
          ],
          validation: (Rule) => Rule.min(4).max(4),
        }),
      ],
    }),
  ],
  preview: {
    select: {
      title: 'heroSection.title',
    },
    prepare({ title }) {
      return {
        title: title || 'Home Page',
        subtitle: 'Home page content configuration',
      }
    },
  },
})
