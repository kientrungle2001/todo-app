let configs: any = {
    mediaUploadEndpoint: 'http://localhost:3002/api',
    mediaUrlEndpoint: 'http://localhost:3002',
    apiEndpoint: 'http://localhost:3002/api',
    software: 1,
    site: 1,
};

export const defaultConfigs: any = configs;
export const getDefaultConfigs = () => defaultConfigs;

export const replaceMediaUrl = (content: string) => {
    return content.replaceAll('http://s1.nextnobels.com', '')
        .replaceAll('http://nextnobels.com', '')
        .replaceAll('http://www.fulllooksongngu.com', '');
}