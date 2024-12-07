import { Form } from "react-bootstrap";
import { DataGridColumn } from "../DataGrid";
import { useRouter } from "next/router";
import axios, { getAxios } from "@/api/axiosInstance";
import { storage } from "@/api/storage";

export const ColumnStatusRenderer = (column: DataGridColumn, item: any, table: string, inputableMap: any, setInputableMap: (inputableMap: any) => void, onAfterChangeStatus: (column: DataGridColumn, item: any) => void) => {
    const router = useRouter();
    const handleChangeStatusField = (status: number) => {
        getAxios(window.location.hostname).put(`/tables/${table}/update/${item.id}`, { item: { [column.index]: status }, fields: [column] }, {
            headers: {
                'Authorization': `Bearer ${storage.get('token') || ''}`
            }
        }).then(() => {
            item[column.index] = status;
            onAfterChangeStatus(column, item);
        }).catch((error: any) => {
            if (error.response && error.response.status === 401 && error.response.data.error === 'Invalid token') {
                storage.clearTokenInfo();
                router.push('/login');
            }
        });;
    }

    const getStatusLabel = (status: number) => {
        if (column.map) {
            return column.map[status] ?? '-';
        }
        return (status === 1) ? 'Active' : 'Inactive';
    }

    if (column.statusToggable) {
        return <Form.Check
            type="switch"
            label={column.hideLabel ? '' : getStatusLabel(item[column.index])}
            checked={item[column.index] === 1}
            onChange={() => handleChangeStatusField(item[column.index] === 1 ? 0 : 1)}
        />

    } else {
        return getStatusLabel(item[column.index]);
    }

};
