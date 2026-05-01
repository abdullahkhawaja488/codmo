import { NextRequest } from 'next/server'
import dbConnect from '@/lib/db'
import Character from '@/models/Character'
import { apiResponse, apiError, handleApiError } from '@/lib/utils'

export async function GET(_req: NextRequest, { params }: { params: { id: string } }) {
  try {
    await dbConnect()
    const character = await Character.findById(params.id).lean()
    if (!character) return apiError('Character not found', 404)
    return apiResponse(character)
  } catch (error) {
    return handleApiError(error)
  }
}
