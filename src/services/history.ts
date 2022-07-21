import { storeData, getData, clearData } from '@/utils/storage'

interface CardProps {
    name: string,
    image: string,
    text: string,
}

const KEY = '@MAGIC_T:cards'

const storeCard = async (newCard: CardProps) => {
    const cards: CardProps[] = await getData(KEY)

    if(cards){
        const foundIndex = cards.findIndex(card => card.name == newCard.name)
        let cardsToUpdate = [...cards]
        if(foundIndex !== -1){
            cardsToUpdate[foundIndex] = newCard
            await storeData(KEY, cards)
        }else {
            await storeData(KEY, [...cards, newCard])
        }
    }else{
        await storeData(KEY, [newCard])
    }
}

const listCards = async (): Promise<CardProps[]> => {
    const cards = await getData(KEY)

    if(cards){
        return cards
    }else {
        return []
    }
}

const deleteCard = async (cardToDelete: CardProps) => {
    const cards: CardProps[] = await getData(KEY)
    const cardsUpdated = cards.filter(card => card.name !== cardToDelete.name)
    await storeData(KEY, cardsUpdated)
    return await listCards()
}

const clearCardHistory = async () => {
    return await clearData()
}

export {
    storeCard,
    listCards,
    deleteCard,
    clearCardHistory,
}