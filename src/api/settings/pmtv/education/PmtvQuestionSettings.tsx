import { DataGridColumn, DataGridFilterColumn, DataGridPagination, DataGridSort, DataGridSortDirection, DataGridSortOption, DataGridSortOptions as sortOptions, DataGridTableJoin } from "@/components/grid/DataGridColumnTypes";
import { DataGridColumns as columns } from "@/components/grid/DataGridColumns";
import { DataGridEditFields as editFields } from "@/components/grid/DataGridEditFields";
import { DataGridEditField, DataGridEditFieldType as EditType } from "@/components/grid/DataGridEditTypes";
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
        index: "name", label: "Nội dung", isHtml: true,
        linkFormat: (value: any, item: any) => {
            if (item.questionType == 4 || item.questionType == '4') {
                return `/Table/admin_question2/${item.id}/edit`;
            }
            return `/Table/admin_question2/${item.id}/detail`;
        },
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
    { index: "name", label: "Nội dung", type: EditType.EDITOR, size: 6, tabGroup: "2name" },
    { index: "explaination", label: "Lý giải", type: EditType.EDITOR, size: 6, tabGroup: "3explaination" },
    {
        index: "classes", label: "Khối, Lớp", type: EditType.SELECT, size: 6,
        multiple: true,
        multipleSize: 4,
        options: [
            { value: "3", label: "Lớp 3" },
            { value: "4", label: "Lớp 4" },
            { value: "5", label: "Lớp 5" }
        ],
        select2: true,
        tabGroup: "0classification"
    },
    {
        index: "courseId", label: "Khóa học", type: EditType.SELECT, size: 6,
        table: "courses", valueField: "id", labelField: "name", orderBy: "name asc", multiple: false, select2: true,
        tabGroup: "0classification"
    },
    {
        index: "courseResourceId", label: "Tài nguyên Khóa học", type: EditType.SELECT, size: 6,
        table: "courses_resources", valueField: "id", labelField: "name", treeMode: true,
        tableCondition: (item) => "courseId = '" + item.courseId + "'", select2: true,
        tabGroup: "0classification"
    },
    {
        index: "categoryIds", label: "Danh mục", type: EditType.SELECT, size: 6,
        multiple: true,
        table: "categories",
        valueField: "id",
        labelField: "name",
        treeMode: true,
        parentField: "parent",
        multipleSize: 10,
        select2: true,
        tabGroup: "0classification"
    },
    {
        index: "questionType", label: "Dạng câu hỏi", type: EditType.SELECT, size: 6,
        options: [
            { value: 1, label: "Trắc nghiệm" },
            { value: 4, label: "Tự luận" }
        ],
        select2: true,
        tabGroup: "0classification"
    },
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
