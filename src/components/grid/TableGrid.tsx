import DataGrid, { DataGridColumn, DataGridFilterColumn, DataGridPagination, DataGridSort, DataGridSortOption } from "@/components/grid/DataGrid";
import React, { useEffect } from "react";
import axios from '@/api/axiosInstance';
import { DataGridEditField } from "./DataGridEdit";

export interface TableGridSettings {
    pagination: DataGridPagination;
    columns: DataGridColumn[];
    filters: DataGridFilterColumn[];
    sortOptions: DataGridSortOption[];
    defaultSorts: DataGridSort[];
    table: string;
    addFields: DataGridEditField[];
    editFields?: DataGridEditField[];
}

interface TableGridProps {
    // Add any additional props you need here
    settings: TableGridSettings
}

export const TableGrid: React.FC<TableGridProps> = ({ settings }): React.ReactElement => {

    const setCurrentPage = (page: number) => {
        setPagination({ ...pagination, currentPage: page });
    };

    const setPageSize = (pageSize: number) => {
        setPagination({ ...pagination, pageSize: pageSize, currentPage: 1 });
    };

    const [pagination, setPagination] = React.useState<DataGridPagination>(settings.pagination);
    const [items, setItems] = React.useState<any[]>([]);
    const [totalItems, setTotalItems] = React.useState<number>(0);
    const [filterData, setFilterData] = React.useState<any>({});
    const [searchText, setSearchText] = React.useState("");
    const [sorts, setSorts] = React.useState<DataGridSort[]>(settings.defaultSorts);

    const handleAfterDelete = (item: any) => {
        handleListItems();
    };

    const handleListItems = () => {
        axios.post('/tables/search/' + settings.table, {
            settings: JSON.parse(JSON.stringify(settings)),
            search: searchText,
            filterData: JSON.parse(JSON.stringify(filterData)),
            sorts: JSON.parse(JSON.stringify(sorts)),
            page: pagination.currentPage,
            pageSize: pagination.pageSize,
        }).then((resp) => {
            setItems(resp.data.items);
            setTotalItems(resp.data.totalItems);
        });
    };


    useEffect(() => {
        setPagination({ ...pagination, currentPage: 1 });
    }, [searchText]);
    useEffect(() => {
        const handler = setTimeout(() => {
            handleListItems();
        }, 300);
        return () => {
            clearTimeout(handler);
        };

    }, [pagination, searchText, sorts, filterData]);
    return <>
        <DataGrid totalItems={totalItems} table={settings.table} defaultSorts={settings.defaultSorts} setCurrentPage={setCurrentPage} setPageSize={setPageSize} title="Person Management" columns={settings.columns} filters={settings.filters} sortOptions={settings.sortOptions} items={items} pagination={pagination} filterData={filterData} setFilterData={setFilterData} sorts={sorts} setSorts={setSorts} searchText={searchText} setSearchText={setSearchText} onAfterDelete={handleAfterDelete} />
    </>
}