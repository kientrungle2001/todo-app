import React, { useEffect, useState } from "react";
import { Button, Col, Container, Form, InputGroup, Row } from "react-bootstrap";
import axios, { getAxios } from "@/api/axiosInstance";
import 'select2';
import { storage } from "@/api/storage";
import { useRouter } from "next/router";
import { DataGridEditField, DataGridEditMode } from "../../DataGridEditTypes";
import { QuestionAnswerEditor } from "../../question/QuestionAnswerEditor";
import { getConfigsByHostName, replaceMediaUrl } from "@/api/defaultSettings";

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
    const [appName, setAppName] = React.useState<string | null>(null);

    useEffect(() => {
        const hostnameConfigs = getConfigsByHostName(window.location.hostname);
        setAppName(hostnameConfigs.appName);
    }, []);
    useEffect(() => {
        // load answers of question
        getAxios(window.location.hostname).post(`/questions/answers/${itemId}`, {}, {
            headers: {
                'Authorization': `Bearer ${storage.get('token') || ''}`
            }
        }).then((resp: any) => {
            if (resp.data.length > 0) {
                setAnswers(resp.data);
            } else {
                setAnswers([
                    {
                        id: 'uid' + (1000000 + Math.floor(Math.random() * 1000000)),
                        content: '',
                        content_vn: '',
                        status: '0'
                    }
                ]);
            }

            console.log("Fetched item:", resp.data);
        }).catch((error: any) => {
            if (error.response && error.response.status === 401 && error.response.data.error === 'Invalid token') {
                storage.clearTokenInfo();
                router.push('/login');
            }
        });
    }, [item]);
    const handleAddAnswer = () => {
        let updatedAnswers = [...answers];
        updatedAnswers.push({
            id: 'uid' + (1000000 + Math.floor(Math.random() * 1000000)),
            content: '',
            content_vn: '',
            status: '0'
        });
        setAnswers(updatedAnswers);
    }

    if (null === appName) {
        return (<>
            <h1>Not Found</h1>
        </>)
    }

    return (
        <>
            <Container fluid>
                {
                    mode === DataGridEditMode.EDIT ? (
                        <h2 className="text-center">Sửa câu trả lời - ID: {itemId}</h2>
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
                                            <div className="text-justify" style={{ textAlign: "justify" }} dangerouslySetInnerHTML={{ __html: replaceMediaUrl(item.name) }}>
                                            </div>

                                        </Col>
                                        {appName !== 'pmtv' && <Col md={6} sm={12}>
                                            <div className="text-justify" style={{ textAlign: "justify" }} dangerouslySetInnerHTML={{ __html: replaceMediaUrl(item.name_vn) }}>
                                            </div>
                                        </Col>}

                                    </Row>
                                </Col>
                                <Col md={12} sm={12} className="mt-3 mb-3">
                                    <h2>Danh sách câu trả lời: </h2>

                                </Col>
                                {answers.map((answer, index) => {
                                    return (
                                        <Col md={6} sm={12} key={answer.id} className="mt-3 mb-3">
                                            <InputGroup>

                                                <InputGroup.Radio
                                                    checked={answer.status === '1'}
                                                    onChange={() => { }}
                                                    onClick={() => {
                                                        let updatedAnswers: any[] = [...answers];
                                                        updatedAnswers.forEach((ans) => {
                                                            ans.status = '0';
                                                        })
                                                        answer.status = '1';
                                                        setAnswers(updatedAnswers);
                                                    }}
                                                />
                                                <Row className="g-0">
                                                    <Col md={appName !== 'pmtv' ? 6 : 12} sm={12}>
                                                        <QuestionAnswerEditor value={answer.content as string} updateValue={(value: string) => {
                                                            answer.content = value;
                                                        }} />
                                                    </Col>
                                                    {appName !== 'pmtv' && <Col md={6} sm={12}>
                                                        <QuestionAnswerEditor value={answer.content_vn as string} updateValue={(value: string) => {
                                                            answer.content_vn = value;
                                                        }} />
                                                    </Col>}
                                                </Row>
                                                <Button variant="danger" onClick={() => {
                                                    let updatedAnswers: any[] = [...answers];
                                                    updatedAnswers.splice(index, 1);
                                                    setAnswers(updatedAnswers);
                                                }}>
                                                    X
                                                </Button>
                                            </InputGroup>

                                        </Col>
                                    )
                                })}
                                <Col sm={12} className="mt-3 mb-3">
                                    <Button variant="primary" onClick={() => {
                                        handleAddAnswer();
                                    }}>+ Thêm câu trả lời</Button>
                                </Col>

                                <Col md={12} xs={12}>
                                    <h2>Lý giải</h2>
                                    <QuestionAnswerEditor value={item.explaination} updateValue={(value) => {
                                        item.explaination = value;
                                    }} />
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
