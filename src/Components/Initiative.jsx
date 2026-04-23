import React from 'react';
import { Box, VStack, Heading, Text, Button, Link } from '@chakra-ui/react';
import { FiExternalLink } from 'react-icons/fi';

const Initiative = () => {
  return (
    <Box py={24}>
      <VStack
        spacing={8}
        align="center"
        bg="#080808"
        p={{ base: 6, md: 12 }}
        borderRadius="3xl"
        border="1px solid"
        borderColor="cyan.900"
        textAlign="center"
      >
        <Heading size="2xl" color="white">
          Beyond Business.
        </Heading>
        <Text fontSize="lg" color="gray.400" maxW="2xl">
          Zaivo proudly powers Techygramam, a social initiative connecting rural Tamil Nadu talent with global opportunities.
        </Text>
        <Button
          as={Link}
          href="https://techygramam.com"
          isExternal
          size="xs"
          colorScheme="cyan"
          variant="outline"
          rightIcon={<FiExternalLink />}
          px={4}
          h={8}
          borderRadius="xl"
          _hover={{ bg: "cyan.900", color: "white", textDecoration: "none" }}
        >
          DISCOVER TECHYGRAMAM
        </Button>
      </VStack>
    </Box>
  );
};

export default Initiative;
