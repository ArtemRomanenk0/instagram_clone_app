// components/SearchPage.tsx
'use client'
import { observer } from "mobx-react-lite";
import { Box, Button, Collapse, Input, VStack, Text } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { useDebounce } from "../scr/hooks/useDebounce";

import { useStore } from "../scr/lib/store/RootStore";
import Feed from "../scr/entities/Feed/Feed";

const SearchPage = observer(() => {
    const { feedStore } = useStore();
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const debouncedQuery = useDebounce(searchQuery, 500);


    const getEndpoint = () => {
        return isSearchOpen && debouncedQuery.trim()
            ? `/api/v1/search/posts?query=${encodeURIComponent(debouncedQuery)}`
            : '/api/v1/posts';
    };

    useEffect(() => {
        feedStore.fetchPosts(getEndpoint());
    }, [debouncedQuery, isSearchOpen]);

    return (
        <Box p={4}>
            <Button
                onClick={() => {
                    setIsSearchOpen(!isSearchOpen);
                    if (!isSearchOpen) setSearchQuery('');
                }}
                mb={4}
            >
                {isSearchOpen ? 'Скрыть поиск' : 'Поиск'}
            </Button>

            <Collapse in={isSearchOpen}>
                <VStack spacing={4} mb={6}>
                    <Input
                        placeholder="Введите запрос"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        size="lg"
                    />
                </VStack>
            </Collapse>

            <Feed
                endpoint={getEndpoint()}
                showFollowButton={true}
                showDeleteButton={true}
            />
        </Box>
    );
});

export default SearchPage;