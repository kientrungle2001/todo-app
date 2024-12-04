import React, { useEffect } from "react";
import { TableGridSettings } from "./TableGrid";
import axios, { getAxios } from "@/api/axiosInstance";
import DataGridEdit from "./DataGridEdit";
import { useRouter } from "next/router";
import { storage } from "@/api/storage";
import { DataGridEditField, DataGridEditMode } from "./DataGridEditTypes";

interface TableGridProps {
    itemId: number;
    controller: string;
    settings: TableGridSettings
}

export const TableGridEdit: React.FC<TableGridProps> = ({ controller, settings, itemId }): React.ReactElement => {
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



    const handleUpdateItem = (updatedItem: any, fields: DataGridEditField[], event: React.FormEvent<HTMLFormElement>): void => {
        console.log("Updating item:", updatedItem);
        event.preventDefault();
        console.log("Fields:", fields);
        getAxios(window.location.hostname).put(`/tables/${settings.table}/update/${itemId}`, {
            item: updatedItem,
            settings: JSON.parse(JSON.stringify(settings)),
            fields: JSON.parse(JSON.stringify(fields))
        }, {
            headers: {
                'Authorization': `Bearer ${storage.get('token') || ''}`
            }
        }).then(() => {
            setItem(updatedItem);
            if (router.query.backHref) {
                router.push(router.query.backHref as string);
            } else {
                router.push(`/Table/${controller}`);
            }
        }).catch((error: any) => {
            if (error.response && error.response.status === 401 && error.response.data.error === 'Invalid token') {
                storage.clearTokenInfo();
                router.push('/login');
            }
        }).catch((error: any) => {
            console.error("Error updating item:", error);
            alert("Error updating item. Please try again later.");
        });
    }

    const handleCancelEdit = (): void => {
        if (router.query.backHref) {
            router.push(router.query.backHref as string);
        } else {
            router.push(`/Table/${controller}`);
        }
    }

    // make bootstrap edit form here
    return <>
        <DataGridEdit updateLabel={settings.updateLabel} mode={DataGridEditMode.EDIT} itemId={itemId} table={settings.table} item={item} setItem={setItem} fields={settings.editFields ?? settings.addFields}
            handleUpdateItem={handleUpdateItem} handleCancelEdit={handleCancelEdit} />
    </>
};
