import { DataGridColumn, DataGridColumnType, DataGridFilterColumn, DataGridPagination, DataGridSort, DataGridSortDirection, DataGridSortOption, DataGridSortOptions, DataGridTableJoin } from "@/components/grid/DataGridColumnTypes";
import { DataGridColumns } from "@/components/grid/DataGridColumns";
import { DataGridEditField } from "@/components/grid/DataGridEditTypes";
import { DataGridFilterColumns } from "@/components/grid/DataGridFilterColumns";
import { TableGridSettings } from "@/components/grid/TableGrid";

const gridTitle: string = "Quản lý Coupon";
const gridAddNewLabel: string = "Thêm Coupon";
const gridUpdateLabel: string = "Cập nhật Coupon";
const gridDeleteSelectedsLabel: string = "Xóa các Coupon đã chọn";
const gridTable: string = "coupon";
const gridJoins: DataGridTableJoin[] = [];
const gridSearchFields: string[] = ["id", "code"];
const gridFields: string[] = ["id", "code", "discount", "resellerDiscount", "startDate", "endDate", "status"];

const gridColumns: DataGridColumn[] = [
    DataGridColumns.id,
    { index: "code", label: "Coupon Code" },
    { index: "discount", label: "Giảm giá", type: DataGridColumnType.NUMBER },
    { index: "resellerDiscount", label: "Giảm giá cho Reseller", type: DataGridColumnType.NUMBER },
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

const gridAddFields: DataGridEditField[] = [];


export const FullLookAdminCouponSettings: TableGridSettings = {
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
    updateLabel: gridUpdateLabel
}