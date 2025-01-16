import { DataGridColumn, DataGridColumnType, DataGridFilterColumn, DataGridFilterColumns, DataGridPagination, DataGridSort, DataGridSortDirection, DataGridSortOption, DataGridSortOptions, DataGridTableJoin } from "@/components/grid/DataGridColumnTypes";
import { DataGridColumns } from "@/components/grid/DataGridColumns";
import { DataGridEditField } from "@/components/grid/DataGridEditTypes";
import { TableGridSettings } from "@/components/grid/TableGrid";

const gridTitle: string = "Quản lý Log";
const gridAddNewLabel: string = "Thêm mới log";
const gridUpdateLabel: string = "Cập nhật log";
const gridDeleteSelectedsLabel: string = "Xóa các log đã chọn";
const gridTable: string = "admin_log";
const gridJoins: DataGridTableJoin[] = [];
const gridSearchFields: string[] = ["id", "menu", "admin_controller", "actionType", "brief"];
const gridFields: string[] = ["id", "menu", "admin_controller", "actionType", "brief", "created"];

const gridColumns: DataGridColumn[] = [
    DataGridColumns.id,
    {
        index: "menu",
        label: "Menu",
        width: "20%"
    },
    {
        index: "admin_controller",
        label: "Admin URL",
        width: "20%"
    },
    {
        index: "actionType",
        label: "Action Type",
        type: DataGridColumnType.TEXT,
    },
    {
        index: "brief",
        label: "Mô tả",
        width: "40%",
        isHtml: true
    },

    DataGridColumns.editAction,
    DataGridColumns.deleteAction,
];

const gridPagination: DataGridPagination = { currentPage: 1, pageSize: 200 };

const gridFilters: DataGridFilterColumn[] = [
    DataGridFilterColumns.id,
    DataGridFilterColumns.status
];

const gridSortOptions: DataGridSortOption[] = [
    DataGridSortOptions.idAsc,
    DataGridSortOptions.idDesc,
];

const gridDefaultSorts: DataGridSort[] = [{ index: "id", direction: DataGridSortDirection.DESCENDING }];

const gridAddFields: DataGridEditField[] = [
];


export const FullLookAdminLogSettings: TableGridSettings = {
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
}