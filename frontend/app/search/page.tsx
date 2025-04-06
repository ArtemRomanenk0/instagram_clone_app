// app/search/page.tsx
'use client'
import { useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Box, Input, Button, Flex, Heading, Collapse } from '@chakra-ui/react'
import Feed from '@/app/scr/components/Feed'

export default function SearchPage() {
  const router = useRouter()
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = () => {
    window.location.href = `http://localhost/search?q=${encodeURIComponent(searchQuery)}`;
  };

  return (
    <Box p={4}>
      <Button onClick={() => setIsSearchOpen(!isSearchOpen)} mb={4}>
        {isSearchOpen ? 'Скрыть поиск' : 'Поиск'}
      </Button>

      <Collapse in={isSearchOpen}>
        <Box display="flex" gap={2}>
          <Input
            placeholder="Введите запрос"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <Button onClick={handleSearch} colorScheme="brand">
            Найти
          </Button>
        </Box>
      </Collapse>

      {/* Остальной контент ленты */}
    </Box>
  );
  
}