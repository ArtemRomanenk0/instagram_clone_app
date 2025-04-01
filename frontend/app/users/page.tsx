'use client'

import { useEffect, useState } from 'react';
import { Box, Button, Heading, VStack } from '@chakra-ui/react';
import api from '../scr/lib/api';

interface User {
  id: string;
  username: string;
  isFollowing: boolean;
}

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await api.get('/api/v1/users');
        setUsers(res.data.users);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };
    fetchUsers();
  }, []);

  const handleFollow = async (userId: string) => {
    try {
      await api.post(`/api/v1/users/${userId}/follow`);
      setUsers(users.map(user => 
        user.id === userId ? { ...user, isFollowing: true } : user
      ));
    } catch (error) {
      console.error('Follow error:', error);
    }
  };

  return (
    <Box p={4}>
      <Heading mb={4}>Все пользователи</Heading>
      <VStack spacing={4}>
        {users.map(user => (
          <Box key={user.id} w="100%" p={4} borderWidth="1px" borderRadius="md">
            {user.username}
            <Button 
              ml={4}
              colorScheme={user.isFollowing ? 'gray' : 'brand'}
              onClick={() => handleFollow(user.id)}
              disabled={user.isFollowing}
            >
              {user.isFollowing ? 'Подписан' : 'Подписаться'}
            </Button>
          </Box>
        ))}
      </VStack>
    </Box>
  );
}