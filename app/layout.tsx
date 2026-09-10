export const metadata = {
  title: 'Chat & Chill - African Pride',
  description: 'Chat & Chill social entertainment, gifts, and conversations.',
  manifest: '/manifest.json'
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body style={{ background: 'black', margin: 0, color: 'white' }}>{children}</body>
    </html>
  )
}
