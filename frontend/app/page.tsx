'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function Home() {
  const router = useRouter()

  useEffect(() => {
    const token = localStorage.getItem('authToken')
    router.push(token ? '/feed' : '/signup')
  }, [router])

  return null
}