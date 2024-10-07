import { DataGridColumn, DataGridColumnActionType, DataGridColumnType, DataGridColumns, DataGridFilterColumn, DataGridFilterColumnType, DataGridFilterColumns, DataGridPagination, DataGridSort, DataGridSortDirection, DataGridSortOption, DataGridTableJoin } from "@/components/grid/DataGrid";
import { DataGridEditField, DataGridEditFieldType } from "@/components/grid/DataGridEdit";
import { TableGridSettings } from "@/components/grid/TableGrid";

const gridTitle: string = "Quản lý Quyền";
const gridAddNewLabel: string = "Thêm Quyền";
const gridUpdateLabel: string = "Cập nhật Quyền";
const gridDeleteSelectedsLabel: string = "Xóa các Quyền đã chọn";

const gridTable: string = "admin_level_action";
const gridJoins: DataGridTableJoin[] = [];
const gridSearchFields: string[] = ["id", "admin_action", "admin_level", "status", "name_menu2", "action_type"];
const gridFields: string[] = ["id", "admin_action", "admin_level", "status", "name_menu2", "action_type"];

const gridColumns: DataGridColumn[] = [
    DataGridColumns.id,
    { index: "admin_action", label: "Tên Quyền", width: "20%" },
    { index: "admin_level", label: "Quyền", width: "20%" },
    { index: "action_type", label: "Loại Quyền", width: "20%" },
    DataGridColumns.status,
    DataGridColumns.editAction,
    DataGridColumns.deleteAction
];

const gridPagination: DataGridPagination = { currentPage: 1, pageSize: 200 };

const gridFilters: DataGridFilterColumn[] = [
    DataGridFilterColumns.id,
    DataGridFilterColumns.status,
];
const gridSortOptions: DataGridSortOption[] = [
    {
        index: "idAsc",
        label: "ID Quyền tăng",
        sorts: [{ index: "id", direction: DataGridSortDirection.DESCENDING },]
    },
    {
        index: "idDesc",
        label: "ID Quyền giảm",
        sorts: [{ index: "id", direction: DataGridSortDirection.ASCENDING },]
    }
];

const gridDefaultSorts: DataGridSort[] = [{ index: "id", direction: DataGridSortDirection.DESCENDING }];

const gridAddFields: DataGridEditField[] = [];


export const AdminLevelActionSettings: TableGridSettings = {
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
    addNewLabel: gridAddNewLabel,
    deleteSelectedsLabel: gridDeleteSelectedsLabel,
    updateLabel: gridUpdateLabel,
    treeMode: true,
}