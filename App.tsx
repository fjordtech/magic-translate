import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, TouchableOpacity, Text, View, TextInput, Image } from 'react-native';

import api from './services/api'

import axios from 'axios';

import logo from './assets/magic-logo.png'

export default function App() {
  const [text, onChangeText] = useState('');
  const [card, setCard] = useState<any>('');
  const [showImage, setShowImage] = useState(false);

  // Pacifism
  // Crypt Ghast
  // Duress

  const toggleImage = () => {
    setShowImage(!showImage)
  }

  const findCard = async () => {
    if(!text.trim()) return
    const { data } = await api.get('cards', { 
      params: {
        name: text
      }
     })
    const cardFound = data.cards
      .filter((card: any) => !!card.foreignNames)
      .find((card: any) => {
        return card.foreignNames.find((names: any) => names.language === 'Portuguese (Brazil)')
      })

    if(!cardFound){
      setCard({ text: 'Sem tradução pt-BR', imageUrl: null })
      return
    }

    let translatedCard = cardFound.foreignNames.find((names: any) => names.language === 'Portuguese (Brazil)')

    setCard(translatedCard)
  }

  return (
    <View style={styles.container}>
    <View style={styles.imageContainer}>
      <Image source={logo} style={styles.image} /> 
      <TextInput
        style={styles.input}
        value={text}
        onChangeText={onChangeText}
        placeholder="Digite o nome da carta..."
      />

      <View style={styles.groupButtons}>
        <TouchableOpacity
          style={styles.button}
          onPress={findCard}>
          <Text>Buscar</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={toggleImage}>
          <Text>{ showImage ? 'Ver Texto' : 'Ver Imagem' }</Text>
        </TouchableOpacity>
      </View>
		
    </View>

    {showImage ? (      
        <Image source={{ uri: card.imageUrl }} style={styles.cardImage}/>
    ) : (
      <View style={styles.card}>
        <Text>
          {card.text}
        </Text>
      </View>
    )}
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#eee',
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
    width: '100%',
    backgroundColor: '#eee',
  },
  input: {
    height: 40,
    marginTop: 50,
    width: '80%',
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  button: {
    alignItems: "center",
    backgroundColor: "#DDDDDD",
    padding: 10,
    width: 125,
    borderRadius: 10
  },
  card: {
    minHeight: '25%',
    width: '80%',
    borderColor: '#000',
    padding: 10,
    borderWidth: 2,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  image: {
    padding: 10,
    width: '100%',
    height: 120
  },
  cardImage: {
    width: 223,
    height: 310,
    borderColor: '#000',
    borderWidth: 2,
    borderRadius: 10,
  },
  groupButtons: {
    flexDirection: 'row',
    gap: 20,
  }
});
