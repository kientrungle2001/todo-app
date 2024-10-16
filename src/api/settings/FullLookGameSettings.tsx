import { DataGridColumn, DataGridColumns, DataGridFilterColumn, DataGridFilterColumns, DataGridPagination, DataGridSort, DataGridSortDirection, DataGridSortOption, DataGridSortOptions, DataGridTableJoin } from "@/components/grid/DataGrid";
import { DataGridEditField } from "@/components/grid/DataGridEditTypes";
import { TableGridSettings } from "@/components/grid/TableGrid";

const gridTitle: string = "Quản lý Game";
const gridAddNewLabel: string = "Thêm mới";
const gridUpdateLabel: string = "Cập nhật Game";
const gridDeleteSelectedsLabel: string = "Xóa các Game đã chọn";
const gridTable: string = "game";
const gridJoins: DataGridTableJoin[] = [];
const gridSearchFields: string[] = ["datatrue", "dataword", "question", "gamecode"];
const gridFields: string[] = ["id", "datatrue", "dataword", "question", "gamecode", "game_topic_id", "status", "linkgame"];

const gridColumns: DataGridColumn[] = [
    DataGridColumns.id,
    { index: "datatrue", label: "Dữ liệu đúng" },
    { index: "dataword", label: "Dữ liệu từ" },
    { index: "question", label: "Câu hỏi", isHtml: true },
    { index: "gamecode", label: "Mã game" },
    { index: "linkgame", label: "Link game" },
    DataGridColumns.status,
    DataGridColumns.editAction,
    DataGridColumns.deleteAction
];

const gridPagination: DataGridPagination = { currentPage: 1, pageSize: 200 };

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
];


export const FullLookAdminGameSettings: TableGridSettings = {
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