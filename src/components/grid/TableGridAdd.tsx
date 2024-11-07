import React from "react";
import { TableGridSettings } from "./TableGrid";
import axios from "@/api/axiosInstance";
import DataGridEdit from "./DataGridEdit";
import { useRouter } from "next/router";
import { storage } from "@/api/storage";
import { DataGridEditField, DataGridEditMode } from "./DataGridEditTypes";

interface TableGridProps {
    controller: string;
    settings: TableGridSettings
}

export const TableGridAdd: React.FC<TableGridProps> = ({ controller, settings }): React.ReactElement => {
    const router = useRouter();
    const [item, setItem] = React.useState<any>({});

    if (!item) {
        return <>
            <h3>Loading...</h3>
        </>
    }



    const handleAddItem = (updatedItem: any, fields: DataGridEditField[], event: React.FormEvent<HTMLFormElement>): void => {
        event.preventDefault();
        axios.post(`/tables/${settings.table}/create`, {
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
        }).catch((error) => {
            if (error.response && error.response.status === 401 && error.response.data.error === 'Invalid token') {
                storage.clearTokenInfo();
                router.push('/login');
            }
        }).catch((error: any) => {
            console.error("Error adding item:", error);
            alert("Error adding item. Please try again later.");
        });
    }

    const handleCancelAdd = (): void => {
        if (router.query.backHref) {
            router.push(router.query.backHref as string);
        } else {
            router.push(`/Table/${controller}`);
        }
    }

    // make bootstrap edit form here
    return <>
        <DataGridEdit addNewLabel={settings.addNewLabel} mode={DataGridEditMode.ADD} table={settings.table} item={item} setItem={setItem} fields={settings.addFields}
            handleAddItem={handleAddItem} handleCancelAdd={handleCancelAdd} />
    </>
};