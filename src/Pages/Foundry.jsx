import React from 'react';
import { Box, Container, Heading, Text, SimpleGrid, VStack, HStack, Circle, Divider, Badge, Stack, Image } from '@chakra-ui/react';
import { FiTool, FiZap, FiTarget, FiUsers } from 'react-icons/fi';
import { motion } from 'framer-motion';
import Footer from '../Components/Footer';
import ScrollReveal from '../Components/ScrollReveal';

const MotionBox = motion(Box);
const MotionVStack = motion(VStack);

const Foundry = () => {
  const processSteps = [
    {
      step: "01",
      title: "Diagnostic Audit",
      desc: "We enter the physical space. We identify the manual 'leakage' points in your current workflow."
    },
    {
      step: "02",
      title: "Digital Blueprint",
      desc: "Architecting the Z-ID structure and mapping your physical assets to the Zaivo Kernel."
    },
    {
      step: "03",
      title: "Forge & Deploy",
      desc: "Our engineering hub in Tamil Nadu builds the custom orchestration layers for your specific hardware."
    }
  ];

  return (
    <Box bg="#050505" color="white" minH="100vh" overflowX="hidden">
      <Container maxW="container.xl" px={4} pt={{ base: 32, md: 40 }} pb={24}>

        {}
        <MotionVStack
          align="center" spacing={8} textAlign="center" mb={{ base: 16, md: 32 }}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <MotionBox initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <Badge colorScheme="cyan" variant="outline" px={3} py={1} letterSpacing="0.4em">THE_FOUNDRY</Badge>
          </MotionBox>
          <MotionBox initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.15 }}>
            <Heading as="h1" fontSize={{ base: "3xl", md: "5xl" }} fontWeight="900" letterSpacing="-2px" maxW="4xl">
              Forging the <Text as="span" color="cyan.400">Digital Tools</Text> of Sovereignty.
            </Heading>
          </MotionBox>
          <MotionBox initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.3 }}>
            <Text fontSize="xl" color="gray.500" maxW="4xl" lineHeight="tall">
              Zaivo is built at the intersection of local industrial wisdom and global software excellence.
              Located in the South Asian industrial belt, our engineering foundry specializes in building
              the custom orchestration layers that connect physical machinery to the Zaivo Kernel.
              We are the craftsmen behind the automation, ensuring every deployment is tailored to
              the specific hardware and workflow of your facility.
            </Text>
          </MotionBox>
        </MotionVStack>

        {}
        <SimpleGrid columns={{ base: 1, md: 3 }} spacing={{ base: 10, md: 16 }} mb={{ base: 20, md: 40 }}>
          {processSteps.map((item, idx) => (
            <ScrollReveal key={idx}>
              <VStack align={{ base: "center", md: "start" }} spacing={6} h="full" textAlign={{ base: "center", md: "left" }}>
                <Text fontSize="6xl" fontWeight="900" color="whiteAlpha.100" lineHeight="1">{item.step}</Text>
                <Heading size="md" color="cyan.400">{item.title}</Heading>
                <Text color="gray.500" lineHeight="tall">{item.desc}</Text>
              </VStack>
            </ScrollReveal>
          ))}
        </SimpleGrid>

        {}
        <ScrollReveal>
          <Box p={{ base: 6, md: 16 }} bg="whiteAlpha.50" borderRadius="3xl" border="1px solid" borderColor="whiteAlpha.100">
            <Stack direction={{ base: "column", lg: "row" }} spacing={20} align="center">
              <VStack align={{ base: "center", md: "start" }} flex={1} spacing={6} textAlign={{ base: "center", md: "left" }}>
                <Heading size="xl">The Techygramam Hub.</Heading>
                <Text color="gray.400" fontSize="lg">
                  Based in the heart of the South Asian industrial belt, our hub acts as the
                  R&D center for Zaivo OS. We specialize in React, Node.js, and IoT integration.
                </Text>
                <HStack spacing={8} justify={{ base: "center", md: "start" }}>
                  <VStack align="start">
                    <Text fontWeight="bold" fontSize="2xl">100%</Text>
                    <Text fontSize="xs" color="gray.600">IN-HOUSE DEV</Text>
                  </VStack>
                  <VStack align="start">
                    <Text fontWeight="bold" fontSize="2xl">24/7</Text>
                    <Text fontSize="xs" color="gray.600">SYSTEM OPS</Text>
                  </VStack>
                </HStack>
              </VStack>

              <Box flex={1} position="relative">
                <SimpleGrid columns={2} spacing={3}>
                    <Box position="relative" overflow="hidden" borderRadius="xl" transition="all 0.4s ease" _hover={{ transform: "scale(1.03)", boxShadow: "0 0 25px rgba(0,255,255,0.2)", border: "1px solid", borderColor: "cyan.400" }}>
                      <Image
                        src="/zaivo_team_office.png"
                        alt="Zaivo Hub Team"
                        borderRadius="xl"
                        h="180px"
                        w="full"
                        objectFit="cover"
                        filter="grayscale(0.2) contrast(1.1)"
                        transition="all 0.4s ease"
                        _hover={{ filter: "grayscale(0) contrast(1.2)" }}
                        loading="lazy"
                        htmlWidth="400"
                        htmlHeight="180"
                      />
                      <Badge position="absolute" top={2} right={2} colorScheme="cyan" variant="solid" fontSize="8px">HUB_FRONT_OFFICE</Badge>
                    </Box>
                    <Box position="relative" mt={8} overflow="hidden" borderRadius="xl" transition="all 0.4s ease" _hover={{ transform: "scale(1.03)", boxShadow: "0 0 25px rgba(0,255,255,0.2)", border: "1px solid", borderColor: "cyan.400" }}>
                      <Image
                        src="https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?auto=format&fit=crop&q=80&w=800"
                        alt="Hardware Engineering"
                        borderRadius="xl"
                        h="180px"
                        w="full"
                        objectFit="cover"
                        transition="all 0.4s ease"
                        _hover={{ filter: "brightness(1.15)" }}
                        loading="lazy"
                        htmlWidth="400"
                        htmlHeight="180"
                      />
                      <Badge position="absolute" top={2} right={2} colorScheme="orange" variant="solid" fontSize="8px">HARDWARE_LAB</Badge>
                    </Box>
                    <Box position="relative" overflow="hidden" borderRadius="xl" transition="all 0.4s ease" _hover={{ transform: "scale(1.03)", boxShadow: "0 0 25px rgba(0,255,255,0.2)", border: "1px solid", borderColor: "cyan.400" }}>
                      <Image
                        src="/zaivo_industrial_facility.png"
                        alt="Active Deployment"
                        borderRadius="xl"
                        h="180px"
                        w="full"
                        objectFit="cover"
                        filter="grayscale(0.2) contrast(1.1)"
                        transition="all 0.4s ease"
                        _hover={{ filter: "grayscale(0) contrast(1.2)" }}
                        loading="lazy"
                        htmlWidth="400"
                        htmlHeight="180"
                      />
                      <Badge position="absolute" top={2} right={2} colorScheme="cyan" variant="solid" fontSize="8px">DEPLOYMENT_NODE</Badge>
                    </Box>
                    <Box position="relative" mt={8} overflow="hidden" borderRadius="xl" transition="all 0.4s ease" _hover={{ transform: "scale(1.03)", boxShadow: "0 0 25px rgba(0,255,255,0.2)", border: "1px solid", borderColor: "cyan.400" }}>
                      <Image
                        src="https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=800"
                        alt="Data Analytics"
                        borderRadius="xl"
                        h="180px"
                        w="full"
                        objectFit="cover"
                        transition="all 0.4s ease"
                        _hover={{ filter: "brightness(1.15)" }}
                        loading="lazy"
                        htmlWidth="400"
                        htmlHeight="180"
                      />
                      <Badge position="absolute" top={2} right={2} colorScheme="cyan" variant="solid" fontSize="8px">KERNEL_ORCHESTRATION</Badge>
                    </Box>
                </SimpleGrid>

                {}
                <Box
                  position="absolute" bottom={-4} right={4} bg="#0A0A0A" p={2}
                  borderRadius="md" border="1px solid" borderColor="cyan.900"
                  boxShadow="0 0 20px rgba(0,255,255,0.1)"
                >
                  <HStack spacing={2}>
                    <Box w={2} h={2} bg="cyan.400" borderRadius="full">
                      <motion.div style={{ width: '100%', height: '100%', background: '#00FFFF', borderRadius: '50%' }} animate={{ opacity: [1, 0, 1] }} transition={{ duration: 1.5, repeat: Infinity }} />
                    </Box>
                    <Text fontSize="8px" fontWeight="900" color="cyan.400" letterSpacing="widest">FORGE_MODE: ACTIVE</Text>
                  </HStack>
                </Box>
              </Box>
            </Stack>
          </Box>
        </ScrollReveal>

      </Container>
      <Footer />
    </Box>
  );
};

export default Foundry;