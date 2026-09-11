import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'], display: 'swap' })

export const metadata = {
  title: 'Chat & Chill - African Pride',
  description: 'Chat & Chill social entertainment, gifts, and conversations.',
  manifest: '/manifest.json'
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.className}>
      <body className="bg-black antialiased">{children}</body>
    </html>
  )
}
