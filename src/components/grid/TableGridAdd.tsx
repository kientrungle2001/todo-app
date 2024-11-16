import React, { useEffect } from "react";
import { TableGridSettings } from "./TableGrid";
import axios from "@/api/axiosInstance";
import DataGridEdit from "./DataGridEdit";
import { useRouter } from "next/router";
import { storage } from "@/api/storage";
import { DataGridEditField, DataGridEditFieldType, DataGridEditMode } from "./DataGridEditTypes";

interface TableGridProps {
    controller: string;
    settings: TableGridSettings
}

export const TableGridAdd: React.FC<TableGridProps> = ({ controller, settings }): React.ReactElement => {
    const router = useRouter();


    const [item, setItem] = React.useState<any>({});

    useEffect(() => {
        const queryItem: any = {};
        settings.addFields.forEach((field: DataGridEditField) => {
            if (typeof router.query['field_' + field.index] !== 'undefined') {
                if (field.type === DataGridEditFieldType.STATUS) {
                    queryItem[field.index] = parseInt(router.query['field_' + field.index] as string);
                } else {
                    queryItem[field.index] = router.query['field_' + field.index];
                }
                
            }
        });
        setItem({...queryItem});
        console.log('queryItem', queryItem);
    }, []);

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