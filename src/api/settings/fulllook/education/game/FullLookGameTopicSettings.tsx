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

const gridTitle: string = "Quản lý Game Topic";
const gridAddNewLabel: string = "Thêm Game Topic";
const gridUpdateLabel: string = "Cập nhật Game Topic";
const gridDeleteSelectedsLabel: string = "Xóa các Game Topic đã chọn";
const gridTable: string = "game_topic";
const gridJoins: DataGridTableJoin[] = [];
const gridSearchFields: string[] = ["game_topic"];
const gridFields: string[] = ["id", "game_topic", "status", "parent"];

const gridColumns: DataGridColumn[] = [
    DataGridColumns.id,
    { index: "game_topic", label: "Tên Game Topic", treeMode: true },
    DataGridColumns.status,
    DataGridColumns.editAction,
    DataGridColumns.deleteAction,
];

const gridPagination: DataGridPagination = { currentPage: 1, pageSize: 200 };

const gridFilters: DataGridFilterColumn[] = [
    DataGridFilterColumns.id,
    DataGridFilterColumns.status
];

const gridSortOptions: DataGridSortOption[] = [
    DataGridSortOptions.id,
    DataGridSortOptions.status
];

const gridDefaultSorts: DataGridSort[] = [{ index: "id", direction: DataGridSortDirection.DESCENDING }];

const gridAddFields: DataGridEditField[] = [
];


export const FullLookAdminGameTopicSettings: TableGridSettings = {
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
    treeMode: true,
}