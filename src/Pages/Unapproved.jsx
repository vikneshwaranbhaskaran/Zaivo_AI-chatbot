import React from 'react';
import { Box, Heading, Text, Button, VStack, Center } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

export default function Unapproved() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    navigate('/');
  };

  return (
    <Center minH="100vh" bg="#050505" color="white">
      <VStack spacing={6} p={8} bg="whiteAlpha.100" borderRadius="2xl" border="1px solid" borderColor="whiteAlpha.200" maxW="md" textAlign="center">
        <Heading size="lg" color="red.400">Access Denied</Heading>
        <Text color="gray.400">
          Your email ID has not been approved for client access. If you believe this is a mistake, please contact support.
        </Text>
        <Button colorScheme="red" variant="outline" onClick={handleLogout}>
          Sign Out
        </Button>
      </VStack>
    </Center>
  );
}
