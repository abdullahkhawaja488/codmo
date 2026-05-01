import { NextRequest } from 'next/server'
import dbConnect from '@/lib/db'
import User from '@/models/User'
import Weapon from '@/models/Weapon'
import Character from '@/models/Character'
import { requireAdmin } from '@/lib/auth'
import { apiResponse, apiError, handleApiError } from '@/lib/utils'

export async function GET(req: NextRequest) {
  try {
    requireAdmin(req)
    await dbConnect()

    const [totalUsers, totalWeapons, totalCharacters, recentUsers] = await Promise.all([
      User.countDocuments(),
      Weapon.countDocuments({ isActive: true }),
      Character.countDocuments({ isActive: true }),
      User.find().sort({ createdAt: -1 }).limit(5).select('username email role createdAt'),
    ])

    return apiResponse({
      stats: {
        totalUsers,
        totalWeapons,
        totalCharacters,
        activeAdmins: await User.countDocuments({ role: 'admin' }),
      },
      recentUsers,
    })
  } catch (error) {
    const msg = error instanceof Error ? error.message : 'Error'
    if (msg === 'UNAUTHORIZED') return apiError('Unauthorized', 401)
    if (msg === 'FORBIDDEN') return apiError('Forbidden', 403)
    return handleApiError(error)
  }
}
