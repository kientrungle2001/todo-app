import { Table } from "react-bootstrap";
import { renderColumn } from "../../../grid/columns/renderColumn";
import { GridDataGridHead } from "./GridDataGridHead";
import { PaginationGrid } from "../../../../components/grid/PaginationGrid";

interface Props {
    table: string;
    columns: any[];
    items: any[];
    sortData: any;
    setSortData: (data: any) => void;
    selectedItem: any;
    setSelectedItem: (item: any) => void;
    pagination: any;
    totalItems: number;
    setCurrentPage: (page: number) => void;
    setPageSize: (size: number) => void;
}

export const GridTableWrapper: React.FC<Props> = ({
    table,
    columns,
    items,
    sortData,
    setSortData,
    selectedItem,
    setSelectedItem,
    pagination,
    totalItems,
    setCurrentPage,
    setPageSize,
}) => {
    const toggleCheckedItem = (item: any) => {
        setSelectedItem(selectedItem === item ? null : item);
    };

    return (
        <div className="table-responsive">
            <Table size="sm" striped hover>
                <thead>
                    <tr>
                        <GridDataGridHead
                            table={table}
                            columns={columns}
                            sortData={sortData}
                            setSortData={setSortData}
                        />
                    </tr>
                    <tr>
                        <td colSpan={columns.length + 1}>
                            <PaginationGrid
                                totalItems={totalItems}
                                setCurrentPage={setCurrentPage}
                                setPageSize={setPageSize}
                                pagination={pagination}
                            />
                        </td>
                    </tr>
                </thead>
                <tbody>
                    {items.length ? (
                        items.map((item, index) => (
                            <tr
                                key={index}
                                onClick={() => toggleCheckedItem(item)}
                                style={{ cursor: "pointer" }}
                                className={selectedItem === item ? "table-primary" : ""}
                            >
                                {columns.map((column) => (
                                    <td
                                        key={column.index}
                                        style={{
                                            width: column.width,
                                            whiteSpace: column.inputable ? "nowrap" : "normal",
                                        }}
                                    >
                                        {renderColumn(column, item, table, {}, () => { }, () => { }, () => { }, () => { }, () => { })}
                                    </td>
                                ))}
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan={columns.length + 1} className="text-center">
                                No data available.
                            </td>
                        </tr>
                    )}
                </tbody>
                <tfoot>
                    <tr>
                        <td colSpan={columns.length + 1}>
                            <PaginationGrid
                                totalItems={totalItems}
                                setCurrentPage={setCurrentPage}
                                setPageSize={setPageSize}
                                pagination={pagination}
                            />
                        </td>
                    </tr>
                </tfoot>
            </Table>
        </div>
    );
};
