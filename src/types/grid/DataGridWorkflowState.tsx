import { DataGridWorkflowAction } from "./DataGridWorkflowAction";


export interface DataGridWorkflowState {
    state: string | number;
    label: string;
    actions?: DataGridWorkflowAction[];
}
