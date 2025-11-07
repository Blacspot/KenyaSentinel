/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

import { Platform } from 'react-native';

const tintColorLight = '#0a7ea4';
const tintColorDark = '#fff';

export const Colors = {
  // Primary Colors
  headerBg: '#054003',
  primary: '#148C0F',
  secondary: '#BF0F1E',
  accent: '#2ABF24',
  
  // Text Colors
  textHeading: '#590202',
  textLight: '#ffffff',
  textMuted: '#6b6b6b',
  
  // Background Colors
  bgLight: '#F5F5F5',
  bgDark: '#054003',
  bgWhite: '#ffffff',
  
  // Priority Colors
  priorityCritical: '#BF0F1E',
  priorityHigh: '#FF6B35',
  priorityMedium: '#FFA500',
  priorityLow: '#2ABF24',
  
  // UI Colors
  border: 'rgba(0, 0, 0, 0.1)',
  cardBg: '#ffffff',
  inputBg: '#ffffff',
  
  // Status Colors
  success: '#2ABF24',
  warning: '#FFA500',
  error: '#BF0F1E',
  info: '#148C0F',
};
/*export const Fonts = Platform.select({
  ios: {
    /** iOS `UIFontDescriptorSystemDesignDefault` */
    /*sans: 'system-ui',
    /** iOS `UIFontDescriptorSystemDesignSerif` */
   /* serif: 'ui-serif',
    /** iOS `UIFontDescriptorSystemDesignRounded` */
   /* rounded: 'ui-rounded',
    /** iOS `UIFontDescriptorSystemDesignMonospaced` */
   /* mono: 'ui-monospace',
  },
  default: {
    sans: 'normal',
    serif: 'serif',
    rounded: 'normal',
    mono: 'monospace',
  },
  web: {
    sans: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    serif: "Georgia, 'Times New Roman', serif",
    rounded: "'SF Pro Rounded', 'Hiragino Maru Gothic ProN', Meiryo, 'MS PGothic', sans-serif",
    mono: "SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
  /*}, */
