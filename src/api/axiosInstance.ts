// src/api/axiosInstance.ts
import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:3001/api', // Change to your backend API URL
});

export default instance;