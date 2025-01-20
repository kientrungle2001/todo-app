import { DataGridColumn, DataGridFilterColumn, DataGridFilterColumns, DataGridPagination, DataGridSort, DataGridSortDirection, DataGridSortOption, DataGridSortOptions, DataGridTableJoin } from "@/components/grid/DataGridColumnTypes";
import { DataGridColumns } from "@/components/grid/DataGridColumns";
import { DataGridEditFields } from "@/components/grid/DataGridEditFields";
import { DataGridEditField, DataGridEditFieldType } from "@/components/grid/DataGridEditTypes";
import { TableGridSettings } from "@/components/grid/TableGrid";

const gridTitle: string = "Quản lý Câu hỏi";
const gridAddNewLabel: string = "Thêm mới Câu hỏi";
const gridUpdateLabel: string = "Cập nhật Câu hỏi";
const gridDeleteSelectedsLabel: string = "Xóa Câu hỏi đã chọn";
const gridTable: string = "questions";
const gridJoins: DataGridTableJoin[] = [];
const gridSearchFields: string[] = ["id", "name"];
const gridFields: string[] = ["id", "name", "ordering", "status", "trial", "categoryIds", "courseId", "courseResourceId"];

const gridColumns: DataGridColumn[] = [
    DataGridColumns.id,
    {
        index: "name", label: "Nội dung", isHtml: true,
        linkFormat: (value: any, item: any) => `/Table/admin_question2/${item.id}/detail`,
    },
    DataGridColumns.categoryIds,
    DataGridColumns.courseId,
    DataGridColumns.courseResourceId,
    DataGridColumns.ordering,
    DataGridColumns.status,
    DataGridColumns.trial,
    DataGridColumns.editAction,
    DataGridColumns.deleteAction
];

const gridPagination: DataGridPagination = { currentPage: 1, pageSize: 50 };

const gridFilters: DataGridFilterColumn[] = [
    DataGridFilterColumns.categoryIds,
    { ...DataGridFilterColumns.courseId, tableCondition: (item) => "categoryId = '" + item.categoryIds + "'" },
    { ...DataGridFilterColumns.courseResourceId, tableCondition: (item) => "courseId = '" + item.courseId + "'" },
    DataGridFilterColumns.status,
];

const gridSortOptions: DataGridSortOption[] = [
    DataGridSortOptions.orderingAsc,
    DataGridSortOptions.orderingDesc,
];

const gridDefaultSorts: DataGridSort[] = [{ index: "id", direction: DataGridSortDirection.DESCENDING }];

const gridAddFields: DataGridEditField[] = [
    { index: "name", label: "Nội dung", type: DataGridEditFieldType.EDITOR, size: 6, tabGroup: "2name" },
    { index: "explaination", label: "Lý giải", type: DataGridEditFieldType.EDITOR, size: 6, tabGroup: "3explaination" },
    {
        index: "classes", label: "Khối, Lớp", type: DataGridEditFieldType.SELECT, size: 6,
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
        index: "courseId", label: "Khóa học", type: DataGridEditFieldType.SELECT, size: 6,
        table: "courses", valueField: "id", labelField: "name", orderBy: "name asc", multiple: false, select2: true,
        tabGroup: "0classification"
    },
    {
        index: "courseResourceId", label: "Tài nguyên Khóa học", type: DataGridEditFieldType.SELECT, size: 6,
        table: "courses_resources", valueField: "id", labelField: "name", treeMode: true,
        tableCondition: (item) => "courseId = '" + item.courseId + "'", select2: true,
        tabGroup: "0classification"
    },
    {
        index: "categoryIds", label: "Danh mục", type: DataGridEditFieldType.SELECT, size: 6,
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
        index: "questionType", label: "Dạng câu hỏi", type: DataGridEditFieldType.SELECT, size: 6,
        options: [
            { value: 1, label: "Trắc nghiệm" },
            { value: 4, label: "Tự luận" }
        ],
        select2: true,
        tabGroup: "0classification"
    },
    DataGridEditFields.status,
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
