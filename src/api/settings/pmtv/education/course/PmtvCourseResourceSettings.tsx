import { DataGridSortOptions as SortOptions } from "@/components/grid/DataGridSortOptions";
import { DataGridPagination as Pagination } from "@/types/grid/DataGridPagination";
import { DataGridSortOption as SortOption } from "@/types/grid/DataGridSortOption";
import { DataGridSortDirection as SortDirection } from "@/types/grid/DataGridSortDirection";
import { DataGridSort as Sort } from "@/types/grid/DataGridSort";
import { DataGridFilterColumn as FilterField } from "@/types/grid/DataGridFilterColumn";
import { DataGridTableJoin as Join } from "@/types/grid/DataGridTableJoin";
import { DataGridColumn as Column } from "@/types/grid/DataGridColumn";
import { DataGridColumns as columns } from "@/components/grid/DataGridColumns";
import { DataGridEditFields as editFields } from "@/components/grid/DataGridEditFields";
import { DataGridEditField as EditField } from "@/types/edit/DataGridEditField";
import { DataGridEditFieldType as EditType } from "@/types/edit/DataGridEditFieldType";
import { DataGridFilterColumns as filterFields } from "@/components/grid/DataGridFilterColumns";
import { TableGridSettings as Settings } from "@/types/TableGridSettings";

const gridTitle: string = "Quản lý Tài nguyên Khóa học";
const gridAddNewLabel: string = "Thêm Tài nguyên Khóa học";
const gridUpdateLabel: string = "Cập nhật Tài nguyên Khóa học";
const gridDeleteSelectedsLabel: string = "Xóa các Tài nguyên Khóa học đã chọn";
const gridTable: string = "courses_resources";
const gridJoins: Join[] = [
    {
        table: 'courses',
        alias: 'c',
        type: 'left',
        condition: 't.courseId=c.id'
    }
];
const gridSearchFields: string[] = ["id", "name"];
const gridFields: string[] = ["id", "parent", "name", "alias", "courseId", "ordering", "status", "image", "type", "c.categoryId as categoryIds", '1.0 as questionType'];

const gridColumns: Column[] = [
    columns.id,
    {
        index: "name", label: "Tên Tài nguyên Khóa học",
        linkFormat: (value: any, item: any) => `/Table/admin_course_resource/${item.id}/detail`,
        treeMode: true
    },
    columns.alias,
    columns.courseId,
    columns.ordering,
    columns.status,
    { ...columns.addChildAction, actionAddChildParentFields: ['courseId', 'status'] },
    { ...columns.addChildAction, index: 'addQuestion', label: 'Thêm câu hỏi', actionAddChildController: 'admin_question2', actionAddChildParentField: 'courseResourceId', actionAddChildParentFields: ['courseId', 'status', 'categoryIds', 'questionType'] },
    columns.editAction,
    columns.deleteAction
];

const gridPagination: Pagination = { currentPage: 1, pageSize: 5000 };

const gridFilters: FilterField[] = [
    filterFields.id,
    filterFields.courseId,
    filterFields.status
];

const gridSortOptions: SortOption[] = [
    { ...SortOptions.nameAsc, label: "Tên Tài nguyên Khóa học tăng" },
    { ...SortOptions.nameDesc, label: "Tên Tài nguyên Khóa học giảm" },
];

const gridDefaultSorts: Sort[] = [{ index: "ordering", direction: SortDirection.ASCENDING }];

const gridAddFields: EditField[] = [
    editFields.courseId,
    {
        index: "parent", label: "Mục cha", type: EditType.SELECT, size: 8,
        table: "courses_resources", valueField: "id", labelField: "name", treeMode: true,
        tableCondition: (item) => "courseId = '" + item.courseId + "' and id <> '" + (item.id ?? 0) + "'",
    },
    { ...editFields.name, label: "Tên Tài nguyên Khóa học", size: 12 },
    { ...editFields.alias, size: 12 },
    editFields.type,
    editFields.image,
    editFields.brief,
    editFields.content,
    editFields.hardiness,
    editFields.totalMinutes,
    editFields.trial,
    editFields.status,
];


export const PmtvAdminCourseResourceSettings: Settings = {
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
