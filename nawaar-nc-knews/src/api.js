import axios from 'axios';

// const BASE_URL = 'https://nawaar-nc-knews.herokuapp.com/api';

axios.defaults.baseURL = 'https://nawaar-nc-knews.herokuapp.com/api';
axios.defaults.headers.common['Authorization'] = `BEARER ${localStorage.AUTH_TOKEN}`;
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
    const { data } = await axios.get(`/articles/${article_id}`)
    return data.article
}

export const getComments = async (article_id) => {
    const { data } = await axios.get(`/articles/${article_id}/comments`)
    return data.comments
}

export const patchVotes = async (amount, article_id, comment_id) => {
    const url = comment_id ? `/articles/${article_id}/comments/${comment_id}` : `/articles/${article_id}`;
    await axios.patch(url, {
        inc_votes: amount
    })
}

export const loginAndGetToken = async (username, password) => {
    const { data } = await axios.post('/login', ({
        username,
        password
    }))
    return data.token
}

export const getUsers = async () => {
    const { data } = await axios.get('/users');
    return data.users
}

export const postComment = async (article_id, user_id, comment) => {
    const { data } = await axios.post(`/articles/${article_id}/comments`, {
        user_id,
        body: comment
    })
    return data.comment
}

export const postArticle = async (topic, user_id, title, body) => {
    const { data } = await axios.post(`topics/${topic}/articles`, {
        user_id,
        title,
        body
    })
    return data.article
}