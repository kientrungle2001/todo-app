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
import { DataGridEditFieldType } from "@/types/edit/DataGridEditFieldType";
import { DataGridFilterColumns } from "@/components/grid/DataGridFilterColumns";
import { TableGridDetail } from "@/types/detail/TableGridDetail";
import { TableGridDetailType } from "@/types/detail/TableGridDetailType";
import { TableGridSettings } from "@/types/TableGridSettings";
import { QlhsClassSettings } from "./QlhsClassSettings";
import { Card, Form } from "react-bootstrap";
import { renderColumn } from "@/types/grid/columns/renderColumn";

const gridTitle: string = "Quản lý Môn học";
const gridAddNewLabel: string = "Thêm Môn học";
const gridUpdateLabel: string = "Cập nhật Môn học";
const gridDeleteSelectedsLabel: string = "Xóa các Môn học đã chọn";
const gridTable: string = "subject";
const gridJoins: DataGridTableJoin[] = [];
const gridSearchFields: string[] = ["id", "name"];
const gridFields: string[] = ["id", "name", "online", "status"];

const gridColumns: DataGridColumn[] = [
    DataGridColumns.id,
    {
        index: "name", label: "Tên Lớp", linkFormat: (name: any, item: any): string => {
            return '/Table/subject/' + item.id + '/detail';
        }
    },
    {
        index: "online",
        label: "Loại",
        map: {
            "-1": "Môn học - Sách",
            "0": "Môn học - Trung tâm",
            "1": "Môn học - Online"
        }
    },
    DataGridColumns.status,
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
    const renderColumnsExclude = (names: string[]) => {
        return columns
            .filter(column => !defaultFilters || !defaultFilters[column.index])
            .filter(column => !names.includes(column.index))
            .map(column => (
                <div key={column.index} style={{ marginBottom: '0.5rem' }}>
                    <strong>{column.label || column.index}: </strong>
                    {renderColumn(column, item, table, inputableMap, setInputableMap, onAfterChangeStatus, handleEditItem, onDeleteItem, handleAddChildItem)}
                </div>
            ))
    }
    return <>
        <Card.Title className="d-flex align-items-center">
            <Form.Check
                type="checkbox"
                checked={checkedItemIds.includes(item.id)}
                onChange={() => toggleCheckedItem(item.id)}
            />
            <div className="ms-1">
                #{item.id}
            </div>
            {renderColumnName('name', 'ms-1')}
        </Card.Title>
        <div className="d-flex align-items-center justify-content-between mb-2">
            {renderColumnName('online')}
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
    {
        index: 'name',
        label: 'Tên Môn học',
        type: DataGridEditFieldType.TEXT,
        tabGroup: '0info',
        size: 6
    },
];

const gridDetails: TableGridDetail[] = [
    {
        label: 'Chi tiết môn học',
        type: TableGridDetailType.DETAIL,
        fields: [
            { ...DataGridColumns.id, size: 4 },
            { index: "name", label: "Tên Lớp", size: 4 },
            {
                index: "online",
                label: "Loại",
                map: {
                    "-1": "Môn học - Sách",
                    "0": "Môn học - Trung tâm",
                    "1": "Môn học - Online"
                },
                size: 4
            },
            { ...DataGridColumns.status, size: 4 }
        ]
    },
    {
        label: 'Danh sách khóa học',
        type: TableGridDetailType.GRID,
        controller: 'class',
        referenceField: 'subjectId',
        referenceType: 'equal',
        settings: QlhsClassSettings
    }
];
export const QlhsSubjectSettings: TableGridSettings = {
    title: gridTitle,
    viewMode: 'grid',
    customRowTemplate: customRowTemplate,
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