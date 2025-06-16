import axios from "axios";

const DRAGON_BALL_API_URL = 'https://dragonball-api.com/api';

const api = axios.create({
    baseURL: DRAGON_BALL_API_URL
});

api.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {

        if(error.response) {
            const statusCode = error.response.status;
            const errorMessage = error.response.data?.message || 'Unknown error';

            printStatusCodeError(statusCode);

            return Promise.reject(new Error(errorMessage));

        }

        return Promise.reject(new Error('Unknown error'));
    }
);

export default api;

function printStatusCodeError(statusCode: number) {
    switch(statusCode) {
        case 400: return console.error('Bad request');
        case 401: return console.error('Unauthorized access');
        case 403: return console.error('Forbidden');
        case 500: return Promise.reject('Server error');
        case 503: return Promise.reject('Server unavailable');
    }
}