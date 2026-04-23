import React from 'react';
import { Box, Link, Icon, Tooltip } from '@chakra-ui/react';
import { FaWhatsapp } from 'react-icons/fa';

const WhatsAppFAB = () => {
  // Replace with your actual WhatsApp number (include country code)
  const phoneNumber = "91XXXXXXXXXX"; 
  const message = "Hi TechyGramam, I'm interested in a System Audit for my industrial facility.";
  const encodedMessage = encodeURIComponent(message);
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;

  return (
    <Box
      position="fixed"
      bottom="30px"
      right="30px"
      zIndex="2000"
    >
      <Tooltip label="INITIATE_DIRECT_SYNC" placement="left" bg="cyan.900" color="white" fontSize="xs">
        <Link 
          href={whatsappUrl} 
          isExternal
          style={{ textDecoration: 'none' }}
        >
          <Box
            bg="black"
            color="cyan.400"
            p={4}
            borderRadius="full"
            border="2px solid"
            borderColor="cyan.400"
            boxShadow="0 0 20px rgba(0, 255, 255, 0.3)"
            transition="0.3s all ease-in-out"
            _hover={{ 
              transform: "scale(1.1) rotate(5deg)", 
              boxShadow: "0 0 35px rgba(0, 255, 255, 0.6)",
              bg: "cyan.400",
              color: "black"
            }}
          >
            <Icon as={FaWhatsapp} boxSize={7} />
          </Box>
        </Link>
      </Tooltip>
    </Box>
  );
};

export default WhatsAppFAB;