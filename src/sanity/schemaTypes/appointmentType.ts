import {CalendarIcon} from '@sanity/icons'
import {defineField, defineType} from 'sanity'

export const appointmentType = defineType({
  name: 'appointment',
  title: 'Appointment',
  type: 'document',
  icon: CalendarIcon,
  fields: [
    defineField({
      name: 'customerName',
      title: 'Customer Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'customerEmail',
      title: 'Customer Email',
      type: 'string',
      validation: (Rule) => Rule.required().email(),
    }),
    defineField({
      name: 'customerPhone',
      title: 'Customer Phone',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'service',
      title: 'Service',
      type: 'reference',
      to: [{type: 'service'}],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'teamMember',
      title: 'Team Member',
      type: 'reference',
      to: [{type: 'teamMember'}],
      description: 'Optional: Specific stylist requested',
    }),
    defineField({
      name: 'appointmentDate',
      title: 'Appointment Date & Time',
      type: 'datetime',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'status',
      title: 'Status',
      type: 'string',
      options: {
        list: [
          {title: 'Pending', value: 'pending'},
          {title: 'Confirmed', value: 'confirmed'},
          {title: 'Completed', value: 'completed'},
          {title: 'Cancelled', value: 'cancelled'},
        ],
      },
      initialValue: 'pending',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'notes',
      title: 'Notes',
      type: 'text',
      description: 'Additional notes or special requests from customer',
    }),
    defineField({
      name: 'internalNotes',
      title: 'Internal Notes',
      type: 'text',
      description: 'Private notes for staff only',
    }),
  ],
  preview: {
    select: {
      title: 'customerName',
      subtitle: 'appointmentDate',
      service: 'service.name',
      status: 'status',
      teamMember: 'teamMember.name',
    },
    prepare({title, subtitle, service, status, teamMember}) {
      const date = subtitle
        ? new Date(subtitle).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
            hour: 'numeric',
            minute: '2-digit',
          })
        : 'No date set'

      const statusEmoji: Record<string, string> = {
        pending: '⏳',
        confirmed: '✅',
        completed: '✓',
        cancelled: '❌',
      }
      const emoji = statusEmoji[status || 'pending'] || ''

      const serviceText = service ? ` • ${service}` : ''
      const teamText = teamMember ? ` with ${teamMember}` : ''

      return {
        title,
        subtitle: `${emoji} ${date}${serviceText}${teamText}`,
      }
    },
  },
  orderings: [
    {
      title: 'Date (Upcoming)',
      name: 'dateAsc',
      by: [{field: 'appointmentDate', direction: 'asc'}],
    },
    {
      title: 'Date (Recent)',
      name: 'dateDesc',
      by: [{field: 'appointmentDate', direction: 'desc'}],
    },
    {
      title: 'Status',
      name: 'statusAsc',
      by: [{field: 'status', direction: 'asc'}],
    },
  ],
})
