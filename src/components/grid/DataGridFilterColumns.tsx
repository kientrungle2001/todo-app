import { DataGridFilterColumn } from "@/types/grid/DataGridFilterColumn";
import { DataGridFilterColumnType } from "@/types/grid/DataGridFilterColumnType";

export const DataGridFilterColumns: { [key: string]: DataGridFilterColumn } = {
    centerId: {
        index: 'centerId',
        label: 'Trung tâm',
        type: DataGridFilterColumnType.SELECT,
        table: 'center',
        valueField: 'id',
        labelField: 'name',
        tableCondition: 'status=1',
        comparisonOperator: 'equal'
    },
    status: {
        index: "status", label: "Trạng thái", type: DataGridFilterColumnType.STATUS, map: {
            0: 'Chưa kích hoạt',
            1: 'Đã kích hoạt'
        },
        comparisonOperator: "equal"
    },
    questionType: {
        index: "questionType", label: "Dạng câu hỏi", type: DataGridFilterColumnType.SELECT, size: 2,
        options: [
            { value: 1, label: "Trắc nghiệm" },
            { value: 4, label: "Tự luận" }
        ],
        select2: true
    },
    id: { index: "id", label: "ID", type: DataGridFilterColumnType.TEXT },
    trial: {
        index: "trial",
        label: "Dùng thử",
        type: DataGridFilterColumnType.STATUS,
        map: {
            0: 'Chưa kích hoạt',
            1: 'Đã kích hoạt'
        },
        comparisonOperator: "equal"
    },
    roomId: {
        index: 'roomId',
        label: 'Phòng học',
        type: DataGridFilterColumnType.SELECT,
        table: 'room',
        valueField: 'id',
        labelField: 'name',
        tableCondition: (filterData) => 'status=1' + (filterData.centerId ? ' and centerId=' + filterData.centerId : ''),
        comparisonOperator: 'equal'
    },
    subjectId: {
        index: 'subjectId',
        label: 'Môn học',
        type: DataGridFilterColumnType.SELECT,
        table: 'subject',
        valueField: 'id',
        labelField: 'name',
        tableCondition: 'status=1',
        comparisonOperator: 'equal'
    },
    categoryId: {
        index: "categoryId", label: "Danh mục", type: DataGridFilterColumnType.SELECT,
        table: "categories",
        valueField: "id",
        labelField: "name",
        select2: true,
        comparisonOperator: "equal",
        treeMode: true,
    },
    categoryIds: {
        index: "categoryIds", label: "Danh mục", type: DataGridFilterColumnType.SELECT,
        table: "categories",
        valueField: "id",
        labelField: "name",
        select2: true,
        comparisonOperator: "inset",
        treeMode: true,
    },
    testId: {
        index: "testId", label: "Đề thi", type: DataGridFilterColumnType.SELECT,
        table: "tests",
        valueField: "id",
        labelField: "name",
        select2: true,
        comparisonOperator: "inset",
        treeMode: true,
    },
    teacherId: {
        index: 'teacherId',
        label: 'Giáo viên',
        type: DataGridFilterColumnType.SELECT,
        table: 'teacher',
        valueField: 'id',
        labelField: 'name',
        tableCondition: (filterData) => 'status=1' + (filterData.subjectId ? ' and subjectId=' + filterData.subjectId : ''),
        comparisonOperator: 'equal'
    },
    courseId: {
        index: "courseId", label: "Khóa học", type: DataGridFilterColumnType.SELECT,
        table: "courses",
        valueField: "id",
        labelField: "name",
        select2: true,
        comparisonOperator: "equal",
        treeMode: false,
    },
    courseResourceId: {
        index: "courseResourceId", label: "Tài nguyên Khóa học", type: DataGridFilterColumnType.SELECT,
        table: "courses_resources",
        valueField: "id",
        labelField: "name",
        select2: true,
        comparisonOperator: "equal",
        treeMode: true,
    },
    parents: {
        index: "parents", label: "Danh mục cha", type: DataGridFilterColumnType.SELECT,
        table: "categories",
        valueField: "id",
        labelField: "name",
        treeMode: true,
        select2: true,
        comparisonOperator: "inset"
    },
    display: {
        index: "display", label: "Hiển thị", type: DataGridFilterColumnType.STATUS, map: {
            0: 'Chưa kích hoạt',
            1: 'Đã kích hoạt'
        },
        comparisonOperator: "equal"
    },
    document: {
        index: "document", label: "Tài liệu", type: DataGridFilterColumnType.STATUS, map: {
            0: 'Chưa kích hoạt',
            1: 'Đã kích hoạt'
        },
        comparisonOperator: "equal"
    },
};