import React, { useEffect } from "react";
import { TableGridSettings } from "./TableGrid";
import axios from "@/api/axiosInstance";
import DataGridEdit from "./DataGridEdit";
import { useRouter } from "next/router";
import { storage } from "@/api/storage";
import { DataGridEditField, DataGridEditMode } from "./DataGridEditTypes";
import QuestionAnswerGridEdit from "./QuestionAnswerGridEdit";

interface TableGridProps {
    itemId: number;
    controller: string;
    settings: TableGridSettings
}

export const TableGridDetail: React.FC<TableGridProps> = ({ controller, settings, itemId }): React.ReactElement => {
    const router = useRouter();
    const [item, setItem] = React.useState<any>(null);

    useEffect(() => {
        axios.post(`/tables/${settings.table}/detail/${itemId}`, {
            settings
        }, {
            headers: {
                'Authorization': `Bearer ${storage.get('token') || ''}`
            }
        }).then((resp: any) => {
            setItem(resp.data);
            console.log("Fetched item:", resp.data);
        }).catch((error) => {
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
        axios.put(`/tables/${settings.table}/update/${itemId}`, {
            item: updatedItem,
            settings: JSON.parse(JSON.stringify(settings)),
            fields: JSON.parse(JSON.stringify(fields))
        }, {
            headers: {
                'Authorization': `Bearer ${storage.get('token') || ''}`
            }
        }).then(() => {
            setItem(updatedItem);
            router.push(`/Table/${controller}`);
        }).catch((error) => {
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
        router.push(`/Table/${controller}`);
    }

    // make bootstrap edit form here
    if (controller === 'admin_question2') {
        return <>
            <QuestionAnswerGridEdit updateLabel={settings.updateLabel} mode={DataGridEditMode.EDIT} itemId={itemId} table={settings.table} item={item} setItem={setItem} fields={settings.editFields ?? settings.addFields}
            handleUpdateItem={handleUpdateItem} handleCancelEdit={handleCancelEdit} />
        </>
    }
    return <>
        <DataGridEdit updateLabel={settings.updateLabel} mode={DataGridEditMode.EDIT} itemId={itemId} table={settings.table} item={item} setItem={setItem} fields={settings.editFields ?? settings.addFields}
            handleUpdateItem={handleUpdateItem} handleCancelEdit={handleCancelEdit} />
    </>
};