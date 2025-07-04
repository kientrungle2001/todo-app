let configs: any = {
    mediaUploadEndpoint: 'http://localhost:3002/api',
    mediaUrlEndpoint: 'http://localhost:3002',
    apiEndpoint: 'http://localhost:3002/api',
    software: 1,
    site: 1,
    appName: 'fulllook'
};

let hostnameConfigs: any = {
    'pmtv.vn': {
        mediaUploadEndpoint: 'http://localhost:3002/api',
        mediaUrlEndpoint: 'http://localhost:3002',
        apiEndpoint: 'http://localhost:3002/api',
        software: 1005,
        site: 1,
        appName: 'pmtv'
    },
    'qlhs2.vn': {
        mediaUploadEndpoint: 'http://localhost:3002/api',
        mediaUrlEndpoint: 'http://localhost:3002',
        apiEndpoint: 'http://localhost:3002/api',
        software: 201,
        site: 1,
        appName: 'qlhs'
    }
}

export const defaultConfigs: any = configs;
export const getDefaultConfigs = () => defaultConfigs;
export const getConfigsByHostName = (hostname: string | null = null): any | null => {
    if (null === hostname) {
        hostname = window.location.hostname;
    }
    return typeof hostnameConfigs[hostname] !== 'undefined' ? hostnameConfigs[hostname] : configs;
};


export const replaceMediaUrl = (content: string) => {
    if (!content) return '';
    return ('' + content).replaceAll('http://s1.nextnobels.com', '')
        .replaceAll('http://nextnobels.com', '')
        .replaceAll('http://www.fulllooksongngu.com', '');
}

export const formatShortDate = (d: Date) => {
    return d.getDate() + '/' + (d.getMonth() + 1);
}