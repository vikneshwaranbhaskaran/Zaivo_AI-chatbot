import React, { useState, useEffect } from 'react';
import { Box, Container, Heading, Text, Flex, Icon, VStack, Badge, Stack, HStack } from '@chakra-ui/react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiTerminal, FiActivity } from 'react-icons/fi';

const IndustrialPulse = () => {
  const [logs, setLogs] = useState([
    { id: 1, time: '21:44:03', msg: 'ZAIVO_CORE_BOOT_SEQUENCE_COMPLETE', type: 'success' },
    { id: 2, time: '21:44:05', msg: 'UPLINK_ESTABLISHED // NODE_TIRUPPUR_01', type: 'info' },
    { id: 3, time: '21:44:08', msg: 'ORCHESTRATION_SYNC_ACTIVE // 43.1ms_LATENCY', type: 'info' },
  ]);

  useEffect(() => {
    const messages = [
      'DATA_PACKET_RECEIVED // UNIT_827',
      'SECURE_HANDSHAKE_VERIFIED',
      'NODE_HEARTBEAT_OPTIMAL',
      'TRANSCONTINENTAL_SYNC_LOCKED',
      'AUTONOMOUS_TRIGGER_EXECUTED'
    ];
    
    const interval = setInterval(() => {
      const newLog = {
        id: Date.now(),
        time: new Date().toLocaleTimeString([], { hour12: false }),
        msg: messages[Math.floor(Math.random() * messages.length)],
        type: Math.random() > 0.3 ? 'success' : 'info'
      };
      setLogs(prev => [newLog, ...prev.slice(0, 7)]);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <Box py={24} bg="#050505">
      <Container maxW="container.xl" px={4}>
        {}
        <Stack direction={{ base: "column", lg: "row" }} spacing={20} align="center">

          <VStack align={{ base: "center", md: "start" }} spacing={6} flex={1} textAlign={{ base: "center", md: "left" }}>
            <Badge colorScheme="cyan" variant="outline" px={3}>REAL-TIME ORCHESTRATION</Badge>
            <Heading size="2xl" color="white" lineHeight="1.2">
              The Pulse of <br/>
              <Text as="span" color="cyan.400">Autonomous Scaling.</Text>
            </Heading>
            <Text fontSize="lg" color="gray.500">
              Zaivo monitors every node across the Universal Axis, eliminating manual friction in real-time.
            </Text>
          </VStack>

          <Box
            flex={1} w="full" bg="#0A0A0A" borderRadius="2xl"
            border="1px solid" borderColor="whiteAlpha.200"
            p={6} fontFamily="monospace" position="relative"
          >
            <Flex justify="space-between" mb={6} borderBottom="1px solid" borderColor="whiteAlpha.100" pb={4}>
                <Flex align="center" gap={2}>
                    <Icon as={FiTerminal} color="cyan.400" />
                    <HStack spacing={3}>
                      <Text fontSize="10px" color="gray.500" fontWeight="bold">ZAIVO_KERNEL_LOGS</Text>
                      <Badge variant="subtle" colorScheme="gray" fontSize="8px" px={2} borderRadius="sm">SIMULATED FEED</Badge>
                    </HStack>
                </Flex>
            </Flex>

            <VStack align="stretch" spacing={3} h="240px" overflow="hidden">
              <AnimatePresence mode="popLayout">
                {logs.map((log, index) => (
                  <motion.div
                    key={log.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, y: -20, scale: 0.95 }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                  >
                    <Flex fontSize={{ base: "xs", md: "xs" }} gap={4} align="start">
                      <Text color="gray.700" whiteSpace="nowrap">[{log.time}]</Text>
                      <Text color={log.type === 'success' ? 'cyan.400' : 'gray.400'} fontWeight="medium" wordBreak="break-word">
                        {log.msg}_
                      </Text>
                    </Flex>
                  </motion.div>
                ))}
              </AnimatePresence>
            </VStack>

            {}
            <Flex mt={6} pt={4} borderTop="1px solid" borderColor="whiteAlpha.100" justify="space-between" align="center">
               <HStack spacing={6}>
                  <Flex align="center" gap={2}>
                      <motion.div
                        animate={{ opacity: [1, 0.4, 1] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                      >
                        <Box w={1.5} h={1.5} borderRadius="full" bg="cyan.400" boxShadow="0 0 10px #00FFFF" />
                      </motion.div>
                      <Text fontSize="8px" color="cyan.400" fontWeight="900" letterSpacing="widest">UPLINK_STABLE</Text>
                  </Flex>
                  <HStack spacing={2}>
                    <Text fontSize="8px" color="gray.600" fontWeight="bold">LATENCY:</Text>
                    <Text fontSize="8px" color="gray.400" fontWeight="bold">0.02ms</Text>
                  </HStack>
               </HStack>
               <Icon as={FiActivity} color="whiteAlpha.200" boxSize={3} />
            </Flex>
          </Box>

        </Stack>
        {}
      </Container>
    </Box>
  );
};

export default IndustrialPulse;