import { DataGridSortOptions } from "@/components/grid/DataGridSortOptions";
import { DataGridPagination } from "@/types/grid/DataGridPagination";
import { DataGridSortOption } from "@/types/grid/DataGridSortOption";
import { DataGridSortDirection } from "@/types/grid/DataGridSortDirection";
import { DataGridSort } from "@/types/grid/DataGridSort";
import { DataGridFilterColumn } from "@/types/grid/DataGridFilterColumn";
import { DataGridTableJoin } from "@/types/grid/DataGridTableJoin";
import { DataGridFilterColumnType } from "@/types/grid/DataGridFilterColumnType";
import { DataGridColumnType } from "@/types/grid/DataGridColumnType";
import { DataGridColumn } from "@/types/grid/DataGridColumn";
import { DataGridColumns } from "@/components/grid/DataGridColumns";
import { DataGridEditField } from "@/types/edit/DataGridEditField";
import { DataGridEditFieldType } from "@/types/edit/DataGridEditFieldType";
import { TableGridSettings } from "@/types/TableGridSettings";

const gridTitle: string = "Quản lý Cuộc thi";
const gridAddNewLabel: string = "Thêm mới";
const gridUpdateLabel: string = "Cập nhật Cuộc thi";
const gridDeleteSelectedsLabel: string = "Xóa các Cuộc thi đã chọn";
const gridTable: string = "contest";
const gridJoins: DataGridTableJoin[] = [];
const gridSearchFields: string[] = ["id", "name"];
const gridFields: string[] = ["id", "name", "startDate", "expiredDate", "showResultDate", "endShowResult"];

const gridColumns: DataGridColumn[] = [
    DataGridColumns.id,
    { index: "name", label: "User ID", linkFormat: (value: any, item: any) => `/Table/admin_contest/${item.id}/edit` },
    { index: "startDate", label: "Ngày bắt đầu", type: DataGridColumnType.DATE },
    { index: "expiredDate", label: "Ngày kết thúc", type: DataGridColumnType.DATE },
    { index: "showResultDate", label: "Ngày xem kết quả", type: DataGridColumnType.DATE },
    { index: "endShowResult", label: "Ngày kết thúc xem kết quả", type: DataGridColumnType.DATE },
    DataGridColumns.editAction,
    DataGridColumns.deleteAction,
];

const gridPagination: DataGridPagination = { currentPage: 1, pageSize: 200 };

const gridFilters: DataGridFilterColumn[] = [{ index: "id", label: "ID", type: DataGridFilterColumnType.TEXT },];

const gridSortOptions: DataGridSortOption[] = [
    DataGridSortOptions.idAsc,
    DataGridSortOptions.idDesc,
];

const gridDefaultSorts: DataGridSort[] = [{ index: "id", direction: DataGridSortDirection.DESCENDING }];

const gridAddFields: DataGridEditField[] = [
    { index: "name", label: "Tên cuộc thi", type: DataGridEditFieldType.TEXT, size: 6 },
    { index: "startDate", label: "Ngày bắt đầu", type: DataGridEditFieldType.DATE },
    { index: "expiredDate", label: "Ngày kết thúc", type: DataGridEditFieldType.DATE },
    { index: "showResultDate", label: "Ngày xem kết quả", type: DataGridEditFieldType.DATE },
    { index: "endShowResult", label: "Ngày kết thúc xem kết quả", type: DataGridEditFieldType.DATE },
];


export const FullLookAdminContestSettings: TableGridSettings = {
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
}