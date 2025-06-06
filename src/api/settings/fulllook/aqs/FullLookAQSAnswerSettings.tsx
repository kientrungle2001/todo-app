import { DataGridSortOptions } from "@/components/grid/DataGridSortOptions";
import { DataGridPagination } from "@/types/grid/DataGridPagination";
import { DataGridSortOption } from "@/types/grid/DataGridSortOption";
import { DataGridSortDirection } from "@/types/grid/DataGridSortDirection";
import { DataGridSort } from "@/types/grid/DataGridSort";
import { DataGridFilterColumn } from "@/types/grid/DataGridFilterColumn";
import { DataGridTableJoin } from "@/types/grid/DataGridTableJoin";
import { DataGridColumnType } from "@/types/grid/DataGridColumnType";
import { DataGridColumn } from "@/types/grid/DataGridColumn";
import { DataGridColumns } from "@/components/grid/DataGridColumns";
import { DataGridEditField } from "@/types/edit/DataGridEditField";
import { DataGridEditFieldType } from "@/types/edit/DataGridEditFieldType";
import { DataGridFilterColumns } from "@/components/grid/DataGridFilterColumns";
import { TableGridSettings } from "@/types/TableGridSettings";

const gridTitle: string = "Quản lý Trả lời Hỏi đáp";
const gridAddNewLabel: string = "Thêm Trả lời Hỏi đáp";
const gridUpdateLabel: string = "Cập nhật Trả lời Hỏi đáp";
const gridDeleteSelectedsLabel: string = "Xóa các Trả lời Hỏi đáp đã chọn";
const gridTable: string = "aqs_answer";
const gridJoins: DataGridTableJoin[] = [
    {
        table: "aqs_question",
        alias: "q",
        type: "left",
        condition: "t.questionId = q.id"
    }
];
const gridSearchFields: string[] = ["id", "answer", "username"];
const gridFields: string[] = ["id", "q.question as question", "answer", "userId", "software", "username", "status"];

const gridColumns: DataGridColumn[] = [
    DataGridColumns.id,
    { index: "question", label: "Nội dung câu hỏi" },
    {
        index: "answer", label: "câu trả lời", type: DataGridColumnType.TEXT, linkFormat: (value: any, item: any) => `/Table/admin_aqsanswer/${item.id}/edit`
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
    { index: "answer", label: "Câu trả lời", type: DataGridEditFieldType.TEXT, size: 6 },
    {
        index: "status", label: "Trạng thái", type: DataGridEditFieldType.STATUS, size: 6, map: {
            0: 'Chưa kích hoạt',
            1: 'Đã kích hoạt'
        }, statusToggable: true
    },
];


export const FullLookAdminAQSAnswerSettings: TableGridSettings = {
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