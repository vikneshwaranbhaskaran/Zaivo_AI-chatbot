import React from 'react';
import { 
  Box, Container, Heading, Text, SimpleGrid, VStack, HStack, 
  Circle, Divider, Badge, Icon, Stack, Flex 
} from '@chakra-ui/react';
import { FiCpu, FiShield, FiShare2, FiDatabase, FiLayers } from 'react-icons/fi';
import PageCTA from '../Components/PageCTA';
import Footer from '../Components/Footer';

const Protocol = () => {
  const technicalSpecs = [
    {
      icon: FiCpu,
      title: "The Z-ID Engine",
      desc: "Every physical asset is assigned a unique cryptographic Digital ID. This isn't a serial number; it's a live data-container."
    },
    {
      icon: FiLayers,
      title: "Orchestration Layer",
      desc: "Our Kernel manages the flow between hardware (PLC/Sensors) and the cloud, ensuring sub-2ms latency in industrial environments."
    },
    {
      icon: FiShield,
      title: "Sovereign Security",
      desc: "Built on a private node architecture. Your factory data never leaves your infrastructure unless you authorize the bridge."
    }
  ];

  return (
    <Box bg="#050505" color="white" minH="100vh" pt={40}>
      <Container maxW="container.xl">
        
        {/* HERO SECTION: THE LOGIC */}
        <Stack direction={{ base: "column", lg: "row" }} spacing={20} mb={40} align="center">
          <VStack align="start" flex={1} spacing={8}>
            <Badge colorScheme="cyan" variant="outline" px={3} letterSpacing="0.4em">
              SYSTEM_ARCHITECTURE
            </Badge>
            <Heading size="3xl" fontWeight="900" lineHeight="1.1">
              The <Text as="span" color="cyan.400">Z-ID</Text> Protocol.
            </Heading>
            <Text fontSize="xl" color="gray.400" lineHeight="tall">
              Zaivo OS isn't just software; it's a universal language for industry. 
              We translate physical motion into digital intelligence using our proprietary 
              Z-ID identity layer.
            </Text>
          </VStack>
          
          <Box flex={1} position="relative">
            <Box 
              p={10} 
              bgGradient="linear(to-br, whiteAlpha.100, transparent)" 
              borderRadius="3xl" 
              border="1px solid" 
              borderColor="whiteAlpha.200"
            >
              <VStack align="start" spacing={6}>
                <HStack color="cyan.400">
                  <Icon as={FiDatabase} />
                  <Text fontWeight="bold" fontSize="xs" letterSpacing="widest">DATA_PACKET_0882</Text>
                </HStack>
                <Divider borderColor="whiteAlpha.200" />
                <Text fontFamily="mono" fontSize="sm" color="gray.500">
                  {`{ "asset_id": "Z-ID_UNIT_9", "status": "active", "throughput": "98.2%", "location": "Node_CBE_Factory" }`}
                </Text>
              </VStack>
            </Box>
          </Box>
        </Stack>

        {/* THREE PILLARS OF THE PROTOCOL */}
        <SimpleGrid columns={{ base: 1, md: 3 }} spacing={12} mb={40}>
          {technicalSpecs.map((spec, i) => (
            <VStack key={i} align="start" p={8} bg="whiteAlpha.50" borderRadius="2xl" transition="0.3s" _hover={{ bg: "whiteAlpha.100", transform: "translateY(-5px)" }}>
              <Circle size="50px" bg="cyan.900" color="cyan.400" mb={4}>
                <Icon as={spec.icon} boxSize={5} />
              </Circle>
              <Heading size="md" mb={2}>{spec.title}</Heading>
              <Text color="gray.500" fontSize="sm" lineHeight="tall">
                {spec.desc}
              </Text>
            </VStack>
          ))}
        </SimpleGrid>

        {/* VISUAL ANALOGY SECTION */}
        <Flex 
          direction="column" 
          align="center" 
          textAlign="center" 
          mb={40} 
          p={20} 
          borderRadius="3xl" 
          bgGradient="radial(circle, cyan.900 0%, transparent 70%)"
        >
          <Heading mb={6}>Bridging the Physical & Digital.</Heading>
          <Text maxW="2xl" color="gray.400" fontSize="lg">
            Our protocol connects your existing heavy machinery to your smartphone. 
            No complex rewiring. No downtime. Just pure industrial sovereignty.
          </Text>
        </Flex>

      </Container>

      {/* CALL TO ACTION */}
      <PageCTA 
        title="Ready to Deploy?" 
        subtitle="Schedule a technical walkthrough of the Zaivo Kernel with our lead architects." 
        btnText="INITIATE_PROTOCOL"
      />
      
      <Footer />
    </Box>
  );
};

export default Protocol;