import type { Metadata, Viewport } from 'next'
import { Great_Vibes, Cormorant_Garamond } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const greatVibes = Great_Vibes({
  weight: '400',
  subsets: ["latin"],
  variable: '--font-script'
});

const cormorant = Cormorant_Garamond({
  weight: ['300', '400', '500', '600'],
  subsets: ["latin"],
  variable: '--font-serif'
});

export const metadata: Metadata = {
  title: 'Nathaly & Kevin - Nuestra Boda',
  description: 'Te invitamos a celebrar nuestra boda el 01 de Mayo de 2026',
  generator: 'v0.app',
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export const viewport: Viewport = {
  themeColor: '#c9a45c',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es">
      <body className={`${greatVibes.variable} ${cormorant.variable} font-serif antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
