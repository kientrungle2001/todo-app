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
import { DataGridEditFieldType } from "@/types/edit/DataGridEditFieldType";
import { DataGridFilterColumns } from "@/components/grid/DataGridFilterColumns";
import { TableGridDetail } from "@/types/detail/TableGridDetail";
import { TableGridDetailType } from "@/types/detail/TableGridDetailType";
import { TableGridSettings } from "@/types/TableGridSettings";
import { QlhsClassStudentSettings } from "./QlhsClassStudentSettings";
import { QlhsClassScheduleSettings } from "./QlhsClassScheduleSettings";
import { QlhsClassPaymentPeriodSettings } from "./QlhsClassPaymentPeriodSettings";
import { DataGridEditFields } from "@/components/grid/DataGridEditFields";

const gridTitle: string = "Quản lý Lớp";
const gridAddNewLabel: string = "Thêm Lớp";
const gridUpdateLabel: string = "Cập nhật Lớp";
const gridDeleteSelectedsLabel: string = "Xóa các Lớp đã chọn";
const gridTable: string = "classes";
const gridJoins: DataGridTableJoin[] = [];
const gridSearchFields: string[] = ["id", "name"];
const gridFields: string[] = ["id", "name", "subjectId", "teacherId", "centerId", "roomId", "startDate", "endDate", "amount", "feeType", "status"];

const gridColumns: DataGridColumn[] = [
    DataGridColumns.id,
    DataGridColumns.nameClass,
    DataGridColumns.subjectId,
    DataGridColumns.teacherId,
    DataGridColumns.centerId,
    DataGridColumns.roomId,
    DataGridColumns.startDate,
    DataGridColumns.endDate,
    DataGridColumns.amount,
    DataGridColumns.feeType,
    DataGridColumns.status,
    DataGridColumns.editAction,
    DataGridColumns.deleteAction,
];

const gridPagination: DataGridPagination = { currentPage: 1, pageSize: 100 };

const gridFilters: DataGridFilterColumn[] = [
    DataGridFilterColumns.subjectId,
    DataGridFilterColumns.teacherId,
    DataGridFilterColumns.centerId,
    DataGridFilterColumns.roomId,
    DataGridFilterColumns.status
];

const gridSortOptions: DataGridSortOption[] = [
    DataGridSortOptions.idAsc,
    DataGridSortOptions.idDesc,
];

const gridDefaultSorts: DataGridSort[] = [{ index: "id", direction: DataGridSortDirection.DESCENDING }];

const gridAddFields: DataGridEditField[] = [
    DataGridEditFields.className,
    DataGridEditFields.classCode,
    DataGridEditFields.startDate,
    DataGridEditFields.endDate,
    DataGridEditFields.centerId,
    DataGridEditFields.roomId,
    DataGridEditFields.subjectId,
    DataGridEditFields.teacherId,
    DataGridEditFields.level,
    DataGridEditFields.amount,
    DataGridEditFields.feeType,
    DataGridEditFields.classed,
];

const gridDetails: TableGridDetail[] = [
    {
        label: 'Chi tiết lớp học',
        type: TableGridDetailType.DETAIL,
        fields: [
            { ...DataGridColumns.id, size: 4 },
            { index: "name", label: "Tên Lớp", size: 4 },
            { ...DataGridColumns.status, size: 4 }
        ]
    },
    {
        label: 'Danh sách lớp',
        type: TableGridDetailType.GRID,
        controller: 'class_student',
        referenceField: 'classId',
        referenceType: 'equal',
        settings: QlhsClassStudentSettings
    },
    {
        label: 'Lịch học lớp',
        type: TableGridDetailType.GRID,
        controller: 'class_schedule',
        referenceField: 'classId',
        referenceType: 'equal',
        settings: QlhsClassScheduleSettings
    },
    {
        label: 'Kỳ thanh toán lớp',
        type: TableGridDetailType.GRID,
        controller: 'class_payment_period',
        referenceField: 'classId',
        referenceType: 'equal',
        settings: QlhsClassPaymentPeriodSettings
    }
];
export const QlhsClassSettings: TableGridSettings = {
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
