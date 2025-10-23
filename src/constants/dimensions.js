import { Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

export const Dimensions = {
  window: {
    width,
    height,
  },
  
  // Espacements
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
    xxl: 48,
  },
  
  // Bordures
  borderRadius: {
    sm: 4,
    md: 8,
    lg: 12,
    xl: 16,
    round: 50,
  },
  
  // Tailles d'éléments
  sizes: {
    button: {
      height: 48,
      minWidth: 120,
    },
    input: {
      height: 48,
    },
    card: {
      minHeight: 120,
    },
    avatar: {
      sm: 32,
      md: 48,
      lg: 64,
      xl: 80,
    },
  },
  
  // Breakpoints
  breakpoints: {
    sm: 576,
    md: 768,
    lg: 992,
    xl: 1200,
  },
};

export default Dimensions;
