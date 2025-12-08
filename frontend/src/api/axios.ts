import axios from 'axios';

// Tworzymy instancję axiosa z adresem Twojego backendu
export const api = axios.create({
  baseURL: 'http://localhost:3000', // Adres NestJS
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor błędów (logowanie błędów w konsoli)
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error.response?.data || error.message);
    return Promise.reject(error);
  }
);