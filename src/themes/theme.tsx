import {
  MD3LightTheme as PaperLightTheme,
  MD3DarkTheme as PaperDarkTheme,
  useTheme
} from 'react-native-paper';
import {
  DarkTheme as NavigationDarkTheme,
  DefaultTheme as NavigationLightTheme
} from '@react-navigation/native';

const customLightColors = {
  primary: '#fec400',
  primary50: 'rgba(255, 251, 231, 0.51)',
  primary100: '#fff1b1',
  primary700: '#edae10',
  primary900: '#e0a800',

  textContentDisabled: '#b8b8b8',
  textContentSecondary: '#414141',
  textContentTertiary: '#5a5a5a',
  textIconContentTertiary: '#5a5a5a',
  success: '#43a048'
};
// const customDarkColors = {
//   primary: '#fec400',
//   primary100: '#fff1b1',
//   primary700: '#edae10',
//   primary900: '#e0a800',

//   textContentSecondary: '#414141'
// };

const CombinedDefaultTheme = {
  ...PaperLightTheme,
  ...NavigationLightTheme,
  colors: {
    ...PaperLightTheme.colors,
    ...NavigationLightTheme.colors,
    ...customLightColors,
    background: 'white'
    // customize your light theme colors here
  }
};

const CombinedDarkTheme = {
  ...PaperDarkTheme,
  ...NavigationDarkTheme,
  colors: {
    ...PaperDarkTheme.colors,
    ...NavigationDarkTheme.colors,
    ...customLightColors,

    // dark theme colors here
    primary50: '#35383f',
    textIconContentTertiary: '#fff'
    // ...customDarkColors
  }
};

export type LightTheme = typeof CombinedDefaultTheme;
export type DarkTheme = typeof CombinedDarkTheme;
export type AppTheme = LightTheme | DarkTheme;
export const useAppTheme = () => useTheme<AppTheme>();

export { CombinedDefaultTheme, CombinedDarkTheme };
