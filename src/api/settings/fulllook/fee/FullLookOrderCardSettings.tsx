import { DataGridSortOptions } from "@/components/grid/DataGridSortOptions";
import { DataGridPagination } from "@/types/grid/DataGridPagination";
import { DataGridSortOption } from "@/types/grid/DataGridSortOption";
import { DataGridSortDirection } from "@/types/grid/DataGridSortDirection";
import { DataGridSort } from "@/types/grid/DataGridSort";
import { DataGridFilterColumn } from "@/types/grid/DataGridFilterColumn";
import { DataGridTableJoin } from "@/types/grid/DataGridTableJoin";
import { DataGridColumnType } from "@/types/grid/DataGridColumnType";
import { DataGridColumn } from "@/types/grid/DataGridColumn";
import { DataGridColumns } from "@/components/grid/DataGridColumns";
import { DataGridEditField } from "@/types/edit/DataGridEditField";
import { DataGridEditFieldType } from "@/types/edit/DataGridEditFieldType";
import { DataGridFilterColumns } from "@/components/grid/DataGridFilterColumns";
import { TableGridSettings } from "@/types/TableGridSettings";

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


export const FullLookAdminOrderCardSettings: TableGridSettings = {
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