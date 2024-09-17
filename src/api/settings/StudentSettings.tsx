import { DataGridColumn, DataGridColumnActionType, DataGridColumnType, DataGridFilterColumn, DataGridFilterColumnType, DataGridPagination, DataGridSort, DataGridSortDirection, DataGridSortOption, DataGridTableJoin } from "@/components/grid/DataGrid";
import { DataGridEditField, DataGridEditFieldType } from "@/components/grid/DataGridEdit";
import { TableGridSettings } from "@/components/grid/TableGrid";

const gridPagination: DataGridPagination = {
    currentPage: 1,
    pageSize: 20
};

const gridColumns: DataGridColumn[] = [
    { index: "id", label: "ID", width: "1%" },
    { index: "assignName", label: "Người phụ trách" },
    { index: "name", label: "Họ và tên", linkFormat: (value: any, item: any) => `/Table/student/${item.id}/edit` },
    { index: "email", label: "Email" },
    { index: "phone", label: "Phone" },
    { index: "address", label: "Địa chỉ" },
    {
        index: "status", type: DataGridColumnType.STATUS, label: "Trạng thái", map: {
            0: 'Dừng học',
            1: 'Đang học'
        }
    },
    { index: "editAction", label: "Sửa", type: DataGridColumnType.ACTIONS, actionType: DataGridColumnActionType.EDIT, width: "1%" },
    { index: "deleteAction", label: "Xóa", type: DataGridColumnType.ACTIONS, actionType: DataGridColumnActionType.DELETE, width: "1%" }
];

const gridFilters: DataGridFilterColumn[] = [
    { index: "id", label: "ID", type: DataGridFilterColumnType.TEXT },
    { index: "assignId", label: "Người phụ trách", type: DataGridFilterColumnType.SELECT, table: "teacher", valueField: "id", labelField: "name" },
    { index: "status", label: "Trạng thái", type: DataGridFilterColumnType.STATUS, map: {
        0: 'Dừng học',
        1: 'Đang học'
    } },
];

const gridSortOptions: DataGridSortOption[] = [
    {
        index: "nameAsc",
        label: "Họ và tên tăng",
        sorts: [
            { index: "name", direction: DataGridSortDirection.ASCENDING },
            { index: "id", direction: DataGridSortDirection.DESCENDING },
        ]
    },
    {
        index: "nameDesc",
        label: "Họ và tên giảm",
        sorts: [
            { index: "name", direction: DataGridSortDirection.DESCENDING },
            { index: "id", direction: DataGridSortDirection.ASCENDING },
        ]
    }
];

const gridDefaultSorts: DataGridSort[] = [
    { index: "id", direction: DataGridSortDirection.DESCENDING }
];

const gridAddFields: DataGridEditField[] = [
    { index: "name", label: "Họ và tên", type: DataGridEditFieldType.TEXT, size: 6 },
    { index: "email", label: "Email", type: DataGridEditFieldType.TEXT, size: 6 },
    { index: "phone", label: "Phone", type: DataGridEditFieldType.TEXT, size: 6 },
    { index: "address", label: "Địa chỉ", type: DataGridEditFieldType.TEXT, size: 6 },
    { index: "assignId", label: "Người phụ trách", type: DataGridEditFieldType.SELECT, size: 6, 
        table: "teacher",
        valueField: "id",
        labelField: "name"
     },
    { index: "status", label: "Trạng thái", type: DataGridEditFieldType.STATUS, size: 6, map: {
        0: 'Dừng học',
        1: 'Đang học'
    } }
];

const gridJoins: DataGridTableJoin[] = [
    { table: "teacher", alias: "tc", type: "left", condition: "t.assignId = tc.id" }
];

const gridSearchFields: string[] = ["id", "name", "email", "phone", "address", "tc.name"];

export const StudentSettings: TableGridSettings = {
    title: "Quản lý học sinh",
    table: "student",
    joins: gridJoins,
    fields: ["id", "name", "email", "phone", "address", "status", "tc.name as assignName"],
    searchFields: gridSearchFields,
    pagination: gridPagination,
    columns: gridColumns,
    filters: gridFilters,
    sortOptions: gridSortOptions,
    defaultSorts: gridDefaultSorts,
    addFields: gridAddFields,
    editFields: gridAddFields,
    addNewLabel: "Thêm học sinh",
    deleteSelectedsLabel: "Xóa học sinh đã chọn",
    updateLabel: "Cập nhật học sinh"
}