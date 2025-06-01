import { DataGridSortOptions } from "@/components/grid/DataGridSortOptions";
import { DataGridPagination } from "@/types/grid/DataGridPagination";
import { DataGridSortOption } from "@/types/grid/DataGridSortOption";
import { DataGridSortDirection } from "@/types/grid/DataGridSortDirection";
import { DataGridSort } from "@/types/grid/DataGridSort";
import { DataGridFilterColumn } from "@/types/grid/DataGridFilterColumn";
import { DataGridTableJoin } from "@/types/grid/DataGridTableJoin";
import { DataGridFilterColumnType } from "@/types/grid/DataGridFilterColumnType";
import { DataGridColumnType } from "@/types/grid/DataGridColumnType";
import { DataGridColumn } from "@/types/grid/DataGridColumn";
import { DataGridColumns } from "@/components/grid/DataGridColumns";
import { DataGridEditField } from "@/types/edit/DataGridEditField";
import { DataGridFilterColumns } from "@/components/grid/DataGridFilterColumns";
import { TableGridSettings } from "@/types/TableGridSettings";

const gridTitle: string = "Quản lý Lớp";

const gridTable: string = "classes";
const gridJoins: DataGridTableJoin[] = [];
const gridSearchFields: string[] = ["id", "name"];
const gridFields: string[] = ["id", "name", "subjectId", "teacherId", "centerId", "roomId", "startDate", "endDate", "amount", "feeType", "status"];

const gridColumns: DataGridColumn[] = [
    DataGridColumns.id,
    {
        index: "name", label: "Tên Lớp", linkFormat: (name: any, item: any): string => {
            return '/Table/class/' + item.id + '/detail';
        }
    },
    {
        index: "subjectId", label: "Môn học",
        type: DataGridColumnType.REFERENCE,
        referenceTable: "subject",
        referenceField: "name"
    },
    {
        index: "teacherId", label: "Giáo viên",
        type: DataGridColumnType.REFERENCE,
        referenceTable: "teacher",
        referenceField: "name"
    },
    {
        index: "centerId", label: "Trung tâm",
        type: DataGridColumnType.REFERENCE,
        referenceTable: "center",
        referenceField: "name"
    },
    {
        index: "roomId", label: "Phòng",
        type: DataGridColumnType.REFERENCE,
        referenceTable: "room",
        referenceField: "name"
    },
    { index: "startDate", label: "Ngày bắt đầu", type: DataGridColumnType.DATE },
    { index: "endDate", label: "Ngày kết thúc", type: DataGridColumnType.DATE },
    { index: "amount", label: "Học phí", type: DataGridColumnType.CURRENCY },
    {
        index: "feeType", label: "Cách tính", type: DataGridColumnType.STATUS, map: {
            "0": "Theo buổi",
            "1": "Theo khóa"
        }
    },
    DataGridColumns.status,
];

const gridPagination: DataGridPagination = { currentPage: 1, pageSize: 100 };

const gridFilters: DataGridFilterColumn[] = [
    {
        index: 'subjectId',
        label: 'Môn học',
        type: DataGridFilterColumnType.SELECT,
        table: 'subject',
        valueField: 'id',
        labelField: 'name',
        tableCondition: 'status=1',
        comparisonOperator: 'equal'
    },
    {
        index: 'teacherId',
        label: 'Giáo viên',
        type: DataGridFilterColumnType.SELECT,
        table: 'teacher',
        valueField: 'id',
        labelField: 'name',
        tableCondition: 'status=1',
        comparisonOperator: 'equal'
    },
    {
        index: 'centerId',
        label: 'Trung tâm',
        type: DataGridFilterColumnType.SELECT,
        table: 'center',
        valueField: 'id',
        labelField: 'name',
        tableCondition: 'status=1',
        comparisonOperator: 'equal'
    },
    {
        index: 'roomId',
        label: 'Phòng học',
        type: DataGridFilterColumnType.SELECT,
        table: 'room',
        valueField: 'id',
        labelField: 'name',
        tableCondition: 'status=1',
        comparisonOperator: 'equal'
    },
    DataGridFilterColumns.status
];

const gridSortOptions: DataGridSortOption[] = [
    DataGridSortOptions.idAsc,
    DataGridSortOptions.idDesc,
];

const gridDefaultSorts: DataGridSort[] = [{ index: "id", direction: DataGridSortDirection.DESCENDING }];

const gridAddFields: DataGridEditField[] = [];

export const QlhsGridClassSettings: TableGridSettings = {
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
}