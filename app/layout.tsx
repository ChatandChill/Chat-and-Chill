import LaunchSplash from './components/LaunchSplash'

export const metadata = {
  title: 'Chat & Chill | Guest entertainment & Diamond Wallet',
  description: 'Chat & Chill app with guest entertainment, real-photo gifts, Diamond Wallet balance tracking, and an honest live-production rollout status.',
  keywords: ['Chat & Chill', 'Diamond Wallet', 'guest entertainment', 'Nigerian social app'],
  manifest: '/manifest.json'
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body style={{ margin: 0, background: 'black' }}>
        <LaunchSplash />
        {children}
      </body>
    </html>
  )
}
