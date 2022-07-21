import React from 'react'

import PaperProvider from '@/components/PaperProvider'

import Routes from './src/routes/app.routes'

const App: React.FC = () => {
  return (
    <PaperProvider>
      <Routes />
    </PaperProvider>
  )
}

export default App