// components/Feed.tsx
'use client'
import { useEffect, useState } from 'react'
import { Box, VStack, Text, Image, Spinner, Flex, Avatar, Button } from '@chakra-ui/react'
import api from '../lib/api'

interface User {
  id: string
  username: string
  avatar_url: string
  is_following?: boolean
}

interface Post {
  id: string
  text: string
  image_url: string
  user: User
}

interface FeedProps {
  endpoint: string
  showFollowButton?: boolean
  showDeleteButton?: boolean
  onPostDelete?: () => void
}

export default function Feed({ 
  endpoint, 
  showFollowButton = true,
  showDeleteButton = false,
  onPostDelete 
}: FeedProps) {
  const [posts, setPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await api.get<{ data: Post[] }>(endpoint)
        setPosts(res.data.data)
      } catch (error) {
        console.error('Error fetching posts:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchPosts()
  }, [endpoint])

  const handleFollow = async (userId: string) => {
    try {
      await api.post(`/api/v1/users/${userId}/follow`)
      setPosts(posts.map(post => 
        post.user.id === userId 
          ? { ...post, user: { ...post.user, is_following: true } } 
          : post
      ))
    } catch (error) {
      console.error('Follow error:', error)
    }
  }

  const handleDelete = async (postId: string) => {
    try {
      await api.delete(`/api/v1/posts/${postId}`)
      setPosts(posts.filter(post => post.id !== postId))
      onPostDelete?.()
    } catch (error) {
      console.error('Delete error:', error)
    }
  }

  if (loading) return <Spinner size="xl" thickness='4px' color='blue.500' />

  return (
    <VStack spacing={6} w="100%">
      {posts.map(post => (
        <Box key={post.id} w="100%" borderWidth="1px" borderRadius="lg" p={4}>
          <Flex align="center" mb={4} justify="space-between">
            <Flex align="center">
              <Avatar
                src={post.user.avatar_url}
                name={post.user.username}
                size="sm"
                mr={2}
              />
              <Text fontWeight="bold">{post.user.username}</Text>
              
              {showFollowButton && !post.user.is_following && (
                <Button 
                  ml={3} 
                  size="xs" 
                  colorScheme="blue"
                  onClick={() => handleFollow(post.user.id)}
                >
                  Подписаться
                </Button>
              )}
            </Flex>

            {showDeleteButton && (
              <Button 
                colorScheme="red" 
                size="xs"
                onClick={() => handleDelete(post.id)}
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
            />
          )}
        </Box>
      ))}
    </VStack>
  )
}