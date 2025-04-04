import { format } from "date-fns";
import { DataGridColumn } from "../DataGridColumnTypes";

export const ColumnDateRenderer = (column: DataGridColumn, item: any, table: string) => {
    let dateValue = new Date(item[column.index]);
    if (dateValue.toString() === 'Invalid Date' || isNaN(dateValue.getTime())) {
        return '-';
    }
    return column.customFormat ? column.customFormat(dateValue, item, table) : format(dateValue, column.format ?? 'dd/MM/yyyy');
};