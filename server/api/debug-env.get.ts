// server/api/debug-env.get.ts
export default defineEventHandler(() => {
  const config = useRuntimeConfig()
  return {
    DIRECTUS_URL: config.DIRECTUS_URL,
    DIRECTUS_TOKEN: !!config.DIRECTUS_TOKEN,
    API_ENCRYPT_SECRET: !!config.API_ENCRYPT_SECRET,
  }
})
