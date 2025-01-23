import { DataGridFilterColumn, DataGridFilterColumnType } from "./DataGridColumnTypes";

export const DataGridFilterColumns: { [key: string]: DataGridFilterColumn } = {
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