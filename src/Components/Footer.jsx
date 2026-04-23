import React from 'react';
import {
  Box,
  Container,
  Stack,
  Text,
  Flex,
  Link,
  Icon,
  Divider,
  SimpleGrid,
  VStack,
  Image,
  HStack,
  Badge,
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { Link as RouterLink } from 'react-router-dom';
import {
  FiExternalLink,
  FiMail,
  FiMapPin,
  FiLinkedin,
  FiTwitter,
  FiInstagram,
  FiArrowUpRight,
  FiActivity,
  FiCommand
} from 'react-icons/fi';

const MotionBox = motion(Box);
const MotionFlex = motion(Flex);

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <Box
      as="footer"
      bg="#050505"
      pt={{ base: 16, md: 32 }}
      pb={12}
      position="relative"
      overflow="hidden"
      borderTop="1px solid"
      borderColor="whiteAlpha.100"
    >

      <Box
        position="absolute"
        bottom="-10%"
        right="-5%"
        w="600px"
        h="600px"
        bg="radial-gradient(circle, rgba(0, 255, 255, 0.03) 0%, rgba(0,0,0,0) 70%)"
        zIndex={0}
        pointerEvents="none"
      />

     
      <Box
        position="absolute"
        top="0"
        left="50%"
        transform="translateX(-50%)"
        whiteSpace="nowrap"
        zIndex={0}
        pointerEvents="none"
        opacity={0.02}
        userSelect="none"
      >
        <Text
          fontSize={{ base: "80px", sm: "120px", md: "200px", lg: "300px" }}
          fontWeight="900"
          letterSpacing="-0.05em"
          lineHeight="1"
          bgGradient="linear(to-b, white, transparent)"
          bgClip="text"
        >
          ZAIVO
        </Text>
      </Box>

      <Container maxW="container.xl" position="relative" zIndex={1}>
        <SimpleGrid columns={{ base: 1, md: 2, lg: 12 }} spacing={{ base: 12, lg: 8 }} mb={20}>
          
          
          <Box gridColumn={{ base: "span 1", md: "span 2", lg: "span 4" }}>
            <VStack align={{ base: "center", md: "start" }} spacing={6} textAlign={{ base: "center", md: "left" }}>
              <MotionBox
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
              >
                <Image
                  src="/Zaivo_logo.png"
                  alt="ZAIVO"
                  h={{ base: "80px", md: "100px", lg: "120px" }}
                  w="auto"
                  objectFit="contain"
                  ml={0}
                  transform={{ base: "scale(1.2)", md: "scale(1.4)", lg: "scale(1.6)" }}
                  transformOrigin="left center"
                />
              </MotionBox>
              <Text color="white" fontSize="xl" fontWeight="700" letterSpacing="-0.02em">
                Zaivo – <Text as="span" color="cyan.400">Simplifying Digital Experiences</Text>
              </Text>
              <Text color="gray.500" fontSize="sm" lineHeight="tall" maxW={{ base: "full", md: "320px" }}>
                Architecting the next generation of digital infrastructure.
                Empowering businesses with seamless, autonomous scaling solutions.
              </Text>
              
              <HStack spacing={4} justify={{ base: "center", md: "start" }}>
                <Badge variant="outline" colorScheme="cyan" fontSize="xs" px={3} py={1} borderRadius="full">
                  v2.1.0-STABLE
                </Badge>
                <Flex align="center" gap={2}>
                  <Box w="8px" h="8px" bg="cyan.400" borderRadius="full" boxShadow="0 0 10px #00FFFF" />
                  <Text color="gray.600" fontSize="xs" fontWeight="bold" letterSpacing="widest">SYSTEM_LIVE</Text>
                </Flex>
              </HStack>
            </VStack>
          </Box>          
          <Box gridColumn={{ base: "span 1", md: "span 1", lg: "span 2" }}>
            <VStack align={{ base: "center", md: "start" }} spacing={6}>
              <Text color="white" fontWeight="900" fontSize="xs" letterSpacing="0.3em" textTransform="uppercase">
                Quick Links
              </Text>
              <VStack align={{ base: "center", md: "start" }} spacing={4}>
                {['About Us', 'Careers', 'Blog', 'Help Center', 'Contact'].map((item) => (
                  <Link 
                    key={item}
                    as={RouterLink} 
                    to={item === 'About Us' ? '/about' : `/${item.toLowerCase().replace(' ', '-')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    color="gray.500" 
                    fontSize="sm" 
                    fontWeight="600"
                    _hover={{ color: "cyan.400", transform: "translateX(5px)" }} 
                    transition="all 0.2s"
                  >
                    {item}
                  </Link>
                ))}
              </VStack>
            </VStack>
          </Box>

          <Box gridColumn={{ base: "span 1", md: "span 1", lg: "span 2" }}>
            <VStack align={{ base: "center", md: "start" }} spacing={6}>
              <Text color="white" fontWeight="900" fontSize="xs" letterSpacing="0.3em" textTransform="uppercase">
                Community
              </Text>
              <VStack align={{ base: "center", md: "start" }} spacing={4}>
                <Link href="#" isExternal target="_blank" rel="noopener noreferrer" color="gray.500" fontSize="sm" fontWeight="600" _hover={{ color: "cyan.400" }} display="flex" alignItems="center" gap={2}>
                  <Icon as={FiLinkedin} /> LinkedIn
                </Link>
                <Link href="#" isExternal target="_blank" rel="noopener noreferrer" color="gray.500" fontSize="sm" fontWeight="600" _hover={{ color: "cyan.400" }} display="flex" alignItems="center" gap={2}>
                  <Icon as={FiTwitter} /> Twitter
                </Link>
                <Link href="#" isExternal target="_blank" rel="noopener noreferrer" color="gray.500" fontSize="sm" fontWeight="600" _hover={{ color: "cyan.400" }} display="flex" alignItems="center" gap={2}>
                  <Icon as={FiInstagram} /> Instagram
                </Link>
                <Box pt={2} w="full">
                  <Link 
                    href="#" 
                    target="_blank"
                    rel="noopener noreferrer"
                    _hover={{ textDecoration: 'none' }}
                  >
                    <MotionBox
                      px={4}
                      py={2}
                      bg="transparent"
                      border="1px solid"
                      borderColor="cyan.500"
                      borderRadius="full"
                      color="cyan.400"
                      fontSize="xs"
                      fontWeight="900"
                      letterSpacing="0.2em"
                      textAlign="center"
                      whiteSpace="nowrap"
                      transition="all 0.3s"
                      whileHover={{ 
                        bg: "cyan.500", 
                        color: "black",
                        boxShadow: "0 0 20px rgba(0, 255, 255, 0.3)",
                        scale: 1.05
                      }}
                      whileTap={{ scale: 0.95 }}
                    >
                      NEWSLETTER SIGNUP
                    </MotionBox>
                  </Link>
                </Box>
              </VStack>
            </VStack>
          </Box>

          
          <Box gridColumn={{ base: "span 1", md: "span 2", lg: "span 4" }}>
            <SimpleGrid columns={{ base: 1, sm: 2 }} spacing={8}>
              <VStack align={{ base: "center", sm: "start" }} spacing={6}>
                <Text color="white" fontWeight="900" fontSize="xs" letterSpacing="0.3em" textTransform="uppercase">
                  Contact
                </Text>
                <VStack align={{ base: "center", sm: "start" }} spacing={4}>
                  <Link href="mailto:support@zaivo.com" target="_blank" rel="noopener noreferrer" color="gray.500" fontSize="sm" display="flex" alignItems="center" gap={2} _hover={{ color: "cyan.400" }}>
                    <Icon as={FiMail} color="cyan.400" /> support@zaivo.com
                  </Link>
                  <Flex align="start" gap={2} color="gray.500" fontSize="sm">
                    <Icon as={FiMapPin} color="cyan.400" mt={1} />
                    <Text>Chennai, India</Text>
                  </Flex>
                </VStack>
              </VStack>

              <VStack align={{ base: "center", sm: "start" }} spacing={6}>
                <Text color="white" fontWeight="900" fontSize="xs" letterSpacing="0.3em" textTransform="uppercase">
                  Legal
                </Text>
                <VStack align={{ base: "center", sm: "start" }} spacing={4}>
                  {['Terms of Service', 'Privacy Policy', 'Cookie Policy'].map((item) => (
                    <Link 
                      key={item}
                      href="#"
                      target="_blank"
                      rel="noopener noreferrer"
                      color="gray.600" 
                      fontSize="xs" 
                      fontWeight="700"
                      _hover={{ color: "white" }}
                    >
                      {item.toUpperCase()}
                    </Link>
                  ))}
                </VStack>
              </VStack>
            </SimpleGrid>
          </Box>
        </SimpleGrid>

        <Box pt={10} borderTop="1px solid" borderColor="whiteAlpha.100">
          <Flex
            direction={{ base: "column", md: "row" }}
            justify="space-between"
            align="center"
            textAlign={{ base: "center", md: "left" }}
            gap={6}
          >
            <Stack direction={{ base: "column", md: "row" }} spacing={{ base: 4, md: 8 }} align="center">
              <Text color="gray.600" fontSize="11px" fontWeight="900" letterSpacing="0.2em">
                © {currentYear} ZAIVO. ALL RIGHTS RESERVED.
              </Text>
              <HStack spacing={4} display={{ base: "none", md: "flex" }}>
                <Flex align="center" gap={2} color="gray.800">
                  <Icon as={FiActivity} boxSize={3} />
                  <Text fontSize="9px" fontWeight="bold">PING: 12MS</Text>
                </Flex>
                <Flex align="center" gap={2} color="gray.800">
                  <Icon as={FiCommand} boxSize={3} />
                  <Text fontSize="9px" fontWeight="bold">STATUS_OK</Text>
                </Flex>
              </HStack>
            </Stack>

            <HStack spacing={3} justify="center">
              <Box w="30px" h="1px" bg="whiteAlpha.200" />
              <Text color="gray.700" fontSize="9px" fontWeight="bold" letterSpacing="0.3em">
                ENGINEERED FOR EXCELLENCE
              </Text>
            </HStack>
          </Flex>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;