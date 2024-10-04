/**
 * -- nextnobels.admin_level definition

CREATE TABLE `admin_level` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `level` varchar(255) NOT NULL,
  `status` int(11) NOT NULL,
  `created` datetime NOT NULL,
  `modified` datetime NOT NULL,
  `creatorId` int(11) NOT NULL,
  `modifiedId` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;
 */

import { DataGridColumn, DataGridColumnActionType, DataGridColumnType, DataGridFilterColumn, DataGridFilterColumnType, DataGridPagination, DataGridSort, DataGridSortDirection, DataGridSortOption, DataGridTableJoin } from "@/components/grid/DataGrid";
import { DataGridEditField, DataGridEditFieldType } from "@/components/grid/DataGridEdit";
import { TableGridSettings } from "@/components/grid/TableGrid";

const gridTitle: string = "Quản lý Vai trò";
const gridTable: string = "admin_level";
const gridJoins: DataGridTableJoin[] = [];
const gridSearchFields: string[] = ["id", "level"];
const gridFields: string[] = ["id", "level", "status"];

const gridColumns: DataGridColumn[] = [
    { index: "id", label: "ID", width: "1%" },
    {
        index: "level",
        label: "Tên Vai trò",
        width: "20%"
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
        label: "ID Vai trò tăng",
        sorts: [
            { index: "id", direction: DataGridSortDirection.DESCENDING },
        ]
    },
    {
        index: "idDesc",
        label: "ID Vai trò giảm",
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


export const AdminLevelSettings: TableGridSettings = {
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
    deleteSelectedsLabel: "Xóa Vai trò đã chọn",
    updateLabel: "Cập nhật Vai trò",
    treeMode: true,
}