import { DataGridColumn, DataGridColumnType, DataGridColumns, DataGridFilterColumn, DataGridFilterColumns, DataGridPagination, DataGridSort, DataGridSortDirection, DataGridSortOption, DataGridSortOptions, DataGridTableJoin } from "@/components/grid/DataGrid";
import { DataGridEditField, DataGridEditFieldType } from "@/components/grid/DataGridEditTypes";
import { TableGridSettings } from "@/components/grid/TableGrid";

const gridTitle: string = "Quản lý Thẻ cào điện thoại";
const gridAddNewLabel: string = "Thêm mới Thẻ cào điện thoại";
const gridUpdateLabel: string = "Cập nhật Thẻ cào điện thoại";
const gridDeleteSelectedsLabel: string = "Xóa các Thẻ cào điện thoại đã chọn";
const gridTable: string = "cardmobile";
const gridJoins: DataGridTableJoin[] = [];
const gridSearchFields: string[] = ["id", "username", "typecard", "pincard", "serialcard"];
const gridFields: string[] = ["id", "username", "typecard", "pincard", "serialcard", "cardAmount", "amount", "date", "status"];

const gridColumns: DataGridColumn[] = [
    DataGridColumns.id,
    {index: "username", label: "Tên người dùng"},
    {index: "typecard", label: "Loại thẻ" },
    {index: "pincard", label: "Mã thẻ" },
    {index: "serialcard", label: "Số serial" },
    { index: "cardAmount", label: "Số dư thẻ", type: DataGridColumnType.CURRENCY },
    { index: "amount", label: "Số dư", type: DataGridColumnType.CURRENCY },
    { index: "date", label: "Ngày phát hành", type: DataGridColumnType.DATE },
    DataGridColumns.status,
    DataGridColumns.editAction,
    DataGridColumns.deleteAction,
];

const gridPagination: DataGridPagination = {currentPage: 1,pageSize: 50};

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
    {
        index: "status", label: "Trạng thái", type: DataGridEditFieldType.STATUS, size: 6, map: {
            0: 'Chưa kích hoạt',
            1: 'Đã kích hoạt'
        }, statusToggable: true
    },
];


export const FullLookAdminMobileCardSettings: TableGridSettings = {
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