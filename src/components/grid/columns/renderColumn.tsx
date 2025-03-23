import Link from "next/link";
import {
    DataGridColumn as Column,
    DataGridColumnType as ColumnType
} from "../DataGridColumnTypes";
import { ColumnTextRenderer } from "./ColumnTextRenderer";
import { ColumnNumberRenderer } from "./ColumnNumberRenderer";
import { ColumnImageRenderer } from "./ColumnImageRenderer";
import { ColumnCurrencyRenderer } from "./ColumnCurrencyRenderer";
import { ColumnDateRenderer } from "./ColumnDateRenderer";
import { ColumnReferenceRenderer } from "./ColumnReferenceRenderer";
import { ColumnGroupRenderer } from "./ColumnGroupRenderer";
import { ColumnStatusRenderer } from "./ColumnStatusRenderer";
import { ColumnUndefinedRenderer } from "./ColumnUndefinedRenderer";
import { ColumnActionsRenderer } from "./ColumnActionsRenderer";

export const renderColumn = (column: Column, item: any, table: string,
    inputableMap: any, setInputableMap: (inputableMap: any) => void,
    onAfterChangeStatus: (column: Column, item: any) => void,
    handleEditItem: (item: any) => void,
    onDeleteItem: (item: any) => void,
    handleAddChildItem: (item: any, column: Column) => void,
) => {
    const columnRenderer = getColumnRenderer(column.type ?? ColumnType.TEXT);
    if (column.linkFormat) {
        return <Link style={{ textDecoration: "none" }} href={column.linkFormat(item[column.index], item)}>{columnRenderer(column, item, table, inputableMap, setInputableMap, onAfterChangeStatus, handleEditItem, onDeleteItem, handleAddChildItem)}</Link>;
    }
    return columnRenderer(column, item, table, inputableMap, setInputableMap, onAfterChangeStatus, handleEditItem, onDeleteItem, handleAddChildItem);
};

export const getColumnRenderer = (columnType: ColumnType) => {
    switch (columnType) {
        case ColumnType.TEXT:
            return ColumnTextRenderer;
        case ColumnType.NUMBER:
            return ColumnNumberRenderer;
        case ColumnType.IMAGE:
            return ColumnImageRenderer;
        case ColumnType.CURRENCY:
            return ColumnCurrencyRenderer;
        case ColumnType.DATE:
            return ColumnDateRenderer;
        case ColumnType.REFERENCE:
            return ColumnReferenceRenderer;
        case ColumnType.GROUP:
            return ColumnGroupRenderer;
        case ColumnType.STATUS:
            return ColumnStatusRenderer;
        case ColumnType.ACTIONS:
            return ColumnActionsRenderer;
        default:
            return ColumnUndefinedRenderer;
    }
};