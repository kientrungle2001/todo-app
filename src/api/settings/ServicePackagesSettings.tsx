/**
 * -- nextnobels.service_packages definition

CREATE TABLE `service_packages` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `serviceName` varchar(255) NOT NULL,
  `amount` double NOT NULL,
  `friendlyAmount` double NOT NULL,
  `creatorId` int(11) NOT NULL,
  `created` datetime NOT NULL,
  `modifiedId` int(11) NOT NULL,
  `modified` datetime NOT NULL,
  `serviceType` varchar(255) NOT NULL,
  `status` tinyint(4) NOT NULL,
  `campaignId` int(11) NOT NULL,
  `software` int(11) NOT NULL,
  `site` int(11) NOT NULL,
  `global` int(11) NOT NULL,
  `sharedSoftwares` varchar(255) NOT NULL,
  `contestId` int(11) NOT NULL,
  `durationType` varchar(255) NOT NULL,
  `duration` int(11) NOT NULL,
  `startDate` date NOT NULL,
  `endDate` date NOT NULL,
  `startPublicDate` date NOT NULL,
  `endPublicDate` date NOT NULL,
  `categoryIds` varchar(255) NOT NULL,
  `languages` varchar(20) NOT NULL,
  `contestIds` varchar(255) NOT NULL,
  `ordering` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=42 DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;
 */
import { DataGridColumn, DataGridColumnActionType, DataGridColumnType, DataGridFilterColumn, DataGridFilterColumnType, DataGridPagination, DataGridSort, DataGridSortDirection, DataGridSortOption, DataGridTableJoin } from "@/components/grid/DataGrid";
import { DataGridEditField, DataGridEditFieldType } from "@/components/grid/DataGridEdit";
import { TableGridSettings } from "@/components/grid/TableGrid";

const gridTitle: string = "Dịch vụ";
const gridTable: string = "service_packages";
const gridJoins: DataGridTableJoin[] = [];
const gridSearchFields: string[] = ["id", "serviceName"];
const gridFields: string[] = ["id", "serviceName", "amount", "friendlyAmount", "serviceType", "duration", "languages", "status"];

const gridColumns: DataGridColumn[] = [
    { index: "id", label: "ID", width: "1%" },
    { index: "serviceName", label: "Tên dịch vụ" },
    {
        index: "serviceType",
        type: DataGridColumnType.TEXT,
        label: "Loại dịch vụ",
        map: {
            "full": 'Toàn bộ',
            "contest": "Cuộc thi",
            "view": "Xem đề thi"
        }
    },
    {
        index: "languages",
        type: DataGridColumnType.TEXT,
        label: "Ngôn ngữ",
        map: {
            "vn": 'Tiếng Việt',
            "en": "Tiếng Anh",
            "ev": "Song ngữ",
        }
    },
    { index: "duration", label: "Số ngày", type: DataGridColumnType.NUMBER },
    { index: "amount", label: "Giá", type: DataGridColumnType.CURRENCY },
    { index: "friendlyAmount", label: "Giá ưu đãi", type: DataGridColumnType.CURRENCY },

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
    pageSize: 20
};

const gridFilters: DataGridFilterColumn[] = [
    { index: "id", label: "ID", type: DataGridFilterColumnType.TEXT },
    {
        index: "status", label: "Trạng thái", type: DataGridFilterColumnType.STATUS, map: {
            0: 'Chưa kích hoạt',
            1: 'Đã kích hoạt'
        }
    },
];

const gridSortOptions: DataGridSortOption[] = [
    {
        index: "nameAsc",
        label: "Tên dịch vụ tăng",
        sorts: [
            { index: "serviceName", direction: DataGridSortDirection.ASCENDING },
            { index: "id", direction: DataGridSortDirection.DESCENDING },
        ]
    },
    {
        index: "nameDesc",
        label: "Tên dịch vụ giảm",
        sorts: [
            { index: "serviceName", direction: DataGridSortDirection.DESCENDING },
            { index: "id", direction: DataGridSortDirection.ASCENDING },
        ]
    }
];

const gridDefaultSorts: DataGridSort[] = [
    { index: "id", direction: DataGridSortDirection.DESCENDING }
];

const gridAddFields: DataGridEditField[] = [
    { index: "serviceName", label: "Tên dịch vụ", type: DataGridEditFieldType.TEXT, size: 6 },
    { index: "amount", label: "Giá", type: DataGridEditFieldType.TEXT, size: 6 },
    { index: "friendlyAmount", label: "Giá ưu đãi", type: DataGridEditFieldType.TEXT, size: 6 },
    {
        index: "serviceType", label: "Loại dịch vụ", type: DataGridEditFieldType.SELECT,
        options: [
            { value: "full", label: 'Toàn bộ' },
            { value: "contest", label: "Cuộc thi" },
            { value: "view", label: "Xem đề thi" }
        ],
        size: 6
    },
    {
        index: "languages", label: "Ngôn ngữ", type: DataGridEditFieldType.SELECT, options: [
            { value: "vn", label: 'Tiếng Việt' },
            { value: "en", label: "Tiếng Anh" },
            { value: "ev", label: "Song ngữ" },
        ], size: 6
    },
    { index: "duration", label: "Số ngày", type: DataGridEditFieldType.TEXT, size: 6 },
    {
        index: "durationType", label: "Loại thời gian", type: DataGridEditFieldType.SELECT, options: [
            { value: "range", label: "Khoảng thời gian" },
            { value: "yearly", label: "Năm" }
        ], size: 6
    },
    {
        index: "status", label: "Trạng thái", type: DataGridEditFieldType.STATUS, size: 6, map: {
            0: 'Chưa kích hoạt',
            1: 'Đã kích hoạt'
        }, statusToggable: true
    }
];


export const ServicePackagesSettings: TableGridSettings = {
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
    deleteSelectedsLabel: "Xóa dịch vụ đã chọn",
    updateLabel: "Cập nhật dịch vụ"
}