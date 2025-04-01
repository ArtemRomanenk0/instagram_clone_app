'use client'
import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { Box, Heading, VStack, Text, Image, Avatar, Flex, Button, Spinner } from '@chakra-ui/react'
import api from '@/app/scr/lib/api'

interface Post {
  id: string
  text: string
  image_url: string
  created_at: string
}

interface User {
  id: string
  username: string
  avatar_url: string
  is_following?: boolean
  posts?: Post[]
}

export default function UserPage() {
  const { id } = useParams()
  const [profile, setProfile] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const { data } = await api.get<User>(`/api/v1/users/${id}`)
        setProfile(data)
        setError(null)
      } catch (err) {
        setError('Не удалось загрузить профиль')
        console.error('Error fetching user:', err)
      } finally {
        setLoading(false)
      }
    }
    fetchUser()
  }, [id])

  const handleFollow = async () => {
    if (!profile) return
    
    try {
      const endpoint = profile.is_following 
        ? `/api/v1/users/${id}/unfollow`
        : `/api/v1/users/${id}/follow`
      
      await api.post(endpoint)
      setProfile(prev => prev ? {
        ...prev,
        is_following: !prev.is_following
      } : null)
    } catch (err) {
      console.error('Ошибка подписки:', err)
    }
  }

  if (loading) return <Spinner size="xl" mt={8} thickness="4px" color="blue.500" />

  if (error) return (
    <Box textAlign="center" mt={8} color="red.500">
      {error}
    </Box>
  )

  if (!profile) return null // Явная проверка перед рендерингом

  return (
    <Box p={4} maxW="800px" mx="auto">
      <Flex align="center" mb={8} gap={4}>
        <Avatar
          src={profile.avatar_url}
          name={profile.username}
          size="2xl"
          border="2px solid"
          borderColor="gray.200"
        />
        <Box flex={1}>
          <Heading size="lg" mb={2}>{profile.username}</Heading>
          <Button 
            colorScheme={profile.is_following ? 'gray' : 'blue'}
            onClick={handleFollow}
            size="sm"
          >
            {profile.is_following ? 'Отписаться' : 'Подписаться'}
          </Button>
        </Box>
      </Flex>

      <VStack spacing={6} mt={8}>
        {profile.posts?.length ? (
          profile.posts.map(post => (
            <Box 
              key={post.id} 
              w="100%" 
              borderWidth="1px" 
              borderRadius="lg" 
              p={6}
              boxShadow="md"
            >
              <Text fontSize="lg" mb={4}>{post.text}</Text>
              {post.image_url && (
                <Image
                  src={post.image_url}
                  alt="Пост"
                  borderRadius="md"
                  maxH="600px"
                  w="100%"
                  objectFit="contain"
                />
              )}
              <Text fontSize="sm" color="gray.500" mt={4}>
                Опубликовано: {new Date(post.created_at).toLocaleDateString()}
              </Text>
            </Box>
          ))
        ) : (
          <Box textAlign="center" py={8}>
            <Text fontSize="xl" color="gray.500">
              Пока нет постов
            </Text>
          </Box>
        )}
      </VStack>
    </Box>
  )
}