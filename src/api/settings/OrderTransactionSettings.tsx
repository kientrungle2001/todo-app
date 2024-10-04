/**
 *
 * -- nextnobels.order_transaction definition

CREATE TABLE `order_transaction` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `orderId` int(11) NOT NULL,
  `userId` int(11) NOT NULL,
  `paymentType` varchar(255) NOT NULL,
  `amount` decimal(10,0) NOT NULL,
  `paymentDate` datetime NOT NULL,
  `transactionId` varchar(255) NOT NULL,
  `paymentOption` varchar(255) NOT NULL,
  `transactionStatus` varchar(255) NOT NULL,
  `creatorId` int(11) NOT NULL,
  `created` datetime NOT NULL,
  `modifiedId` int(11) NOT NULL,
  `modified` datetime NOT NULL,
  `reason` varchar(255) NOT NULL,
  `service` varchar(255) NOT NULL,
  `userbookId` int(11) NOT NULL,
  `status` int(11) NOT NULL,
  `username` varchar(255) NOT NULL,
  `cardType` varchar(255) NOT NULL,
  `cardAmount` int(11) NOT NULL,
  `software` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1980 DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;
 */
import { DataGridColumn, DataGridColumnActionType, DataGridColumnType, DataGridFilterColumn, DataGridFilterColumnType, DataGridPagination, DataGridSort, DataGridSortDirection, DataGridSortOption, DataGridTableJoin } from "@/components/grid/DataGrid";
import { DataGridEditField, DataGridEditFieldType } from "@/components/grid/DataGridEdit";
import { TableGridSettings } from "@/components/grid/TableGrid";

const gridTitle: string = "Quản lý Giao dịch";
const gridTable: string = "order_transaction";
const gridJoins: DataGridTableJoin[] = [];
const gridSearchFields: string[] = ["id", "paymentType", "paymentOption", "reason",];
const gridFields: string[] = ["id", "orderId", "userId", "paymentType", "amount", "paymentDate", "transactionId", "paymentOption", "transactionStatus", "creatorId", "created", "modifiedId", "modified", "reason", "service", "userbookId", "status", "username", "cardType", "cardAmount", "software"];

const gridColumns: DataGridColumn[] = [
    { index: "id", label: "ID", width: "1%" },
    {
        index: "paymentType", label: "Loại thanh toán",
        map: {
            "paycard": 'Nạp tiền',
            "wallets": "Sử dụng ví"
        }
    },
    {
        index: "amount", label: "Số tiền", type: DataGridColumnType.CURRENCY
    },
    {
        index: "paymentDate", label: "Ngày thanh toán", type: DataGridColumnType.DATE
    },
    {
        index: "transactionStatus", label: "Trạng thái giao dịch",
        map: {
            0: 'Chưa kích hoạt',
            1: 'Đã kích hoạt'
        }
    },
    {
        index: "username", label: "Tên người dùng"
    },
    {
        index: "cardType", label: "Loại thẻ"
    },
    {
        index: "cardAmount", label: "Số tiền trả thẻ"
    },
    {
        index: "status", type: DataGridColumnType.STATUS, label: "Trạng thái", map: {
            0: 'Chưa kích hoạt',
            1: 'Đã kích hoạt'
        },
        hideLabel: true,
        statusToggable: true
    },
    { index: "editAction", label: "Sửa", type: DataGridColumnType.ACTIONS, actionType: DataGridColumnActionType.EDIT, width: "1%" },
    { index: "deleteAction", label: "Xóa", type: DataGridColumnType.ACTIONS, actionType: DataGridColumnActionType.DELETE, width: "1%" }
];

const gridPagination: DataGridPagination = {
    currentPage: 1,
    pageSize: 50
};

const gridFilters: DataGridFilterColumn[] = [
    { index: "id", label: "ID", type: DataGridFilterColumnType.TEXT },
    {
        index: "status", label: "Trạng thái", type: DataGridFilterColumnType.STATUS, map: {
            0: 'Chưa kích hoạt',
            1: 'Đã kích hoạt'
        },
        comparisonOperator: "equal"
    },
];

const gridSortOptions: DataGridSortOption[] = [
    {
        index: "idAsc",
        label: "ID tăng",
        sorts: [
            { index: "id", direction: DataGridSortDirection.DESCENDING },
        ]
    },
    {
        index: "idDesc",
        label: "ID giảm",
        sorts: [
            { index: "id", direction: DataGridSortDirection.ASCENDING },
        ]
    }
];

const gridDefaultSorts: DataGridSort[] = [
    { index: "id", direction: DataGridSortDirection.DESCENDING }
];

const gridAddFields: DataGridEditField[] = [
    {
        index: "status", label: "Trạng thái", type: DataGridEditFieldType.STATUS, size: 6, map: {
            0: 'Chưa kích hoạt',
            1: 'Đã kích hoạt'
        }, statusToggable: true
    },
];


export const AdminOrderTransactionSettings: TableGridSettings = {
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
    addNewLabel: "Thêm mới",
    deleteSelectedsLabel: "Xóa Giao dịch đã chọn",
    updateLabel: "Cập nhật Giao dịch",
}