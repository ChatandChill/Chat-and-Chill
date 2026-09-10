function normalize(value) {
  return typeof value === 'string' ? value.trim() : ''
}

export function hasValidSupabaseConfig() {
  const url = normalize(process.env.NEXT_PUBLIC_SUPABASE_URL)
  const key = normalize(process.env.SUPABASE_SERVICE_ROLE_KEY)

  return Boolean(
    url &&
      key &&
      url.startsWith('http') &&
      !url.includes('placeholder.supabase.co') &&
      !key.includes('placeholder') &&
      key.length > 40
  )
}

export function hasValidAnonSupabaseConfig() {
  const url = normalize(process.env.NEXT_PUBLIC_SUPABASE_URL)
  const key = normalize(process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY)

  return Boolean(
    url &&
      key &&
      url.startsWith('http') &&
      !url.includes('placeholder.supabase.co') &&
      !key.includes('placeholder') &&
      key.length > 40
  )
}

export function hasValidPaystackConfig() {
  const secret = normalize(process.env.PAYSTACK_SECRET_KEY)
  const publicKey = normalize(process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY)

  return Boolean(
    secret &&
      publicKey &&
      secret.length > 20 &&
      publicKey.length > 20 &&
      !secret.includes('placeholder') &&
      !publicKey.includes('placeholder')
  )
}

export function getRuntimeStatus() {
  const supabaseReady = hasValidSupabaseConfig()
  const anonReady = hasValidAnonSupabaseConfig()
  const paystackReady = hasValidPaystackConfig()

  return {
    app: 'Chat & Chill',
    brand: 'Chat & Chill only',
    wallet: 'Diamond Wallet',
    balance: '₦6,765,000',
    routes: 17,
    build_ok: true,
    guest_mode: true,
    demo_mode: !supabaseReady || !paystackReady,
    live_env_ready: supabaseReady && paystackReady,
    supabase_ready: supabaseReady,
    supabase_anon_ready: anonReady,
    paystack_ready: paystackReady,
    payment_ready: paystackReady,
    wallet_backend_ready: supabaseReady,
    production_integrations_pending: [
      'Payment verification',
      'AI content importing',
      'Live battles',
      'Camera enhancement',
      'Audio systems',
      'Identity verification'
    ],
    message: supabaseReady && paystackReady
      ? 'Live environment flags are configured. Production verification still requires real transaction testing and webhook approval.'
      : 'App is healthy; live production integrations still require separate testing before being marked complete.'
  }
}
