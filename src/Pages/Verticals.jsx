import React from 'react';
import { Box, Container, Heading, Text, VStack, SimpleGrid, Flex, Button, Icon, Divider, Center } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { Link as RouterLink } from 'react-router-dom';
import { FiActivity, FiGlobe, FiTarget, FiZap, FiLayers, FiArrowRight, FiCheckCircle } from 'react-icons/fi';
import Footer from '../Components/Footer';
import ScrollReveal from '../Components/ScrollReveal';

const MotionBox = motion(Box);

const Verticals = () => {

  const environments = [
    {
      title: "Continuous Environments",
      description: "Systems that cannot stop — production, operations, execution loops.",
      zaivo: "Zaivo ensures uninterrupted flow.",
      icon: FiActivity
    },
    {
      title: "Distributed Environments",
      description: "Work across teams, locations, and systems.",
      zaivo: "Zaivo synchronizes everything.",
      icon: FiGlobe
    },
    {
      title: "High-Frequency Environments",
      description: "Rapid interactions and decision cycles.",
      zaivo: "Zaivo reduces execution latency.",
      icon: FiZap
    },
    {
      title: "Precision Environments",
      description: "Where errors are costly and consistency is critical.",
      zaivo: "Zaivo enforces structured execution.",
      icon: FiTarget
    },
    {
      title: "Scaled Environments",
      description: "Systems growing beyond human coordination.",
      zaivo: "Zaivo removes operational bottlenecks.",
      icon: FiLayers
    }
  ];

  const industries = [
    "Manufacturing",
    "Logistics & Supply Chain",
    "Retail & Commerce",
    "SaaS & Technology",
    "Healthcare",
    "Finance & Operations"
  ];

  return (
    <Box bg="#050505" color="white" minH="100vh" overflowX="hidden">

      {}
      <Box pt={{ base: 32, md: 44 }} pb={{ base: 8, md: 12 }} position="relative">
        <Box
          position="absolute"
          top="-20%"
          left="50%"
          transform="translateX(-50%)"
          w="800px"
          h="800px"
          bg="radial-gradient(circle, rgba(0, 255, 255, 0.05) 0%, rgba(0,0,0,0) 70%)"
          zIndex={0}
        />
        <Container maxW="container.xl" position="relative" zIndex={1}>
          <VStack spacing={6} align="center" textAlign="center">
            <MotionBox
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <Heading as="h1" fontSize={{ base: "4xl", md: "7xl" }} fontWeight="900" letterSpacing="-0.03em" lineHeight="1.1">
                Where Work <br/>
                Becomes a <Text as="span" color="cyan.400">System.</Text>
              </Heading>
            </MotionBox>

            <MotionBox
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <Text fontSize={{ base: "lg", md: "2xl" }} color="gray.400" maxW="3xl" mx="auto" fontWeight="400">
                Zaivo operates inside complex environments — turning fragmented workflows into continuous, self-sustaining execution.
              </Text>
            </MotionBox>

            <MotionBox
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <Text fontSize="sm" color="cyan.500" fontWeight="bold" letterSpacing="0.2em" textTransform="uppercase" mt={4}>
                Not industries. Not tools. Systems.
              </Text>
            </MotionBox>
          </VStack>
        </Container>
      </Box>

      {}
      <Box py={{ base: 8, md: 12 }} bg="whiteAlpha.50" borderY="1px solid" borderColor="whiteAlpha.100">
        <Container maxW="container.xl">
          <ScrollReveal>
            <Flex direction={{ base: "column", lg: "row" }} gap={16} align="center">
              <Box flex="1">
                <Heading fontSize={{ base: "3xl", md: "5xl" }} fontWeight="800" mb={6} lineHeight="1.2" textAlign={{ base: "center", lg: "left" }}>
                  Most software supports work.<br/>
                  <Text as="span" color="whiteAlpha.500">Zaivo replaces how it happens.</Text>
                </Heading>
              </Box>
              <Box flex="1" textAlign={{ base: "center", lg: "left" }}>
                <Text fontSize="xl" color="gray.400" lineHeight="1.8">
                  Traditional systems assist people. Zaivo restructures execution itself — removing dependency, delay, and manual coordination.
                </Text>
              </Box>
            </Flex>
          </ScrollReveal>
        </Container>
      </Box>

      {}
      <Box py={{ base: 12, md: 20 }} position="relative">
        <Container maxW="container.xl">
          <ScrollReveal>
            <VStack mb={12} textAlign="center">
              <Text color="cyan.400" fontWeight="bold" letterSpacing="0.2em" fontSize="sm" mb={4}>
                CORE CAPABILITIES
              </Text>
              <Heading fontSize={{ base: "3xl", md: "5xl" }} fontWeight="800">
                Execution Environments
              </Heading>
            </VStack>
          </ScrollReveal>

          <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={10}>
            {environments.map((env, index) => (
              <ScrollReveal key={index}>
                <Box
                  p={{ base: 6, md: 10 }}
                  bg="rgba(255, 255, 255, 0.02)"
                  border="1px solid"
                  borderColor="whiteAlpha.100"
                  borderRadius="2xl"
                  backdropFilter="blur(10px)"
                  transition="all 0.3s ease"
                  _hover={{
                    borderColor: "cyan.500",
                    transform: "translateY(-5px)",
                    boxShadow: "0 10px 30px -10px rgba(0, 255, 255, 0.1)"
                  }}
                  h="full"
                  textAlign={{ base: "center", md: "left" }}
                >
                  <Center display={{ base: "flex", md: "none" }} mb={4}>
                     <Icon as={env.icon} boxSize={8} color="cyan.400" />
                  </Center>
                  <Icon as={env.icon} boxSize={8} color="cyan.400" mb={6} display={{ base: "none", md: "block" }} />
                  <Heading fontSize="xl" mb={4} fontWeight="700">{env.title}</Heading>
                  <Text color="gray.500" mb={6} fontSize="md" minH={{ base: "auto", md: "50px" }}>
                    {env.description}
                  </Text>
                  <Divider borderColor="whiteAlpha.200" mb={4} />
                  <Flex align="center" gap={3} justify={{ base: "center", md: "start" }}>
                    <Icon as={FiArrowRight} color="cyan.400" />
                    <Text color="cyan.100" fontSize="sm" fontWeight="600">{env.zaivo}</Text>
                  </Flex>
                </Box>
              </ScrollReveal>
            ))}
          </SimpleGrid>
        </Container>
      </Box>

      {}
      <Box py={{ base: 12, md: 20 }} bg="black" position="relative" overflow="hidden">
        <Box
          position="absolute"
          right="-20%"
          bottom="-20%"
          w="600px"
          h="600px"
          bg="radial-gradient(circle, rgba(0, 255, 255, 0.05) 0%, rgba(0,0,0,0) 70%)"
        />
        <Container maxW="container.md" position="relative" zIndex={1}>
          <ScrollReveal>
            <VStack spacing={8} textAlign="center">
              <Heading fontSize={{ base: "4xl", md: "6xl" }} fontWeight="900" letterSpacing="-0.02em">
                Execution is the <br/>
                <Text as="span" color="cyan.400">only constant.</Text>
              </Heading>

              <Text fontSize="xl" color="gray.400" lineHeight="1.8">
                Industries change. Tools evolve. <br/>
                Execution remains the foundation of every system.
              </Text>

              <Text fontSize="xl" color="gray.300" lineHeight="1.8" fontWeight="500">
                Zaivo standardizes execution across environments — making systems predictable, scalable, and autonomous.
              </Text>

              <Box mt={8} p={6} border="1px solid" borderColor="whiteAlpha.100" borderRadius="xl" bg="whiteAlpha.50">
                <Text fontSize="2xl" fontWeight="bold" color="white">
                  One system. Every environment.
                </Text>
              </Box>
            </VStack>
          </ScrollReveal>
        </Container>
      </Box>

      {}
      <Box py={{ base: 12, md: 20 }} borderY="1px solid" borderColor="whiteAlpha.100">
        <Container maxW="container.xl">
          <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={20}>

            {}
            <ScrollReveal>
              <VStack align="start" spacing={6}>
                <Text color="cyan.400" fontWeight="bold" letterSpacing="0.2em" fontSize="xs">
                  DEPLOYMENT MODEL
                </Text>
                <Heading fontSize={{ base: "3xl", md: "4xl" }} fontWeight="800">
                  Zaivo doesn’t integrate. It embeds.
                </Heading>
                <Text color="gray.400" fontSize="lg" lineHeight="1.8">
                  Instead of sitting on top of your operations, Zaivo becomes part of the system — orchestrating workflows, syncing data, and driving outcomes continuously.
                </Text>
                <Text color="cyan.100" fontSize="lg" fontWeight="600" mt={4}>
                  Inside the system. Not around it.
                </Text>
              </VStack>
            </ScrollReveal>

            {}
            <ScrollReveal>
              <VStack align="start" spacing={6}>
                <Text color="cyan.400" fontWeight="bold" letterSpacing="0.2em" fontSize="xs">
                  GLOBAL SCALE
                </Text>
                <Heading fontSize={{ base: "3xl", md: "4xl" }} fontWeight="800">
                  Wherever systems operate, Zaivo runs.
                </Heading>
                <Text color="gray.400" fontSize="lg" lineHeight="1.8">
                  Across teams, infrastructures, and geographies — Zaivo ensures consistent execution without fragmentation.
                </Text>
                <Text color="cyan.100" fontSize="lg" fontWeight="600" mt={4}>
                  Built once. Runs everywhere.
                </Text>
              </VStack>
            </ScrollReveal>

          </SimpleGrid>
        </Container>
      </Box>

      {}
      <Box py={{ base: 12, md: 16 }} bg="#020202">
        <Container maxW="container.xl">
          <ScrollReveal>
            <Flex direction={{ base: "column", lg: "row" }} align="center" justify="space-between" gap={16}>
              <Box flex="1">
                <Heading fontSize={{ base: "3xl", md: "4xl" }} fontWeight="800" mb={4}>
                  Industries We Work With
                </Heading>
                <Text color="gray.500" fontSize="lg" mb={8}>
                  Applied across multiple domains where execution matters.
                </Text>
                <Text color="gray.400" fontSize="sm" fontStyle="italic">
                  And any system where execution defines outcomes.
                </Text>
              </Box>

              <Box flex="1" w="full">
                <SimpleGrid columns={{ base: 1, sm: 2 }} spacing={6}>
                  {industries.map((ind, idx) => (
                    <Flex
                      key={idx}
                      align="center"
                      p={4}
                      bg="whiteAlpha.50"
                      border="1px solid"
                      borderColor="whiteAlpha.100"
                      borderRadius="lg"
                    >
                      <Icon as={FiCheckCircle} color="cyan.400" mr={4} />
                      <Text fontWeight="600">{ind}</Text>
                    </Flex>
                  ))}
                </SimpleGrid>
              </Box>
            </Flex>
          </ScrollReveal>
        </Container>
      </Box>

      {}
      <Box pt={0} pb={{ base: 16, md: 24 }} textAlign="center" position="relative" overflow="hidden">
        <Box
          position="absolute"
          top="50%"
          left="50%"
          transform="translate(-50%, -50%)"
          w="1000px"
          h="1000px"
          bg="radial-gradient(circle, rgba(0, 255, 255, 0.03) 0%, rgba(0,0,0,0) 70%)"
          zIndex={0}
        />
        <Container maxW="container.md" position="relative" zIndex={1}>
          <ScrollReveal>
            <VStack spacing={8}>
              <Heading fontSize={{ base: "4xl", md: "6xl" }} fontWeight="900" letterSpacing="-0.02em">
                Stop managing work.<br/>
                <Text as="span" color="cyan.400">Start running systems.</Text>
              </Heading>

              <Text color="gray.400" fontSize="xl">
                Start with one workflow. Expand across everything.
              </Text>

              <Flex direction={{ base: "column", sm: "row" }} gap={4} mt={8}>
                <Button
                  as="a"
                  href="https://wa.me/919384100252?text=Hi%20Zaivo%2C%20I%27d%20like%20to%20enter%20Zaivo."
                  target="_blank"
                  rel="noopener noreferrer"
                  size="lg"
                  h={14}
                  px={8}
                  bg="white"
                  color="black"
                  _hover={{ bg: "gray.200" }}
                  fontWeight="bold"
                  fontSize="sm"
                  letterSpacing="0.1em"
                >
                  ENTER ZAIVO
                </Button>
                <Button
                  as="a"
                  href="https://wa.me/919384100252?text=Hi%20Zaivo%2C%20I%27d%20like%20to%20request%20access."
                  target="_blank"
                  rel="noopener noreferrer"
                  size="lg"
                  h={14}
                  px={8}
                  variant="outline"
                  colorScheme="cyan"
                  _hover={{ bg: "whiteAlpha.10" }}
                  fontWeight="bold"
                  fontSize="sm"
                  letterSpacing="0.1em"
                >
                  REQUEST ACCESS
                </Button>
              </Flex>
            </VStack>
          </ScrollReveal>
        </Container>
      </Box>

      <Footer />
    </Box>
  );
};

export default Verticals;