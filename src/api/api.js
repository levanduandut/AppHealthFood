import axios from 'axios';
import { URL_PATH } from '@env';

const api = axios.create({
  baseURL: URL_PATH,
  responseType: 'json',
  withCredentials: true,
});

export default api;
