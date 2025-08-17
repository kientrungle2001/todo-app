import { DataGridEditField } from "@/types/edit/DataGridEditField";
import { DataGridEditFieldType } from "@/types/edit/DataGridEditFieldType";

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
    courseResourceId: {
        index: "courseResourceId", label: "Tài nguyên Khóa học", type: DataGridEditFieldType.SELECT, size: 6,
        table: "courses_resources", valueField: "id", labelField: "name", treeMode: true,
        tableCondition: (item) => "courseId = '" + item.courseId + "'", select2: true,
    },
    categoryId: {
        index: "categoryId", label: "Danh mục", type: DataGridEditFieldType.SELECT, size: 6,
        table: "categories", valueField: "id", labelField: "name", treeMode: true, parentField: "parent", orderBy: "ordering asc", multiple: false, select2: true
    },
    categoryIds: {
        index: "categoryIds", label: "Danh mục", type: DataGridEditFieldType.SELECT, size: 6,
        multiple: true,
        table: "categories",
        valueField: "id",
        labelField: "name",
        treeMode: true,
        parentField: "parent",
        multipleSize: 10,
        select2: true,
    },
    centerName: {
        index: 'name',
        label: 'Tên Trung tâm/cơ sở',
        type: DataGridEditFieldType.TEXT,
        size: 6
    },
    centerCode: {
        index: 'code',
        label: 'Mã Trung tâm',
        type: DataGridEditFieldType.TEXT,
        size: 6
    },
    address: {
        index: 'address',
        label: 'Địa chỉ',
        type: DataGridEditFieldType.TEXT,
        size: 6
    },
    classes: {
        index: "classes", label: "Khối, Lớp", type: DataGridEditFieldType.SELECT, size: 6,
        multiple: true,
        multipleSize: 4,
        options: [
            { value: "3", label: "Lớp 3" },
            { value: "4", label: "Lớp 4" },
            { value: "5", label: "Lớp 5" }
        ],
        select2: true,
    },
    parent: {
        index: "parent", label: "Danh mục cha", type: DataGridEditFieldType.SELECT, size: 6,
        table: "categories", valueField: "id", labelField: "name", treeMode: true, parentField: "parent", orderBy: "ordering asc"
    },
    brief: { index: "brief", label: "Mô tả", type: DataGridEditFieldType.TEXT, size: 12 },
    content: { index: "content", label: "Nội dung", type: DataGridEditFieldType.EDITOR, size: 12 },
    question_content: { index: "name", label: "Nội dung", type: DataGridEditFieldType.EDITOR, size: 6 },
    explaination: { index: "explaination", label: "Lý giải", type: DataGridEditFieldType.EDITOR, size: 6 },
    questionType: {
        index: "questionType", label: "Dạng câu hỏi", type: DataGridEditFieldType.SELECT, size: 6,
        options: [
            { value: 1, label: "Trắc nghiệm" },
            { value: 4, label: "Tự luận" }
        ],
        select2: true,
    },
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
    centerId: {
        index: "centerId",
        label: "Trung tâm",
        type: DataGridEditFieldType.SELECT,
        table: "center",
        valueField: "id",
        labelField: "name",
        size: 6
    },
    roomName: {
        index: 'name',
        label: 'Tên Phòng',
        type: DataGridEditFieldType.TEXT,
        size: 6
    },
    roomId: {
        index: "roomId",
        label: "Phòng học",
        type: DataGridEditFieldType.SELECT,
        table: "room",
        valueField: "id",
        labelField: "name",
        size: 6
    },
    subjectId: {
        index: "subjectId",
        label: "Môn học",
        type: DataGridEditFieldType.SELECT,
        table: "subject",
        valueField: "id",
        labelField: "name",
        tableCondition: 'status=1',
        size: 6
    },
    teacherId: {
        index: "teacherId",
        label: "Giáo viên",
        type: DataGridEditFieldType.SELECT,
        table: "teacher",
        valueField: "id",
        labelField: "name",
        size: 6
    },
    classId: {
        index: "classId",
        label: "Lớp học",
        type: DataGridEditFieldType.SELECT,
        table: "classes",
        valueField: "id",
        labelField: "name",
        tableCondition: 'status=1',
        size: 6
    },
    payment_periods: {
        index: "payment_periods",
        label: "Kỳ học phí",
        type: DataGridEditFieldType.MANY,
        multipleSize: 10,
        table: "payment_period",
        tableCondition: "status=1",
        tableField: "paymentPeriodId",
        linkTable: "class_payment_period",
        linkField: "classId",
        valueField: "id",
        labelField: "name",
        size: 6
    },
    className: {
        index: 'name',
        label: 'Tên lớp',
        type: DataGridEditFieldType.TEXT,
        size: 6
    },
    classCode: {
        index: 'code',
        label: 'Mã Lớp',
        type: DataGridEditFieldType.TEXT,
        size: 6
    },
    size: {
        index: "size",
        label: "Kích cỡ",
        type: DataGridEditFieldType.TEXT,
        size: 6
    },
    note: {
        index: "note",
        label: "Ghi chú",
        type: DataGridEditFieldType.TEXT,
        size: 6
    },
    studyDate: {
        index: "studyDate",
        label: "Ngày học",
        type: DataGridEditFieldType.DATE,
        size: 6
    },
    studyTime: {
        index: "studyTime",
        label: "Giờ học",
        type: DataGridEditFieldType.TEXT,
        size: 6
    },
    startDate: {
        index: "startDate",
        label: "Ngày bắt đầu",
        type: DataGridEditFieldType.DATE,
        size: 6
    },
    endDate: {
        index: "endDate",
        label: "Ngày kết thúc",
        type: DataGridEditFieldType.DATE,
        size: 6
    },
    level: {
        index: "level",
        label: "Khối lớp",
        type: DataGridEditFieldType.TEXT,
        size: 6
    },
    amount: {
        index: "amount",
        label: "Học phí",
        type: DataGridEditFieldType.TEXT,
        size: 6
    },
    feeType: {
        index: "feeType",
        label: "Loại học phí",
        type: DataGridEditFieldType.SELECT,
        options: [{
            value: 0, label: 'Theo buổi',
        }, {
            value: 1, label: 'Theo khóa'
        }],
        size: 6
    },
    classed: {
        index: "classed",
        label: "Trạng thái Xếp lớp",
        type: DataGridEditFieldType.SELECT,
        options: [{
            value: 0, label: 'Chưa xếp lớp',
        }, {
            value: 1, label: 'Đã xếp lớp'
        }],
        size: 6
    }
};
