import { DataGridColumn, DataGridColumnActionType, DataGridColumns, DataGridColumnType, DataGridFilterColumn, DataGridFilterColumns, DataGridFilterColumnType, DataGridPagination, DataGridSort, DataGridSortDirection, DataGridSortOption, DataGridSortOptions, DataGridTableJoin } from "@/components/grid/DataGrid";
import { DataGridEditField, DataGridEditFieldType } from "@/components/grid/DataGridEditTypes";
import { TableGridSettings } from "@/components/grid/TableGrid";

const gridTitle: string = "Quản lý Phản hồi";
const gridTable: string = "vote";
const gridAddNewLabel: string = "Thêm mới";
const gridUpdateLabel: string = "Cập nhật Phản hồi";
const gridDeleteSelectedsLabel: string = "Xóa các Phản hồi đã chọn";
const gridJoins: DataGridTableJoin[] = [];
const gridSearchFields: string[] = ["id", "content", "username"];
const gridFields: string[] = ["id", "content", "username", "created", "status"];

const gridColumns: DataGridColumn[] = [
    DataGridColumns.id,
    { index: "content", label: "Nội dung" },
    { index: "username", label: "Tên đăng nhập" },
    { index: "created", label: "Ngày tạo", type: DataGridColumnType.DATE },
    DataGridColumns.status,
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


export const AdminVoteSettings: TableGridSettings = {
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