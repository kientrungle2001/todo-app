import { DataGridColumn, DataGridColumnType, DataGridFilterColumn, DataGridPagination, DataGridSort, DataGridSortDirection, DataGridSortOption, DataGridSortOptions, DataGridTableJoin } from "@/components/grid/DataGridColumnTypes";
import { DataGridColumns } from "@/components/grid/DataGridColumns";
import { DataGridEditField } from "@/components/grid/DataGridEditTypes";
import { DataGridFilterColumns } from "@/components/grid/DataGridFilterColumns";
import { TableGridSettings } from "@/components/grid/TableGrid";

const gridTitle: string = "Quản lý Điểm danh";
const gridAddNewLabel: string = "Thêm Điểm danh";
const gridUpdateLabel: string = "Cập nhật Điểm danh";
const gridDeleteSelectedsLabel: string = "Xóa các Điểm danh đã chọn";
const gridTable: string = "student_attendance";
const gridJoins: DataGridTableJoin[] = [];
const gridSearchFields: string[] = ["id"];
const gridFields: string[] = ["id", "classId", "studentId", "attendanceDate", "status", "note"];

const gridColumns: DataGridColumn[] = [
    DataGridColumns.id,
    {
        index: "classId", label: "Lớp học",
        type: DataGridColumnType.REFERENCE,
        referenceTable: "classes",
        referenceField: "name"
    },
    {
        index: "studentId", label: "Học sinh",
        type: DataGridColumnType.REFERENCE,
        referenceTable: "student",
        referenceField: "name"
    },
    { index: "attendanceDate", label: "Ngày Điểm danh", type: DataGridColumnType.DATE },
    {
        index: "note", label: "Ghi chú"
    },
    DataGridColumns.status,
    DataGridColumns.editAction,
    DataGridColumns.deleteAction,
];

const gridPagination: DataGridPagination = { currentPage: 1, pageSize: 100 };

const gridFilters: DataGridFilterColumn[] = [
    DataGridFilterColumns.status,
];

const gridSortOptions: DataGridSortOption[] = [
    DataGridSortOptions.idAsc,
    DataGridSortOptions.idDesc
];

const gridDefaultSorts: DataGridSort[] = [{ index: "id", direction: DataGridSortDirection.ASCENDING }];

const gridAddFields: DataGridEditField[] = [

];

export const QlhsStudentAttendanceSettings: TableGridSettings = {
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