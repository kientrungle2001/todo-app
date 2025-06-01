import { Button } from "react-bootstrap";
import { DataGridColumnActionType as ColumnActionType } from "@/types/grid/DataGridColumnActionType";
import { DataGridColumn as Column } from "@/types/grid/DataGridColumn";
import React from "react";
import Link from "next/link";

export const ColumnActionsRenderer = (column: Column, item: any, table: string,
    inputableMap: any,
    setInputableMap: (inputableMap: any) => void,
    onAfterChangeStatus: (column: Column, item: any) => void,
    handleEditItem: (item: any) => void,
    onDeleteItem: (item: any) => void,
    handleAddChildItem: (item: any, column: Column) => void,
) => {
    if (column.customFormat) {
        return column.customFormat ? column.customFormat(null, item, table) : '-';
    } else {
        if (column.actionType === ColumnActionType.EDIT) {
            return <Button variant="primary" size="sm" onClick={() => handleEditItem(item)}>
                {column.label}
            </Button>
        } else if (column.actionType === ColumnActionType.DELETE) {
            return <Button variant="danger" size="sm" onClick={() => onDeleteItem(item)}>
                {column.label}
            </Button>
        } else if (column.actionType === ColumnActionType.ADD_CHILD) {
            return <Button variant="secondary" size="sm" onClick={() => handleAddChildItem(item, column)}>
                {column.label}
            </Button>
        } else if (column.actionType === ColumnActionType.CUSTOM_LINK) {
            let link = '#';
            if (column.actionLinkFormat) {
                link = column.actionLinkFormat(item, column, table) as string;
            }
            return <Link href={link}>{column.label}</Link>
        }
    }
}