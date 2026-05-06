import React, { useState, useRef, useEffect } from 'react';
import { Box, Input, VStack, Text, IconButton, Flex, Avatar, keyframes, Button, FormControl, FormLabel } from '@chakra-ui/react';
import { FiMessageSquare, FiX, FiSend, FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';
import { saveChatbotLead, saveChatMessage } from '../services/db';

const MotionBox = motion(Box);

const pulseRing = keyframes`
  0% { transform: scale(0.8); box-shadow: 0 0 0 0 rgba(0, 229, 255, 0.7); }
  70% { transform: scale(1.1); box-shadow: 0 0 0 15px rgba(0, 229, 255, 0); }
  100% { transform: scale(0.8); box-shadow: 0 0 0 0 rgba(0, 229, 255, 0); }
`;

// ─── Flow Steps ─────────────────────────────────────────────────────────────
const FLOW = {
  ENTRY: 'entry',
  INDUSTRY: 'industry',
  SCALE: 'scale',
  PAIN: 'pain',
  PITCH: 'pitch',
  USE_CASE_MENU: 'use_case_menu',
  USE_CASE_DETAIL: 'use_case_detail',
  DEMO_OFFER: 'demo_offer',
  DEMO_FORM: 'demo_form',
  CONFIRMED: 'confirmed',
  FREE_CHAT: 'free_chat',
  OTHER_INDUSTRY: 'other_industry',
};

// ─── Dynamic Pitch Generator ─────────────────────────────────────────────────
function buildPitch(answers) {
  const { industry, pain } = answers;
  if (industry === 'Finance / Accounts' && (pain === 'Excel & manual work' || pain === 'Delayed reports')) {
    return `It looks like you're dealing with manual data entry and delayed reporting. Zaivo can automate your Excel-to-Tally process, eliminate manual effort, and give you real-time financial visibility across all outlets. This is exactly the kind of execution gap we close.`;
  }
  if (industry === 'Manufacturing') {
    return `Your operations seem to be running across disconnected systems. Zaivo can unify your data, automate workflows, and give you real-time control over production and reporting — without adding headcount.`;
  }
  if (industry === 'Retail / Multi-outlet') {
    return `Managing multiple outlets manually slows down decisions. Zaivo centralises your data and gives you real-time visibility across all stores — so nothing falls through the cracks.`;
  }
  if (pain === 'No centralized system') {
    return `Running without a centralised system creates blind spots across your operations. Zaivo embeds into your existing workflows and builds a single source of truth — giving you control at scale.`;
  }
  if (pain === 'Data mismatch') {
    return `Data mismatches signal that your systems aren't talking to each other. Zaivo bridges those gaps by automating data flow, validation, and integration across your entire operation.`;
  }
  return `Based on your answers, there's a clear execution gap in your operations. Zaivo is built to close exactly this — automating workflows, connecting systems, and delivering real-time visibility without manual effort.`;
}

// ─── Use Case Content ────────────────────────────────────────────────────────
const USE_CASES = {
  'Show my use case': {
    title: '📦 Your Use Case',
    body: `Each outlet uploads data → Zaivo processes it automatically → Data is pushed into Tally → Reports are ready instantly.\n\n👉 No manual entry\n👉 No delays\n👉 No errors`,
  },
  'See automation flow': {
    title: '🔄 Automation Flow',
    body: `1. Data collected from all outlets\n2. Automatically validated\n3. Integrated into your system (Tally / ERP)\n4. Reports generated in real-time`,
  },
  'View sample dashboard': {
    title: '📊 Dashboard View',
    body: `You get a centralised dashboard showing:\n• Outlet-wise performance\n• Financial summaries\n• Real-time updates — always live, always accurate.`,
  },
};

// ─── Component ───────────────────────────────────────────────────────────────
export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [flowStep, setFlowStep] = useState(FLOW.ENTRY);
  const [answers, setAnswers] = useState({});
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: 'Hi! I\'m Zai, Zaivo\'s AI assistant. Let\'s find out how Zaivo can help your business. 👇',
      buttons: ['Reduce manual work', 'Automate reports', 'Integrate systems (Tally/ERP)', 'Get real-time visibility'],
    },
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [formData, setFormData] = useState({ name: '', company: '', phone: '', email: '', time: '' });
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  useEffect(() => {
    if (isOpen && flowStep === FLOW.FREE_CHAT && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [isOpen, flowStep]);

  // ─── Add a bot message ──────────────────────────────────────────────────
  const addBot = (content, buttons = null, extra = {}) => {
    setMessages(prev => [...prev, { role: 'assistant', content, buttons, ...extra }]);
  };

  const addUser = (content) => {
    setMessages(prev => [...prev, { role: 'user', content }]);
  };

  // ─── Button Click Handler ───────────────────────────────────────────────
  const handleOption = (option) => {
    addUser(option);

    setTimeout(() => {
      if (flowStep === FLOW.ENTRY) {
        setAnswers(prev => ({ ...prev, goal: option }));
        setFlowStep(FLOW.INDUSTRY);
        addBot(
          'Got it. Which industry are you in?',
          ['Manufacturing', 'Retail / Multi-outlet', 'Finance / Accounts', 'Pharma / Healthcare', 'Other']
        );

      } else if (flowStep === FLOW.INDUSTRY) {
        if (option === 'Other') {
          setFlowStep(FLOW.OTHER_INDUSTRY);
          addBot("No problem! What industry or business type are you in? Type it below 👇");
        } else {
          setAnswers(prev => ({ ...prev, industry: option }));
          setFlowStep(FLOW.SCALE);
          addBot(
            'How many locations or teams are involved?',
            ['1–5', '5–20', '20+']
          );
        }

      } else if (flowStep === FLOW.SCALE) {
        setAnswers(prev => ({ ...prev, scale: option }));
        setFlowStep(FLOW.PAIN);
        addBot(
          "What's your biggest challenge today?",
          ['Excel & manual work', 'Data mismatch', 'Delayed reports', 'No centralized system']
        );

      } else if (flowStep === FLOW.PAIN) {
        const updatedAnswers = { ...answers, pain: option };
        setAnswers(updatedAnswers);
        setFlowStep(FLOW.PITCH);
        const pitch = buildPitch(updatedAnswers);
        addBot(pitch);
        setTimeout(() => {
          addBot(
            'Would you like to see how this works in your business?',
            ['Show my use case', 'See automation flow', 'View sample dashboard']
          );
          setFlowStep(FLOW.USE_CASE_MENU);
        }, 800);

      } else if (flowStep === FLOW.USE_CASE_MENU) {
        setFlowStep(FLOW.USE_CASE_DETAIL);
        const uc = USE_CASES[option];
        addBot(`${uc.title}\n\n${uc.body}`);
        setTimeout(() => {
          addBot(
            'This looks like a great fit for your business. Would you like to see this live in action?',
            ['Yes, book a demo', 'Talk to an expert']
          );
          setFlowStep(FLOW.DEMO_OFFER);
        }, 800);

      } else if (flowStep === FLOW.DEMO_OFFER) {
        setFlowStep(FLOW.DEMO_FORM);
        addBot("Great! Let me collect a few details to set up your demo. What's your name?");

      } else if (option === 'Start over') {
        handleReset();
      }
    }, 300);
  };

  // ─── Demo Form Submission ───────────────────────────────────────────────
  const handleFormSubmit = async () => {
    if (!formData.name || !formData.phone || !formData.email) {
      addBot('Please fill in your name, phone, and email to continue.');
      return;
    }
    addUser(`Name: ${formData.name} | Company: ${formData.company} | Phone: ${formData.phone} | Email: ${formData.email} | Time: ${formData.time}`);
    setFlowStep(FLOW.CONFIRMED);
    addBot(
      `Great, ${formData.name}! Our team will connect with you shortly to show how Zaivo can automate your operations. 🚀`,
      ['Start over']
    );

    // ── Persist to Firestore ────────────────────────────────────────────────
    try {
      await saveChatbotLead(formData, answers);
    } catch (err) {
      // DB failure must never break the UX — log silently
      console.error('[Zaivo DB] Failed to save chatbot lead:', err);
    }
  };

  // ─── Free-text AI Chat (fallback) ───────────────────────────────────────
  const SYSTEM_PROMPT = `You are Zai, Zaivo's AI assistant. Reply in 1–3 sentences max. No bullet points, no lists. Be punchy and professional. Only discuss Zaivo, Techygramam, industrial automation, and related workflows.`;

  const handleSend = async (overrideText) => {
    const text = overrideText || input;
    if (!text.trim()) return;
    addUser(text);
    setInput('');
    setIsTyping(true);
    try {
      const res = await fetch('https://api.groq.com/openai/v1/chat/completions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${import.meta.env.VITE_GROQ_API_KEY}` },
        body: JSON.stringify({
          model: 'llama-3.3-70b-versatile',
          messages: [
            { role: 'system', content: SYSTEM_PROMPT },
            ...messages.filter(m => !m.buttons).map(m => ({ role: m.role, content: m.content })),
            { role: 'user', content: text },
          ],
          max_tokens: 80,
          temperature: 0.7,
        }),
      });
      const data = await res.json();
      if (res.ok && data.choices?.length > 0) {
        const reply = data.choices[0].message.content;
        addBot(reply);
        // ── Persist conversation pair to Firestore ──────────────────────────
        try {
          await saveChatMessage(text, reply);
        } catch (err) {
          console.error('[Zaivo DB] Failed to save chat message:', err);
        }
      } else {
        addBot("I'm having a moment — please try again.");
      }
    } catch {
      addBot("Connection issue. Please check your network and try again.");
    } finally {
      setIsTyping(false);
    }
  };

  // ─── Other Industry Text Input ──────────────────────────────────────────
  const handleOtherIndustry = () => {
    const text = input.trim();
    if (!text) return;
    addUser(text);
    setInput('');
    setAnswers(prev => ({ ...prev, industry: text }));
    setFlowStep(FLOW.SCALE);
    setTimeout(() => {
      addBot('How many locations or teams are involved?', ['1–5', '5–20', '20+']);
    }, 300);
  };

  const handleReset = () => {
    setFlowStep(FLOW.ENTRY);
    setAnswers({});
    setFormData({ name: '', company: '', phone: '', email: '', time: '' });
    setMessages([{
      role: 'assistant',
      content: "Hi! I'm Zai, Zaivo's AI assistant. Let's find out how Zaivo can help your business. 👇",
      buttons: ['Reduce manual work', 'Automate reports', 'Integrate systems (Tally/ERP)', 'Get real-time visibility'],
    }]);
  };

  const showInput = flowStep === FLOW.FREE_CHAT;
  const showDemoForm = flowStep === FLOW.DEMO_FORM;
  const showOtherInput = flowStep === FLOW.OTHER_INDUSTRY;
  const latestBotButtons = [...messages].reverse().find(m => m.role === 'assistant' && m.buttons)?.buttons ?? null;
  const showButtons = !showInput && !showDemoForm && !showOtherInput && !!latestBotButtons;

  return (
    <>
      {/* Toggle Button */}
      <Box position="fixed" bottom="24px" right="24px" zIndex={1000}>
        <AnimatePresence>
          {!isOpen && (
            <MotionBox
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            >
              <Box animation={`${pulseRing} 2s ease-out infinite`} borderRadius="full" display="inline-block">
                <IconButton
                  icon={<FiMessageSquare size={22} />}
                  onClick={() => setIsOpen(true)}
                  borderRadius="full"
                  size="lg"
                  w="56px"
                  h="56px"
                  bg="cyan.400"
                  color="gray.900"
                  _hover={{ bg: 'cyan.300', transform: 'scale(1.1)' }}
                  boxShadow="0 0 20px rgba(0,229,255,0.5)"
                  aria-label="Open Zai Chatbot"
                />
              </Box>
            </MotionBox>
          )}
        </AnimatePresence>
      </Box>

      {/* Chat Panel */}
      <AnimatePresence>
        {isOpen && (
          <MotionBox
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 40, scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            position="fixed"
            bottom="24px"
            right="24px"
            zIndex={1000}
            w={{ base: 'calc(100vw - 32px)', sm: '390px' }}
            h="600px"
            maxH="88vh"
            display="flex"
            flexDirection="column"
            bg="rgba(10, 10, 20, 0.90)"
            backdropFilter="blur(18px)"
            border="1px solid"
            borderColor="whiteAlpha.200"
            borderRadius="20px"
            overflow="hidden"
            boxShadow="0 8px 40px rgba(0,0,0,0.6), 0 0 0 1px rgba(0,229,255,0.1)"
            fontFamily="'Outfit', sans-serif"
          >
            {/* Header */}
            <Flex p={4} bg="whiteAlpha.50" borderBottom="1px solid" borderColor="whiteAlpha.100" align="center" justify="space-between">
              <Flex align="center" gap={3}>
                <Avatar size="sm" name="Zai" bg="cyan.400" color="gray.900" fontWeight="bold" fontSize="xs" />
                <Box>
                  <Text fontWeight="700" fontSize="sm" color="white" letterSpacing="wide">ZAI</Text>
                  <Text fontSize="xs" color="cyan.300">Zaivo AI Assistant • Online</Text>
                </Box>
              </Flex>
              <Flex gap={1}>
                <IconButton icon={<FiX />} onClick={() => setIsOpen(false)} variant="ghost" size="sm"
                  color="whiteAlpha.600" _hover={{ color: 'white', bg: 'whiteAlpha.100' }}
                  borderRadius="full" aria-label="Close chat" />
              </Flex>
            </Flex>

            {/* Messages */}
            <VStack
              flex={1}
              p={4}
              overflowY="auto"
              spacing={4}
              align="stretch"
              css={{
                '&::-webkit-scrollbar': { width: '4px' },
                '&::-webkit-scrollbar-track': { background: 'transparent' },
                '&::-webkit-scrollbar-thumb': { background: 'rgba(0,229,255,0.3)', borderRadius: '4px' },
              }}
            >
              {messages.map((msg, idx) => (
                <Box key={idx}>
                  <Flex justify={msg.role === 'user' ? 'flex-end' : 'flex-start'} align="flex-end" gap={2}>
                    {msg.role === 'assistant' && (
                      <Avatar size="xs" name="Zai" bg="cyan.400" color="gray.900" fontWeight="bold" fontSize="9px" flexShrink={0} />
                    )}
                    <Box
                      maxW="82%"
                      px={3} py={2}
                      borderRadius={msg.role === 'user' ? '16px 16px 4px 16px' : '16px 16px 16px 4px'}
                      bg={msg.role === 'user' ? 'cyan.400' : 'whiteAlpha.100'}
                      color={msg.role === 'user' ? 'gray.900' : 'whiteAlpha.900'}
                      fontSize="sm"
                      fontWeight={msg.role === 'user' ? '600' : '400'}
                      whiteSpace="pre-wrap"
                      lineHeight="1.7"
                    >
                      {msg.content}
                    </Box>
                  </Flex>


                </Box>
              ))}

              {/* Typing */}
              {isTyping && (
                <Flex align="flex-end" gap={2}>
                  <Avatar size="xs" name="Zai" bg="cyan.400" color="gray.900" fontWeight="bold" fontSize="9px" flexShrink={0} />
                  <Box px={3} py={2} borderRadius="16px 16px 16px 4px" bg="whiteAlpha.100">
                    <Flex gap="4px" align="center" h="20px">
                      {[0, 1, 2].map((i) => (
                        <Box key={i} w="6px" h="6px" bg="cyan.400" borderRadius="full"
                          animation={`${pulseRing} 1.2s ease-in-out ${i * 0.2}s infinite`} />
                      ))}
                    </Flex>
                  </Box>
                </Flex>
              )}
              <div ref={messagesEndRef} />
            </VStack>

            {/* ── Sticky Buttons Panel (guided flow) ─────────────────── */}
            {showButtons && (
              <Box
                borderTop="1px solid"
                borderColor="whiteAlpha.100"
                bg="rgba(10,10,20,0.85)"
                backdropFilter="blur(12px)"
                px={3}
                pt={2}
                pb={3}
              >
                {/* Ask freely toggle */}
                <Flex justify="flex-end" mb={2}>
                  <Button
                    size="sm"
                    variant="ghost"
                    color="cyan.500"
                    _hover={{ color: 'cyan.200', bg: 'whiteAlpha.100' }}
                    fontSize="12px"
                    leftIcon={<FiMessageSquare size={13} />}
                    borderRadius="full"
                    px={3}
                    onClick={() => {
                      setFlowStep(FLOW.FREE_CHAT);
                      addBot('Sure! Ask me anything about Zaivo. 💬');
                    }}
                  >
                    Ask freely
                  </Button>
                </Flex>

                {/* Current step buttons */}
                <Flex flexWrap="wrap" gap={2}>
                  {latestBotButtons.map((btn, bi) => (
                    <Button
                      key={bi}
                      size="xs"
                      variant="outline"
                      colorScheme="cyan"
                      borderColor="cyan.600"
                      color="cyan.300"
                      bg="transparent"
                      _hover={{ bg: 'cyan.900', borderColor: 'cyan.400', color: 'cyan.100' }}
                      borderRadius="full"
                      fontSize="11px"
                      px={3}
                      py={4}
                      whiteSpace="normal"
                      textAlign="left"
                      h="auto"
                      onClick={() => handleOption(btn)}
                    >
                      {btn}
                    </Button>
                  ))}
                </Flex>
              </Box>
            )}

            {/* ── Demo Booking Form ───────────────────────────────────── */}
            {showDemoForm && (
              <Box px={4} py={3} borderTop="1px solid" borderColor="whiteAlpha.100" bg="whiteAlpha.50">
                <VStack spacing={2}>
                  <Flex gap={2} w="full">
                    <Input size="sm" placeholder="Your name *" borderRadius="full" bg="whiteAlpha.100"
                      border="1px solid" borderColor="whiteAlpha.200" color="white"
                      _placeholder={{ color: 'whiteAlpha.400', fontSize: 'xs' }}
                      _focus={{ borderColor: 'cyan.400', outline: 'none' }}
                      value={formData.name} onChange={e => setFormData(p => ({ ...p, name: e.target.value }))} />
                    <Input size="sm" placeholder="Company" borderRadius="full" bg="whiteAlpha.100"
                      border="1px solid" borderColor="whiteAlpha.200" color="white"
                      _placeholder={{ color: 'whiteAlpha.400', fontSize: 'xs' }}
                      _focus={{ borderColor: 'cyan.400', outline: 'none' }}
                      value={formData.company} onChange={e => setFormData(p => ({ ...p, company: e.target.value }))} />
                  </Flex>
                  <Flex gap={2} w="full">
                    <Input size="sm" placeholder="Phone *" borderRadius="full" bg="whiteAlpha.100"
                      border="1px solid" borderColor="whiteAlpha.200" color="white"
                      _placeholder={{ color: 'whiteAlpha.400', fontSize: 'xs' }}
                      _focus={{ borderColor: 'cyan.400', outline: 'none' }}
                      value={formData.phone} onChange={e => setFormData(p => ({ ...p, phone: e.target.value }))} />
                    <Input size="sm" placeholder="Email *" borderRadius="full" bg="whiteAlpha.100"
                      border="1px solid" borderColor="whiteAlpha.200" color="white"
                      _placeholder={{ color: 'whiteAlpha.400', fontSize: 'xs' }}
                      _focus={{ borderColor: 'cyan.400', outline: 'none' }}
                      value={formData.email} onChange={e => setFormData(p => ({ ...p, email: e.target.value }))} />
                  </Flex>
                  <Input size="sm" placeholder="Preferred time (e.g. Mon 10am)" borderRadius="full" bg="whiteAlpha.100"
                    border="1px solid" borderColor="whiteAlpha.200" color="white"
                    _placeholder={{ color: 'whiteAlpha.400', fontSize: 'xs' }}
                    _focus={{ borderColor: 'cyan.400', outline: 'none' }}
                    value={formData.time} onChange={e => setFormData(p => ({ ...p, time: e.target.value }))} />
                  <Button size="sm" w="full" bg="cyan.400" color="gray.900" fontWeight="bold"
                    borderRadius="full" _hover={{ bg: 'cyan.300' }} onClick={handleFormSubmit}>
                    Book My Demo →
                  </Button>
                </VStack>
              </Box>
            )}

            {/* ── Other Industry Text Input ────────────────────────────── */}
            {showOtherInput && (
              <Flex p={3} borderTop="1px solid" borderColor="whiteAlpha.100" gap={2} align="center" bg="whiteAlpha.50">
                <Input
                  autoFocus
                  value={input}
                  onChange={e => setInput(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && handleOtherIndustry()}
                  placeholder="e.g. Logistics, EdTech, Real Estate..."
                  size="sm" bg="whiteAlpha.100" border="1px solid" borderColor="whiteAlpha.200"
                  color="white" borderRadius="full"
                  _placeholder={{ color: 'whiteAlpha.400', fontSize: 'xs' }}
                  _focus={{ borderColor: 'cyan.400', boxShadow: '0 0 0 1px rgba(0,229,255,0.4)', outline: 'none' }}
                  fontSize="sm"
                />
                <IconButton icon={<FiSend size={15} />} onClick={handleOtherIndustry}
                  size="sm" borderRadius="full" bg="cyan.400" color="gray.900"
                  _hover={{ bg: 'cyan.300' }} flexShrink={0} aria-label="Submit industry" />
              </Flex>
            )}

            {/* ── Free Chat Input ─────────────────────────────────────── */}
            {showInput && (
              <Flex p={3} borderTop="1px solid" borderColor="whiteAlpha.100" gap={2} align="center" bg="whiteAlpha.50">
                <Input
                  ref={inputRef}
                  value={input}
                  onChange={e => setInput(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && handleSend()}
                  placeholder="Ask me anything about Zaivo..."
                  size="sm" bg="whiteAlpha.100" border="1px solid" borderColor="whiteAlpha.200"
                  color="white" borderRadius="full"
                  _placeholder={{ color: 'whiteAlpha.400', fontSize: 'xs' }}
                  _focus={{ borderColor: 'cyan.400', boxShadow: '0 0 0 1px rgba(0,229,255,0.4)', outline: 'none' }}
                  fontSize="sm"
                />
                <IconButton icon={<FiSend size={15} />} onClick={() => handleSend()} isLoading={isTyping}
                  size="sm" borderRadius="full" bg="cyan.400" color="gray.900"
                  _hover={{ bg: 'cyan.300' }} flexShrink={0} aria-label="Send" />
              </Flex>
            )}
          </MotionBox>
        )}
      </AnimatePresence>
    </>
  );
}
