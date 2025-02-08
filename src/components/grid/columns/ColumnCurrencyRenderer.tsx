import { DataGridColumn } from "../DataGridColumnTypes";

function formatCurrency(amount: number) {
    if (typeof amount == 'undefined') {
        return '-';
    }
    return amount.toLocaleString('vi-VN') + 'đ';
}

export const ColumnCurrencyRenderer = (column: DataGridColumn, item: any, table: string) => {
    return column.customFormat ? column.customFormat(item[column.index], item, table) : formatCurrency(item[column.index]);
};
