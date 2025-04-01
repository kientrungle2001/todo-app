import { DataGridColumn, DataGridFilterColumn, DataGridMessage, DataGridPagination, DataGridSort, DataGridSortOption, DataGridTableJoin } from "@/components/grid/DataGridColumnTypes";
import React, { useEffect } from "react";
import { buildTree, flatTree } from "@/api/tree";
import { storage } from "@/api/storage";
import { DataGridEditField } from "./DataGridEditTypes";
import DataGrid from "./DataGrid";
import { tableRepository } from "@/api/repositories/Table";
export enum TableGridDetailType {
    DETAIL = 'detail',
    GRID = 'grid'
}
export interface DataGridDetailField extends DataGridColumn {
    size?: number;
}

export interface TableGridDetail {
    type?: TableGridDetailType;
    referenceField?: string;
    referenceType?: string;
    fields?: DataGridDetailField[];
    settings?: TableGridSettings;
}

export interface TableGridSettings {
    title: string,
    treeMode?: boolean;
    treeParentField?: string;
    fields?: string | string[];
    searchFields?: string[];
    joins?: DataGridTableJoin[];
    software?: number;
    site?: number;
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

interface TableGridProps {
    controller: string;
    // Add any additional props you need here
    settings: TableGridSettings
}

export const TableGrid: React.FC<TableGridProps> = ({ controller, settings }): React.ReactElement => {

    const [pagination, setPagination] = React.useState<DataGridPagination>(settings.pagination);
    const [items, setItems] = React.useState<any[]>([]);
    const [totalItems, setTotalItems] = React.useState<number>(0);
    const [filterData, setFilterData] = React.useState<any>({});
    const [searchText, setSearchText] = React.useState("");
    const [sorts, setSorts] = React.useState<DataGridSort[]>(settings.defaultSorts);
    const [messages, setMessages] = React.useState<DataGridMessage[]>([]);
    const [isCheckedAll, setIsCheckedAll] = React.useState<boolean>(false);
    const [checkedItemIds, setCheckedItemIds] = React.useState<number[]>([]);

    const setCurrentPage = (page: number) => { setPagination({ ...pagination, currentPage: page }); };
    const setPageSize = (pageSize: number) => { setPagination({ ...pagination, pageSize: pageSize, currentPage: 1 }); };
    const setSavedFilterData = (data: any) => { storage.set(controller + '.filterData', data); };

    useEffect(() => {
        const savedFilterData = storage.get(controller + '.filterData');
        if (savedFilterData) {
            setFilterData(savedFilterData.filterData);
            setPagination({ pageSize: savedFilterData.pageSize, currentPage: savedFilterData.currentPage });
            setSearchText(savedFilterData.searchText);
        }
    }, []);

    useEffect(() => {
        setSavedFilterData({ filterData, searchText, currentPage: pagination.currentPage, pageSize: pagination.pageSize, sorts });
    }, [filterData, searchText, pagination.currentPage, pagination.pageSize, sorts]);

    const handleDeleteItem = (item: any) => {
        // Implement your delete logic here
        if (window.confirm(`Are you sure you want to delete item with ID: ${item.id}?`)) {
            console.log(`Deleting item with ID: ${item.id}`);
            tableRepository.deleteItem(settings, item).then(() => {
                handleAfterDelete(item);
            });
        }
    };

    const handleAfterDelete = (item: any) => {
        let updatedMessages: DataGridMessage[] = [...messages];
        updatedMessages.push({
            label: `Item #${item.id} has been deleted successfully`,
            variant: "success"
        });
        setMessages(updatedMessages);
        handleListItems();
    };

    const handleAfterChangeStatus = (column: DataGridColumn, item: any) => {
        handleListItems();
    }

    const handleAfterSaveInputableColumn = (column: DataGridColumn) => {
        let updatedMessages: DataGridMessage[] = [...messages];
        updatedMessages.push({
            label: `Column #${column.label} has been updated successfully`,
            variant: "success"
        });
        setMessages(updatedMessages);
        handleListItems();
    }

    const handleListItems = () => {
        tableRepository.getList(settings, {
            settings: JSON.parse(JSON.stringify(settings)),
            search: searchText, filterData: JSON.parse(JSON.stringify(filterData)),
            sorts: JSON.parse(JSON.stringify(sorts)),
            page: pagination.currentPage, pageSize: pagination.pageSize,
        })
            .then((resp: any) => {
                if (settings.treeMode)
                    setItems(flatTree(buildTree(resp.data.items,
                        settings.treeParentField ?? 'parent')));
                else
                    setItems(resp.data.items);
                setTotalItems(resp.data.totalItems);
                setIsCheckedAll(false);
                setCheckedItemIds([]);
            });
    };


    useEffect(() => { setPagination({ ...pagination, currentPage: 1 }); }, [searchText, filterData]);

    useEffect(() => {
        const handler = setTimeout(() => { handleListItems(); }, 300);
        return () => { clearTimeout(handler); };
    }, [pagination, searchText, sorts, filterData]);

    return <>
        <DataGrid title={settings.title}
            controller={controller} table={settings.table} defaultSorts={settings.defaultSorts}
            software={settings.software} site={settings.site}
            messages={messages} setMessages={setMessages}
            pagination={pagination} totalItems={totalItems} setCurrentPage={setCurrentPage} setPageSize={setPageSize}
            columns={settings.columns} filters={settings.filters}
            sortOptions={settings.sortOptions} sorts={sorts} setSorts={setSorts}
            items={items}
            filterData={filterData} setFilterData={setFilterData}
            searchText={searchText} setSearchText={setSearchText}
            onDeleteItem={handleDeleteItem} onAfterChangeStatus={handleAfterChangeStatus}
            onAfterSaveInputableColumn={handleAfterSaveInputableColumn}
            isCheckedAll={isCheckedAll} setIsCheckedAll={setIsCheckedAll}
            checkedItemIds={checkedItemIds} setCheckedItemIds={setCheckedItemIds}
            addNewLabel={settings.addNewLabel} deleteSelectedsLabel={settings.deleteSelectedsLabel} />
    </>
}
