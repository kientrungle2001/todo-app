import { ButtonVariant } from "react-bootstrap/esm/types";

export enum DataGridColumnType {
    TEXT = "text",
    NUMBER = "number",
    IMAGE = "image",
    DATE = "date",
    CURRENCY = "currency",
    STATUS = "status",
    WORKFLOW = "workflow",
    REFERENCE = "reference",
    GROUP = "group",
    ACTIONS = "actions"
}

export enum DataGridFilterColumnType {
    TEXT = "text",
    NUMBER = "number",
    DATE = "date",
    CURRENCY = "currency",
    SELECT = "select",
    CHECKBOX = "checkbox",
    STATUS = "status",
}

export enum DataGridColumnActionType {
    EDIT = "edit",
    DELETE = "delete",
    ADD_CHILD = "add_child"
}

export interface DataGridTableJoin {
    table: string;
    alias?: string;
    type?: "inner" | "left" | "right";
    condition?: string;
}

export interface DataGridWorkflowState {
    state: string | number;
    label: string;
    actions?: DataGridWorkflowAction[];
}

export interface DataGridWorkflowAction {
    label: string;
    newState: string | number; // new state to transition to
}

export interface DataGridColumn {
    index: string;
    label: string;
    type?: DataGridColumnType;
    treeMode?: boolean;
    multiple?: boolean;
    inputable?: boolean;
    statusToggable?: boolean;
    format?: string;
    customFormat?: (value: any, item: any, table: string) => string | React.ReactNode;
    options?: any[];
    linkFormat?: (value: any, item: any) => string;
    sortable?: boolean;
    actionType?: DataGridColumnActionType;
    actionLinkFormat?: (item: any, column: DataGridColumn, controller: string) => string | React.ReactNode,
    actionAddChildParentField?: string,
    actionAddChildParentFields?: string[],
    actionAddChildController?: string,
    width?: string;
    map?: any;
    workflow?: DataGridWorkflowState[];
    hideLabel?: boolean;
    isHtml?: boolean;
    groupSeparator?: string;
    groupChildren?: DataGridColumn[];
    referenceTable?: string;
    referenceField?: string;
}

export interface DataGridFilterColumn {
    index: string;
    label: string;
    sqlIndex?: string;
    comparisonOperator?: "like" | "equal" | "inset";
    type?: DataGridFilterColumnType;
    table?: string;
    valueField?: string;
    labelField?: string;
    treeMode?: boolean;
    treeParentField?: string;
    orderBy?: string;
    format?: string;
    customFormat?: (value: any, item: any) => string | React.ReactNode;
    options?: any[];
    map?: any;
    select2?: boolean;
}

// declare map 

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
};

export interface DataGridSort {
    index: string;
    direction: DataGridSortDirection;
}

export enum DataGridSortDirection {
    ASCENDING = "asc",
    DESCENDING = "desc"
}

export interface DataGridSortOption {
    index: string;
    label: string;
    sorts: DataGridSort[];
}

export const DataGridSortOptions: { [key: string]: DataGridSortOption } = {
    idAsc: {
        index: "idAsc",
        label: "ID tăng",
        sorts: [{ index: "id", direction: DataGridSortDirection.ASCENDING },]
    },
    idDesc: {
        index: "idDesc",
        label: "ID giảm",
        sorts: [{ index: "id", direction: DataGridSortDirection.DESCENDING },]
    },
    orderingAsc: {
        index: "orderingAsc",
        label: "Thứ tự tăng",
        sorts: [
            { index: "ordering", direction: DataGridSortDirection.ASCENDING },
            { index: "id", direction: DataGridSortDirection.DESCENDING },
        ],
    },
    orderingDesc: {
        index: "orderingDesc",
        label: "Thứ tự giảm",
        sorts: [
            { index: "ordering", direction: DataGridSortDirection.DESCENDING },
            { index: "id", direction: DataGridSortDirection.ASCENDING },
        ],
    },
};

export interface DataGridPagination {
    currentPage: number;
    pageSize: number;
}

export interface DataGridMessage {
    label: string;
    variant: ButtonVariant;
}