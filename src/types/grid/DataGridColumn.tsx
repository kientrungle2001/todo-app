import { DataGridColumnActionType } from "./DataGridColumnActionType";
import { DataGridColumnType } from "./DataGridColumnType";
import { DataGridWorkflowState } from "./DataGridWorkflowState";

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