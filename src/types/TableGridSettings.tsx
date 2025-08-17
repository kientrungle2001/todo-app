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
    customRowTemplate?: (item: any, checkedItemIds: number[], columns: DataGridColumn[], defaultFilters: any, table: string, inputableMap: any, setInputableMap: (inputableMap: any) => void, onAfterChangeStatus: (column: DataGridColumn, item: any) => void, handleEditItem: (item: any) => void, onDeleteItem: (item: any) => void, handleAddChildItem: (item: any, column: DataGridColumn) => void, toggleCheckedItem: (id: number) => void) => string | React.ReactNode;
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
