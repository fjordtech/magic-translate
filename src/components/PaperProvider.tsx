import React from 'react';
import { Appearance } from 'react-native';
import { DefaultTheme, Provider } from 'react-native-paper';

const themes = {
  light: {
      ...DefaultTheme,
      roundness: 2,
      version: 3,
      colors: {
          ...DefaultTheme.colors,
          primary: '#3498db',
          secondary: '#f1c40f',
          tertiary: '#a1b2c3'
      }
  },
  dark: {
    ...DefaultTheme,
    dark: true,
    roundness: 2,
    version: 3,
    colors: {
        ...DefaultTheme.colors,
        background: '#222222',
        surface: '#333333',
        primary: '#8100b2',
        secondary: '#533901',
        tertiary: '#a1b2c3',
        text: '#f6f6f6',
    }
  }
};

const colorScheme = Appearance.getColorScheme() || 'light';
const theme = { name: colorScheme, ...themes[colorScheme] };

const PaperProvider: React.FC = ({ children }) => {
  // const colorScheme = useColorScheme();
  return (
    <Provider theme={theme}>
        {children}
    </Provider>    
  )
}

export { theme };
export default PaperProvider;