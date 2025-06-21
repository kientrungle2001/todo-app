import { DataGridSortOptions } from "@/components/grid/DataGridSortOptions";
import { DataGridPagination } from "@/types/grid/DataGridPagination";
import { DataGridSortOption } from "@/types/grid/DataGridSortOption";
import { DataGridSortDirection } from "@/types/grid/DataGridSortDirection";
import { DataGridSort } from "@/types/grid/DataGridSort";
import { DataGridFilterColumn } from "@/types/grid/DataGridFilterColumn";
import { DataGridTableJoin } from "@/types/grid/DataGridTableJoin";
import { DataGridColumn } from "@/types/grid/DataGridColumn";
import { DataGridColumns } from "@/components/grid/DataGridColumns";
import { DataGridEditFields } from "@/components/grid/DataGridEditFields";
import { DataGridEditField } from "@/types/edit/DataGridEditField";
import { DataGridFilterColumns } from "@/components/grid/DataGridFilterColumns";
import { TableGridSettings } from "@/types/TableGridSettings";

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


export const QlhsGridClassScheduleSettings: TableGridSettings = {
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
