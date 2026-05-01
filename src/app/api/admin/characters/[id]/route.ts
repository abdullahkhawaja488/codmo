import { NextRequest } from 'next/server'
import dbConnect from '@/lib/db'
import Character from '@/models/Character'
import { requireAdmin } from '@/lib/auth'
import { apiResponse, apiError, handleApiError } from '@/lib/utils'

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    requireAdmin(req)
    await dbConnect()
    const body = await req.json()
    const character = await Character.findByIdAndUpdate(params.id, body, { new: true, runValidators: true })
    if (!character) return apiError('Character not found', 404)
    return apiResponse(character)
  } catch (error) {
    return handleApiError(error)
  }
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    requireAdmin(req)
    await dbConnect()
    const character = await Character.findByIdAndDelete(params.id)
    if (!character) return apiError('Character not found', 404)
    return apiResponse({ message: 'Character deleted' })
  } catch (error) {
    return handleApiError(error)
  }
}
