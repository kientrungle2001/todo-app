import { DataGridSortOptions } from "@/components/grid/DataGridColumnTypes";
import { DataGridPagination } from "@/types/grid/DataGridPagination";
import { DataGridSortOption } from "@/types/grid/DataGridSortOption";
import { DataGridSortDirection } from "@/types/grid/DataGridSortDirection";
import { DataGridSort } from "@/types/grid/DataGridSort";
import { DataGridFilterColumn } from "@/types/grid/DataGridFilterColumn";
import { DataGridTableJoin } from "@/types/grid/DataGridTableJoin";
import { DataGridColumn } from "@/types/grid/DataGridColumn";
import { DataGridColumns } from "@/components/grid/DataGridColumns";
import { DataGridEditField, DataGridEditFieldType } from "@/components/grid/DataGridEditTypes";
import { DataGridFilterColumns } from "@/components/grid/DataGridFilterColumns";
import { TableGridSettings } from "@/types/TableGridSettings";

const gridTitle: string = "Quản lý Tài liệu";
const gridAddNewLabel: string = "Thêm mới";
const gridUpdateLabel: string = "Cập nhật Tài liệu";
const gridDeleteSelectedsLabel: string = "Xóa các Tài liệu đã chọn";
const gridTable: string = "document";
const gridJoins: DataGridTableJoin[] = [];
const gridSearchFields: string[] = ["id", "title", "en_title", "tdn_title", "alias", "brief", "content"];
const gridFields: string[] = ["id", "title", "en_title", "tdn_title", "alias", "brief", "content", "ordering", "status", "trial", "categoryId"];

const gridColumns: DataGridColumn[] = [
    DataGridColumns.id,
    { index: "title", label: "Tên Tài liệu", linkFormat: (value: any, item: any) => `/Table/admin_document/${item.id}/edit` },
    { index: "content", label: "Nội dung Tài liệu", isHtml: true },
    DataGridColumns.ordering,
    DataGridColumns.status,
    DataGridColumns.trial,
    DataGridColumns.document,
    DataGridColumns.editAction,
    DataGridColumns.deleteAction
];

const gridPagination: DataGridPagination = {currentPage: 1, pageSize: 50};

const gridFilters: DataGridFilterColumn[] = [
    DataGridFilterColumns.id,
    DataGridFilterColumns.status,
    DataGridFilterColumns.trial,
];

const gridSortOptions: DataGridSortOption[] = [
    {
        index: "nameAsc",
        label: "Tên Tài liệu tăng",
        sorts: [
            { index: "title", direction: DataGridSortDirection.ASCENDING },
            { index: "id", direction: DataGridSortDirection.DESCENDING },
        ]
    },
    {
        index: "nameDesc",
        label: "Tên Tài liệu giảm",
        sorts: [
            { index: "title", direction: DataGridSortDirection.DESCENDING },
            { index: "id", direction: DataGridSortDirection.ASCENDING },
        ]
    },
    DataGridSortOptions.idAsc,
    DataGridSortOptions.idDesc,
];

const gridDefaultSorts: DataGridSort[] = [{ index: "ordering", direction: DataGridSortDirection.ASCENDING }];

const gridAddFields: DataGridEditField[] = [
    { index: "title", label: "Tên Tài liệu", type: DataGridEditFieldType.TEXT, size: 6 },
    { index: "title_en", label: "Tên Tài liệu tiếng Anh", type: DataGridEditFieldType.TEXT, size: 6 },
    { index: "title_tdn", label: "Tên Tài liệu Trần Đại Nghĩa", type: DataGridEditFieldType.TEXT, size: 6 },
    { index: "content", label: "Nội dung", type: DataGridEditFieldType.EDITOR, size: 12 },
    {
        index: "categoryId", label: "Danh mục", type: DataGridEditFieldType.SELECT, size: 6,
        table: "categories", valueField: "id", labelField: "name", treeMode: true, parentField: "parent", orderBy: "ordering asc", select2: true
    },
    {
        index: "status", label: "Trạng thái", type: DataGridEditFieldType.STATUS, size: 6, map: {
            0: 'Chưa kích hoạt',
            1: 'Đã kích hoạt'
        }, statusToggable: true
    },
];


export const FullLookAdminDocumentSettings: TableGridSettings = {
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