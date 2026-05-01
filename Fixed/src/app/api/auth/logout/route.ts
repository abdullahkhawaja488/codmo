import { NextRequest } from 'next/server'
import { apiResponse } from '@/lib/utils'

export async function POST(_req: NextRequest) {
  const response = apiResponse({ message: 'Logged out successfully' })
  response.headers.set('Set-Cookie', 'auth-token=; HttpOnly; Path=/; Max-Age=0; SameSite=Strict')
  return response
}
