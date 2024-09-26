/**
 * -- nextnobels.news definition

CREATE TABLE `news` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `categoryId` int(11) NOT NULL,
  `brief` text NOT NULL,
  `content` text NOT NULL,
  `views` int(11) NOT NULL,
  `hits` int(11) NOT NULL,
  `comments` int(11) NOT NULL,
  `img` text NOT NULL,
  `alias` text NOT NULL,
  `file` varchar(255) NOT NULL,
  `ordering` int(11) NOT NULL,
  `meta_keywords` varchar(255) NOT NULL,
  `meta_description` varchar(255) NOT NULL,
  `created` datetime NOT NULL,
  `creatorId` int(11) NOT NULL DEFAULT 1,
  `modified` datetime NOT NULL,
  `modifiedId` int(11) NOT NULL DEFAULT 1,
  `campaignId` int(11) NOT NULL,
  `software` int(11) NOT NULL,
  `global` int(11) NOT NULL DEFAULT 1,
  `sharedSoftwares` varchar(255) NOT NULL,
  `startDate` datetime NOT NULL,
  `endDate` datetime NOT NULL,
  `status` int(11) NOT NULL,
  `featured` tinyint(4) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=208 DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;
 */
import { DataGridColumn, DataGridColumnActionType, DataGridColumnType, DataGridFilterColumn, DataGridFilterColumnType, DataGridPagination, DataGridSort, DataGridSortDirection, DataGridSortOption, DataGridTableJoin } from "@/components/grid/DataGrid";
import { DataGridEditField, DataGridEditFieldType } from "@/components/grid/DataGridEdit";
import { TableGridSettings } from "@/components/grid/TableGrid";

const gridTitle: string = "Quản lý Tin tức";
const gridTable: string = "news";
const gridJoins: DataGridTableJoin[] = [];
const gridSearchFields: string[] = ["id", "title", "brief", "content"];
const gridFields: string[] = ["id", "title", "categoryId", "brief", "content", "views", "hits", "comments", "img", "alias", "file", "ordering", "meta_keywords", "meta_description", "startDate", "endDate", "status", "featured"];

const gridColumns: DataGridColumn[] = [
    { index: "id", label: "ID", width: "1%" },
    { index: "title", label: "Tên Tin tức", linkFormat: (value: any, item: any) => `/Table/admin_news/${item.id}/edit` },
    { index: "views", label: "Lượt xem", type: DataGridColumnType.NUMBER },
    { index: "ordering", label: "Thứ tự", type: DataGridColumnType.NUMBER, inputable: true },
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
];

const gridSortOptions: DataGridSortOption[] = [
    {
        index: "nameAsc",
        label: "Tên Tin tức tăng",
        sorts: [
            { index: "title", direction: DataGridSortDirection.ASCENDING },
            { index: "id", direction: DataGridSortDirection.DESCENDING },
        ]
    },
    {
        index: "nameDesc",
        label: "Tên Tin tức giảm",
        sorts: [
            { index: "title", direction: DataGridSortDirection.DESCENDING },
            { index: "id", direction: DataGridSortDirection.ASCENDING },
        ]
    }
];

const gridDefaultSorts: DataGridSort[] = [
    { index: "ordering", direction: DataGridSortDirection.ASCENDING }
];

const gridAddFields: DataGridEditField[] = [
    { index: "title", label: "Tên Tin tức", type: DataGridEditFieldType.TEXT, size: 6 },
    {index: "brief", label: "Mô tả ngắn", type: DataGridEditFieldType.TEXT, size: 6 },
    { index: "img", label: "Ảnh đại diện", type: DataGridEditFieldType.IMAGE, size: 6 },
    { index: "alias", label: "Tên đường dẫn", type: DataGridEditFieldType.TEXT, size: 6 },
    { index: "content", label: "Nội dung", type: DataGridEditFieldType.EDITOR, size: 12 },
    {
        index: "categoryId", label: "Danh mục", type: DataGridEditFieldType.SELECT, size: 6,
        table: "categories", valueField: "id", labelField: "name", treeMode: true, parentField: "parent", orderBy: "ordering asc", select2: true
    },
    {
        index: "status", label: "Trạng thái", type: DataGridEditFieldType.STATUS, size: 6, map: {
            0: 'Chưa kích hoạt',
            1: 'Đã kích hoạt'
        }, statusToggable: true
    },
];


export const AdminNewsSettings: TableGridSettings = {
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
    deleteSelectedsLabel: "Xóa Tin tức đã chọn",
    updateLabel: "Cập nhật Tin tức",
}