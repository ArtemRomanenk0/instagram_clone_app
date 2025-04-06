'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { 
  Box, 
  Button, 
  Input, 
  FormControl, 
  FormLabel,
  VStack
} from '@chakra-ui/react'
import axios from 'axios'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Добавьте вложенность user!
      const res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/auth/login`, {
        user: { email, password }
      });
      localStorage.setItem('authToken', res.data.token);
      router.push('/feed')
    } catch (error) {
      alert('Ошибка входа! Проверьте данные');
    }
  };


  
  return (
    <Box maxW="md" mx="auto" mt={10} p={4}>
      <form onSubmit={handleSubmit}>
        <VStack spacing={4}>
          <FormControl>
            <FormLabel>Email</FormLabel>
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </FormControl>
          
          <FormControl>
            <FormLabel>Password</FormLabel>
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </FormControl>
          
          <Button type="submit" colorScheme="blue" width="full">
            Sign In
          </Button>
        </VStack>
      </form>
    </Box>
  )
}


