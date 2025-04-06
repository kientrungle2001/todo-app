import { DataGridColumn, DataGridColumnType, DataGridFilterColumn, DataGridPagination, DataGridSort, DataGridSortDirection, DataGridSortOption, DataGridSortOptions, DataGridTableJoin } from "@/components/grid/DataGridColumnTypes";
import { DataGridColumns } from "@/components/grid/DataGridColumns";
import { DataGridEditField, DataGridEditFieldType } from "@/components/grid/DataGridEditTypes";
import { DataGridFilterColumns } from "@/components/grid/DataGridFilterColumns";
import { TableGridDetail, TableGridDetailType, TableGridSettings } from "@/components/grid/TableGrid";
import { QlhsClassSettings } from "./QlhsClassSettings";

const gridTitle: string = "Quản lý Phòng";
const gridAddNewLabel: string = "Thêm Phòng";
const gridUpdateLabel: string = "Cập nhật Phòng";
const gridDeleteSelectedsLabel: string = "Xóa các Phòng đã chọn";
const gridTable: string = "room";
const gridJoins: DataGridTableJoin[] = [];
const gridSearchFields: string[] = ["id", "name"];
const gridFields: string[] = ["id", "name", "centerId", "status"];

const gridColumns: DataGridColumn[] = [
    DataGridColumns.id,
    {
        index: "name", label: "Tên Phòng", linkFormat: (name: any, item: any): string => {
            return '/Table/room/' + item.id + '/detail';
        }
    },
    {
        index: "centerId", label: "Trung tâm",
        type: DataGridColumnType.REFERENCE,
        referenceTable: "center",
        referenceField: "name"
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
        label: 'Tên Phòng',
        type: DataGridEditFieldType.TEXT,
        tabGroup: '0info',
        size: 6
    },
];

const gridDetails: TableGridDetail[] = [
    {
        label: 'Chi tiết Phòng học',
        type: TableGridDetailType.DETAIL,
        fields: [
            { ...DataGridColumns.id, size: 4 },
            { index: "name", label: "Tên Phòng", size: 4 },
            { ...DataGridColumns.status, size: 4 }
        ]
    },
    {
        label: 'Danh sách lớp học',
        type: TableGridDetailType.GRID,
        controller: 'class',
        referenceField: 'roomId',
        referenceType: 'equal',
        settings: QlhsClassSettings
    }
];
export const QlhsRoomSettings: TableGridSettings = {
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