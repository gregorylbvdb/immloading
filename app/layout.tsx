import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Leveringstermijn — Dental Labo Vanderbeken',
  description: 'Bereken wanneer uw Immediate Loading bestelling geleverd wordt',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="nl">
      <body>{children}</body>
    </html>
  )
}
