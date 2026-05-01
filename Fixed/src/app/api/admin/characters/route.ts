import { NextRequest } from 'next/server'
import dbConnect from '@/lib/db'

import Character from '@/models/Character'
import { requireAdmin } from '@/lib/auth'
import { apiResponse, apiError, handleApiError } from '@/lib/utils'
import { z } from 'zod'

const characterSchema = z.object({
  name: z.string().min(1).max(60),
  codename: z.string().min(1).max(60),
  role: z.string().min(1),
  faction: z.enum(['Ghost', 'Makarov', 'Operator', 'Shadow', 'Phantom']),
  tier: z.enum(['Standard', 'Epic', 'Legendary', 'Mythic']),
  description: z.string().min(10),
  lore: z.string().optional(),
  abilities: z.array(z.object({
    name: z.string(),
    description: z.string(),
    icon: z.string().optional(),
  })).optional(),
  stats: z.object({
    health: z.number().min(0).max(100),
    speed: z.number().min(0).max(100),
    stealth: z.number().min(0).max(100),
    strength: z.number().min(0).max(100),
  }).optional(),
  image: z.string().optional(),
  modelColor: z.string().optional(),
  accentColor: z.string().optional(),
  unlockLevel: z.number().optional(),
})

export async function GET(req: NextRequest) {
  try {
    requireAdmin(req)
    await dbConnect()
    const characters = await Character.find({}).sort({ createdAt: -1 }).lean()
    return apiResponse(characters)
  } catch (error) {
    return handleApiError(error)
  }
}

export async function POST(req: NextRequest) {
  try {
    requireAdmin(req)
    await dbConnect()
    const body = await req.json()
    const parsed = characterSchema.safeParse(body)
    if (!parsed.success) return apiError(parsed.error.errors[0].message, 422)
    const character = await Character.create(parsed.data)
    return apiResponse(character, 201)
  } catch (error) {
    return handleApiError(error)
  }
}
