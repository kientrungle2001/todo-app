import { DataGridColumn as Column } from "@/types/grid/DataGridColumn";
import React from "react";
import { renderColumn } from "./renderColumn";

export const ColumnGroupRenderer = (column: Column, item: any, table: string, inputableMap: any, setInputableMap: (inputableMap: any) => void, onAfterChangeStatus: (column: Column, item: any) => void,
    handleEditItem: (item: any) => void,
    onDeleteItem: (item: any) => void,
    handleAddChildItem: (item: any, column: Column) => void,) => {
    return column.groupChildren?.map((childColumn: Column, index) => {
        return <React.Fragment key={index}>
            {index > 0 && <br />} <strong>{childColumn.label}: </strong> {renderColumn(childColumn, item, table, inputableMap, setInputableMap, onAfterChangeStatus, handleEditItem, onDeleteItem, handleAddChildItem)}
        </React.Fragment>
    });
}