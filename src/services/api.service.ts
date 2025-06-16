import axios from "axios";

const DRAGON_BALL_API_URL = 'https://dragonball-api.com/api';

const api = axios.create({
    baseURL: DRAGON_BALL_API_URL
});

export default api;