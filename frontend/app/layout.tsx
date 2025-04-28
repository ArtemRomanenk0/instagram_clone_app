'use client'

import { useEffect } from 'react'
import { usePathname, useRouter } from 'next/navigation'

import Navbar from './scr/components/Navbar'
import { Providers } from './scr/providers'


export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {

    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('authToken')
      const publicPaths = ['/login', '/signup']

      if (!token && !publicPaths.includes(pathname!)) {
        router.push('/login')
      } else if (token && publicPaths.includes(pathname!)) {
        router.push('/feed');
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