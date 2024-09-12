import DataGrid, { DataGridColumn, DataGridColumnType, DataGridFilterColumn, DataGridPagination, DataGridSortDirection, DataGridSortOption } from "@/components/grid/DataGrid";
import { Button } from "react-bootstrap";

export default function Table(): React.ReactElement {
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

    const gridPagination: DataGridPagination = {
        currentPage: 3,
        pageSize: 10,
        totalItems: 100
    };

    const gridItems: any[] = [
        {
            id: 1,
            name: "John Doe",
            email: "john.doe@example.com",
            phone: "123-456-7890",
            address: "123 Main St"
        }
    ];

    return <>
        <DataGrid title="Person Management" columns={gridColumns} filters={gridFilters} sortOptions={gridSortOptions} items={gridItems} pagination={gridPagination} />
    </>
}