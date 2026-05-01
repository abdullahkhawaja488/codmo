import { NextRequest } from 'next/server'
import mongoose from 'mongoose'
import dbConnect from '@/lib/db'
import User from '@/models/User'
import '@/models/Weapon'
import { requireAuth } from '@/lib/auth'
import { apiResponse, apiError, handleApiError } from '@/lib/utils'
import { z } from 'zod'

const loadoutSchema = z.object({
  name: z.string().min(1, 'Loadout name required').max(30),
  weapons: z.array(z.string()).max(5, 'Maximum 5 weapons per loadout'),
})

export async function GET(req: NextRequest) {
  try {
    const user = requireAuth(req)
    await dbConnect()
    const dbUser = await User.findById(user.userId).populate('loadouts.weapons').lean()
    if (!dbUser) return apiError('User not found', 404)
    return apiResponse(dbUser.loadouts)
  } catch (error) {
    return handleApiError(error)
  }
}

export async function POST(req: NextRequest) {
  try {
    const authUser = requireAuth(req)
    await dbConnect()
    const body = await req.json()

    const parsed = loadoutSchema.safeParse(body)
    if (!parsed.success) return apiError(parsed.error.errors[0].message, 422)

    const user = await User.findById(authUser.userId)
    if (!user) return apiError('User not found', 404)

    const existingIndex = user.loadouts.findIndex(
      (l: { name: string }) => l.name === parsed.data.name
    )

    if (existingIndex >= 0) {
      user.loadouts[existingIndex].weapons = parsed.data.weapons as unknown as mongoose.Types.ObjectId[]
    } else {
      if (user.loadouts.length >= 10) return apiError('Maximum 10 loadouts allowed', 400)
      user.loadouts.push({
        _id: new mongoose.Types.ObjectId(),
        name: parsed.data.name,
        weapons: parsed.data.weapons as unknown as mongoose.Types.ObjectId[],
        createdAt: new Date(),
      })
    }

    await user.save()
    const updated = user.loadouts.find((l: { name: string }) => l.name === parsed.data.name)
    return apiResponse(updated, 200)
  } catch (error) {
    return handleApiError(error)
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const authUser = requireAuth(req)
    await dbConnect()
    const { searchParams } = new URL(req.url)
    const loadoutId = searchParams.get('id')
    if (!loadoutId) return apiError('Loadout ID required', 400)

    const user = await User.findById(authUser.userId)
    if (!user) return apiError('User not found', 404)

    user.loadouts = user.loadouts.filter(
      (l: { _id: { toString: () => string } }) => l._id.toString() !== loadoutId
    ) as typeof user.loadouts
    await user.save()

    return apiResponse({ message: 'Loadout deleted' })
  } catch (error) {
    return handleApiError(error)
  }
}