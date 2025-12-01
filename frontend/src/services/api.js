import axios from 'axios';

const API_URL = 'http://localhost:8080';

const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

export const getUsers = async () => {
    const response = await api.get('/users');
    return response.data;
};

export const getTweets = async (page = 0, size = 10) => {
    const response = await api.get('/tweets', {
        params: { page, size },
    });
    return response.data;
};

export const createTweet = async (authorId, text) => {
    const response = await api.post('/tweets', { authorId, text });
    return response.data;
};

export const createRetweet = async (retweeterId, originalTweetId) => {
    const response = await api.post('/tweets/retweet', { retweeterId, originalTweetId });
    return response.data;
};

export const getUserTweets = async (userId, page = 0, size = 15) => {
    const response = await api.get(`/tweets/user/${userId}`, {
        params: { page, size },
    });
    return response.data;
};

export const createUser = async (name, userName) => {
    const response = await api.post('/users', { name, userName });
    return response.data;
};

export const deleteUser = async (userId) => {
    await api.delete(`/users/${userId}`);
};

export default api;
