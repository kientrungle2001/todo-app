/**
 * -- nextnobels.admin_log definition

CREATE TABLE `admin_log` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `userId` int(11) NOT NULL,
  `menu` varchar(255) NOT NULL,
  `admin_controller` varchar(255) NOT NULL,
  `actionType` varchar(255) NOT NULL,
  `brief` text NOT NULL,
  `created` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=50401 DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;
 */

import { DataGridColumn, DataGridColumnActionType, DataGridColumnType, DataGridFilterColumn, DataGridFilterColumnType, DataGridPagination, DataGridSort, DataGridSortDirection, DataGridSortOption, DataGridTableJoin } from "@/components/grid/DataGrid";
import { DataGridEditField, DataGridEditFieldType } from "@/components/grid/DataGridEdit";
import { TableGridSettings } from "@/components/grid/TableGrid";

const gridTitle: string = "Quản lý Log";
const gridTable: string = "themes";
const gridJoins: DataGridTableJoin[] = [];
const gridSearchFields: string[] = ["id", "menu", "admin_controller", "actionType", "brief"];
const gridFields: string[] = ["id", "menu", "admin_controller", "actionType", "brief", "created"];

const gridColumns: DataGridColumn[] = [
    { index: "id", label: "ID", width: "1%" },
    {
        index: "menu",
        label: "Menu",
        width: "20%"
    },
    {
        index: "admin_controller",
        label: "Admin URL",
        width: "20%"
    },
    {
        index: "actionType",
        label: "Action Type",
        type: DataGridColumnType.TEXT,
    },
    {
        index: "brief",
        label: "Mô tả",
        width: "40%",
        isHtml: true
    },
    
    { index: "editAction", label: "Sửa", type: DataGridColumnType.ACTIONS, actionType: DataGridColumnActionType.EDIT, width: "1%" },
    { index: "deleteAction", label: "Xóa", type: DataGridColumnType.ACTIONS, actionType: DataGridColumnActionType.DELETE, width: "1%" }
];

const gridPagination: DataGridPagination = {
    currentPage: 1,
    pageSize: 200
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
        label: "ID Log tăng",
        sorts: [
            { index: "id", direction: DataGridSortDirection.DESCENDING },
        ]
    },
    {
        index: "idDesc",
        label: "ID Log giảm",
        sorts: [
            { index: "id", direction: DataGridSortDirection.ASCENDING },
        ]
    }
];

const gridDefaultSorts: DataGridSort[] = [
    { index: "id", direction: DataGridSortDirection.DESCENDING }
];

const gridAddFields: DataGridEditField[] = [
];


export const AdminLogSettings: TableGridSettings = {
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
    deleteSelectedsLabel: "Xóa Log đã chọn",
    updateLabel: "Cập nhật Log",
    treeMode: true,
}