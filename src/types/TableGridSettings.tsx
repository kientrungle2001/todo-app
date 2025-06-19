import { DataGridPagination } from "./grid/DataGridPagination";
import { DataGridSortOption } from "./grid/DataGridSortOption";
import { DataGridSort } from "./grid/DataGridSort";
import { DataGridFilterColumn } from "./grid/DataGridFilterColumn";
import { DataGridTableJoin } from "./grid/DataGridTableJoin";
import { DataGridColumn } from "./grid/DataGridColumn";
import { DataGridEditField } from "./edit/DataGridEditField";
import { TableGridDetail } from "./detail/TableGridDetail";


export interface TableGridSettings {
    title: string;
    treeMode?: boolean;
    treeParentField?: string;
    fields?: string | string[];
    searchFields?: string[];
    joins?: DataGridTableJoin[];
    software?: number;
    site?: number;
    viewMode?: 'list' | 'grid';
    pagination: DataGridPagination;
    columns: DataGridColumn[];
    filters: DataGridFilterColumn[];
    sortOptions: DataGridSortOption[];
    defaultSorts: DataGridSort[];
    table: string;
    addFields: DataGridEditField[];
    editFields?: DataGridEditField[];
    addNewLabel?: string;
    deleteSelectedsLabel?: string;
    updateLabel?: string;
    details?: TableGridDetail[];
}
