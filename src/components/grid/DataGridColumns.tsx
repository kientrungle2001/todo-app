import { DataGridColumnActionType } from "@/types/grid/DataGridColumnActionType";
import { DataGridColumnType } from "@/types/grid/DataGridColumnType";
import { DataGridColumn } from "@/types/grid/DataGridColumn";

export const DataGridColumns: { [key: string]: DataGridColumn } = {
    addChildAction: { index: "addChildAction", label: "Thêm Con", type: DataGridColumnType.ACTIONS, actionType: DataGridColumnActionType.ADD_CHILD },
    addressCenter: { index: "address", label: "Địa chỉ" },
    alias: { index: "alias", label: "Đường dẫn" },
    amount: { index: "amount", label: "Học phí", type: DataGridColumnType.CURRENCY },
    attendanceClass: {
        index: "attendanceClass", label: "Điểm danh",
        sortable: false,
        type: DataGridColumnType.ACTIONS,
        actionType: DataGridColumnActionType.CUSTOM_LINK, 
        actionLinkFormat: (item: any, column: DataGridColumn, table: string): string => {
            return '/Table/class/' + item.id + '/detail#tab-attendance';
        }
    },
    studentClass: {
        index: "studentClass", label: "Danh sách lớp",
        sortable: false,
        type: DataGridColumnType.ACTIONS,
        actionType: DataGridColumnActionType.CUSTOM_LINK, 
        actionLinkFormat: (item: any, column: DataGridColumn, table: string): string => {
            return '/Table/class/' + item.id + '/detail#tab-students';
        }
    },
    // studyDate: { index: "studyDate", label: "Ngày Điểm danh", type: DataGridColumnType.DATE },
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
    centerId: {
        index: "centerId", label: "Trung tâm",
        type: DataGridColumnType.REFERENCE,
        referenceTable: "center",
        referenceField: "name"
    },
    centerRooms: {
        index: "centerRooms", label: "Phòng học",
        sortable: false,
        type: DataGridColumnType.ACTIONS,
        actionType: DataGridColumnActionType.CUSTOM_LINK, 
        actionLinkFormat: (item: any, column: DataGridColumn, table: string): string => {
            return '/Table/center/' + item.id + '/detail#tab-rooms';
        }
    },
    centerClasses: {
        index: "centerClasses", label: "Lớp học",
        sortable: false,
        type: DataGridColumnType.ACTIONS,
        actionType: DataGridColumnActionType.CUSTOM_LINK, 
        actionLinkFormat: (item: any, column: DataGridColumn, table: string): string => {
            return '/Table/center/' + item.id + '/detail#tab-classes';
        }
    },
    classId: {
        index: "classId", label: "Lớp học",
        type: DataGridColumnType.REFERENCE,
        referenceTable: "classes",
        referenceField: "name"
    },
    studyDate: {
        index: "studyDate", label: "Ngày học", type: DataGridColumnType.DATE,
        linkFormat: (name: any, item: any): string => {
            return '/Table/class_schedule/' + item.id + '/detail';
        }
    },
    studyTime: { index: "studyTime", label: "Giờ học" },
    codeCenter: { index: "code", label: "Mã Trung tâm" },
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
    display: {
        index: "display", type: DataGridColumnType.STATUS, label: "Hiển thị", map: {
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
    endDate: { index: "endDate", label: "Ngày kết thúc", type: DataGridColumnType.DATE },
    editAction: { index: "editAction", label: "Sửa", type: DataGridColumnType.ACTIONS, actionType: DataGridColumnActionType.EDIT, width: "1%", sortable: false },
    feeType: {
        index: "feeType", label: "Cách tính", type: DataGridColumnType.STATUS, map: {
            "0": "Theo buổi",
            "1": "Theo khóa"
        }
    },
    id: { index: "id", label: "ID", width: "1%" },
    nameCategory: { index: "name", label: "Tên Danh mục", linkFormat: (value: any, item: any) => `/Table/admin_category/${item.id}/detail`, treeMode: true },
    nameCenter: {
        index: "name", label: "Tên Trung tâm", linkFormat: (name: any, item: any): string => {
            return '/Table/center/' + item.id + '/detail';
        }
    },
    nameClass: {
        index: "name", label: "Tên Lớp", linkFormat: (name: any, item: any): string => {
            return '/Table/class/' + item.id + '/detail';
        }
    },
    nameRoom: {
        index: "name", label: "Tên Phòng", linkFormat: (name: any, item: any): string => {
            return '/Table/room/' + item.id + '/detail';
        }
    },
    note: { index: "note", label: "Ghi chú" },
    ordering: { index: "ordering", label: "Thứ tự", type: DataGridColumnType.NUMBER, inputable: true },
    practice: {
        index: "practice", type: DataGridColumnType.STATUS, label: "Luyện tập", map: {
            0: 'Chưa kích hoạt',
            1: 'Đã kích hoạt'
        },
        hideLabel: true,
        statusToggable: true
    },
    question_content: {
        index: "name", label: "Nội dung", isHtml: true,
    },
    roomId: {
        index: "roomId", label: "Phòng",
        type: DataGridColumnType.REFERENCE,
        referenceTable: "room",
        referenceField: "name"
    },
    size: { index: "size", label: "Kích cỡ" },
    startDate: { index: "startDate", label: "Ngày bắt đầu", type: DataGridColumnType.DATE },
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
    subjectId: {
        index: "subjectId", label: "Môn học",
        type: DataGridColumnType.REFERENCE,
        referenceTable: "subject",
        referenceField: "name"
    },
    teacherId: {
        index: "teacherId", label: "Giáo viên",
        type: DataGridColumnType.REFERENCE,
        referenceTable: "teacher",
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
