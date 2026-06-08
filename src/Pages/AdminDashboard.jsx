import React, { useState, useEffect } from 'react';
import { Box, Container, Heading, VStack, HStack, Button, Text, Tabs, TabList, TabPanels, Tab, TabPanel, Input, FormControl, FormLabel, Select, useToast, Switch, IconButton, Table, Thead, Tbody, Tr, Th, Td } from '@chakra-ui/react';
import { collection, query, getDocs, addDoc, doc, setDoc, deleteDoc, updateDoc, serverTimestamp } from 'firebase/firestore';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { db, storage } from '../services/firebase';
import { FiTrash2, FiUploadCloud, FiLogOut } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';

export default function AdminDashboard() {
  const [users, setUsers] = useState([]);
  const [videos, setVideos] = useState([]);
  const [documents, setDocuments] = useState([]);
  const [emailInput, setEmailInput] = useState('');
  
  const [uploadFile, setUploadFile] = useState(null);
  const [uploadTitle, setUploadTitle] = useState('');
  const [uploadDesc, setUploadDesc] = useState('');
  const [uploadType, setUploadType] = useState('videos');
  const [uploadProgress, setUploadProgress] = useState(0);

  const toast = useToast();
  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      const uSnap = await getDocs(collection(db, 'approvedUsers'));
      setUsers(uSnap.docs.map(d => ({ id: d.id, ...d.data() })));
      
      const vSnap = await getDocs(collection(db, 'videos'));
      setVideos(vSnap.docs.map(d => ({ id: d.id, ...d.data() })));
      
      const dSnap = await getDocs(collection(db, 'documents'));
      setDocuments(dSnap.docs.map(d => ({ id: d.id, ...d.data() })));
    } catch (e) {
      console.error(e);
      toast({ title: 'Error fetching data', status: 'error' });
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleAddUser = async (e) => {
    e.preventDefault();
    if (!emailInput) return;
    const trimmedEmail = emailInput.trim().toLowerCase();
    try {
      await setDoc(doc(db, 'approvedUsers', trimmedEmail), {
        status: 'active',
        addedAt: serverTimestamp()
      });
      toast({ title: 'User added', status: 'success' });
      setEmailInput('');
      fetchData();
    } catch (e) {
      console.error(e);
      toast({ title: 'Error adding user', status: 'error' });
    }
  };

  const handleRemoveUser = async (id) => {
    if (!window.confirm('Remove this user?')) return;
    try {
      await deleteDoc(doc(db, 'approvedUsers', id));
      toast({ title: 'User removed', status: 'info' });
      fetchData();
    } catch (e) {
      toast({ title: 'Error removing user', status: 'error' });
    }
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!uploadFile || !uploadTitle) return;

    const storageRef = ref(storage, `${uploadType}/${Date.now()}_${uploadFile.name}`);
    const uploadTask = uploadBytesResumable(storageRef, uploadFile);

    uploadTask.on('state_changed', 
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setUploadProgress(progress);
      },
      (error) => {
        toast({ title: 'Upload failed', description: error.message, status: 'error' });
        setUploadProgress(0);
      },
      async () => {
        const url = await getDownloadURL(uploadTask.snapshot.ref);
        await addDoc(collection(db, uploadType), {
          title: uploadTitle,
          description: uploadDesc,
          url,
          visibility: 'public',
          createdAt: serverTimestamp()
        });
        toast({ title: 'Upload successful', status: 'success' });
        setUploadFile(null);
        setUploadTitle('');
        setUploadDesc('');
        setUploadProgress(0);
        fetchData();
      }
    );
  };

  const toggleVisibility = async (type, id, current) => {
    try {
      await updateDoc(doc(db, type, id), {
        visibility: current === 'public' ? 'hidden' : 'public'
      });
      fetchData();
    } catch (e) {
      toast({ title: 'Error toggling visibility', status: 'error' });
    }
  };

  const handleDeleteContent = async (type, id) => {
    if (!window.confirm('Delete this item?')) return;
    try {
      await deleteDoc(doc(db, type, id));
      toast({ title: 'Item deleted', status: 'info' });
      fetchData();
    } catch (e) {
      toast({ title: 'Error deleting item', status: 'error' });
    }
  };

  const handleLogout = async () => {
    navigate('/');
  };

  return (
    <Box minH="100vh" bg="#050505" color="white" pt="100px" pb={20}>
      <Container maxW="container.xl">
        <HStack justify="space-between" mb={10}>
          <Heading size="xl" bgGradient="linear(to-r, violet.400, blue.500)" bgClip="text">Admin Portal</Heading>
          <Button leftIcon={<FiLogOut />} variant="outline" onClick={handleLogout}>Sign Out</Button>
        </HStack>

        <Tabs variant="enclosed" colorScheme="violet">
          <TabList mb={5}>
            <Tab color="gray.400" _selected={{ color: 'white', borderColor: 'violet.500', borderBottomColor: 'transparent' }}>Users</Tab>
            <Tab color="gray.400" _selected={{ color: 'white', borderColor: 'violet.500', borderBottomColor: 'transparent' }}>Content Management</Tab>
          </TabList>

          <TabPanels>
            <TabPanel>
              <Box bg="whiteAlpha.50" p={6} borderRadius="xl" mb={8} border="1px solid" borderColor="whiteAlpha.200">
                <Heading size="md" mb={4}>Add Approved User</Heading>
                <form onSubmit={handleAddUser}>
                  <HStack>
                    <Input 
                      placeholder="Email address (e.g. user@example.com)" 
                      value={emailInput} 
                      onChange={e => setEmailInput(e.target.value)} 
                      bg="blackAlpha.500" border="none"
                      type="email"
                    />
                    <Button type="submit" colorScheme="violet">Approve Access</Button>
                  </HStack>
                </form>
              </Box>

              <Box bg="whiteAlpha.50" p={6} borderRadius="xl" border="1px solid" borderColor="whiteAlpha.200">
                <Heading size="md" mb={4}>Approved Clients</Heading>
                <Table variant="simple">
                  <Thead>
                    <Tr><Th color="gray.400">Email Address</Th><Th color="gray.400">Status</Th><Th color="gray.400">Actions</Th></Tr>
                  </Thead>
                  <Tbody>
                    {users.map(u => (
                      <Tr key={u.id}>
                        <Td>{u.id}</Td>
                        <Td><Text color={u.status === 'active' ? 'green.400' : 'red.400'}>{u.status}</Text></Td>
                        <Td><IconButton icon={<FiTrash2 />} size="sm" colorScheme="red" variant="ghost" onClick={() => handleRemoveUser(u.id)}/></Td>
                      </Tr>
                    ))}
                  </Tbody>
                </Table>
              </Box>
            </TabPanel>

            <TabPanel>
              <HStack align="start" spacing={8}>
                <Box flex={1} bg="whiteAlpha.50" p={6} borderRadius="xl" border="1px solid" borderColor="whiteAlpha.200">
                  <Heading size="md" mb={4}>Upload Content</Heading>
                  <form onSubmit={handleUpload}>
                    <VStack spacing={4} align="stretch">
                      <FormControl>
                        <FormLabel>Type</FormLabel>
                        <Select value={uploadType} onChange={e => setUploadType(e.target.value)} bg="blackAlpha.500" border="none">
                          <option value="videos" style={{background: '#111'}}>Video Recording</option>
                          <option value="documents" style={{background: '#111'}}>Document</option>
                        </Select>
                      </FormControl>
                      <FormControl>
                        <FormLabel>Title</FormLabel>
                        <Input value={uploadTitle} onChange={e => setUploadTitle(e.target.value)} bg="blackAlpha.500" border="none" required />
                      </FormControl>
                      <FormControl>
                        <FormLabel>Description</FormLabel>
                        <Input value={uploadDesc} onChange={e => setUploadDesc(e.target.value)} bg="blackAlpha.500" border="none" />
                      </FormControl>
                      <FormControl>
                        <FormLabel>File</FormLabel>
                        <Input type="file" onChange={e => setUploadFile(e.target.files[0])} p={1} bg="blackAlpha.500" border="none" required />
                      </FormControl>
                      <Button type="submit" colorScheme="violet" leftIcon={<FiUploadCloud />} isLoading={uploadProgress > 0 && uploadProgress < 100}>
                        {uploadProgress > 0 ? `Uploading ${Math.round(uploadProgress)}%` : 'Upload to Cloud'}
                      </Button>
                    </VStack>
                  </form>
                </Box>

                <Box flex={2} bg="whiteAlpha.50" p={6} borderRadius="xl" border="1px solid" borderColor="whiteAlpha.200">
                  <Heading size="md" mb={4}>Manage Files</Heading>
                  <Tabs variant="soft-rounded" colorScheme="gray" size="sm" mb={4}>
                    <TabList>
                      <Tab color="gray.400" _selected={{ color: 'white', bg: 'whiteAlpha.200' }}>Videos</Tab>
                      <Tab color="gray.400" _selected={{ color: 'white', bg: 'whiteAlpha.200' }}>Documents</Tab>
                    </TabList>
                    <TabPanels>
                      <TabPanel px={0}>
                        <VStack align="stretch" spacing={3}>
                          {videos.map(v => (
                            <HStack key={v.id} p={3} bg="blackAlpha.500" borderRadius="md" justify="space-between">
                              <Box>
                                <Text fontWeight="bold">{v.title}</Text>
                                <Text fontSize="xs" color="gray.400">{v.visibility}</Text>
                              </Box>
                              <HStack>
                                <Switch isChecked={v.visibility === 'public'} onChange={() => toggleVisibility('videos', v.id, v.visibility)} colorScheme="violet" />
                                <IconButton icon={<FiTrash2 />} size="sm" colorScheme="red" variant="ghost" onClick={() => handleDeleteContent('videos', v.id)}/>
                              </HStack>
                            </HStack>
                          ))}
                        </VStack>
                      </TabPanel>
                      <TabPanel px={0}>
                        <VStack align="stretch" spacing={3}>
                          {documents.map(d => (
                            <HStack key={d.id} p={3} bg="blackAlpha.500" borderRadius="md" justify="space-between">
                              <Box>
                                <Text fontWeight="bold">{d.title}</Text>
                                <Text fontSize="xs" color="gray.400">{d.visibility}</Text>
                              </Box>
                              <HStack>
                                <Switch isChecked={d.visibility === 'public'} onChange={() => toggleVisibility('documents', d.id, d.visibility)} colorScheme="violet" />
                                <IconButton icon={<FiTrash2 />} size="sm" colorScheme="red" variant="ghost" onClick={() => handleDeleteContent('documents', d.id)}/>
                              </HStack>
                            </HStack>
                          ))}
                        </VStack>
                      </TabPanel>
                    </TabPanels>
                  </Tabs>
                </Box>
              </HStack>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Container>
    </Box>
  );
}

