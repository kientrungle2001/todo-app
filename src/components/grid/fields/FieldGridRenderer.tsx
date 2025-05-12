import { DataGridEditField } from "../DataGridEditTypes";
import { GridSelector } from "./grid/GridSelector";

export const FieldGridRenderer = (field: DataGridEditField, item: any, setItem: (item: any) => void) => {
    return (
        field.gridSettings ?
            <GridSelector
                item={item}
                field={field}
                settings={field.gridSettings}
                value={item[field.index]}
                setValue={(value: any) => {
                    let updatedItem: any = { ...item };
                    updatedItem[field.index] = value;
                    setItem(updatedItem);
                }}
            /> : null
    );
};