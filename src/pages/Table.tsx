import DataGrid, { DataGridColumn, DataGridColumnType, DataGridFilterColumn } from "@/components/grid/DataGrid";

export default function Table(): React.ReactElement {
    const gridColumns: DataGridColumn[] = [
        { index: "id", label: "ID" },
        { index: "name", label: "Name" },
        { index: "email", label: "Email" },
        { index: "phone", label: "Phone" },
        { index: "address", label: "Address" },
        {
            index: "actions", label: "Actions", type: DataGridColumnType.TEXT, customFormat: (value: any, item: any): string | React.ReactNode => {
                return (<div></div>)
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

    return <>
        <DataGrid title="Person Management" columns={gridColumns} filters={gridFilters} />
    </>
}