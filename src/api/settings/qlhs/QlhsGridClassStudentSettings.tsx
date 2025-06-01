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
import { DataGridEditField } from "@/components/grid/DataGridEditTypes";
import { DataGridFilterColumns } from "@/components/grid/DataGridFilterColumns";
import { TableGridSettings } from "@/types/TableGridSettings";

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
    {
        index: "studentName", label: "Học sinh",
        linkFormat: (name: any, item: any): string => {
            return '/Table/class_student/' + item.id + '/detail';
        }
    },
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

export const QlhsGridClassStudentSettings: TableGridSettings = {
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