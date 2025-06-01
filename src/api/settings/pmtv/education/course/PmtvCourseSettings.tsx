import { DataGridSortOptions as SortOptions } from "@/components/grid/DataGridSortOptions";
import { DataGridPagination as Pagination } from "@/types/grid/DataGridPagination";
import { DataGridSortOption as SortOption } from "@/types/grid/DataGridSortOption";
import { DataGridSortDirection as SortDirection } from "@/types/grid/DataGridSortDirection";
import { DataGridSort as Sort } from "@/types/grid/DataGridSort";
import { DataGridFilterColumn as FilterField } from "@/types/grid/DataGridFilterColumn";
import { DataGridColumnType as ColumnType } from "@/types/grid/DataGridColumnType";
import { DataGridColumn as Column } from "@/types/grid/DataGridColumn";
import { DataGridColumns as columns } from "@/components/grid/DataGridColumns";
import { DataGridEditFields as editFields } from "@/components/grid/DataGridEditFields";
import { DataGridEditField as EditField } from "@/types/edit/DataGridEditField";
import { DataGridEditFieldType as EditType } from "@/types/edit/DataGridEditFieldType";
import { DataGridFilterColumns as filterFields } from "@/components/grid/DataGridFilterColumns";
import { TableGridSettings as Settings } from "@/types/TableGridSettings";

const gridTitle: string = "Quản lý Khóa học";
const gridAddNewLabel: string = "Thêm Khóa học";
const gridUpdateLabel: string = "Cập nhật Khóa học";
const gridDeleteSelectedsLabel: string = "Xóa các Khóa học đã chọn";
const gridTable: string = "courses";
const gridSearchFields: string[] = ["id", "name"];
const gridFields: string[] = ["id", "name", "alias", "categoryId", "ordering", "status", "image", "amount", "oldAmount"];

const gridColumns: Column[] = [
    columns.id,
    { index: "image", label: "Hình ảnh", type: ColumnType.IMAGE },
    { index: "name", label: "Tên Khóa học", linkFormat: (value: any, item: any) => `/Table/admin_course/${item.id}/edit`, treeMode: true },
    columns.alias,
    columns.categoryId,
    { index: "amount", label: "Học phí", type: ColumnType.CURRENCY },
    { index: "oldAmount", label: "Học phí cũ", type: ColumnType.CURRENCY },
    columns.ordering,
    columns.status,
    { ...columns.addChildAction, index: 'addCourseResource', label: 'Thêm Tài nguyên', actionAddChildController: 'admin_course_resource', actionAddChildParentField: 'courseId', actionAddChildParentFields: ['status'] },
    columns.editAction,
    columns.deleteAction
];

const gridPagination: Pagination = { currentPage: 1, pageSize: 5000 };

const gridFilters: FilterField[] = [
    filterFields.id,
    filterFields.categoryId,
    filterFields.status
];

const gridSortOptions: SortOption[] = [
    { ...SortOptions.nameAsc, label: "Tên Khóa học tăng", },
    { ...SortOptions.nameDesc, label: "Tên Khóa học giảm", },
];

const gridDefaultSorts: Sort[] = [{ index: "ordering", direction: SortDirection.ASCENDING }];

const gridAddFields: EditField[] = [
    { ...editFields.name, label: "Tên Khóa học" },
    { ...editFields.alias, size: 12 },
    { index: "amount", label: "Học phí", type: EditType.TEXT, size: 2 },
    { index: "oldAmount", label: "Học phí cũ", type: EditType.TEXT, size: 2 },
    { index: "total_minutes", label: "Tổng số phút", type: EditType.TEXT, size: 2 },
    { index: "total_lessons", label: "Tổng số bài học", type: EditType.TEXT, size: 2 },
    editFields.image,
    { index: "includes", label: "Khóa học bao gồm", type: EditType.EDITOR, size: 12 },
    editFields.brief,
    editFields.content,
    editFields.categoryId,
    editFields.status
];


export const PmtvAdminCourseSettings: Settings = {
    title: gridTitle,
    table: gridTable,
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
