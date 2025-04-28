"use client";
import { observer } from "mobx-react-lite";
import { useParams } from "next/navigation";
import { useEffect } from "react";
import {
  Avatar,
  Box,
  Button,
  Flex,
  Heading,
  Image,
  Spinner,
  Text,
  VStack
} from "@chakra-ui/react";
import { useStore } from "../scr/lib/store/RootStore";


const UsersPage = observer(() => {
  const params = useParams();
  const id = Array.isArray(params.id) ? params.id[0] : params.id;
  const { usersPageStore } = useStore();

  useEffect(() => {
    if (id) {
      usersPageStore.fetchUser(id);
      usersPageStore.fetchCurrentUser();
    }
  }, [id]);

  if (usersPageStore.isLoading) {
    return <Spinner size="xl" mt={8} thickness="4px" color="blue.500" />;
  }

  if (usersPageStore.error) {
    return (
      <Box textAlign="center" mt={8} color="red.500">
        {usersPageStore.error}
      </Box>
    );
  }


  if (!usersPageStore.user) return null;

  return (
    <Box p={4} maxW="800px" mx="auto">



      <Flex align="center" mb={8} gap={4}>
        <Avatar
          src={usersPageStore.user.avatar_url || "/images/default-avatar.png"}
          name={usersPageStore.user.username}
          size="2xl"
          border="2px solid"
          borderColor="gray.200"
        />
        <Box flex={1}>
          <Text>Подписчиков: {usersPageStore.user?.followers_count}</Text>
          <Heading size="lg" mb={2}>
            {usersPageStore.user.username}
          </Heading>

          {usersPageStore.currentUser &&
            usersPageStore.currentUser.id !== usersPageStore.user.id && (
              <Button
                colorScheme={usersPageStore.user.is_following ? "red" : "blue"}
                onClick={() => {
                  if (!usersPageStore.user) return;
                  usersPageStore.handleFollow(usersPageStore.user.id); 
                }}
              >
                {usersPageStore.user.is_following ? "Отписаться" : "Подписаться"}
              </Button>
            )}
        </Box>
      </Flex>

      <VStack spacing={6} mt={8}>
        {usersPageStore.posts.length ? (
          usersPageStore.posts.map((post) => (
            <Box
              key={post.id}
              w="100%"
              borderWidth="1px"
              borderRadius="lg"
              p={6}
              boxShadow="md"
            >
              <Text fontSize="lg" mb={4}>
                {post.text}
              </Text>
              {post.image_url && (
                <Image
                  src={post.image_url}
                  alt="Пост"
                  borderRadius="md"
                  maxH="600px"
                  w="100%"
                  objectFit="contain"
                />
              )}
              <Text fontSize="sm" color="gray.500" mt={4}>
                Опубликовано: {new Date(post.created_at).toLocaleDateString()}
              </Text>
            </Box>
          ))
        ) : (
          <Box textAlign="center" py={8}>
            <Text fontSize="xl" color="gray.500">
              Пока нет постов
            </Text>
          </Box>
        )}
      </VStack>
    </Box>
  );
});

export default UsersPage;