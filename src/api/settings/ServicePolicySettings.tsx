/**
 * -- nextnobels.service_policy definition

CREATE TABLE `service_policy` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `serviceId` int(11) NOT NULL,
  `discount` double NOT NULL,
  `note` varchar(255) NOT NULL,
  `startDate` datetime NOT NULL,
  `endDate` datetime NOT NULL,
  `creatorId` int(11) NOT NULL,
  `created` datetime NOT NULL,
  `modifiedId` int(11) NOT NULL,
  `modified` datetime NOT NULL,
  `status` tinyint(4) NOT NULL,
  `campaignId` int(11) NOT NULL,
  `software` int(11) NOT NULL,
  `global` int(11) NOT NULL,
  `site` int(11) NOT NULL,
  `sharedSoftwares` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;
 */
import { DataGridColumn, DataGridColumnActionType, DataGridColumnType, DataGridFilterColumn, DataGridFilterColumnType, DataGridPagination, DataGridSort, DataGridSortDirection, DataGridSortOption, DataGridTableJoin } from "@/components/grid/DataGrid";
import { DataGridEditField, DataGridEditFieldType } from "@/components/grid/DataGridEdit";
import { TableGridSettings } from "@/components/grid/TableGrid";

const gridTitle: string = "Chính sách Dịch vụ";
const gridTable: string = "service_policy";
const gridJoins: DataGridTableJoin[] = [
    {
        table: "service_packages",
        alias: "sp",
        type: "left",
        condition: "sp.id = t.serviceId"
    }
];
const gridSearchFields: string[] = ["id", "sp.serviceName", "note"];
const gridFields: string[] = ["id", "sp.serviceName", "discount", "note", "startDate", "endDate", "status", "sp.serviceType", "sp.languages", "sp.duration", "sp.amount", "sp.friendlyAmount"];

const gridColumns: DataGridColumn[] = [
    { index: "id", label: "ID", width: "1%" },
    { index: "serviceName", label: "Tên dịch vụ" },
    {
        index: "serviceType",
        type: DataGridColumnType.TEXT,
        label: "Loại chính sách dịch vụ",
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
        index: "discount", label: "Giảm giá", type: DataGridColumnType.NUMBER
    },
    {
        index: "note", type: DataGridColumnType.TEXT,
        label: "Ghi chú",
    },
    {
        index: "startDate", type: DataGridColumnType.DATE, label: "Ngày bắt đầu"
    },
    {
        index: "endDate", type: DataGridColumnType.DATE, label: "Ngày kết thúc"
    },
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
        },
        comparisonOperator: "equal"
    },
];

const gridSortOptions: DataGridSortOption[] = [
    {
        index: "nameAsc",
        label: "Tên chính sách dịch vụ tăng",
        sorts: [
            { index: "serviceName", direction: DataGridSortDirection.ASCENDING },
            { index: "id", direction: DataGridSortDirection.DESCENDING },
        ]
    },
    {
        index: "nameDesc",
        label: "Tên chính sách dịch vụ giảm",
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
    {
        index: "status", label: "Trạng thái", type: DataGridEditFieldType.STATUS, size: 6, map: {
            0: 'Chưa kích hoạt',
            1: 'Đã kích hoạt'
        }, statusToggable: true
    }
];


export const AdminServicePolicySettings: TableGridSettings = {
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
    deleteSelectedsLabel: "Xóa chính sách dịch vụ đã chọn",
    updateLabel: "Cập nhật chính sách dịch vụ"
}