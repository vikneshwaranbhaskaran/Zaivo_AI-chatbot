import { Box, Container, Heading, Text, VStack, Badge, Button, useDisclosure, Flex, Icon } from '@chakra-ui/react';
import { FiArrowRight, FiCheckCircle } from 'react-icons/fi';
import { motion } from 'framer-motion';
import SystemModal from './SystemModal';

const MotionVStack = motion(VStack);
const MotionBox   = motion(Box);

const Hero = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box
      pt={{ base: 24, sm: 32, md: 40, lg: 48 }}
      pb={{ base: 8, md: 0 }}
      bg="#050505"
      position="relative"
      overflow="hidden"
      _before={{
        content: '""',
        position: 'absolute',
        top: 0, left: 0, right: 0, bottom: 0,
        background: "linear-gradient(rgba(0, 255, 255, 0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 255, 255, 0.03) 1px, transparent 1px)",
        backgroundSize: "40px 40px",
        pointerEvents: "none",
      }}
    >
      {}
      <Box
        position="absolute" top="0" left="0" w="full" h="full"
        pointerEvents="none"
        bg="linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.1) 50%)"
        backgroundSize="100% 4px"
        zIndex="10"
        opacity="0.2"
      />

      <Container maxW="container.xl" px={4} position="relative" zIndex="20">
        <VStack spacing={12} align="center" textAlign="center">

          {}
          <MotionBox
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <Badge
              colorScheme="cyan"
              variant="subtle"
              bg="rgba(0, 255, 255, 0.1)"
              color="cyan.300"
              px={4} py={2}
              borderRadius="full"
              fontSize="sm"
              letterSpacing="widest"
              textTransform="uppercase"
              border="1px solid rgba(0, 255, 255, 0.2)"
            >
              Work, handled.
            </Badge>
          </MotionBox>

          {}
          <MotionVStack
            spacing={6}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          >
            <Heading
              as="h1"
              fontSize={{ base: "3xl", sm: "4xl", md: "6xl", lg: "7xl", xl: "8xl" }}
              color="white"
              fontWeight="900"
              lineHeight="1.1"
              letterSpacing="-2px"
            >
              <Flex align="center" justify="center" display="inline-flex" mr={4}>
                <Icon as={FiCheckCircle} color="cyan.400" boxSize={{ base: "30px", md: "50px" }} />
              </Flex>
              Done. <br />
              <Text as="span" color="cyan.400" sx={{ textShadow: "0 0 40px rgba(0, 255, 255, 0.3)" }}>
                Before You Do.
              </Text>
            </Heading>

            <Text
              fontSize={{ base: "md", sm: "lg", md: "xl", lg: "2xl" }}
              color="gray.400"
              maxW={{ base: "full", md: "2xl", lg: "3xl" }}
              lineHeight="1.6"
              fontWeight="medium"
            >
              Zaivo turns operations into systems that run, adapt, and deliver — without constant input.
            </Text>
          </MotionVStack>

          {}
          <MotionVStack
            spacing={6}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
          >
            <Button
              as="a"
              href="https://wa.me/919384100252?text=Hi%20Zaivo%2C%20I%27d%20like%20to%20get%20started."
              target="_blank"
              rel="noopener noreferrer"
              size="xs"
              colorScheme="cyan"
              px={4} h={8}
              borderRadius="full"
              fontSize="lg"
              fontWeight="900"
              letterSpacing="0.1em"
              rightIcon={<FiArrowRight />}
              boxShadow="0 0 40px rgba(0, 255, 255, 0.2)"
              _hover={{
                transform: "translateY(-4px) scale(1.02)",
                boxShadow: "0 0 60px rgba(0, 255, 255, 0.4)",
                bg: "cyan.300",
              }}
              transition="all 0.3s cubic-bezier(0.23, 1, 0.32, 1)"
            >
              Get Started
            </Button>

            <Flex 
              direction={{ base: "column", sm: "row" }} 
              color="gray.600" 
              fontSize="10px" 
              fontWeight="bold" 
              letterSpacing="widest" 
              gap={{ base: 2, sm: 6 }} 
              align="center"
            >
              <Text>NODE_STATUS: ONLINE</Text>
              <Text opacity={0.3} display={{ base: "none", sm: "block" }}>|</Text>
              <Text>ENCRYPTION: AES_256</Text>
              <Text opacity={0.3} display={{ base: "none", sm: "block" }}>|</Text>
              <Text>REGION: S_ASIA_HUB</Text>
            </Flex>
          </MotionVStack>

          <SystemModal
            isOpen={isOpen}
            onClose={onClose}
            title="Initializing Leadership Protocol"
            type="KERNEL_INIT"
          />
        </VStack>
      </Container>
    </Box>
  );
};

export default Hero;