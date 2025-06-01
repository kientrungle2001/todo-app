import { DataGridFilterColumnType } from "./DataGridFilterColumnType";


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
