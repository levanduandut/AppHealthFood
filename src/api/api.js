import axios from 'axios';

const api = axios.create({
  baseURL: 'http://192.168.1.3:8069/api/',
  responseType: 'json',
  withCredentials: true,
});

export default api;
