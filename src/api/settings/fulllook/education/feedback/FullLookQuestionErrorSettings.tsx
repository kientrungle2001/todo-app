import { DataGridSortOptions } from "@/components/grid/DataGridSortOptions";
import { DataGridPagination } from "@/types/grid/DataGridPagination";
import { DataGridSortOption } from "@/types/grid/DataGridSortOption";
import { DataGridSortDirection } from "@/types/grid/DataGridSortDirection";
import { DataGridSort } from "@/types/grid/DataGridSort";
import { DataGridFilterColumn } from "@/types/grid/DataGridFilterColumn";
import { DataGridTableJoin } from "@/types/grid/DataGridTableJoin";
import { DataGridColumn } from "@/types/grid/DataGridColumn";
import { DataGridColumns } from "@/components/grid/DataGridColumns";
import { DataGridEditField } from "@/types/edit/DataGridEditField";
import { DataGridFilterColumns } from "@/components/grid/DataGridFilterColumns";
import { TableGridSettings } from "@/types/TableGridSettings";

const gridTitle: string = "Quản lý Báo lỗi câu hỏi";
const gridAddNewLabel: string = "Thêm mới Báo lỗi câu hỏi";
const gridUpdateLabel: string = "Cập nhật Báo lỗi câu hỏi";
const gridDeleteSelectedsLabel: string = "Xóa các Báo lỗi câu hỏi đã chọn";
const gridTable: string = "question_error";
const gridJoins: DataGridTableJoin[] = [];
const gridSearchFields: string[] = ["id", "content", "username", "email", "phone", "note", "browser", "os", "userAgent"];
const gridFields: string[] = ["id", "content", "username", "email", "phone", "note", "browser", "os", "userAgent", "categoryId", "topic", "parentTest", "testId", "exercise_number"];

const gridColumns: DataGridColumn[] = [
    DataGridColumns.id,
    { index: "content", label: "Nội dung", width: "600px" },
    { index: "username", label: "Tên đăng nhập" },
    { index: "email", label: "Email" },
    { index: "phone", label: "Số điện thoại" },
    { index: "note", label: "Ghi chú" },
    DataGridColumns.editAction,
    DataGridColumns.deleteAction,
];

const gridPagination: DataGridPagination = { currentPage: 1, pageSize: 200 };

const gridFilters: DataGridFilterColumn[] = [
    DataGridFilterColumns.id,
];

const gridSortOptions: DataGridSortOption[] = [
    DataGridSortOptions.idAsc,
    DataGridSortOptions.idDesc,
];

const gridDefaultSorts: DataGridSort[] = [{ index: "id", direction: DataGridSortDirection.DESCENDING }];

const gridAddFields: DataGridEditField[] = [

];


export const FullLookAdminQuestionErrorSettings: TableGridSettings = {
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