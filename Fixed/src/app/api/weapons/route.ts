export const revalidate = 60 // cache for 60 seconds
import { NextRequest } from 'next/server'
import dbConnect from '@/lib/db'
import Weapon from '@/models/Weapon'
import { apiResponse, apiError, handleApiError } from '@/lib/utils'

export async function GET(req: NextRequest) {
  try {
    await dbConnect()
    const { searchParams } = new URL(req.url)
    const category = searchParams.get('category')
    const tier = searchParams.get('tier')
    const search = searchParams.get('search')
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '12')

    const query: Record<string, unknown> = { isActive: true }
    if (category && category !== 'all') query.category = category
    if (tier && tier !== 'all') query.tier = tier
    if (search) query.$text = { $search: search }

    const total = await Weapon.countDocuments(query)
    const weapons = await Weapon.find(query)
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit)
      .lean()

    return apiResponse({
      weapons,
      pagination: {
        total,
        page,
        limit,
        pages: Math.ceil(total / limit),
      },
    })
  } catch (error) {
    return handleApiError(error)
  }
}
