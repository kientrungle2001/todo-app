import React, { useEffect } from "react";
import { TableGridSettings } from "./TableGrid";
import axios from "@/api/axiosInstance";
import DataGridEdit, { DataGridEditField, DataGridEditMode } from "./DataGridEdit";
import { useRouter } from "next/router";

interface TableGridProps {
    itemId: number;
    settings: TableGridSettings
}

export const TableGridEdit: React.FC<TableGridProps> = ({ settings, itemId }): React.ReactElement => {
    const router = useRouter();
    const [item, setItem] = React.useState<any>(null);

    useEffect(() => {
        axios.post(`/tables/${settings.table}/detail/${itemId}`, {
            settings
        }).then((resp: any) => {
            setItem(resp.data);
            console.log("Fetched item:", resp.data);
        });
    }, [itemId]);

    if (!item) {
        return <>
            <h3>Loading...</h3>
        </>
    }



    const handleUpdateItem = (updatedItem: any, fields: DataGridEditField[], event: React.FormEvent<HTMLFormElement>): void => {
        event.preventDefault();
        axios.put(`/tables/${settings.table}/update/${itemId}`, {
            item: updatedItem,
            settings: JSON.parse(JSON.stringify(settings)),
            fields: JSON.parse(JSON.stringify(fields))
        }).then(() => {
            setItem(updatedItem);
            router.push(`/Table/${settings.table}`);
        }).catch((error: any) => {
            console.error("Error updating item:", error);
            alert("Error updating item. Please try again later.");
        });
    }

    const handleCancelEdit = (): void => {
        router.push(`/Table/${settings.table}`);
    }

    // make bootstrap edit form here
    return <>
        <DataGridEdit mode={DataGridEditMode.EDIT} itemId={itemId} table={settings.table} item={item} setItem={setItem} fields={settings.editFields ?? settings.addFields}
            handleUpdateItem={handleUpdateItem} handleCancelEdit={handleCancelEdit} />
    </>
};