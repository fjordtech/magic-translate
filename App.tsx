import React from 'react'

import { Provider as PaperProvider } from 'react-native-paper';

import Home from './src/pages/Home'

const App: React.FC = () => {
  return (
    <PaperProvider>
      <Home />
    </PaperProvider>
  )
}

export default App