import React, { useState, useEffect } from 'react';
import {
  Box,
  Flex,
  Text,
  Button,
  HStack,
  Container,
  Icon,
  IconButton,
  VStack,
  Image,
  useColorModeValue,
  Circle,
  Tooltip,
} from '@chakra-ui/react';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import { FiActivity, FiMenu, FiX, FiLayers } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';

const NavLink = ({ link, isActive, onClick }) => {
  return (
    <Box
      as={RouterLink}
      to={link.path}
      onClick={onClick}
      px={4}
      py={2}
      transition="0.3s"
      _hover={{ textDecoration: 'none' }}
    >
      <VStack spacing={0} align="center" position="relative">
        <Text
          fontSize="10px"
          fontWeight="900"
          letterSpacing="0.3em"
          color={isActive ? "cyan.400" : "gray.400"}
          _hover={{ color: "white" }}
          transition="0.2s"
        >
          {link.name}
        </Text>
        {link.tooltip && (
          <Text
            fontSize="7px"
            fontWeight="bold"
            color="gray.600"
            letterSpacing="0.1em"
            mt={-0.5}
          >
            {link.tooltip.toUpperCase()}
          </Text>
        )}
        {isActive && (
          <motion.div
            layoutId="nav-pill"
            style={{
              position: 'absolute',
              bottom: '-8px',
              left: 0,
              right: 0,
              height: '2.5px',
              background: '#00FFFF',
              boxShadow: '0 0 12px #00FFFF',
              borderRadius: '2px'
            }}
            transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
          />
        )}
      </VStack>
    </Box>
  );
};

const Navbar = () => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isActive = (path) => location.pathname === path;

  const navLinks = [
    { name: 'HOME', path: '/', tooltip: 'Home' },
    { name: 'VERTICALS', path: '/verticals', tooltip: 'Industry Use Cases' },
    { name: 'FOUNDRY', path: '/foundry', tooltip: 'Implementation' },
    { name: 'TERMINAL', path: '/terminal', tooltip: 'Live Feed' },
    { name: 'CONTACT', path: '/contact', tooltip: 'GetTouch' },
  ];

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <Box
      as="nav"
      position="fixed"
      top={{ base: "0", md: scrolled ? "10px" : "0" }}
      left="0"
      right="0"
      w="full"
      zIndex="1000"
      transition="all 0.5s cubic-bezier(0.22, 1, 0.36, 1)"
    >
      <Container maxW="container.xl" px={{ base: 0, md: 4 }}>
        <Box
          mx="auto"
          w={{ base: "full", md: scrolled ? "95%" : "100%" }}
          bg={scrolled ? "rgba(5, 5, 5, 0.85)" : "rgba(5, 5, 5, 0.4)"}
          backdropFilter="blur(20px)"
          borderBottom={scrolled ? "none" : "1px solid"}
          border={{ base: "none", md: scrolled ? "1px solid" : "none" }}
          borderColor="whiteAlpha.100"
          borderRadius={{ base: "0", md: scrolled ? "full" : "0" }}
          transition="all 0.5s ease"
          boxShadow={scrolled ? "0 20px 40px rgba(0,0,0,0.4), inset 0 0 20px rgba(0,255,255,0.05)" : "none"}
        >
          <Flex h={{ base: "90px", md: scrolled ? "70px" : "100px" }} align="center" justify="space-between" px={{ base: 4, md: 8 }}>

            {}
            <RouterLink to="/" onClick={() => setIsOpen(false)}>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Image
                  src="/Zaivo_logo.png"
                  alt="ZAIVO"
                  h={{ base: "100px", md: scrolled ? "100px" : "120px" }}
                  w="auto"
                  objectFit="contain"
                  transition="0.4s"
                  loading="eager"
                  htmlWidth="300"
                  htmlHeight="120"
                  ml={{ base: 0, md: -2 }}
                  mt={{ base: 2, md: 4, lg: 6 }}
                  transform={{ base: "scale(1.3)", md: scrolled ? "scale(1.8)" : "scale(1.9)" }}
                  transformOrigin="left center"
                />
              </motion.div>
            </RouterLink>

            {}
            <HStack
              spacing={2}
              display={{ base: "none", md: "flex" }}
              bg="whiteAlpha.50"
              p={1}
              borderRadius="full"
              border="1px solid"
              borderColor="whiteAlpha.100"
            >
              {navLinks.map((link) => (
                <NavLink
                  key={link.name}
                  link={link}
                  isActive={isActive(link.path)}
                />
              ))}
            </HStack>

            {}
            <HStack spacing={4}>
              <Box display={{ base: "none", md: "block" }}>
                <Button
                  as={RouterLink}
                  to="/terminal"
                  variant="ghost"
                  size="xs"
                  borderRadius="full"
                  px={4}
                  fontSize="9px"
                  fontWeight="900"
                  letterSpacing="0.2em"
                  color="cyan.400"
                  border="1px solid"
                  borderColor="cyan.900"
                  _hover={{ bg: "cyan.900", color: "white", borderColor: "cyan.400" }}
                  leftIcon={
                    <motion.div
                      animate={{ opacity: [1, 0.4, 1] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                      <Circle size="6px" bg="cyan.400" boxShadow="0 0 10px #00FFFF" />
                    </motion.div>
                  }
                >
                  LIVE_SYS
                </Button>
              </Box>

              <IconButton
                display={{ base: "flex", md: "none" }}
                onClick={toggleMenu}
                icon={isOpen ? <FiX /> : <FiMenu />}
                variant="ghost"
                color="cyan.400"
                aria-label="Toggle Menu"
                fontSize="24px"
              />
            </HStack>
          </Flex>
        </Box>
      </Container>

      {}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            style={{
              position: 'fixed',
              top: '100px',
              left: '10px',
              right: '10px',
              backgroundColor: 'rgba(5, 5, 5, 0.98)',
              backdropFilter: 'blur(30px)',
              borderRadius: '24px',
              border: '1px solid rgba(255,255,255,0.1)',
              zIndex: 999,
              padding: '24px',
              maxHeight: 'calc(100vh - 120px)',
              overflowY: 'auto',
              boxShadow: '0 40px 100px rgba(0,0,0,0.8)'
            }}
          >
            <VStack spacing={4} w="full">
              {navLinks.map((link, i) => (
                <Box
                  key={link.name}
                  as={RouterLink}
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  w="full"
                  py={4}
                  px={6}
                  borderRadius="xl"
                  bg={isActive(link.path) ? "whiteAlpha.100" : "transparent"}
                  border="1px solid"
                  borderColor={isActive(link.path) ? "cyan.900" : "transparent"}
                >
                  <HStack justify="space-between">
                    <Text
                      fontSize="sm"
                      fontWeight="900"
                      letterSpacing="0.3em"
                      color={isActive(link.path) ? "cyan.400" : "white"}
                    >
                      {link.name}
                    </Text>
                    {isActive(link.path) && <Icon as={FiLayers} color="cyan.400" />}
                  </HStack>
                </Box>
              ))}

              <Button
                as={RouterLink}
                to="/terminal"
                w="full"
                h="56px"
                bg="cyan.400"
                color="black"
                borderRadius="xl"
                fontSize="xs"
                fontWeight="900"
                letterSpacing="0.2em"
                onClick={() => setIsOpen(false)}
                _hover={{ bg: "cyan.300" }}
              >
                INITIALIZE TERMINAL
              </Button>
            </VStack>
          </motion.div>
        )}
      </AnimatePresence>
    </Box>
  );
};

export default Navbar;