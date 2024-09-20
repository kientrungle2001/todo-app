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
    statusToggable?: boolean;
    multiple?: boolean;
    size?: number;
    options?: any[];
    map?: any;
    table?: string;
    tableCondition?: string | ((item: any) => string);
    valueField?: string;
    labelField?: string;
}

interface DataGridEditProps {
    mode: DataGridEditMode,
    table: string;
    itemId?: number;
    addNewLabel?: string;
    updateLabel?: string;
    fields: DataGridEditField[];
    item: any;
    setItem: (item: any) => void;
    handleUpdateItem?: (item: any, fields: DataGridEditField[], event: React.FormEvent<HTMLFormElement>) => void;
    handleCancelEdit?: () => void;
    handleAddItem?: (item: any, fields: DataGridEditField[], event: React.FormEvent<HTMLFormElement>) => void;
    handleCancelAdd?: () => void;
}

const DataGridEdit: React.FC<DataGridEditProps> = ({ mode, table, itemId, addNewLabel, updateLabel, fields, item, setItem, handleUpdateItem, handleCancelEdit, handleAddItem, handleCancelAdd }): React.ReactElement => {

    useEffect(() => {
        const setMapsForFields = () => {
            let updatedMaps = { ...maps };
            fields.forEach((field) => {
                if (field.type === DataGridEditFieldType.SELECT && field.table) {

                    let condition = null;
                    if (field.tableCondition) {
                        if (typeof field.tableCondition === 'function') {
                            condition = field.tableCondition(item);
                        } else {
                            condition = field.tableCondition;
                        }
                    }
                    axios.post(`/tables/${field.table}/map`, {
                        fields: [field.valueField, field.labelField],
                        condition: condition
                    })
                        .then(response => {
                            updatedMaps[field.index] = response.data;
                        })
                        .catch(error => {
                            console.error('Error fetching map data:', error);
                        });

                }
            });
            setTimeout(() => {
                setMaps(updatedMaps);
            }, 1000);
        };
        setMapsForFields();

    }, [item]);
    const [maps, setMaps] = React.useState<any>({});

    const FieldTextRenderer = (field: DataGridEditField, item: any) => {
        return (
            <Form.Control type="text" value={item[field.index]} onChange={(event) => {
                let updatedItem = { ...item };
                updatedItem[field.index] = event.target.value;
                setItem(updatedItem);
            }} />
        );
    }

    const FieldNumberRenderer = (field: DataGridEditField, item: any) => {
        return (
            <Form.Control type="number" value={item[field.index]} onChange={(event) => {
                let updatedItem = { ...item };
                updatedItem[field.index] = Number(event.target.value);
                setItem(updatedItem);
            }} />
        );
    }

    const FieldStatusRenderer = (field: DataGridEditField, item: any) => {
        const getStatusLabel = (status: number) => {
            if (field.map && typeof field.map === 'object') {
                return field.map[status] ?? 'Unknown';
            }
            return status === 1 ? 'Active' : 'Inactive';
        }
        if (field.statusToggable) {
            return (
                <Form.Check type="switch" checked={item[field.index] === 1} onChange={(event) => {
                    let updatedItem = { ...item };
                    updatedItem[field.index] = updatedItem[field.index] === 1 ? 0 : 1;
                    setItem(updatedItem);
                }} label={getStatusLabel(item[field.index])} />
            );
        }
        return (
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
            </Form.Select>
        );
    }

    const FieldDateRenderer = (field: DataGridEditField, item: any) => {
        return (
            <Form.Control type="date" value={item[field.index]} onChange={(event) => {
                let updatedItem = { ...item };
                updatedItem[field.index] = event.target.value;
                setItem(updatedItem);
            }} />
        );
    }

    const FieldSelectRenderer = (field: DataGridEditField, item: any) => {
        if (field.options) {
            return (
                <Form.Select multiple={field.multiple} value={item[field.index]} onChange={(event) => {
                    if (field.multiple) {
                        let selectedOptions = Array.from(event.target.selectedOptions, option => option.value);
                        let updatedItem = { ...item };
                        updatedItem[field.index] = selectedOptions.join(',');
                        setItem(updatedItem);
                    } else {
                        let updatedItem = { ...item };
                        updatedItem[field.index] = event.target.value;
                        setItem(updatedItem);
                    }
                }}>
                    <option value={0}>Select</option>
                    {field.options.map(option => (
                        <option key={option.value} value={option.value}>
                            {option.label}
                        </option>
                    ))}
                </Form.Select>
            );
        } else if (typeof maps[field.index] === 'object') {
            return (
                <Form.Select multiple={field.multiple} value={item[field.index]} onChange={(event) => {
                    if (field.multiple) {
                        let selectedOptions = Array.from(event.target.selectedOptions, option => option.value);
                        let updatedItem = { ...item };
                        updatedItem[field.index] = selectedOptions.join(',');
                        setItem(updatedItem);
                    } else {
                        let updatedItem = { ...item };
                        updatedItem[field.index] = event.target.value;
                        setItem(updatedItem);
                    }
                }}>
                    <option value={0}>Select</option>
                    {maps[field.index].map((option: any) => (
                        <option key={option[field.valueField as string]} value={option[field.valueField as string]}>
                            {field.map ? field.map[option[field.valueField as string]] : option[field.labelField as string]}
                        </option>
                    ))}
                </Form.Select>
            );
        } else {
            return (
                <Form.Select value={item[field.index]} onChange={(event) => {
                    let updatedItem = { ...item };
                    updatedItem[field.index] = event.target.value;
                    setItem(updatedItem);
                }}>
                    <option value={0}>Select</option>
                </Form.Select>
            );
        }
    }

    const FieldCheckboxRenderer = (field: DataGridEditField, item: any) => {
        return (
            <Form.Check type="checkbox" checked={item[field.index]} onChange={(event) => {
                let updatedItem = { ...item };
                updatedItem[field.index] = event.target.checked;
                setItem(updatedItem);
            }} />
        );
    }

    const FieldUndefinedRenderer = (field: DataGridEditField, item: any) => {
        return '-';
    }

    const getFieldRenderer = (fieldType: DataGridEditFieldType) => {
        switch (fieldType) {
            case DataGridEditFieldType.TEXT:
                return FieldTextRenderer;
            case DataGridEditFieldType.NUMBER:
                return FieldNumberRenderer;
            case DataGridEditFieldType.STATUS:
                return FieldStatusRenderer;
            case DataGridEditFieldType.DATE:
                return FieldDateRenderer;
            case DataGridEditFieldType.SELECT:
                return FieldSelectRenderer;
            case DataGridEditFieldType.CHECKBOX:
                return FieldCheckboxRenderer;
            default:
                return FieldUndefinedRenderer;
        }

    }

    const renderField = (field: DataGridEditField, item: any) => {
        const renderer = getFieldRenderer(field.type);
        return renderer(field, item);
    }

    return (
        <>
            <Container fluid>
                {
                    mode === DataGridEditMode.EDIT ? (
                        <h2 className="text-center">{updateLabel} - ID: {itemId}</h2>
                    ) : (
                        <h2 className="text-center">{addNewLabel}</h2>
                    )
                }

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
                                            {renderField(field, item)}
                                        </Form.Group>
                                    </Col>
                                ))}
                                <Col md={12} sm={12}>
                                    <Button variant="primary" type="submit" className="me-2">{mode === DataGridEditMode.EDIT ? 'Cập nhật' : 'Thêm mới'} </Button>
                                    <Button variant="secondary" onClick={() => {
                                        if (mode === DataGridEditMode.ADD && handleCancelAdd) {
                                            handleCancelAdd();
                                        }

                                        if (mode === DataGridEditMode.EDIT && handleCancelEdit) {
                                            handleCancelEdit();
                                        }
                                    }}>Hủy bỏ</Button>
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