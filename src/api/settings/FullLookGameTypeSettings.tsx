import { DataGridColumn, DataGridColumnType, DataGridFilterColumn, DataGridFilterColumns, DataGridPagination, DataGridSort, DataGridSortDirection, DataGridSortOption, DataGridSortOptions, DataGridTableJoin } from "@/components/grid/DataGrid";
import { DataGridColumns } from "@/components/grid/DataGridColumns";
import { DataGridEditField } from "@/components/grid/DataGridEditTypes";
import { TableGridSettings } from "@/components/grid/TableGrid";

const gridTitle: string = "Quản lý Game Type";
const gridAddNewLabel: string = "Thêm Game Type";
const gridUpdateLabel: string = "Cập nhật Game Type";
const gridDeleteSelectedsLabel: string = "Xóa các Game Type đã chọn";
const gridTable: string = "game_type";
const gridJoins: DataGridTableJoin[] = [];
const gridSearchFields: string[] = ["game_type"];
const gridFields: string[] = ["id", "game_type", "status", "gamecode", "vocabulary"];

const gridColumns: DataGridColumn[] = [
    DataGridColumns.id,
    { index: "game_type", label: "Tên Game Type" },
    { index: "gamecode", label: "Mã game" },
    DataGridColumns.status,
    {
        index: "vocabulary", type: DataGridColumnType.STATUS, label: "Từ vựng", map: {
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
];

const gridSortOptions: DataGridSortOption[] = [
    DataGridSortOptions.idAsc,
    DataGridSortOptions.idDesc,
];

const gridDefaultSorts: DataGridSort[] = [{ index: "id", direction: DataGridSortDirection.DESCENDING }];

const gridAddFields: DataGridEditField[] = [
];


export const FullLookAdminGameTypeSettings: TableGridSettings = {
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