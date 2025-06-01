import { DataGridPagination as Pagination } from "@/types/grid/DataGridPagination";
import { DataGridSortOption as SortOption } from "@/types/grid/DataGridSortOption";
import { DataGridSortDirection as SortDirection } from "@/types/grid/DataGridSortDirection";
import { DataGridSort as Sort } from "@/types/grid/DataGridSort";
import { DataGridFilterColumn as FilterField } from "@/types/grid/DataGridFilterColumn";
import { DataGridColumn as Column } from "@/types/grid/DataGridColumn";
import { DataGridColumns as columns } from "@/components/grid/DataGridColumns";
import { DataGridEditFields as editFields } from "@/components/grid/DataGridEditFields";
import { DataGridEditField as EditField, DataGridEditFieldType as EditType } from "@/components/grid/DataGridEditTypes";
import { DataGridFilterColumns as filterFields } from "@/components/grid/DataGridFilterColumns";
import { TableGridSettings as Settings } from "@/types/TableGridSettings";

const gridTitle: string = "Quản lý Đề thi";
const gridAddNewLabel: string = "Thêm Đề thi";
const gridUpdateLabel: string = "Cập nhật Đề thi";
const gridDeleteSelectedsLabel: string = "Xóa các Đề thi đã chọn";
const gridTable: string = "tests";
const gridSearchFields: string[] = ["id", "name"];
const gridFields: string[] = ["id", "name", "ordering", "status", "trial"];

const gridColumns: Column[] = [
    columns.id,
    { index: "name", label: "Tên Đề thi", linkFormat: (value: any, item: any) => `/Table/admin_test/${item.id}/detail`, treeMode: true },
    columns.ordering,
    columns.status,
    columns.trial,
    columns.document,
    columns.editAction,
    columns.deleteAction
];

const gridPagination: Pagination = { currentPage: 1, pageSize: 5000 };

const gridFilters: FilterField[] = [
    filterFields.id,
    filterFields.status,
    filterFields.trial,
];

const gridSortOptions: SortOption[] = [
    {
        index: "nameAsc",
        label: "Tên Đề thi tăng",
        sorts: [
            { index: "name", direction: SortDirection.ASCENDING },
            { index: "id", direction: SortDirection.DESCENDING },
        ]
    },
    {
        index: "nameDesc",
        label: "Tên Đề thi giảm",
        sorts: [
            { index: "name", direction: SortDirection.DESCENDING },
            { index: "id", direction: SortDirection.ASCENDING },
        ]
    }
];

const gridDefaultSorts: Sort[] = [{ index: "ordering", direction: SortDirection.ASCENDING }];

const gridAddFields: EditField[] = [
    { index: "name", label: "Tên Đề thi", type: EditType.TEXT, size: 6 },
    { index: "content", label: "Nội dung", type: EditType.EDITOR, size: 12 },
    {
        index: "categoryIds", label: "Danh mục", type: EditType.SELECT, size: 6,
        table: "categories", valueField: "id", labelField: "name", treeMode: true, parentField: "parent", orderBy: "ordering asc", multiple: true, select2: true
    },
    editFields.status,
];


export const PmtvAdminTestSettings: Settings = {
    title: gridTitle,
    table: gridTable,
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
