'use client'
import { useEffect, useState } from 'react'
import { Box, Heading, Spinner } from '@chakra-ui/react'

import api from '../scr/lib/api'
import Feed from '../scr/components/Feed'

export default function ProfilePage() {
  const [userId, setUserId] = useState<string | null>(null)

  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        const { data } = await api.get('/api/v1/users/me')
        setUserId(data.id)
      } catch (err) {
        console.error('Error fetching current user:', err)
      }
    }
    fetchCurrentUser()
  }, [])

  if (!userId) return <Spinner size="xl" mt={8} />

  return (
    <Box>
      <Heading mb={6} textAlign="center">Мой профиль</Heading>
      <Feed
        endpoint={`/api/v1/users/${userId}/posts`}
        showDeleteButton
        showFollowButton={false}
      />
    </Box>
  )
}