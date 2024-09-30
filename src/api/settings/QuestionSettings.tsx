import { DataGridColumn, DataGridColumnActionType, DataGridColumnType, DataGridFilterColumn, DataGridFilterColumnType, DataGridPagination, DataGridSort, DataGridSortDirection, DataGridSortOption, DataGridTableJoin } from "@/components/grid/DataGrid";
import { DataGridEditField, DataGridEditFieldType } from "@/components/grid/DataGridEdit";
import { TableGridSettings } from "@/components/grid/TableGrid";

const gridTitle: string = "Quản lý Câu hỏi";
const gridTable: string = "questions";
const gridJoins: DataGridTableJoin[] = [];
const gridSearchFields: string[] = ["id", "name", "name_vn"];
const gridFields: string[] = ["id", "name", "name_vn", "ordering", "status", "trial"];

const gridColumns: DataGridColumn[] = [
    { index: "id", label: "ID", width: "1%" },
    { index: "name", label: "Nội dung", linkFormat: (value: any, item: any) => `/Table/admin_question2/${item.id}/edit`, isHtml: true },
    { index: "ordering", label: "Thứ tự", type: DataGridColumnType.NUMBER, inputable: true },
    {
        index: "status", type: DataGridColumnType.STATUS, label: "Trạng thái", map: {
            0: 'Chưa kích hoạt',
            1: 'Đã kích hoạt'
        },
        hideLabel: true,
        statusToggable: true
    },
    {
        index: "trial", type: DataGridColumnType.STATUS, label: "Dùng thử", map: {
            0: 'Chưa kích hoạt',
            1: 'Đã kích hoạt'
        },
        hideLabel: true,
        statusToggable: true
    },
    { index: "editAction", label: "Sửa", type: DataGridColumnType.ACTIONS, actionType: DataGridColumnActionType.EDIT, width: "1%" },
    { index: "deleteAction", label: "Xóa", type: DataGridColumnType.ACTIONS, actionType: DataGridColumnActionType.DELETE, width: "1%" }
];

const gridPagination: DataGridPagination = {
    currentPage: 1,
    pageSize: 50
};

const gridFilters: DataGridFilterColumn[] = [
    { index: "id", label: "ID", type: DataGridFilterColumnType.TEXT },
    {
        index: "categoryIds", label: "Danh mục", type: DataGridFilterColumnType.SELECT,
        table: "categories",
        valueField: "id",
        labelField: "name",
        select2: true,
        comparisonOperator: "inset",
        treeMode: true,
    },
    {
        index: "testId", label: "Đề thi", type: DataGridFilterColumnType.SELECT,
        table: "tests",
        valueField: "id",
        labelField: "name",
        select2: true,
        comparisonOperator: "inset",
        treeMode: true,
    },
    {
        index: "status", label: "Trạng thái", type: DataGridFilterColumnType.STATUS, map: {
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
        index: "orderingAsc",
        label: "Thứ tự tăng",
        sorts: [
            { index: "ordering", direction: DataGridSortDirection.ASCENDING },
            { index: "id", direction: DataGridSortDirection.DESCENDING },
        ]
    },
    {
        index: "orderingDesc",
        label: "Thứ tự giảm",
        sorts: [
            { index: "ordering", direction: DataGridSortDirection.DESCENDING },
            { index: "id", direction: DataGridSortDirection.ASCENDING },
        ]
    }
];

const gridDefaultSorts: DataGridSort[] = [
    { index: "id", direction: DataGridSortDirection.DESCENDING }
];

const gridAddFields: DataGridEditField[] = [
    { index: "name", label: "Nội dung", type: DataGridEditFieldType.EDITOR, size: 6 },
    { index: "name_vn", label: "Nội dung tiếng Việt", type: DataGridEditFieldType.EDITOR, size: 6 },
    { index: "explaination", label: "Lý giải", type: DataGridEditFieldType.EDITOR, size: 6 },
    { index: "answerTranslation", label: "Câu trả lời (Dịch)", type: DataGridEditFieldType.EDITOR, size: 6 },
    {
        index: "classes", label: "Khối, Lớp", type: DataGridEditFieldType.SELECT, size: 6,
        multiple: true,
        multipleSize: 4,
        options: [
            {
                value: "3",
                label: "Lớp 3"
            }, {
                value: "4",
                label: "Lớp 4"
            }, {
                value: "5",
                label: "Lớp 5"
            }
        ],
        select2: true
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
        select2: true
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
        select2: true
    },
    {
        index: "questionType", label: "Dạng câu hỏi", type: DataGridEditFieldType.SELECT, size: 6,
        options: [
            {
                value: 1,
                label: "Trắc nghiệm"
            }, {
                value: 4,
                label: "Tự luận"
            }
        ],
        select2: true
    },
    {
        index: "status", label: "Trạng thái", type: DataGridEditFieldType.STATUS, size: 6, map: {
            0: 'Chưa kích hoạt',
            1: 'Đã kích hoạt'
        }, statusToggable: true
    },
];


export const AdminQuestionSettings: TableGridSettings = {
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
    deleteSelectedsLabel: "Xóa Câu hỏi đã chọn",
    updateLabel: "Cập nhật Câu hỏi",
}