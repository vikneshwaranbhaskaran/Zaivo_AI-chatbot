import React from 'react';
import {
  Box, Container, SimpleGrid, Stat, StatLabel, StatNumber,
  StatHelpText, StatArrow, VStack, Heading, Text, Badge, HStack, Icon
} from '@chakra-ui/react';
import { FiActivity, FiCpu, FiGlobe, FiZap } from 'react-icons/fi';
import IndustrialPulse from '../Components/IndustrialPulse';
import Footer from '../Components/Footer';
import ScrollReveal from '../Components/ScrollReveal';

const Terminal = () => {
  return (
    <Box bg="#020202" color="white" minH="100vh" overflowX="hidden">
      <Container maxW="container.xl" px={4} pt={{ base: 32, md: 40 }} pb={24}>
        <VStack align="center" spacing={10} mb={20} textAlign="center">
          <HStack>
            <Badge colorScheme="green" variant="solid" px={3} borderRadius="full">
              LIVE_NETWORK_STATUS: OPTIMAL
            </Badge>
            <Text fontSize="xs" color="gray.600" letterSpacing="widest">NODE_ID: ZAIVO_01_CBE</Text>
          </HStack>
          <Heading fontSize={{ base: "3xl", md: "5xl" }} fontWeight="900" letterSpacing="-2px">
            The Sovereign Terminal.
          </Heading>
        </VStack>

        {}
        <SimpleGrid columns={{ base: 1, md: 4 }} spacing={6} mb={12}>
          {[
            { label: "ACTIVE_Z-IDs", val: "14,209", icon: FiGlobe, up: true },
            { label: "LATENCY", val: "1.8ms", icon: FiZap, up: false },
            { label: "THROUGHPUT", val: "98.2%", icon: FiCpu, up: true },
            { label: "UPTIME", val: "99.99%", icon: FiActivity, up: true }
          ].map((item, i) => (
            <ScrollReveal key={i}>
              <Box p={6} bg="whiteAlpha.50" border="1px solid" borderColor="whiteAlpha.100" borderRadius="xl" h="full">
                <Stat>
                  <HStack mb={2}>
                    <Icon as={item.icon} color="cyan.400" />
                    <StatLabel color="gray.500" fontSize="xs">{item.label}</StatLabel>
                  </HStack>
                  <StatNumber color="white">{item.val}</StatNumber>
                  <StatHelpText>
                    {item.up && <StatArrow type="increase" />}
                    SYSTEM_SECURE
                  </StatHelpText>
                </Stat>
              </Box>
            </ScrollReveal>
          ))}
        </SimpleGrid>

        {}
        <ScrollReveal>
          <Box
            borderRadius="2xl"
            overflow="hidden"
            border="1px solid"
            borderColor="whiteAlpha.200"
            bg="black"
          >
             <Box p={4} bg="whiteAlpha.100" borderBottom="1px solid" borderColor="whiteAlpha.100">
               <Text fontSize="10px" fontWeight="bold" letterSpacing="widest" color="gray.500">
                 LIVE_KERNEL_LOGS
               </Text>
             </Box>
             <IndustrialPulse />
          </Box>
        </ScrollReveal>

      </Container>
      <Footer />
    </Box>
  );
};

export default Terminal;