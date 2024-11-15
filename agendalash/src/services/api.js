import axios from 'axios';
import API_BASE_URL from '../config/api';

// Cria uma instância do Axios
const api = axios.create({
    baseURL: API_BASE_URL, // URL base da API
    headers: {
        'Content-Type': 'application/json',
    },
});

export default api;