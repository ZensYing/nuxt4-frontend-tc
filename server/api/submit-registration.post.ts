// server/api/submit-registration.post.ts
import type { H3Event, EventHandlerRequest } from 'h3'
import { LRUCache } from 'lru-cache'

const cache = new LRUCache({
  max: 500,
  ttl: 1000 * 60 * 15, // 15 minutes
})

export default defineEventHandler(async (event) => {
  // Rate limiting
  const ip = getClientIP(event)
  const key = `rate_limit_${ip}`
  
  const attempts = Number(cache.get(key)) || 0
  if (attempts >= 5) {
    throw createError({
      statusCode: 429,
      statusMessage: 'Too many requests'
    })
  }
  
  cache.set(key, attempts + 1)
  
  // Get request body
  const body = await readBody(event)
  
  // Server-side validation
  if (!body.name || !body.phone || !body.gender || !body.job || !body.evt_section) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Missing required fields'
    })
  }

  // Additional validation
  if (!Array.isArray(body.evt_section) || body.evt_section.length === 0) {
    throw createError({
      statusCode: 400,
      statusMessage: 'At least one event section must be selected'
    })
  }

  try {
    const response = await $fetch('/items/event', {
      method: 'POST',
      baseURL: process.env.DIRECTUS_BASE_URL || 'https://admin.baksey.asia',
      body,
      headers: {
        'Authorization': `Bearer ${process.env.DIRECTUS_TOKEN}`,
        'Content-Type': 'application/json'
      }
    })
    
    return response
  } catch (error) {
    console.error('Directus API Error:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Registration failed. Please try again.'
    })
  }
})

function getClientIP(event: H3Event<EventHandlerRequest>) {
    throw new Error('Function not implemented.')
}
