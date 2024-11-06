import React, { useEffect, useState } from "react";
import { Button, Col, Container, Form, InputGroup, Row } from "react-bootstrap";
import axios from "@/api/axiosInstance";
import 'select2';
import { storage } from "@/api/storage";
import { useRouter } from "next/router";
import { DataGridEditField, DataGridEditMode } from "./DataGridEditTypes";
import { QuestionAnswerEditor } from "./QuestionAnswerEditor";

interface TestGridEditProps {
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

const TestGridEdit: React.FC<TestGridEditProps> = ({ mode, table, itemId, addNewLabel, updateLabel, fields, item, setItem, handleUpdateItem, handleCancelEdit, handleAddItem, handleCancelAdd }): React.ReactElement => {

    const [questions, setQuestions] = useState<any[]>([]);
    const router = useRouter();
    useEffect(() => {
        // load questions of test
        axios.post(`/tests/questions/${itemId}`, {}, {
            headers: {
                'Authorization': `Bearer ${storage.get('token') || ''}`
            }
        }).then((resp: any) => {
            setQuestions(resp.data);
            console.log("Fetched item:", resp.data);
        }).catch((error) => {
            if (error.response && error.response.status === 401 && error.response.data.error === 'Invalid token') {
                storage.clearTokenInfo();
                router.push('/login');
            }
        });
    }, [item]);
    const handleAddQuestion = () => {
        let updatedQuestions = [...questions];
        updatedQuestions.push({
            id: 'uid' + (1000000 + Math.floor(Math.random() * 1000000)),
            content: '',
            content_vn: '',
            status: '0'
        });
        setQuestions(updatedQuestions);
    }

    return (
        <>
            <Container fluid>
                {
                    mode === DataGridEditMode.EDIT ? (
                        <h2 className="text-center">Sửa câu hỏi cho đề thi - ID: {itemId}</h2>
                    ) : (
                        <h2 className="text-center">{addNewLabel}</h2>
                    )
                }

                <Row>

                    <Col md={12} sm={12}>
                        <Form onSubmit={(event) => {
                            if (mode === DataGridEditMode.EDIT && handleUpdateItem) {
                                item.questions = questions;
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
                                            <div className="text-justify" style={{ textAlign: "justify" }} dangerouslySetInnerHTML={{ __html: item.name_en.replaceAll('http://s1.nextnobels.com', 'https://stg.media.nextnobels.com') }}>
                                            </div>
                                        </Col>
                                    </Row>
                                </Col>
                                <Col md={12} sm={12} className="mt-3 mb-3 pt-3 pb-3">
                                    <h2>Câu hỏi: </h2>
                                    <Button variant="primary" onClick={() => {
                                        handleAddQuestion();
                                    }}>Thêm</Button>
                                </Col>
                                <Col md={12} xs={12}>
                                    <h2>Đề bài</h2>
                                    <QuestionAnswerEditor value={item.content} updateValue={(value) => {
                                        item.content = value;
                                    }} />
                                </Col>
                                {questions.map((answer, index) => {
                                    return (
                                        <Col md={12} sm={12} key={answer.id} className="mt-3 mb-3">
                                            <h5>{index + 1}. Mã câu hỏi #{answer.id} - Số thứ tự: {answer.ordering} - {answer.status === '1' ? 'Đã kích hoạt' : 'Chưa kích hoạt'}</h5>
                                            <Row>
                                                <Col md={6} sm={12}>
                                                    <div style={{ textAlign: 'justify' }} dangerouslySetInnerHTML={{ __html: answer.name }}></div>
                                                </Col>
                                                <Col md={6} sm={12}>
                                                    <div style={{ textAlign: 'justify' }} dangerouslySetInnerHTML={{ __html: answer.name_vn }}></div>
                                                </Col>
                                            </Row>
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
export default TestGridEdit;