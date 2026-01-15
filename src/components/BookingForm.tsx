'use client'

import { useActionState } from 'react'
import { createAppointment } from '@/app/book-appointment/actions'
import type { Service, TeamMember } from '@/types/sanity'
import { Loader2 } from 'lucide-react'

// Define initial state matching the server action's return type
const initialState = {
    success: false,
    message: '',
    errors: {},
}

type BookingFormProps = {
    services: Service[]
    teamMembers: TeamMember[]
}

export default function BookingForm({ services, teamMembers }: BookingFormProps) {
    const [state, formAction, isPending] = useActionState(createAppointment, initialState)

    if (state.success) {
        return (
            <div className="bg-green-50 border border-green-200 rounded-lg p-8 text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                </div>
                <h3 className="text-2xl font-bold text-green-800 mb-2">Booking Request Received!</h3>
                <p className="text-green-700 mb-6">{state.message}</p>
                <button
                    onClick={() => window.location.reload()}
                    className="bg-green-600 text-white px-6 py-2 rounded-full font-semibold hover:bg-green-700 transition-colors"
                >
                    Book Another Appointment
                </button>
            </div>
        )
    }

    return (
        <form action={formAction} className="space-y-6">
            {state.message && !state.success && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
                    {state.message}
                </div>
            )}

            {/* Service Selection */}
            <div>
                <label htmlFor="service" className="block text-sm font-medium text-gray-700 mb-2">
                    Select Service *
                </label>
                <select
                    id="service"
                    name="service"
                    disabled={isPending}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent ${state.errors?.service ? 'border-red-500' : 'border-gray-300'
                        }`}
                    defaultValue=""
                >
                    <option value="" disabled>Choose a service...</option>
                    {services.map((service) => (
                        <option key={service._id} value={service._id}>
                            {service.name} - {service.price} ({service.duration} min)
                        </option>
                    ))}
                </select>
                {state.errors?.service && (
                    <p className="mt-1 text-sm text-red-600">{state.errors.service[0]}</p>
                )}
            </div>

            {/* Team Member Selection */}
            {teamMembers && teamMembers.length > 0 && (
                <div>
                    <label htmlFor="teamMember" className="block text-sm font-medium text-gray-700 mb-2">
                        Preferred Stylist (Optional)
                    </label>
                    <select
                        id="teamMember"
                        name="teamMember"
                        disabled={isPending}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                        defaultValue=""
                    >
                        <option value="">No preference</option>
                        {teamMembers.map((member) => (
                            <option key={member._id} value={member._id}>
                                {member.name} - {member.role}
                            </option>
                        ))}
                    </select>
                </div>
            )}

            {/* Date & Time Selection */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-2">
                        Preferred Date *
                    </label>
                    <input
                        type="date"
                        id="date"
                        name="date"
                        disabled={isPending}
                        min={new Date().toISOString().split('T')[0]}
                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent ${state.errors?.date ? 'border-red-500' : 'border-gray-300'
                            }`}
                    />
                    {state.errors?.date && (
                        <p className="mt-1 text-sm text-red-600">{state.errors.date[0]}</p>
                    )}
                </div>

                <div>
                    <label htmlFor="time" className="block text-sm font-medium text-gray-700 mb-2">
                        Preferred Time *
                    </label>
                    <input
                        type="time"
                        id="time"
                        name="time"
                        disabled={isPending}
                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent ${state.errors?.time ? 'border-red-500' : 'border-gray-300'
                            }`}
                    />
                    {state.errors?.time && (
                        <p className="mt-1 text-sm text-red-600">{state.errors.time[0]}</p>
                    )}
                </div>
            </div>

            {/* Customer Information */}
            <div className="border-t border-gray-200 pt-6 mt-6">
                <h3 className="text-lg font-semibold mb-4 text-gray-900">Your Information</h3>
                <div className="space-y-4">
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                            Full Name *
                        </label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            disabled={isPending}
                            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent ${state.errors?.name ? 'border-red-500' : 'border-gray-300'
                                }`}
                        />
                        {state.errors?.name && (
                            <p className="mt-1 text-sm text-red-600">{state.errors.name[0]}</p>
                        )}
                    </div>
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                            Email *
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            disabled={isPending}
                            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent ${state.errors?.email ? 'border-red-500' : 'border-gray-300'
                                }`}
                        />
                        {state.errors?.email && (
                            <p className="mt-1 text-sm text-red-600">{state.errors.email[0]}</p>
                        )}
                    </div>
                    <div>
                        <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                            Phone Number *
                        </label>
                        <input
                            type="tel"
                            id="phone"
                            name="phone"
                            disabled={isPending}
                            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent ${state.errors?.phone ? 'border-red-500' : 'border-gray-300'
                                }`}
                        />
                        {state.errors?.phone && (
                            <p className="mt-1 text-sm text-red-600">{state.errors.phone[0]}</p>
                        )}
                    </div>
                    <div>
                        <label htmlFor="notes" className="block text-sm font-medium text-gray-700 mb-2">
                            Special Requests or Notes
                        </label>
                        <textarea
                            id="notes"
                            name="notes"
                            rows={4}
                            disabled={isPending}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                            placeholder="Any special requests or notes for your appointment..."
                        />
                    </div>
                </div>
            </div>

            {/* Submit Button */}
            <button
                type="submit"
                disabled={isPending}
                className="w-full bg-pink-600 text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-pink-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
            >
                {isPending ? (
                    <>
                        <Loader2 className="animate-spin mr-2 h-5 w-5" />
                        Booking...
                    </>
                ) : (
                    'Book Appointment'
                )}
            </button>

            <p className="text-sm text-gray-500 text-center">
                We&apos;ll confirm your appointment via email or phone call.
            </p>
        </form>
    )
}
