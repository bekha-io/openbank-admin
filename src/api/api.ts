import axios from "axios";

let baseUrl = "https://test-vm.swedencentral.cloudapp.azure.com/openbank/v1";

const instance = axios.create({
  baseURL: baseUrl, // Замените на свой базовый URL API
});

// Интерсептор для добавления JWT токена к каждому запросу
instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token"); // Получаем токен из локального хранилища
    if (token) {
      config.headers.Authorization = `Bearer ${token}`; // Добавляем токен к заголовкам запроса
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default instance;
