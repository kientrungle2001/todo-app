import React, { useState, useEffect } from "react";
import { TableGridSettings as Settings } from "@/types/TableGridSettings";
import DataGridEdit from "./DataGridEdit";
import { useRouter } from "next/router";
import { DataGridEditField as Field } from "@/types/edit/DataGridEditField";
import { DataGridEditMode as Mode } from "@/types/edit/DataGridEditMode";
import { DataGridEditFieldType as FieldType } from "@/types/edit/DataGridEditFieldType";
import { tableRepository } from "@/api/repositories/Table";

interface TableGridProps {
    controller: string;
    settings: Settings
}

export const TableGridAdd: React.FC<TableGridProps> = ({ controller, settings }): React.ReactElement => {
    const router = useRouter();
    const query = router.query;
    const [item, setItem] = useState<any>({});

    useEffect(() => {
        const queryItem: any = {};
        settings.addFields.forEach((field: Field) => {
            if (typeof query['field_' + field.index] !== 'undefined')
                queryItem[field.index] = field.type === FieldType.STATUS ?
                    parseInt(query['field_' + field.index] as string) :
                    query['field_' + field.index];
        });
        setItem({ ...queryItem });
    }, []);

    if (!item) return <h3>Loading...</h3>;

    const handleAddItem = (updatedItem: any, fields: Field[], event: React.FormEvent<HTMLFormElement>): void => {
        event.preventDefault();
        tableRepository.createItem(settings, fields, updatedItem).then(() => {
            setItem(updatedItem);
            if (query.backHref) {
                window.location.href = (query.backHref as string);
            } else {
                window.location.href = (`/Table/${controller}`);
            }
        });
    }

    const handleCancelAdd = (): void => {
        if (query.backHref)
            window.location.href = (query.backHref as string);
        else
            window.location.href = (`/Table/${controller}`);
    }

    // make bootstrap edit form here
    return <DataGridEdit
        mode={Mode.ADD}
        addNewLabel={settings.addNewLabel}
        table={settings.table}
        fields={settings.addFields}
        item={item} setItem={setItem}
        handleAddItem={handleAddItem}
        handleCancelAdd={handleCancelAdd} />
};
