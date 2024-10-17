// src/api/axiosInstance.ts
import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:3002/api', // Change to your backend API URL
  headers: {
    common: {
      'x-api-software': 1,
      'x-api-site': 1
    }
  }
});

export default instance;
