import React from 'react';
import { DefaultTheme, Provider } from 'react-native-paper';

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


const PaperProvider: React.FC = ({ children }) => {
  return (
    <Provider theme={theme}>
        {children}
    </Provider>    
  )
}

export default PaperProvider;