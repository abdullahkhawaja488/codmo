import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatError(error: unknown): string {
  if (error instanceof Error) return error.message
  if (typeof error === 'string') return error
  return 'An unexpected error occurred'
}

export function apiResponse<T>(data: T, status = 200) {
  return Response.json({ success: true, data }, { status })
}

export function apiError(message: string, status = 400) {
  return Response.json({ success: false, error: message }, { status })
}

export function handleApiError(error: unknown) {
  const msg = formatError(error)
  if (msg === 'UNAUTHORIZED') return apiError('Unauthorized', 401)
  if (msg === 'FORBIDDEN') return apiError('Forbidden', 403)
  console.error('[API Error]', error)
  return apiError(msg, 500)
}

export function getTierColor(tier: string): string {
  switch (tier?.toLowerCase()) {
    case 'mythic': return '#ff6b9d'
    case 'legendary': return '#ffd700'
    case 'epic': return '#9f7fff'
    default: return '#00e5ff'
  }
}

export function getStatBarColor(tier: string): string {
  switch (tier?.toLowerCase()) {
    case 'mythic': return 'linear-gradient(90deg, #ff6b9d, #cc3377)'
    case 'legendary': return 'linear-gradient(90deg, #ffd700, #cc9900)'
    case 'epic': return 'linear-gradient(90deg, #9f7fff, #6644cc)'
    default: return 'linear-gradient(90deg, #00e5ff, #00b8cc)'
  }
}
