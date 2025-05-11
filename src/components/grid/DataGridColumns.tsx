import { DataGridColumn, DataGridColumnActionType, DataGridColumnType } from "./DataGridColumnTypes";

export const DataGridColumns: { [key: string]: DataGridColumn } = {
    addChildAction: { index: "addChildAction", label: "Thêm Con", type: DataGridColumnType.ACTIONS, actionType: DataGridColumnActionType.ADD_CHILD },
    alias: { index: "alias", label: "Đường dẫn" },
    attendanceDate: { index: "attendanceDate", label: "Ngày Điểm danh", type: DataGridColumnType.DATE },
    categoryId: {
        index: "categoryId",
        label: "Danh mục",
        type: DataGridColumnType.REFERENCE,
        referenceTable: "categories",
        referenceField: "name"
    },
    categoryIds: {
        index: "categoryIds",
        label: "Danh mục",
        type: DataGridColumnType.REFERENCE,
        referenceTable: "categories",
        referenceField: "name"
    },
    classId: {
        index: "classId", label: "Lớp học",
        type: DataGridColumnType.REFERENCE,
        referenceTable: "classes",
        referenceField: "name"
    },
    courseId: {
        index: "courseId",
        label: "Khóa học",
        type: DataGridColumnType.REFERENCE,
        referenceTable: "courses",
        referenceField: "name"
    },
    courseResourceId: {
        index: "courseResourceId",
        label: "Tài nguyên Khóa học",
        type: DataGridColumnType.REFERENCE,
        referenceTable: "courses_resources",
        referenceField: "name"
    },
    deleteAction: { index: "deleteAction", label: "Xóa", type: DataGridColumnType.ACTIONS, actionType: DataGridColumnActionType.DELETE, width: "1%", sortable: false },
    document: {
        index: "document", type: DataGridColumnType.STATUS, label: "Tài liệu", map: {
            0: 'Chưa kích hoạt',
            1: 'Đã kích hoạt'
        },
        hideLabel: true,
        statusToggable: true
    },
    editAction: { index: "editAction", label: "Sửa", type: DataGridColumnType.ACTIONS, actionType: DataGridColumnActionType.EDIT, width: "1%", sortable: false },
    id: { index: "id", label: "ID", width: "1%" },
    note: { index: "note", label: "Ghi chú" },
    ordering: { index: "ordering", label: "Thứ tự", type: DataGridColumnType.NUMBER, inputable: true },
    question_content: {
        index: "name", label: "Nội dung", isHtml: true,
    },
    status: {
        index: "status", type: DataGridColumnType.STATUS, label: "Trạng thái", map: {
            0: 'Chưa kích hoạt',
            1: 'Đã kích hoạt'
        },
        statusToggable: true,
        hideLabel: true,
        width: "10%"
    },
    studentId: {
        index: "studentId", label: "Học sinh",
        type: DataGridColumnType.REFERENCE,
        referenceTable: "student",
        referenceField: "name"
    },
    trial: {
        index: "trial", type: DataGridColumnType.STATUS, label: "Dùng thử", map: {
            0: 'Chưa kích hoạt',
            1: 'Đã kích hoạt'
        },
        hideLabel: true,
        statusToggable: true
    }
};
