import { DataGridSortOptions } from "@/components/grid/DataGridSortOptions";
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
import { DataGridFilterColumns } from "@/components/grid/DataGridFilterColumns";
import { TableGridDetail } from "@/types/detail/TableGridDetail";
import { TableGridDetailType } from "@/types/detail/TableGridDetailType";
import { TableGridSettings } from "@/types/TableGridSettings";
import { QlhsStudentAttendanceSettings } from "./QlhsStudentAttendanceSettings";

const gridTitle: string = "Quản lý Lịch học";
const gridAddNewLabel: string = "Thêm Lịch học";
const gridUpdateLabel: string = "Cập nhật Lịch học";
const gridDeleteSelectedsLabel: string = "Xóa các Lịch học đã chọn";
const gridTable: string = "class_schedule";
const gridJoins: DataGridTableJoin[] = [];
const gridSearchFields: string[] = ["id"];
const gridFields: string[] = ["id", "classId", "studyDate", "studyTime", "status"];

const gridColumns: DataGridColumn[] = [
    DataGridColumns.classId,
    DataGridColumns.studyDate,
    DataGridColumns.studyTime,
    DataGridColumns.editAction,
    DataGridColumns.deleteAction,
];

const gridPagination: DataGridPagination = { currentPage: 1, pageSize: 100 };

const gridFilters: DataGridFilterColumn[] = [
    DataGridFilterColumns.status,
];

const gridSortOptions: DataGridSortOption[] = [
    DataGridSortOptions.idAsc,
    DataGridSortOptions.idDesc,
    DataGridSortOptions.studyDateAsc,
    DataGridSortOptions.studyDateDesc
];

const gridDefaultSorts: DataGridSort[] = [
    { index: "studyDate", direction: DataGridSortDirection.DESCENDING },
    { index: "studyTime", direction: DataGridSortDirection.DESCENDING }
];

const gridAddFields: DataGridEditField[] = [
    DataGridEditFields.classId,
    DataGridEditFields.studyDate,
    DataGridEditFields.studyTime,
];

const gridDetails: TableGridDetail[] = [
    {
        label: 'Chi tiết điểm danh',
        type: TableGridDetailType.DETAIL,
        controller: 'class_schedule',
        fields: [
            { index: "className", label: "Lớp học" },
            {
                index: "studyDate", label: "Ngày học", type: DataGridColumnType.DATE,
                linkFormat: (name: any, item: any): string => {
                    return '/Table/class_schedule/' + item.id + '/detail';
                }
            },
            { index: "studyTime", label: "Giờ học" },
        ]
    },
    {
        label: 'Danh sách điểm danh',
        type: TableGridDetailType.GRID,
        controller: 'student_attendance',
        customFilters: (item: any) => {
            return {
                classId: item.classId,
                attendanceDate: item.studyDate
            }
        },
        referenceType: 'equal',
        settings: QlhsStudentAttendanceSettings
    }
];

export const QlhsClassScheduleSettings: TableGridSettings = {
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
    details: gridDetails
}
