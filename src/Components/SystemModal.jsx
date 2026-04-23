import React from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Text,
  VStack,
  Icon,
  Badge,
  Divider,
  HStack,
  Heading,
} from '@chakra-ui/react';
import { FiCpu, FiShield, FiSend, FiZap } from 'react-icons/fi';
import { motion } from 'framer-motion';

const SystemModal = ({ isOpen, onClose, title, type }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered size="xl">
      <ModalOverlay backdropFilter="blur(10px)" bg="blackAlpha.800" />
      <ModalContent
        bg="#080808"
        color="white"
        border="1px solid"
        borderColor="cyan.900"
        borderRadius="3xl"
        p={4}
      >
        <ModalHeader borderBottom="1px solid" borderColor="whiteAlpha.100">
            <HStack>
                <Icon as={FiCpu} color="cyan.400" />
                <Text fontSize="sm" fontWeight="bold" letterSpacing="0.2em">
                    ZAIVO_PROTOCOL // {type || 'DEFAULT'}
                </Text>
            </HStack>
        </ModalHeader>
        <ModalCloseButton color="cyan.400" />

        <ModalBody py={10}>
          <VStack spacing={6} align="start">
            <Badge colorScheme="cyan" variant="solid" px={3} py={1}>
                ACCESS_LEVEL: 01
            </Badge>
            <Heading size="lg" fontWeight="900" letterSpacing="-1px">
                {title || 'Initiating System Handshake...'}
            </Heading>
            <Text color="gray.500" lineHeight="tall">
                Connecting to the Techygramam Hub. Establishing encrypted tunnel for
                sovereign industrial orchestration. Processing node request...
            </Text>

            <VStack w="full" bg="whiteAlpha.50" p={6} borderRadius="2xl" border="1px solid" borderColor="whiteAlpha.100" align="start">
                <HStack w="full" justify="space-between">
                    <Text fontSize="xs" fontWeight="bold" color="gray.600">ENCRYPTION_STATUS</Text>
                    <Text fontSize="xs" fontWeight="bold" color="green.400">ACTIVE // AES-256</Text>
                </HStack>
                <Divider borderColor="whiteAlpha.100" />
                <HStack w="full" justify="space-between">
                    <Text fontSize="xs" fontWeight="bold" color="gray.600">LATENCY_CORE</Text>
                    <Text fontSize="xs" fontWeight="bold" color="cyan.400">1.2ms</Text>
                </HStack>
            </VStack>
          </VStack>
        </ModalBody>

        <ModalFooter borderTop="1px solid" borderColor="whiteAlpha.100">
          <Button variant="ghost" mr={3} onClick={onClose} color="gray.500">
            DISCONNECT
          </Button>
          <Button
            colorScheme="cyan"
            borderRadius="xl"
            px={4}
            rightIcon={<FiZap />}
            onClick={() => {
                onClose();
                window.open('https://wa.me/919384100252?text=Hi%20Zaivo%2C%20I%27d%20like%20to%20authorize%20access.', '_blank');
            }}
          >
            AUTHORIZE_ACCESS
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default SystemModal;
