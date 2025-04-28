'use client'

import { observer } from "mobx-react-lite";
import { Box, Button, FormControl, FormLabel, Input, VStack } from "@chakra-ui/react";
import { useState, useEffect, FormEvent } from "react";
import { LoginPageStore } from "./LoginPage.store";
import { useRouter } from "next/navigation";

const LoginPageComponent = () => {
    const [store] = useState(() => new LoginPageStore())
    const router = useRouter();

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        try {
            await store.submit(e, () => router.push('/feed'));
        } catch (error) {
            // Обработка ошибки уже в компоненте
        }
    };


    useEffect(() => {
        store.statusReq === 200 ? router.push("/feed") : router.push("/login");
    }, [store.statusReq])

    return (
        <Box maxW="md" mx="auto" mt={10} p={4}>
            <form onSubmit={handleSubmit}>
                <VStack spacing={4}>
                    <FormControl>
                        <FormLabel>Email</FormLabel>
                        <Input
                            type="email"
                            value={store.email}
                            onChange={store.setEmail}
                            required
                        />
                    </FormControl>

                    <FormControl>
                        <FormLabel>Password</FormLabel>
                        <Input
                            type="password"
                            value={store.password}
                            onChange={store.setPassword}
                            required
                        />
                    </FormControl>

                    <Button type="submit" colorScheme="blue" width="full">
                        Sign In
                    </Button>
                </VStack>
            </form>
        </Box>
    )
}

const LoginPage = observer(LoginPageComponent);
export default LoginPage;

