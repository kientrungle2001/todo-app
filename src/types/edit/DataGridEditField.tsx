import { TableGridSettings } from "../TableGridSettings";
import { DataGridEditFieldType } from "./DataGridEditFieldType";


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
    tableCondition?: string | ((item: any, field?: DataGridEditField) => string | any);
    valueField?: string;
    labelField?: string;
    treeMode?: boolean;
    parentField?: string;
    orderBy?: string;
    multipleSize?: number;
    select2?: boolean;
    tabGroup?: string;
    gridSettings?: TableGridSettings;
}
