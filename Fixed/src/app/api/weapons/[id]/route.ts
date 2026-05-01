import { NextRequest } from 'next/server'
import dbConnect from '@/lib/db'
import Weapon from '@/models/Weapon'
import { apiResponse, apiError, handleApiError } from '@/lib/utils'

export async function GET(_req: NextRequest, { params }: { params: { id: string } }) {
  try {
    await dbConnect()
    const weapon = await Weapon.findById(params.id).lean()
    if (!weapon) return apiError('Weapon not found', 404)
    return apiResponse(weapon)
  } catch (error) {
    return handleApiError(error)
  }
}
