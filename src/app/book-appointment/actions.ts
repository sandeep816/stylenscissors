'use server'

import { createClient } from 'next-sanity'
import { apiVersion, dataset, projectId } from '@/sanity/env'
import { z } from 'zod'

const writeClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
})


const appointmentSchema = z.object({
  service: z.string().min(1, 'Please select a service'),
  teamMember: z.string().optional(),
  date: z.string().min(1, 'Please select a date'),
  time: z.string().min(1, 'Please select a time'),
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email'),
  phone: z.string().min(10, 'Please enter a valid phone number'),
  notes: z.string().optional(),
})

export type AppointmentState = {
  success?: boolean
  message?: string
  errors?: {
    [K in keyof z.infer<typeof appointmentSchema>]?: string[]
  }
}

export async function createAppointment(
  prevState: AppointmentState,
  formData: FormData
): Promise<AppointmentState> {
  const validatedFields = appointmentSchema.safeParse({
    service: formData.get('service'),
    teamMember: formData.get('teamMember') || undefined,
    date: formData.get('date'),
    time: formData.get('time'),
    name: formData.get('name'),
    email: formData.get('email'),
    phone: formData.get('phone'),
    notes: formData.get('notes') || undefined,
  })

  if (!validatedFields.success) {
    return {
      success: false,
      message: 'Please fix the errors below.',
      errors: validatedFields.error.flatten().fieldErrors,
    }
  }

  const { data } = validatedFields

  // Combine date and time to ISO string if needed, or keep separate
  // For Sanity 'datetime' field, we need ISO string. 
  // But our schema likely uses string/date type? Let's check schema.
  // Assuming 'appointmentDate' is a string or datetime in schema.
  // We'll construct a full date string for now.
  const appointmentDate = new Date(`${data.date}T${data.time}`).toISOString()

  try {
    await writeClient.create({
      _type: 'appointment',
      customerName: data.name,
      customerEmail: data.email,
      customerPhone: data.phone,
      service: {
        _type: 'reference',
        _ref: data.service,
      },
      // Only add team member reference if selected
      ...(data.teamMember && {
        teamMember: {
          _type: 'reference',
          _ref: data.teamMember,
        },
      }),
      appointmentDate: appointmentDate,
      status: 'pending',
      notes: data.notes,
    })

    return {
      success: true,
      message: 'Appointment request submitted successfully! We will contact you shortly to confirm.',
    }
  } catch (error) {
    console.error('Sanity Create Error:', error)
    return {
      success: false,
      message: 'Failed to create appointment. Please try again later or contact us directly.',
    }
  }
}
