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
import { TableGridSettings } from "@/types/TableGridSettings";

const gridTitle: string = "Dịch vụ";
const gridAddNewLabel: string = "Thêm mới";
const gridUpdateLabel: string = "Cập nhật dịch vụ";
const gridDeleteSelectedsLabel: string = "Xóa dịch vụ đã chọn";
const gridTable: string = "service_packages";
const gridJoins: DataGridTableJoin[] = [];
const gridSearchFields: string[] = ["id", "serviceName"];
const gridFields: string[] = ["id", "serviceName", "amount", "friendlyAmount", "serviceType", "duration", "languages", "status"];

const gridColumns: DataGridColumn[] = [
    DataGridColumns.id,
    { index: "serviceName", label: "Tên dịch vụ" },
    {
        index: "serviceType",
        type: DataGridColumnType.TEXT,
        label: "Loại dịch vụ",
        map: {
            "full": 'Toàn bộ',
            "contest": "Cuộc thi",
            "view": "Xem đề thi"
        }
    },
    {
        index: "languages",
        type: DataGridColumnType.TEXT,
        label: "Ngôn ngữ",
        map: {
            "vn": 'Tiếng Việt',
            "en": "Tiếng Anh",
            "ev": "Song ngữ"
        }
    },
    { index: "duration", label: "Số ngày", type: DataGridColumnType.NUMBER },
    { index: "amount", label: "Giá", type: DataGridColumnType.CURRENCY },
    { index: "friendlyAmount", label: "Giá ưu đãi", type: DataGridColumnType.CURRENCY },
    DataGridColumns.status,
    DataGridColumns.editAction,
    DataGridColumns.deleteAction
];

const gridPagination: DataGridPagination = { currentPage: 1, pageSize: 20 };

const gridFilters: DataGridFilterColumn[] = [
    DataGridFilterColumns.id,
    DataGridFilterColumns.status,
];

const gridSortOptions: DataGridSortOption[] = [
    {
        index: "nameAsc",
        label: "Tên dịch vụ tăng",
        sorts: [
            { index: "serviceName", direction: DataGridSortDirection.ASCENDING },
            { index: "id", direction: DataGridSortDirection.DESCENDING }
        ]
    },
    {
        index: "nameDesc",
        label: "Tên dịch vụ giảm",
        sorts: [
            { index: "serviceName", direction: DataGridSortDirection.DESCENDING },
            { index: "id", direction: DataGridSortDirection.ASCENDING }
        ]
    }
];

const gridDefaultSorts: DataGridSort[] = [{ index: "id", direction: DataGridSortDirection.DESCENDING }];

const gridAddFields: DataGridEditField[] = [
    { index: "serviceName", label: "Tên dịch vụ", type: DataGridEditFieldType.TEXT, size: 6 },
    { index: "amount", label: "Giá", type: DataGridEditFieldType.TEXT, size: 6 },
    { index: "friendlyAmount", label: "Giá ưu đãi", type: DataGridEditFieldType.TEXT, size: 6 },
    {
        index: "serviceType", label: "Loại dịch vụ", type: DataGridEditFieldType.SELECT, size: 6,
        options: [
            { value: "full", label: 'Toàn bộ' },
            { value: "contest", label: "Cuộc thi" },
            { value: "view", label: "Xem đề thi" }
        ]
    },
    {
        index: "languages", label: "Ngôn ngữ", type: DataGridEditFieldType.SELECT, size: 6,
        options: [
            { value: "vn", label: 'Tiếng Việt' },
            { value: "en", label: "Tiếng Anh" },
            { value: "ev", label: "Song ngữ" }
        ]
    },
    { index: "duration", label: "Số ngày", type: DataGridEditFieldType.TEXT, size: 6 },
    {
        index: "durationType", label: "Loại thời gian", type: DataGridEditFieldType.SELECT, size: 6,
        options: [
            { value: "range", label: "Khoảng thời gian" },
            { value: "yearly", label: "Năm" }
        ]
    },
    {
        index: "status", label: "Trạng thái", type: DataGridEditFieldType.STATUS, size: 6, map: {
            0: 'Chưa kích hoạt',
            1: 'Đã kích hoạt'
        },
        statusToggable: true
    }
];

export const FullLookAdminServicePackagesSettings: TableGridSettings = {
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
    updateLabel: gridUpdateLabel
}
