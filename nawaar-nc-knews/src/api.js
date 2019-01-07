import axios from 'axios';
import { KEY } from './config/auth'

const BASE_URL = 'https://nawaar-nc-knews.herokuapp.com/api';

export const getTopics = async () => {
    const { data } = await axios.get(`${BASE_URL}/topics`, {
        headers: {
            "Content-Type": "application/json",
            "Authorization": `BEARER ${KEY}`
        }
    })
    return data.topics
}