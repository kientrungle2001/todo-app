import React, { useEffect } from "react";
import { TableGridSettings } from "../../TableGrid";
import { getAxios } from "@/api/axiosInstance";
import { useRouter } from "next/router";
import { storage } from "@/api/storage";
import { DataGridEditMode } from "../../DataGridEditTypes";
import CategoryGridEdit from "./CategoryGridEdit";

interface TableGridProps {
    itemId: number;
    controller: string;
    settings: TableGridSettings
}

export const CategoryGridDetail: React.FC<TableGridProps> = ({ controller, settings, itemId }): React.ReactElement => {
    const router = useRouter();
    const [item, setItem] = React.useState<any>(null);

    useEffect(() => {
        getAxios(window.location.hostname).post(`/tables/${settings.table}/detail/${itemId}`, {
            settings
        }, {
            headers: {
                'Authorization': `Bearer ${storage.get('token') || ''}`
            }
        }).then((resp: any) => {
            setItem(resp.data);
            console.log("Fetched item:", resp.data);
        }).catch((error: any) => {
            if (error.response && error.response.status === 401 && error.response.data.error === 'Invalid token') {
                storage.clearTokenInfo();
                router.push('/login');
            }
        });
    }, [itemId]);

    if (!item) {
        return <>
            <h3>Loading...</h3>
        </>
    }

    const handleCancelEdit = (): void => {
        router.push(`/Table/${controller}`);
    }

    return <>
        <CategoryGridEdit mode={DataGridEditMode.EDIT}
            itemId={itemId} item={item}
            handleCancelEdit={handleCancelEdit} />
    </>
};
