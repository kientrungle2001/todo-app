import React, { useEffect, useState } from "react";
import { Button, Col, Container, Form, InputGroup, Row } from "react-bootstrap";
import axios from "@/api/axiosInstance";
import 'select2';
import { storage } from "@/api/storage";
import { useRouter } from "next/router";
import { DataGridEditField, DataGridEditMode } from "./DataGridEditTypes";
import { QuestionAnswerEditor } from "./QuestionAnswerEditor";

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

    const [answers, setAnswers] = useState<any[]>([]);
    const router = useRouter();
    useEffect(() => {
        // load answers of question
        axios.post(`/questions/answers/${itemId}`, {}, {
            headers: {
                'Authorization': `Bearer ${storage.get('token') || ''}`
            }
        }).then((resp: any) => {
            setAnswers(resp.data);
            console.log("Fetched item:", resp.data);
        }).catch((error) => {
            if (error.response && error.response.status === 401 && error.response.data.error === 'Invalid token') {
                storage.clearTokenInfo();
                router.push('/login');
            }
        });
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
                                item.answers = answers;
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

                                <Col md={12} sm={12} className="mt-3 mb-3 pt-3 pb-3">
                                    <Row>
                                        <Col md={6} sm={12}>
                                            <div className="text-justify" style={{ textAlign: "justify" }} dangerouslySetInnerHTML={{ __html: item.name.replaceAll('http://s1.nextnobels.com', 'https://stg.media.nextnobels.com') }}>
                                            </div>

                                        </Col>
                                        <Col md={6} sm={12}>
                                            <div className="text-justify" style={{ textAlign: "justify" }} dangerouslySetInnerHTML={{ __html: item.name_vn.replaceAll('http://s1.nextnobels.com', 'https://stg.media.nextnobels.com') }}>
                                            </div>
                                        </Col>
                                    </Row>
                                </Col>

                                {answers.map((answer) => {
                                    return (
                                        <Col md={6} sm={12} key={answer.id} className="mt-3 mb-3">
                                            <InputGroup>
                                                <InputGroup.Radio 
                                                    checked={answer.status === '1'}
                                                    onClick={() => {
                                                        let updatedAnswers: any[] = [...answers];
                                                        updatedAnswers.forEach((ans) => {
                                                            ans.status = '0';
                                                        })
                                                        answer.status = '1';
                                                        setAnswers(updatedAnswers);
                                                    }}
                                                    />
                                                <Row>
                                                    <Col md={6} sm={12}>
                                                        <QuestionAnswerEditor value={answer.content as string} updateValue={(value: string) => {
                                                            answer.content = value;
                                                        }} />
                                                    </Col>
                                                    <Col md={6} sm={12}>
                                                        <QuestionAnswerEditor value={answer.content_vn as string} updateValue={(value: string) => {
                                                            answer.content_vn = value;
                                                        }} />
                                                    </Col>
                                                </Row>
                                            </InputGroup>

                                        </Col>
                                    )
                                })}

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