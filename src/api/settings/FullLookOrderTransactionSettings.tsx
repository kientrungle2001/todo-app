import { DataGridColumn, DataGridColumnType, DataGridColumns, DataGridFilterColumn, DataGridFilterColumns, DataGridPagination, DataGridSort, DataGridSortDirection, DataGridSortOption, DataGridSortOptions, DataGridTableJoin } from "@/components/grid/DataGrid";
import { DataGridEditField, DataGridEditFieldType } from "@/components/grid/DataGridEditTypes";
import { TableGridSettings } from "@/components/grid/TableGrid";

const gridTitle: string = "Quản lý Giao dịch";
const gridAddNewLabel: string = "Thêm mới Giao dịch";
const gridUpdateLabel: string = "Cập nhật Giao dịch";
const gridDeleteSelectedsLabel: string = "Xóa các Giao dịch đã chọn";
const gridTable: string = "order_transaction";
const gridJoins: DataGridTableJoin[] = [];
const gridSearchFields: string[] = ["id", "paymentType", "paymentOption", "reason",];
const gridFields: string[] = ["id", "orderId", "userId", "paymentType", "amount", "paymentDate", "transactionId", "paymentOption", "transactionStatus", "creatorId", "created", "modifiedId", "modified", "reason", "service", "userbookId", "status", "username", "cardType", "cardAmount", "software"];

const gridColumns: DataGridColumn[] = [
    DataGridColumns.id,
    {
        index: "paymentType", label: "Loại thanh toán",
        map: {
            "paycard": 'Nạp tiền',
            "wallets": "Sử dụng ví"
        }
    },
    { index: "amount", label: "Số tiền", type: DataGridColumnType.CURRENCY },
    { index: "paymentDate", label: "Ngày thanh toán", type: DataGridColumnType.DATE },
    {
        index: "transactionStatus", label: "Trạng thái giao dịch",
        map: {
            0: 'Chưa kích hoạt',
            1: 'Đã kích hoạt'
        }
    },
    { index: "username", label: "Tên người dùng" },
    { index: "cardType", label: "Loại thẻ" },
    { index: "cardAmount", label: "Số tiền trả thẻ" },
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


export const FullLookAdminOrderTransactionSettings: TableGridSettings = {
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