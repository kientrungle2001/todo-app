import React, { useEffect } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import axios from "@/api/axiosInstance";
import { buildTree, flatTree } from "@/api/tree";
import 'select2';
import { storage } from "@/api/storage";
import { useRouter } from "next/router";
import { FieldTextRenderer } from "./DataGridEditFieldRenderer/FieldTextRenderer";
import { FieldNumberRenderer } from "./DataGridEditFieldRenderer/FieldNumberRenderer";
import { FieldStatusRenderer } from "./DataGridEditFieldRenderer/FieldStatusRenderer";
import { FieldDateRenderer } from "./DataGridEditFieldRenderer/FieldDateRenderer";
import { FieldSelectRenderer } from "./DataGridEditFieldRenderer/FieldSelectRenderer";
import { FieldCheckboxRenderer } from "./DataGridEditFieldRenderer/FieldCheckboxRenderer";
import { FieldEditorRenderer } from "./DataGridEditFieldRenderer/FieldEditorRenderer";
import { FieldImageRenderer } from "./DataGridEditFieldRenderer/FieldImageRenderer";

export enum DataGridEditFieldType {
    TEXT = "text",
    NUMBER = "number",
    DATE = "date",
    CURRENCY = "currency",
    SELECT = "select",
    CHECKBOX = "checkbox",
    STATUS = "status",
    EDITOR = "editor",
    IMAGE = "image",
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
    treeMode?: boolean;
    parentField?: string;
    orderBy?: string;
    multipleSize?: number;
    select2?: boolean;
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

    const router = useRouter();
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
                    let fields = [field.valueField, field.labelField];
                    if (field.treeMode) {
                        fields.push(field.parentField ?? 'parent');
                    }
                    axios.post(`/tables/${field.table}/map`, {
                        fields: fields,
                        condition: condition,
                        orderBy: field.orderBy ?? 'id asc'
                    }, {
                        headers: {
                            'Authorization': `Bearer ${storage.get('token') || ''}`
                        }
                    })
                        .then(response => {
                            let items = response.data;
                            if (field.treeMode) {
                                items = buildTree(items, field.parentField ?? 'parent');
                                items = flatTree(items, 1);
                            }
                            updatedMaps[field.index] = items;
                        })
                        .catch((error) => {
                            if (error.response && error.response.status === 401 && error.response.data.error === 'Invalid token') {
                                storage.clearTokenInfo();
                                router.push('/login');
                            }
                        })
                        .catch(error => {
                            console.error('Error fetching map data:', error);
                        });

                }
            });
            setTimeout(() => {
                setMaps(updatedMaps);
            }, 200);
        };
        setMapsForFields();

    }, [item]);
    const [maps, setMaps] = React.useState<any>({});


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
            case DataGridEditFieldType.EDITOR:
                return FieldEditorRenderer;
            case DataGridEditFieldType.IMAGE:
                return FieldImageRenderer;
            default:
                return FieldUndefinedRenderer;
        }

    }

    const renderField = (field: DataGridEditField, item: any) => {
        const renderer = getFieldRenderer(field.type);
        return renderer(field, item, setItem, maps);
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
                                <Col md={12} sm={12} className="mt-3 mb-3 pt-3 pb-3 bg-warning">
                                    <Button size="lg" variant="primary" type="submit" className="me-2">{mode === DataGridEditMode.EDIT ? 'Cập nhật' : 'Thêm mới'} </Button>
                                    <Button variant="outline-secondary" onClick={() => {
                                        if (mode === DataGridEditMode.ADD && handleCancelAdd) {
                                            handleCancelAdd();
                                        }

                                        if (mode === DataGridEditMode.EDIT && handleCancelEdit) {
                                            handleCancelEdit();
                                        }
                                    }}>Hủy bỏ</Button>
                                </Col>
                                {fields.map(field => (
                                    <Col className="mb-3" md={field.size ?? 12} sm={12} key={field.index}>
                                        <Form.Group controlId={field.index}>
                                            <Form.Label>{field.label}</Form.Label>
                                            {renderField(field, item)}
                                        </Form.Group>
                                    </Col>
                                ))}
                                <Col md={12} sm={12} className="mt-3 mb-3 pt-3 pb-3 bg-warning">
                                    <Button size="lg" variant="primary" type="submit" className="me-2">{mode === DataGridEditMode.EDIT ? 'Cập nhật' : 'Thêm mới'} </Button>
                                    <Button variant="outline-secondary" onClick={() => {
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