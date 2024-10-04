/**
 * -- nextnobels.themes definition

CREATE TABLE `themes` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `created` varchar(255) NOT NULL,
  `creatorId` int(11) NOT NULL,
  `modified` varchar(255) NOT NULL,
  `modifiedId` int(11) NOT NULL,
  `status` varchar(255) NOT NULL,
  `startDate` date NOT NULL,
  `endDate` date NOT NULL,
  `content` text NOT NULL,
  `software` int(11) NOT NULL,
  `global` int(11) NOT NULL,
  `sharedSoftwares` varchar(255) NOT NULL,
  `default` int(11) NOT NULL,
  `ordering` int(11) NOT NULL,
  `site` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;
 */

import { DataGridColumn, DataGridColumnActionType, DataGridColumnType, DataGridFilterColumn, DataGridFilterColumnType, DataGridPagination, DataGridSort, DataGridSortDirection, DataGridSortOption, DataGridTableJoin } from "@/components/grid/DataGrid";
import { DataGridEditField, DataGridEditFieldType } from "@/components/grid/DataGridEdit";
import { TableGridSettings } from "@/components/grid/TableGrid";

const gridTitle: string = "Quản lý Theme";
const gridTable: string = "themes";
const gridJoins: DataGridTableJoin[] = [];
const gridSearchFields: string[] = ["id", "name", "content"];
const gridFields: string[] = ["id", "name", "content", "status", "startDate", "endDate", "ordering"];

const gridColumns: DataGridColumn[] = [
    { index: "id", label: "ID", width: "1%" },
    {
        index: "name", label: "Tên Theme"
    },
    {
        index: "content", label: "Nội dung", isHtml: true
    },
    { index: "startDate", label: "Ngày bắt đầu", type: DataGridColumnType.DATE },
    { index: "endDate", label: "Ngày kết thúc", type: DataGridColumnType.DATE },
    { index: "ordering", label: "Thứ tự", type: DataGridColumnType.NUMBER, inputable: true },
    {
        index: "status", type: DataGridColumnType.STATUS, label: "Trạng thái", map: {
            0: 'Chưa kích hoạt',
            1: 'Đã kích hoạt'
        },
        statusToggable: true
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
        label: "ID Theme tăng",
        sorts: [
            { index: "id", direction: DataGridSortDirection.DESCENDING },
        ]
    },
    {
        index: "idDesc",
        label: "ID Theme giảm",
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


export const AdminThemeSettings: TableGridSettings = {
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
    deleteSelectedsLabel: "Xóa Theme đã chọn",
    updateLabel: "Cập nhật Theme",
    treeMode: true,
}