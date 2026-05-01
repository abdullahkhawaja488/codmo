import { NextRequest } from 'next/server'
import dbConnect from '@/lib/db'
import User from '@/models/User'
import { signToken } from '@/lib/auth'
import { apiResponse, apiError, handleApiError } from '@/lib/utils'
import { z } from 'zod'

const registerSchema = z.object({
  username: z
    .string()
    .min(3, 'Username must be at least 3 characters')
    .max(20, 'Username cannot exceed 20 characters')
    .regex(/^[a-zA-Z0-9_]+$/, 'Only letters, numbers, and underscores allowed'),
  email: z.string().email('Invalid email address'),
  password: z
    .string()
    .min(8, 'Password must be at least 8 characters')
    .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .regex(/[0-9]/, 'Password must contain at least one number'),
})

export async function POST(req: NextRequest) {
  try {
    await dbConnect()
    const body = await req.json()

    const parsed = registerSchema.safeParse(body)
    if (!parsed.success) {
      return apiError(parsed.error.errors[0].message, 422)
    }

    const { username, email, password } = parsed.data

    const existingUser = await User.findOne({ $or: [{ email }, { username }] })
    if (existingUser) {
      if (existingUser.email === email) return apiError('Email already registered', 409)
      return apiError('Username already taken', 409)
    }

    const user = await User.create({ username, email, password })

    const token = signToken({
      userId: user._id.toString(),
      email: user.email,
      role: user.role,
      username: user.username,
    })

    const response = apiResponse({ user, token }, 201)
    response.headers.set(
      'Set-Cookie',
      `auth-token=${token}; HttpOnly; Path=/; Max-Age=${7 * 24 * 60 * 60}; SameSite=Strict${
        process.env.NODE_ENV === 'production' ? '; Secure' : ''
      }`
    )
    return response
  } catch (error) {
    return handleApiError(error)
  }
}
