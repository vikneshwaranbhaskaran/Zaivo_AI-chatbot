import React from 'react';
import {
  Box,
  Container,
  Heading,
  Text,
  VStack,
  Flex,
  Icon,
  Divider,
  SimpleGrid,
  Link,
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { Link as RouterLink } from 'react-router-dom';
import Footer from '../Components/Footer';
import ScrollReveal from '../Components/ScrollReveal';

const MotionBox = motion(Box);

const About = () => {
  return (
    <Box bg="#050505" color="white" minH="100vh" overflowX="hidden">
     
      <Box pt={{ base: 28, md: 36 }} pb={{ base: 12, md: 24 }} position="relative">
        <Box
          position="absolute"
          top="-10%"
          left="50%"
          transform="translateX(-50%)"
          w="1000px"
          h="1000px"
          bg="radial-gradient(circle, rgba(0, 255, 255, 0.03) 0%, rgba(0,0,0,0) 70%)"
          zIndex={0}
        />
        <Container maxW="container.xl" position="relative" zIndex={1}>
          <VStack spacing={8} align={{ base: "center", md: "start" }} maxW="4xl" textAlign={{ base: "center", md: "left" }}>
            <ScrollReveal variant="fade-up">
              <Text
                color="cyan.400"
                fontWeight="900"
                fontSize="xs"
                letterSpacing="0.4em"
                textTransform="uppercase"
                mb={4}
              >
                Philosophy
              </Text>
              <Heading
                as="h1"
                fontSize={{ base: "3xl", md: "6xl" }}
                fontWeight="900"
                letterSpacing="-0.04em"
                lineHeight="1"
              >
                Before anything runs, <br/>
                <Text as="span" color="whiteAlpha.400">someone has to make it run.</Text>
              </Heading>
            </ScrollReveal>

            <ScrollReveal variant="fade-up" delay={0.2}>
              <Text fontSize={{ base: "lg", md: "2xl" }} color="gray.500" fontWeight="500" lineHeight="1.4">
                That’s how work still operates. <br/>
                <Text as="span" color="white">Dependent. Repeated. Manual.</Text>
              </Text>
            </ScrollReveal>
          </VStack>
        </Container>
      </Box>

      <Box py={{ base: 12, md: 24 }} borderY="1px solid" borderColor="whiteAlpha.100">
        <Container maxW="container.xl">
          <ScrollReveal>
            <Flex direction={{ base: "column", lg: "row" }} gap={20} align="center">
              <Box flex="1">
                <Heading fontSize={{ base: "2xl", md: "4xl" }} fontWeight="900" letterSpacing="-0.03em">
                  Zaivo exists to remove <br/>
                  <Text as="span" color="cyan.400">that dependency.</Text>
                </Heading>
              </Box>
              <Box flex="1">
                <Text fontSize="xl" color="gray.400" lineHeight="1.6" fontWeight="400">
                  Not by adding more tools — but by changing how execution happens. 
                  We don't build assistance; we build systems.
                </Text>
              </Box>
            </Flex>
          </ScrollReveal>
        </Container>
      </Box>

     
      <Box py={{ base: 16, md: 32 }} position="relative">
        <Container maxW="container.xl">
          <SimpleGrid columns={{ base: 1, md: 2 }} spacing={20}>
            <ScrollReveal variant="fade-right">
              <VStack align="start" spacing={8}>
                <Heading fontSize={{ base: "3xl", md: "5xl" }} fontWeight="900" letterSpacing="-0.03em">
                  Work is not <br/>
                  the problem. <br/>
                  <Text as="span" color="cyan.400">Execution is.</Text>
                </Heading>
                <Divider w="100px" borderColor="cyan.400" borderWidth="2px" />
              </VStack>
            </ScrollReveal>
            <ScrollReveal variant="fade-left" delay={0.2}>
              <VStack align="start" spacing={10} pt={{ md: 10 }}>
                <Text fontSize="xl" color="gray.300" lineHeight="1.8">
                  Systems don’t fail because of ideas. They fail because execution depends on constant effort. 
                </Text>
                <Text fontSize="lg" color="gray.500" lineHeight="1.8">
                  Most platforms focus on management. Zaivo focuses on motion. 
                  Turning fragmented human input into structured execution layers.
                </Text>
              </VStack>
            </ScrollReveal>
          </SimpleGrid>
        </Container>
      </Box>

      
      <Box py={10} bg="whiteAlpha.50">
        <Container maxW="container.xl">
          <ScrollReveal variant="zoom-in">
            <Text 
              fontSize={{ base: "5xl", md: "9xl" }} 
              fontWeight="900" 
              textAlign="center" 
              letterSpacing="-0.05em"
              lineHeight="1"
              opacity={0.1}
              textTransform="uppercase"
            >
              System Over Tools
            </Text>
          </ScrollReveal>
        </Container>
      </Box>

      
      <Box py={{ base: 16, md: 32 }} borderY="1px solid" borderColor="whiteAlpha.100">
        <Container maxW="container.lg">
          <ScrollReveal>
            <VStack spacing={8} textAlign="center">
              <Heading fontSize={{ base: "2xl", md: "4xl" }} fontWeight="900">
                Zaivo is where execution <br/>
                becomes a system.
              </Heading>
              <Text fontSize="xl" color="gray.400" lineHeight="1.8" maxW="2xl">
                Identity, workflows, and actions — connected into a layer that runs continuously. 
                One protocol. Infinite scalability.
              </Text>
            </VStack>
          </ScrollReveal>
        </Container>
      </Box>

      
      <Box py={{ base: 16, md: 32 }} position="relative">
        <Container maxW="container.xl">
          <Flex direction={{ base: "column", md: "row" }} align="center" gap={20}>
            <Box flex="1">
              <ScrollReveal variant="fade-right">
                <Box 
                  p={{ base: 6, md: 10 }} 
                  bg="whiteAlpha.50" 
                  borderRadius="3xl" 
                  border="1px solid" 
                  borderColor="whiteAlpha.100"
                  position="relative"
                  overflow="hidden"
                >
                   <Box
                    position="absolute"
                    top="-50%"
                    right="-50%"
                    w="300px"
                    h="300px"
                    bg="cyan.400"
                    filter="blur(100px)"
                    opacity={0.1}
                  />
                  <Heading fontSize="2xl" mb={6} fontWeight="800">Zaivo Identity</Heading>
                  <Text color="gray.400" fontSize="lg" lineHeight="1.8">
                    Every system needs a starting point. Zaivo Identity turns presence into action — and action into execution.
                  </Text>
                </Box>
              </ScrollReveal>
            </Box>
            <Box flex="1">
              <ScrollReveal variant="fade-left" delay={0.3}>
                <Heading fontSize={{ base: "2xl", md: "4xl" }} fontWeight="900" mb={8}>
                  From one workflow <br/>
                  <Text as="span" color="cyan.400">to everything.</Text>
                </Heading>
                <Text fontSize="lg" color="gray.500" lineHeight="1.8">
                  What begins as simple tracking evolves into coordination, automation, and scale. 
                  The more it runs, the more autonomous it becomes.
                </Text>
              </ScrollReveal>
            </Box>
          </Flex>
        </Container>
      </Box>

 
      <Box pt={0} pb={{ base: 24, md: 40 }} position="relative" textAlign="center">
        <Box
          position="absolute"
          bottom="0"
          left="50%"
          transform="translateX(-50%)"
          w="800px"
          h="800px"
          bg="radial-gradient(circle, rgba(0, 255, 255, 0.05) 0%, rgba(0,0,0,0) 70%)"
          zIndex={0}
        />
        <Container maxW="container.md" position="relative" zIndex={1}>
          <ScrollReveal variant="zoom-in">
              <VStack spacing={8}>
                <Heading fontSize={{ base: "4xl", md: "6xl" }} fontWeight="900" letterSpacing="-0.05em">
                  Done. <br/>
                  <Text as="span" color="cyan.400">Before You Do.</Text>
                </Heading>
                <Box w="60px" h="2px" bg="cyan.400" mx="auto" />
                <Box pt={6}>
                  <Link 
                    as={RouterLink} 
                    to="/contact"
                    _hover={{ textDecoration: 'none' }}
                  >
                    <MotionBox
                      px={10}
                      py={4}
                      bg="white"
                      color="black"
                      fontWeight="900"
                      fontSize="sm"
                      letterSpacing="0.2em"
                      borderRadius="full"
                      whileHover={{ scale: 1.05, bg: "cyan.400" }}
                      whileTap={{ scale: 0.95 }}
                    >
                      ENTER ZAIVO
                    </MotionBox>
                  </Link>
                </Box>
              </VStack>
          </ScrollReveal>
        </Container>
      </Box>

      <Footer />
    </Box>
  );
};

export default About;
