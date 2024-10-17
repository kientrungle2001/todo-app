import { DataGridColumn, DataGridColumnActionType, DataGridColumnType, DataGridColumns, DataGridFilterColumn, DataGridFilterColumnType, DataGridFilterColumns, DataGridPagination, DataGridSort, DataGridSortDirection, DataGridSortOption, DataGridSortOptions, DataGridTableJoin } from "@/components/grid/DataGrid";
import { DataGridEditField, DataGridEditFieldType } from "@/components/grid/DataGridEditTypes";
import { TableGridSettings } from "@/components/grid/TableGrid";

const gridTitle: string = "Quản lý Game Topic";
const gridAddNewLabel: string = "Thêm Game Topic";
const gridUpdateLabel: string = "Cập nhật Game Topic";
const gridDeleteSelectedsLabel: string = "Xóa các Game Topic đã chọn";
const gridTable: string = "game_topic";
const gridJoins: DataGridTableJoin[] = [];
const gridSearchFields: string[] = ["game_topic"];
const gridFields: string[] = ["id", "game_topic", "status", "parent"];

const gridColumns: DataGridColumn[] = [
    DataGridColumns.id,
    { index: "game_topic", label: "Tên Game Topic", treeMode: true },
    DataGridColumns.status,
    DataGridColumns.editAction,
    DataGridColumns.deleteAction,
];

const gridPagination: DataGridPagination = { currentPage: 1, pageSize: 200 };

const gridFilters: DataGridFilterColumn[] = [
    DataGridFilterColumns.id,
    DataGridFilterColumns.status
];

const gridSortOptions: DataGridSortOption[] = [
    DataGridSortOptions.id,
    DataGridSortOptions.status
];

const gridDefaultSorts: DataGridSort[] = [{ index: "id", direction: DataGridSortDirection.DESCENDING }];

const gridAddFields: DataGridEditField[] = [
];


export const FullLookAdminGameTopicSettings: TableGridSettings = {
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