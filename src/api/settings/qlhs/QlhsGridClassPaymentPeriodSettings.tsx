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
import { DataGridEditField } from "@/types/edit/DataGridEditField";
import { DataGridEditFieldType } from "@/types/edit/DataGridEditFieldType";
import { DataGridFilterColumns } from "@/components/grid/DataGridFilterColumns";
import { TableGridDetail } from "@/types/detail/TableGridDetail";
import { TableGridDetailType } from "@/types/detail/TableGridDetailType";
import { TableGridSettings } from "@/types/TableGridSettings";
import { QlhsGridClassSettings } from "./QlhsGridClassSettings";
import { QlhsPaymentPeriodSettings } from "./QlhsPaymentPeriodSettings";

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

const gridAddFields: DataGridEditField[] = [];

const gridDetails: TableGridDetail[] = [
];

export const QlhsGridClassPaymentPeriodSettings: TableGridSettings = {
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