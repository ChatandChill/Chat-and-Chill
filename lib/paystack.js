// MODE = "wallet" for now, change to "auto" next week for instant bank
export const PAYOUT_MODE = "wallet" 

export async function handleGiftSuccess({ creatorId, amount, paystackRef }) {
  const creatorShare = amount * 0.7
  
  if (PAYOUT_MODE === "auto") {
    // Next week: instant to bank (uses autoPayoutService.js we built before)
    await fetch('/api/gifts/auto-payout', {
      method: 'POST',
      body: JSON.stringify({ creatorId, amount: creatorShare, ref: paystackRef })
    })
  } else {
    // Today: to wallet (no fee, works with Starter Business)
    // Your current wallets table logic - already working!
    return { walletCredit: creatorShare }
  }
}
