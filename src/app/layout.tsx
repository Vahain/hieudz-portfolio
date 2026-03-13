import type { Metadata } from 'next'
import { Sora, JetBrains_Mono } from 'next/font/google'
import '@/styles/globals.css'

const sora = Sora({
  subsets: ['latin'],
  variable: '--font-sora',
  weight: ['100', '200', '300', '400', '500', '600', '700', '800'],
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains',
  weight: ['100', '200', '300', '400', '500', '600', '700', '800'],
})

export const metadata: Metadata = {
  title: 'Nguyen Van Hieu | Technology Explorer',
  description: 'Portfolio of Nguyen Van Hieu — Information Technology Student, Technology Explorer, Future Digital Engineer',
  keywords: ['portfolio', 'developer', 'technology', 'AutoCAD', 'Vietnam', 'IT student'],
  authors: [{ name: 'Nguyen Van Hieu' }],
  openGraph: {
    title: 'Nguyen Van Hieu | Technology Explorer',
    description: 'Portfolio of Nguyen Van Hieu — IT Student & Technology Explorer',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <body className={`${sora.variable} ${jetbrainsMono.variable} antialiased`}>
        {children}
      </body>
    </html>
  )
}
