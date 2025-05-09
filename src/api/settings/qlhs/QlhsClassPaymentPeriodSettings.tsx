import { DataGridColumn, DataGridColumnType, DataGridFilterColumn, DataGridPagination, DataGridSort, DataGridSortDirection, DataGridSortOption, DataGridSortOptions, DataGridTableJoin } from "@/components/grid/DataGridColumnTypes";
import { DataGridColumns } from "@/components/grid/DataGridColumns";
import { DataGridEditField, DataGridEditFieldType } from "@/components/grid/DataGridEditTypes";
import { DataGridFilterColumns } from "@/components/grid/DataGridFilterColumns";
import { TableGridDetail, TableGridDetailType, TableGridSettings } from "@/components/grid/TableGrid";
import { QlhsGridClassSettings } from "./QlhsGridClassSettings";
import { QlhsPaymentPeriodSettings } from "./QlhsPaymentPeriodSettings";
import { QlhsStudentAttendanceSettings } from "./QlhsStudentAttendanceSettings";

const gridTitle: string = "Quản lý Kỳ thanh toán lớp";
const gridAddNewLabel: string = "Thêm Kỳ thanh toán lớp";
const gridUpdateLabel: string = "Cập nhật Kỳ thanh toán lớp";
const gridDeleteSelectedsLabel: string = "Xóa các Kỳ thanh toán lớp đã chọn";
const gridTable: string = "class_payment_period";
const gridJoins: DataGridTableJoin[] = [{
    table: 'classes',
    alias: 'c',
    condition: 't.classId=c.id'
},
{
    table: 'payment_period',
    alias: 'p',
    condition: 't.paymentPeriodId=p.id'
}];
const gridSearchFields: string[] = ["id", "c.name", "p.name"];
const gridFields: string[] = ["id", "classId", "paymentPeriodId", "c.name as className", "p.name as paymentPeriodName", "p.startDate as startDate", "p.endDate as endDate", "status"];

const gridColumns: DataGridColumn[] = [
    {
        index: "classId", label: "Lớp",
        type: DataGridColumnType.REFERENCE,
        referenceTable: 'classes',
        referenceField: 'name',
        linkFormat: (name: any, item: any): string => {
            return '/Table/class/' + item.classId[0].id + '/detail';
        }
    },
    {
        index: "paymentPeriodId", label: "Kỳ thanh toán",
        type: DataGridColumnType.REFERENCE,
        referenceTable: 'payment_period',
        referenceField: 'name',
        linkFormat: (name: any, item: any): string => {
            return '/Table/payment_period/' + item.paymentPeriodId[0].id + '/detail';
        }
    },
    { index: "startDate", label: "Ngày bắt đầu", type: DataGridColumnType.DATE },
    { index: "endDate", label: "Ngày kết thúc", type: DataGridColumnType.DATE },

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
        index: "paymentPeriodId", label: "Chọn Kỳ thanh toán",
        type: DataGridEditFieldType.GRID,
        gridSettings: QlhsPaymentPeriodSettings,
        table: "payment_period",
        valueField: "id",
        labelField: "name",
        size: 6
    }
];

const gridDetails: TableGridDetail[] = [
    {
        label: 'Danh sách điểm danh',
        type: TableGridDetailType.GRID,
        controller: 'student_attendance',
        customFilters: (item: any) => {
            return {
                classId: item.classId,
            }
        },
        referenceType: 'equal',
        settings: QlhsStudentAttendanceSettings
    }
];

export const QlhsClassPaymentPeriodSettings: TableGridSettings = {
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