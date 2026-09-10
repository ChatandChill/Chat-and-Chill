import { giftCatalog } from '@/lib/giftCatalog'

export const dynamic = 'force-dynamic'

export async function GET() {
  const gifts = giftCatalog.map((gift) => ({
    id: gift.id,
    name: gift.name,
    emoji: gift.emoji,
    amount: gift.amount,
    category: gift.category,
    image: gift.image,
    real_photo: true,
    fallback_emoji: gift.emoji,
    source: 'pexels-free'
  }))

  return Response.json({
    status: 'ok',
    app: 'Chat & Chill',
    count: gifts.length,
    wallet: 'Diamond Wallet',
    real_photo_mode: true,
    gifts
  }, {
    headers: {
      'Cache-Control': 'no-store'
    }
  })
}
