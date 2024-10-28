import { DataGridColumn, DataGridColumnType, DataGridFilterColumn, DataGridFilterColumnType, DataGridFilterColumns, DataGridPagination, DataGridSort, DataGridSortDirection, DataGridSortOption, DataGridTableJoin } from "@/components/grid/DataGrid";
import { DataGridColumns } from "@/components/grid/DataGridColumns";
import { DataGridEditField, DataGridEditFieldType } from "@/components/grid/DataGridEditTypes";
import { TableGridSettings } from "@/components/grid/TableGrid";

const gridTitle: string = "Quản lý Menu";
const gridAddNewLabel: string = "Thêm Menu";
const gridUpdateLabel: string = "Cập nhật Menu";
const gridDeleteSelectedsLabel: string = "Xóa các Menu đã chọn";
const gridTable: string = "admin_menu";
const gridJoins: DataGridTableJoin[] = [];
const gridSearchFields: string[] = ["id", "name", "admin_controller"];
const gridFields: string[] = ["id", "name", "admin_controller", "ordering", "status", "shortcut", "parent", "thumbnail"];

const gridColumns: DataGridColumn[] = [
    DataGridColumns.id,
    { index: "name", label: "Tên Menu", linkFormat: (value: any, item: any) => `/Table/admin_menu/${item.id}/edit`, treeMode: true },
    { index: "admin_controller", label: "Đường dẫn URL" },
    { index: "ordering", label: "Thứ tự", type: DataGridColumnType.NUMBER, inputable: true, treeMode: true },
    DataGridColumns.status,
    {
        index: "shortcut", type: DataGridColumnType.STATUS, label: "Dashboard", map: {
            0: 'Chưa kích hoạt',
            1: 'Đã kích hoạt'
        },
        statusToggable: true
    },
    DataGridColumns.editAction,
    DataGridColumns.deleteAction,
];

const gridPagination: DataGridPagination = { currentPage: 1, pageSize: 200 };

const gridFilters: DataGridFilterColumn[] = [
    DataGridFilterColumns.id,
    DataGridFilterColumns.status,
    {
        index: "shortcut", label: "Dashboard", type: DataGridFilterColumnType.STATUS, map: {
            0: 'Chưa kích hoạt',
            1: 'Đã kích hoạt'
        },
        comparisonOperator: "equal"
    },
];

const gridSortOptions: DataGridSortOption[] = [
    {
        index: "nameAsc",
        label: "Tên Menu tăng",
        sorts: [
            { index: "name", direction: DataGridSortDirection.ASCENDING },
            { index: "id", direction: DataGridSortDirection.DESCENDING },
        ]
    },
    {
        index: "nameDesc",
        label: "Tên Menu giảm",
        sorts: [
            { index: "name", direction: DataGridSortDirection.DESCENDING },
            { index: "id", direction: DataGridSortDirection.ASCENDING },
        ]
    }
];

const gridDefaultSorts: DataGridSort[] = [{ index: "ordering", direction: DataGridSortDirection.ASCENDING }];

const gridAddFields: DataGridEditField[] = [
    { index: "name", label: "Tên Menu", type: DataGridEditFieldType.TEXT, size: 6 },
    {
        index: "parent", label: "Menu cha", type: DataGridEditFieldType.SELECT, size: 6,
        table: "admin_menu", valueField: "id", labelField: "name", treeMode: true, parentField: "parent", orderBy: "ordering asc"
    },
    { index: "admin_controller", label: "Đường dẫn URL", type: DataGridEditFieldType.TEXT, size: 6 },
    {
        index: "status", label: "Trạng thái", type: DataGridEditFieldType.STATUS, size: 6, map: {
            0: 'Chưa kích hoạt',
            1: 'Đã kích hoạt'
        }, statusToggable: true
    },
];


export const FullLookAdminMenuSettings: TableGridSettings = {
    title: gridTitle,
    table: gridTable,
    joins: gridJoins,
    fields: gridFields,
    searchFields: gridSearchFields,
    pagination: gridPagination,
    columns: gridColumns,
    filters: gridFilters,
    sortOptions: gridSortOptions,
    defaultSorts: gridDefaultSorts,
    addFields: gridAddFields,
    editFields: gridAddFields,
    addNewLabel: gridAddNewLabel,
    deleteSelectedsLabel: gridDeleteSelectedsLabel,
    updateLabel: gridUpdateLabel,
    treeMode: true,
}