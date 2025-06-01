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
        tableCondition: 'status=1',
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
        tableCondition: 'status=1',
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
};