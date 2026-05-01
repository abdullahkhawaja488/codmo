import { NextRequest } from 'next/server'
import dbConnect from '@/lib/db'
import Weapon from '@/models/Weapon'
import { requireAdmin } from '@/lib/auth'
import { apiResponse, apiError, handleApiError } from '@/lib/utils'
import { z } from 'zod'

const weaponSchema = z.object({
  name: z.string().min(1).max(60),
  subtitle: z.string().min(1).max(100),
  category: z.enum(['assault', 'sniper', 'smg', 'shotgun', 'lmg', 'marksman', 'pistol', 'launcher']),
  tier: z.enum(['Standard', 'Epic', 'Legendary', 'Mythic']),
  stats: z.object({
    damage: z.number().min(0).max(100),
    range: z.number().min(0).max(100),
    accuracy: z.number().min(0).max(100),
    fireRate: z.number().min(0).max(100),
    mobility: z.number().min(0).max(100),
    control: z.number().min(0).max(100),
  }),
  description: z.string().min(10),
  lore: z.string().optional(),
  image: z.string().optional(),
  modelColor: z.string().optional(),
  accentColor: z.string().optional(),
  unlockLevel: z.number().min(1).max(150).optional(),
  tags: z.array(z.string()).optional(),
})

export async function GET(req: NextRequest) {
  try {
    requireAdmin(req)
    await dbConnect()
    const weapons = await Weapon.find({}).sort({ createdAt: -1 }).lean()
    return apiResponse(weapons)
  } catch (error) {
    return handleApiError(error)
  }
}

export async function POST(req: NextRequest) {
  try {
    requireAdmin(req)
    await dbConnect()
    const body = await req.json()

    const parsed = weaponSchema.safeParse(body)
    if (!parsed.success) return apiError(parsed.error.errors[0].message, 422)

    const weapon = await Weapon.create(parsed.data)
    return apiResponse(weapon, 201)
  } catch (error) {
    return handleApiError(error)
  }
}
