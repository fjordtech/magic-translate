import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, FAB, RadioButton } from 'react-native-paper';

import { theme } from '@/components/PaperProvider';

const Settings = ({ navigation }: any) => {
  const [checked, setChecked] = React.useState('auto');

  const themeList = [
    { name: 'Automático', value: 'auto' },
    { name: 'Claro', value: 'light' },
    { name: 'Escuro', value: 'dark' },
  ]
  
  const { navigate } = navigation
  return (
    <View style={styles.container}>
      <FAB
        icon="arrow-left"
        style={styles.fab}
        onPress={() => navigate('App')}
      />

      <Text style={styles.title}>Esquema de cores</Text>
      
      { themeList.map(({ name, value }) => (
        <View style={styles.item} key={value}>
          <RadioButton
            value={value}
            status={ checked === value ? 'checked' : 'unchecked' }
            onPress={() => setChecked(value)}
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
    backgroundColor: theme.colors.background,
    justifyContent: 'flex-start',
  },
  title: {
    color: theme.colors.primary,
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

export default Settings;