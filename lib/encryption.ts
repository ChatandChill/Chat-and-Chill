import CryptoJS from 'crypto-js'

const SECRET_SALT = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'chat-chill-africa-one-love'

export function encryptMessage(text: string, receiverId: string): string {
  const key = SECRET_SALT + receiverId
  return CryptoJS.AES.encrypt(text, key).toString()
}

export function decryptMessage(encrypted: string, receiverId: string): string {
  try {
    const key = SECRET_SALT + receiverId
    const bytes = CryptoJS.AES.decrypt(encrypted, key)
    return bytes.toString(CryptoJS.enc.Utf8)
  } catch {
    return '[Encrypted message - One Heart. One Africa. One Love.]'
  }
}
