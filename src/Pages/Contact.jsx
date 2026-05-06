import React, { useState, useRef, useEffect } from 'react';
import {
  Box, Text, Heading, Icon, Flex, VStack, HStack, Button, Container,
} from '@chakra-ui/react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiArrowRight, FiMail, FiPhone, FiCheck, FiChevronRight, FiArrowLeft } from 'react-icons/fi';
import Footer from '../Components/Footer';
import { saveContactSubmission } from '../services/db';
import SEO from '../Components/SEO';

const MotionBox = motion(Box);

const STEPS = [
  {
    id: 'email',
    question: "What's your email?",
    sub: "We'll use this to reach you back.",
    type: 'email',
    placeholder: 'you@company.com',
    required: true,
  },
  {
    id: 'organization',
    question: "Who are you representing?",
    sub: "Your company, startup, or project name.",
    placeholder: 'Acme Corp',
    required: true,
  },
  {
    id: 'help',
    question: "What do you need help with?",
    sub: "Be specific — we love details.",
    placeholder: 'Automate our warehouse dispatch flow...',
    multiline: true,
    required: true,
  },
  {
    id: 'phone',
    question: "Phone number? (optional)",
    sub: "For faster coordination.",
    type: 'tel',
    placeholder: '+91 9XXXXXXXXX',
    required: false,
  },
];

const StepInput = ({ step, value, onChange, onNext, onBack, isLast }) => {
  const inputRef = useRef();

  useEffect(() => {
    if (inputRef.current) inputRef.current.focus();
  }, [step]);

  const handleKey = (e) => {
    if (e.key === 'Enter' && !e.shiftKey && !step.multiline) {
      e.preventDefault();
      onNext();
    }
  };

  const baseStyle = {
    background: 'transparent',
    border: 'none',
    borderBottom: '1.5px solid rgba(255,255,255,0.12)',
    color: 'white',
    fontSize: '20px',
    fontFamily: "'Inter', sans-serif",
    fontWeight: 400,
    outline: 'none',
    width: '100%',
    padding: '10px 0',
    resize: 'none',
    caretColor: '#22d3ee',
    letterSpacing: '-0.01em',
    transition: 'border-color 0.25s',
  };

  const canProceed = value || !step.required;

  return (
    <Box>
      {step.multiline ? (
        <textarea
          ref={inputRef}
          rows={3}
          placeholder={step.placeholder}
          value={value}
          onChange={e => onChange(e.target.value)}
          onKeyDown={handleKey}
          style={{
            ...baseStyle,
            paddingTop: '8px',
          }}
          onFocus={e => (e.target.style.borderBottomColor = '#22d3ee')}
          onBlur={e => (e.target.style.borderBottomColor = 'rgba(255,255,255,0.12)')}
        />
      ) : (
        <input
          ref={inputRef}
          type={step.type || 'text'}
          placeholder={step.placeholder}
          value={value}
          onChange={e => onChange(e.target.value)}
          onKeyDown={handleKey}
          style={baseStyle}
          onFocus={e => (e.target.style.borderBottomColor = '#22d3ee')}
          onBlur={e => (e.target.style.borderBottomColor = 'rgba(255,255,255,0.12)')}
        />
      )}

      <Flex align="center" gap={3} mt={8}>
        {onBack && (
          <Button
            onClick={onBack}
            variant="ghost"
            size="md"
            h="44px"
            px={5}
            color="whiteAlpha.400"
            fontWeight="600"
            fontSize="sm"
            borderRadius="12px"
            leftIcon={<FiArrowLeft />}
            _hover={{ color: 'white', bg: 'whiteAlpha.100' }}
            transition="all 0.2s"
          >
            Back
          </Button>
        )}
        <Button
          onClick={onNext}
          size="md"
          h="44px"
          px={7}
          bg={canProceed ? 'cyan.400' : 'whiteAlpha.100'}
          color={canProceed ? 'gray.900' : 'gray.600'}
          fontWeight="700"
          fontSize="sm"
          letterSpacing="0.04em"
          borderRadius="12px"
          rightIcon={<FiArrowRight />}
          _hover={canProceed ? { bg: 'cyan.300', transform: 'translateY(-1px)', boxShadow: '0 4px 20px rgba(0,229,255,0.25)' } : {}}
          transition="all 0.2s"
          cursor={canProceed ? 'pointer' : 'not-allowed'}
        >
          {isLast ? 'Send it →' : 'Next'}
        </Button>
      </Flex>
    </Box>
  );
};

const ProgressBar = ({ current, total }) => (
  <HStack spacing="6px" mb={10}>
    {Array.from({ length: total }).map((_, i) => (
      <Box
        key={i}
        h="3px"
        flex={1}
        borderRadius="full"
        bg={i < current ? 'cyan.400' : 'whiteAlpha.100'}
        transition="all 0.4s ease"
        position="relative"
        overflow="hidden"
      >
        {i < current && (
          <Box
            position="absolute"
            inset={0}
            bgGradient="linear(to-r, cyan.600, cyan.300)"
            borderRadius="full"
          />
        )}
      </Box>
    ))}
  </HStack>
);

const Contact = () => {
  const [step, setStep]           = useState(0);
  const [answers, setAnswers]     = useState({});
  const [current, setCurrent]     = useState('');
  const [sent, setSent]           = useState(false);
  const [direction, setDirection] = useState(1);

  useEffect(() => {
    if (sent) {
      const timer = setTimeout(() => {
        setSent(false);
        setStep(0);
        setAnswers({});
        setCurrent('');
        setDirection(1);
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [sent]);

  const advance = async () => {
    const s = STEPS[step];
    if (s.required && !current.trim()) return;

    const updated = { ...answers, [s.id]: current };
    setAnswers(updated);
    setCurrent('');
    setDirection(1);

    if (step < STEPS.length - 1) {
      setStep(step + 1);
    } else {
      // ── Open WhatsApp as before ───────────────────────────────────────
      const message = `*New Contact via Zaivo*\n\n*Email:* ${updated.email || 'N/A'}\n*Org:* ${updated.organization || 'N/A'}\n*Need:* ${updated.help || 'N/A'}\n*Phone:* ${updated.phone || 'N/A'}`;
      const whatsappUrl = `https://wa.me/919384100252?text=${encodeURIComponent(message)}`;
      window.open(whatsappUrl, '_blank');
      setSent(true);

      // ── Persist to Firestore (non-blocking) ─────────────────────────
      saveContactSubmission(updated).catch((err) =>
        console.error('[Zaivo DB] Failed to save contact submission:', err)
      );
    }
  };

  const goBack = () => {
    if (step > 0) {
      setDirection(-1);
      const prev = step - 1;
      setStep(prev);
      setCurrent(answers[STEPS[prev].id] || '');
    }
  };

  const slideVariants = {
    enter: (dir) => ({ opacity: 0, x: dir > 0 ? 40 : -40, filter: 'blur(4px)' }),
    center:        { opacity: 1, x: 0, filter: 'blur(0px)' },
    exit: (dir)  => ({ opacity: 0, x: dir > 0 ? -40 : 40, filter: 'blur(4px)' }),
  };

  return (
    <Box
      bg="#070710"
      color="white"
      minH="100vh"
      position="relative"
      overflow="hidden"
      fontFamily="'Inter', sans-serif"
    >
      <SEO 
        title="Contact | Zaivo" 
        description="Let's build together. Tell us what you're building, and we'll help you make it run." 
      />

      {/* Background glows */}
      <Box
        position="fixed" top="-15%" right="-5%"
        w="700px" h="700px"
        bg="radial-gradient(circle, rgba(0,229,255,0.05) 0%, transparent 65%)"
        pointerEvents="none" zIndex={0}
      />
      <Box
        position="fixed" bottom="-20%" left="-10%"
        w="600px" h="600px"
        bg="radial-gradient(circle, rgba(139,92,246,0.04) 0%, transparent 65%)"
        pointerEvents="none" zIndex={0}
      />

      <Container maxW="1200px" position="relative" zIndex={1} px={{ base: 6, md: 10 }}>
        <Flex
          direction={{ base: 'column', lg: 'row' }}
          minH="100vh"
          align={{ base: 'flex-start', lg: 'center' }}
          pt={{ base: 32, md: 36 }}
          pb={24}
          gap={{ base: 16, lg: 24 }}
        >

          {/* ─── LEFT COLUMN ─── */}
          <MotionBox
            flex="0 0 38%"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Badge */}
            <Flex
              display="inline-flex"
              align="center"
              gap={2}
              px={4}
              py={2}
              borderRadius="full"
              border="1px solid rgba(0,229,255,0.2)"
              bg="rgba(0,229,255,0.05)"
              mb={8}
            >
              <Box w="6px" h="6px" borderRadius="full" bg="cyan.400"
                boxShadow="0 0 8px #22d3ee"
                sx={{ animation: 'pulse 2s ease-in-out infinite' }}
              />
              <Text fontSize="11px" fontWeight="700" letterSpacing="0.2em" color="cyan.400">
                OPEN TO CONNECT
              </Text>
            </Flex>

            <Heading
              fontSize={{ base: '4xl', md: '6xl' }}
              fontWeight="800"
              lineHeight="1.0"
              letterSpacing="-0.03em"
              mb={6}
            >
              Let's build<br />
              <Box as="span" color="cyan.400">together.</Box>
            </Heading>

            <Text color="gray.500" fontSize="md" lineHeight="1.9" mb={10} maxW="340px">
              Tell us what you're building.<br />
              We'll help you make it run.
            </Text>

            {/* Contact pills */}
            <VStack align="start" spacing={3} mb={12}>
              <a href="mailto:connect@zaivo.com" style={{ textDecoration: 'none', width: '100%' }}>
                <HStack
                  spacing={3}
                  px={4} py={3}
                  borderRadius="14px"
                  border="1px solid rgba(255,255,255,0.06)"
                  bg="rgba(255,255,255,0.03)"
                  _hover={{ bg: 'rgba(0,229,255,0.06)', borderColor: 'rgba(0,229,255,0.2)', transform: 'translateX(4px)' }}
                  transition="all 0.2s"
                  cursor="pointer"
                  maxW="280px"
                >
                  <Box
                    w="32px" h="32px" borderRadius="10px"
                    bg="rgba(0,229,255,0.08)"
                    display="flex" alignItems="center" justifyContent="center"
                    flexShrink={0}
                  >
                    <Icon as={FiMail} color="cyan.400" boxSize="14px" />
                  </Box>
                  <Text fontSize="sm" color="gray.400">connect@zaivo.com</Text>
                </HStack>
              </a>

              <a href="https://wa.me/919384100252" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', width: '100%' }}>
                <HStack
                  spacing={3}
                  px={4} py={3}
                  borderRadius="14px"
                  border="1px solid rgba(255,255,255,0.06)"
                  bg="rgba(255,255,255,0.03)"
                  _hover={{ bg: 'rgba(0,229,255,0.06)', borderColor: 'rgba(0,229,255,0.2)', transform: 'translateX(4px)' }}
                  transition="all 0.2s"
                  cursor="pointer"
                  maxW="280px"
                >
                  <Box
                    w="32px" h="32px" borderRadius="10px"
                    bg="rgba(0,229,255,0.08)"
                    display="flex" alignItems="center" justifyContent="center"
                    flexShrink={0}
                  >
                    <Icon as={FiPhone} color="cyan.400" boxSize="14px" />
                  </Box>
                  <Text fontSize="sm" color="gray.400">+91 93841 00252</Text>
                </HStack>
              </a>
            </VStack>

            {/* Response time tag */}
            <HStack
              spacing={2}
              px={4} py={2}
              borderRadius="10px"
              bg="rgba(255,255,255,0.02)"
              border="1px solid rgba(255,255,255,0.05)"
              display="inline-flex"
            >
              <Box w="6px" h="6px" borderRadius="full" bg="green.400" />
              <Text fontSize="xs" color="gray.600">Typical response within 24h</Text>
            </HStack>
          </MotionBox>

          {/* ─── RIGHT COLUMN — Form Card ─── */}
          <MotionBox
            flex="1"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          >
            <Box
              borderRadius="24px"
              border="1px solid rgba(255,255,255,0.07)"
              bg="rgba(255,255,255,0.03)"
              backdropFilter="blur(24px)"
              p={{ base: 8, md: 10 }}
              boxShadow="0 24px 80px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.06)"
              position="relative"
              overflow="hidden"
              minH="400px"
            >
              {/* Subtle top highlight */}
              <Box
                position="absolute" top={0} left="10%" right="10%"
                h="1px"
                bg="linear-gradient(90deg, transparent, rgba(0,229,255,0.3), transparent)"
                pointerEvents="none"
              />

              <AnimatePresence mode="wait">
                {!sent ? (
                  <MotionBox
                    key="form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    {/* Progress */}
                    <ProgressBar current={step + 1} total={STEPS.length} />

                    {/* Step counter */}
                    <Flex align="center" justify="space-between" mb={8}>
                      <Text fontSize="11px" fontWeight="700" color="gray.700" letterSpacing="0.25em">
                        STEP {String(step + 1).padStart(2, '0')} OF {String(STEPS.length).padStart(2, '0')}
                      </Text>
                      {step > 0 && (
                        <Text fontSize="11px" color="gray.700">
                          {STEPS.slice(0, step).filter(s => answers[s.id]).length} answered
                        </Text>
                      )}
                    </Flex>

                    {/* Animated question */}
                    <AnimatePresence mode="wait" custom={direction}>
                      <MotionBox
                        key={step}
                        custom={direction}
                        variants={slideVariants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                      >
                        <Heading
                          fontSize={{ base: '2xl', md: '3xl' }}
                          fontWeight="700"
                          mb={2}
                          letterSpacing="-0.02em"
                          lineHeight="1.25"
                          color="white"
                        >
                          {STEPS[step].question}
                        </Heading>
                        <Text fontSize="sm" color="gray.600" mb={8} lineHeight="1.6">
                          {STEPS[step].sub}
                        </Text>

                        <StepInput
                          step={STEPS[step]}
                          value={current}
                          onChange={setCurrent}
                          onNext={advance}
                          onBack={step > 0 ? goBack : null}
                          isLast={step === STEPS.length - 1}
                        />
                      </MotionBox>
                    </AnimatePresence>

                    {/* Previous answers summary */}
                    {Object.entries(answers).length > 0 && (
                      <Box mt={10} pt={6} borderTop="1px solid" borderColor="whiteAlpha.50">
                        <VStack align="start" spacing={3}>
                          {Object.entries(answers).map(([k, v]) =>
                            v ? (
                              <Flex key={k} align="flex-start" gap={3}>
                                <Box
                                  w="18px" h="18px" borderRadius="6px"
                                  bg="rgba(0,229,255,0.1)"
                                  display="flex" alignItems="center" justifyContent="center"
                                  flexShrink={0} mt="1px"
                                >
                                  <Icon as={FiCheck} color="cyan.400" boxSize={2.5} />
                                </Box>
                                <Box>
                                  <Text fontSize="9px" letterSpacing="0.2em" color="gray.700" fontWeight="800" mb="1px">
                                    {k.toUpperCase()}
                                  </Text>
                                  <Text fontSize="sm" color="gray.500" noOfLines={1}>{v}</Text>
                                </Box>
                              </Flex>
                            ) : null
                          )}
                        </VStack>
                      </Box>
                    )}
                  </MotionBox>
                ) : (
                  <MotionBox
                    key="success"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                    textAlign="center"
                    py={12}
                  >
                    <MotionBox
                      initial={{ scale: 0, rotate: -20 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ delay: 0.2, type: 'spring', stiffness: 250, damping: 20 }}
                      display="inline-flex"
                      mb={8}
                    >
                      <Box
                        w="72px" h="72px" borderRadius="20px"
                        bg="rgba(0,229,255,0.08)"
                        border="1px solid rgba(0,229,255,0.25)"
                        boxShadow="0 0 40px rgba(0,229,255,0.12)"
                        display="flex" alignItems="center" justifyContent="center"
                      >
                        <Icon as={FiCheck} color="cyan.400" boxSize={8} />
                      </Box>
                    </MotionBox>

                    <Heading
                      fontSize={{ base: '3xl', md: '4xl' }}
                      fontWeight="800"
                      letterSpacing="-0.02em"
                      mb={4}
                    >
                      Message{' '}
                      <Box as="span" color="cyan.400">received.</Box>
                    </Heading>
                    <Text color="gray.600" fontSize="md" maxW="320px" lineHeight="1.8" mx="auto" mb={10}>
                      We'll get back to you within 24 hours. We're excited to hear what you're building.
                    </Text>

                    <Button
                      as="a"
                      href="/verticals"
                      variant="ghost"
                      color="gray.600"
                      fontSize="sm"
                      letterSpacing="0.08em"
                      rightIcon={<FiChevronRight />}
                      _hover={{ color: 'cyan.400' }}
                      transition="all 0.2s"
                    >
                      Explore Verticals
                    </Button>
                  </MotionBox>
                )}
              </AnimatePresence>
            </Box>

            {/* Keyboard hint */}
            {!sent && (
              <Text fontSize="11px" color="gray.800" mt={4} textAlign="right">
                Press <Box as="kbd" px={1.5} py={0.5} borderRadius="5px" border="1px solid" borderColor="gray.800" fontSize="10px">Enter ↵</Box> to continue
              </Text>
            )}
          </MotionBox>

        </Flex>
      </Container>

      <Footer />

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.4; }
        }
        input::placeholder, textarea::placeholder { color: rgba(255,255,255,0.18); }
      `}</style>
    </Box>
  );
};

export default Contact;