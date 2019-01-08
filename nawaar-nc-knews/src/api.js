import axios from 'axios';
import { AUTH_TOKEN } from './config/auth'

// const BASE_URL = 'https://nawaar-nc-knews.herokuapp.com/api';

axios.defaults.baseURL = 'https://nawaar-nc-knews.herokuapp.com/api';
axios.defaults.headers.common['Authorization'] = `BEARER ${AUTH_TOKEN}`;
axios.defaults.headers.common['Content-Type'] = `application/json`;


export const getTopics = async () => {
    const { data } = await axios.get('/topics')
    return data.topics
}

export const getArticles = async (topic, page) => {
    const url = topic ? `/topics/${topic}/articles?p=${page}` : `/articles?p=${page}`;
    const { data } = await axios.get(url)
    return data.articles
}

export const getArticle = async (article_id) => {
    const { data } = await axios.get(`articles/${article_id}`)
    return data.article
}

export const getComments = async (article_id) => {
    const { data } = await axios.get(`articles/${article_id}/comments`)
    return data.comments
}
