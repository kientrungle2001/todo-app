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