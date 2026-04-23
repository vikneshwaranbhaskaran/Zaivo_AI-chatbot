import React from 'react';
import { Box, Container, SimpleGrid, Heading, Text, Badge, Stack, Icon, Center, Square, Flex } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { FiGlobe, FiNavigation } from 'react-icons/fi';

const GlobalTopology = () => {
  return (
    <Box pt={24} pb={0} bg="#050505">
      <Container maxW="container.xl" px={4}>
        <SimpleGrid
          columns={{ base: 1, lg: 2 }}
          spacing={{ base: 10, lg: 20 }}
          alignItems="center"
        >
          {}
          <Stack spacing={8} align={{ base: "center", md: "start" }} textAlign={{ base: "center", md: "left" }}>
            <Badge colorScheme="cyan" variant="solid" px={3} w="fit-content">NETWORK AXIS</Badge>
            <Heading size="2xl" color="white" lineHeight="1.1">
              The Universal <br/> Topology.
            </Heading>
            <Text fontSize="lg" color="gray.400">
              Connecting the Global North's strategy with the Global South's execution power
              through the **Techygramam Hub**.
            </Text>
          </Stack>

          {}
          <Box
            position="relative"
            h={{ base: "300px", md: "450px" }}
            bg="#0f0f0f"
            borderRadius="3xl"
            border="1px solid"
            borderColor="whiteAlpha.300"
            overflow="hidden"
          >
            {}
            <Box
              position="absolute" top={0} left={0} w="full" h="full" opacity={0.2}
              bgImage="linear-gradient(to right, #333 1px, transparent 1px), linear-gradient(to bottom, #333 1px, transparent 1px)"
              bgSize="40px 40px"
            />

            {}
            <Center h="full" opacity={0.15}>
              <Icon as={FiGlobe} w="320px" h="320px" color="white" />
            </Center>

            {}
            <Box position="absolute" top="70%" left="72%" transform="translate(-50%, -50%)">
              {}
              <motion.div
                animate={{ scale: [1, 2, 1], opacity: [0.6, 0.2, 0.6] }}
                transition={{ duration: 3, repeat: Infinity }}
                style={{
                  width: '60px', height: '60px',
                  backgroundColor: 'rgba(0, 255, 255, 0.4)',
                  borderRadius: '50%',
                  position: 'absolute',
                  top: '-22px', left: '-22px'
                }}
              />

              {}
              <Square size="16px" bg="cyan.400" borderRadius="xs" transform="rotate(45deg)" boxShadow="0 0 25px #00FFFF" />

              <Text
                fontSize="11px" color="cyan.400" mt={8} fontWeight="900"
                letterSpacing="0.2em" whiteSpace="nowrap" textShadow="0 0 10px black"
              >
                TECHYGRAMAM_HUB
              </Text>
            </Box>

            {}
            <Box position="absolute" top={6} right={6}>
                <Icon as={FiNavigation} color="cyan.400" transform="rotate(45deg)" boxSize={5} />
            </Box>
          </Box>
        </SimpleGrid>
      </Container>
    </Box>
  );
};

export default GlobalTopology;