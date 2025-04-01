'use client'
import { Box } from '@chakra-ui/react'
import dynamic from 'next/dynamic'
import { useEffect, useState } from 'react'

import { Post } from '../../types'
import api from '../scr/lib/api'

const DynamicFeed = dynamic(() => import('../../app/scr/components/Feed'), {
  ssr: false,
  loading: () => <p>Loading...</p>
})

const DynamicNewPost = dynamic(() => import('../../app/scr/components/NewPost'), {
  ssr: false
})

export default function FeedPage() {
  const [showNewPost, setShowNewPost] = useState(false)
  const [posts, setPosts] = useState<Post[]>([])
  const [error, setError] = useState<string | null>(null)

  const fetchPosts = async () => {
    try {
      const { data } = await api.get<Post[]>('/api/v1/posts')
      setPosts(data)
      setError(null)
    } catch (err) {
      setError('Не удалось загрузить ленту')
      console.error('Error fetching posts:', err)
    }
  }

  useEffect(() => {
    fetchPosts()
  }, [])

  return (
    <Box p={4}>
      {error && (
        <Box color="red.500" mb={4}>
          {error}
        </Box>
      )}

      <button 
        onClick={() => setShowNewPost(true)}
        style={{
          position: 'fixed',
          bottom: '40px',
          right: '40px',
          padding: '15px 30px',
          borderRadius: '25px',
          background: '#3182CE',
          color: 'white',
          border: 'none',
          cursor: 'pointer',
          zIndex: 1000
        }}
      >
        Новый пост
      </button>
      
      {showNewPost && (
        <DynamicNewPost 
          onSuccess={() => {
            setShowNewPost(false)
            fetchPosts()
          }}
          onClose={() => setShowNewPost(false)}
        />
      )}
      
      <DynamicFeed 
        endpoint="/api/v1/posts" 
        showFollowButton 
        onPostDelete={fetchPosts}
      />
    </Box>
  )
}