import { NavigationContainer } from '@react-navigation/native';
import { PaperProvider } from 'react-native-paper';
import MainNavigator from './MainNavigator';
import { DarkThemeProvider, useDarkTheme } from '../hooks/useDarkTheme';

const Root = () => {
  const { theme } = useDarkTheme();
  return (
    <PaperProvider theme={theme}>
      <NavigationContainer theme={theme}>
        <MainNavigator />
      </NavigationContainer>
    </PaperProvider>
  );
};
export default function App() {
  return (
    <DarkThemeProvider>
      <Root />
    </DarkThemeProvider>
  );
}
