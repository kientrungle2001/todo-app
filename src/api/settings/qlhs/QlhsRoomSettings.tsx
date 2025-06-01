import { DataGridSortOptions } from "@/components/grid/DataGridColumnTypes";
import { DataGridPagination } from "@/types/grid/DataGridPagination";
import { DataGridSortOption } from "@/types/grid/DataGridSortOption";
import { DataGridSortDirection } from "@/types/grid/DataGridSortDirection";
import { DataGridSort } from "@/types/grid/DataGridSort";
import { DataGridFilterColumn } from "@/types/grid/DataGridFilterColumn";
import { DataGridTableJoin } from "@/types/grid/DataGridTableJoin";
import { DataGridColumn } from "@/types/grid/DataGridColumn";
import { DataGridColumns } from "@/components/grid/DataGridColumns";
import { DataGridEditField } from "@/components/grid/DataGridEditTypes";
import { DataGridFilterColumns } from "@/components/grid/DataGridFilterColumns";
import { TableGridDetail } from "@/components/grid/TableGrid";
import { TableGridDetailType } from "@/types/grid/TableGridDetailType";
import { TableGridSettings } from "@/types/TableGridSettings";
import { QlhsClassSettings } from "./QlhsClassSettings";
import { DataGridEditFields } from "@/components/grid/DataGridEditFields";

const gridTitle: string = "Quản lý Phòng";
const gridAddNewLabel: string = "Thêm Phòng";
const gridUpdateLabel: string = "Cập nhật Phòng";
const gridDeleteSelectedsLabel: string = "Xóa các Phòng đã chọn";
const gridTable: string = "room";
const gridJoins: DataGridTableJoin[] = [];
const gridSearchFields: string[] = ["id", "name"];
const gridFields: string[] = ["id", "name", "centerId", "size", "note", "status"];

const gridColumns: DataGridColumn[] = [
    DataGridColumns.id,
    DataGridColumns.centerId,
    DataGridColumns.nameRoom,
    DataGridColumns.size,
    DataGridColumns.note,
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
    DataGridEditFields.centerId,
    DataGridEditFields.roomName,
    DataGridEditFields.size,
    DataGridEditFields.note,
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