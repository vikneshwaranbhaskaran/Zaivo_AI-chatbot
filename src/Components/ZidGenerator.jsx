import React, { useState } from 'react';
import {
  Box, Container, Input, VStack, Text, Heading, Badge,
  Flex, Avatar, Icon, Center, Button, SimpleGrid,
  useToast, Stack
} from '@chakra-ui/react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiShield, FiCheckCircle, FiActivity, FiLock } from 'react-icons/fi';

const MotionBox = motion(Box);

const ZidGenerator = () => {
  const [name, setName] = useState('');
  const [role, setRole] = useState('');
  const [status, setStatus] = useState('idle');
  const toast = useToast();

  const startBiometricScan = () => {
    if(!name || !role) {
        toast({ title: "Identification Required", status: "warning", duration: 2000 });
        return;
    }
    setStatus('scanning');
    setTimeout(() => {
      setStatus('verified');
      toast({
        title: "Biometrics Verified",
        description: "Identity anchored to Techygramam Hub.",
        status: "success",
        duration: 3000,
      });
    }, 2500);
  };

  return (
    <Box pt={24} pb={0} bg="#050505">
      <Container maxW="container.xl" px={4}>
        <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={16} alignItems="center">
          <Stack spacing={8} align={{ base: "center", md: "start" }} textAlign={{ base: "center", md: "left" }}>
            <Badge w="fit-content" colorScheme="cyan" variant="solid" px={3}>PROTOCOL: AUTH_V1</Badge>
            <Heading size="2xl" color="white">Secure Your <br/>Digital Sovereignty.</Heading>
            <VStack spacing={4} align="stretch" maxW="400px">
              <Input
                placeholder="Full Name"
                variant="filled" bg="gray.900" color="white"
                _focus={{ borderColor: "cyan.400", bg: "gray.800" }}
                onChange={(e) => setName(e.target.value.toUpperCase())}
              />
              <Input
                placeholder="Enterprise Role"
                variant="filled" bg="gray.900" color="white"
                _focus={{ borderColor: "cyan.400", bg: "gray.800" }}
                onChange={(e) => setRole(e.target.value.toUpperCase())}
              />
              <Button
                colorScheme={status === 'verified' ? "green" : "cyan"}
                h={8} borderRadius="xl"
                onClick={startBiometricScan}
                isLoading={status === 'scanning'}
                loadingText="SCANNING..."
                leftIcon={status === 'verified' ? <FiCheckCircle /> : <FiLock />}
              >
                {status === 'verified' ? "IDENTITY ANCHORED" : "VERIFY BIOMETRICS"}
              </Button>
              {status === 'verified' && (
                <Button variant="ghost" color="gray.500" size="xs" onClick={() => setStatus('idle')}>
                  Reset Identity
                </Button>
              )}
            </VStack>
          </Stack>

          <Center>
            <Box
              w="320px" h="450px" bg="black" borderRadius="3xl" p={8} border="1px solid"
              borderColor={status === 'verified' ? "cyan.400" : "gray.800"} position="relative" overflow="hidden"
            >
              <AnimatePresence>
                {status === 'scanning' && (
                  <MotionBox
                    initial={{ top: "-10%" }} animate={{ top: "110%" }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                    position="absolute" left={0} w="full" h="4px" bg="cyan.400" boxShadow="0 0 20px #00FFFF" zIndex={10}
                  />
                )}
              </AnimatePresence>
              <Flex justify="space-between" mb={10}>
                <Icon as={FiShield} color={status === 'verified' ? "cyan.400" : "gray.700"} />
                <Text fontSize="10px" fontWeight="900" color="gray.600">ZAIVO // ID</Text>
              </Flex>
              <VStack spacing={6}>
                <Avatar size="xl" name={name} border="2px solid" borderColor={status === 'verified' ? "cyan.400" : "gray.800"} bg="transparent" />
                <VStack spacing={1} textAlign="center">
                  <Heading size="sm" color="white">{name || "ANONYMOUS"}</Heading>
                  <Text color="cyan.400" fontSize="xs" fontWeight="900">{role || "PENDING AUTH"}</Text>
                </VStack>
              </VStack>
            </Box>
          </Center>
        </SimpleGrid>
      </Container>
    </Box>
  );
};

export default ZidGenerator;