import { DataGridColumn, DataGridFilterColumn, DataGridPagination, DataGridSort, DataGridSortDirection, DataGridSortOption, DataGridSortOptions, DataGridTableJoin } from "@/components/grid/DataGridColumnTypes";
import { DataGridColumns } from "@/components/grid/DataGridColumns";
import { DataGridEditField, DataGridEditFieldType } from "@/components/grid/DataGridEditTypes";
import { DataGridFilterColumns } from "@/components/grid/DataGridFilterColumns";
import { TableGridSettings } from "@/components/grid/TableGrid";
import { QlhsGridClassSettings } from "./QlhsGridClassSettings";
import { QlhsGridStudentSettings } from "./QlhsGridStudentSettings";
import { QlhsPaymentPeriodSettings } from "./QlhsPaymentPeriodSettings";

const gridTitle: string = "Quản lý Điểm danh";
const gridAddNewLabel: string = "Thêm Điểm danh";
const gridUpdateLabel: string = "Cập nhật Điểm danh";
const gridDeleteSelectedsLabel: string = "Xóa các Điểm danh đã chọn";
const gridTable: string = "student_attendance";
const gridJoins: DataGridTableJoin[] = [];
const gridSearchFields: string[] = ["id"];
const gridFields: string[] = ["id", "classId", "studentId", "paymentPeriodId", "attendanceDate", "status", "note"];

const gridColumns: DataGridColumn[] = [
    DataGridColumns.id,
    DataGridColumns.classId,
    DataGridColumns.studentId,
    DataGridColumns.attendanceDate,
    DataGridColumns.note,
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
    {
        index: "classId", label: "Chọn lớp",
        type: DataGridEditFieldType.GRID,
        gridSettings: QlhsGridClassSettings,
        table: "classes",
        valueField: "id",
        labelField: "name",
        size: 6
    },
    {
        index: "studentId", label: "Chọn học sinh",
        type: DataGridEditFieldType.GRID,
        gridSettings: QlhsGridStudentSettings,
        table: "student",
        valueField: "id",
        labelField: "name",
        size: 6
    },
    {
        index: "paymentPeriodId", label: "Chọn kỳ thanh toán",
        type: DataGridEditFieldType.GRID,
        gridSettings: QlhsPaymentPeriodSettings,
        table: "payment_period",
        valueField: "id",
        labelField: "name",
        size: 6
    },
    { index: "attendanceDate", label: "Ngày điểm danh", type: DataGridEditFieldType.DATE, size: 6 },
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