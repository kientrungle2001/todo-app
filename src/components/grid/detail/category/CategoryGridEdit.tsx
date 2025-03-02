import React, { useEffect, useState } from "react";
import { Button, Col, Container, Row, Tab, Tabs } from "react-bootstrap";
import 'select2';
import { useRouter } from "next/router";
import { getConfigsByHostName, replaceMediaUrl } from "@/api/defaultSettings";
import { categoryRepository } from "@/api/repositories/Category";

interface CategoryGridEditProps {
    itemId: number;
    item: any;
    handleCancelEdit: () => void;
}

const CategoryGridEdit: React.FC<CategoryGridEditProps> = ({ itemId, item, handleCancelEdit }): React.ReactElement => {

    const [questions, setQuestions] = useState<any[]>([]);
    const [tests, setTests] = useState<any[]>([]);
    const router = useRouter();
    const [hostConfig, setHostConfig] = useState<any>(null);
    useEffect(() => {
        // load questions of test
        categoryRepository.getQuestions(itemId).then((resp: any) => {
            setQuestions(resp.data);
            console.log("Fetched questions:", resp.data);
        });
        const config = getConfigsByHostName();
        setHostConfig(config);
        if (config && config.appName == 'pmtv') {
            setTests([]);
        } else {
            categoryRepository.getTests(itemId).then((resp: any) => {
                setTests(resp.data);
                console.log("Fetched tests:", resp.data);
            }).catch((err: any) => {
                // do nothing
            });
        }

    }, [item]);
    const handleAddQuestion = () => {
        router.push('/Table/admin_question2/add?backHref=/Table/admin_category/' + item.id + '/detail'
            + '&field_categoryIds=' + item.parents
            + '&field_status=1'
            + '&field_questionType=1'
        );
    }

    const handleAddTest = () => {
        router.push('/Table/admin_test/add?backHref=/Table/admin_category/' + item.id + '/detail'
            + '&field_categoryIds=' + item.parents
            + '&field_status=1'
        );
    }

    return (
        <>
            <Container fluid>
                <h2 className="text-center">Danh sách câu hỏi của danh mục - ID: {itemId}</h2>
                <Row>
                    <Col sm={12} className="mt-3 mb-3 pt-3 pb-3 bg-warning">
                        <Button variant="outline-secondary" onClick={() => handleCancelEdit()}>Quay lại</Button>
                    </Col>

                    <Col sm={12} className="mt-3 mb-3 pt-3 pb-3">
                        <Row>
                            <Col sm={12}>
                                Tên danh mục:{' '}
                                <span className="text-justify" style={{ textAlign: "justify" }} dangerouslySetInnerHTML={{ __html: replaceMediaUrl(item.name) }}>
                                </span>{' '}
                                {hostConfig && hostConfig.appName != 'pmtv' && <>
                                    /{' '}
                                    <em className="text-justify" style={{ textAlign: "justify" }} dangerouslySetInnerHTML={{ __html: replaceMediaUrl(item.name_en) }}>
                                    </em>
                                </>}

                            </Col>
                        </Row>
                    </Col>
                    <Col sm={12} className="mt-3 mb-3 pt-3 pb-3">
                        <Tabs>
                            <Tab title="Câu hỏi" eventKey="questions">
                                <Row>
                                    <Col sm={12} className="p-3">
                                        <Button variant="primary" onClick={() => {
                                            handleAddQuestion();
                                        }}>+ Thêm Câu hỏi</Button>
                                    </Col>
                                    {questions.map((question, index) => {
                                        return (
                                            <Col sm={12} key={question.id} className="mt-3 mb-3">
                                                <h5>{index + 1}. Mã câu hỏi #{question.id} - Số thứ tự: {question.ordering} - {question.status === '1' ? 'Đã kích hoạt' : 'Chưa kích hoạt'} <Button variant="primary"
                                                    href={"/Table/admin_question2/" + question.id + '/edit?backHref='
                                                        + "/Table/admin_category/" + item.id + '/detail'}>Sửa</Button> <Button variant="danger">Xóa</Button> </h5>
                                                {hostConfig && hostConfig.appName != 'pmtv' && <Row>
                                                    <Col md={6} sm={12}>
                                                        <div style={{ textAlign: 'justify' }} dangerouslySetInnerHTML={{ __html: replaceMediaUrl(question.name) }}></div>
                                                    </Col>
                                                    <Col md={6} sm={12}>
                                                        <div style={{ textAlign: 'justify' }} dangerouslySetInnerHTML={{ __html: replaceMediaUrl(question.name_vn) }}></div>
                                                    </Col>
                                                </Row>}
                                                {hostConfig && hostConfig.appName == 'pmtv' && <Row>
                                                    <Col sm={12}>
                                                        <div style={{ textAlign: 'justify' }} dangerouslySetInnerHTML={{ __html: replaceMediaUrl(question.name) }}></div>
                                                    </Col>
                                                </Row>}

                                                <Row>
                                                    <Col sm={12}>
                                                        <h6>Đáp án</h6>
                                                        <blockquote className="ps-3">
                                                            <Row>
                                                                {question.answers.map((answer: any) => {
                                                                    return (
                                                                        <Col sm={12} key={answer.id}>
                                                                            <div style={{ textAlign: 'justify' }} dangerouslySetInnerHTML={{ __html: replaceMediaUrl(answer.content) }}></div>
                                                                            {hostConfig && hostConfig.appName !== 'pmtv' && <div style={{ textAlign: 'justify' }} dangerouslySetInnerHTML={{ __html: replaceMediaUrl(answer.content_vn) }}></div>}
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
                                    {!questions.length && <Col sm={12} className="p-3">Không có câu hỏi</Col>}
                                </Row>
                            </Tab>
                            <Tab title="Đề thi" eventKey="tests">
                                <Row>
                                    <Col sm={12} className="p-3">
                                        <Button variant="primary" onClick={() => {
                                            handleAddTest();
                                        }}>+ Thêm Đề Thi</Button>
                                    </Col>
                                    {tests.map((test, index) => {
                                        return (
                                            <Col sm={12} key={test.id} className="mt-3 mb-3">
                                                <h5>{index + 1}. #{test.id} <span style={{ textAlign: 'justify' }} dangerouslySetInnerHTML={{ __html: test.name }}></span>{' '}/{' '}
                                                    <em style={{ textAlign: 'justify' }} dangerouslySetInnerHTML={{ __html: test.name_en }}></em> - Số thứ tự: {test.ordering} - {test.status === '1' ? 'Đã kích hoạt' : 'Chưa kích hoạt'}
                                                    {' '}<Button variant="primary"
                                                        href={"/Table/admin_test/" + test.id + '/edit?backHref='
                                                            + "/Table/admin_category/" + item.id + '/detail'}>Sửa</Button>
                                                    {' '}<Button variant="primary"
                                                        href={"/Table/admin_test/" + test.id + '/detail?backHref='
                                                            + "/Table/admin_category/" + item.id + '/detail'}>Chi tiết</Button>
                                                    {' '}<Button variant="danger">Xóa</Button> </h5>
                                            </Col>
                                        )
                                    })}
                                    {!tests.length && <Col sm={12} className="p-3">Không có đề thi</Col>}
                                </Row>
                            </Tab>
                        </Tabs>
                    </Col>
                </Row>
            </Container>
        </>
    );
};
export default CategoryGridEdit;
