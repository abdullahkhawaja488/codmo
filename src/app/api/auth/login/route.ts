import { NextRequest } from 'next/server'
import dbConnect from '@/lib/db'
import User from '@/models/User'
import { signToken } from '@/lib/auth'
import { apiResponse, apiError, handleApiError } from '@/lib/utils'
import { z } from 'zod'

const loginSchema = z.object({
  email: z.string().email('Invalid email'),
  password: z.string().min(1, 'Password is required'),
})

export async function POST(req: NextRequest) {
  try {
    await dbConnect()
    const body = await req.json()

    const parsed = loginSchema.safeParse(body)
    if (!parsed.success) return apiError(parsed.error.errors[0].message, 422)

    const { email, password } = parsed.data

    const user = await User.findOne({ email }).select('+password')
    if (!user) return apiError('Invalid email or password', 401)

    const isMatch = await user.comparePassword(password)
    if (!isMatch) return apiError('Invalid email or password', 401)

    const token = signToken({
      userId: user._id.toString(),
      email: user.email,
      role: user.role,
      username: user.username,
    })

    // Remove password from response
    const userObj = user.toJSON()

    const response = apiResponse({ user: userObj, token })
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
