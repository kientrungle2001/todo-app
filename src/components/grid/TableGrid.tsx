import DataGrid, { DataGridColumn, DataGridFilterColumn, DataGridPagination, DataGridSort, DataGridSortOption } from "@/components/grid/DataGrid";
import React, { useEffect } from "react";
import axios from '@/api/axiosInstance';

export interface TableGridSettings {
    pagination: DataGridPagination;
    columns: DataGridColumn[];
    filters: DataGridFilterColumn[];
    sortOptions: DataGridSortOption[];
    defaultSorts: DataGridSort[];
    table: string;
}

interface TableGridProps {
    // Add any additional props you need here
    settings: TableGridSettings
}

export const TableGrid: React.FC<TableGridProps> = ({settings}): React.ReactElement => {

    const gridItems: any[] = [
        {
            id: 1,
            name: "John Doe",
            email: "john.doe@example.com",
            phone: "123-456-7890",
            address: "123 Main St"
        }
    ];

    const setCurrentPage = (page: number) => {
        setPagination({...pagination, currentPage: page});
    };

    const setPageSize = (pageSize: number) => {
        setPagination({...pagination, pageSize: pageSize, currentPage: 1});
    };

    const [pagination, setPagination] = React.useState<DataGridPagination>(settings.pagination);
    const [items, setItems] = React.useState<any[]>(gridItems);
    const [filterData, setFilterData] = React.useState<any>({});
    const [searchText, setSearchText] = React.useState("");
    const [sorts, setSorts] = React.useState<DataGridSort[]>(settings.defaultSorts);
    useEffect(() => {
        console.log("Filter data:", filterData);
        console.log("Search text:", searchText);
        console.log("Sorts:", sorts);
        console.log("Pagination:", pagination);
        axios.get('/users', {
            params: JSON.parse(JSON.stringify(settings))
        }).then((resp) => {
            console.log(resp);
            
        });
    }, [pagination, searchText, sorts, filterData]);
    return <>
        <DataGrid table={settings.table} defaultSorts={settings.defaultSorts} setCurrentPage={setCurrentPage} setPageSize={setPageSize} title="Person Management" columns={settings.columns} filters={settings.filters} sortOptions={settings.sortOptions} items={items} pagination={pagination} filterData={filterData} setFilterData={setFilterData} sorts={sorts} setSorts={setSorts} searchText={searchText} setSearchText={setSearchText} />
    </>
}