'use client'

import { useEffect } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { Providers } from './scr/providers'
import Navbar from './scr/components/Navbar'


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
      const token = localStorage.getItem('authToken')
      const publicPaths = ['/login', '/signup']
      
      if (!token && !publicPaths.includes(pathname)) {
        router.push('/login')
      }else if (token && publicPaths.includes(pathname)) {
      router.push('/feed'); // Перенаправляем авторизованных пользователей
    }
    }
  }, [pathname, router])

  return (
    <html lang="en">
      <body >
        <Providers>
          <Navbar />
          {children}
        </Providers>
      </body>
    </html>
  )
}