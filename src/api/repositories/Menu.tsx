import { DataGridPagination } from "@/types/grid/DataGridPagination";
import { DataGridSortDirection } from "@/types/grid/DataGridSortDirection";
import { DataGridSort } from "@/types/grid/DataGridSort";
import { FullLookAdminMenuSettings } from "../settings/fulllook/FullLookMenuSettings";
import { getAxios } from "../axiosInstance";
import { storage } from "../storage";
import { NextRouter } from "next/router";

export const menuRepository = {
    getMenu: (router: NextRouter) => {
        const settings = FullLookAdminMenuSettings;
        const sorts: DataGridSort[] = [
            { index: 'ordering', direction: DataGridSortDirection.ASCENDING },
        ];
        const pagination: DataGridPagination = {
            currentPage: 1,
            pageSize: 100
        };
        return getAxios(window.location.hostname).post('/tables/search/admin_menu', {
            settings: JSON.parse(JSON.stringify(settings)),
            search: '',
            filterData: {
                status: 1,
                shortcut: 1
            },
            sorts: JSON.parse(JSON.stringify(sorts)),
            page: pagination.currentPage,
            pageSize: pagination.pageSize,
        }, {
            headers: {
                'Authorization': `Bearer ${storage.get('token') || ''}`
            }
        }).catch((error: any) => {
            if (error.response && error.response.status === 401
                && error.response.data.error === 'Invalid token') {
                storage.clearTokenInfo();
                router.push('/login');
            }
        });
    }
}