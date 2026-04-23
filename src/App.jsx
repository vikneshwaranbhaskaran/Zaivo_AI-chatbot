import React, { useState, Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ChakraProvider, extendTheme, Box, Spinner, Center } from '@chakra-ui/react';

const Home = lazy(() => import('./Pages/Home'));
const Verticals = lazy(() => import('./Pages/Verticals'));
const Foundry = lazy(() => import('./Pages/Foundry'));
const Terminal = lazy(() => import('./Pages/Terminal'));
const Contact = lazy(() => import('./Pages/Contact'));
const CaseStudySingle = lazy(() => import('./Pages/CaseStudySingle'));
const About = lazy(() => import('./Pages/About'));
const Protocol = lazy(() => import('./Pages/Protocol'));

import Navbar from './Components/Navbar';
import CustomCursor from './Components/CustomCursor';
import SplashScreen from './Components/SplashScreen';
import ScrollToTop from './Components/ScrollToTop';
import Chatbot from './Components/Chatbot';


const PageLoader = () => (
  <Center h="100vh" bg="#050505">
    <Spinner color="cyan.400" size="xl" thickness="4px" />
  </Center>
);

function App() {
  const [showSplash, setShowSplash] = useState(() => !sessionStorage.getItem('zaivo_booted'));

  const handleSplashComplete = () => {
    sessionStorage.setItem('zaivo_booted', 'true');
    setShowSplash(false);
  };

  return (
    <>
      {showSplash && <SplashScreen onComplete={handleSplashComplete} />}
      <CustomCursor />
      <Router>
        <ScrollToTop />
        <Navbar />

        <Suspense fallback={<PageLoader />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/verticals" element={<Verticals />} />
            <Route path="/foundry" element={<Foundry />} />
            <Route path="/terminal" element={<Terminal />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/case-study/:id" element={<CaseStudySingle />} />
            <Route path="/about" element={<About />} />
            <Route path="/protocol" element={<Protocol />} />
            <Route path="*" element={<Home />} />
          </Routes>
        </Suspense>
        <Chatbot />
      </Router>
    </>
  );
}

export default App;