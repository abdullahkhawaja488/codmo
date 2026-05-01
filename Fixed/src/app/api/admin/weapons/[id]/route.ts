import { NextRequest } from 'next/server'
import dbConnect from '@/lib/db'
import Weapon from '@/models/Weapon'
import { requireAdmin } from '@/lib/auth'
import { apiResponse, apiError, handleApiError } from '@/lib/utils'

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    requireAdmin(req)
    await dbConnect()
    const body = await req.json()
    const weapon = await Weapon.findByIdAndUpdate(params.id, body, { new: true, runValidators: true })
    if (!weapon) return apiError('Weapon not found', 404)
    return apiResponse(weapon)
  } catch (error) {
    return handleApiError(error)
  }
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    requireAdmin(req)
    await dbConnect()
    const weapon = await Weapon.findByIdAndDelete(params.id)
    if (!weapon) return apiError('Weapon not found', 404)
    return apiResponse({ message: 'Weapon deleted' })
  } catch (error) {
    return handleApiError(error)
  }
}
