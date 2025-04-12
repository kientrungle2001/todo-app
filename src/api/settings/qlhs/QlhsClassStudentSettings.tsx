import { DataGridColumn, DataGridColumnType, DataGridFilterColumn, DataGridPagination, DataGridSort, DataGridSortDirection, DataGridSortOption, DataGridSortOptions, DataGridTableJoin } from "@/components/grid/DataGridColumnTypes";
import { DataGridColumns } from "@/components/grid/DataGridColumns";
import { DataGridEditField } from "@/components/grid/DataGridEditTypes";
import { DataGridFilterColumns } from "@/components/grid/DataGridFilterColumns";
import { TableGridSettings } from "@/components/grid/TableGrid";

const gridTitle: string = "Quản lý Xếp lớp";
const gridAddNewLabel: string = "Thêm Xếp lớp";
const gridUpdateLabel: string = "Cập nhật Xếp lớp";
const gridDeleteSelectedsLabel: string = "Xóa các Xếp lớp đã chọn";
const gridTable: string = "class_student";
const gridJoins: DataGridTableJoin[] = [{
    table: 'student',
    alias: 's',
    condition: 't.studentId=s.id'
}];
const gridSearchFields: string[] = ["id"];
const gridFields: string[] = ["id", "classId", "studentId", "s.name as studentName", "reversedName", "subjectId", "startClassDate", "endClassDate"];

const gridColumns: DataGridColumn[] = [
    DataGridColumns.id,
    {
        index: "classId", label: "Lớp học",
        type: DataGridColumnType.REFERENCE,
        referenceTable: "classes",
        referenceField: "name"
    },
    { index: "studentName", label: "Học sinh" },
    { index: "startClassDate", label: "Ngày bắt đầu", type: DataGridColumnType.DATE },
    { index: "endClassDate", label: "Ngày kết thúc", type: DataGridColumnType.DATE },
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
    DataGridSortOptions.reversedNameAsc,
    DataGridSortOptions.reversedNameDesc
];

const gridDefaultSorts: DataGridSort[] = [{ index: "reversedName", direction: DataGridSortDirection.ASCENDING }];

const gridAddFields: DataGridEditField[] = [

];

export const QlhsClassStudentSettings: TableGridSettings = {
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