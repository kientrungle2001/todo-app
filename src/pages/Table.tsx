import { DataGridColumn, DataGridColumnType, DataGridFilterColumn, DataGridPagination, DataGridSort, DataGridSortDirection, DataGridSortOption } from "@/components/grid/DataGrid";
import { TableGrid } from "@/components/grid/TableGrid";
import React from "react";
import { Button } from "react-bootstrap";

export default function Table(): React.ReactElement {
    
    const gridPagination: DataGridPagination = {
        currentPage: 1,
        pageSize: 10,
        totalItems: 1
    };
    
    const gridColumns: DataGridColumn[] = [
        { index: "id", label: "ID" },
        { index: "name", label: "Name" },
        { index: "email", label: "Email" },
        { index: "phone", label: "Phone" },
        { index: "address", label: "Address" },
        {
            index: "actions", label: "Actions", type: DataGridColumnType.ACTIONS, customFormat: (value: any, item: any): string | React.ReactNode => {
                return (
                    <>
                        <Button variant="primary" size="sm">Edit</Button>
                        <Button variant="danger" size="sm">Delete</Button>
                    </>
                )
            }
        }
    ];

    const gridFilters: DataGridFilterColumn[] = [
        { index: "id", label: "ID" },
        { index: "name", label: "Name" },
        { index: "email", label: "Email" },
        { index: "phone", label: "Phone" },
        { index: "address", label: "Address" }
    ];

    const gridSortOptions: DataGridSortOption[] = [
        {
            index: "nameAsc",
            label: "Name Ascending",
            sorts: [
                { index: "name", direction: DataGridSortDirection.ASCENDING }
            ]
        },
        {
            index: "nameDesc",
            label: "Name Descending",
            sorts: [
                { index: "name", direction: DataGridSortDirection.DESCENDING }
            ]
        }
    ];

    const gridDefaultSorts: DataGridSort[] = [
        { index: "id", direction: DataGridSortDirection.ASCENDING }
    ];

    return <>
        <TableGrid settings={
            {
                table: "users",
                pagination: gridPagination,
                columns: gridColumns,
                filters: gridFilters,
                sortOptions: gridSortOptions,
                defaultSorts: gridDefaultSorts
            }
        } />
    </>
}