import { DataGridColumn, DataGridColumnType, DataGridFilterColumn, DataGridPagination, DataGridSort, DataGridSortDirection, DataGridSortOption, DataGridSortOptions, DataGridTableJoin } from "@/components/grid/DataGridColumnTypes";
import { DataGridColumns } from "@/components/grid/DataGridColumns";
import { DataGridEditField, DataGridEditFieldType } from "@/components/grid/DataGridEditTypes";
import { DataGridFilterColumns } from "@/components/grid/DataGridFilterColumns";
import { TableGridSettings } from "@/components/grid/TableGrid";

const gridTitle: string = "Quản lý Hỏi đáp";
const gridAddNewLabel: string = "Thêm Hỏi đáp";
const gridUpdateLabel: string = "Cập nhật Hỏi đáp";
const gridDeleteSelectedsLabel: string = "Xóa các Hỏi đáp đã chọn";
const gridTable: string = "aqs_question";
const gridJoins: DataGridTableJoin[] = [];
const gridSearchFields: string[] = ["id", "question", "username"];
const gridFields: string[] = ["id", "question", "answer", "userId", "software", "username", "status"];

const gridColumns: DataGridColumn[] = [
    DataGridColumns.id,
    { index: "question", label: "Nội dung câu hỏi", linkFormat: (value: any, item: any) => `/Table/admin_aqsquestion/${item.id}/edit` },
    {
        index: "answer", label: "Số câu trả lời", type: DataGridColumnType.NUMBER, inputable: true
    },
    { index: "username", label: "Tên người dùng" },
    DataGridColumns.status,
    DataGridColumns.editAction,
    DataGridColumns.deleteAction
];

const gridPagination: DataGridPagination = {
    currentPage: 1,
    pageSize: 50
};

const gridFilters: DataGridFilterColumn[] = [
    DataGridFilterColumns.id,
    DataGridFilterColumns.status
];

const gridSortOptions: DataGridSortOption[] = [
    DataGridSortOptions.idAsc,
    DataGridSortOptions.idDesc,
];

const gridDefaultSorts: DataGridSort[] = [{ index: "id", direction: DataGridSortDirection.ASCENDING }];

const gridAddFields: DataGridEditField[] = [
    { index: "question", label: "Câu hỏi", type: DataGridEditFieldType.TEXT, size: 6 },
    {
        index: "status", label: "Trạng thái", type: DataGridEditFieldType.STATUS, size: 6, map: {
            0: 'Chưa kích hoạt',
            1: 'Đã kích hoạt'
        }, statusToggable: true
    },
];


export const FullLookAdminAQSQuestionSettings: TableGridSettings = {
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