import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Providers from './providers'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'NeuroCoach',
  description: 'Neurodiversity-informed coaching for teams',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className} style={{ backgroundColor: '#FDF8F0', minHeight: '100vh' }}>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
