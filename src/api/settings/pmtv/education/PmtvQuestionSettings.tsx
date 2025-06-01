import { DataGridSortOptions as sortOptions } from "@/components/grid/DataGridSortOptions";
import { DataGridPagination as Pagination } from "@/types/grid/DataGridPagination";
import { DataGridSortOption as SortOption } from "@/types/grid/DataGridSortOption";
import { DataGridSortDirection as SortDirection } from "@/types/grid/DataGridSortDirection";
import { DataGridSort as Sort } from "@/types/grid/DataGridSort";
import { DataGridFilterColumn as FilterField } from "@/types/grid/DataGridFilterColumn";
import { DataGridColumn as Column } from "@/types/grid/DataGridColumn";
import { DataGridColumns as columns } from "@/components/grid/DataGridColumns";
import { DataGridEditFields as editFields } from "@/components/grid/DataGridEditFields";
import { DataGridEditField as EditField } from "@/types/edit/DataGridEditField";
import { DataGridFilterColumns as filterFields } from "@/components/grid/DataGridFilterColumns";
import { TableGridSettings as Settings } from "@/types/TableGridSettings";

const gridTitle: string = "Quản lý Câu hỏi";
const gridAddNewLabel: string = "Thêm mới Câu hỏi";
const gridUpdateLabel: string = "Cập nhật Câu hỏi";
const gridDeleteSelectedsLabel: string = "Xóa Câu hỏi đã chọn";
const gridTable: string = "questions";
const gridSearchFields: string[] = ["id", "name"];
const gridFields: string[] = ["id", "name", "ordering", "status", "trial", "categoryIds", "courseId", "courseResourceId", "questionType"];
const formatQuestionLink = (value: any, item: any) => `/Table/admin_question2/${item.id}/` + (item.questionType == 4 ? 'edit' : 'detail');
const gridColumns: Column[] = [
    columns.id,
    { ...columns.question_content, linkFormat: formatQuestionLink },
    columns.categoryIds,
    columns.courseId,
    columns.courseResourceId,
    columns.ordering,
    columns.status,
    columns.trial,
    columns.editAction,
    columns.deleteAction
];

const gridPagination: Pagination = { currentPage: 1, pageSize: 50 };

const gridFilters: FilterField[] = [
    filterFields.categoryIds,
    { ...filterFields.courseId, tableCondition: (item) => "categoryId = '" + item.categoryIds + "'" },
    { ...filterFields.courseResourceId, tableCondition: (item) => "courseId = '" + item.courseId + "'" },
    filterFields.status,
];

const gridSortOptions: SortOption[] = [
    sortOptions.orderingAsc,
    sortOptions.orderingDesc,
];

const gridDefaultSorts: Sort[] = [{ index: "id", direction: SortDirection.DESCENDING }];

const gridAddFields: EditField[] = [
    { ...editFields.question_content, tabGroup: "2name" },
    { ...editFields.explaination, tabGroup: "3explaination" },
    { ...editFields.classes, tabGroup: "0classification" },
    { ...editFields.courseId, tabGroup: "0classification" },
    { ...editFields.courseResourceId, tabGroup: "0classification" },
    { ...editFields.categoryIds, tabGroup: "0classification" },
    { ...editFields.questionType, tabGroup: "0classification" },
    editFields.status,
];

export const PmtvAdminQuestionSettings: Settings = {
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
}
