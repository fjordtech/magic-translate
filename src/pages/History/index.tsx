import React, { useEffect, useState } from 'react';
import { Ionicons } from '@expo/vector-icons'; 

import { View, SafeAreaView, FlatList, Image, StyleSheet } from 'react-native';

import { Text, Button, Portal, Modal, Card, FAB } from 'react-native-paper';

import Provider from '@/contexts/PaperProvider'
import { listCards, deleteCard, clearCardHistory } from '@/services/history';

interface CardProps {
    name: string,
    image: string,
    text: string,
}  

const History = (props: any) => {
  const { theme } = props
  const [modalVisible, setModalVisible] = useState(false)
  const [currentCard, setCurrentCard] = useState<CardProps>()
  const [cards, setCards] = useState<CardProps[]>([])
  const [cleanOpen, setCleanOpen] = useState(false)
  const [fabOpen, setFabOpen] = useState(false)

  useEffect(() => {
    listCards()
    .then((list) => {
        setCards(list)
        if(!!list.length){
            setFabOpen(true)
        }
    })

    return () => {
        setCleanOpen(false)
        setFabOpen(false)
    }
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

  const handleClear = async () => {
    await clearCardHistory()
    setCards([])
    setFabOpen(false)
  }

  const renderEmptyState = () => (
    <View style={styles.emptyContent}>
        <Ionicons name="sad-outline" size={42} color="#838383" />
        <Text style={styles.emptyText}>Não há histórico de tradução.</Text>    
    </View>
  )

  return (
    <Provider>
        <SafeAreaView style={{ flex: 1 }}>
            <Portal>
                <Modal visible={modalVisible} onDismiss={toggleModal} >
                    <Card style={styles.containerCard}>
                        <Image source={{ uri: currentCard?.image }} style={styles.image} resizeMode='contain'/>
                    </Card>
                </Modal>

                <FAB.Group
                    visible={fabOpen}
                    open={cleanOpen}
                    icon={cleanOpen ? 'alert-outline' : 'delete'}
                    actions={[
                    {
                        icon: 'check-bold',
                        label: 'Limpar tudo',
                        onPress: handleClear,
                    },
                    ]}
                    onStateChange={({ open }) => setCleanOpen(open)}
            />
            </Portal>  

            <FlatList
                contentContainerStyle={styles.container}
                showsVerticalScrollIndicator={false}
                data={cards}
                keyExtractor={item => item.name}
                ListEmptyComponent={renderEmptyState()}
                renderItem={({ item, index }: any) => (
                    <View style={[styles.item, cards.length === index+1 ? styles.lastItem : null]}>
                        <View style={styles.info}>
                            <Text style={[styles.name, { color: theme.colors.text }]}>{item.name}</Text>
                            <Text style={{ color: theme.colors.text }}>{item.text}</Text>
                        </View>
                
                        <View>
                            <Button style={{ marginBottom: 10, backgroundColor: theme.colors.primary }} mode="contained" onPress={() => handleCurrentCard(item)}>
                                <Ionicons name="image-outline" size={24} color={theme.colors.text} />
                            </Button> 
                            <Button style={{ backgroundColor: theme.colors.primary }} mode="contained" onPress={() => handleDeleteCard(item)}>
                                <Ionicons name="trash-outline" size={24} color={theme.colors.text} />
                            </Button> 
                        </View>
                    </View>
            )}
            />
        </SafeAreaView>
    </Provider>  
  )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
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
    lastItem: {
        borderBottomWidth: 0,
        paddingBottom: 100,
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
    },
    fab: {
        position: 'absolute',
        margin: 16,
        right: 0,
        bottom: 0,
    },
    emptyText: {
        color: '#838383',
        textAlign: 'center',
        fontSize: 16,
    },
    emptyContent: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
})

export default History;