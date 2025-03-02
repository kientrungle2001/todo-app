import { DataGridColumn, DataGridFilterColumn, DataGridPagination, DataGridSort, DataGridSortDirection, DataGridSortOption, DataGridSortOptions, DataGridTableJoin } from "@/components/grid/DataGridColumnTypes";
import { DataGridColumns } from "@/components/grid/DataGridColumns";
import { DataGridEditFields } from "@/components/grid/DataGridEditFields";
import { DataGridEditField, DataGridEditFieldType } from "@/components/grid/DataGridEditTypes";
import { DataGridFilterColumns } from "@/components/grid/DataGridFilterColumns";
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
    {...DataGridFilterColumns.parents, size: 4},
    DataGridFilterColumns.status,
];

const gridSortOptions: DataGridSortOption[] = [
    DataGridSortOptions.nameAsc,
    DataGridSortOptions.nameDesc,
    DataGridSortOptions.idAsc,
    DataGridSortOptions.idDesc,
];

const gridDefaultSorts: DataGridSort[] = [{ index: "ordering", direction: DataGridSortDirection.ASCENDING }];

const gridAddFields: DataGridEditField[] = [
    DataGridEditFields.name,
    DataGridEditFields.alias,
    DataGridEditFields.router,
    DataGridEditFields.img,
    DataGridEditFields.parent,
    DataGridEditFields.status,
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
