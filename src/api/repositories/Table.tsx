import { TableGridSettings } from "@/components/grid/TableGrid";
import { getAxios } from "../axiosInstance";
import { storage } from "../storage";

export const tableRepository = {
    getList: (settings: TableGridSettings, query: any) => {
        return getAxios(window.location.hostname)
            .post('/tables/search/' + settings.table, query, {
                headers: {
                    'Authorization': `Bearer ${storage.get('token') || ''}`
                }
            }).catch((error: any) => {
                if (error.response && error.response.status === 401 && error.response.data.error === 'Invalid token') {
                    storage.clearTokenInfo();
                    window.location.reload();
                }
            });
    },
    deleteItem: (settings: TableGridSettings, item: any) => {
        return getAxios(window.location.hostname).delete(`/tables/${settings.table}/delete/${item.id}`, {
            headers: { 'Authorization': `Bearer ${storage.get('token') || ''}` }
        }).catch((error: any) => {
            if (error.response && error.response.status === 401 && error.response.data.error === 'Invalid token') {
                storage.clearTokenInfo();
                window.location.reload();
            }
        });
    }
}