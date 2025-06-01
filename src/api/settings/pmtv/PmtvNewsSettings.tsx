import { DataGridPagination } from "@/types/grid/DataGridPagination";
import { DataGridSortOption } from "@/types/grid/DataGridSortOption";
import { DataGridSortDirection } from "@/types/grid/DataGridSortDirection";
import { DataGridSort } from "@/types/grid/DataGridSort";
import { DataGridFilterColumn } from "@/types/grid/DataGridFilterColumn";
import { DataGridTableJoin } from "@/types/grid/DataGridTableJoin";
import { DataGridColumnType } from "@/types/grid/DataGridColumnType";
import { DataGridColumn } from "@/types/grid/DataGridColumn";
import { DataGridColumns } from "@/components/grid/DataGridColumns";
import { DataGridEditFields } from "@/components/grid/DataGridEditFields";
import { DataGridEditField } from "@/types/edit/DataGridEditField";
import { DataGridEditFieldType } from "@/types/edit/DataGridEditFieldType";
import { DataGridFilterColumns } from "@/components/grid/DataGridFilterColumns";
import { TableGridSettings } from "@/types/TableGridSettings";

const gridTitle: string = "Quản lý Tin tức";
const gridAddNewLabel: string = "Thêm Tin tức";
const gridUpdateLabel: string = "Cập nhật Tin tức";
const gridDeleteSelectedsLabel: string = "Xóa các Tin tức đã chọn";
const gridTable: string = "news";
const gridJoins: DataGridTableJoin[] = [];
const gridSearchFields: string[] = ["id", "title", "brief", "content"];
const gridFields: string[] = ["id", "title", "categoryId", "brief", "content", "views", "comments", "img", "alias", "file", "ordering", "meta_keywords", "meta_description", "startDate", "endDate", "status"];

const gridColumns: DataGridColumn[] = [
    DataGridColumns.id,
    { index: "img", label: "Image", type: DataGridColumnType.IMAGE, width: "100px", linkFormat: (value: any, item: any) => `/Table/admin_news/${item.id}/` },
    { index: "title", label: "Tên Tin tức", linkFormat: (value: any, item: any) => `/Table/admin_news/${item.id}/edit` },
    DataGridColumns.categoryId,
    { index: "views", label: "Lượt xem", type: DataGridColumnType.NUMBER },
    DataGridColumns.ordering,
    DataGridColumns.status,
    DataGridColumns.editAction,
    DataGridColumns.deleteAction,
];

const gridPagination: DataGridPagination = { currentPage: 1, pageSize: 5000 };

const gridFilters: DataGridFilterColumn[] = [
    DataGridFilterColumns.id,
    DataGridFilterColumns.status
];

const gridSortOptions: DataGridSortOption[] = [
    {
        index: "nameAsc",
        label: "Tên Tin tức tăng",
        sorts: [
            { index: "title", direction: DataGridSortDirection.ASCENDING },
            { index: "id", direction: DataGridSortDirection.DESCENDING },
        ]
    },
    {
        index: "nameDesc",
        label: "Tên Tin tức giảm",
        sorts: [
            { index: "title", direction: DataGridSortDirection.DESCENDING },
            { index: "id", direction: DataGridSortDirection.ASCENDING },
        ]
    }
];

const gridDefaultSorts: DataGridSort[] = [{ index: "ordering", direction: DataGridSortDirection.ASCENDING }];

const gridAddFields: DataGridEditField[] = [
    { index: "title", label: "Tên Tin tức", type: DataGridEditFieldType.TEXT, size: 6 },
    { index: "brief", label: "Mô tả ngắn", type: DataGridEditFieldType.TEXT, size: 6 },
    { index: "img", label: "Ảnh đại diện", type: DataGridEditFieldType.IMAGE, size: 6 },
    { index: "alias", label: "Tên đường dẫn", type: DataGridEditFieldType.TEXT, size: 6 },
    { index: "content", label: "Nội dung", type: DataGridEditFieldType.EDITOR, size: 12 },
    {
        index: "categoryId", label: "Danh mục", type: DataGridEditFieldType.SELECT, size: 6,
        table: "categories", valueField: "id", labelField: "name", treeMode: true, parentField: "parent", orderBy: "ordering asc", select2: true
    },
    DataGridEditFields.status,
];


export const PmtvAdminNewsSettings: TableGridSettings = {
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