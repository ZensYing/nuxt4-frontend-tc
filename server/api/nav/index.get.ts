// server/api/nav.get.ts
import { ofetch } from "ofetch"

/**
 * Returns categories from Directus
 * Runs only on the server → no Directus token is exposed to client.
 */
export default defineEventHandler(async () => {
  const config = useRuntimeConfig()
  const base = config.DIRECTUS_URL
  const token = config.DIRECTUS_TOKEN

  if (!base || !token) {
    throw createError({
      statusCode: 500,
      statusMessage: "Missing Directus config or token",
    })
  }

  const url = `${base}/items/categories?fields=id,name,slug,sub_categories.name,sub_categories.slug&sort=sort&filter[status][_eq]=published`

  try {
    const res = await ofetch<{ data: any[] }>(url, {
      headers: { Authorization: `Bearer ${token}` },
    })

    const categories = (res?.data || []).map((c) => ({
      id: c.id,
      name: c.name,
      slug: c.slug,
      sub_categories:
        c.sub_categories?.map((s: any) => ({
          name: s.name,
          slug: s.slug,
        })) || [],
    }))

    return { data: categories }
  } catch (err: any) {
    console.error("❌ Directus fetch failed:", err)
    throw createError({
      statusCode: 500,
      statusMessage: "Failed to fetch categories from Directus",
    })
  }
})
