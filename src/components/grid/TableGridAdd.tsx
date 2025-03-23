import React, { useEffect } from "react";
import { TableGridSettings } from "./TableGrid";
import DataGridEdit from "./DataGridEdit";
import { useRouter } from "next/router";
import { DataGridEditField, DataGridEditFieldType, DataGridEditMode } from "./DataGridEditTypes";
import { tableRepository } from "@/api/repositories/Table";

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
        setItem({ ...queryItem });
    }, []);

    if (!item) {
        return <>
            <h3>Loading...</h3>
        </>
    }
    
    const handleAddItem = (updatedItem: any, fields: DataGridEditField[], event: React.FormEvent<HTMLFormElement>): void => {
        event.preventDefault();
        tableRepository.createItem(settings, fields, updatedItem).then(() => {
            setItem(updatedItem);
            if (router.query.backHref) {
                router.push(router.query.backHref as string);
            } else {
                router.push(`/Table/${controller}`);
            }
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
