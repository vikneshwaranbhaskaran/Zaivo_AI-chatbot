import React from 'react';
import { Box, VStack, Heading, Text, Button, Container } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import { FiArrowRight } from 'react-icons/fi';

const PageCTA = ({ title, subtitle, btnText }) => {
  return (
    <Box bg="black" py={32} borderTop="1px solid" borderColor="whiteAlpha.100">
      <Container maxW="container.md">
        <VStack spacing={8} textAlign="center">
          <Heading size="2xl" fontWeight="900" letterSpacing="-1px">
            {title}
          </Heading>
          <Text color="gray.500" fontSize="lg">
            {subtitle}
          </Text>
          <Button 
            as={RouterLink}
            to="/contact"
            size="lg" 
            colorScheme="cyan" 
            h="70px" 
            px={12} 
            borderRadius="full"
            rightIcon={<FiArrowRight />}
            fontSize="xs"
            fontWeight="900"
            letterSpacing="0.3em"
          >
            {btnText || "REQUEST_SYSTEM_AUDIT"}
          </Button>
        </VStack>
      </Container>
    </Box>
  );
};

export default PageCTA;