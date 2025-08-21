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
import { QlhsClassStudentSettings } from "./QlhsClassStudentSettings";
import { QlhsClassScheduleSettings } from "./QlhsClassScheduleSettings";
import { QlhsClassPaymentPeriodSettings } from "./QlhsClassPaymentPeriodSettings";
import { DataGridEditFields } from "@/components/grid/DataGridEditFields";
import { QlhsGridClassStudentSettings } from "./QlhsGridClassStudentSettings";
import ClassAttendance from "@/components/class/ClassAttendance";
import { Card, Form } from "react-bootstrap";
import { renderColumn } from "@/types/grid/columns/renderColumn";

const gridTitle: string = "Quản lý Lớp";
const gridAddNewLabel: string = "Thêm Lớp";
const gridUpdateLabel: string = "Cập nhật Lớp";
const gridDeleteSelectedsLabel: string = "Xóa các Lớp đã chọn";
const gridTable: string = "classes";
const gridJoins: DataGridTableJoin[] = [];
const gridSearchFields: string[] = ["id", "name"];
const gridFields: string[] = ["id", "name", "subjectId", "teacherId", "centerId", "roomId", "startDate", "endDate", "amount", "feeType", "status"];

const gridColumns: DataGridColumn[] = [
    DataGridColumns.id,
    DataGridColumns.attendanceClass,
    DataGridColumns.nameClass,
    DataGridColumns.subjectId,
    DataGridColumns.teacherId,
    DataGridColumns.centerId,
    DataGridColumns.roomId,
    DataGridColumns.startDate,
    DataGridColumns.endDate,
    DataGridColumns.amount,
    DataGridColumns.feeType,
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
                #{item.id} -
            </div>
            {renderColumnName('name', 'ms-1')}
        </Card.Title>
        <div className="d-flex align-items-center justify-content-between mb-2">
            {renderColumnName('centerId', undefined, false)}
            {renderColumnName('roomId', undefined, true)}
        </div>
        <div className="d-flex align-items-center justify-content-between mb-2">
            {renderColumnName('subjectId', undefined, false)}
            {renderColumnName('teacherId', undefined, true)}
        </div>
        <div className="d-flex align-items-center justify-content-between mb-2">
            {renderColumnName('startDate', undefined, true)} {' ===> '}
            {renderColumnName('endDate', undefined)}
        </div>
        <div className="d-flex align-items-center justify-content-between mb-2">
            {renderColumnName('amount', undefined, true)}
            {renderColumnName('feeType', undefined)}
        </div>
        <div className="d-flex align-items-center justify-content-center fs-5 mb-2">
            {renderColumnName('attendanceClass', undefined)}
        </div>
        <div className="d-flex align-items-center justify-content-between">
            {renderColumnName('editAction')}
            {renderColumnName('status', undefined, false)}
            {renderColumnName('deleteAction')}
        </div>
    </>
}

const gridPagination: DataGridPagination = { currentPage: 1, pageSize: 100 };

const gridFilters: DataGridFilterColumn[] = [
    DataGridFilterColumns.subjectId,
    DataGridFilterColumns.teacherId,
    DataGridFilterColumns.centerId,
    DataGridFilterColumns.roomId,
    DataGridFilterColumns.status
];

const gridSortOptions: DataGridSortOption[] = [
    DataGridSortOptions.idAsc,
    DataGridSortOptions.idDesc,
];

const gridDefaultSorts: DataGridSort[] = [{ index: "id", direction: DataGridSortDirection.DESCENDING }];

const gridAddFields: DataGridEditField[] = [
    DataGridEditFields.className,
    DataGridEditFields.classCode,
    DataGridEditFields.startDate,
    DataGridEditFields.endDate,
    DataGridEditFields.centerId,
    DataGridEditFields.roomId,
    DataGridEditFields.subjectId,
    DataGridEditFields.teacherId,
    DataGridEditFields.payment_periods,
    DataGridEditFields.level,
    DataGridEditFields.amount,
    DataGridEditFields.feeType,
    DataGridEditFields.classed,
    DataGridEditFields.status,
];

const gridDetails: TableGridDetail[] = [
    {
        label: 'Chi tiết lớp học',
        type: TableGridDetailType.DETAIL,
        fields: [
            { ...DataGridColumns.id, size: 4 },
            { index: "name", label: "Tên Lớp", size: 4 },
            { ...DataGridColumns.status, size: 4 }
        ]
    },
    {
        label: 'Điểm danh',
        index: 'attendance',
        type: TableGridDetailType.CUSTOM,
        controller: 'class_student',
        referenceField: 'classId',
        referenceType: 'equal',
        settings: QlhsGridClassStudentSettings,
        renderer: (itemId: number, detail: TableGridDetail) => {
            return <ClassAttendance classId={itemId} detail={detail} />
        }
    },
    {
        label: 'Danh sách lớp',
        type: TableGridDetailType.GRID,
        controller: 'class_student',
        referenceField: 'classId',
        referenceType: 'equal',
        settings: QlhsClassStudentSettings
    },
    {
        label: 'Lịch học lớp',
        type: TableGridDetailType.GRID,
        controller: 'class_schedule',
        referenceField: 'classId',
        referenceType: 'equal',
        settings: QlhsClassScheduleSettings
    },
    {
        label: 'Kỳ thanh toán lớp',
        type: TableGridDetailType.GRID,
        controller: 'class_payment_period',
        referenceField: 'classId',
        referenceType: 'equal',
        settings: QlhsClassPaymentPeriodSettings
    }
];
export const QlhsClassSettings: TableGridSettings = {
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
