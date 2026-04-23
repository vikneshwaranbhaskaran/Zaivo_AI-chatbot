import React, { useState, useEffect } from 'react';
import { Box, Flex, Text } from '@chakra-ui/react';
import { motion } from 'framer-motion';

const SplashScreen = ({ onComplete }) => {
  const [step, setStep] = useState(0);
  const [typedText, setTypedText] = useState('');

  const fullText = "INITIALIZING KERNEL...";

  useEffect(() => {
    let t1, t2, t3, t4, t5, typeInterval;

    t1 = setTimeout(() => setStep(1), 500);

    t2 = setTimeout(() => {
      let index = 0;
      typeInterval = setInterval(() => {
        setTypedText(fullText.slice(0, index + 1));
        index++;
        if (index >= fullText.length) clearInterval(typeInterval);
      }, 30);
      setStep(2);
    }, 1000);

    t3 = setTimeout(() => setStep(3), 1800);
    t4 = setTimeout(() => setStep(4), 2200);

    t5 = setTimeout(() => {
      onComplete();
    }, 3000);

    return () => {
      clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); clearTimeout(t4); clearTimeout(t5);
      clearInterval(typeInterval);
    };
  }, [onComplete]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      style={{
        position: 'fixed',
        top: 0, left: 0, right: 0, bottom: 0,
        backgroundColor: '#000000',
        zIndex: 10000,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      <Flex direction="column" align="center" gap={4} w="300px">
        {step >= 0 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
            <Text color="cyan.400" fontWeight="900" letterSpacing="0.4em" fontSize="xl">
              ZAIVO_OS
            </Text>
          </motion.div>
        )}

        <Box h="20px" w="full" textAlign="center">
          {step >= 2 && (
            <Text color="gray.500" fontSize="xs" fontFamily="monospace">
              {typedText}
            </Text>
          )}
        </Box>

        <Box w="full" h="2px" bg="whiteAlpha.200" mt={4} overflow="hidden">
          {step >= 3 && (
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: "100%" }}
              transition={{ duration: 0.4, ease: "linear" }}
              style={{ height: "100%", backgroundColor: "#00FFFF", boxShadow: "0 0 10px #00FFFF" }}
            />
          )}
        </Box>

        <Box h="20px" w="full" textAlign="center" mt={2}>
          {step >= 4 && (
            <motion.div
              animate={{ opacity: [1, 0, 1] }}
              transition={{ repeat: Infinity, duration: 0.5 }}
            >
              <Text color="green.400" fontSize="xs" fontWeight="bold" letterSpacing="widest">
                SYSTEM_READY
              </Text>
            </motion.div>
          )}
        </Box>
      </Flex>
    </motion.div>
  );
};

export default SplashScreen;
