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

const gridTitle: string = "Chính sách Dịch vụ";
const gridAddNewLabel: string = "Thêm mới";
const gridUpdateLabel: string = "Cập nhật";
const gridDeleteSelectedsLabel: string = "Xóa đã chọn";
const gridTable: string = "service_policy";
const gridJoins: DataGridTableJoin[] = [
    {
        table: "service_packages",
        alias: "sp",
        type: "left",
        condition: "sp.id = t.serviceId"
    }
];
const gridSearchFields: string[] = ["id", "sp.serviceName", "note"];
const gridFields: string[] = ["id", "sp.serviceName", "discount", "note", "startDate", "endDate", "status", "sp.serviceType", "sp.languages", "sp.duration", "sp.amount", "sp.friendlyAmount"];

const gridColumns: DataGridColumn[] = [
    DataGridColumns.id,
    { index: "serviceName", label: "Tên dịch vụ" },
    {
        index: "serviceType",
        type: DataGridColumnType.TEXT,
        label: "Loại chính sách dịch vụ",
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
            "ev": "Song ngữ",
        }
    },
    { index: "duration", label: "Số ngày", type: DataGridColumnType.NUMBER },
    { index: "amount", label: "Giá", type: DataGridColumnType.CURRENCY },
    { index: "friendlyAmount", label: "Giá ưu đãi", type: DataGridColumnType.CURRENCY },
    {
        index: "discount", label: "Giảm giá", type: DataGridColumnType.NUMBER
    },
    {
        index: "note", type: DataGridColumnType.TEXT,
        label: "Ghi chú",
    },
    {
        index: "startDate", type: DataGridColumnType.DATE, label: "Ngày bắt đầu"
    },
    {
        index: "endDate", type: DataGridColumnType.DATE, label: "Ngày kết thúc"
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
    {
        index: "nameAsc",
        label: "Tên chính sách dịch vụ tăng",
        sorts: [
            { index: "serviceName", direction: DataGridSortDirection.ASCENDING },
            { index: "id", direction: DataGridSortDirection.DESCENDING },
        ]
    },
    {
        index: "nameDesc",
        label: "Tên chính sách dịch vụ giảm",
        sorts: [
            { index: "serviceName", direction: DataGridSortDirection.DESCENDING },
            { index: "id", direction: DataGridSortDirection.ASCENDING },
        ]
    }
];

const gridDefaultSorts: DataGridSort[] = [{ index: "id", direction: DataGridSortDirection.DESCENDING }];

const gridAddFields: DataGridEditField[] = [
    {
        index: "status", label: "Trạng thái", type: DataGridEditFieldType.STATUS, size: 6, map: {
            0: 'Chưa kích hoạt',
            1: 'Đã kích hoạt'
        }, statusToggable: true
    }
];


export const FullLookAdminServicePolicySettings: TableGridSettings = {
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