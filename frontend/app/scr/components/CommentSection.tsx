'use client'
import { observer } from "mobx-react-lite";
import { Box, Button, Flex, Input, Text, VStack, Skeleton } from "@chakra-ui/react";
import { useState } from "react";
import { useStore } from "../lib/store/RootStore";
import { IPost } from "@/app/types/types";

const CommentSection = observer(({ post }: { post: IPost }) => {
  const { feedStore } = useStore();
  const [commentText, setCommentText] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentText.trim()) return;
    setIsLoading(true);
    try {
      await feedStore.addComment(post.id, commentText.trim());
      setCommentText('');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box w="100%" mt={4}>
      <form onSubmit={handleSubmit}>
        <Flex gap={2}>
          <Input
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            placeholder="Добавить комментарий..."
            size="sm"
            isDisabled={isLoading}
          />
          <Button
            type="submit"
            size="sm"
            colorScheme="blue"
            isLoading={isLoading}
            loadingText="Отправка..."
          >
            Отправить
          </Button>
        </Flex>
      </form>

      <VStack align="start" spacing={2} mt={4}>
        {post.comments?.map(comment => (
          <Box key={comment.id} bg="gray.50" p={2} borderRadius="md" w="100%">
            <Flex align="center" gap={2}>
              <Text fontWeight="bold">
                {comment.user?.username || "Анонимный пользователь"}
              </Text>
              <Text fontSize="sm" color="gray.500">
                {new Date(comment.created_at).toLocaleDateString()}
              </Text>
            </Flex>
            <Text mt={1}>{comment.text}</Text>
          </Box>
        ))}

        {!post.comments?.length && (
          <Text color="gray.500" fontSize="sm">
            Пока нет комментариев
          </Text>
        )}
      </VStack>
    </Box>
  );
});

export default CommentSection;