import { DataGridColumn, DataGridFilterColumn, DataGridPagination, DataGridSort, DataGridSortDirection, DataGridSortOption, DataGridSortOptions, DataGridTableJoin } from "@/components/grid/DataGridColumnTypes";
import { DataGridColumns } from "@/components/grid/DataGridColumns";
import { DataGridEditField, DataGridEditFieldType } from "@/components/grid/DataGridEditTypes";
import { DataGridFilterColumns } from "@/components/grid/DataGridFilterColumns";
import { TableGridDetail, TableGridDetailType, TableGridSettings } from "@/components/grid/TableGrid";
import { QlhsClassSettings } from "./QlhsClassSettings";
import { QlhsRoomSettings } from "./QlhsRoomSettings";

const gridTitle: string = "Quản lý Trung tâm";
const gridAddNewLabel: string = "Thêm Trung tâm";
const gridUpdateLabel: string = "Cập nhật Trung tâm";
const gridDeleteSelectedsLabel: string = "Xóa các Trung tâm đã chọn";
const gridTable: string = "center";
const gridJoins: DataGridTableJoin[] = [];
const gridSearchFields: string[] = ["id", "name"];
const gridFields: string[] = ["id", "name", "status"];

const gridColumns: DataGridColumn[] = [
    DataGridColumns.id,
    {
        index: "name", label: "Tên Trung tâm", linkFormat: (name: any, item: any): string => {
            return '/Table/center/' + item.id + '/detail';
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
        label: 'Tên Trung tâm/cơ sở',
        type: DataGridEditFieldType.TEXT,
        tabGroup: '0info',
        size: 6
    },
];

const gridDetails: TableGridDetail[] = [
    {
        label: 'Chi tiết Trung tâm/Cơ sở',
        type: TableGridDetailType.DETAIL,
        fields: [
            { ...DataGridColumns.id, size: 4 },
            { index: "name", label: "Tên Trung tâm/Cơ sở", size: 4 },
            { ...DataGridColumns.status, size: 4 }
        ]
    },
    {
        label: 'Danh sách phòng học',
        type: TableGridDetailType.GRID,
        controller: 'room',
        referenceField: 'centerId',
        referenceType: 'equal',
        settings: QlhsRoomSettings
    }
];
export const QlhsCenterSettings: TableGridSettings = {
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