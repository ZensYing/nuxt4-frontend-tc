// server/api/articles/[slug]/secure.get.ts
import { fetchArticleBySlug } from '~~/server/utils/directus'
import { encryptJSON } from '~~/server/utils/crypto'

export default defineEventHandler(async (event) => {
  const slug = getRouterParam(event, 'slug') ?? ''
  if (!slug) {
    throw createError({ statusCode: 400, statusMessage: 'Missing slug' })
  }

  // Fetch from Directus (server-only)
  const article = await fetchArticleBySlug(slug)

  // Optional: only include fields you want to ship
  const minimal = {
    id: article.id,
    title: article.title,
    slug: article.slug,
    body: article.body,
    date_created: article.date_created,
    date_updated: article.date_updated,
    views: article.views
  }

  // Encrypt before sending to the browser
  const ciphertext = encryptJSON(minimal)
  return { ciphertext } // { iv, tag, data }
})
