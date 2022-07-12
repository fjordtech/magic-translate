import axios from 'axios';

const baseUrl = 'https://api.magicthegathering.io/v1/cards';


export const getAllCards = () => {
    axios.get(baseUrl).then((res) => {
        console.log(res);
    })
}

export const getCardByName = async (cardName: string) => {
    try{
        const res = await axios.get(baseUrl + `?name=${cardName}`)
        // if(res.data.cards[0].foreignNames.filter(x => x.language =='Portuguese (Brazil)') === []){
        return res.data.cards[1].foreignNames.filter(x => x.language =='Portuguese (Brazil)')[0].text
        // return res.data.cards[1].foreignNames.filter(x => x.language =='Portuguese (Brazil)')
        // }
        // return res.data.cards[0].foreignNames.filter(x => x.language =='Portuguese (Brazil)')        
    }
    catch (err){
        console.error(err);
    }
}