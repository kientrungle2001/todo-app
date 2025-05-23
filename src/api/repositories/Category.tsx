import { axiosHost } from "../axiosInstance";
import { storage } from "../storage";

export const categoryRepository = {
    getCategory: (itemId: number, settings: any) => {
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
        return axiosHost().post(`/categories/questions/${itemId}`, {}, {
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
        return axiosHost().post(`/categories/tests/${itemId}`, {}, {
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