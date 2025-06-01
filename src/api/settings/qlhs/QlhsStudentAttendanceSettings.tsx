import { DataGridSortOptions } from "@/components/grid/DataGridSortOptions";
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
import { QlhsGridClassSettings } from "./QlhsGridClassSettings";
import { QlhsPaymentPeriodSettings } from "./QlhsPaymentPeriodSettings";
import { QlhsGridClassStudentSettings } from "./QlhsGridClassStudentSettings";

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
        index: "paymentPeriodId", label: "Chọn kỳ thanh toán",
        type: DataGridEditFieldType.GRID,
        gridSettings: QlhsPaymentPeriodSettings,
        table: "payment_period",
        valueField: "id",
        labelField: "name",
        size: 6
    },
    {
        index: "studentId", label: "Chọn học sinh",
        type: DataGridEditFieldType.GRID,
        gridSettings: QlhsGridClassStudentSettings,
        table: "student",
        valueField: "studentId",
        labelField: "name",
        tableCondition: (item: any, field?: DataGridEditField) => {
            return {
                classId: item.classId
            };
        },
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