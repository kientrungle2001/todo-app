import { DataGridColumn, DataGridColumnActionType, DataGridColumnType, DataGridFilterColumn, DataGridFilterColumnType, DataGridPagination, DataGridSort, DataGridSortDirection, DataGridSortOption, DataGridTableJoin } from "@/components/grid/DataGrid";
import { DataGridEditField, DataGridEditFieldType } from "@/components/grid/DataGridEdit";
import { TableGridSettings } from "@/components/grid/TableGrid";

const gridTitle: string = "Quản lý Cuộc thi";
const gridTable: string = "contest";
const gridJoins: DataGridTableJoin[] = [];
const gridSearchFields: string[] = ["id", "name"];
const gridFields: string[] = ["id", "name", "startDate", "expiredDate", "showResultDate", "endShowResult"];

const gridColumns: DataGridColumn[] = [
    { index: "id", label: "ID", width: "1%" },
    { index: "name", label: "User ID", linkFormat: (value: any, item: any) => `/Table/admin_contest/${item.id}/edit` },
    { index: "startDate", label: "Ngày bắt đầu", type: DataGridColumnType.DATE },
    { index: "expiredDate", label: "Ngày kết thúc", type: DataGridColumnType.DATE },
    { index: "showResultDate", label: "Ngày xem kết quả", type: DataGridColumnType.DATE },
    { index: "endShowResult", label: "Ngày kết thúc xem kết quả", type: DataGridColumnType.DATE },
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
        label: "ID cuộc thi tăng",
        sorts: [
            { index: "id", direction: DataGridSortDirection.DESCENDING },
        ]
    },
    {
        index: "idDesc",
        label: "ID cuộc thi giảm",
        sorts: [
            { index: "id", direction: DataGridSortDirection.ASCENDING },
        ]
    }
];

const gridDefaultSorts: DataGridSort[] = [
    { index: "id", direction: DataGridSortDirection.DESCENDING }
];

const gridAddFields: DataGridEditField[] = [
    { index: "name", label: "Tên cuộc thi", type: DataGridEditFieldType.TEXT, size: 6 },
    { index: "startDate", label: "Ngày bắt đầu", type: DataGridEditFieldType.DATE },
    { index: "expiredDate", label: "Ngày kết thúc", type: DataGridEditFieldType.DATE },
    { index: "showResultDate", label: "Ngày xem kết quả", type: DataGridEditFieldType.DATE },
    { index: "endShowResult", label: "Ngày kết thúc xem kết quả", type: DataGridEditFieldType.DATE },
];


export const AdminContestSettings: TableGridSettings = {
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
    deleteSelectedsLabel: "Xóa Cuộc thi đã chọn",
    updateLabel: "Cập nhật Cuộc thi",
    treeMode: true,
}