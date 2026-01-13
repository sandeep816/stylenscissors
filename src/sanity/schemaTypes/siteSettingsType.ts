import {CogIcon} from '@sanity/icons'
import {defineArrayMember, defineField, defineType} from 'sanity'

export const siteSettingsType = defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  icon: CogIcon,
  fields: [
    defineField({
      name: 'salonName',
      title: 'Salon Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'logo',
      title: 'Logo',
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
      name: 'description',
      title: 'Site Description',
      type: 'text',
      description: 'Used for SEO meta description',
    }),
    defineField({
      name: 'address',
      title: 'Address',
      type: 'object',
      fields: [
        defineField({
          name: 'street',
          type: 'string',
          title: 'Street Address',
        }),
        defineField({
          name: 'city',
          type: 'string',
          title: 'City',
        }),
        defineField({
          name: 'state',
          type: 'string',
          title: 'State/Province',
        }),
        defineField({
          name: 'zipCode',
          type: 'string',
          title: 'ZIP/Postal Code',
        }),
        defineField({
          name: 'country',
          type: 'string',
          title: 'Country',
        }),
      ],
    }),
    defineField({
      name: 'phone',
      title: 'Phone Number',
      type: 'string',
    }),
    defineField({
      name: 'email',
      title: 'Email',
      type: 'string',
      validation: (Rule) => Rule.email(),
    }),
    defineField({
      name: 'businessHours',
      title: 'Business Hours',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({
              name: 'day',
              type: 'string',
              title: 'Day',
              options: {
                list: [
                  {title: 'Monday', value: 'monday'},
                  {title: 'Tuesday', value: 'tuesday'},
                  {title: 'Wednesday', value: 'wednesday'},
                  {title: 'Thursday', value: 'thursday'},
                  {title: 'Friday', value: 'friday'},
                  {title: 'Saturday', value: 'saturday'},
                  {title: 'Sunday', value: 'sunday'},
                ],
              },
            }),
            defineField({
              name: 'open',
              type: 'string',
              title: 'Open Time',
              description: 'e.g., "9:00 AM"',
            }),
            defineField({
              name: 'close',
              type: 'string',
              title: 'Close Time',
              description: 'e.g., "6:00 PM"',
            }),
            defineField({
              name: 'closed',
              type: 'boolean',
              title: 'Closed',
              description: 'Check if closed on this day',
              initialValue: false,
            }),
          ],
        }),
      ],
    }),
    defineField({
      name: 'socialMedia',
      title: 'Social Media Links',
      type: 'object',
      fields: [
        defineField({
          name: 'facebook',
          type: 'url',
          title: 'Facebook',
        }),
        defineField({
          name: 'instagram',
          type: 'url',
          title: 'Instagram',
        }),
        defineField({
          name: 'twitter',
          type: 'url',
          title: 'Twitter/X',
        }),
        defineField({
          name: 'youtube',
          type: 'url',
          title: 'YouTube',
        }),
        defineField({
          name: 'tiktok',
          type: 'url',
          title: 'TikTok',
        }),
      ],
    }),
    defineField({
      name: 'googleMapsEmbed',
      title: 'Google Maps Embed URL',
      type: 'url',
      description: 'Google Maps embed URL for contact page',
    }),
    defineField({
      name: 'heroImage',
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
      description: 'Main hero image for homepage',
    }),
    defineField({
      name: 'heroTitle',
      title: 'Hero Title',
      type: 'string',
      description: 'Main headline on homepage',
    }),
    defineField({
      name: 'heroSubtitle',
      title: 'Hero Subtitle',
      type: 'text',
      description: 'Subtitle text on homepage',
    }),
  ],
  preview: {
    select: {
      title: 'salonName',
    },
    prepare({title}) {
      return {
        title: title || 'Site Settings',
        subtitle: 'Global site configuration',
      }
    },
  },
})
