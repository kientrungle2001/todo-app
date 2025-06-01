import { DataGridSortDirection } from "@/types/grid/DataGridSortDirection";
import { DataGridSortOption } from "@/types/grid/DataGridSortOption";

export const DataGridSortOptions: { [key: string]: DataGridSortOption } = {
    idAsc: {
        index: "idAsc",
        label: "ID tăng",
        sorts: [{ index: "id", direction: DataGridSortDirection.ASCENDING },]
    },
    idDesc: {
        index: "idDesc",
        label: "ID giảm",
        sorts: [{ index: "id", direction: DataGridSortDirection.DESCENDING },]
    },
    orderingAsc: {
        index: "orderingAsc",
        label: "Thứ tự tăng",
        sorts: [
            { index: "ordering", direction: DataGridSortDirection.ASCENDING },
            { index: "id", direction: DataGridSortDirection.DESCENDING },
        ],
    },
    orderingDesc: {
        index: "orderingDesc",
        label: "Thứ tự giảm",
        sorts: [
            { index: "ordering", direction: DataGridSortDirection.DESCENDING },
            { index: "id", direction: DataGridSortDirection.ASCENDING },
        ],
    },
    nameAsc: {
        index: "nameAsc",
        label: "Tên Danh mục tăng",
        sorts: [
            { index: "name", direction: DataGridSortDirection.ASCENDING },
            { index: "id", direction: DataGridSortDirection.DESCENDING },
        ]
    },
    nameDesc: {
        index: "nameDesc",
        label: "Tên Danh mục giảm",
        sorts: [
            { index: "name", direction: DataGridSortDirection.DESCENDING },
            { index: "id", direction: DataGridSortDirection.ASCENDING },
        ]
    },
    reversedNameAsc: {
        index: "reversedNameAsc",
        label: "Tên tăng",
        sorts: [
            { index: "reversedName", direction: DataGridSortDirection.ASCENDING },
            { index: "id", direction: DataGridSortDirection.DESCENDING },
        ]
    },
    reversedNameDesc: {
        index: "reversedNameDesc",
        label: "Tên giảm",
        sorts: [
            { index: "reversedName", direction: DataGridSortDirection.DESCENDING },
            { index: "id", direction: DataGridSortDirection.ASCENDING },
        ]
    },
    studyDateAsc: {
        index: "studyDateAsc",
        label: "Ngày học tăng",
        sorts: [
            { index: "studyDate", direction: DataGridSortDirection.ASCENDING },
            { index: "studyTime", direction: DataGridSortDirection.ASCENDING },
            { index: "id", direction: DataGridSortDirection.DESCENDING },
        ]
    },
    studyDateDesc: {
        index: "studyDateDesc",
        label: "Ngày học giảm",
        sorts: [
            { index: "studyDate", direction: DataGridSortDirection.DESCENDING },
            { index: "studyTime", direction: DataGridSortDirection.DESCENDING },
            { index: "id", direction: DataGridSortDirection.ASCENDING },
        ]
    },
};

