import { DataGridColumn, DataGridColumnType, DataGridFilterColumn, DataGridPagination, DataGridSort, DataGridSortDirection, DataGridSortOption, DataGridSortOptions, DataGridTableJoin } from "@/components/grid/DataGridColumnTypes";
import { DataGridColumns } from "@/components/grid/DataGridColumns";
import { DataGridEditFields } from "@/components/grid/DataGridEditFields";
import { DataGridEditField, DataGridEditFieldType } from "@/components/grid/DataGridEditTypes";
import { DataGridFilterColumns } from "@/components/grid/DataGridFilterColumns";
import { TableGridSettings } from "@/components/grid/TableGrid";

const gridTitle: string = "Quản lý Khóa học";
const gridAddNewLabel: string = "Thêm Khóa học";
const gridUpdateLabel: string = "Cập nhật Khóa học";
const gridDeleteSelectedsLabel: string = "Xóa các Khóa học đã chọn";
const gridTable: string = "courses";
const gridJoins: DataGridTableJoin[] = [];
const gridSearchFields: string[] = ["id", "name"];
const gridFields: string[] = ["id", "name", "alias", "categoryId", "ordering", "status", "image", "amount", "oldAmount"];

const gridColumns: DataGridColumn[] = [
    DataGridColumns.id,
    { index: "image", label: "Hình ảnh", type: DataGridColumnType.IMAGE },
    { index: "name", label: "Tên Khóa học", linkFormat: (value: any, item: any) => `/Table/admin_course/${item.id}/edit`, treeMode: true },
    DataGridColumns.alias,
    DataGridColumns.categoryId,
    { index: "amount", label: "Học phí", type: DataGridColumnType.CURRENCY },
    { index: "oldAmount", label: "Học phí cũ", type: DataGridColumnType.CURRENCY },
    DataGridColumns.ordering,
    DataGridColumns.status,
    { ...DataGridColumns.addChildAction, index: 'addCourseResource', label: 'Thêm Tài nguyên', actionAddChildController: 'admin_course_resource', actionAddChildParentField: 'courseId', actionAddChildParentFields: ['status'] },
    DataGridColumns.editAction,
    DataGridColumns.deleteAction
];

const gridPagination: DataGridPagination = { currentPage: 1, pageSize: 5000 };

const gridFilters: DataGridFilterColumn[] = [
    DataGridFilterColumns.id,
    DataGridFilterColumns.categoryId,
    DataGridFilterColumns.status
];

const gridSortOptions: DataGridSortOption[] = [
    { ...DataGridSortOptions.nameAsc, label: "Tên Khóa học tăng", },
    { ...DataGridSortOptions.nameDesc, label: "Tên Khóa học giảm", },
];

const gridDefaultSorts: DataGridSort[] = [{ index: "ordering", direction: DataGridSortDirection.ASCENDING }];

const gridAddFields: DataGridEditField[] = [
    { ...DataGridEditFields.name, label: "Tên Khóa học" },
    { ...DataGridEditFields.alias, size: 12 },
    { index: "amount", label: "Học phí", type: DataGridEditFieldType.TEXT, size: 2 },
    { index: "oldAmount", label: "Học phí cũ", type: DataGridEditFieldType.TEXT, size: 2 },
    { index: "total_minutes", label: "Tổng số phút", type: DataGridEditFieldType.TEXT, size: 2 },
    { index: "total_lessons", label: "Tổng số bài học", type: DataGridEditFieldType.TEXT, size: 2 },
    DataGridEditFields.image,
    { index: "includes", label: "Khóa học bao gồm", type: DataGridEditFieldType.EDITOR, size: 12 },
    DataGridEditFields.brief,
    DataGridEditFields.content,
    DataGridEditFields.categoryId,
    DataGridEditFields.status
];


export const PmtvAdminCourseSettings: TableGridSettings = {
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
