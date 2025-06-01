/**
 * -- nextnobels.coupon_user definition

CREATE TABLE `coupon_user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `userId` int(11) NOT NULL,
  `username` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `phone` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `resellerId` int(11) NOT NULL,
  `serviceId` int(11) NOT NULL,
  `code` varchar(255) NOT NULL,
  `status` int(11) NOT NULL,
  `actived` datetime NOT NULL,
  `software` int(11) NOT NULL,
  `site` int(11) NOT NULL,
  `global` int(11) NOT NULL,
  `sharedSoftwares` varchar(255) NOT NULL,
  `creatorId` int(11) NOT NULL,
  `modifiedId` int(11) NOT NULL,
  `created` datetime NOT NULL,
  `modified` datetime NOT NULL,
  `paymentId` int(11) NOT NULL,
  `class` int(11) NOT NULL,
  `languages` varchar(255) NOT NULL,
  `params` text NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;
 * 
 */
import { DataGridPagination } from "@/types/grid/DataGridPagination";
import { DataGridSortOption } from "@/types/grid/DataGridSortOption";
import { DataGridSortDirection } from "@/types/grid/DataGridSortDirection";
import { DataGridSort } from "@/types/grid/DataGridSort";
import { DataGridFilterColumn } from "@/types/grid/DataGridFilterColumn";
import { DataGridTableJoin } from "@/types/grid/DataGridTableJoin";
import { DataGridColumnActionType } from "@/types/grid/DataGridColumnActionType";
import { DataGridFilterColumnType } from "@/types/grid/DataGridFilterColumnType";
import { DataGridColumnType } from "@/types/grid/DataGridColumnType";
import { DataGridColumn } from "@/types/grid/DataGridColumn";
import { DataGridEditField, DataGridEditFieldType } from "@/components/grid/DataGridEditTypes";
import { TableGridSettings } from "@/types/TableGridSettings";

const gridTitle: string = "Quản lý Người nạp Coupon";
const gridTable: string = "coupon_user";
const gridJoins: DataGridTableJoin[] = [];
const gridSearchFields: string[] = ["id", "username", "name", "phone", "email", "code"];
const gridFields: string[] = ["id", "username", "name", "phone", "email", "code"];

const gridColumns: DataGridColumn[] = [
    { index: "id", label: "ID", width: "1%" },
    {index: "username", label: "Tên đăng nhập" },
    {index: "name", label: "Tên" },
    {index: "phone", label: "Số điện thoại" },
    { index: "email", label: "Email" },
    { index: "code", label: "Coupon Code" },
    { index: "editAction", label: "Sửa", type: DataGridColumnType.ACTIONS, actionType: DataGridColumnActionType.EDIT, width: "1%" },
    { index: "deleteAction", label: "Xóa", type: DataGridColumnType.ACTIONS, actionType: DataGridColumnActionType.DELETE, width: "1%" }
];

const gridPagination: DataGridPagination = {
    currentPage: 1,
    pageSize: 200
};

const gridFilters: DataGridFilterColumn[] = [
    { index: "id", label: "ID", type: DataGridFilterColumnType.TEXT },
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
];


export const FullLookAdminCouponUserSettings: TableGridSettings = {
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
    deleteSelectedsLabel: "Xóa Coupon đã chọn",
    updateLabel: "Cập nhật Coupon",
    treeMode: true,
}