import React from 'react'

import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';

import Home from './src/pages/Home'

const theme = {
  ...DefaultTheme,
  roundness: 2,
  version: 3,
  colors: {
    ...DefaultTheme.colors,
    primary: '#3498db',
    secondary: '#f1c40f',
    tertiary: '#a1b2c3'
  },
};

const App: React.FC = () => {
  return (
    <PaperProvider theme={theme}>
      <Home />
    </PaperProvider>
  )
}

export default App