// src/api/axiosInstance.ts
import axios from 'axios';
import { getDefaultConfigs } from './defaultSettings';

let configs = getDefaultConfigs();
const instance = axios.create({
  baseURL: configs.apiEndpoint, // Change to your backend API URL
  headers: {
    common: {
      'x-api-software': configs.software,
      'x-api-site': configs.site
    }
  }
});

export default instance;
