export enum DataGridEditFieldType {
    TEXT = "text",
    NUMBER = "number",
    DATE = "date",
    CURRENCY = "currency",
    SELECT = "select",
    CHECKBOX = "checkbox",
    STATUS = "status",
    EDITOR = "editor",
    IMAGE = "image",
};

export enum DataGridEditMode {
    ADD = "add",
    EDIT = "edit"
}

export interface DataGridEditField {
    index: string;
    label: string;
    type: DataGridEditFieldType;
    statusToggable?: boolean;
    multiple?: boolean;
    size?: number;
    options?: any[];
    map?: any;
    table?: string;
    tableCondition?: string | ((item: any) => string);
    valueField?: string;
    labelField?: string;
    treeMode?: boolean;
    parentField?: string;
    orderBy?: string;
    multipleSize?: number;
    select2?: boolean;
}