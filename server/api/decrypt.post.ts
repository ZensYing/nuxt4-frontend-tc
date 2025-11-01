// in server/api/decrypt.post.ts
import { decryptJSON } from '~~/server/utils/crypto'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  console.log("🔐 Received ciphertext:", body)
  const json = decryptJSON(body)
  console.log("✅ Decrypted data:", json)
  return { data: json }
})
