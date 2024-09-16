import React, { useEffect } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import axios from "@/api/axiosInstance";

export enum DataGridEditFieldType {
    TEXT = "text",
    NUMBER = "number",
    DATE = "date",
    CURRENCY = "currency",
    SELECT = "select",
    CHECKBOX = "checkbox",
    STATUS = "status",
    EDITOR = "editor"
};

export enum DataGridEditMode {
    ADD = "add",
    EDIT = "edit"
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
    mode: DataGridEditMode,
    table: string;
    itemId?: number;
    fields: DataGridEditField[];
    item: any;
    setItem: (item: any) => void;
    handleUpdateItem?: (item: any, fields: DataGridEditField[], event: React.FormEvent<HTMLFormElement>) => void;
    handleCancelEdit?: () => void;
    handleAddItem?: (item: any, fields: DataGridEditField[], event: React.FormEvent<HTMLFormElement>) => void;
    handleCancelAdd?: () => void;
}

const DataGridEdit: React.FC<DataGridEditProps> = ({ mode, table, itemId, fields, item, setItem, handleUpdateItem, handleCancelEdit, handleAddItem, handleCancelAdd }): React.ReactElement => {

    useEffect(() => {
        fields.forEach(field => {
            if (field.type === DataGridEditFieldType.SELECT && field.table) {
                axios.post(`/tables/${field.table}/map`, {
                    fields: [field.valueField, field.labelField]
                })
                    .then(response => {
                        let updatedMaps = { ...maps };
                        updatedMaps[field.index] = response.data;
                        setMaps(updatedMaps);
                    })
                    .catch(error => {
                        console.error('Error fetching map data:', error);
                    });
            }
        });
    }, []);
    const [maps, setMaps] = React.useState<any>({});

    return (
        <>
            <Container fluid>
                <h2 className="text-center">Edit {table} - ID: {itemId}</h2>
                <Row>
                    <Col md={12} sm={12}>
                        <Form onSubmit={(event) => {
                            if (mode === DataGridEditMode.EDIT && handleUpdateItem) {
                                handleUpdateItem(item, fields, event);
                            }

                            if (mode === DataGridEditMode.ADD && handleAddItem) {
                                handleAddItem(item, fields, event);
                            }
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
                                                    </Form.Select> : (field.type === DataGridEditFieldType.SELECT ? <Form.Select value={item[field.index]} onChange={(event) => {
                                                        let updatedItem = { ...item };
                                                        updatedItem[field.index] = event.target.value;
                                                        setItem(updatedItem);
                                                    }}>
                                                        <option value={0}>Select</option>
                                                        {field.options ? field.options.map(option => <option key={option.value} value={option.value}>{option.label}</option>) : (
                                                            typeof maps[field.index] !== 'undefined' && typeof field.valueField === 'string' && typeof field.labelField === 'string' ? maps[field.index].map((option: any) => <option key={option[field.valueField as string]} value={option[field.valueField as string]}>{option[field.labelField as string]}</option>) : <></>
                                                        )}
                                                    </Form.Select> :
                                                        <Form.Control value={item[field.index]} onChange={(event) => {
                                                            let updatedItem = { ...item };
                                                            updatedItem[field.index] = event.target.value;
                                                            setItem(updatedItem);
                                                        }} />)
                                            }

                                        </Form.Group>
                                    </Col>
                                ))}
                                <Col md={12} sm={12}>
                                    <Button variant="primary" type="submit" className="me-2">{mode === DataGridEditMode.EDIT ? 'Update' : 'Add'} </Button>
                                    <Button variant="secondary" onClick={() => {
                                        if (mode === DataGridEditMode.ADD && handleCancelAdd) {
                                            handleCancelAdd();
                                        }

                                        if (mode === DataGridEditMode.EDIT && handleCancelEdit) {
                                            handleCancelEdit();
                                        }
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