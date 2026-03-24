import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Phantom Sequence CTF',
  description: 'Advanced Network Forensics Challenge',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="bg-gray-900 text-green-400">{children}</body>
    </html>
  )
}