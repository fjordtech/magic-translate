import { StatusBar } from 'expo-status-bar';
import { StyleSheet, TouchableOpacity, Text, View, TextInput } from 'react-native';
import { useEffect, useState } from 'react';
import { getAllCards, getCardByName } from './Api/Api';

export default function App() {
  const [text, onChangeText] = useState("");
  const [card, setCard] = useState<any>('');

  const findCard = () => {
	//   console.log(text)	  	
	setCard(getCardByName(text))
  }

  useEffect(() => {
	console.log(card);
  }, [card])

  return (
    <View style={styles.container}>
		<TextInput
			style={styles.input}
			onChangeText={onChangeText}
			placeholder="card"
		/>
		<TouchableOpacity
			style={styles.button}
			onPress={findCard}
      	>
        <Text>Press Here</Text>
      </TouchableOpacity>
		<View style={styles.card}>
			<Text>
				{card.text}
			</Text>
		</View>
		<StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    height: 40,
    width: 150,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  button: {
    alignItems: "center",
    backgroundColor: "#DDDDDD",
    padding: 10
  },
  card: {
	height: '25%',
	width: '50%',
	borderColor: '#000',
	borderWidth: 2,
	borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  }
});
