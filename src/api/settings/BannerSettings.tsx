/**
 * -- nextnobels.banner definition

CREATE TABLE `banner` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `url` varchar(255) NOT NULL,
  `image` varchar(255) NOT NULL,
  `click` int(11) NOT NULL,
  `campaignId` int(11) NOT NULL,
  `created` datetime NOT NULL,
  `creatorId` int(11) NOT NULL,
  `modifed` datetime NOT NULL,
  `modifiedId` int(11) NOT NULL,
  `status` tinyint(4) NOT NULL,
  `position` varchar(255) NOT NULL,
  `target` varchar(255) NOT NULL,
  `width` varchar(255) NOT NULL,
  `height` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;
 */
import { DataGridColumn, DataGridColumnActionType, DataGridColumnType, DataGridFilterColumn, DataGridFilterColumnType, DataGridPagination, DataGridSort, DataGridSortDirection, DataGridSortOption, DataGridTableJoin } from "@/components/grid/DataGrid";
import { DataGridEditField, DataGridEditFieldType } from "@/components/grid/DataGridEdit";
import { TableGridSettings } from "@/components/grid/TableGrid";

const gridTitle: string = "Quản lý Banner";
const gridTable: string = "banner";
const gridJoins: DataGridTableJoin[] = [];
const gridSearchFields: string[] = ["id", "name", "url", "image"];
const gridFields: string[] = ["id", "name", "url", "image", "click", "campaignId", "status", "position", "target", "width", "height"];

const gridColumns: DataGridColumn[] = [
    { index: "id", label: "ID", width: "1%" },
    { index: "name", label: "Tên Banner", linkFormat: (value: any, item: any) => `/Table/admin_banner/${item.id}/edit` },
    { index: "url", label: "URL" },
    { index: "image", label: "Ảnh", type: DataGridColumnType.IMAGE, linkFormat: (value: any, item: any) => `/Table/admin_banner/${item.id}/edit` },
    { index: "click", label: "Lượt click", type: DataGridColumnType.NUMBER },
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
    pageSize: 5000
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
    {
        index: "trial", label: "Dùng thử", type: DataGridFilterColumnType.STATUS, map: {
            0: 'Chưa kích hoạt',
            1: 'Đã kích hoạt'
        },
        comparisonOperator: "equal"
    },
];

const gridSortOptions: DataGridSortOption[] = [
    {
        index: "nameAsc",
        label: "Tên Banner tăng",
        sorts: [
            { index: "title", direction: DataGridSortDirection.ASCENDING },
            { index: "id", direction: DataGridSortDirection.DESCENDING },
        ]
    },
    {
        index: "nameDesc",
        label: "Tên Banner giảm",
        sorts: [
            { index: "title", direction: DataGridSortDirection.DESCENDING },
            { index: "id", direction: DataGridSortDirection.ASCENDING },
        ]
    }
];

const gridDefaultSorts: DataGridSort[] = [
    { index: "id", direction: DataGridSortDirection.ASCENDING }
];

const gridAddFields: DataGridEditField[] = [
    {index:"name", label: "Tên Banner", type: DataGridEditFieldType.TEXT, size: 6 },
    {index: "url", label: "URL", type: DataGridEditFieldType.TEXT, size: 6 },
    {index: "image", label: "Ảnh", type: DataGridEditFieldType.IMAGE, size: 6 },
    {
        index: "status", label: "Trạng thái", type: DataGridEditFieldType.STATUS, size: 6, map: {
            0: 'Chưa kích hoạt',
            1: 'Đã kích hoạt'
        }, statusToggable: true
    },
];


export const AdminBannerSettings: TableGridSettings = {
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
    deleteSelectedsLabel: "Xóa Banner đã chọn",
    updateLabel: "Cập nhật Banner",
}