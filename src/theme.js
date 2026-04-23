import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  config: {
    initialColorMode: "dark",
    useSystemColorMode: false,
  },
  colors: {
    brand: {
      bg: "#050505",
      accent: "#00E5FF",
      textMain: "#FFFFFF",
      textSub: "#A0AEC0",
    },
  },
  fonts: {
    heading: `'Inter', sans-serif`,
    body: `'Inter', sans-serif`,
  },
  fontSizes: {
    xs: "0.75rem",
    sm: "0.875rem",
    md: "1rem",
    lg: "1.125rem",
    xl: "1.25rem",
    "2xl": "1.5rem",
    "3xl": "1.65rem",
    "4xl": "1.9rem",
    "5xl": "2.3rem",
    "6xl": "2.8rem",
    "7xl": "3.5rem",
    "8xl": "4.2rem",
    "9xl": "5rem",
  },
});

export default theme;