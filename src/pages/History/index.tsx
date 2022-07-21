import React, { useState } from 'react';
import { Ionicons } from '@expo/vector-icons'; 

import { View, SafeAreaView, FlatList, Image, StyleSheet } from 'react-native';

import { Text, Button, Portal, Modal, Card } from 'react-native-paper';

interface CardProps {
    name: string,
    image: string,
    text: string,
}

const cards: CardProps[] = [
    {
        name: 'Pacifism / Pacifismo',
        image: 'https://c1.scryfall.com/file/scryfall-cards/normal/front/7/e/7ede32f0-9b03-4a0a-b3f8-56d68ae618fc.jpg?1645762811',
        text: 'Encantar criatura A criatura encantada não pode atacar nem bloquear.'
    },
    {
        name: 'Duress / Coagir',
        image: 'https://c1.scryfall.com/file/scryfall-cards/normal/front/e/7/e7d653ec-dc63-47a6-8913-22ded8fe3cde.jpg?1646244861',
        text: 'Encantar criatura A criatura encantada não pode atacar nem bloquear.'
    },
]

const History = () => {
  const [modalVisible, setModalVisible] = useState(false)
  const [currentCard, setCurrentCard] = useState<CardProps>()

  const toggleModal = () => {
    setModalVisible(!modalVisible)
  }

  const handleCurrentCard = (card: CardProps) => {
    setCurrentCard(card)
    toggleModal()
  }

  return (
    <SafeAreaView >
        <Portal>
            <Modal visible={modalVisible} onDismiss={toggleModal} >
                <Card style={styles.containerCard}>
                    <Image source={{ uri: currentCard?.image }} style={styles.image} resizeMode='contain'/>
                </Card>
            </Modal>
        </Portal>
        <FlatList
            contentContainerStyle={styles.container}
            showsVerticalScrollIndicator={false}
            data={cards}
            keyExtractor={item => item.name}
            renderItem={({ item }: any) => (
                <View style={styles.item}>
                    <View style={styles.info}>
                        <Text style={styles.name}>{item.name}</Text>
                        <Text>{item.text}</Text>
                    </View>
            
                    <View>
                        <Button mode="contained" onPress={() => handleCurrentCard(item)}>
                            <Ionicons name="image-outline" size={24} color="black" />
                        </Button> 
                    </View>
                </View>
           )}
        />
    </SafeAreaView>
  )
}

export default History;


const styles = StyleSheet.create({
    container: {
        padding: 20,
        paddingTop: 40,
    },
    containerCard: {
        padding: 10,
    },
    item: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#838383',
    },
    info: {
        flex: 1,
        marginRight: 10,
    },
    name: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    image: {
        width: '100%',
        height: 500
    }
})