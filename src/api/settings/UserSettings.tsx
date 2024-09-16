import { DataGridColumn, DataGridColumnActionType, DataGridColumnType, DataGridFilterColumn, DataGridFilterColumnType, DataGridPagination, DataGridSort, DataGridSortDirection, DataGridSortOption, DataGridTableJoin } from "@/components/grid/DataGrid";
import { DataGridEditField, DataGridEditFieldType } from "@/components/grid/DataGridEdit";
import { TableGridSettings } from "@/components/grid/TableGrid";

const gridPagination: DataGridPagination = {
    currentPage: 1,
    pageSize: 10
};

const gridColumns: DataGridColumn[] = [
    { index: "id", label: "ID", width: "1%" },
    { index: "name", label: "Name" },
    { index: "email", label: "Email" },
    { index: "phone", label: "Phone" },
    { index: "address", label: "Address" },
    {
        index: "status", type: DataGridColumnType.STATUS, label: "Status", map: {
            0: 'Not Studying',
            1: 'Studying'
        }
    },
    { index: "editAction", label: "Edit", type: DataGridColumnType.ACTIONS, actionType: DataGridColumnActionType.EDIT, width: "1%" },
    { index: "deleteAction", label: "Delete", type: DataGridColumnType.ACTIONS, actionType: DataGridColumnActionType.DELETE, width: "1%" }
];

const gridFilters: DataGridFilterColumn[] = [
    { index: "id", label: "ID", type: DataGridFilterColumnType.TEXT },
    { index: "assignId", label: "Assigner ID", type: DataGridFilterColumnType.SELECT, table: "teacher", valueField: "id", labelField: "name" },
    { index: "status", label: "Status", type: DataGridFilterColumnType.STATUS },
];

const gridSortOptions: DataGridSortOption[] = [
    {
        index: "nameAsc",
        label: "Name Ascending",
        sorts: [
            { index: "name", direction: DataGridSortDirection.ASCENDING },
            { index: "id", direction: DataGridSortDirection.DESCENDING },
        ]
    },
    {
        index: "nameDesc",
        label: "Name Descending",
        sorts: [
            { index: "name", direction: DataGridSortDirection.DESCENDING },
            { index: "id", direction: DataGridSortDirection.ASCENDING },
        ]
    }
];

const gridDefaultSorts: DataGridSort[] = [
    { index: "id", direction: DataGridSortDirection.DESCENDING }
];

const gridAddFields: DataGridEditField[] = [
    { index: "name", label: "Name", type: DataGridEditFieldType.TEXT, size: 6 },
    { index: "email", label: "Email", type: DataGridEditFieldType.TEXT, size: 6 },
    { index: "phone", label: "Phone", type: DataGridEditFieldType.TEXT, size: 6 },
    { index: "address", label: "Address", type: DataGridEditFieldType.TEXT, size: 6 },
    { index: "assignId", label: "Assigner", type: DataGridEditFieldType.SELECT, size: 6, 
        table: "teacher",
        valueField: "id",
        labelField: "name"
     },
    { index: "status", label: "Status", type: DataGridEditFieldType.STATUS, size: 6, map: {
        0: 'Not Studying',
        1: 'Studying'
    } }
];

const gridJoins: DataGridTableJoin[] = [
    { table: "teacher", alias: "tc", type: "left", condition: "t.assignId = tc.id" }
];

export const UserSettings: TableGridSettings = {
    table: "student",
    joins: gridJoins,
    fields: ["id", "name", "email", "phone", "address", "status", "tc.name as assignName"],
    pagination: gridPagination,
    columns: gridColumns,
    filters: gridFilters,
    sortOptions: gridSortOptions,
    defaultSorts: gridDefaultSorts,
    addFields: gridAddFields,
    editFields: gridAddFields
}