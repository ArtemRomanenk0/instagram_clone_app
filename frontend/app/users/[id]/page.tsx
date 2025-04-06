// app/user/[id]/page.tsx
'use client'
import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { Box, Button, Heading, Spinner } from '@chakra-ui/react'
import UserPage from '../../scr/components/UserPage'


export default function ProfilePage() {
  const { id } = useParams()
  const [isMounted, setIsMounted] = useState(false)
  const router = useRouter()
  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) return <Spinner />

  return (
    <Box p={4}>
      <Button
        ml={3}
        size="xs"
        colorScheme="blue"
        onClick={() => router.push('/feed')}
      >

        назад
      </Button>


      <Heading mb={6}>Профиль пользователя</Heading>
      <UserPage />
    </Box>
  )
}