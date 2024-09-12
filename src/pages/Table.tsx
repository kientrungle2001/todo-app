import DataGrid, { DataGridColumn, DataGridColumnType, DataGridFilterColumn, DataGridPagination, DataGridSort, DataGridSortDirection, DataGridSortOption } from "@/components/grid/DataGrid";
import React, { useEffect } from "react";
import { Button } from "react-bootstrap";

export default function Table(): React.ReactElement {
    
    const gridPagination: DataGridPagination = {
        currentPage: 1,
        pageSize: 10,
        totalItems: 1
    };
    
    const gridColumns: DataGridColumn[] = [
        { index: "id", label: "ID" },
        { index: "name", label: "Name" },
        { index: "email", label: "Email" },
        { index: "phone", label: "Phone" },
        { index: "address", label: "Address" },
        {
            index: "actions", label: "Actions", type: DataGridColumnType.ACTIONS, customFormat: (value: any, item: any): string | React.ReactNode => {
                return (
                    <>
                        <Button variant="primary" size="sm">Edit</Button>
                        <Button variant="danger" size="sm">Delete</Button>
                    </>
                )
            }
        }
    ];

    const gridFilters: DataGridFilterColumn[] = [
        { index: "id", label: "ID" },
        { index: "name", label: "Name" },
        { index: "email", label: "Email" },
        { index: "phone", label: "Phone" },
        { index: "address", label: "Address" }
    ];

    const gridSortOptions: DataGridSortOption[] = [
        {
            index: "nameAsc",
            label: "Name Ascending",
            sorts: [
                { index: "name", direction: DataGridSortDirection.ASCENDING }
            ]
        },
        {
            index: "nameDesc",
            label: "Name Descending",
            sorts: [
                { index: "name", direction: DataGridSortDirection.DESCENDING }
            ]
        }
    ];

    const gridDefaultSorts: DataGridSort[] = [
        { index: "id", direction: DataGridSortDirection.ASCENDING }
    ];

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

    const [pagination, setPagination] = React.useState<DataGridPagination>(gridPagination);
    const [items, setItems] = React.useState<any[]>(gridItems);
    const [filterData, setFilterData] = React.useState<any>({});
    const [searchText, setSearchText] = React.useState("");
    const [sorts, setSorts] = React.useState<DataGridSort[]>(gridDefaultSorts);
    useEffect(() => {
        console.log("Filter data:", filterData);
        console.log("Search text:", searchText);
        console.log("Sorts:", sorts);
        console.log("Pagination:", pagination);
    }, [pagination, searchText, sorts, filterData]);
    return <>
        <DataGrid defaultSorts={gridDefaultSorts} setCurrentPage={setCurrentPage} setPageSize={setPageSize} title="Person Management" columns={gridColumns} filters={gridFilters} sortOptions={gridSortOptions} items={items} pagination={pagination} filterData={filterData} setFilterData={setFilterData} sorts={sorts} setSorts={setSorts} searchText={searchText} setSearchText={setSearchText} />
    </>
}