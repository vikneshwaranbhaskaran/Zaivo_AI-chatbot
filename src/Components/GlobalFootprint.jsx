import React from 'react';
import {
  Box, SimpleGrid, Heading, Text, Badge,
  Stack, Icon, Center, Flex
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { FiGlobe, FiActivity } from 'react-icons/fi';

const MotionBox = motion(Box);

// Helper Component for the Pulsing Nodes on the Map
const MapNode = ({ top, left, label, isHub }) => (
  <Box position="absolute" top={top} left={left} transform="translate(-50%, -50%)" zIndex={2}>
    <motion.div
      animate={{
        scale: isHub ? [1, 2.2, 1] : [1, 1.6, 1],
        opacity: [0.6, 0.1, 0.6]
      }}
      transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      style={{
        width: isHub ? '40px' : '20px',
        height: isHub ? '40px' : '20px',
        backgroundColor: isHub ? '#00FFFF' : '#4A5568',
        borderRadius: '50%',
        position: 'absolute',
      }}
    />
    <Box
      w={isHub ? "12px" : "8px"}
      h={isHub ? "12px" : "8px"}
      bg={isHub ? "cyan.400" : "gray.500"}
      borderRadius="full"
      boxShadow={isHub ? "0 0 15px #00FFFF" : "none"}
    />
    <Text
      fontSize="9px"
      color={isHub ? "cyan.400" : "gray.500"}
      mt={4}
      fontWeight="900"
      letterSpacing="0.2em"
      whiteSpace="nowrap"
      textShadow="0 0 10px black"
    >
      {label}
    </Text>
  </Box>
);

const GlobalFootprint = () => {
  return (
    <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={20} alignItems="center" py={20}>

      {}
      <Stack spacing={8}>
        <Badge w="fit-content" colorScheme="cyan" variant="outline" px={3} letterSpacing="widest">
          NETWORK TOPOLOGY
        </Badge>
        <Heading size="2xl" letterSpacing="tight" lineHeight="1.1">
          The Universal Axis of <br />
          <Text as="span" color="cyan.400">Global Execution.</Text>
        </Heading>
        <Text fontSize="lg" color="gray.400" lineHeight="tall">
          Zaivo operates at the intersection of four global forces. We bridge the North's capital,
          the West's innovation, and the East's growth to our Southern execution engine:
          <strong> Techygramam.</strong>
        </Text>

        <SimpleGrid columns={2} spacing={8} pt={4}>
          <Box borderLeft="2px solid" borderColor="cyan.400" pl={4}>
            <Text fontWeight="900" fontSize="xs" color="gray.600" mb={1}>STRATEGY & CAPITAL</Text>
            <Text fontSize="sm" color="white">North / West Axis</Text>
          </Box>
          <Box borderLeft="2px solid" borderColor="orange.400" pl={4}>
            <Text fontWeight="900" fontSize="xs" color="gray.600" mb={1}>EXECUTION & SCALE</Text>
            <Text fontSize="sm" color="white">South / East Axis</Text>
          </Box>
        </SimpleGrid>
      </Stack>

      {}
      <Box
        position="relative"
        h={{ base: "400px", md: "500px" }}
        bg="gray.900"
        borderRadius="3xl"
        border="1px solid"
        borderColor="whiteAlpha.100"
        overflow="hidden"
        boxShadow="inset 0 0 100px rgba(0,0,0,0.8)"
      >
        {}
        <Center h="full" opacity={0.03}>
          <Icon as={FiGlobe} w="full" h="450px" color="white" />
        </Center>

        {}
        <MapNode top="25%" left="35%" label="NORTH_CAPITAL" isHub={false} />

        {}
        <MapNode top="40%" left="15%" label="WEST_INNOVATION" isHub={false} />

        {}
        <MapNode top="65%" left="70%" label="TECHYGRAMAM_HUB (SOUTH)" isHub={true} />

        {}
        <MapNode top="35%" left="85%" label="EAST_GROWTH" isHub={false} />

        {}
        <svg viewBox="0 0 100 100" width="100%" height="100%" style={{ position: 'absolute', top: 0, left: 0, pointerEvents: 'none', zIndex: 1 }}>
          {}
          <motion.path
            d="M 35 25 Q 55 45 70 65"
            fill="transparent"
            stroke="#00FFFF"
            strokeWidth="0.5"
            strokeDasharray="4,8"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 0.4 }}
            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
          />
          {}
          <motion.path
            d="M 15 40 Q 40 60 70 65"
            fill="transparent"
            stroke="#00FFFF"
            strokeWidth="0.5"
            strokeDasharray="4,8"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 0.4 }}
            transition={{ duration: 6, repeat: Infinity, ease: "linear", delay: 1 }}
          />
        </svg>

        {}
        <Flex
          position="absolute" bottom={6} left={6} align="center"
          bg="blackAlpha.700" px={3} py={1} borderRadius="full" border="1px solid" borderColor="whiteAlpha.200"
        >
          <Icon as={FiActivity} color="cyan.400" mr={2} />
          <Text fontSize="xs" color="gray.300" fontWeight="bold">SYNCHRONIZED</Text>
        </Flex>
      </Box>
    </SimpleGrid>
  );
};

export default GlobalFootprint;