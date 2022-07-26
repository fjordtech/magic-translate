import React, { createContext, useState, Dispatch, SetStateAction, useContext, useCallback, useEffect } from 'react';
import { Appearance } from 'react-native';
import { DefaultTheme, Provider, ActivityIndicator } from 'react-native-paper';

import { storeData, getData } from '@/utils/storage'

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

type Scheme = 'light' | 'dark' | 'auto'
interface PaperContextProps {
  currentTheme: Scheme
  setCurrentTheme: Dispatch<SetStateAction<Scheme>>
}

const PaperContext = createContext<PaperContextProps>({} as PaperContextProps)

const colorScheme = Appearance.getColorScheme() || 'light';
const theme = { name: colorScheme, ...themes[colorScheme] };

const PaperProvider: React.FC = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [currentTheme, setCurrentTheme] = useState<Scheme>('' as Scheme)
  const KEY_THEME = '@MAGIC_T:theme'

  useEffect(() => {
    getData(KEY_THEME)
    .then((data) => {
      setCurrentTheme(data || 'auto')
      setLoading(false);
    })
  }, [])

  useEffect(() => {
    storeData(KEY_THEME, currentTheme)
  }, [currentTheme])

  const getCurrenScheme = useCallback(() => {
    let schemeName: Scheme = 'auto'

    if(currentTheme === 'auto'){
      schemeName = colorScheme
    }else {
      schemeName = currentTheme
    }

    return { name: colorScheme, ...themes[schemeName] };
  }, [currentTheme]) 
  
  const paperData = {
    currentTheme,
    setCurrentTheme,
  }

  if(loading){
    return <ActivityIndicator animating={true} color='#8100b2' />
  }

  return (
    <PaperContext.Provider value={paperData}>
      <Provider theme={getCurrenScheme()}>
          {children}
      </Provider>    
    </PaperContext.Provider>
  )
}

const usePaper = () => {
  const context = useContext(PaperContext)
  return context
}

export { theme, usePaper, Scheme };
export default PaperProvider;