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

export default function Signup() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [username, setUsername] = useState('')
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/auth/signup`, {
        user: { email, password, username }
      });
      console.log('Ответ сервера:', res.data);
      localStorage.setItem('authToken', res.data.token); // Сохраните токен
      await new Promise(resolve => setTimeout(resolve, 100));
      router.push('/login')
    } catch (error) {
      alert('Ошибка регистрации!');
    }
  };

  return (
    <Box maxW="md" mx="auto" mt={10} p={4}>
      <form onSubmit={handleSubmit}>
        <VStack spacing={4}>
          <FormControl>
            <FormLabel>Username</FormLabel>
            <Input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </FormControl>

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

          <Button type="submit" colorScheme="brand" width="full">
            Sign Up
          </Button>

          <Button
            variant="link"
            onClick={() => router.push('/login')}
          >
            Already have an account? Login
          </Button>
        </VStack>
      </form>
    </Box>
  )
}