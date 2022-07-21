import React, { useEffect, useState } from 'react';
import { Ionicons } from '@expo/vector-icons'; 

import { View, SafeAreaView, FlatList, Image, StyleSheet } from 'react-native';

import { Text, Button, Portal, Modal, Card } from 'react-native-paper';

import { listCards, deleteCard } from '@/services/history';

interface CardProps {
    name: string,
    image: string,
    text: string,
}

const History = (props: any) => {
  const [modalVisible, setModalVisible] = useState(false)
  const [currentCard, setCurrentCard] = useState<CardProps>()
  const [cards, setCards] = useState<CardProps[]>([])

  useEffect(() => {
    listCards()
    .then((list) => {
        setCards(list)
    })
  }, [props])

  const toggleModal = () => {
    setModalVisible(!modalVisible)
  }

  const handleCurrentCard = (card: CardProps) => {
    setCurrentCard(card)
    toggleModal()
  }

  const handleDeleteCard = (card: CardProps) => {
    deleteCard(card)
    .then((newList) => setCards(newList))
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
                        <Button style={{ marginBottom: 10 }} mode="contained" onPress={() => handleCurrentCard(item)}>
                            <Ionicons name="image-outline" size={24} color="black" />
                        </Button> 
                        <Button mode="contained" onPress={() => handleDeleteCard(item)}>
                            <Ionicons name="trash-outline" size={24} color="black" />
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
        textTransform: 'capitalize',
        fontWeight: 'bold',
        marginBottom: 5,
    },
    image: {
        width: '100%',
        height: 500
    }
})