import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://127.0.0.1:8080/v1', // Замените на свой базовый URL API
});

// Интерсептор для добавления JWT токена к каждому запросу
instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token'); // Получаем токен из локального хранилища
    if (token) {
      config.headers.Authorization = `Bearer ${token}`; // Добавляем токен к заголовкам запроса
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
});

export default instance;