import React from 'react'

import PaperProvider from '@/components/PaperProvider'

import Routes from './src/routes/index.routes'

const App: React.FC = () => {
  return (
    <PaperProvider>
      <Routes />
    </PaperProvider>
  )
}

export default App