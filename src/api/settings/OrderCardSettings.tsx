/**
 *
 * -- nextnobels.order_card definition

CREATE TABLE `order_card` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `cardId` int(11) NOT NULL,
  `quantity` int(11) NOT NULL,
  `date` datetime NOT NULL,
  `fullname` varchar(255) NOT NULL,
  `address` varchar(255) NOT NULL,
  `phone` varchar(255) NOT NULL,
  `amount` double NOT NULL,
  `status` tinyint(4) NOT NULL,
  `software` tinyint(4) NOT NULL DEFAULT 1,
  `site` tinyint(4) NOT NULL DEFAULT 1,
  `class` tinyint(4) NOT NULL,
  `note` text NOT NULL,
  `coupon` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3084 DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;
 */
import { DataGridColumn, DataGridColumnActionType, DataGridColumnType, DataGridFilterColumn, DataGridFilterColumnType, DataGridPagination, DataGridSort, DataGridSortDirection, DataGridSortOption, DataGridTableJoin } from "@/components/grid/DataGrid";
import { DataGridEditField, DataGridEditFieldType } from "@/components/grid/DataGridEdit";
import { TableGridSettings } from "@/components/grid/TableGrid";

const gridTitle: string = "Quản lý Đăng ký Mua thẻ";
const gridTable: string = "order_card";
const gridJoins: DataGridTableJoin[] = [];
const gridSearchFields: string[] = ["id", "fullname", "address", "phone", "coupon"];
const gridFields: string[] = ["id", "quantity", "date", "fullname", "address", "phone", "amount", "status", "class", "note", "coupon"];

const gridColumns: DataGridColumn[] = [
    { index: "id", label: "ID", width: "1%" },
    { index: "quantity", label: "Số lượng", type: DataGridColumnType.NUMBER },
    { index: "date", label: "Ngày đăng ký", type: DataGridColumnType.DATE },
    {index: "fullname", label: "Họ tên" },
    { index: "address", label: "Địa chỉ" },
    { index: "phone", label: "Số điện thoại" },
    { index: "amount", label: "Số tiền", type: DataGridColumnType.CURRENCY },
    { index: "class", label: "Lớp", type: DataGridColumnType.TEXT },
    { index: "note", label: "Ghi chú" },
    { index: "coupon", label: "Coupon" },
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
    addNewLabel: "Thêm mới",
    deleteSelectedsLabel: "Xóa Đăng ký Mua thẻ đã chọn",
    updateLabel: "Cập nhật Đăng ký Mua thẻ",
}