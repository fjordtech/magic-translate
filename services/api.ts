import axios from 'axios'

const api = axios.create({
    baseURL: 'https://api.magicthegathering.io/v1'
})

export default api