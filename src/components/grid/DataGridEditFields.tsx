import { DataGridEditField, DataGridEditFieldType } from "./DataGridEditTypes";

export const DataGridEditFields: { [key: string]: DataGridEditField } = {
    alias: { index: "alias", label: "Đường dẫn", type: DataGridEditFieldType.TEXT, size: 6 },
    status: {
        index: "status", label: "Trạng thái", type: DataGridEditFieldType.STATUS, size: 6, map: {
            0: 'Chưa kích hoạt',
            1: 'Đã kích hoạt'
        }, statusToggable: true
    },
    trial: {
        index: "trial", label: "Dùng thử", type: DataGridEditFieldType.STATUS, size: 6, map: {
            0: 'Chưa kích hoạt',
            1: 'Đã kích hoạt'
        }, statusToggable: true
    },
    courseId: {
        index: "courseId", label: "Khóa học", type: DataGridEditFieldType.SELECT, size: 4,
        table: "courses", valueField: "id", labelField: "name", orderBy: "name asc", multiple: false, select2: true
    },
    categoryId: {
        index: "categoryId", label: "Danh mục", type: DataGridEditFieldType.SELECT, size: 6,
        table: "categories", valueField: "id", labelField: "name", treeMode: true, parentField: "parent", orderBy: "ordering asc", multiple: false, select2: true
    },
};