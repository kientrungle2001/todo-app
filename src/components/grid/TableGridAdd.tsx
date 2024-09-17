import React from "react";
import { TableGridSettings } from "./TableGrid";
import axios from "@/api/axiosInstance";
import DataGridEdit, { DataGridEditField, DataGridEditMode } from "./DataGridEdit";
import { useRouter } from "next/router";

interface TableGridProps {
    settings: TableGridSettings
}

export const TableGridAdd: React.FC<TableGridProps> = ({ settings }): React.ReactElement => {
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
        }).then(() => {
            setItem(updatedItem);
            router.push(`/Table/${settings.table}`);
        }).catch((error: any) => {
            console.error("Error adding item:", error);
            alert("Error adding item. Please try again later.");
        });
    }

    const handleCancelAdd = (): void => {
        router.push(`/Table/${settings.table}`);
    }

    // make bootstrap edit form here
    return <>
        <DataGridEdit addNewLabel={settings.addNewLabel} mode={DataGridEditMode.ADD} table={settings.table} item={item} setItem={setItem} fields={settings.addFields}
            handleAddItem={handleAddItem} handleCancelAdd={handleCancelAdd} />
    </>
};