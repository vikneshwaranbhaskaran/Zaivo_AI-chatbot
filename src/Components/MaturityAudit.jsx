import React from 'react';
import { Box, Container, Heading, Text, Stack, SimpleGrid, Button, Icon, Circle, Flex, useDisclosure } from '@chakra-ui/react';
import { FiBarChart2, FiZap, FiShield, FiArrowRight } from 'react-icons/fi';
import ScrollReveal from './ScrollReveal';
import SystemModal from './SystemModal';

const MaturityAudit = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const criteria = [
    { icon: FiZap, title: "Operational Latency", desc: "Is your execution delayed by manual handoffs?" },
    { icon: FiShield, title: "Identity Integrity", desc: "Do you have a unified Z-ID for every asset and employee?" },
    { icon: FiBarChart2, title: "Data Autonomy", desc: "Does your data trigger actions without human interference?" }
  ];

  return (
    <Box py={32} bg="#050505" borderTop="1px solid" borderColor="whiteAlpha.100">
      <Container maxW="container.xl" px={4}>
        <Stack spacing={16} align="center" textAlign="center">

          <Stack spacing={4}>
            <Text color="cyan.400" fontWeight="900" letterSpacing="0.3em" fontSize="xs">
              EVALUATION PROTOCOL
            </Text>
            <Heading size="2xl" color="white">
              Measure your Digital Maturity.
            </Heading>
            <Text color="gray.500" fontSize="lg" maxW="2xl">
              Zaivo OS is a sovereign upgrade. Not every infrastructure is ready for
              total autonomy. Assess your current state.
            </Text>
          </Stack>

          <SimpleGrid columns={{ base: 1, md: 3 }} spacing={10} w="full">
            {criteria.map((item, index) => (
              <ScrollReveal key={index}>
                <Stack
                  p={8}
                  bg="whiteAlpha.50"
                  borderRadius="2xl"
                  border="1px solid"
                  borderColor="whiteAlpha.100"
                  transition="all 0.3s"
                  _hover={{ borderColor: "cyan.400", transform: "translateY(-5px)" }}
                  h="full"
                  align="center"
                >
                  <Circle size="50px" bg="cyan.900" mb={4}>
                    <Icon as={item.icon} color="cyan.400" boxSize={6} />
                  </Circle>
                  <Heading size="md" color="white" mb={2}>{item.title}</Heading>
                  <Text color="gray.500" fontSize="sm">{item.desc}</Text>
                </Stack>
              </ScrollReveal>
            ))}
          </SimpleGrid>

          <ScrollReveal>
            <Flex
              w="full"
              p={10}
              bgGradient="linear(to-r, cyan.900, transparent)"
              borderRadius="3xl"
              justify="space-between"
              align="center"
              direction={{ base: "column", md: "row" }}
              gap={8}
            >
              <Stack align={{ base: "center", md: "start" }} textAlign={{ base: "center", md: "left" }}>
                <Heading size="lg" color="white">Ready for the Upgrade?</Heading>
                <Text color="cyan.200">Request a technical audit of your industrial axis.</Text>
              </Stack>
              <Button
                as="a"
                href="https://wa.me/919384100252?text=Hi%20Zaivo%2C%20I%27d%20like%20to%20request%20a%20system%20audit."
                target="_blank"
                rel="noopener noreferrer"
                size="xs"
                colorScheme="cyan"
                px={4}
                h={8}
                borderRadius="xl"
                rightIcon={<FiArrowRight />}
                _hover={{ transform: "scale(1.05)" }}
              >
                INITIATE AUDIT
              </Button>
            </Flex>
          </ScrollReveal>

          <SystemModal
            isOpen={isOpen}
            onClose={onClose}
            title="Initiating Industrial Maturity Audit"
            type="SYSTEM_EVALUATION"
          />

        </Stack>
      </Container>
    </Box>
  );
};

export default MaturityAudit;