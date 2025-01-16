import { DataGridColumn, DataGridColumnActionType, DataGridColumnType } from "./DataGridColumnTypes";

export const DataGridColumns: { [key: string]: DataGridColumn } = {
    id: { index: "id", label: "ID", width: "1%" },
    status: {
        index: "status", type: DataGridColumnType.STATUS, label: "Trạng thái", map: {
            0: 'Chưa kích hoạt',
            1: 'Đã kích hoạt'
        },
        statusToggable: true,
        hideLabel: true,
        width: "10%"
    },
    trial: {
        index: "trial", type: DataGridColumnType.STATUS, label: "Dùng thử", map: {
            0: 'Chưa kích hoạt',
            1: 'Đã kích hoạt'
        },
        hideLabel: true,
        statusToggable: true
    },
    document: {
        index: "document", type: DataGridColumnType.STATUS, label: "Tài liệu", map: {
            0: 'Chưa kích hoạt',
            1: 'Đã kích hoạt'
        },
        hideLabel: true,
        statusToggable: true
    },
    ordering: { index: "ordering", label: "Thứ tự", type: DataGridColumnType.NUMBER, inputable: true },
    addChildAction: { index: "addChildAction", label: "Thêm Con", type: DataGridColumnType.ACTIONS, actionType: DataGridColumnActionType.ADD_CHILD },
    editAction: { index: "editAction", label: "Sửa", type: DataGridColumnType.ACTIONS, actionType: DataGridColumnActionType.EDIT, width: "1%" },
    deleteAction: { index: "deleteAction", label: "Xóa", type: DataGridColumnType.ACTIONS, actionType: DataGridColumnActionType.DELETE, width: "1%" }
};