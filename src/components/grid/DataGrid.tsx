import { Button, Card, Col, Container, Form, Row, Table } from "react-bootstrap";
import { PaginationGrid } from "./PaginationGrid";
import { FiltersGrid } from "./FiltersGrid";
import { useRouter } from "next/router";

export enum DataGridColumnType {
    TEXT = "text",
    NUMBER = "number",
    DATE = "date",
    CURRENCY = "currency",
    ACTIONS = "actions"
}

export enum DataGridColumnActionType {
    EDIT = "edit",
    DELETE = "delete"
}

export interface DataGridColumn {
    index: string;
    label: string;
    type?: DataGridColumnType;
    format?: string;
    customFormat?: (value: any, item: any, table: string) => string | React.ReactNode;
    options?: any[];
    sortable?: boolean;
    actionType?: DataGridColumnActionType;
    width?: string;
}

export interface DataGridFilterColumn {
    index: string;
    label: string;
    type?: DataGridColumnType;
    format?: string;
    customFormat?: (value: any, item: any) => string | React.ReactNode;
    options?: any[];
}

export interface DataGridSort {
    index: string;
    direction: DataGridSortDirection;
}

export enum DataGridSortDirection {
    ASCENDING = "asc",
    DESCENDING = "desc"
}

export interface DataGridSortOption {
    index: string;
    label: string;
    sorts: DataGridSort[];
}

export interface DataGridPagination {
    currentPage: number;
    pageSize: number;
}

interface DataGridProps {
    title: string;
    table: string;
    columns: DataGridColumn[];
    items: any[];
    totalItems: number;
    filters?: DataGridFilterColumn[];
    defaultSorts?: DataGridSort[];
    sortOptions?: DataGridSortOption[];
    pagination?: DataGridPagination;
    sorts: DataGridSort[];
    setSorts: (sorts: DataGridSort[]) => void;
    searchText?: string;
    setSearchText: (searchText: string) => void;
    filterData?: any;
    setFilterData: (filterData: any) => void;
    setCurrentPage: (page: number) => void;
    setPageSize: (pageSize: number) => void;
}

const DataGrid: React.FC<DataGridProps> = ({ title, table, columns = [], filters = [], defaultSorts, sortOptions, items = [], pagination, setCurrentPage, setPageSize, searchText, setSearchText, filterData, setFilterData, sorts, setSorts, totalItems }) => {
    const router = useRouter();
    // Function to handle navigation
    const handleNavigation = (path: string) => {
        router.push(path);
    };
    const handleEditItem = (item: any) => {
        handleNavigation(`/Table/${table}/${item.id}/edit`);
    }

    const handleDeleteItem = (item: any) => {
        // Implement your delete logic here
        if (window.confirm(`Are you sure you want to delete item with ID: ${item.id}?`)) {
            console.log(`Deleting item with ID: ${item.id}`);
        }
    };

    const getColumnElement = (column: DataGridColumn, item: any) => {
        if (!column.type || column.type === DataGridColumnType.TEXT || column.type === DataGridColumnType.NUMBER || column.type === DataGridColumnType.CURRENCY) {
            return column.customFormat ? column.customFormat(item[column.index], item, table) : item[column.index];
        } else if (column.type === DataGridColumnType.DATE) {
            return new Date(item[column.index]).toLocaleString();
        } else if (column.type === DataGridColumnType.ACTIONS) {
            if (column.customFormat) {
                return column.customFormat ? column.customFormat(null, item, table) : '-';
            } else {
                if (column.actionType === DataGridColumnActionType.EDIT) {
                    return <Button variant="primary" size="sm" onClick={() => handleEditItem(item)}>
                        Edit
                    </Button>
                } else if (column.actionType === DataGridColumnActionType.DELETE) {
                    return <Button variant="danger" size="sm" onClick={() => handleDeleteItem(item)}>
                        Delete
                    </Button>
                }
            }
        } else {
            return '-';
        }
    };

    const handleResetFilter = () => {
        setFilterData({});
        setSearchText('');
    };

    return (
        <Container fluid className="mb-3 mt-3">
            <Row>
                <Col sm={12} md={3} lg={2}>
                    <Card>
                        <Card.Header className="d-flex justify-content-between align-items-center">
                            <span>Filters</span>
                            <div>
                                <Button size="sm" variant="danger" onClick={handleResetFilter}>Reset</Button>
                            </div>
                        </Card.Header>
                        <Card.Body>
                            <FiltersGrid filters={filters} sortOptions={sortOptions} filterData={filterData} setFilterData={setFilterData} searchText={searchText} setSearchText={setSearchText} sorts={sorts} setSorts={setSorts} defaultSorts={defaultSorts} />
                        </Card.Body>
                    </Card>

                </Col>
                <Col sm={12} md={9} lg={10}>
                    <Card>
                        <Card.Header className="d-flex justify-content-between align-items-center">
                            {/* Title on the left */}
                            <span>{title}</span>

                            {/* Buttons on the right */}
                            <div>
                                {/* Button as a link */}
                                <Button size="sm" variant="primary" href="#link1" className="me-2">Link 1</Button>
                                <Button size="sm" variant="secondary" href="#link2" className="me-2">Link 2</Button>
                                {/* Regular Button */}
                                <Button size="sm" variant="danger">Delete</Button>
                            </div>
                        </Card.Header>
                        <Card.Body>
                            <Table striped bordered hover size="sm">
                                <thead>
                                    <tr>
                                        <th style={{ width: "1%" }}>
                                            <Form.Check type="checkbox" />
                                        </th>
                                        {columns.map(column => (
                                            <th key={column.index} style={{ width: column.width }}>{column.label}</th>
                                        ))}
                                    </tr>
                                    <tr>
                                        <td colSpan={columns.length + 1}>
                                            <PaginationGrid totalItems={totalItems} setCurrentPage={setCurrentPage} setPageSize={setPageSize} pagination={pagination} />
                                        </td>
                                    </tr>
                                </thead>
                                <tbody>
                                    {items.length ? items.map((item, index) =>
                                        <tr key={index}>
                                            <td style={{ width: "1%" }}>
                                                <Form.Check type="checkbox" />
                                            </td>
                                            {columns.map(column => (
                                                <td key={column.index} style={{ width: column.width }}>
                                                    {getColumnElement(column, item)}
                                                </td>
                                            ))}
                                        </tr>)
                                        : <tr>
                                            <td colSpan={columns.length + 1} className="text-center">No data available.</td>
                                        </tr>}
                                </tbody>
                                <tfoot>
                                    <tr>
                                        <td colSpan={columns.length + 1}>
                                            <PaginationGrid totalItems={totalItems} setCurrentPage={setCurrentPage} setPageSize={setPageSize} pagination={pagination} />
                                        </td>
                                    </tr>
                                </tfoot>
                            </Table>
                        </Card.Body>
                        <Card.Footer>
                            <div className="d-flex justify-content-end">
                                <Button variant="primary" className="me-2">Add New</Button>
                                <Button variant="danger" className="me-2">Delete Selecteds</Button>
                            </div>
                        </Card.Footer>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
}

export default DataGrid;