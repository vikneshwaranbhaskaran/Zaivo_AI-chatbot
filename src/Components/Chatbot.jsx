import React, { useState, useRef, useEffect } from 'react';
import { Box, Input, VStack, Text, IconButton, Flex, Avatar, keyframes, Button, FormControl, FormLabel } from '@chakra-ui/react';
import { FiMessageSquare, FiX, FiSend, FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';
import { saveChatbotLead, saveChatMessage } from '../services/db';

const MotionBox = motion(Box);

const pulseRing = keyframes`
  0% { transform: scale(0.8); box-shadow: 0 0 0 0 rgba(11, 197, 234, 0.7); }
  70% { transform: scale(1.1); box-shadow: 0 0 0 15px rgba(11, 197, 234, 0.7); }
  100% { transform: scale(0.8); box-shadow: 0 0 0 0 rgba(11, 197, 234, 0.7); }
`;

const floatingAnimation = keyframes`
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-8px); }
`;

const eyeBlinkAnimation = keyframes`
  0%, 82%, 100% { transform: scaleY(0); opacity: 0; }
  85% { transform: scaleY(0.15); opacity: 1; }
  87% { transform: scaleY(1); opacity: 1; }
  89% { transform: scaleY(0.15); opacity: 1; }
  92% { transform: scaleY(0); opacity: 0; }
`;
// â”€â”€â”€ Flow Steps â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
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

// â”€â”€â”€ Dynamic Pitch Generator â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
function buildPitch(answers) {
  const { industry, pain } = answers;
  if (industry === 'Finance / Accounts' && (pain === 'Excel & manual work' || pain === 'Delayed reports')) {
    return `It looks like you're dealing with manual data entry and delayed reporting. Zaivo can automate your Excel-to-Tally process, eliminate manual effort, and give you real-time financial visibility across all outlets. This is exactly the kind of execution gap we close.`;
  }
  if (industry === 'Manufacturing') {
    return `Your operations seem to be running across disconnected systems. Zaivo can unify your data, automate workflows, and give you real-time control over production and reporting â€” without adding headcount.`;
  }
  if (industry === 'Retail / Multi-outlet') {
    return `Managing multiple outlets manually slows down decisions. Zaivo centralises your data and gives you real-time visibility across all stores â€” so nothing falls through the cracks.`;
  }
  if (pain === 'No centralized system') {
    return `Running without a centralised system creates blind spots across your operations. Zaivo embeds into your existing workflows and builds a single source of truth â€” giving you control at scale.`;
  }
  if (pain === 'Data mismatch') {
    return `Data mismatches signal that your systems aren't talking to each other. Zaivo bridges those gaps by automating data flow, validation, and integration across your entire operation.`;
  }
  return `Based on your answers, there's a clear execution gap in your operations. Zaivo is built to close exactly this â€” automating workflows, connecting systems, and delivering real-time visibility without manual effort.`;
}

// â”€â”€â”€ Use Case Content â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
const USE_CASES = {
  'Show my use case': {
    title: 'ðŸ“¦ Your Use Case',
    body: `Each outlet uploads data â†’ Zaivo processes it automatically â†’ Data is pushed into Tally â†’ Reports are ready instantly.\n\nðŸ‘‰ No manual entry\nðŸ‘‰ No delays\nðŸ‘‰ No errors`,
  },
  'See automation flow': {
    title: 'ðŸ”„ Automation Flow',
    body: `1. Data collected from all outlets\n2. Automatically validated\n3. Integrated into your system (Tally / ERP)\n4. Reports generated in real-time`,
  },
  'View sample dashboard': {
    title: 'ðŸ“Š Dashboard View',
    body: `You get a centralised dashboard showing:\nâ€¢ Outlet-wise performance\nâ€¢ Financial summaries\nâ€¢ Real-time updates â€” always live, always accurate.`,
  },
};

// â”€â”€â”€ Component â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [flowStep, setFlowStep] = useState(FLOW.ENTRY);
  const [answers, setAnswers] = useState({});
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: 'Hi! I\'m Zai, Zaivo\'s AI assistant. Let\'s find out how Zaivo can help your business. ðŸ‘‡',
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

  // â”€â”€â”€ Add a bot message â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  const addBot = (content, buttons = null, extra = {}) => {
    setMessages(prev => [...prev, { role: 'assistant', content, buttons, ...extra }]);
  };

  const addUser = (content) => {
    setMessages(prev => [...prev, { role: 'user', content }]);
  };

  // â”€â”€â”€ Button Click Handler â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
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
          addBot("No problem! What industry or business type are you in? Type it below ðŸ‘‡");
        } else {
          setAnswers(prev => ({ ...prev, industry: option }));
          setFlowStep(FLOW.SCALE);
          addBot(
            'How many locations or teams are involved?',
            ['1â€“5', '5â€“20', '20+']
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

  // â”€â”€â”€ Demo Form Submission â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  const handleFormSubmit = async () => {
    if (!formData.name || !formData.phone || !formData.email) {
      addBot('Please fill in your name, phone, and email to continue.');
      return;
    }
    addUser(`Name: ${formData.name} | Company: ${formData.company} | Phone: ${formData.phone} | Email: ${formData.email} | Time: ${formData.time}`);
    setFlowStep(FLOW.CONFIRMED);
    addBot(
      `Great, ${formData.name}! Our team will connect with you shortly to show how Zaivo can automate your operations. ðŸš€`,
      ['Start over']
    );

    // â”€â”€ Persist to Firestore â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
    try {
      await saveChatbotLead(formData, answers);
    } catch (err) {
      // DB failure must never break the UX â€” log silently
      console.error('[Zaivo DB] Failed to save chatbot lead:', err);
    }
  };

  // â”€â”€â”€ Free-text AI Chat (fallback) â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  const SYSTEM_PROMPT = `You are Zai, Zaivo's AI assistant. Reply in 1â€“3 sentences max. No bullet points, no lists. Be punchy and professional. Only discuss Zaivo, Techygramam, industrial automation, and related workflows.`;

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
        // â”€â”€ Persist conversation pair to Firestore â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
        try {
          await saveChatMessage(text, reply);
        } catch (err) {
          console.error('[Zaivo DB] Failed to save chat message:', err);
        }
      } else {
        addBot("I'm having a moment â€” please try again.");
      }
    } catch {
      addBot("Connection issue. Please check your network and try again.");
    } finally {
      setIsTyping(false);
    }
  };

  // â”€â”€â”€ Other Industry Text Input â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  const handleOtherIndustry = () => {
    const text = input.trim();
    if (!text) return;
    addUser(text);
    setInput('');
    setAnswers(prev => ({ ...prev, industry: text }));
    setFlowStep(FLOW.SCALE);
    setTimeout(() => {
      addBot('How many locations or teams are involved?', ['1â€“5', '5â€“20', '20+']);
    }, 300);
  };

  const handleReset = () => {
    setFlowStep(FLOW.ENTRY);
    setAnswers({});
    setFormData({ name: '', company: '', phone: '', email: '', time: '' });
    setMessages([{
      role: 'assistant',
      content: "Hi! I'm Zai, Zaivo's AI assistant. Let's find out how Zaivo can help your business. ðŸ‘‡",
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
              <Box borderRadius="12px" display="inline-block">
                <IconButton
                  icon={<FiMessageSquare size={24} />}
                  onClick={() => setIsOpen(true)}
                  borderRadius="12px"
                  w="60px"
                  h="60px"
                  bg="#0bc5ea"
                  color="black"
                  _hover={{ bg: '#0bc5ea', transform: 'scale(1.05)' }}
                  boxShadow="0 4px 15px rgba(11, 197, 234, 0.4)"
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
            borderColor="rgba(11,197,234,0.28)"
            borderRadius="20px"
            overflow="visible"
            boxShadow="0 8px 40px rgba(0,0,0,0.6), 0 0 0 1px rgba(0,229,255,0.16), 0 0 30px rgba(11,197,234,0.12)"
            fontFamily="'Outfit', sans-serif"
          >
            <Box
              position="absolute"
              top={{ base: '-58px', sm: '-86px' }}
              right={{ base: '-8px', sm: '-52px' }}
              w={{ base: '170px', sm: '238px' }}
              h={{ base: '170px', sm: '238px' }}
              pointerEvents="none"
              zIndex={0}
              animation={`${floatingAnimation} 4.2s ease-in-out infinite`}
              style={{ filter: 'drop-shadow(0 0 22px rgba(11,197,234,0.35))' }}
            >
              <Box
                position="absolute"
                inset="18% 14% 12% 20%"
                borderRadius="full"
                bg="radial-gradient(circle, rgba(11,197,234,0.24) 0%, rgba(11,197,234,0.10) 36%, rgba(11,197,234,0) 72%)"
                filter="blur(16px)"
              />
              <Box position="relative" w="full" h="full">
                {/* Mascot image removed */}
                <Box
                  position="absolute"
                  left="31%"
                  top="35%"
                  w="15%"
                  h="11%"
                  borderRadius="full"
                  bg="rgba(4, 10, 20, 0.98)"
                  transformOrigin="center center"
                  animation={`${eyeBlinkAnimation} 5.8s ease-in-out infinite`}
                  boxShadow="inset 0 0 4px rgba(11,197,234,0.06)"
                />
                <Box
                  position="absolute"
                  left="56%"
                  top="35%"
                  w="15%"
                  h="11%"
                  borderRadius="full"
                  bg="rgba(4, 10, 20, 0.98)"
                  transformOrigin="center center"
                  animation={`${eyeBlinkAnimation} 5.8s ease-in-out infinite`}
                  boxShadow="inset 0 0 4px rgba(11,197,234,0.06)"
                />
              </Box>
            </Box>
            <Flex p={4} bg="whiteAlpha.50" borderBottom="1px solid" borderColor="whiteAlpha.100" align="center" justify="space-between" position="relative" zIndex={1}>
              <Flex align="center" gap={3}>
                <Avatar size="sm" name="Zai" bg="cyan.400" color="gray.900" fontWeight="bold" fontSize="xs" />
                <Box>
                  <Text fontWeight="700" fontSize="sm" color="white" letterSpacing="wide">ZAI</Text>
                  <Text fontSize="xs" color="cyan.400">Zaivo AI Assistant • Online</Text>
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
                      bg={msg.role === 'user' ? 'rgba(11,197,234,0.18)' : 'whiteAlpha.100'}
                      color={msg.role === 'user' ? 'whiteAlpha.900' : 'whiteAlpha.900'}
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

            {/* â”€â”€ Sticky Buttons Panel (guided flow) â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
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
                    color="cyan.400"
                    _hover={{ color: 'white', bg: 'whiteAlpha.100' }}
                    fontSize="12px"
                    leftIcon={<FiMessageSquare size={13} />}
                    borderRadius="full"
                    px={3}
                    onClick={() => {
                      setFlowStep(FLOW.FREE_CHAT);
                      addBot('Sure! Ask me anything about Zaivo.');
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
                      borderColor="cyan.400"
                      color="cyan.400"
                      bg="transparent"
                      _hover={{ bg: 'cyan.400', borderColor: 'cyan.400', color: 'gray.900' }}
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

            {/* â”€â”€ Demo Booking Form â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
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
                    borderRadius="full" _hover={{ bg: 'cyan.400' }} onClick={handleFormSubmit}>
                    Book My Demo {'->'}
                  </Button>
                </VStack>
              </Box>
            )}

            {/* â”€â”€ Other Industry Text Input â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
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
                  _hover={{ bg: 'cyan.400' }} flexShrink={0} aria-label="Submit industry" />
              </Flex>
            )}

            {/* â”€â”€ Free Chat Input â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
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
                  _hover={{ bg: 'cyan.400' }} flexShrink={0} aria-label="Send" />
              </Flex>
            )}
          </MotionBox>
        )}
      </AnimatePresence>
    </>
  );
}



