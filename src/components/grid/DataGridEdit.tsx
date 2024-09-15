import { Button, Col, Container, Form, Row } from "react-bootstrap";

export enum DataGridEditFieldType {
    TEXT = "text",
    NUMBER = "number",
    DATE = "date",
    CURRENCY = "currency",
    SELECT = "select",
    CHECKBOX = "checkbox",
    STATUS = "status",
    EDITOR = "editor"
}

export interface DataGridEditField {
    index: string;
    label: string;
    type: DataGridEditFieldType;
    size?: number;
    options?: any[];
    map?: any;
    table?: string;
    valueField?: string;
    labelField?: string;
}

interface DataGridEditProps {
    table: string;
    itemId: number;
    fields: DataGridEditField[];
    item: any;
    setItem: (item: any) => void;
    handleUpdateItem: (item: any, fields: DataGridEditField[], event: React.FormEvent<HTMLFormElement>) => void;
    handleCancelEdit: () => void;
}

const DataGridEdit: React.FC<DataGridEditProps> = ({ table, itemId, fields, item, setItem, handleUpdateItem, handleCancelEdit }): React.ReactElement => {
    return (
        <>
            <Container fluid>
                <h2 className="text-center">Edit {table} - ID: {itemId}</h2>
                <Row>
                    <Col md={12} sm={12}>
                        <Form onSubmit={(event) => {
                            handleUpdateItem(item, fields, event);
                        }}>
                            <Row>
                                {fields.map(field => (
                                    <Col className="mb-3" md={field.size ?? 12} sm={12} key={field.index}>
                                        <Form.Group controlId={field.index}>
                                            <Form.Label>{field.label}</Form.Label>
                                            {
                                                field.type === DataGridEditFieldType.STATUS ?
                                                    <Form.Select value={item[field.index]} onChange={(event) => {
                                                        let updatedItem = { ...item };
                                                        updatedItem[field.index] = event.target.value;
                                                        setItem(updatedItem);
                                                    }}>
                                                        <option value={1}>
                                                            {field.map[1] ?? 'Active'}
                                                        </option>
                                                        <option value={0}>
                                                            {field.map[0] ?? 'Inactive'}
                                                        </option>
                                                    </Form.Select> :
                                                    <Form.Control value={item[field.index]} onChange={(event) => {
                                                        let updatedItem = { ...item };
                                                        updatedItem[field.index] = event.target.value;
                                                        setItem(updatedItem);
                                                    }} />
                                            }

                                        </Form.Group>
                                    </Col>
                                ))}
                                <Col md={12} sm={12}>
                                    <Button variant="primary" type="submit" className="me-2">Update</Button>
                                    <Button variant="secondary" onClick={() => {
                                        handleCancelEdit();
                                    }}>Cancel</Button>
                                </Col>
                            </Row>
                        </Form>
                    </Col>
                </Row>

            </Container>
        </>
    );
};
export default DataGridEdit;