import React, { useState } from 'react';
import { Box, VStack, Heading, Text, Slider, SliderTrack, SliderFilledTrack, SliderThumb, Button, SimpleGrid, Flex } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { Link as RouterLink } from 'react-router-dom';
import { FiArrowRight } from 'react-icons/fi';

const ROICalculator = () => {
  const [workforce, setWorkforce] = useState(500);
  const [hours, setHours] = useState(20);
  const [cost, setCost] = useState(25);

  const weeklySavings = workforce * hours * cost * 0.35;
  const annualROI = weeklySavings * 52;
  const payback = annualROI > 50000 ? "< 6 months" : "< 12 months";

  return (
    <Box p={{ base: 6, md: 10 }} bg="#080808" border="1px solid" borderColor="cyan.900" borderRadius="3xl">
      <VStack spacing={8} align="stretch">
        <Heading size="lg" color="white" textAlign="center">
          Calculate Your Operational ROI
        </Heading>

        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={12}>
          <VStack align="stretch" spacing={6}>
            <Box>
              <Flex justify="space-between" mb={2}>
                <Text color="gray.400" fontSize="sm" fontWeight="bold">Workforce Size</Text>
                <Text color="cyan.400" fontWeight="bold">{workforce}</Text>
              </Flex>
              <Slider min={10} max={5000} step={10} value={workforce} onChange={(v) => setWorkforce(v)}>
                <SliderTrack bg="whiteAlpha.200"><SliderFilledTrack bg="cyan.400" /></SliderTrack>
                <SliderThumb bg="white" boxSize={4} />
              </Slider>
            </Box>

            <Box>
              <Flex justify="space-between" mb={2}>
                <Text color="gray.400" fontSize="sm" fontWeight="bold">Manual Process Hours/Week</Text>
                <Text color="cyan.400" fontWeight="bold">{hours}</Text>
              </Flex>
              <Slider min={1} max={200} step={1} value={hours} onChange={(v) => setHours(v)}>
                <SliderTrack bg="whiteAlpha.200"><SliderFilledTrack bg="cyan.400" /></SliderTrack>
                <SliderThumb bg="white" boxSize={4} />
              </Slider>
            </Box>

            <Box>
              <Flex justify="space-between" mb={2}>
                <Text color="gray.400" fontSize="sm" fontWeight="bold">Avg. Hourly Cost (USD)</Text>
                <Text color="cyan.400" fontWeight="bold">${cost}</Text>
              </Flex>
              <Slider min={5} max={200} step={5} value={cost} onChange={(v) => setCost(v)}>
                <SliderTrack bg="whiteAlpha.200"><SliderFilledTrack bg="cyan.400" /></SliderTrack>
                <SliderThumb bg="white" boxSize={4} />
              </Slider>
            </Box>
          </VStack>

          <VStack align="center" justify="center" spacing={6} p={6} bg="black" borderRadius="2xl" border="1px solid" borderColor="whiteAlpha.100">
            <VStack>
              <Text fontSize="xs" fontWeight="900" color="gray.600" letterSpacing="widest">ESTIMATED WEEKLY SAVINGS</Text>
              <motion.div key={weeklySavings} initial={{ scale: 0.8 }} animate={{ scale: 1 }}>
                <Heading size={{ base: "lg", md: "xl" }} color="white">${Math.round(weeklySavings).toLocaleString()}</Heading>
              </motion.div>
            </VStack>
            <VStack>
              <Text fontSize="xs" fontWeight="900" color="gray.600" letterSpacing="widest">ANNUAL ROI</Text>
              <motion.div key={annualROI} initial={{ scale: 0.8 }} animate={{ scale: 1 }}>
                <Heading size={{ base: "xl", md: "2xl" }} color="cyan.400">${Math.round(annualROI).toLocaleString()}</Heading>
              </motion.div>
            </VStack>
            <VStack>
              <Text fontSize="xs" fontWeight="900" color="gray.600" letterSpacing="widest">ESTIMATED PAYBACK PERIOD</Text>
              <Text fontSize="lg" fontWeight="bold" color="green.400">{payback}</Text>
            </VStack>
          </VStack>
        </SimpleGrid>

        <Flex justify="center" mt={4}>
          <Button as="a" href="https://wa.me/919384100252?text=Hi%20Zaivo%2C%20I%27d%20like%20to%20request%20an%20audit." target="_blank" rel="noopener noreferrer" size="xs" colorScheme="cyan" rightIcon={<FiArrowRight />} px={4} h={8} borderRadius="xl">
            REQUEST_AUDIT
          </Button>
        </Flex>
      </VStack>
    </Box>
  );
};

export default ROICalculator;
