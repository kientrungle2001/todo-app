import { DataGridColumn, DataGridColumnType, DataGridColumns, DataGridFilterColumn, DataGridFilterColumns, DataGridPagination, DataGridSort, DataGridSortDirection, DataGridSortOption, DataGridSortOptions, DataGridTableJoin } from "@/components/grid/DataGrid";
import { DataGridEditField, DataGridEditFieldType } from "@/components/grid/DataGridEditTypes";
import { TableGridSettings } from "@/components/grid/TableGrid";

const gridTitle: string = "Quản lý Đăng ký Mua thẻ";
const gridAddNewLabel: string = "Thêm đăng ký Mua thẻ";
const gridUpdateLabel: string = "Cập nhật đăng ký Mua thẻ";
const gridDeleteSelectedsLabel: string = "Xóa các đăng ký Mua thẻ đã chọn";
const gridTable: string = "order_card";
const gridJoins: DataGridTableJoin[] = [];
const gridSearchFields: string[] = ["id", "fullname", "address", "phone", "coupon"];
const gridFields: string[] = ["id", "quantity", "date", "fullname", "address", "phone", "amount", "status", "class", "note", "coupon"];

const gridColumns: DataGridColumn[] = [
    DataGridColumns.id,
    { index: "quantity", label: "Số lượng", type: DataGridColumnType.NUMBER },
    { index: "date", label: "Ngày đăng ký", type: DataGridColumnType.DATE },
    { index: "fullname", label: "Họ tên" },
    { index: "address", label: "Địa chỉ" },
    { index: "phone", label: "Số điện thoại" },
    { index: "amount", label: "Số tiền", type: DataGridColumnType.CURRENCY },
    { index: "class", label: "Lớp", type: DataGridColumnType.TEXT },
    { index: "note", label: "Ghi chú" },
    { index: "coupon", label: "Coupon" },
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


export const AdminOrderCardSettings: TableGridSettings = {
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