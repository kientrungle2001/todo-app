import { DataGridColumn, DataGridColumnActionType, DataGridColumnType, DataGridFilterColumn, DataGridFilterColumnType, DataGridPagination, DataGridSort, DataGridSortDirection, DataGridSortOption, DataGridTableJoin } from "@/components/grid/DataGrid";
import { DataGridEditField, DataGridEditFieldType } from "@/components/grid/DataGridEdit";
import { TableGridSettings } from "@/components/grid/TableGrid";

const gridJoins: DataGridTableJoin[] = [
    {
        table: "areacode", alias: "p", type: "left", condition: "t.areacode = p.id"
    }
];
const gridFields: string[] = ["id", "username", "name", "email", "phone", "address", "p.name as provinceName", "status"];
const gridSearchFields: string[] = ["id", "username", "name", "email", "phone", "address"];
const gridPagination: DataGridPagination = {
    currentPage: 1,
    pageSize: 20
};

const gridColumns: DataGridColumn[] = [
    { index: "id", label: "ID", width: "1%" },
    { index: "username", label: "Tên đăng nhập" },
    { index: "name", label: "Họ và tên", linkFormat: (value: any, item: any) => `/Table/user/${item.id}/edit` },
    { index: "email", label: "Email" },
    { index: "phone", label: "Phone", inputable: false },
    { index: "provinceName", label: "Thành phố" },
    { index: "address", label: "Địa chỉ" },
    {
        index: "status", type: DataGridColumnType.STATUS, label: "Trạng thái", map: {
            0: 'Dừng học',
            1: 'Đang học'
        },
        statusToggable: true
    },
    { index: "editAction", label: "Sửa", type: DataGridColumnType.ACTIONS, actionType: DataGridColumnActionType.EDIT, width: "1%" },
    { index: "deleteAction", label: "Xóa", type: DataGridColumnType.ACTIONS, actionType: DataGridColumnActionType.DELETE, width: "1%" }
];

const gridFilters: DataGridFilterColumn[] = [
    { index: "id", label: "ID", type: DataGridFilterColumnType.TEXT },
    {
        index: "status", label: "Trạng thái", type: DataGridFilterColumnType.STATUS, map: {
            0: 'Dừng học',
            1: 'Đang học'
        },
        comparisonOperator: "equal"
    },
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
    { index: "username", label: "Tên đăng nhập", type: DataGridEditFieldType.TEXT, size: 6 },
    { index: "name", label: "Họ và tên", type: DataGridEditFieldType.TEXT, size: 6 },
    { index: "email", label: "Email", type: DataGridEditFieldType.TEXT, size: 6 },
    { index: "phone", label: "Phone", type: DataGridEditFieldType.TEXT, size: 6 },
    { index: "address", label: "Địa chỉ", type: DataGridEditFieldType.TEXT, size: 6 },
    {
        index: "areacode", label: "Tỉnh/Thành phố", type: DataGridEditFieldType.SELECT, size: 6,
        table: "areacode", valueField: "id", labelField: "name", tableCondition: "type='province'"
    },
    {
        index: "district", label: "Quận / Huyện", type: DataGridEditFieldType.SELECT, size: 6,
        table: "areacode", valueField: "id", labelField: "name", tableCondition: (item) => "type='district' and parent = '" + item.areacode + "'",
    },
    {
        index: "school", label: "Trường", type: DataGridEditFieldType.SELECT, size: 6,
        table: "areacode", valueField: "id", labelField: "name", tableCondition: (item) => "type='school' and parent = '" + item.district + "'",
    },
    {
        index: "status", label: "Trạng thái", type: DataGridEditFieldType.STATUS, size: 6, map: {
            0: 'Dừng học',
            1: 'Đang học'
        }, statusToggable: true
    }
];

export const AdminUserSettings: TableGridSettings = {
    title: "Quản lý học sinh",
    table: "user",
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
    addNewLabel: "Thêm học sinh",
    deleteSelectedsLabel: "Xóa học sinh đã chọn",
    updateLabel: "Cập nhật học sinh"
}