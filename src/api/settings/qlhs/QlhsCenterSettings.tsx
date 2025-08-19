import { DataGridSortOptions } from "@/components/grid/DataGridSortOptions";
import { DataGridPagination } from "@/types/grid/DataGridPagination";
import { DataGridSortOption } from "@/types/grid/DataGridSortOption";
import { DataGridSortDirection } from "@/types/grid/DataGridSortDirection";
import { DataGridSort } from "@/types/grid/DataGridSort";
import { DataGridFilterColumn } from "@/types/grid/DataGridFilterColumn";
import { DataGridTableJoin } from "@/types/grid/DataGridTableJoin";
import { DataGridColumn } from "@/types/grid/DataGridColumn";
import { DataGridColumns } from "@/components/grid/DataGridColumns";
import { DataGridEditField } from "@/types/edit/DataGridEditField";
import { DataGridFilterColumns } from "@/components/grid/DataGridFilterColumns";
import { TableGridDetail } from "@/types/detail/TableGridDetail";
import { TableGridDetailType } from "@/types/detail/TableGridDetailType";
import { TableGridSettings } from "@/types/TableGridSettings";
import { QlhsRoomSettings } from "./QlhsRoomSettings";
import { DataGridEditFields } from "@/components/grid/DataGridEditFields";
import { Card, Form } from "react-bootstrap";
import { renderColumn } from "@/types/grid/columns/renderColumn";
import { QlhsClassSettings } from "./QlhsClassSettings";

const gridTitle: string = "Quản lý Trung tâm";
const gridAddNewLabel: string = "Thêm Trung tâm";
const gridUpdateLabel: string = "Cập nhật Trung tâm";
const gridDeleteSelectedsLabel: string = "Xóa các Trung tâm đã chọn";
const gridTable: string = "center";
const gridJoins: DataGridTableJoin[] = [];
const gridSearchFields: string[] = ["id", "name"];
const gridFields: string[] = ["id", "name", "code", "address", "status"];

const gridColumns: DataGridColumn[] = [
    DataGridColumns.id,
    DataGridColumns.nameCenter,
    DataGridColumns.codeCenter,
    DataGridColumns.addressCenter,
    DataGridColumns.status,
    DataGridColumns.centerRooms,
    DataGridColumns.centerClasses,
    DataGridColumns.editAction,
    DataGridColumns.deleteAction,
];

const customRowTemplate = (item: any, checkedItemIds: number[], columns: DataGridColumn[], defaultFilters: any, table: string, inputableMap: any, setInputableMap: (inputableMap: any) => void, onAfterChangeStatus: (column: DataGridColumn, item: any) => void, handleEditItem: (item: any) => void, onDeleteItem: (item: any) => void, handleAddChildItem: (item: any, column: DataGridColumn) => void, toggleCheckedItem: (id: number) => void) => {
    const renderColumnName = (name: string, className?: string, withLabel?: Boolean) => {
        return columns
            .filter(column => !defaultFilters || !defaultFilters[column.index])
            .filter(column => column.index == name)
            .map(column => (
                <div key={column.index} className={className}>
                    {withLabel ? <strong>{column.label || column.index}: </strong> : null}
                    {renderColumn(column, item, table, inputableMap, setInputableMap, onAfterChangeStatus, handleEditItem, onDeleteItem, handleAddChildItem)}
                </div>
            ));
    }
    return <>
        <Card.Title className="d-flex align-items-center">
            <Form.Check
                type="checkbox"
                checked={checkedItemIds.includes(item.id)}
                onChange={() => toggleCheckedItem(item.id)}
            />
            <div className="ms-1">
                # {item.id}
            </div>
            {renderColumnName('name', 'ms-1')}
            {renderColumnName('code', 'ms-1')}
        </Card.Title>
        <div className="d-flex align-items-center justify-content-between mb-2">
            {renderColumnName('address', undefined, false)}
        </div>
        <div className="d-flex align-items-center justify-content-between mb-2">
            {renderColumnName('centerRooms', undefined, false)}
            {renderColumnName('centerClasses', undefined, false)}
        </div>
        <div className="d-flex align-items-center justify-content-between">
            {renderColumnName('editAction')}
            {renderColumnName('status', undefined, false)}
            {renderColumnName('deleteAction')}
        </div>
    </>
}

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
    DataGridEditFields.centerName,
    DataGridEditFields.centerCode,
    DataGridEditFields.address,
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
        index: 'rooms',
        controller: 'room',
        referenceField: 'centerId',
        referenceType: 'equal',
        settings: QlhsRoomSettings
    },
    {
        label: 'Danh sách lớp học',
        type: TableGridDetailType.GRID,
        index: 'classes',
        controller: 'class',
        referenceField: 'centerId',
        referenceType: 'equal',
        settings: QlhsClassSettings
    }
];
export const QlhsCenterSettings: TableGridSettings = {
    title: gridTitle,
    table: gridTable,
    viewMode: 'grid',
    customRowTemplate: customRowTemplate,
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