import { DataGridSortOptions } from "@/components/grid/DataGridColumnTypes";
import { DataGridPagination } from "@/types/grid/DataGridPagination";
import { DataGridSortOption } from "@/types/grid/DataGridSortOption";
import { DataGridSortDirection } from "@/types/grid/DataGridSortDirection";
import { DataGridSort } from "@/types/grid/DataGridSort";
import { DataGridFilterColumn } from "@/types/grid/DataGridFilterColumn";
import { DataGridTableJoin } from "@/types/grid/DataGridTableJoin";
import { DataGridColumnType } from "@/types/grid/DataGridColumnType";
import { DataGridColumn } from "@/types/grid/DataGridColumn";
import { DataGridColumns } from "@/components/grid/DataGridColumns";
import { DataGridEditField, DataGridEditFieldType } from "@/components/grid/DataGridEditTypes";
import { DataGridFilterColumns } from "@/components/grid/DataGridFilterColumns";
import { TableGridSettings } from "@/types/TableGridSettings";

const gridTitle: string = "Quản lý Câu hỏi";
const gridAddNewLabel: string = "Thêm mới Câu hỏi";
const gridUpdateLabel: string = "Cập nhật Câu hỏi";
const gridDeleteSelectedsLabel: string = "Xóa Câu hỏi đã chọn";
const gridTable: string = "questions";
const gridJoins: DataGridTableJoin[] = [];
const gridSearchFields: string[] = ["id", "name", "name_vn"];
const gridFields: string[] = ["id", "name", "name_vn", "ordering", "status", "trial", "categoryIds", "testId"];

const gridColumns: DataGridColumn[] = [
    DataGridColumns.id,
    
    {
        index: "cattest", label: "Câu hỏi",
        type: DataGridColumnType.GROUP,
        groupChildren: [
            {
                index: "categoryIds",
                label: "Danh mục",
                type: DataGridColumnType.REFERENCE,
                referenceTable: "categories",
                referenceField: "name"
            },
            {
                index: "testId",
                label: "Đề thi",
                type: DataGridColumnType.REFERENCE,
                referenceTable: "tests",
                referenceField: "name"
            },
            {
                index: "name", label: "Nội dung",
                linkFormat: (value: any, item: any) => `/Table/admin_question2/${item.id}/detail`,
                isHtml: true
            },
        ]
    },

    DataGridColumns.ordering,
    DataGridColumns.status,
    DataGridColumns.trial,
    DataGridColumns.editAction,
    DataGridColumns.deleteAction
];

const gridPagination: DataGridPagination = { currentPage: 1, pageSize: 50 };

const gridFilters: DataGridFilterColumn[] = [
    DataGridFilterColumns.id,
    DataGridFilterColumns.categoryIds,
    DataGridFilterColumns.testId,
    DataGridFilterColumns.status,
    DataGridFilterColumns.trial,
];

const gridSortOptions: DataGridSortOption[] = [
    DataGridSortOptions.orderingAsc,
    DataGridSortOptions.orderingDesc,
];

const gridDefaultSorts: DataGridSort[] = [{ index: "id", direction: DataGridSortDirection.DESCENDING }];

const gridAddFields: DataGridEditField[] = [
    { index: "name", label: "Nội dung", type: DataGridEditFieldType.EDITOR, size: 6, tabGroup: "2name" },
    { index: "name_vn", label: "Nội dung tiếng Việt", type: DataGridEditFieldType.EDITOR, size: 6, tabGroup: "2name" },
    { index: "explaination", label: "Lý giải", type: DataGridEditFieldType.EDITOR, size: 6, tabGroup: "3explaination" },
    { index: "answerTranslation", label: "Câu trả lời (Dịch)", type: DataGridEditFieldType.EDITOR, size: 6, tabGroup: "3explaination" },
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
        index: "testId", label: "Đề thi", type: DataGridEditFieldType.SELECT, size: 6,
        multiple: true,
        table: "tests",
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
    {
        index: "status", label: "Trạng thái", type: DataGridEditFieldType.STATUS, size: 6, map: {
            0: 'Chưa kích hoạt',
            1: 'Đã kích hoạt'
        }, statusToggable: true
    },
];

export const FullLookAdminQuestionSettings: TableGridSettings = {
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
