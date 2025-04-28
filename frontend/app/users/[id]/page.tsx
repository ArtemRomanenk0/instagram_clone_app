
'use client'
import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { Box, Button, Heading, Spinner } from '@chakra-ui/react'
import { useStore } from '@/app/scr/lib/store/RootStore'
import UsersPage from '../page'
import NextLink from 'next/link'

export default function ProfilePage() {
  const { id } = useParams();
  const { authStore } = useStore();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      await authStore.fetchCurrentUser();
      await authStore.fetchViewedUser(id.toString());
      setIsLoading(false);
    };
    loadData();
  }, [id]);

  if (isLoading) return <Spinner />;

  const isMyProfile = authStore.currentUser?.id.toString() === id.toString();
  const username = authStore.viewedUser?.username || "";

  return (
    <Box p={4}>
      <Button
        as={NextLink}
        href="/feed"
        colorScheme="brand"
      >
        Назад
      </Button>
      <Heading mb={6}>
        {isMyProfile
          ? 'Мой аккаунт'
          : `Профиль ${username}`}
      </Heading>

      <UsersPage />
    </Box>
  )
}