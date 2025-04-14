import { DataGridColumn, DataGridColumnType, DataGridFilterColumn, DataGridPagination, DataGridSort, DataGridSortDirection, DataGridSortOption, DataGridSortOptions, DataGridTableJoin } from "@/components/grid/DataGridColumnTypes";
import { DataGridColumns } from "@/components/grid/DataGridColumns";
import { DataGridEditField } from "@/components/grid/DataGridEditTypes";
import { DataGridFilterColumns } from "@/components/grid/DataGridFilterColumns";
import { TableGridSettings } from "@/components/grid/TableGrid";

const gridTitle: string = "Quản lý Lịch học";
const gridAddNewLabel: string = "Thêm Lịch học";
const gridUpdateLabel: string = "Cập nhật Lịch học";
const gridDeleteSelectedsLabel: string = "Xóa các Lịch học đã chọn";
const gridTable: string = "class_schedule";
const gridJoins: DataGridTableJoin[] = [];
const gridSearchFields: string[] = ["id"];
const gridFields: string[] = ["id", "classId", "studyDate", "studyTime", "status"];

const gridColumns: DataGridColumn[] = [
    {
        index: "classId", label: "Lớp học",
        type: DataGridColumnType.REFERENCE,
        referenceTable: "classes",
        referenceField: "name"
    },
    { index: "studyDate", label: "Ngày học", type: DataGridColumnType.DATE },
    { index: "studyTime", label: "Giờ học" },
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
}