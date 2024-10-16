import { DataGridColumn, DataGridColumnActionType, DataGridColumnType, DataGridColumns, DataGridFilterColumn, DataGridFilterColumnType, DataGridFilterColumns, DataGridPagination, DataGridSort, DataGridSortDirection, DataGridSortOption, DataGridTableJoin } from "@/components/grid/DataGrid";
import { DataGridEditField, DataGridEditFieldType } from "@/components/grid/DataGridEditTypes";
import { TableGridSettings } from "@/components/grid/TableGrid";

const gridTitle: string = "Quản lý Tin tức";
const gridAddNewLabel: string = "Thêm Tin tức";
const gridUpdateLabel: string = "Cập nhật Tin tức";
const gridDeleteSelectedsLabel: string = "Xóa các Tin tức đã chọn";
const gridTable: string = "news";
const gridJoins: DataGridTableJoin[] = [];
const gridSearchFields: string[] = ["id", "title", "brief", "content"];
const gridFields: string[] = ["id", "title", "categoryId", "brief", "content", "views", "hits", "comments", "img", "alias", "file", "ordering", "meta_keywords", "meta_description", "startDate", "endDate", "status", "featured"];

const gridColumns: DataGridColumn[] = [
    DataGridColumns.id,
    { index: "img", label: "Image", type: DataGridColumnType.IMAGE, width: "100px", linkFormat: (value: any, item: any) => `/Table/admin_news/${item.id}/` },
    { index: "title", label: "Tên Tin tức", linkFormat: (value: any, item: any) => `/Table/admin_news/${item.id}/edit` },
    { index: "views", label: "Lượt xem", type: DataGridColumnType.NUMBER },
    { index: "ordering", label: "Thứ tự", type: DataGridColumnType.NUMBER, inputable: true },
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
    {
        index: "status", label: "Trạng thái", type: DataGridEditFieldType.STATUS, size: 6, map: {
            0: 'Chưa kích hoạt',
            1: 'Đã kích hoạt'
        }, statusToggable: true
    },
];


export const FullLookAdminNewsSettings: TableGridSettings = {
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