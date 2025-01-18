import { DataGridColumn, DataGridColumnType, DataGridFilterColumn, DataGridFilterColumnType, DataGridFilterColumns, DataGridPagination, DataGridSort, DataGridSortDirection, DataGridSortOption, DataGridSortOptions, DataGridTableJoin } from "@/components/grid/DataGridColumnTypes";
import { DataGridColumns } from "@/components/grid/DataGridColumns";
import { DataGridEditField, DataGridEditFieldType } from "@/components/grid/DataGridEditTypes";
import { TableGridSettings } from "@/components/grid/TableGrid";

const gridTitle: string = "Quản lý Danh mục";
const gridTable: string = "categories";
const gridJoins: DataGridTableJoin[] = [];
const gridSearchFields: string[] = ["id", "name", "alias", "router"];
const gridFields: string[] = ["id", "name", "alias", "router", "ordering", "status", "display", "trial", "parent"];

const gridColumns: DataGridColumn[] = [
    DataGridColumns.id,
    { index: "name", label: "Tên Danh mục", linkFormat: (value: any, item: any) => `/Table/admin_category/${item.id}/detail`, treeMode: true },
    DataGridColumns.alias,
    { ...DataGridColumns.ordering, treeMode: true },
    DataGridColumns.status,
    { ...DataGridColumns.addChildAction, actionAddChildParentFields: ['alias', 'router', 'status', 'display', 'trial'] },
    { ...DataGridColumns.addChildAction, index: 'addCourse', label: 'Thêm khóa học', actionAddChildController: 'admin_course', actionAddChildParentField: 'categoryId', actionAddChildParentFields: ['status'] },
    DataGridColumns.editAction,
    DataGridColumns.deleteAction
];

const gridPagination: DataGridPagination = { currentPage: 1, pageSize: 5000 };

const gridFilters: DataGridFilterColumn[] = [
    DataGridFilterColumns.id,
    {
        index: "parents", label: "Danh mục cha", type: DataGridFilterColumnType.SELECT,
        table: "categories",
        valueField: "id",
        labelField: "name",
        treeMode: true,
        select2: true,
        comparisonOperator: "inset"
    },
    DataGridFilterColumns.status,
    {
        index: "display", label: "Hiển thị", type: DataGridFilterColumnType.STATUS, map: {
            0: 'Chưa kích hoạt',
            1: 'Đã kích hoạt'
        },
        comparisonOperator: "equal"
    },
    {
        index: "trial", label: "Dùng thử", type: DataGridFilterColumnType.STATUS, map: {
            0: 'Chưa kích hoạt',
            1: 'Đã kích hoạt'
        },
        comparisonOperator: "equal"
    },
];

const gridSortOptions: DataGridSortOption[] = [
    {
        index: "nameAsc",
        label: "Tên Danh mục tăng",
        sorts: [
            { index: "name", direction: DataGridSortDirection.ASCENDING },
            { index: "id", direction: DataGridSortDirection.DESCENDING },
        ]
    },
    {
        index: "nameDesc",
        label: "Tên Danh mục giảm",
        sorts: [
            { index: "name", direction: DataGridSortDirection.DESCENDING },
            { index: "id", direction: DataGridSortDirection.ASCENDING },
        ]
    },
    DataGridSortOptions.idAsc,
    DataGridSortOptions.idDesc,
];

const gridDefaultSorts: DataGridSort[] = [{ index: "ordering", direction: DataGridSortDirection.ASCENDING }];

const gridAddFields: DataGridEditField[] = [
    { index: "name", label: "Tên Danh mục", type: DataGridEditFieldType.TEXT, size: 6 },
    { index: "alias", label: "Đường dẫn", type: DataGridEditFieldType.TEXT, size: 6 },
    { index: "router", label: "Điểm chạy", type: DataGridEditFieldType.TEXT, size: 6 },
    { index: "img", label: "Ảnh Danh mục", type: DataGridEditFieldType.IMAGE, size: 6 },
    {
        index: "parent", label: "Danh mục cha", type: DataGridEditFieldType.SELECT, size: 6,
        table: "categories", valueField: "id", labelField: "name", treeMode: true, parentField: "parent", orderBy: "ordering asc"
    },
    {
        index: "status", label: "Trạng thái", type: DataGridEditFieldType.STATUS, size: 6, map: {
            0: 'Chưa kích hoạt',
            1: 'Đã kích hoạt'
        }, statusToggable: true
    },
];


export const PmtvAdminCategoriesSettings: TableGridSettings = {
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
    deleteSelectedsLabel: "Xóa Danh mục đã chọn",
    updateLabel: "Cập nhật Danh mục",
    treeMode: true,
}
