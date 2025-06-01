import { DataGridSortOptions } from "@/components/grid/DataGridColumnTypes";
import { DataGridPagination } from "@/types/grid/DataGridPagination";
import { DataGridSortOption } from "@/types/grid/DataGridSortOption";
import { DataGridSortDirection } from "@/types/grid/DataGridSortDirection";
import { DataGridSort } from "@/types/grid/DataGridSort";
import { DataGridFilterColumn } from "@/types/grid/DataGridFilterColumn";
import { DataGridTableJoin } from "@/types/grid/DataGridTableJoin";
import { DataGridColumnType } from "@/types/grid/DataGridColumnType";
import { DataGridColumn } from "@/types/grid/DataGridColumn";
import { DataGridColumns } from "@/components/grid/DataGridColumns";
import { DataGridEditField, DataGridEditFieldType } from "@/components/grid/DataGridEditTypes";
import { DataGridFilterColumns } from "@/components/grid/DataGridFilterColumns";
import { TableGridDetail } from "@/components/grid/TableGrid";
import { TableGridDetailType } from "@/types/grid/TableGridDetailType";
import { TableGridSettings } from "@/types/TableGridSettings";
import { QlhsClassPaymentPeriodSettings } from "./QlhsClassPaymentPeriodSettings";
import { QlhsGridClassPaymentPeriodSettings } from "./QlhsGridClassPaymentPeriodSettings";

const gridTitle: string = "Quản lý Kỳ thanh toán";
const gridAddNewLabel: string = "Thêm Kỳ thanh toán";
const gridUpdateLabel: string = "Cập nhật Kỳ thanh toán";
const gridDeleteSelectedsLabel: string = "Xóa các Kỳ thanh toán đã chọn";
const gridTable: string = "payment_period";
const gridJoins: DataGridTableJoin[] = [];
const gridSearchFields: string[] = ["id"];
const gridFields: string[] = ["id", "name", "startDate", "endDate", "status"];

const gridColumns: DataGridColumn[] = [
    DataGridColumns.id,
    { 
        index: "name", label: "Kỳ thanh toán", linkFormat: (name: any, item: any): string => {
            return '/Table/payment_period/' + item.id + '/detail';
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
    DataGridSortOptions.idDesc,
];

const gridDefaultSorts: DataGridSort[] = [{ index: "id", direction: DataGridSortDirection.DESCENDING }];

const gridAddFields: DataGridEditField[] = [
    {
        index: 'name',
        label: 'Tên Kỳ thanh toán',
        type: DataGridEditFieldType.TEXT,
        size: 12
    },
    { index: "startDate", label: "Ngày bắt đầu", type: DataGridEditFieldType.DATE, size: 6 },
    { index: "endDate", label: "Ngày kết thúc", type: DataGridEditFieldType.DATE, size: 6 },
];

const gridDetails: TableGridDetail[] = [
    {
        label: 'Chi tiết',
        type: TableGridDetailType.DETAIL,
        fields: [
            { ...DataGridColumns.id, size: 4 },
            { index: "name", label: "Tên Kỳ thanh toán", size: 4 },
            { ...DataGridColumns.status, size: 4 }
        ]
    },
    {
        label: 'Kỳ thanh toán lớp',
        type: TableGridDetailType.GRID,
        controller: 'class_payment_period',
        referenceField: 'paymentPeriodId',
        referenceType: 'equal',
        settings: QlhsGridClassPaymentPeriodSettings
    }
];

export const QlhsPaymentPeriodSettings: TableGridSettings = {
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
    details: gridDetails,
}