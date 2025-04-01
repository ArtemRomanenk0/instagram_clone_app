'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Box, Input, Button, VStack, Flex } from '@chakra-ui/react'
import Feed from '../scr/components/Feed'



export default function SearchPage() {
  const [query, setQuery] = useState('')
  const router = useRouter()

  const handleSearch = () => {
    router.push(`/search?q=${encodeURIComponent(query)}`)
  }

  return (
    <Box p={4}>
      <Flex mb={6}>
        <Input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Поиск по постам..."
          mr={2}
        />
        <Button onClick={handleSearch}>Найти</Button>
      </Flex>

      <Feed endpoint={`/api/v1/posts/search?query=${query}`} />
    </Box>
  )
}