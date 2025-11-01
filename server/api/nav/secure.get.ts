import { ofetch } from "ofetch"
import { encryptJSON } from "~~/server/utils/crypto"

export default defineEventHandler(async () => {
  const cfg = useRuntimeConfig()
  const base = cfg.DIRECTUS_URL
  const token = cfg.DIRECTUS_TOKEN

  if (!base || !token) {
    console.error("❌ Missing Directus config")
    throw createError({ statusCode: 500, statusMessage: "Missing Directus config" })
  }

  const url = `${base}/items/categories?fields=id,name,slug,sub_categories.name,sub_categories.slug&sort=sort&filter[status][_eq]=published`
  console.log("🌐 Fetching from:", url)

  let res
  try {
    res = await ofetch<{ data: any[] }>(url, {
      headers: { Authorization: `Bearer ${token}` }
    })
    console.log("✅ Directus categories count:", res.data?.length)
  } catch (err: any) {
    console.error("❌ Directus fetch failed:", err)
    throw createError({ statusCode: 500, statusMessage: "Directus fetch failed" })
  }

  if (!res?.data?.length) {
    console.warn("⚠️ Directus returned no categories or invalid token")
  }

  const categories = (res?.data || []).map(c => ({
    id: c.id,
    name: c.name,
    slug: c.slug,
    sub_categories: c.sub_categories?.map((s: any) => ({
      name: s.name,
      slug: s.slug
    })) || []
  }))

  const ciphertext = encryptJSON(categories)
  return { ciphertext }
})
