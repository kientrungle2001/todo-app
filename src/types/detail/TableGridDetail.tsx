import { DataGridDetailField } from "./DataGridDetailField";
import { TableGridDetailType } from "./TableGridDetailType";
import { TableGridSettings } from "../TableGridSettings";


export interface TableGridDetail {
    type?: TableGridDetailType;
    label?: string;
    referenceField?: string;
    referenceType?: string;
    fields?: DataGridDetailField[];
    settings?: TableGridSettings;
    controller?: string;
    customFilters?: (item: any) => any;
}
