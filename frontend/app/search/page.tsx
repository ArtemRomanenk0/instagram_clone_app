// app/search/page.tsx
'use client'
import { useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Box, Input, Button, Flex, Heading } from '@chakra-ui/react'
import Feed from '@/app/scr/components/Feed'

export default function SearchPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [query, setQuery] = useState(searchParams.get('q') || '')

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    router.push(`/search?q=${encodeURIComponent(query)}`)
  }

  return (
    <Box p={4}>
      <Heading mb={6} textAlign="center">Поиск по постам</Heading>
      
      <Flex as="form" onSubmit={handleSearch} mb={6}>
        <Input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Введите поисковый запрос..."
          mr={2}
        />
        <Button type="submit" colorScheme="blue">
          Найти
        </Button>
      </Flex>

      {query && (
        <Feed 
        endpoint="/api/v1/posts/search" 
        searchMode={true} // Добавьте это
        />
      )}
    </Box>
  )
}