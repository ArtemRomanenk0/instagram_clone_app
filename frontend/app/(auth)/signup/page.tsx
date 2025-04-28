'use client'

import { Box, Button, FormControl, FormLabel, Input, VStack } from "@chakra-ui/react";
import { observer } from "mobx-react-lite";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { SignUpPageStore } from "./SignUpPage.store";


const SignUpPageComponent = () => {
    const [store] = useState(() => new SignUpPageStore())
    const router = useRouter()

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        try {
            await store.submit(e, () => router.push('/feed'));
        } catch (error) {
            // Обработка ошибки уже в компоненте
        }
    };

    return (
        <Box maxW="md" mx="auto" mt={10} p={4}>
            <form onSubmit={handleSubmit}>
                <VStack spacing={4}>
                    <FormControl>
                        <FormLabel>Username</FormLabel>
                        <Input
                            value={store.username}
                            onChange={(e) => store.handleChangeUsername(e)}
                            required
                        />
                    </FormControl>

                    <FormControl>
                        <FormLabel>Email</FormLabel>
                        <Input
                            type="email"
                            value={store.email}
                            onChange={(e) => store.handleChangeEmail(e)}
                            required
                        />
                    </FormControl>

                    <FormControl>
                        <FormLabel>Password</FormLabel>
                        <Input
                            type="password"
                            value={store.password}
                            onChange={(e) => store.handleChangePassword(e)}
                            required
                        />
                    </FormControl>

                    <Button type="submit" colorScheme="brand" width="full">
                        Sign Up
                    </Button>

                    <Button
                        variant="link"
                        onClick={() => router.push('/login')}
                    >
                        Already have an account? Login
                    </Button>
                </VStack>
            </form>
        </Box>
    )
}

const RegisterPage = observer(SignUpPageComponent)
export default RegisterPage