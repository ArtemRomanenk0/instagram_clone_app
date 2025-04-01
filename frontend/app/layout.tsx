'use client'

import { Inter } from 'next/font/google'
import { useEffect } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { Providers } from './scr/providers'
import Navbar from './scr/components/Navbar'

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    // Выполняем проверку только на клиенте
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('token')
      const publicPaths = ['/login', '/signup']
      
      if (!token && !publicPaths.includes(pathname)) {
        router.push('/login')
      }
    }
  }, [pathname, router])

  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <Navbar />
          {children}
        </Providers>
      </body>
    </html>
  )
}