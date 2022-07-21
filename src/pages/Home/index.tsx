import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Button, TextInput, Card, Paragraph } from 'react-native-paper';
import { StyleSheet, Text, View, Image } from 'react-native';

import api from '@/services/api'
import { storeCard } from '@/services/history'

import logo from '@/assets/magic-logo.png'

export default function App() {
  const [text, onChangeText] = useState('');
  const [card, setCard] = useState<any>({ printed_text: '', image_uris: { normal: null } });
  const [showImage, setShowImage] = useState(false);
  const [loading, setLoading] = useState(false);

  // Pacifism
  // Crypt Ghast
  // Duress 

  const toggleImage = () => {
    if(!card.image_uris.normal) return
    setShowImage(!showImage)
  }

  const findCard = async () => {
    if(!text.trim() || loading) return

    setLoading(true)
    api.get('/cards/search', {
      params: {
        q: `${text} lang:pt`
      }
    })
    .then(({ data }) => {
      const [cardFound] = data.data;
      if(!cardFound){
        setCard({ printed_text: 'Carta sem tradução pt-BR.', image_uris: { normal: null } })
        return
      }

      setCard(cardFound)
      storeCard({
        name: `${text} / ${cardFound.printed_name}`,
        image: cardFound.image_uris.normal,
        text: cardFound.printed_text,
      })    
    })
    .catch(({ response }) => {
      const { status } = response

      let message = 'Algo deu errado! Tente novamente.'
      if(status === 404){
        message = 'Carta não encontrada! Tente novamente.'
      }

      setCard({ printed_text: message, image_uris: { normal: null } })
    })
    .finally(() => setLoading(false))
  }

  return (
    <View style={styles.container}>
    <View style={styles.imageContainer}>
      <Image source={logo} style={styles.image} /> 
      <TextInput
        label="Nome da Carta"
        style={styles.input}
        value={text}
        onChangeText={onChangeText}
        placeholder="Digite o nome da carta..."
      />

      <View style={styles.groupButtons}>
        <Button icon="magnify" mode="contained" onPress={findCard} loading={loading}>
          Buscar
        </Button> 

        <Button style={{ marginLeft: 10 }} icon="image-area" mode="contained" onPress={toggleImage}>
          { showImage ? 'Ver Texto' : 'Ver Imagem' }
        </Button>
      </View>

    </View>
    {showImage ? (      
        <Image source={{ uri: card.image_uris.normal }} style={styles.cardImage}/>
    ) : !!card.printed_text && (
      <Card style={{ maxHeight: 200 }} elevation={3} mode='elevated'>
        <Card.Content>
          <Paragraph>
            {card.printed_text}
          </Paragraph>
        </Card.Content>
      </Card>
    )}
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 40,
    backgroundColor: '#eee',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  imageContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
    width: '100%',
    backgroundColor: '#eee',
  },
  input: {
    margin: 12,
    marginTop: 50,
    width: '80%',
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
  }
});