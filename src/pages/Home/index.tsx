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

  // Energy Flux // without translate
  // Nissa, Vastwood Seer // with back face // current: get the first face

  const toggleImage = () => {
    if(!card.image_uris.normal) return
    setShowImage(!showImage)
  }

  const renderError = (message = 'Algo deu errado! Tente novamente.') => {
    setShowImage(false)
    setCard({ printed_text: message, image_uris: { normal: null } })
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
      let [cardFound] = data.data;
      if(!cardFound || (!cardFound?.printed_text && !cardFound?.card_faces)){
        renderError('Carta sem tradução pt-BR.')
        return
      }

      if(!!cardFound.card_faces){
        // TODO: Nissa, Vastwood Seer // card with two faces
        // get the two faces of this card (?)
        const [frontFace] = cardFound.card_faces

        if(!frontFace){
          renderError()
          return 
        }

        cardFound = frontFace
      }

      // cardFound.card_faces

      setCard(cardFound)
      storeCard({
        name: `${text} / ${cardFound.printed_name}`.toLocaleLowerCase(),
        image: cardFound.image_uris.normal,
        text: cardFound.printed_text,
      })    
    })
    .catch((error) => {
      let message = 'Algo deu errado! Tente novamente.'

      if(error.response) {
        const { status } = error.response
  
        if(status === 404){
          message = 'Carta não encontrada! Tente novamente.'
        }
      }

      renderError(message)
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