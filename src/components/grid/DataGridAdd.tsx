import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { DataGridEditField } from "./DataGridEdit";

interface DataGridAddProps {
    table: string;
    fields: DataGridEditField[];
    item: any;
    setItem: (item: any) => void;
    handleAddItem: (item: any, fields: DataGridEditField[], event: React.FormEvent<HTMLFormElement>) => void;
    handleCancelAdd: () => void;
}

const DataGridAdd: React.FC<DataGridAddProps> = ({ table, fields, item, setItem, handleAddItem, handleCancelAdd }): React.ReactElement => {
    return (
        <>
            <Container fluid>
                <h2 className="text-center">Add {table}</h2>
                <Row>
                    <Col md={12} sm={12}>
                        <Form onSubmit={(event) => {
                            handleAddItem(item, fields, event);
                        }}>
                            <Row>
                                {fields.map(field => (
                                    <Col className="mb-3" md={field.size ?? 12} sm={12} key={field.index}>
                                        <Form.Group controlId={field.index}>
                                            <Form.Label>{field.label}</Form.Label>
                                            <Form.Control value={item[field.index]} onChange={(event) => {
                                                let updatedItem = {...item };
                                                updatedItem[field.index] = event.target.value;
                                                setItem(updatedItem);
                                            }} />
                                        </Form.Group>
                                    </Col>
                                ))}
                                <Col md={12} sm={12}>
                                    <Button variant="primary" type="submit" className="me-2">Add</Button>
                                    <Button variant="secondary" onClick={() => {
                                        handleCancelAdd();
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
export default DataGridAdd;