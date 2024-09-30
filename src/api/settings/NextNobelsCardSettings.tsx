/**
 *
 * -- nextnobels.card_nextnobels definition

CREATE TABLE `card_nextnobels` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `pincard` varchar(255) NOT NULL,
  `pincard_normal` varchar(255) NOT NULL,
  `price` int(11) NOT NULL,
  `discount` int(11) NOT NULL,
  `serial` varchar(255) NOT NULL,
  `creatorId` int(11) NOT NULL,
  `created` datetime NOT NULL,
  `modifiedId` int(11) NOT NULL,
  `modified` datetime NOT NULL,
  `activedId` int(11) NOT NULL,
  `actived` datetime NOT NULL,
  `status` int(11) NOT NULL,
  `languages` varchar(255) DEFAULT NULL,
  `time` int(11) NOT NULL,
  `class` tinyint(4) DEFAULT NULL,
  `software` int(11) DEFAULT NULL,
  `site` int(11) DEFAULT NULL,
  `promotion` tinyint(4) NOT NULL,
  `quantity` int(11) NOT NULL,
  `expiredDate` datetime NOT NULL,
  `startDate` datetime NOT NULL,
  `endDate` datetime NOT NULL,
  `couponable` tinyint(4) DEFAULT NULL,
  `resellerId` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9124 DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;
 */
import { DataGridColumn, DataGridColumnActionType, DataGridColumnType, DataGridFilterColumn, DataGridFilterColumnType, DataGridPagination, DataGridSort, DataGridSortDirection, DataGridSortOption, DataGridTableJoin } from "@/components/grid/DataGrid";
import { DataGridEditField, DataGridEditFieldType } from "@/components/grid/DataGridEdit";
import { TableGridSettings } from "@/components/grid/TableGrid";

const gridTitle: string = "Quản lý Thẻ cào NextNobels";
const gridTable: string = "card_nextnobels";
const gridJoins: DataGridTableJoin[] = [];
const gridSearchFields: string[] = ["id", "pincard", "pincard_normal", "serial"];
const gridFields: string[] = ["id", "pincard", "pincard_normal", "price", "serial", "actived", "status", "languages", "time", "class", "promotion", "quantity", "expiredDate", "startDate", "endDate", "couponable"];

const gridColumns: DataGridColumn[] = [
    { index: "id", label: "ID", width: "1%" },
    { index: "pincard", label: "Mã thẻ" },
    { index: "pincard_normal", label: "Mã thẻ thông thường" },
    { index: "price", label: "Giá", type: DataGridColumnType.CURRENCY },
    { index: "serial", label: "Số serial" },
    { index: "actived", label: "Ngày kích hoạt", type: DataGridColumnType.TEXT },
    { index: "languages", label: "Ngôn ngữ" },
    { index: "time", label: "Thời gian", type: DataGridColumnType.NUMBER },
    { index: "class", label: "Lớp" },
    { index: "software", label: "Phần mềm" },
    { index: "site", label: "Trang web" },
    { index: "promotion", label: "Khuyến mãi", type: DataGridColumnType.STATUS, statusToggable: true, hideLabel: true },
    { index: "quantity", label: "Số lượng" },
    { index: "couponable", label: "Có thể áp dụng coupon", type: DataGridColumnType.STATUS, statusToggable: true, hideLabel: true },
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


export const AdminNextNobelsCardSettings: TableGridSettings = {
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
    deleteSelectedsLabel: "Xóa Thẻ cào NextNobels đã chọn",
    updateLabel: "Cập nhật Thẻ cào NextNobels",
}