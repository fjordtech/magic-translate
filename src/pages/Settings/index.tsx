import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, FAB, RadioButton, withTheme } from 'react-native-paper';

import { usePaper, Scheme as ColorScheme } from '@/contexts/PaperProvider';

const Settings = ({ navigation, theme }: any) => {
  const { currentTheme, setCurrentTheme } = usePaper()
  const [checked, setChecked] = useState<ColorScheme>(currentTheme);

  const handleChooseTheme = (value: ColorScheme) => {
    setCurrentTheme(value)
    setChecked(value)
  }

  const themeList = [
    { name: 'Automático', value: 'auto' },
    { name: 'Claro', value: 'light' },
    { name: 'Escuro', value: 'dark' },
  ]
  
  const { navigate } = navigation
  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <FAB
        icon="arrow-left"
        style={styles.fab}
        onPress={() => navigate('App')}
      />

      <Text style={[styles.title, { color: theme.colors.primary }]}>Esquema de cores</Text>
      
      { themeList.map(({ name, value }) => (
        <View style={styles.item} key={value}>
          <RadioButton
            value={value}
            status={ checked === value ? 'checked' : 'unchecked' }
            onPress={() => handleChooseTheme(value as ColorScheme)}
          />
          <Text style={styles.label}>{name}</Text>
        </View>
      ))}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 40,
    justifyContent: 'flex-start',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  label: {
    fontSize: 16,
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
  },
});

export default withTheme(Settings);