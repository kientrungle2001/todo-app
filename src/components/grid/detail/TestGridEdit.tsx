import React, { useEffect, useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import axios, { getAxios } from "@/api/axiosInstance";
import 'select2';
import { storage } from "@/api/storage";
import { useRouter } from "next/router";
import { DataGridEditField, DataGridEditMode } from "../DataGridEditTypes";
import { QuestionAnswerEditor } from "../QuestionAnswerEditor";
import { replaceMediaUrl } from "@/api/defaultSettings";

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
        getAxios(window.location.hostname).post(`/tests/questions/${itemId}`, {}, {
            headers: {
                'Authorization': `Bearer ${storage.get('token') || ''}`
            }
        }).then((resp: any) => {
            setQuestions(resp.data);
            console.log("Fetched item:", resp.data);
        }).catch((error: any) => {
            if (error.response && error.response.status === 401 && error.response.data.error === 'Invalid token') {
                storage.clearTokenInfo();
                router.push('/login');
            }
        });
    }, [item]);
    const handleAddQuestion = () => {
        router.push('/Table/admin_question2/add?backHref=/Table/admin_test/' + item.id + '/detail'
            + '&field_testId=' + item.id 
            + '&field_questionType=1'
            + '&field_status=1'
            + '&field_categoryIds=' + item.categoryIds
        );
    }

    return (
        <>
            <Container fluid>
                {
                    mode === DataGridEditMode.EDIT ? (
                        <h2 className="text-center">Danh sách câu hỏi của đề thi - ID: {itemId}</h2>
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
                                        <Col sm={12}>
                                            Tên đề thi:{' '}
                                            <span className="text-justify" style={{ textAlign: "justify" }} dangerouslySetInnerHTML={{ __html: replaceMediaUrl(item.name) }}>
                                            </span>{' '}/{' '}
                                            <em className="text-justify" style={{ textAlign: "justify" }} dangerouslySetInnerHTML={{ __html: replaceMediaUrl(item.name_en) }}>
                                            </em>
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
                                {questions.map((question, index) => {
                                    return (
                                        <Col md={12} sm={12} key={question.id} className="mt-3 mb-3">
                                            <h5>{index + 1}. Mã câu hỏi #{question.id} - Số thứ tự: {question.ordering} - {question.status === '1' ? 'Đã kích hoạt' : 'Chưa kích hoạt'} <Button variant="primary"
                                                href={"/Table/admin_question2/" + question.id + '/edit?backHref='
                                                    + "/Table/admin_test/" + item.id + '/detail'}>Sửa</Button> <Button variant="danger">Xóa</Button> </h5>
                                            <Row>
                                                <Col md={6} sm={12}>
                                                    <div style={{ textAlign: 'justify' }} dangerouslySetInnerHTML={{ __html: replaceMediaUrl(question.name) }}></div>
                                                </Col>
                                                <Col md={6} sm={12}>
                                                    <div style={{ textAlign: 'justify' }} dangerouslySetInnerHTML={{ __html: replaceMediaUrl(question.name_vn) }}></div>
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col md={12} sm={12}>
                                                    <h6>Đáp án</h6>
                                                    <blockquote className="ps-3">
                                                        <Row>
                                                            {question.answers.map((answer: any) => {
                                                                return (
                                                                    <Col md={3} sm={12} key={answer.id}>
                                                                        <div style={{ textAlign: 'justify' }} dangerouslySetInnerHTML={{ __html: replaceMediaUrl(answer.content) }}></div>
                                                                        <div style={{ textAlign: 'justify' }} dangerouslySetInnerHTML={{ __html: replaceMediaUrl(answer.content_vn) }}></div>
                                                                    </Col>
                                                                )
                                                            })}
                                                        </Row>
                                                    </blockquote>
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
