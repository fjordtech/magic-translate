import { StatusBar } from 'expo-status-bar';
import { StyleSheet, TouchableOpacity, Text, View, TextInput, Image } from 'react-native';
import { useEffect, useState } from 'react';
import logo from './assets/magic-logo.png'
import axios from 'axios';

export default function App() {
  const [text, onChangeText] = useState("");
  // const [card, setCard] = useState<any>('');
  const [cardTranslated, setCardTranslated] = useState<any>('');
  const baseUrl = 'https://api.magicthegathering.io/v1/cards';

  const findCard = () => {
    axios.get(baseUrl + `?name=${text}`).then(res => {
      setCardTranslated(res.data.cards[1].foreignNames.filter(x => x.language =='Portuguese (Brazil)')[0].text)
    })
  }

  return (
    <View style={styles.container}>
    <View style={styles.imageContainer}>
      <Image source={logo} style={styles.image} /> 
      <TextInput
        style={styles.input}
        onChangeText={onChangeText}
        placeholder="Digite o nome da carta"
      />
		<TouchableOpacity
			style={styles.button}
			onPress={findCard}>
      <Text>Buscar</Text>
    </TouchableOpacity>
    </View>

		<View style={styles.card}>
			<Text>
				{cardTranslated}
			</Text>
		</View>
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
    width: '50%',
    borderColor: '#000',
    borderWidth: 2,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  image: {
    padding: 10,
    width: '100%',
    height: 120
  }
    
});
