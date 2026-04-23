import React from 'react';
import { Box, VStack, Heading, Text, Stack, Badge, Divider } from '@chakra-ui/react';

const CaseStudy = () => {
  return (
    <Box py={24}>
      <VStack spacing={12} align="center">
        <Heading size="2xl" color="white" textAlign="center" px={4}>
          Proven in the Field.
        </Heading>

        <Stack direction={{ base: "column", lg: "row" }} spacing={8} w="full">
          {}
          <Box
            flex={1}
            bg="#080808"
            border="1px solid"
            borderColor="whiteAlpha.100"
            _hover={{ borderColor: "cyan.400" }}
            borderRadius="2xl"
            p={{ base: 6, md: 10 }}
            transition="all 0.3s"
          >
            <VStack align={{ base: "center", md: "start" }} spacing={6} textAlign={{ base: "center", md: "left" }}>
              <Badge colorScheme="cyan" variant="solid" px={3} py={1}>
                TIRUPPUR_AXIS // TEXTILE
              </Badge>
              <Heading size="md" color="white">ThreadCo Manufacturing</Heading>
              <Text fontSize={{ base: "3xl", md: "4xl" }} fontWeight="900" color="cyan.400">43% reduction</Text>
              <Text fontSize="sm" color="gray.500" fontWeight="bold">in inventory leakage.</Text>
              <Divider borderColor="whiteAlpha.200" />
              <Text color="gray.400" fontSize="sm" lineHeight="tall">
                Integrated Z-ID smart labels across 12 production lines. Real-time supply chain visibility achieved within 72 hours of deployment.
              </Text>
              <Badge colorScheme="green" variant="outline" px={2} mt={4}>
                CASE_CLOSED // VERIFIED
              </Badge>
            </VStack>
          </Box>

          {}
          <Box
            flex={1}
            bg="#080808"
            border="1px solid"
            borderColor="whiteAlpha.100"
            _hover={{ borderColor: "cyan.400" }}
            borderRadius="2xl"
            p={{ base: 6, md: 10 }}
            transition="all 0.3s"
          >
            <VStack align={{ base: "center", md: "start" }} spacing={6} textAlign={{ base: "center", md: "left" }}>
              <Badge colorScheme="cyan" variant="solid" px={3} py={1}>
                COIMBATORE_HUB // ENGINEERING
              </Badge>
              <Heading size="md" color="white">PrecisionTech Industries</Heading>
              <Text fontSize={{ base: "3xl", md: "4xl" }} fontWeight="900" color="cyan.400">2.1ms avg.</Text>
              <Text fontSize="sm" color="gray.500" fontWeight="bold">response latency.</Text>
              <Divider borderColor="whiteAlpha.200" />
              <Text color="gray.400" fontSize="sm" lineHeight="tall">
                Edge orchestration nodes deployed across 8 CNC machines. Zero unplanned downtime recorded in 90-day post-deployment window.
              </Text>
              <Badge colorScheme="green" variant="outline" px={2} mt={4}>
                CASE_CLOSED // VERIFIED
              </Badge>
            </VStack>
          </Box>
        </Stack>
      </VStack>
    </Box>
  );
};

export default CaseStudy;
