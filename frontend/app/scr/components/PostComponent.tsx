
'use client'

import { observer } from "mobx-react-lite";
import { Avatar, Box, Button, Flex, Image, Text, useToast } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { IPost, IUser } from "@/app/types/types";
import CommentSection from "./CommentSection";
import { useStore } from "../lib/store/RootStore";

interface PostComponentProps {
    post: IPost;
    currentUser: IUser | null;
    onDelete?: (postId: string) => void;
    onFollow?: (userId: string) => void;
    showActions?: boolean;
}

const PostComponent = observer(({
    post,
    currentUser,
    onDelete,
    onFollow,
    showActions = true
}: PostComponentProps) => {
    const { feedStore } = useStore();
    const router = useRouter();
    const toast = useToast();


    const handleUserClick = (userId: string) => {
        router.push(`/users/${encodeURIComponent(userId)}`);
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
        >
            <Box
                w="100%"
                borderWidth="1px"
                borderRadius="lg"
                p={4}
                boxShadow="md"
                bg="whiteAlpha.900"
                mb={4}
            >
                <Flex align="center" justify="space-between" mb={4}>
                    <Flex
                        align="center"
                        cursor="pointer"
                        onClick={() => handleUserClick(post.user.id)}
                    >
                        <Avatar
                            src={post.user.avatar_url || '/images/default-avatar.png'}
                            name={post.user.username}
                            size="sm"
                            mr={2}
                        />
                        <Text fontWeight="bold">{post.user.username}</Text>
                    </Flex>

                    {showActions && (
                        <Flex gap={2}>
                            {currentUser?.id !== post.user.id && (
                                <Button
                                    size="xs"
                                    colorScheme={post.user.is_following ? 'gray' : 'blue'}
                                    onClick={() => {
                                        if (!currentUser) {
                                            toast({
                                                title: "Требуется авторизация",
                                                status: "warning",
                                                duration: 3000
                                            });
                                            return;
                                        }
                                        onFollow?.(post.user.id);
                                    }}
                                    isLoading={feedStore.isLoading}
                                >
                                    {post.user.is_following ? 'Отписаться' : 'Подписаться'}
                                </Button>
                            )}

                            {onDelete && post.user.id === currentUser?.id && (
                                <Button
                                    colorScheme="red"
                                    size="xs"
                                    onClick={() => onDelete(post.id)}
                                >
                                    Удалить
                                </Button>
                            )}
                        </Flex>
                    )}
                </Flex>


                {post.image_url && (
                    <Box position="relative">
                        <Image
                            src={post.image_url}
                            alt="Post image"
                            borderRadius="md"
                            maxH="400px"
                            w="100%"
                            objectFit="cover"
                            sx={{
                                aspectRatio: "1/1",
                                backgroundColor: "blackAlpha.100",
                            }}
                            fallbackSrc="/images/placeholder.png"
                            mb={4}
                        />
                        <Box
                            position="absolute"
                            bottom="0"
                            w="100%"
                            h="30%"
                            bgGradient="linear(to-t, blackAlpha.600, transparent)"
                        />
                    </Box>
                )}

                {post.text && (
                    <Text fontSize="md" mb={4} color="gray.700">
                        {post.text}
                    </Text>
                )}

                <Text mt={4} fontSize="sm" color="gray.500">
                    Опубликовано: {new Date(post.created_at).toLocaleDateString()}
                </Text>
                <Flex align="center" mt={4} gap={4}>
                    <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => feedStore.toggleLike(post.id)}
                        colorScheme={post.is_liked ? 'red' : 'gray'}
                    >
                        ♥ {post.likes_count}
                    </Button>

                    <CommentSection post={post} />
                </Flex>
            </Box>

        </motion.div>
    );
});

export default PostComponent;