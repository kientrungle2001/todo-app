import React, { useEffect } from "react";
import { Button, Col, Container, Form, Row, Tab, Tabs } from "react-bootstrap";
import axios from "@/api/axiosInstance";
import { buildTree, flatTree } from "@/api/tree";
import 'select2';
import { storage } from "@/api/storage";
import { useRouter } from "next/router";
import { DataGridEditField, DataGridEditFieldType, DataGridEditMode } from "./DataGridEditTypes";

interface QuestionAnswerGridEditProps {
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

const QuestionAnswerGridEdit: React.FC<QuestionAnswerGridEditProps> = ({ mode, table, itemId, addNewLabel, updateLabel, fields, item, setItem, handleUpdateItem, handleCancelEdit, handleAddItem, handleCancelAdd }): React.ReactElement => {

    const router = useRouter();
    useEffect(() => {
        // load answers of question
    }, [item]);

    return (
        <>
            <Container fluid>
                {
                    mode === DataGridEditMode.EDIT ? (
                        <h2 className="text-center">Sửa câp trả lời - ID: {itemId}</h2>
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

                                <Col md={12} sm={6} className="mt-3 mb-3 pt-3 pb-3">
                                    <Row>
                                        <Col md={6} sm={12}>
                                            <div dangerouslySetInnerHTML={{ __html: item.name }}>
                                            </div>
                                        </Col>
                                        <Col md={6} sm={12}>
                                            <div dangerouslySetInnerHTML={{ __html: item.name_vn }}>
                                            </div>
                                        </Col>
                                    </Row>
                                </Col>

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
export default QuestionAnswerGridEdit;