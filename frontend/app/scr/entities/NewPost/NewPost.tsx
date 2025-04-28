import { observer } from "mobx-react-lite";
import { Box, Button, Flex, FormControl, FormLabel, Input, Textarea, useToast } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { NewPostStore } from "./NewPost.store";


const NewPostComponent = (
    { onSuccess, onClose }:
        {
            onSuccess: () => void
            onClose: () => void
        }) => {
    const [store] = useState(() => new NewPostStore())
    const toast = useToast()

    useEffect(() => {
        if (store.reqStatus === 201) {
            toast({ title: 'Пост создан!', status: 'success' });
            onSuccess();
            store.reqStatus = null;
            onClose();
        } else if (store.reqStatus === 500) {
            toast({ title: 'Ошибка!', status: 'error' });
            store.reqStatus = null;
        }
    }, [store.reqStatus, onSuccess, onClose]);
    return (
        <Box
            position="fixed"
            top="50%"
            left="50%"
            transform="translate(-50%, -50%)"
            bg="white"
            p={6}
            borderRadius="lg"
            boxShadow="xl"
            zIndex={1000}
        >
            <form onSubmit={store.submit}>
                <FormControl mb={4}>
                    <FormLabel>Текст поста</FormLabel>
                    <Textarea
                        value={store.text}
                        onChange={store.handleChangeText}
                        placeholder="Что у вас нового?"
                        size="md"
                        resize="vertical"
                        width="400px"
                    />
                </FormControl>

                <FormControl mb={4}>
                    <FormLabel>Изображение</FormLabel>
                    <Input
                        type="file"
                        accept="image/*"
                        onChange={store.handleChangeImage}
                        p={1}
                    />
                </FormControl>

                <Flex justify="flex-end" gap={3}>
                    <Button onClick={onClose}>Отмена</Button>
                    <Button
                        type="submit"
                        onClick={() => console.log('Current store state:', store)}
                        colorScheme="blue"
                        isLoading={store.isLoading}
                        loadingText="Публикация..."
                    >
                        Опубликовать
                    </Button>
                </Flex>
            </form>
        </Box>
    )
}

const NewPost = observer(NewPostComponent)
export default NewPost;