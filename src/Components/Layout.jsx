import React from 'react';
import { Box, Container } from '@chakra-ui/react';

const Layout = ({ children }) => {
  return (
    <Box bg="#050505" minH="100vh">
      <Box as="main" pt={{ base: "120px", md: "160px" }} pb={20}>
        <Container maxW="container.xl" px={10}>
          {children}
        </Container>
      </Box>
    </Box>
  );
};

export default Layout;