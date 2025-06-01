import React, { useEffect } from "react";
import { Button, Col, Container, Form, Row, Tab, Tabs } from "react-bootstrap";
import { buildTree, flatTree } from "@/api/tree";
import 'select2';
import { DataGridEditField as EditField } from "@/types/edit/DataGridEditField";
import { DataGridEditMode as EditMode } from "@/types/edit/DataGridEditMode";
import { DataGridEditFieldType as EditFieldType } from "@/types/edit/DataGridEditFieldType";
import { tableRepository } from "@/api/repositories/Table";
import { renderField } from "@/types/edit/fields/renderField";

interface DataGridEditProps {
    mode: EditMode,
    table: string;
    itemId?: number;
    addNewLabel?: string;
    updateLabel?: string;
    fields: EditField[];
    item: any;
    setItem: (item: any) => void;
    handleUpdateItem?: (item: any, fields: EditField[], event: React.FormEvent<HTMLFormElement>) => void;
    handleCancelEdit?: () => void;
    handleAddItem?: (item: any, fields: EditField[], event: React.FormEvent<HTMLFormElement>) => void;
    handleCancelAdd?: () => void;
}

const DataGridEdit: React.FC<DataGridEditProps> = ({ mode, table, itemId, addNewLabel, updateLabel, fields, item, setItem, handleUpdateItem, handleCancelEdit, handleAddItem, handleCancelAdd }): React.ReactElement => {

    useEffect(() => {
        const setMapsForFields = () => {
            let updatedMaps = { ...maps };
            fields.forEach((field) => {
                if (field.type === EditFieldType.SELECT && field.table) {

                    let condition = null;
                    if (field.tableCondition) {
                        if (typeof field.tableCondition === 'function') {
                            condition = field.tableCondition(item, field);
                        } else {
                            condition = field.tableCondition;
                        }
                    }
                    let fields = [field.valueField, field.labelField];
                    if (field.treeMode) {
                        fields.push(field.parentField ?? 'parent');
                    }
                    tableRepository.getItemsForSelect(field.table, {
                        fields: fields,
                        condition: condition,
                        orderBy: field.orderBy ?? 'id asc'
                    }).then((response: any) => {
                        let items = response.data;
                        if (field.treeMode) {
                            items = buildTree(items, field.parentField ?? 'parent');
                            items = flatTree(items, 1);
                        }
                        updatedMaps[field.index] = items;
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

    const tabGroups: { [key: string]: EditField[] } = {};
    fields.forEach(field => {
        let tabGroup = field.tabGroup ?? '__default';
        if (!tabGroups[tabGroup]) {
            tabGroups[tabGroup] = [];
        }
        tabGroups[tabGroup].push(field);
    });
    const tabs = Object.keys(tabGroups).map(tabGroup => ({
        tabGroup: tabGroup,
        fields: tabGroups[tabGroup]
    }));
    tabs.sort((a, b) => a.tabGroup.localeCompare(b.tabGroup));

    return <Container fluid>
        {mode === EditMode.EDIT ?
            <h2 className="text-center">{updateLabel} - ID: {itemId}</h2> :
            <h2 className="text-center">{addNewLabel}</h2>}

        <Row>
            <Col md={12} sm={12}>
                <Form onSubmit={(event) => {
                    if (mode === EditMode.EDIT && handleUpdateItem) {
                        handleUpdateItem(item, fields, event);
                    }

                    if (mode === EditMode.ADD && handleAddItem) {
                        handleAddItem(item, fields, event);
                    }
                }}>
                    <Row>
                        <Col md={12} sm={12} className="mt-3 mb-3 pt-3 pb-3 bg-warning">
                            <Button size="lg" variant="primary" type="submit" className="me-2">{mode === EditMode.EDIT ? 'Cập nhật' : 'Thêm mới'} </Button>
                            <Button variant="outline-secondary" onClick={() => {
                                if (mode === EditMode.ADD && handleCancelAdd) {
                                    handleCancelAdd();
                                }

                                if (mode === EditMode.EDIT && handleCancelEdit) {
                                    handleCancelEdit();
                                }
                            }}>Hủy bỏ</Button>
                        </Col>
                        {tabs.map(tab => (
                            tab.tabGroup === '__default' ? (
                                <React.Fragment key={tab.tabGroup}>
                                    {tab.fields.map(field => (
                                        <Col className="mb-3" md={field.size ?? 12} sm={12} key={field.index}>
                                            <Form.Group controlId={field.index}>
                                                <Form.Label>{field.label}</Form.Label>
                                                {renderField(field, item, setItem, maps, mode)}
                                            </Form.Group>
                                        </Col>
                                    ))}
                                </React.Fragment>
                            ) : (
                                <Col className="mb-3" md={tab.fields[0].size ?? 12} sm={12} key={tab.tabGroup}>
                                    <Tabs id={"controlled-tab-" + tab.tabGroup}>
                                        {tab.fields.map(field => (
                                            <Tab eventKey={field.index} title={field.label} key={field.index}>
                                                <Form.Group controlId={field.index}>
                                                    {renderField(field, item, setItem, maps, mode)}
                                                </Form.Group>
                                            </Tab>
                                        ))}
                                    </Tabs>
                                </Col>
                            )

                        ))}

                        <Col md={12} sm={12} className="mt-3 mb-3 pt-3 pb-3 bg-warning">
                            <Button size="lg" variant="primary" type="submit" className="me-2">{mode === EditMode.EDIT ? 'Cập nhật' : 'Thêm mới'} </Button>
                            <Button variant="outline-secondary" onClick={() => {
                                if (mode === EditMode.ADD && handleCancelAdd) {
                                    handleCancelAdd();
                                }

                                if (mode === EditMode.EDIT && handleCancelEdit) {
                                    handleCancelEdit();
                                }
                            }}>Hủy bỏ</Button>
                        </Col>
                    </Row>
                </Form>
            </Col>
        </Row>

    </Container>;
};
export default DataGridEdit;
