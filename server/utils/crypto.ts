import crypto from "node:crypto"

const ALG = "aes-256-gcm"

// ✅ Use runtime config inside Nuxt instead of process.env
function getKey(): Buffer {
  let secret: string | undefined

  try {
    // Works in both API handlers and composables
    const config = useRuntimeConfig()
    secret = config.API_ENCRYPT_SECRET as string
  } catch {
    // fallback (if used in a plain Node environment)
    secret = process.env.API_ENCRYPT_SECRET
  }

  if (!secret) throw new Error("Missing API_ENCRYPT_SECRET in runtime config")
  return crypto.createHash("sha256").update(secret).digest()
}

export function encryptJSON(obj: unknown) {
  const iv = crypto.randomBytes(12)
  const key = getKey()
  const cipher = crypto.createCipheriv(ALG, key, iv)

  const json = Buffer.from(JSON.stringify(obj), "utf8")
  const encrypted = Buffer.concat([cipher.update(json), cipher.final()])
  const tag = cipher.getAuthTag()

  return {
    iv: iv.toString("base64"),
    tag: tag.toString("base64"),
    data: encrypted.toString("base64"),
  }
}

export function decryptJSON(payload: { iv: string; tag: string; data: string }) {
  const key = getKey()
  const iv = Buffer.from(payload.iv, "base64")
  const tag = Buffer.from(payload.tag, "base64")
  const data = Buffer.from(payload.data, "base64")

  const decipher = crypto.createDecipheriv(ALG, key, iv)
  decipher.setAuthTag(tag)
  const decrypted = Buffer.concat([decipher.update(data), decipher.final()])
  return JSON.parse(decrypted.toString("utf8"))
}
