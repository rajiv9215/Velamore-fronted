// utils/api.js
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:4000', // or use backend_url from App.js
});

// Add interceptor to include auth-token for all requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('auth-token');
  if (token) {
    config.headers['auth-token'] = token;
  }
  return config;
});

export default api;