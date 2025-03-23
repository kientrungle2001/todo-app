import React, { useEffect } from "react";
import { TableGridSettings } from "./TableGrid";
import DataGridEdit from "./DataGridEdit";
import { useRouter } from "next/router";
import { DataGridEditField, DataGridEditMode } from "./DataGridEditTypes";
import { tableRepository } from "@/api/repositories/Table";

interface TableGridProps {
    itemId: number;
    controller: string;
    settings: TableGridSettings
}

export const TableGridEdit: React.FC<TableGridProps> = ({ controller, settings, itemId }): React.ReactElement => {
    const router = useRouter();
    const [item, setItem] = React.useState<any>(null);

    useEffect(() => {
        tableRepository.getItem(settings, itemId).then((resp: any) => {
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
        console.log("Updating item:", updatedItem);
        event.preventDefault();
        console.log("Fields:", fields);
        tableRepository.updateItem(settings, itemId, fields, updatedItem).then(() => {
            setItem(updatedItem);
            if (router.query.backHref) {
                router.push(router.query.backHref as string);
            } else {
                router.push(`/Table/${controller}`);
            }
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
