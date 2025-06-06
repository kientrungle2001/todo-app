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
import { DataGridEditField } from "@/types/edit/DataGridEditField";
import { DataGridEditFieldType } from "@/types/edit/DataGridEditFieldType";
import { DataGridFilterColumns } from "@/components/grid/DataGridFilterColumns";
import { TableGridDetail } from "@/types/detail/TableGridDetail";
import { TableGridDetailType } from "@/types/detail/TableGridDetailType";
import { TableGridSettings } from "@/types/TableGridSettings";
import { FullLookAdminMenuSettings } from "../fulllook/FullLookMenuSettings";
import { QlhsClassStudentSettings } from "./QlhsClassStudentSettings";

const gridTitle: string = "Quản lý Học sinh";
const gridAddNewLabel: string = "Thêm Học sinh";
const gridUpdateLabel: string = "Cập nhật Học sinh";
const gridDeleteSelectedsLabel: string = "Xóa các Học sinh đã chọn";
const gridTable: string = "student";
const gridJoins: DataGridTableJoin[] = [];
const gridSearchFields: string[] = ["id", "name", "phone"];
const gridFields: string[] = ["id", "name", "phone", "status", "startStudyDate", "endStudyDate"];

const gridColumns: DataGridColumn[] = [
    DataGridColumns.id,
    {
        index: "name", label: "Tên Học sinh", linkFormat: (name: any, item: any): string => {
            return '/Table/student/' + item.id + '/detail';
        }
    },
    { index: "phone", label: "SĐT", isHtml: true },
    { index: "startStudyDate", label: "Ngày bắt đầu", type: DataGridColumnType.DATE },
    { index: "endStudyDate", label: "Ngày kết thúc", type: DataGridColumnType.DATE },
    DataGridColumns.status,
    DataGridColumns.editAction,
    DataGridColumns.deleteAction,
];

const gridPagination: DataGridPagination = { currentPage: 1, pageSize: 100 };

const gridFilters: DataGridFilterColumn[] = [
    DataGridFilterColumns.id,
    DataGridFilterColumns.status,
];

const gridSortOptions: DataGridSortOption[] = [
    DataGridSortOptions.idAsc,
    DataGridSortOptions.idDesc,
    DataGridSortOptions.reversedNameAsc,
    DataGridSortOptions.reversedNameDesc
];

const gridDefaultSorts: DataGridSort[] = [{ index: "id", direction: DataGridSortDirection.DESCENDING }];

const gridAddFields: DataGridEditField[] = [
    {
        index: 'name',
        label: 'Họ và tên',
        type: DataGridEditFieldType.TEXT,
        tabGroup: '0info',
        size: 6
    },
    {
        index: 'phone',
        label: 'Số điện thoại',
        type: DataGridEditFieldType.TEXT,
        tabGroup: '0info',
        size: 6
    },
    {
        index: 'email',
        label: 'Email',
        type: DataGridEditFieldType.TEXT,
        tabGroup: '0info',
        size: 6
    },
    {
        index: 'zalo',
        label: 'Zalo',
        type: DataGridEditFieldType.TEXT,
        tabGroup: '0info',
        size: 6
    },
    {
        index: 'facebook',
        label: 'Facebook',
        type: DataGridEditFieldType.TEXT,
        tabGroup: '0info',
        size: 6
    },
    {
        index: 'address',
        label: 'Địa chỉ',
        type: DataGridEditFieldType.TEXT,
        tabGroup: '0info',
        size: 6
    },
    {
        index: 'school',
        label: 'Trường',
        type: DataGridEditFieldType.TEXT,
        tabGroup: '0info',
        size: 6
    },
    {
        index: 'extraFields',
        label: 'Thông tin thêm',
        type: DataGridEditFieldType.TEXT,
        tabGroup: '1extrainfo',
        size: 6
    },
    {
        index: 'birthYear',
        label: 'Năm sinh',
        type: DataGridEditFieldType.TEXT,
        tabGroup: '1extrainfo',
        size: 6
    },
    {
        index: 'schoolYear',
        label: 'Niên khóa',

        type: DataGridEditFieldType.TEXT,
        tabGroup: '1extrainfo',
        size: 6
    },
    {
        index: 'classes',
        label: 'classes',
        type: DataGridEditFieldType.TEXT,
        tabGroup: '2classinfo',
        size: 6
    },
    {
        index: 'birthDate',
        label: 'birthDate',
        type: DataGridEditFieldType.TEXT,
        tabGroup: '1extrainfo',
        size: 6
    },
    {
        index: 'parentName',
        label: 'parentName',
        type: DataGridEditFieldType.TEXT,
        tabGroup: '0info',
        size: 6
    },
    {
        index: 'paid',
        label: 'paid',
        type: DataGridEditFieldType.STATUS,
        statusToggable: true,
        tabGroup: '4status',
        size: 6
    },
    {
        index: 'currentClassNames',
        label: 'currentClassNames',
        type: DataGridEditFieldType.TEXT,
        tabGroup: '2classinfo',
        size: 6
    },
    {
        index: 'periodNames',
        label: 'periodNames',
        type: DataGridEditFieldType.TEXT,
        tabGroup: '2classinfo',
        size: 6
    },
    {
        index: 'periodIds',
        label: 'periodIds',
        type: DataGridEditFieldType.TEXT,
        tabGroup: '2classinfo',
        size: 6
    },
    {
        index: 'note',
        label: 'note',
        type: DataGridEditFieldType.TEXT,
        tabGroup: '5otherinfo',
        size: 6
    },
    {
        index: 'online',
        label: 'online',
        type: DataGridEditFieldType.STATUS,
        statusToggable: true,
        tabGroup: '4status',
        size: 6
    },
    {
        index: 'classed',
        label: 'classed',
        type: DataGridEditFieldType.STATUS,
        statusToggable: true,
        tabGroup: '4status',
        size: 6
    },
    {
        index: 'type',
        label: 'type',
        type: DataGridEditFieldType.TEXT,
        tabGroup: '5otherinfo',
        size: 6
    },
    {
        index: 'status',
        label: 'status',
        type: DataGridEditFieldType.STATUS,
        statusToggable: true,
        tabGroup: '4status',
        size: 6
    },
    {
        index: 'rating',
        label: 'rating',
        type: DataGridEditFieldType.TEXT,
        tabGroup: '5otherinfo',
        size: 6
    },
    {
        index: 'assignId',
        label: 'assignId',
        type: DataGridEditFieldType.TEXT,
        tabGroup: '5otherinfo',
        size: 6
    },
    {
        index: 'assignName',
        label: 'assignName',
        type: DataGridEditFieldType.TEXT,
        tabGroup: '5otherinfo',
        size: 6
    },
    {
        index: 'color',
        label: 'color',
        type: DataGridEditFieldType.TEXT,
        tabGroup: '5otherinfo',
        size: 6
    },
    {
        index: 'fontStyle',
        label: 'fontStyle',
        type: DataGridEditFieldType.TEXT,
        tabGroup: '5otherinfo',
        size: 6
    },
    {
        index: 'currentClassIds',
        label: 'currentClassIds',
        type: DataGridEditFieldType.TEXT,
        tabGroup: '2classinfo',
        size: 6
    },
    {
        index: 'subjectIds',
        label: 'subjectIds',
        type: DataGridEditFieldType.TEXT,
        tabGroup: '2classinfo',
        size: 6
    },
    {
        index: 'subjectNames',
        label: 'subjectNames',
        type: DataGridEditFieldType.TEXT,
        tabGroup: '2classinfo',
        size: 6
    },
    {
        index: 'teacherIds',
        label: 'teacherIds',
        type: DataGridEditFieldType.TEXT,
        tabGroup: '2classinfo',
        size: 6
    },
    {
        index: 'code',
        label: 'code',
        type: DataGridEditFieldType.TEXT,
        tabGroup: '1extrainfo',
        size: 6
    },
    {
        index: 'adviceStatus',
        label: 'adviceStatus',
        type: DataGridEditFieldType.STATUS,
        statusToggable: true,
        tabGroup: '5otherinfo',
        size: 6
    },
    {
        index: 'adviceNote',
        label: 'adviceNote',
        type: DataGridEditFieldType.TEXT,
        tabGroup: '5otherinfo',
        size: 6
    },
    {
        index: 'grade',
        label: 'grade',
        type: DataGridEditFieldType.TEXT,
        tabGroup: '1extrainfo',
        size: 6
    },
];

const gridDetails: TableGridDetail[] = [
    {
        type: TableGridDetailType.DETAIL,
        fields: [
            { ...DataGridColumns.id, size: 4 },
            { index: "name", label: "Tên Học sinh", size: 4 },
            { index: "phone", label: "SĐT", isHtml: true, size: 4 },
            { index: "startStudyDate", label: "Ngày bắt đầu", type: DataGridColumnType.DATE, size: 4 },
            { index: "endStudyDate", label: "Ngày kết thúc", type: DataGridColumnType.DATE, size: 4 },
            { ...DataGridColumns.status, size: 4 }
        ]
    },
    {
        type: TableGridDetailType.GRID,
        controller: 'class_student',
        referenceField: 'studentId',
        referenceType: 'equal',
        settings: QlhsClassStudentSettings
    }
];
export const QlhsStudentSettings: TableGridSettings = {
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