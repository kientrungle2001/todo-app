import { Button, Card, Col, Container, Form, Row, Table } from "react-bootstrap";
import { PaginationGrid } from "./PaginationGrid";
import { FiltersGrid } from "./FiltersGrid";

export enum DataGridColumnType {
    TEXT = "text",
    NUMBER = "number",
    DATE = "date",
    CURRENCY = "currency",
    ACTIONS = "actions"
}

export interface DataGridColumn {
    index: string;
    label: string;
    type?: DataGridColumnType;
    format?: string;
    customFormat?: (value: any, item: any) => string | React.ReactNode;
    options?: any[];
    sortable?: boolean;
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
    const getColumnElement = (column: DataGridColumn, item: any) => {
        if (!column.type || column.type === DataGridColumnType.TEXT || column.type === DataGridColumnType.NUMBER || column.type === DataGridColumnType.CURRENCY) {
            return column.customFormat ? column.customFormat(item[column.index], item) : item[column.index];
        } else if (column.type === DataGridColumnType.DATE) {
            return new Date(item[column.index]).toLocaleString();
        } else {
            return column.customFormat ? column.customFormat(null, item) : '-';
        }
    };

    return (
        <Container fluid className="mb-3 mt-3">
            <Row>
                <Col sm={12} md={3} lg={2}>
                    <Card>
                        <Card.Header className="d-flex justify-content-between align-items-center">
                            <span>Filters</span>
                            <div>
                                <Button size="sm" variant="danger">Reset</Button>
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
                                        <th>
                                            <Form.Check type="checkbox" />
                                        </th>
                                        {columns.map(column => (
                                            <th key={column.index}>{column.label}</th>
                                        ))}
                                    </tr>
                                    <tr>
                                        <td colSpan={columns.length + 1}>
                                            <PaginationGrid totalItems={totalItems} setCurrentPage={setCurrentPage} setPageSize={setPageSize} pagination={pagination} />
                                        </td>
                                    </tr>
                                </thead>
                                <tbody>
                                    {items.map((item, index) =>
                                        <tr key={index}>
                                            <td>
                                                <Form.Check type="checkbox" />
                                            </td>
                                            {columns.map(column => (
                                                <td key={column.index}>
                                                    {getColumnElement(column, item)}
                                                </td>
                                            ))}
                                        </tr>)
                                    }
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