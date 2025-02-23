import { DataGridEditField, DataGridEditFieldType } from "./DataGridEditTypes";

export const DataGridEditFields: { [key: string]: DataGridEditField } = {
    name: { index: "name", label: "Tên Danh mục", type: DataGridEditFieldType.TEXT, size: 6 },
    alias: { index: "alias", label: "Đường dẫn", type: DataGridEditFieldType.TEXT, size: 6 },
    router: { index: "router", label: "Điểm chạy", type: DataGridEditFieldType.TEXT, size: 6 },
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
    parent: {
        index: "parent", label: "Danh mục cha", type: DataGridEditFieldType.SELECT, size: 6,
        table: "categories", valueField: "id", labelField: "name", treeMode: true, parentField: "parent", orderBy: "ordering asc"
    },
    brief: { index: "brief", label: "Mô tả", type: DataGridEditFieldType.TEXT, size: 12 },
    content: { index: "content", label: "Nội dung", type: DataGridEditFieldType.EDITOR, size: 12 },
    img: { index: "img", label: "Ảnh Danh mục", type: DataGridEditFieldType.IMAGE, size: 6 },
    image: { index: "image", label: "Hình ảnh", type: DataGridEditFieldType.IMAGE, size: 12 },
    type: {
        index: "type", label: "Loại tài nguyên", type: DataGridEditFieldType.SELECT, size: 12, options: [{
            value: 'section',
            label: 'Chương/Mục/Tuần',
        }, {
            value: 'lesson',
            label: 'Bài học/Bài giảng'
        }, {
            value: 'test',
            label: 'Đề thi'
        }]
    },
    hardiness: {
        index: "hardiness", label: "Độ khó", type: DataGridEditFieldType.SELECT, size: 12, options: [{
            value: 'basic',
            label: 'Cơ bản',
        }, {
            value: 'advanced',
            label: 'Nâng cao'
        }]
    },
    totalMinutes: { index: "totalMinutes", label: "Thời gian làm bài", type: DataGridEditFieldType.TEXT, size: 6 },
};