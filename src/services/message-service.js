import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL;
const USERS_API = `${BASE_URL}/users`;


const api = axios.create({
                             withCredentials: true
                         });

export const getMessagesISent = (userId) =>
    api.get(`${USERS_API}/${userId}/messages`)
        .then(response => response.data);

export const getMessagesSentToMe = (userId) =>
    api.get(`${USERS_API}/messages/${userId}`)
        .then(response => response.data);

export const sendMessage = () =>
    api.post(`${USERS_API}/messages/`)
        .then(response => response.data);

export const getMessagesBetweenUsers = (userId1,userId2) =>
    api.get(`${USERS_API}/${userId1}/messages/${userId2}`)
        .then(response => response.data);