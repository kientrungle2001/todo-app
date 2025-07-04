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