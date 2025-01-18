import { DataGridColumn, DataGridColumnType, DataGridFilterColumn, DataGridFilterColumns, DataGridPagination, DataGridSort, DataGridSortDirection, DataGridSortOption, DataGridTableJoin } from "@/components/grid/DataGridColumnTypes";
import { DataGridColumns } from "@/components/grid/DataGridColumns";
import { DataGridEditFields } from "@/components/grid/DataGridEditFields";
import { DataGridEditField, DataGridEditFieldType } from "@/components/grid/DataGridEditTypes";
import { TableGridSettings } from "@/components/grid/TableGrid";

const gridTitle: string = "Quản lý Tài nguyên Khóa học";
const gridAddNewLabel: string = "Thêm Tài nguyên Khóa học";
const gridUpdateLabel: string = "Cập nhật Tài nguyên Khóa học";
const gridDeleteSelectedsLabel: string = "Xóa các Tài nguyên Khóa học đã chọn";
const gridTable: string = "courses_resources";
const gridJoins: DataGridTableJoin[] = [
    {
        table: 'courses',
        alias: 'c',
        type: 'left',
        condition: 't.courseId=c.id'
    }
];
const gridSearchFields: string[] = ["id", "name"];
const gridFields: string[] = ["id", "parent", "name", "alias", "courseId", "ordering", "status", "image", "type", "c.categoryId as categoryIds", '1.0 as questionType'];

const gridColumns: DataGridColumn[] = [
    DataGridColumns.id,
    {
        index: "name", label: "Tên Tài nguyên Khóa học",
        linkFormat: (value: any, item: any) => `/Table/admin_course_resource/${item.id}/edit`,
        treeMode: true
    },
    DataGridColumns.alias,
    DataGridColumns.courseId,
    DataGridColumns.ordering,
    DataGridColumns.status,
    { ...DataGridColumns.addChildAction, actionAddChildParentFields: ['courseId', 'status'] },
    { ...DataGridColumns.addChildAction, index: 'addQuestion', label: 'Thêm câu hỏi', actionAddChildController: 'admin_question2', actionAddChildParentField: 'courseResourceId', actionAddChildParentFields: ['courseId', 'status', 'categoryIds', 'questionType'] },
    DataGridColumns.editAction,
    DataGridColumns.deleteAction
];

const gridPagination: DataGridPagination = { currentPage: 1, pageSize: 5000 };

const gridFilters: DataGridFilterColumn[] = [
    DataGridFilterColumns.id,
    DataGridFilterColumns.courseId,
    DataGridFilterColumns.status
];

const gridSortOptions: DataGridSortOption[] = [
    {
        index: "nameAsc",
        label: "Tên Tài nguyên Khóa học tăng",
        sorts: [
            { index: "name", direction: DataGridSortDirection.ASCENDING },
            { index: "id", direction: DataGridSortDirection.DESCENDING },
        ]
    },
    {
        index: "nameDesc",
        label: "Tên Tài nguyên Khóa học giảm",
        sorts: [
            { index: "name", direction: DataGridSortDirection.DESCENDING },
            { index: "id", direction: DataGridSortDirection.ASCENDING },
        ]
    }
];

const gridDefaultSorts: DataGridSort[] = [{ index: "ordering", direction: DataGridSortDirection.ASCENDING }];

const gridAddFields: DataGridEditField[] = [
    DataGridEditFields.courseId,
    {
        index: "parent", label: "Mục cha", type: DataGridEditFieldType.SELECT, size: 8,
        table: "courses_resources", valueField: "id", labelField: "name", treeMode: true,
        tableCondition: (item) => "courseId = '" + item.courseId + "' and id <> '" + (item.id ?? 0) + "'",
    },
    { index: "name", label: "Tên Tài nguyên Khóa học", type: DataGridEditFieldType.TEXT, size: 12 },
    { ...DataGridEditFields.alias, size: 12 },
    {
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
    { index: "image", label: "Hình ảnh", type: DataGridEditFieldType.IMAGE, size: 12 },
    { index: "brief", label: "Mô tả", type: DataGridEditFieldType.TEXT, size: 12 },
    { index: "content", label: "Nội dung", type: DataGridEditFieldType.EDITOR, size: 12 },
    {
        index: "hardiness", label: "Độ khó", type: DataGridEditFieldType.SELECT, size: 12, options: [{
            value: 'basic',
            label: 'Cơ bản',
        }, {
            value: 'advanced',
            label: 'Nâng cao'
        }]
    },
    DataGridEditFields.trial,
    DataGridEditFields.status,
];


export const PmtvAdminCourseResourceSettings: TableGridSettings = {
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
    addNewLabel: gridAddNewLabel,
    deleteSelectedsLabel: gridDeleteSelectedsLabel,
    updateLabel: gridUpdateLabel,
    treeMode: true,
}
