'use client'

import { observer } from "mobx-react-lite";
import { Box } from "@chakra-ui/react";
import { useState } from "react";
import { FeedPageStore } from "./FeedPage.store";
import dynamic from "next/dynamic";
import SearchPage from "../search/page";

const DynamicFeed = dynamic(() => import('../scr/entities/Feed/Feed'), {
    ssr: false,
    loading: () => <p>Loading...</p>
})

const DynamicNewPost = dynamic(() => import('../scr/entities/NewPost/NewPost'), {
    ssr: false
})


const FeedPageComponent = () => {
    const [store] = useState(() => new FeedPageStore())

    return (
        <Box p={4}>
            {store.isError && (
                <Box color="red.500" mb={4}>
                    {store.error}
                </Box>
            )}

            <SearchPage />

            <button
                onClick={() => store.setShowNewPost(true)}
                style={{
                    position: 'fixed',
                    bottom: '40px',
                    right: '40px',
                    padding: '15px 30px',
                    borderRadius: '25px',
                    background: '#3182CE',
                    color: 'white',
                    border: 'none',
                    cursor: 'pointer',
                    zIndex: 1000
                }}
            >
                Новый пост
            </button>

            {store.showNewPost && (
                <DynamicNewPost
                    onSuccess={() => {
                        store.setShowNewPost(false);
                        store.fetchPosts();
                    }}
                    onClose={() => store.setShowNewPost(false)}
                />
            )}

        </Box>
    )
}

const FeedPage = observer(FeedPageComponent)
export default FeedPage