// server/utils/directus.ts
import { ofetch } from 'ofetch'

export interface DirectusArticle {
  id: number
  status: string
  title: string
  slug: string
  body: string
  thumbnail?: string | null
  views?: number
  category?: number | { id: number; name?: string; slug?: string }
  date_created?: string
  date_updated?: string | null
}


export async function fetchArticleBySlug(slug: string): Promise<DirectusArticle> {
  const config = useRuntimeConfig()
  const base = config.DIRECTUS_URL
  const token = config.DIRECTUS_TOKEN

  if (!base || !token) {
    throw createError({ statusCode: 500, statusMessage: 'Missing Directus config' })
  }

  const params = new URLSearchParams({
    'filter[slug][_eq]': slug,
    'filter[status][_eq]': 'published',
    'limit': '1',
    'fields': 'id,status,title,slug,body,thumbnail,views,category,date_created,date_updated'
  })

  const url = `${base}/items/articles?${params.toString()}`

  const res = await ofetch<{ data: DirectusArticle[] }>(url, {
    headers: { Authorization: `Bearer ${token}` }
  })

  if (!res?.data?.length) {
    throw createError({ statusCode: 404, statusMessage: 'Article not found' })
  }

  // ✅ Fix: Tell TS this is safe
  return res.data[0]!
}

