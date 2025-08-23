import { DataGridSortOptions as SortOptions } from "@/components/grid/DataGridSortOptions";
import { DataGridPagination as Pagination } from "@/types/grid/DataGridPagination";
import { DataGridSortOption as SortOption } from "@/types/grid/DataGridSortOption";
import { DataGridSortDirection as SortDirection } from "@/types/grid/DataGridSortDirection";
import { DataGridSort as Sort } from "@/types/grid/DataGridSort";
import { DataGridFilterColumn as FilterColumn } from "@/types/grid/DataGridFilterColumn";
import { DataGridTableJoin as Join } from "@/types/grid/DataGridTableJoin";
import { DataGridColumn as Column } from "@/types/grid/DataGridColumn";
import { DataGridColumns as Columns } from "@/components/grid/DataGridColumns";
import { DataGridEditField as EditField } from "@/types/edit/DataGridEditField";
import { DataGridFilterColumns as FilterColumns } from "@/components/grid/DataGridFilterColumns";
import { TableGridDetail as Detail } from "@/types/detail/TableGridDetail";
import { TableGridDetailType as DetailType } from "@/types/detail/TableGridDetailType";
import { TableGridSettings as Settings } from "@/types/TableGridSettings";
import { QlhsClassStudentSettings as ClassStudentSettings } from "./QlhsClassStudentSettings";
import { QlhsClassScheduleSettings as ClassScheduleSettings } from "./QlhsClassScheduleSettings";
import { QlhsClassPaymentPeriodSettings as ClassPaymentPeriodSettings } from "./QlhsClassPaymentPeriodSettings";
import { DataGridEditFields as EditFields } from "@/components/grid/DataGridEditFields";
import { QlhsGridClassStudentSettings as GridClassStudentSettings } from "./QlhsGridClassStudentSettings";
import ClassDailyAttendance from "@/components/class/ClassDailyAttendance";
import { Card, Form } from "react-bootstrap";
import { renderColumn } from "@/types/grid/columns/renderColumn";
import ClassAttendance from "@/components/class/ClassAttendance";
import ClassCalendar from "@/components/class/ClassCalendar";

const gridTitle: string = "Quản lý Lớp";
const gridAddNewLabel: string = "Thêm Lớp";
const gridUpdateLabel: string = "Cập nhật Lớp";
const gridDeleteSelectedsLabel: string = "Xóa các Lớp đã chọn";
const gridTable: string = "classes";
const gridJoins: Join[] = [];
const gridSearchFields: string[] = ["id", "name"];
const gridFields: string[] = ["id", "name", "subjectId", "teacherId", "centerId", "roomId", "startDate", "endDate", "amount", "feeType", "status"];

const gridColumns: Column[] = [
    Columns.id,
    Columns.attendanceClass,
    Columns.studentClass,
    Columns.nameClass,
    Columns.subjectId,
    Columns.teacherId,
    Columns.centerId,
    Columns.roomId,
    Columns.startDate,
    Columns.endDate,
    Columns.amount,
    Columns.feeType,
    Columns.status,
    Columns.editAction,
    Columns.deleteAction,
];

const customRowTemplate = (item: any, checkedItemIds: number[], columns: Column[], defaultFilters: any, table: string, inputableMap: any, setInputableMap: (inputableMap: any) => void, onAfterChangeStatus: (column: Column, item: any) => void, handleEditItem: (item: any) => void, onDeleteItem: (item: any) => void, handleAddChildItem: (item: any, column: Column) => void, toggleCheckedItem: (id: number) => void) => {
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
        <div className="d-flex align-items-center justify-content-between fs-5 mb-2">
            {renderColumnName('studentClass', undefined)}
            {renderColumnName('attendanceClass', undefined)}
        </div>
        <div className="d-flex align-items-center justify-content-between">
            {renderColumnName('editAction')}
            {renderColumnName('status', undefined, false)}
            {renderColumnName('deleteAction')}
        </div>
    </>
}

const gridPagination: Pagination = { currentPage: 1, pageSize: 100 };

const gridFilters: FilterColumn[] = [
    FilterColumns.subjectId,
    FilterColumns.teacherId,
    FilterColumns.centerId,
    FilterColumns.roomId,
    FilterColumns.status
];

const gridSortOptions: SortOption[] = [
    SortOptions.idAsc,
    SortOptions.idDesc,
];

const gridDefaultSorts: Sort[] = [{ index: "id", direction: SortDirection.DESCENDING }];

const gridAddFields: EditField[] = [
    EditFields.className,
    EditFields.classCode,
    EditFields.startDate,
    EditFields.endDate,
    EditFields.centerId,
    EditFields.roomId,
    EditFields.subjectId,
    EditFields.teacherId,
    EditFields.payment_periods,
    EditFields.level,
    EditFields.amount,
    EditFields.feeType,
    EditFields.classed,
    EditFields.status,
];

const gridDetails: Detail[] = [
    {
        label: 'Chi tiết lớp học',
        type: DetailType.DETAIL,
        fields: [
            { ...Columns.id, size: 4 },
            { index: "name", label: "Tên Lớp", size: 4 },
            { ...Columns.status, size: 4 }
        ]
    },
    {
        label: 'Điểm danh',
        index: 'attendance',
        type: DetailType.CUSTOM,
        controller: 'class_student',
        referenceField: 'classId',
        referenceType: 'equal',
        settings: GridClassStudentSettings,
        renderer: (itemId: number, detail: Detail) => {
            return <ClassDailyAttendance classId={itemId} detail={detail} />
        }
    },
    {
        label: 'Học phí',
        index: 'fee',
        type: DetailType.CUSTOM,
        controller: 'class_student',
        referenceField: 'classId',
        referenceType: 'equal',
        settings: GridClassStudentSettings,
        renderer: (itemId: number, detail: Detail) => {
            return <ClassAttendance classId={itemId} detail={detail} />
        }
    },
    {
        label: 'Lịch học',
        index: 'calendar',
        type: DetailType.CUSTOM,
        controller: 'class_student',
        referenceField: 'classId',
        referenceType: 'equal',
        settings: GridClassStudentSettings,
        renderer: (itemId: number, detail: Detail) => {
            return <ClassCalendar classId={itemId} detail={detail} />
        }
    },
    {
        label: 'Danh sách lớp',
        index: 'students',
        type: DetailType.GRID,
        controller: 'class_student',
        referenceField: 'classId',
        referenceType: 'equal',
        settings: ClassStudentSettings
    },
    {
        label: 'Lịch học lớp',
        type: DetailType.GRID,
        controller: 'class_schedule',
        referenceField: 'classId',
        referenceType: 'equal',
        settings: ClassScheduleSettings
    },
    {
        label: 'Kỳ thanh toán lớp',
        type: DetailType.GRID,
        controller: 'class_payment_period',
        referenceField: 'classId',
        referenceType: 'equal',
        settings: ClassPaymentPeriodSettings
    }
];
export const QlhsClassSettings: Settings = {
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
