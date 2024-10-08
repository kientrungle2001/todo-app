import { DataGridColumn, DataGridColumns, DataGridFilterColumn, DataGridFilterColumns, DataGridPagination, DataGridSort, DataGridSortDirection, DataGridSortOption, DataGridSortOptions, DataGridTableJoin } from "@/components/grid/DataGrid";
import { DataGridEditField } from "@/components/grid/DataGridEdit";
import { TableGridSettings } from "@/components/grid/TableGrid";

const gridTitle: string = "Quản lý Vai trò";
const gridAddNewLabel: string = "Thêm Vai trò";
const gridUpdateLabel: string = "Cập nhật Vai trò";
const gridDeleteSelectedsLabel: string = "Xóa các Vai trò đã chọn";
const gridTable: string = "admin_level";
const gridJoins: DataGridTableJoin[] = [];
const gridSearchFields: string[] = ["id", "level"];
const gridFields: string[] = ["id", "level", "status"];

const gridColumns: DataGridColumn[] = [
    DataGridColumns.id,
    {
        index: "level",
        label: "Tên Vai trò",
        width: "20%"
    },
    DataGridColumns.status,
    DataGridColumns.editAction,
    DataGridColumns.deleteAction
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


export const AdminLevelSettings: TableGridSettings = {
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