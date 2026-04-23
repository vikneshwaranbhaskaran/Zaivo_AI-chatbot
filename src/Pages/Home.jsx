import React from 'react';
import { Box, Container } from '@chakra-ui/react';

import Hero from '../Components/Hero';
import ZidGenerator from '../Components/ZidGenerator';
import GlobalTopology from '../Components/GlobalTopology';
import IndustrialPulse from '../Components/IndustrialPulse';
import MaturityAudit from '../Components/MaturityAudit';
import Footer from '../Components/Footer';
import CaseStudy from '../Components/CaseStudy';
import ROICalculator from '../Components/ROICalculator';
import Initiative from '../Components/Initiative';
import ScrollReveal from '../Components/ScrollReveal';

const Home = () => {
  return (
    <Box bg="#050505" color="white" minH="100vh" overflowX="hidden">

      {}
      <Hero />

      <Container maxW="container.xl" px={4}>

        <ScrollReveal variant="fade-up" delay={0}>
          <ZidGenerator />
        </ScrollReveal>

        <ScrollReveal variant="fade-up" delay={0}>
          <CaseStudy />
        </ScrollReveal>

        <ScrollReveal variant="zoom-in" delay={0}>
          <GlobalTopology />
        </ScrollReveal>

        <ScrollReveal variant="fade-left" delay={0}>
          <IndustrialPulse />
        </ScrollReveal>

        <ScrollReveal variant="fade-up" delay={0}>
          <Box py={20}>
            <ROICalculator />
          </Box>
        </ScrollReveal>

        <ScrollReveal variant="fade-right" delay={0}>
          <MaturityAudit />
        </ScrollReveal>

        <ScrollReveal variant="zoom-in" delay={0}>
          <Initiative />
        </ScrollReveal>

      </Container>

      <Footer />

    </Box>
  );
};

export default Home;