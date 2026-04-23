import React from 'react';
import { useParams, Link as RouterLink } from 'react-router-dom';
import {
  Box,
  Container,
  Heading,
  Text,
  VStack,
  HStack,
  Icon,
  Badge,
  Button,
  Divider,
  SimpleGrid,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink
} from '@chakra-ui/react';
import { FiArrowLeft, FiCheckCircle, FiActivity, FiLayers, FiShield } from 'react-icons/fi';
import Footer from '../Components/Footer';

const caseStudies = {
  'textile-apparel': {
    title: "Textile & Apparel Axis",
    hub: "TIRUPPUR_NODE_01",
    subtitle: "Solving Inventory Leakage in Tiruppur's Manufacturing Cluster",
    problem: "Real-time production tracking was manual, leading to 15% inventory leakage and shipping delays.",
    solution: "Implementation of Zaivo Z-ID smart labels and automated floor-to-cloud sync via the South Asia Hub.",
    results: [
      "99.4% Tracking Accuracy",
      "22% Reduction in Operational Debt",
      "Live Supply Chain Transparency for Global Clients"
    ],
    metric: "15% -> 0.6% leakage"
  },
  'precision-engineering': {
    title: "Precision Engineering Axis",
    hub: "COIMBATORE_HUB_04",
    subtitle: "Predictive Maintenance for High-Precision Batching",
    problem: "Sudden machine failures in Coimbatore mills were causing expensive batch losses and unoptimized downtime.",
    solution: "Deployment of Layer 02 Kernel machine-telemetry sensors and autonomous trigger protocols.",
    results: [
      "Zero Unplanned Downtime in 6 Months",
      "30% Increase in Batch Efficiency",
      "Digital Twin integration for mill management"
    ],
    metric: "-45% maintenance costs"
  },
  'global-logistics': {
    title: "Global Logistics Node",
    hub: "UNIVERSAL_GATEWAY",
    subtitle: "Unified Transparency for Transcontinental Shipping",
    problem: "Data fragmentation between local warehouse floors and global strategic dashboards.",
    solution: "Unified Sovereign Dashboard providing 100% visibility of every asset in the mesh network.",
    results: [
      "Real-time Asset Localization",
      "Secure Handshakes across 3 Regions",
      "Automated Customs Data Provisioning"
    ],
    metric: "Instant Global Sync"
  }
};

const CaseStudySingle = () => {
  const { id } = useParams();
  const study = caseStudies[id];

  if (!study) {
    return <Box p={20} textAlign="center"><Text>Case Study Not Found</Text></Box>;
  }

  return (
    <Box bg="#050505" color="white" minH="100vh">
      <Container maxW="container.xl" px={4} pt={{ base: 32, md: 40 }} pb={24}>
        <VStack align="start" spacing={12}>

          <Breadcrumb fontSize="xs" color="gray.600" letterSpacing="widest">
            <BreadcrumbItem>
              <BreadcrumbLink as={RouterLink} to="/verticals">VERTICALS</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbItem isCurrentPage>
              <BreadcrumbLink color="cyan.400">{study.title.toUpperCase()}</BreadcrumbLink>
            </BreadcrumbItem>
          </Breadcrumb>

          <VStack align="start" spacing={6}>
            <Badge colorScheme="cyan" variant="outline" px={3}>{study.hub}</Badge>
            <Heading as="h1" fontSize={{ base: "3xl", md: "5xl" }} fontWeight="900" letterSpacing="-2px">
              {study.title}.
            </Heading>
            <Text fontSize="2xl" color="gray.400" maxW="3xl">
              {study.subtitle}
            </Text>
          </VStack>

          <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={20} w="full">
            <VStack align="start" spacing={10}>
              <Box>
                <Text fontSize="xs" fontWeight="900" color="orange.400" mb={4} letterSpacing="0.2em">THE_CHALLENGE</Text>
                <Text fontSize="lg" color="gray.300" lineHeight="tall">{study.problem}</Text>
              </Box>
              <Box>
                <Text fontSize="xs" fontWeight="900" color="cyan.400" mb={4} letterSpacing="0.2em">ZAIVO_ARCHITECTURE</Text>
                <Text fontSize="lg" color="gray.300" lineHeight="tall">{study.solution}</Text>
              </Box>
            </VStack>

            <Box bg="whiteAlpha.50" p={10} borderRadius="3xl" border="1px solid" borderColor="whiteAlpha.100">
              <Text fontSize="xs" fontWeight="900" color="green.400" mb={8} letterSpacing="0.2em">OPERATIONAL_YIELD</Text>
              <VStack align="start" spacing={6}>
                {study.results.map((res, i) => (
                  <HStack key={i} gap={4}>
                    <Icon as={FiCheckCircle} color="cyan.400" />
                    <Text fontWeight="bold" color="white">{res}</Text>
                  </HStack>
                ))}
                <Divider borderColor="whiteAlpha.100" my={4} />
                <Box>
                  <Text fontSize="xs" color="gray.600">PRIMARY_KPI</Text>
                  <Text fontSize="3xl" fontWeight="900" color="cyan.400">{study.metric}</Text>
                </Box>
              </VStack>
            </Box>
          </SimpleGrid>

          <HStack spacing={8} pt={10}>
             <Button
                as={RouterLink}
                to="/verticals"
                variant="outline"
                colorScheme="gray"
                borderRadius="full"
                leftIcon={<FiArrowLeft />}
                px={4}
             >
               BACK_TO_VERTICALS
             </Button>
             <Button
                as="a"
                href="https://wa.me/919384100252?text=Hi%20Zaivo%2C%20I%27d%20like%20to%20book%20a%20system%20audit."
                target="_blank"
                rel="noopener noreferrer"
                colorScheme="cyan"
                borderRadius="full"
                px={4}
             >
               BOOK_A_SYSTEM_AUDIT
             </Button>
          </HStack>

          <SimpleGrid columns={{ base: 1, md: 3 }} spacing={10} pt={20} w="full">
            <VStack align="start" p={6} bg="whiteAlpha.50" borderRadius="xl">
                <Icon as={FiActivity} color="cyan.400" boxSize={6} />
                <Text fontWeight="bold" pt={2}>Live Monitor</Text>
                <Text fontSize="xs" color="gray.600">Autonomous triggers active 24/7</Text>
            </VStack>
            <VStack align="start" p={6} bg="whiteAlpha.50" borderRadius="xl">
                <Icon as={FiLayers} color="cyan.400" boxSize={6} />
                <Text fontWeight="bold" pt={2}>Mesh Network</Text>
                <Text fontSize="xs" color="gray.600">Integrated Floor-to-Cloud sync</Text>
            </VStack>
            <VStack align="start" p={6} bg="whiteAlpha.50" borderRadius="xl">
                <Icon as={FiShield} color="cyan.400" boxSize={6} />
                <Text fontWeight="bold" pt={2}>Secure Protocol</Text>
                <Text fontSize="xs" color="gray.600">AES-256 Encrypted Handshakes</Text>
            </VStack>
          </SimpleGrid>
        </VStack>
      </Container>
      <Footer />
    </Box>
  );
};

export default CaseStudySingle;
