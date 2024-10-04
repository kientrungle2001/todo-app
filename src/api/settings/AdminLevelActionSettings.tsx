/**
 * -- nextnobels.admin_level_action definition

CREATE TABLE `admin_level_action` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `admin_level_id` int(11) NOT NULL,
  `admin_action` varchar(255) NOT NULL,
  `admin_level` varchar(255) NOT NULL,
  `status` int(11) NOT NULL,
  `name_menu2` varchar(255) NOT NULL,
  `params` varchar(255) NOT NULL,
  `action_type` varchar(255) NOT NULL,
  `software` int(11) NOT NULL,
  `creatorId` int(11) NOT NULL,
  `modifiedId` int(11) NOT NULL,
  `created` datetime NOT NULL,
  `modified` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1298 DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;
 */

import { DataGridColumn, DataGridColumnActionType, DataGridColumnType, DataGridFilterColumn, DataGridFilterColumnType, DataGridPagination, DataGridSort, DataGridSortDirection, DataGridSortOption, DataGridTableJoin } from "@/components/grid/DataGrid";
import { DataGridEditField, DataGridEditFieldType } from "@/components/grid/DataGridEdit";
import { TableGridSettings } from "@/components/grid/TableGrid";

const gridTitle: string = "Quản lý Quyền";
const gridTable: string = "admin_level_action";
const gridJoins: DataGridTableJoin[] = [];
const gridSearchFields: string[] = ["id", "admin_action", "admin_level", "status", "name_menu2", "action_type"];
const gridFields: string[] = ["id", "admin_action", "admin_level", "status", "name_menu2", "action_type"];

const gridColumns: DataGridColumn[] = [
    { index: "id", label: "ID", width: "1%" },
    
    {
        index: "admin_action", label: "Tên Quyền", width: "20%"
    },
    {
        index: "admin_level", label: "Quyền", width: "20%"
    },
    {
        index: "action_type", label: "Loại Quyền", width: "20%"
    },
    {
        index: "status", type: DataGridColumnType.STATUS, label: "Trạng thái", map: {
            0: 'Chưa kích hoạt',
            1: 'Đã kích hoạt'
        },
        statusToggable: true,
        width: "10%"
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
        label: "ID Quyền tăng",
        sorts: [
            { index: "id", direction: DataGridSortDirection.DESCENDING },
        ]
    },
    {
        index: "idDesc",
        label: "ID Quyền giảm",
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


export const AdminLevelActionSettings: TableGridSettings = {
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
    deleteSelectedsLabel: "Xóa Quyền đã chọn",
    updateLabel: "Cập nhật Quyền",
    treeMode: true,
}