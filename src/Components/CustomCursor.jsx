import React, { useEffect } from 'react';
import { motion, useSpring, useMotionValue } from 'framer-motion';
import { Box } from '@chakra-ui/react';

const CustomCursor = () => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const node1X = useSpring(mouseX, { damping: 15, stiffness: 100 });
  const node1Y = useSpring(mouseY, { damping: 15, stiffness: 100 });
  const node2X = useSpring(mouseX, { damping: 20, stiffness: 150 });
  const node2Y = useSpring(mouseY, { damping: 20, stiffness: 150 });
  const node3X = useSpring(mouseX, { damping: 25, stiffness: 200 });
  const node3Y = useSpring(mouseY, { damping: 25, stiffness: 200 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <Box
      display={{ base: 'none', lg: 'block' }}
      position="fixed"
      top={0}
      left={0}
      pointerEvents="none"
      zIndex={10000}
    >
      {}
      <motion.div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '4px',
          height: '4px',
          backgroundColor: '#00FFFF',
          borderRadius: '50%',
          x: mouseX,
          y: mouseY,
          translateX: '-50%',
          translateY: '-50%',
        }}
      />

      {}
      {[
        { x: node1X, y: node1Y, size: '8px', op: 0.2 },
        { x: node2X, y: node2Y, size: '12px', op: 0.4 },
        { x: node3X, y: node3Y, size: '20px', op: 0.6 },
      ].map((node, i) => (
        <motion.div
          key={i}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: node.size,
            height: node.size,
            border: `1px solid rgba(0, 255, 255, ${node.op})`,
            borderRadius: '50%',
            x: node.x,
            y: node.y,
            translateX: '-50%',
            translateY: '-50%',
          }}
        />
      ))}

      {}
      <motion.div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100px',
          height: '100px',
          background: 'radial-gradient(circle, rgba(0, 255, 255, 0.03) 0%, transparent 70%)',
          x: node1X,
          y: node1Y,
          translateX: '-50%',
          translateY: '-50%',
        }}
      />
    </Box>
  );
};

export default CustomCursor;
