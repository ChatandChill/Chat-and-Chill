import LaunchSplash from './components/LaunchSplash'

export const metadata = {
  title: 'Chat and Chill V5M.1 - 5M Hedge Ahead TikTok+IG DNA Not Bank',
  description: 'Talk cool Chill out Have fun Friendship Love Benefits Diaspora More Convenient Benefit Accessible Guest FYP Like TikTok',
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
