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

const gridTitle: string = "Quản lý Vở bài tập";
const gridAddNewLabel: string = "Thêm Vở bài tập";
const gridUpdateLabel: string = "Cập nhật Vở bài tập";
const gridDeleteSelectedsLabel: string = "Xóa các Vở bài tập đã chọn";
const gridTable: string = "user_book";
const gridJoins: DataGridTableJoin[] = [];
const gridSearchFields: string[] = ["id", "userId", "categoryId"];
const gridFields: string[] = ["id", "userId", "categoryId", "quantity_question", "status"];

const gridColumns: DataGridColumn[] = [
    DataGridColumns.id,
    { index: "userId", label: "User ID", linkFormat: (value: any, item: any) => `/Table/admin_book/${item.id}/edit` },
    { index: "categoryId", label: "Danh mục" },
    { index: "quantity_question", label: "Số lượng câu hỏi", type: DataGridColumnType.NUMBER },
    DataGridColumns.status,
    DataGridColumns.editAction,
    DataGridColumns.deleteAction
];

const gridPagination: DataGridPagination = { currentPage: 1, pageSize: 200 };

const gridFilters: DataGridFilterColumn[] = [
    DataGridFilterColumns.id,
    DataGridFilterColumns.status
];

const gridSortOptions: DataGridSortOption[] = [
    DataGridSortOptions.idAsc,
    DataGridSortOptions.idDesc,
];

const gridDefaultSorts: DataGridSort[] = [{ index: "id", direction: DataGridSortDirection.DESCENDING }];

const gridAddFields: DataGridEditField[] = [
    { index: "userId", label: "User ID", type: DataGridEditFieldType.TEXT, size: 6 },
    { index: "categoryId", label: "Danh mục", type: DataGridEditFieldType.TEXT, size: 6 },
];


export const FullLookAdminBookSettings: TableGridSettings = {
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