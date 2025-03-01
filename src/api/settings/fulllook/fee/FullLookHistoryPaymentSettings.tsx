import { DataGridColumn, DataGridColumnType, DataGridFilterColumn, DataGridPagination, DataGridSort, DataGridSortDirection, DataGridSortOption, DataGridTableJoin } from "@/components/grid/DataGridColumnTypes";
import { DataGridColumns } from "@/components/grid/DataGridColumns";
import { DataGridEditField, DataGridEditFieldType } from "@/components/grid/DataGridEditTypes";
import { DataGridFilterColumns } from "@/components/grid/DataGridFilterColumns";
import { TableGridSettings } from "@/components/grid/TableGrid";

const gridTitle: string = "Lịch sử thanh toán";
const gridAddNewLabel: string = "Thêm lịch sử thanh toán";
const gridUpdateLabel: string = "Cập nhật lịch sử thanh toán";
const gridDeleteSelectedsLabel: string = "Xóa các lịch sử thanh toán đã chọn";
const gridTable: string = "history_payment";
const gridJoins: DataGridTableJoin[] = [{
    table: "user", alias: "u", type: "left", condition: "u.username = t.username"
}, {
    table: "service_packages", alias: "sp", type: "left", condition: "t.serviceId = sp.id"
}];
const gridSearchFields: string[] = ["id", "username", "bank", "u.name", "u.email", "u.phone", "u.address", "sp.serviceName"];
const gridFields: string[] = ["id", "username", "u.name as name", "u.phone as phone", "sp.serviceName as serviceName", "amount", "paymentType", "bank", "paymentDate", "expiredDate", "status", "paymentStatus"];

const gridColumns: DataGridColumn[] = [
    DataGridColumns.id,
    { index: "username", label: "Tên đăng nhập" },
    { index: "name", label: "Họ và tên", linkFormat: (value: any, item: any) => `/Table/history_payment/${item.id}/edit` },
    { index: "phone", label: "Phone" },
    { index: "amount", label: "Số tiền", type: DataGridColumnType.CURRENCY },
    { index: "serviceName", label: "Dịch vụ" },
    {
        index: "paymentType",
        type: DataGridColumnType.TEXT,
        label: "Loại thanh toán",
        map: {
            "bank": 'Chuyển khoản',
            "money": 'Tiền mặt',
            "wallets": 'Ví điện tử',
            "nganluong": 'Ngân lượng'
        }
    },
    { index: "bank", label: "Ngân hàng" },
    {
        index: "paymentDate", type: DataGridColumnType.DATE, label: "Ngày thanh toán", format: "dd/MM/yyyy"
    },
    {
        index: "expiredDate", type: DataGridColumnType.DATE, label: "Ngày hết hạn", format: "dd/MM/yyyy"
    },
    DataGridColumns.status,
    {
        index: "paymentStatus", type: DataGridColumnType.STATUS, label: "Trạng thái thanh toán", map: {
            0: 'Chưa kích hoạt',
            1: 'Đã kích hoạt'
        },
        statusToggable: true
    },

    DataGridColumns.editAction,
    DataGridColumns.deleteAction,
];

const gridPagination: DataGridPagination = { currentPage: 1, pageSize: 20 };

const gridFilters: DataGridFilterColumn[] = [
    DataGridFilterColumns.id,
    DataGridFilterColumns.status,
];

const gridSortOptions: DataGridSortOption[] = [
    {
        index: "nameAsc",
        label: "Họ và tên tăng",
        sorts: [
            { index: "u.name", direction: DataGridSortDirection.ASCENDING },
            { index: "id", direction: DataGridSortDirection.DESCENDING },
        ]
    },
    {
        index: "nameDesc",
        label: "Họ và tên giảm",
        sorts: [
            { index: "u.name", direction: DataGridSortDirection.DESCENDING },
            { index: "id", direction: DataGridSortDirection.ASCENDING },
        ]
    }
];

const gridDefaultSorts: DataGridSort[] = [{ index: "id", direction: DataGridSortDirection.DESCENDING }];

const gridAddFields: DataGridEditField[] = [
    { index: "username", label: "Tên đăng nhập", type: DataGridEditFieldType.TEXT, size: 6 },
    {
        index: "serviceId", label: "Dịch vụ", type: DataGridEditFieldType.SELECT, size: 6,
        table: "service_packages", valueField: "id", labelField: "serviceName"
    },
    { index: "amount", label: "Số tiền", type: DataGridEditFieldType.TEXT, size: 6 },
    {
        index: "paymentType", label: "Loại hình thanh toán", type: DataGridEditFieldType.SELECT,
        options: [
            { value: 'bank', label: 'Chuyển khoản' },
            { value: 'money', label: 'Tiền mặt' },
            { value: 'wallets', label: 'Ví điện tử' },
            { value: 'nganluong', label: 'Ngân lượng' }
        ],
        size: 6
    },
    { index: "bank", label: "Ngân hàng", type: DataGridEditFieldType.TEXT, size: 6 },
    {
        index: "status", label: "Trạng thái", type: DataGridEditFieldType.STATUS, size: 6, map: {
            0: 'Chưa kích hoạt',
            1: 'Đã kích hoạt'
        }, statusToggable: true
    },
    {
        index: "paymentStatus", label: "Trạng thái thanh toán", type: DataGridEditFieldType.STATUS, size: 6, map: {
            0: 'Chưa kích hoạt',
            1: 'Đã kích hoạt'
        }, statusToggable: true
    }
];


export const FullLookAdminHistoryPaymentSettings: TableGridSettings = {
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