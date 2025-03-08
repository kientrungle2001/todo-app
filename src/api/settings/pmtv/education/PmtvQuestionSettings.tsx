import { DataGridColumn, DataGridFilterColumn, DataGridPagination, DataGridSort, DataGridSortDirection, DataGridSortOption, DataGridSortOptions as sortOptions, DataGridTableJoin } from "@/components/grid/DataGridColumnTypes";
import { DataGridColumns as columns } from "@/components/grid/DataGridColumns";
import { DataGridEditFields as editFields } from "@/components/grid/DataGridEditFields";
import { DataGridEditField } from "@/components/grid/DataGridEditTypes";
import { DataGridFilterColumns as filterFields } from "@/components/grid/DataGridFilterColumns";
import { TableGridSettings } from "@/components/grid/TableGrid";

const gridTitle: string = "Quản lý Câu hỏi";
const gridAddNewLabel: string = "Thêm mới Câu hỏi";
const gridUpdateLabel: string = "Cập nhật Câu hỏi";
const gridDeleteSelectedsLabel: string = "Xóa Câu hỏi đã chọn";
const gridTable: string = "questions";
const gridJoins: DataGridTableJoin[] = [];
const gridSearchFields: string[] = ["id", "name"];
const gridFields: string[] = ["id", "name", "ordering", "status", "trial", "categoryIds", "courseId", "courseResourceId", "questionType"];

const gridColumns: DataGridColumn[] = [
    columns.id,
    {
        ...columns.question_content,
        linkFormat: (value: any, item: any) => `/Table/admin_question2/${item.id}/` + (item.questionType == 4 ? 'edit' : 'detail'),
    },
    columns.categoryIds,
    columns.courseId,
    columns.courseResourceId,
    columns.ordering,
    columns.status,
    columns.trial,
    columns.editAction,
    columns.deleteAction
];

const gridPagination: DataGridPagination = { currentPage: 1, pageSize: 50 };

const gridFilters: DataGridFilterColumn[] = [
    filterFields.categoryIds,
    { ...filterFields.courseId, tableCondition: (item) => "categoryId = '" + item.categoryIds + "'" },
    { ...filterFields.courseResourceId, tableCondition: (item) => "courseId = '" + item.courseId + "'" },
    filterFields.status,
];

const gridSortOptions: DataGridSortOption[] = [
    sortOptions.orderingAsc,
    sortOptions.orderingDesc,
];

const gridDefaultSorts: DataGridSort[] = [{ index: "id", direction: DataGridSortDirection.DESCENDING }];

const gridAddFields: DataGridEditField[] = [
    { ...editFields.question_content, tabGroup: "2name" },
    { ...editFields.explaination, tabGroup: "3explaination" },
    { ...editFields.classes, tabGroup: "0classification" },
    { ...editFields.courseId, tabGroup: "0classification" },
    { ...editFields.courseResourceId, tabGroup: "0classification" },
    { ...editFields.categoryIds, tabGroup: "0classification" },
    { ...editFields.questionType, tabGroup: "0classification" },
    editFields.status,
];

export const PmtvAdminQuestionSettings: TableGridSettings = {
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
}
