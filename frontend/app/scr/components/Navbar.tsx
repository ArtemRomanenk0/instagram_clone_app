'use client'

import { 
  Flex, 
  Button, 
  Spacer, 
  Link,
  useColorModeValue, 
  Text
} from '@chakra-ui/react'
import NextLink from 'next/link'
import { useEffect, useState } from 'react';


export default function Navbar() {
  const bg = useColorModeValue('white', 'gray.800')
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
    setIsLoggedIn(!!localStorage.getItem('authToken'));
  }, []);
  

  return (
    <Flex 
      as="nav" 
      p={4} 
      bg={bg}
      boxShadow="md"
      position="sticky"
      top={0}
      zIndex={10}
    >
      <Link as={NextLink} href="/feed" fontWeight="bold" fontSize="xl">
        Instagram Clone
      </Link>
      <Spacer />
      {isLoggedIn ? (
        <Button 
          onClick={() => {
            localStorage.removeItem('authToken');
            window.location.href = '/login';
          }}
          colorScheme="brand"
        >
          Logout
        </Button>
      ) : (
        <>
      <Button 
        as={NextLink} 
        href="/signup" 
        colorScheme="brand"
        variant="outline"
        mr={2}
      >
        Sign Up
      </Button>
      <Button 
        as={NextLink} 
        href="/login" 
        colorScheme="brand"
      >
        Login
      </Button>
      </>
      )}
    </Flex>
  )
}