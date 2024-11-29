// src/api/axiosInstance.ts
import axios from 'axios';
import { getDefaultConfigs, getConfigsByHostName } from './defaultSettings';

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

const hostnameInstances:any = {};

export const getAxios = (hostname: string) => {

  if (typeof hostnameInstances[hostname] !== 'undefined') {
    return hostnameInstances[hostname];
  }
  let hostnameConfigs = getConfigsByHostName(hostname);
  if (!hostnameConfigs) hostnameConfigs = configs;
  let instance = axios.create({
    baseURL: hostnameConfigs.apiEndpoint, // Change to your backend API URL
    headers: {
      common: {
        'x-api-software': hostnameConfigs.software,
        'x-api-site': hostnameConfigs.site
      }
    }
  });
  hostnameInstances[hostname] = instance;
  return instance;
}

export default instance;
