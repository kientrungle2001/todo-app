import { axiosHost } from "../axiosInstance";
import { storage } from "../storage";

export const resourceRepository = {
    getResource: (itemId: number, settings: any) => {
        return axiosHost().post(`/tables/${settings.table}/detail/${itemId}`, {
            settings
        }, {
            headers: {
                'Authorization': `Bearer ${storage.get('token') || ''}`
            }
        }).catch((error: any) => {
            if (error.response && error.response.status === 401 && error.response.data.error === 'Invalid token') {
                storage.clearTokenInfo();
                window.location.href =  '/';
            }
        })
    },
    getQuestions: (itemId: number) => {
        return axiosHost().post(`/resources/questions/${itemId}`, {}, {
            headers: {
                'Authorization': `Bearer ${storage.get('token') || ''}`
            }
        }).catch((error: any) => {
            if (error.response && error.response.status === 401 && error.response.data.error === 'Invalid token') {
                storage.clearTokenInfo();
                window.location.href =  '/';
            }
        });
    },
    getTests: (itemId: number) => {
        return axiosHost().post(`/resources/tests/${itemId}`, {}, {
            headers: {
                'Authorization': `Bearer ${storage.get('token') || ''}`
            }
        }).catch((error: any) => {
            if (error.response && error.response.status === 401 && error.response.data.error === 'Invalid token') {
                storage.clearTokenInfo();
                window.location.href =  '/';
            }
        })
    }
};