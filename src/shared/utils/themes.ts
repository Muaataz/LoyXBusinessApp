import { lightColors, darkColors } from './colors';
import { Theme } from '../types/theme';

export const lightTheme: Theme = {
  colors: lightColors,
  spacing: (factor) => factor * 8,
};

export const darkTheme: Theme = {
  colors: darkColors,
  spacing: (factor) => factor * 8,
};
