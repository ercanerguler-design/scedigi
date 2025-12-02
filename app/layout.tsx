import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { SessionProvider } from '@/components/SessionProvider'
import WhatsAppButton from '@/components/WhatsAppButton'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'SCE Digital CRM - Software Circuit Engineer',
  description: 'Yenilikçi yeni ürünler ve çözümler geliştirerek akut müşteri sorunlarını çözüyoruz',
  icons: {
    icon: '/favicon.svg',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="tr">
      <body className={inter.className}>
        <SessionProvider>
          {children}
          <WhatsAppButton />
        </SessionProvider>
      </body>
    </html>
  )
}
