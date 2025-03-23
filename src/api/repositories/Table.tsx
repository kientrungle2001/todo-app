import { TableGridSettings } from "@/components/grid/TableGrid";
import { getAxios } from "../axiosInstance";
import { storage } from "../storage";
import { DataGridColumn } from "@/components/grid/DataGridColumnTypes";

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
    },
    createItem: (settings: TableGridSettings, fields: any, item: any) => {
        return getAxios(window.location.hostname).post(`/tables/${settings.table}/create`, {
            item: item,
            settings: JSON.parse(JSON.stringify(settings)),
            fields: JSON.parse(JSON.stringify(fields))
        }, {
            headers: {
                'Authorization': `Bearer ${storage.get('token') || ''}`
            }
        }).catch((error: any) => {
            if (error.response && error.response.status === 401 && error.response.data.error === 'Invalid token') {
                storage.clearTokenInfo();
                window.location.reload();
            }
        }).catch((error: any) => {
            console.error("Error adding item:", error);
            alert("Error adding item. Please try again later.");
        });
    },
    getItem: (settings: TableGridSettings, itemId: number) => {
        return getAxios(window.location.hostname).post(`/tables/${settings.table}/detail/${itemId}`, {
            settings
        }, {
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
    updateItem: (settings: TableGridSettings, itemId: number, fields: any, updatedItem: any) => {
        return getAxios(window.location.hostname).put(`/tables/${settings.table}/update/${itemId}`, {
            item: updatedItem,
            settings: JSON.parse(JSON.stringify(settings)),
            fields: JSON.parse(JSON.stringify(fields))
        }, {
            headers: {
                'Authorization': `Bearer ${storage.get('token') || ''}`
            }
        }).catch((error: any) => {
            if (error.response && error.response.status === 401 && error.response.data.error === 'Invalid token') {
                storage.clearTokenInfo();
                window.location.reload();
            }
        }).catch((error: any) => {
            console.error("Error updating item:", error);
            alert("Error updating item. Please try again later.");
        });
    },
    updateColumn: (table: string, column: DataGridColumn, values: any) => {
        return getAxios(window.location.hostname).put(`/tables/${table}/update-column`, { column, values }, {
            headers: {
                'Authorization': `Bearer ${storage.get('token') || ''}`
            }
        }).catch((error: any) => {
            if (error.response && error.response.status === 401 && error.response.data.error === 'Invalid token') {
                storage.clearTokenInfo();
                window.location.reload();
            }
        });
    }
}