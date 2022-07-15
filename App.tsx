import { StatusBar } from 'expo-status-bar';
import { StyleSheet, TouchableOpacity, Text, View, TextInput, Image } from 'react-native';
import { useEffect, useState } from 'react';
import logo from './assets/magic-logo.png'
import axios from 'axios';

export default function App() {
  const [text, onChangeText] = useState('');
  const [card, setCard] = useState<any>('');
  const [showImage, setShowImage] = useState(false);
  const [cardTranslated, setCardTranslated] = useState<any>('');
  const baseUrl = 'https://api.magicthegathering.io/v1/cards';


  const toggleImage = () => {
    setShowImage(!showImage)
  }

  const findCard = () => {
    // Pacifism
    // Crypt Ghast
    // Duress

    axios.get(baseUrl + `?name=${text}`).then(res => {
      const cardFound = res.data.cards
        .filter(card => !!card.foreignNames)
        .find(card => {
          return card.foreignNames.find(names => names.language === 'Portuguese (Brazil)')
        })

      if(!cardFound){
        setCardTranslated('Sem tradução pt-BR')
        return
      }

      const translation = cardFound.foreignNames.find(names => names.language === 'Portuguese (Brazil)')

      setCard(cardFound)
      setCardTranslated(translation.text)
    })
  }

  return (
    <View style={styles.container}>
    <View style={styles.imageContainer}>
      <Image source={logo} style={styles.image} /> 
      <TextInput
        style={styles.input}
        value={text}
        onChangeText={onChangeText}
        placeholder="Digite o nome da carta"
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
      <View>
        <Image source={card.imageUrl} style={styles.cardImage}/>
      </View>
    ) : (
      <View style={styles.card}>
        <Text placeholder='Digite o nome da carta...'>
          {cardTranslated}
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
    height: '25%',
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
