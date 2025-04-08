import { DataGridColumn, DataGridFilterColumn, DataGridPagination, DataGridSort, DataGridSortDirection, DataGridSortOption, DataGridSortOptions, DataGridTableJoin } from "@/components/grid/DataGridColumnTypes";
import { DataGridColumns } from "@/components/grid/DataGridColumns";
import { DataGridEditField, DataGridEditFieldType } from "@/components/grid/DataGridEditTypes";
import { DataGridFilterColumns } from "@/components/grid/DataGridFilterColumns";
import { TableGridDetail, TableGridDetailType, TableGridSettings } from "@/components/grid/TableGrid";
import { QlhsClassSettings } from "./QlhsClassSettings";

const gridTitle: string = "Quản lý Giáo viên";
const gridAddNewLabel: string = "Thêm Giáo viên";
const gridUpdateLabel: string = "Cập nhật Giáo viên";
const gridDeleteSelectedsLabel: string = "Xóa các Giáo viên đã chọn";
const gridTable: string = "teacher";
const gridJoins: DataGridTableJoin[] = [];
const gridSearchFields: string[] = ["id", "name"];
const gridFields: string[] = ["id", "name", "status"];

const gridColumns: DataGridColumn[] = [
    DataGridColumns.id,
    {
        index: "name", label: "Tên Giáo viên", linkFormat: (name: any, item: any): string => {
            return '/Table/teacher/' + item.id + '/detail';
        }
    },
    DataGridColumns.status,
    DataGridColumns.editAction,
    DataGridColumns.deleteAction,
];

const gridPagination: DataGridPagination = { currentPage: 1, pageSize: 20 };

const gridFilters: DataGridFilterColumn[] = [
    DataGridFilterColumns.id,
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
        label: 'Tên Giáo viên',
        type: DataGridEditFieldType.TEXT,
        tabGroup: '0info',
        size: 6
    },
];

const gridDetails: TableGridDetail[] = [
    {
        label: 'Chi tiết Giáo viên',
        type: TableGridDetailType.DETAIL,
        fields: [
            { ...DataGridColumns.id, size: 4 },
            { index: "name", label: "Tên giáo viên", size: 4 },
            { ...DataGridColumns.status, size: 4 }
        ]
    },
    {
        label: 'Danh sách khóa học',
        type: TableGridDetailType.GRID,
        controller: 'class',
        referenceField: 'teacherId',
        referenceType: 'equal',
        settings: QlhsClassSettings
    }
];
export const QlhsTeacherSettings: TableGridSettings = {
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