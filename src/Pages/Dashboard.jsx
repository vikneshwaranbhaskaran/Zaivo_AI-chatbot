import React, { useEffect, useState } from 'react';
import { Box, Container, Heading, SimpleGrid, Text, VStack, HStack, Badge, Button, Icon, Divider, useToast, Spinner, Center, Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react';
import { collection, query, where, getDocs, orderBy } from 'firebase/firestore';
import { db } from '../services/firebase';
import { FiPlayCircle, FiFileText, FiLogOut, FiDownload } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const MotionBox = motion(Box);

export default function Dashboard() {
  const [videos, setVideos] = useState([]);
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);
  const toast = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const vq = query(collection(db, 'videos'), where('visibility', '==', 'public'), orderBy('createdAt', 'desc'));
        const dq = query(collection(db, 'documents'), where('visibility', '==', 'public'), orderBy('createdAt', 'desc'));
        
        const [vSnap, dSnap] = await Promise.all([getDocs(vq), getDocs(dq)]);
        
        setVideos(vSnap.docs.map(doc => ({ id: doc.id, ...doc.data() })));
        setDocuments(dSnap.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      } catch (error) {
        console.error("Error fetching content:", error);
        toast({ title: 'Error loading dashboard', status: 'error', duration: 3000, isClosable: true });
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [toast]);

  const handleLogout = async () => {
    navigate('/');
  };

  if (loading) {
    return (
      <Center minH="100vh" bg="#050505">
        <Spinner color="cyan.400" size="xl" />
      </Center>
    );
  }

  return (
    <Box minH="100vh" bg="#050505" color="white" pt="100px" pb={20}>
      <Container maxW="container.xl">
        <HStack justify="space-between" mb={10}>
          <VStack align="start" spacing={1}>
            <Heading size="xl" bgGradient="linear(to-r, cyan.400, blue.500)" bgClip="text">Client Portal</Heading>
            <Text color="gray.400">Secure access to your deliverables and recordings</Text>
          </VStack>
          <Button leftIcon={<FiLogOut />} variant="outline" colorScheme="gray" color="white" _hover={{ bg: "whiteAlpha.200" }} onClick={handleLogout}>
            Sign Out
          </Button>
        </HStack>

        <Tabs variant="soft-rounded" colorScheme="cyan">
          <TabList mb={8}>
            <Tab color="gray.400" _selected={{ color: 'white', bg: 'cyan.900' }}><Icon as={FiPlayCircle} mr={2}/> Video Recordings</Tab>
            <Tab color="gray.400" _selected={{ color: 'white', bg: 'cyan.900' }}><Icon as={FiFileText} mr={2}/> Documents</Tab>
          </TabList>
          <TabPanels>
            <TabPanel px={0}>
              <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={8}>
                {videos.length === 0 ? (
                  <Text color="gray.500">No videos available at the moment.</Text>
                ) : videos.map((video, idx) => (
                  <MotionBox 
                    key={video.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: idx * 0.1 }}
                    bg="whiteAlpha.50" 
                    borderRadius="2xl" 
                    overflow="hidden"
                    border="1px solid" 
                    borderColor="whiteAlpha.100"
                    _hover={{ borderColor: 'cyan.500', transform: 'translateY(-4px)', transition: 'all 0.3s ease' }}
                  >
                    <Box position="relative" w="full" pt="56.25%" bg="black">
                      <Box position="absolute" top={0} left={0} w="full" h="full">
                        {/* Video player config to prevent obvious download */}
                        <video 
                          controls 
                          controlsList="nodownload" 
                          disablePictureInPicture 
                          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                          src={video.url}
                        />
                      </Box>
                    </Box>
                    <Box p={5}>
                      <Badge colorScheme="cyan" mb={2} borderRadius="full" px={2}>{video.category || 'Recording'}</Badge>
                      <Heading size="md" mb={2} color="whiteAlpha.900">{video.title}</Heading>
                      <Text color="gray.400" fontSize="sm" noOfLines={2}>{video.description}</Text>
                    </Box>
                  </MotionBox>
                ))}
              </SimpleGrid>
            </TabPanel>
            
            <TabPanel px={0}>
              <VStack spacing={4} align="stretch">
                {documents.length === 0 ? (
                  <Text color="gray.500">No documents available at the moment.</Text>
                ) : documents.map((doc, idx) => (
                  <MotionBox 
                    key={doc.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: idx * 0.1 }}
                    p={5} 
                    bg="whiteAlpha.50" 
                    borderRadius="xl"
                    border="1px solid" 
                    borderColor="whiteAlpha.100"
                    _hover={{ borderColor: 'cyan.500', bg: 'whiteAlpha.100' }}
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                  >
                    <HStack spacing={4}>
                      <Box p={3} bg="cyan.900" borderRadius="lg" color="cyan.300">
                        <Icon as={FiFileText} boxSize={6} />
                      </Box>
                      <VStack align="start" spacing={0}>
                        <Heading size="sm" color="whiteAlpha.900">{doc.title}</Heading>
                        <Text color="gray.400" fontSize="xs">{new Date(doc.createdAt?.toDate()).toLocaleDateString()}</Text>
                      </VStack>
                    </HStack>
                    <Button 
                      as="a" 
                      href={doc.url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      size="sm" 
                      colorScheme="cyan" 
                      variant="ghost" 
                      leftIcon={<FiDownload />}
                    >
                      View
                    </Button>
                  </MotionBox>
                ))}
              </VStack>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Container>
    </Box>
  );
}
