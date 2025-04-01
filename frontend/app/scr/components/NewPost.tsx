'use client'
import { useState, FormEvent } from 'react'
import { Box, Button, Textarea, FormControl, FormLabel, Input, useToast, Flex } from '@chakra-ui/react'
import api from '../lib/api'

export default function NewPost({ onSuccess, onClose }: { 
  onSuccess: () => void, 
  onClose: () => void 
}) {
  const [text, setText] = useState('')
  const [image, setImage] = useState<File | null>(null)
  const [loading, setLoading] = useState(false)
  const toast = useToast()

 

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setLoading(true)
    
    try {
      const formData = new FormData()
      formData.append('text', text)
      if (image) formData.append('image', image)

      await api.post('/api/v1/posts', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      })
      
      onSuccess()
      setText('')
      setImage(null)
      toast({ title: 'Пост создан!', status: 'success' })
    } catch (error) {
      toast({ title: 'Ошибка при создании поста', status: 'error' })
    } finally {
      setLoading(false)
      onClose()
    }
  }

  return (
    <Box 
      position="fixed" 
      top="50%" 
      left="50%" 
      transform="translate(-50%, -50%)" 
      bg="white" 
      p={6}
      borderRadius="lg"
      boxShadow="xl"
      zIndex={1000}
    >
      <form onSubmit={handleSubmit}>
        <FormControl mb={4}>
          <FormLabel>Текст поста</FormLabel>
          <Textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Что у вас нового?"
            size="md"
            resize="vertical"
            width="400px"
          />
        </FormControl>

        <FormControl mb={4}>
          <FormLabel>Изображение</FormLabel>
          <Input
            type="file"
            accept="image/*"
            onChange={(e) => setImage(e.target.files?.[0] || null)}
            p={1}
          />
        </FormControl>

        <Flex justify="flex-end" gap={3}>
          <Button onClick={onClose}>Отмена</Button>
          <Button
            type="submit"
            colorScheme="blue"
            isLoading={loading}
            loadingText="Публикация..."
          >
            Опубликовать
          </Button>
        </Flex>
      </form>
    </Box>
  )
}