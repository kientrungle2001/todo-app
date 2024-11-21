// src/api/axiosInstance.ts
import axios from 'axios';
import { defaultConfigs } from './defaultSettings';

const instance = axios.create({
  baseURL: defaultConfigs.mediaUploadEndpoint, // Change to your backend API URL
  headers: {
    common: {
      'x-api-software': defaultConfigs.software,
      'x-api-site': defaultConfigs.site
    }
  }
});

export default instance;
