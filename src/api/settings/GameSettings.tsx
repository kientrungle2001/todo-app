/**
 * -- nextnobels.game definition

CREATE TABLE `game` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `datatrue` text DEFAULT NULL,
  `dataword` text DEFAULT NULL,
  `question` text DEFAULT NULL,
  `gamecode` varchar(200) NOT NULL,
  `game_topic_id` varchar(255) DEFAULT NULL,
  `status` int(11) NOT NULL,
  `modifiedId` int(11) NOT NULL,
  `userId` int(11) NOT NULL,
  `createdId` int(11) NOT NULL,
  `creatorId` int(11) NOT NULL,
  `created` datetime NOT NULL,
  `modified` datetime NOT NULL,
  `software` int(11) NOT NULL,
  `linkgame` varchar(255) NOT NULL,
  `documentId` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=936 DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;
 * 
 */
import { DataGridColumn, DataGridColumnActionType, DataGridColumnType, DataGridFilterColumn, DataGridFilterColumnType, DataGridPagination, DataGridSort, DataGridSortDirection, DataGridSortOption, DataGridTableJoin } from "@/components/grid/DataGrid";
import { DataGridEditField, DataGridEditFieldType } from "@/components/grid/DataGridEdit";
import { TableGridSettings } from "@/components/grid/TableGrid";

const gridTitle: string = "Quản lý Game";
const gridTable: string = "game";
const gridJoins: DataGridTableJoin[] = [];
const gridSearchFields: string[] = ["datatrue", "dataword", "question", "gamecode"];
const gridFields: string[] = ["id", "datatrue", "dataword", "question", "gamecode", "game_topic_id", "status", "linkgame"];

const gridColumns: DataGridColumn[] = [
    { index: "id", label: "ID", width: "1%" },
    { index: "datatrue", label: "Dữ liệu đúng" },
    { index: "dataword", label: "Dữ liệu từ" },
    { index: "question", label: "Câu hỏi", isHtml: true },
    { index: "gamecode", label: "Mã game" },
    { index: "linkgame", label: "Link game" },
    {
        index: "status", type: DataGridColumnType.STATUS, label: "Trạng thái", map: {
            0: 'Chưa kích hoạt',
            1: 'Đã kích hoạt'
        },
        statusToggable: true
    },
    { index: "editAction", label: "Sửa", type: DataGridColumnType.ACTIONS, actionType: DataGridColumnActionType.EDIT, width: "1%" },
    { index: "deleteAction", label: "Xóa", type: DataGridColumnType.ACTIONS, actionType: DataGridColumnActionType.DELETE, width: "1%" }
];

const gridPagination: DataGridPagination = {
    currentPage: 1,
    pageSize: 200
};

const gridFilters: DataGridFilterColumn[] = [
    { index: "id", label: "ID", type: DataGridFilterColumnType.TEXT },
    {
        index: "status", label: "Trạng thái", type: DataGridFilterColumnType.STATUS, map: {
            0: 'Chưa kích hoạt',
            1: 'Đã kích hoạt'
        },
        comparisonOperator: "equal"
    },
];

const gridSortOptions: DataGridSortOption[] = [
    {
        index: "idAsc",
        label: "ID Game tăng",
        sorts: [
            { index: "id", direction: DataGridSortDirection.DESCENDING },
        ]
    },
    {
        index: "idDesc",
        label: "ID Game giảm",
        sorts: [
            { index: "id", direction: DataGridSortDirection.ASCENDING },
        ]
    }
];

const gridDefaultSorts: DataGridSort[] = [
    { index: "id", direction: DataGridSortDirection.DESCENDING }
];

const gridAddFields: DataGridEditField[] = [
];


export const AdminGameSettings: TableGridSettings = {
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
    addNewLabel: "Thêm mới",
    deleteSelectedsLabel: "Xóa Game đã chọn",
    updateLabel: "Cập nhật Game",
    treeMode: true,
}