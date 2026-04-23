import React, { useState, useRef, useEffect } from 'react';
import {
  Box, Text, Heading, Icon, Flex, VStack, HStack, Button, Container,
} from '@chakra-ui/react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiArrowRight, FiMail, FiPhone, FiCheck, FiChevronRight } from 'react-icons/fi';
import emailjs from 'emailjs-com';
import Footer from '../Components/Footer';

const MotionBox = motion(Box);
const MotionText = motion(Text);

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

  const handleKey = (e) => {
    if (e.key === 'Enter' && !e.shiftKey && !step.multiline) {
      e.preventDefault();
      onNext();
    }
  };

  const sharedStyle = {
    background: 'transparent',
    border: 'none',
    borderBottom: '2px solid rgba(0,255,255,0.25)',
    color: 'white',
    fontSize: '22px',
    fontFamily: "'Inter', sans-serif",
    fontWeight: 300,
    outline: 'none',
    width: '100%',
    padding: '12px 0',
    resize: 'none',
    caretColor: '#00FFFF',
    letterSpacing: '-0.01em',
    transition: 'border-color 0.3s',
  };

  return (
    <Box>
      {step.multiline ? (
        <textarea
          ref={inputRef}
          autoFocus
          rows={3}
          placeholder={step.placeholder}
          value={value}
          onChange={e => onChange(e.target.value)}
          onKeyDown={handleKey}
          style={sharedStyle}
        />
      ) : (
        <input
          ref={inputRef}
          autoFocus
          type={step.type || 'text'}
          placeholder={step.placeholder}
          value={value}
          onChange={e => onChange(e.target.value)}
          onKeyDown={handleKey}
          style={sharedStyle}
        />
      )}

      <Flex align="center" gap={4} mt={8}>
        {onBack && (
          <Button
            onClick={onBack}
            variant="ghost"
            size="lg"
            h="52px"
            px={8}
            color="whiteAlpha.400"
            fontWeight="700"
            fontSize="sm"
            letterSpacing="0.05em"
            borderRadius="full"
            _hover={{ color: 'cyan.400', bg: 'whiteAlpha.50' }}
            transition="all 0.3s"
          >
            Previous
          </Button>
        )}
        <Button
          onClick={onNext}
          size="lg"
          h="52px"
          px={8}
          bg={value || !step.required ? 'cyan.400' : 'whiteAlpha.100'}
          color={value || !step.required ? 'black' : 'gray.600'}
          fontWeight="800"
          fontSize="sm"
          letterSpacing="0.05em"
          borderRadius="full"
          rightIcon={<FiArrowRight />}
          _hover={value || !step.required ? {
            bg: 'white',
            transform: 'translateY(-2px)',
            boxShadow: '0 0 30px rgba(0,255,255,0.3)',
          } : {}}
          transition="all 0.3s"
          cursor={value || !step.required ? 'pointer' : 'not-allowed'}
        >
          {isLast ? 'Send it' : 'Next'}
        </Button>
      </Flex>
    </Box>
  );
};

const ProgressBar = ({ current, total }) => (
  <HStack spacing={2} mb={12}>
    {Array.from({ length: total }).map((_, i) => (
      <Box
        key={i}
        h="2px"
        flex={1}
        borderRadius="full"
        bg={i < current ? 'cyan.400' : 'whiteAlpha.100'}
        boxShadow={i < current ? '0 0 8px #00FFFF' : 'none'}
        transition="all 0.4s ease"
      />
    ))}
  </HStack>
);

const Contact = () => {
  const form = useRef();
  const [step, setStep]         = useState(0);
  const [answers, setAnswers]   = useState({});
  const [current, setCurrent]   = useState('');
  const [sent, setSent]         = useState(false);
  const [sending, setSending]   = useState(false);
  const [direction, setDirection] = useState(1);

  useEffect(() => {
    if (sent) {
      const timer = setTimeout(() => {
        setSent(false);
        setStep(0);
        setAnswers({});
        setCurrent('');
        setDirection(1);
      }, 1500); // Closes the popup state and resets form after 1.5s
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

      setSending(true);
      setSending(true);
      
      const message = `*New Contact Request via ZaivoOS*\n\n*Email*: ${updated.email || 'N/A'}\n*Organization*: ${updated.organization || 'N/A'}\n*Need Help With*: ${updated.help || 'N/A'}\n*Phone*: ${updated.phone || 'N/A'}`;
      
      const whatsappUrl = `https://wa.me/919384100252?text=${encodeURIComponent(message)}`;
      window.open(whatsappUrl, '_blank');
      
      setSending(false);
      setSent(true);
    }
  };

  const goBack = () => {
    if (step > 0) {
      setDirection(-1);
      const prevStep = step - 1;
      setStep(prevStep);
      setCurrent(answers[STEPS[prevStep].id] || '');
    }
  };

  const slideVariants = {
    enter: (dir) => ({ opacity: 0, x: dir > 0 ? 60 : -60 }),
    center:       { opacity: 1, x: 0 },
    exit: (dir)  => ({ opacity: 0, x: dir > 0 ? -60 : 60 }),
  };

  return (
    <Box bg="#050505" color="white" minH="100vh" position="relative" overflow="hidden">

      <Box
        position="fixed" top="-10%" right="-10%"
        w="600px" h="600px"
        bg="radial-gradient(circle, rgba(0,255,255,0.06) 0%, transparent 70%)"
        pointerEvents="none" zIndex={0}
      />
      <Box
        position="fixed" bottom="-20%" left="-10%"
        w="500px" h="500px"
        bg="radial-gradient(circle, rgba(0,255,255,0.03) 0%, transparent 70%)"
        pointerEvents="none" zIndex={0}
      />

      <Container maxW="container.xl" position="relative" zIndex={1}>
        <Flex
          direction={{ base: 'column', lg: 'row' }}
          minH="100vh"
          pt={{ base: 32, md: 40 }}
          pb={20}
          gap={{ base: 16, lg: 0 }}
        >

          <Box
            flex="0 0 40%"
            pr={{ base: 0, lg: 20 }}
            display="flex"
            flexDirection="column"
            justifyContent="center"
          >
            <MotionBox
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            >

              <Text fontSize="10px" fontWeight="900" letterSpacing="0.3em" color="cyan.500" mb={8}>
                START A CONVERSATION
              </Text>
              <Heading
                fontSize={{ base: '5xl', md: '7xl' }}
                fontWeight="900"
                lineHeight="0.95"
                letterSpacing="-0.03em"
                mb={8}
              >
                Let's<br />
                build<br />
                <Text as="span" color="cyan.400">together.</Text>
              </Heading>

              <Text color="gray.500" fontSize="lg" lineHeight="1.8" mb={12}>
                Tell us what you're building.<br />
                We'll help you make it run.
              </Text>

              <VStack align="start" spacing={5}>
                <a href="mailto:connect@zaivo.com" style={{ textDecoration: 'none' }}>
                  <HStack spacing={4} cursor="pointer" _hover={{ opacity: 0.8 }} transition="0.2s">
                    <Box
                      w="38px" h="38px" borderRadius="full"
                      border="1px solid rgba(0,255,255,0.15)"
                      bg="rgba(0,255,255,0.04)"
                      display="flex" alignItems="center" justifyContent="center"
                      flexShrink={0}
                    >
                      <Icon as={FiMail} color="cyan.400" boxSize="14px" />
                    </Box>
                    <Text fontSize="sm" color="gray.400" _groupHover={{ color: 'cyan.400' }}>connect@zaivo.com</Text>
                  </HStack>
                </a>

                <a href="https://wa.me/919384100252" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
                  <HStack spacing={4} cursor="pointer" _hover={{ opacity: 0.8 }} transition="0.2s">
                    <Box
                      w="38px" h="38px" borderRadius="full"
                      border="1px solid rgba(0,255,255,0.15)"
                      bg="rgba(0,255,255,0.04)"
                      display="flex" alignItems="center" justifyContent="center"
                      flexShrink={0}
                    >
                      <Icon as={FiPhone} color="cyan.400" boxSize="14px" />
                    </Box>
                    <Text fontSize="sm" color="gray.400">+91 93841 00252</Text>
                  </HStack>
                </a>
              </VStack>

              {}
              <Box mt={14} pt={10} borderTop="1px solid" borderColor="whiteAlpha.100">
                <Text fontSize="xs" color="gray.700" fontStyle="italic" lineHeight="1.8">
                  "The best UX is invisible. Users should feel{' '}
                  <Text as="span" color="gray.500" fontStyle="normal">'That was easy'</Text>
                  {' '}— not 'That was a form.'"
                </Text>
              </Box>
            </MotionBox>
          </Box>

          {}
          <Box
            flex="1"
            display="flex"
            flexDirection="column"
            justifyContent="center"
            pl={{ base: 0, lg: 20 }}
            borderLeft={{ base: 'none', lg: '1px solid' }}
            borderColor="whiteAlpha.100"
          >
            <AnimatePresence mode="wait">
              {!sent ? (
                <MotionBox
                  key="form"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                >
                  {}
                  <ProgressBar current={step + 1} total={STEPS.length} />

                  {}
                  <Text fontSize="10px" fontWeight="900" color="gray.700" letterSpacing="0.3em" mb={6}>
                    {String(step + 1).padStart(2, '0')} / {String(STEPS.length).padStart(2, '0')}
                  </Text>

                  {}
                  <AnimatePresence mode="wait" custom={direction}>
                    <MotionBox
                      key={step}
                      custom={direction}
                      variants={slideVariants}
                      initial="enter"
                      animate="center"
                      exit="exit"
                      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                    >
                      <Heading
                        fontSize={{ base: '2xl', md: '4xl' }}
                        fontWeight="700"
                        mb={2}
                        letterSpacing="-0.02em"
                        lineHeight="1.2"
                      >
                        {STEPS[step].question}
                      </Heading>
                      <Text fontSize="sm" color="gray.600" mb={8}>
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

                  {}
                  {Object.entries(answers).length > 0 && (
                    <Box mt={14} pt={6} borderTop="1px solid" borderColor="whiteAlpha.50">
                      <VStack align="start" spacing={3}>
                        {Object.entries(answers).map(([k, v]) => (
                          v && (
                            <Flex key={k} align="start" gap={3}>
                              <Icon as={FiCheck} color="cyan.700" mt="3px" boxSize={3} />
                              <Box>
                                <Text fontSize="9px" letterSpacing="0.2em" color="gray.700" fontWeight="900">
                                  {k.toUpperCase()}
                                </Text>
                                <Text fontSize="sm" color="gray.500" noOfLines={1}>{v}</Text>
                              </Box>
                            </Flex>
                          )
                        ))}
                      </VStack>
                    </Box>
                  )}
                </MotionBox>
              ) : (

                <MotionBox
                  key="success"
                  initial={{ opacity: 0, scale: 0.92 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                >
                  <MotionBox
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
                    display="inline-flex"
                    mb={10}
                  >
                    <Box
                      w="72px" h="72px" borderRadius="full"
                      bg="rgba(0,255,255,0.08)"
                      border="1px solid rgba(0,255,255,0.3)"
                      boxShadow="0 0 40px rgba(0,255,255,0.15)"
                      display="flex" alignItems="center" justifyContent="center"
                    >
                      <Icon as={FiCheck} color="cyan.400" boxSize={8} />
                    </Box>
                  </MotionBox>

                  <Heading
                    fontSize={{ base: '4xl', md: '6xl' }}
                    fontWeight="900"
                    lineHeight="1.05"
                    letterSpacing="-0.02em"
                    mb={6}
                  >
                    Message<br />
                    <Text as="span" color="cyan.400">received.</Text>
                  </Heading>
                  <Text color="gray.500" fontSize="lg" maxW="360px" lineHeight="1.8">
                    We'll get back to you within 24 hours. In the meantime, see how Zaivo operates.
                  </Text>

                  <Button
                    mt={12}
                    as="a"
                    href="/verticals"
                    variant="ghost"
                    color="gray.500"
                    fontSize="sm"
                    letterSpacing="0.1em"
                    rightIcon={<FiChevronRight />}
                    _hover={{ color: 'cyan.400' }}
                  >
                    Explore Verticals
                  </Button>
                </MotionBox>
              )}
            </AnimatePresence>
          </Box>

        </Flex>
      </Container>
      <Footer />
    </Box>
  );
};

export default Contact;