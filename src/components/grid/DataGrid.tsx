import { Button, ButtonGroup, Card, Col, Container, Form, Pagination, Row, Table } from "react-bootstrap"
import PaginationGrid from "./PaginationGrid";

export enum DataGridColumnType {
    TEXT = "text",
    NUMBER = "number",
    DATE = "date",
    CURRENCY = "currency"
}

export interface DataGridColumn {
    index: string;
    label: string;
    type?: DataGridColumnType;
    format?: string;
    customFormat?: (value: any, item: any) => string | React.ReactNode;
    options?: any[];
}

export interface DataGridFilterColumn {
    index: string;
    label: string;
    type?: DataGridColumnType;
    format?: string;
    customFormat?: (value: any, item: any) => string | React.ReactNode;
    options?: any[];
}

interface DataGridProps {
    title: string;
    columns: DataGridColumn[];
    filters?: DataGridFilterColumn[];
}

const DataGrid: React.FC<DataGridProps> = ({ title, columns = [], filters = [] }) => {
    const rows: number[] = Array.from({ length: 20 }, (_, index) => index + 1);
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
                            <Form>
                                {filters.map(filter => (
                                    <Form.Group controlId={"formGroup" + filter.index} key={filter.index} className="mb-3">
                                        <Form.Label>{filter.label}</Form.Label>
                                        <Form.Control size="sm" type="text" placeholder={`Filter by ${filter.label}`} />
                                    </Form.Group>
                                ))}
                            </Form>
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
                                            <PaginationGrid />
                                        </td>
                                    </tr>
                                </thead>
                                <tbody>
                                    {rows.map(index =>
                                        <tr key={index}>
                                            <td>
                                                <Form.Check type="checkbox" />
                                            </td>
                                            <td>{index}</td>
                                            <td>John Doe</td>
                                            <td>email@example.com</td>
                                            <td>123456789</td>
                                            <td>706A chung cu 9 tang Cau Buou</td>
                                            <td>
                                                <Button size="sm" variant="primary" className="me-2">Edit</Button>
                                                <Button size="sm" variant="danger">Delete</Button>
                                            </td>
                                        </tr>)
                                    }
                                </tbody>
                                <tfoot>
                                    <tr>
                                        <td colSpan={columns.length + 1}>
                                            <PaginationGrid />
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