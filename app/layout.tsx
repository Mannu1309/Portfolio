import type { Metadata } from 'next'
import { Analytics } from '@vercel/analytics/next';
import { GeistSans } from 'geist/font/sans'
import './globals.css'

export const metadata: Metadata = {
  title: 'Portfolio | Manish Kumar',
  description: 'My professional portfolio website',
  icons: {
    icon: '/icon.png'
  }
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={GeistSans.className}>
      <body>{children}
        <Analytics />
      </body>
    </html>
  )
}
