export const revalidate = 60 // cache for 60 seconds
import { NextRequest } from 'next/server'
import dbConnect from '@/lib/db'
import Character from '@/models/Character'
import { apiResponse, handleApiError } from '@/lib/utils'

export async function GET(_req: NextRequest) {
  try {
    await dbConnect()
    const characters = await Character.find({ isActive: true }).sort({ createdAt: 1 }).lean()
    return apiResponse(characters)
  } catch (error) {
    return handleApiError(error)
  }
}
