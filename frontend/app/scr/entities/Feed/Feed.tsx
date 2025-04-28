'use client'
import { observer } from "mobx-react-lite";
import { VStack, Flex, Spinner, Text } from "@chakra-ui/react";

import { useEffect } from "react";
import PostComponent from "../../components/PostComponent";
import { useStore } from "../../lib/store/RootStore";

interface IFeedProps {
    endpoint: string;
    showFollowButton?: boolean;
    showDeleteButton?: boolean;
    onPostDelete?: () => void;
}

const Feed = observer(({
    endpoint,
    showFollowButton = true,
    showDeleteButton = true,
    onPostDelete
}: IFeedProps) => {
    const { feedStore } = useStore();

    useEffect(() => {
        feedStore.fetchPosts(endpoint)
        feedStore.fetchCurrentUser();;
    }, [endpoint]);

    if (feedStore.isLoading) {
        return (
            <Flex justify="center" mt={8}>
                <Spinner size="xl" thickness='4px' color='blue.500' />
            </Flex>
        );
    }

    if (feedStore.error) {
        return (
            <Text color="red.500" textAlign="center" mt={4}>
                {feedStore.error}
            </Text>
        );
    }

    if (!feedStore.posts?.length) {
        return (
            <Text textAlign="center" mt={4}>
                Постов пока нет
            </Text>
        );
    }

    console.log(feedStore.user)
    return (
        <VStack spacing={6} w="100%">

            {feedStore.posts && feedStore.posts.map(post => (
                <PostComponent
                    key={post.id}
                    post={post}
                    currentUser={feedStore.user}
                    onDelete={showDeleteButton ? () => feedStore.handleDelete(post.id, onPostDelete) : undefined}
                    onFollow={showFollowButton ? () => feedStore.handleFollow(post.user.id) : undefined}
                    showActions={showFollowButton || showDeleteButton}
                />
            ))}
        </VStack>
    );
});

export default Feed;