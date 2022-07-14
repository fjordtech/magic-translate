import axios from 'axios';

const baseUrl = 'https://api.magicthegathering.io/v1/cards';


export const getAllCards = () => {
    axios.get(baseUrl).then((res) => {
        console.log(res);
    })
}

export const getCardByName = (cardName: string) => {
        // return await axios.get(baseUrl + `?name=${cardName}`)
        axios.get(baseUrl + `?name=${cardName}`).then(res => {
            const test = res.data;
            return test.cards[0].originalText

        })
        // if(res.data.cards[0].foreignNames.filter(x => x.language =='Portuguese (Brazil)') === []){
        console.log(res.data.cards[1].foreignNames.filter(x => x.language =='Portuguese (Brazil)'))
        // return res.data.cards[1].foreignNames.filter(x => x.language =='Portuguese (Brazil)')
        // return res.data.cards[1].foreignNames.filter(x => x.language =='Portuguese (Brazil)')
        // }
        // return res.data.cards[0].foreignNames.filter(x => x.language =='Portuguese (Brazil)')        
    
}