import { DataGridColumn, DataGridColumnActionType, DataGridColumnType, DataGridColumns, DataGridFilterColumn, DataGridFilterColumnType, DataGridFilterColumns, DataGridPagination, DataGridSort, DataGridSortDirection, DataGridSortOption, DataGridSortOptions, DataGridTableJoin } from "@/components/grid/DataGrid";
import { DataGridEditField, DataGridEditFieldType } from "@/components/grid/DataGridEditTypes";
import { TableGridSettings } from "@/components/grid/TableGrid";

const gridTitle: string = "Quản lý Thẻ cào NextNobels";
const gridAddNewLabel: string = "Thêm mới Thẻ cào NextNobels";
const gridUpdateLabel: string = "Cập nhật Thẻ cào NextNobels";
const gridDeleteSelectedsLabel: string = "Xóa các Thẻ cào NextNobels đã chọn";
const gridTable: string = "card_nextnobels";
const gridJoins: DataGridTableJoin[] = [];
const gridSearchFields: string[] = ["id", "pincard", "pincard_normal", "serial"];
const gridFields: string[] = ["id", "pincard", "pincard_normal", "price", "serial", "actived", "status", "languages", "time", "class", "promotion", "quantity", "expiredDate", "startDate", "endDate", "couponable"];

const gridColumns: DataGridColumn[] = [
    DataGridColumns.id,
    { index: "pincard", label: "Mã thẻ" },
    { index: "pincard_normal", label: "Mã thẻ thông thường" },
    { index: "price", label: "Giá", type: DataGridColumnType.CURRENCY },
    { index: "serial", label: "Số serial" },
    { index: "actived", label: "Ngày kích hoạt", type: DataGridColumnType.DATE },
    { index: "languages", label: "Ngôn ngữ" },
    { index: "time", label: "Thời gian", type: DataGridColumnType.NUMBER },
    { index: "class", label: "Lớp" },
    { index: "promotion", label: "Khuyến mãi", type: DataGridColumnType.STATUS, statusToggable: true, hideLabel: true },
    { index: "quantity", label: "Số lượng" },
    { index: "couponable", label: "Có thể áp dụng coupon", type: DataGridColumnType.STATUS, statusToggable: true, hideLabel: true },
    DataGridColumns.status,
    DataGridColumns.editAction,
    DataGridColumns.deleteAction,
];

const gridPagination: DataGridPagination = { currentPage: 1, pageSize: 50 };

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
    {
        index: "status", label: "Trạng thái", type: DataGridEditFieldType.STATUS, size: 6, map: {
            0: 'Chưa kích hoạt',
            1: 'Đã kích hoạt'
        }, statusToggable: true
    },
];


export const FullLookAdminNextNobelsCardSettings: TableGridSettings = {
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