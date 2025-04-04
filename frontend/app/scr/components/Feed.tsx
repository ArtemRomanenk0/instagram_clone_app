// components/Feed.tsx
'use client'
import { useEffect, useState } from 'react'
import { Box, VStack, Text, Image, Spinner, Flex, Avatar, Button } from '@chakra-ui/react'
import api from '../lib/api'
import { useRouter } from 'next/navigation'

interface User {
  id: string
  username: string
  avatar_url?: string // Делаем опциональным
  is_following?: boolean
}

interface Post {
  id: string
  text: string
  image_url?: string
  created_at: number // Делаем опциональным
  user: User
}

interface FeedProps {
  endpoint: string
  showFollowButton?: boolean
  showDeleteButton?: boolean
  onPostDelete?: () => void
  searchMode?: boolean
}

export default function Feed({
  endpoint,
  showFollowButton = true,
  showDeleteButton = true,
  onPostDelete
}: FeedProps) {
  const [posts, setPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string>('')
  const [currentUserId, setCurrentUserId] = useState<string | null>(null)
  const router = useRouter()
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await api.get<{ data: Post[] }>(endpoint)

        // Добавляем проверку ответа

        setPosts(res.data?.data || res.data || [])

      } catch (error) {
        console.error('Error fetching posts:', error)
        setError('Ошибка загрузки постов')
      } finally {
        setLoading(false)
      }
    }
    fetchPosts()
  }, [endpoint])

  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        const { data } = await api.get('/api/v1/users/me', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('authToken')}`
          }
        });
        setCurrentUserId(data.id);
      } catch (err) {
        console.error('Error fetching current user:', err);
      }
    };
    fetchCurrentUser();
  }, []);useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        const { data } = await api.get('/api/v1/users/me', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('authToken')}`
          }
        });
        setCurrentUserId(data.id);
      } catch (err) {
        console.error('Error fetching current user:', err);
      }
    };
    fetchCurrentUser();
  }, []);

  if (loading) return <Spinner size="xl" thickness="4px" color="blue.500" />
  if (error) return <Text color="red.500">{error}</Text>



  const handleFollow = async (userId: string) => {
    try {
      await api.post(`/api/v1/users/${userId}/follow`)
      setPosts(posts.map(post =>
        post.user.id === userId
          ? {
            ...post,
            user: {
              ...post.user,
              is_following: true
            }
          }
          : post
      ))
    } catch (error) {
      console.error('Follow error:', error)
      setError('Ошибка при подписке')
    }
  }

  const handleDelete = async (postId: string) => {
    try {
      await api.delete(`/api/v1/posts/${postId}`)
      setPosts(posts.filter(post => post.id !== postId))
      onPostDelete?.()
    } catch (error) {
      console.error('Delete error:', error)
      setError('Ошибка при удалении')
    }
  }

  if (loading) {
    return (
      <Flex justify="center" mt={8}>
        <Spinner size="xl" thickness='4px' color='blue.500' />
      </Flex>
    )
  }

  if (error) {
    return (
      <Text color="red.500" textAlign="center" mt={4}>
        {error}
      </Text>
    )
  }

  if (!posts.length) {
    return (
      <Text textAlign="center" mt={4}>
        Постов пока нет
      </Text>
    )
  }

  return (
    <VStack spacing={6} w="100%">
    
      {posts.map(post => (
        <Box key={post.id} w="100%" borderWidth="1px" borderRadius="lg" p={4}>
          <Flex align="center" mb={4} justify="space-between">
            <Flex
              align="center"
              cursor="pointer"
              onClick={() => router.push(`/users/${encodeURIComponent(post.user.id)}`)}
            >
              <Avatar
                src={post.user?.avatar_url || '/default-avatar.png'}
                name={post.user?.username}
                size="sm"
                mr={2}
              />
              <Text fontWeight="bold">{post.user?.username}</Text>

            </Flex>
            {showFollowButton &&
              post.user?.id !== currentUserId &&
              !post.user?.is_following && (
                <Button
                  ml={3}
                  size="xs"
                  colorScheme="blue"
                  onClick={() => handleFollow(post.user.id)}
                >

                  {post.user?.is_following ? 'Отписаться' : 'Подписаться'}
                </Button>
              )}

            {showDeleteButton && post.user?.id === currentUserId &&
              !post.user?.is_following && (
                <Button
                  colorScheme="red"
                  size="xs"
                  onClick={() => handleDelete(post.id)}
                  isLoading={loading}
                >
                  Удалить
                </Button>
              )}
          </Flex>

          <Text mb={4}>{post.text}</Text>

          {post.image_url && (
            <Image
              src={post.image_url}
              alt="Post image"
              borderRadius="md"
              maxH="400px"
              objectFit="contain"
              w="100%"
              fallbackSrc="/image-placeholder.png"
            />
          )}
        </Box>
      ))}
   
   </VStack>
  )
}