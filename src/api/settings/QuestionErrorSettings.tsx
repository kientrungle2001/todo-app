import { DataGridColumn, DataGridColumnActionType, DataGridColumnType, DataGridFilterColumn, DataGridFilterColumnType, DataGridPagination, DataGridSort, DataGridSortDirection, DataGridSortOption, DataGridTableJoin } from "@/components/grid/DataGrid";
import { DataGridEditField, DataGridEditFieldType } from "@/components/grid/DataGridEdit";
import { TableGridSettings } from "@/components/grid/TableGrid";

/**
 * -- nextnobels.question_error definition

CREATE TABLE `question_error` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `questionId` int(11) NOT NULL,
  `content` text NOT NULL,
  `userId` int(11) NOT NULL,
  `username` varchar(255) NOT NULL,
  `status` tinyint(4) NOT NULL,
  `created` datetime DEFAULT NULL,
  `modified` datetime DEFAULT NULL,
  `email` varchar(255) NOT NULL,
  `phone` varchar(255) NOT NULL,
  `note` text DEFAULT NULL,
  `browser` varchar(255) DEFAULT NULL,
  `os` varchar(255) DEFAULT NULL,
  `userAgent` varchar(255) DEFAULT NULL,
  `categoryId` int(11) DEFAULT NULL,
  `topic` int(11) DEFAULT NULL,
  `parentTest` int(11) NOT NULL,
  `testId` int(11) NOT NULL,
  `exercise_number` tinyint(4) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4076 DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;
 */

const gridTitle: string = "Quản lý Báo lỗi câu hỏi";
const gridTable: string = "question_error";
const gridJoins: DataGridTableJoin[] = [];
const gridSearchFields: string[] = ["id", "content", "username", "email", "phone", "note", "browser", "os", "userAgent"];
const gridFields: string[] = ["id", "content", "username", "email", "phone", "note", "browser", "os", "userAgent", "categoryId", "topic", "parentTest", "testId", "exercise_number"];

const gridColumns: DataGridColumn[] = [
    { index: "id", label: "ID", width: "1%" },
    { index: "content", label: "Nội dung" },
    { index: "username", label: "Tên đăng nhập" },
    { index: "email", label: "Email" },
    { index: "phone", label: "Số điện thoại" },
    { index: "note", label: "Ghi chú" },
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
        index: "nameAsc",
        label: "ID tăng",
        sorts: [
            { index: "id", direction: DataGridSortDirection.DESCENDING },
        ]
    },
    {
        index: "nameDesc",
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


export const AdminQuestionErrorSettings: TableGridSettings = {
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
    deleteSelectedsLabel: "Xóa Báo lỗi câu hỏi đã chọn",
    updateLabel: "Cập nhật Báo lỗi câu hỏi",
    treeMode: true,
}