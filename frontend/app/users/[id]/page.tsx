// app/user/[id]/page.tsx
'use client'
import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { Box, Heading, Spinner } from '@chakra-ui/react'
import UserPage from '../../scr/components/UserPage'


export default function ProfilePage() {
  const { id } = useParams()
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) return <Spinner />

  return (
    <Box p={4}>
      <Heading mb={6}>Профиль пользователя</Heading>
      <UserPage />
    </Box>
  )
}