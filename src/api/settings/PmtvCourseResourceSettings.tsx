import { DataGridColumn, DataGridColumnType, DataGridFilterColumn, DataGridFilterColumns, DataGridPagination, DataGridSort, DataGridSortDirection, DataGridSortOption, DataGridTableJoin } from "@/components/grid/DataGrid";
import { DataGridColumns } from "@/components/grid/DataGridColumns";
import { DataGridEditField, DataGridEditFieldType } from "@/components/grid/DataGridEditTypes";
import { TableGridSettings } from "@/components/grid/TableGrid";

const gridTitle: string = "Quản lý Tài nguyên Khóa học";
const gridAddNewLabel: string = "Thêm Tài nguyên Khóa học";
const gridUpdateLabel: string = "Cập nhật Tài nguyên Khóa học";
const gridDeleteSelectedsLabel: string = "Xóa các Tài nguyên Khóa học đã chọn";
const gridTable: string = "courses_resources";
const gridJoins: DataGridTableJoin[] = [];
const gridSearchFields: string[] = ["id", "name"];
const gridFields: string[] = ["id", "name", "courseId", "ordering", "status", "image", "type"];

const gridColumns: DataGridColumn[] = [
    DataGridColumns.id,
    { index: "image", label: "Hình ảnh", type: DataGridColumnType.IMAGE },
    { index: "name", label: "Tên Tài nguyên Khóa học", linkFormat: (value: any, item: any) => `/Table/admin_course/${item.id}/detail`, treeMode: true },
    {
        index: "courseId",
        label: "Danh mục",
        type: DataGridColumnType.REFERENCE,
        referenceTable: "courses",
        referenceField: "name"
    },
    DataGridColumns.ordering,
    DataGridColumns.status,
    DataGridColumns.editAction,
    DataGridColumns.deleteAction
];

const gridPagination: DataGridPagination = { currentPage: 1, pageSize: 5000 };

const gridFilters: DataGridFilterColumn[] = [
    DataGridFilterColumns.id,
    DataGridFilterColumns.courseId,
    DataGridFilterColumns.status
];

const gridSortOptions: DataGridSortOption[] = [
    {
        index: "nameAsc",
        label: "Tên Tài nguyên Khóa học tăng",
        sorts: [
            { index: "name", direction: DataGridSortDirection.ASCENDING },
            { index: "id", direction: DataGridSortDirection.DESCENDING },
        ]
    },
    {
        index: "nameDesc",
        label: "Tên Tài nguyên Khóa học giảm",
        sorts: [
            { index: "name", direction: DataGridSortDirection.DESCENDING },
            { index: "id", direction: DataGridSortDirection.ASCENDING },
        ]
    }
];

const gridDefaultSorts: DataGridSort[] = [{ index: "ordering", direction: DataGridSortDirection.ASCENDING }];

const gridAddFields: DataGridEditField[] = [
    { index: "name", label: "Tên Tài nguyên Khóa học", type: DataGridEditFieldType.TEXT, size: 12 },
    { index: "image", label: "Hình ảnh", type: DataGridEditFieldType.IMAGE, size: 12 },
    { index: "brief", label: "Mô tả", type: DataGridEditFieldType.TEXT, size: 12 },
    { index: "content", label: "Nội dung", type: DataGridEditFieldType.EDITOR, size: 12 },
    {
        index: "courseId", label: "Khóa học", type: DataGridEditFieldType.SELECT, size: 6,
        table: "courses", valueField: "id", labelField: "name", orderBy: "name asc", multiple: false, select2: true
    },
    {
        index: "status", label: "Trạng thái", type: DataGridEditFieldType.STATUS, size: 6, map: {
            0: 'Chưa kích hoạt',
            1: 'Đã kích hoạt'
        }, statusToggable: true
    },
];


export const PmtvAdminCourseResourceSettings: TableGridSettings = {
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
