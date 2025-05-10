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
    ADD_CHILD = "add_child",
    CUSTOM_LINK = "custom_link",
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
    size?: number;
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
    tableCondition?: string | ((item: any) => string);
}

// declare map 

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
    nameAsc: {
        index: "nameAsc",
        label: "Tên Danh mục tăng",
        sorts: [
            { index: "name", direction: DataGridSortDirection.ASCENDING },
            { index: "id", direction: DataGridSortDirection.DESCENDING },
        ]
    },
    nameDesc: {
        index: "nameDesc",
        label: "Tên Danh mục giảm",
        sorts: [
            { index: "name", direction: DataGridSortDirection.DESCENDING },
            { index: "id", direction: DataGridSortDirection.ASCENDING },
        ]
    },
    reversedNameAsc: {
        index: "reversedNameAsc",
        label: "Tên tăng",
        sorts: [
            { index: "reversedName", direction: DataGridSortDirection.ASCENDING },
            { index: "id", direction: DataGridSortDirection.DESCENDING },
        ]
    },
    reversedNameDesc: {
        index: "reversedNameDesc",
        label: "Tên giảm",
        sorts: [
            { index: "reversedName", direction: DataGridSortDirection.DESCENDING },
            { index: "id", direction: DataGridSortDirection.ASCENDING },
        ]
    },
    studyDateAsc: {
        index: "studyDateAsc",
        label: "Ngày học tăng",
        sorts: [
            { index: "studyDate", direction: DataGridSortDirection.ASCENDING },
            { index: "studyTime", direction: DataGridSortDirection.ASCENDING },
            { index: "id", direction: DataGridSortDirection.DESCENDING },
        ]
    },
    studyDateDesc: {
        index: "studyDateDesc",
        label: "Ngày học giảm",
        sorts: [
            { index: "studyDate", direction: DataGridSortDirection.DESCENDING },
            { index: "studyTime", direction: DataGridSortDirection.DESCENDING },
            { index: "id", direction: DataGridSortDirection.ASCENDING },
        ]
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