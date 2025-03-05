import React, { useEffect, useState } from "react";
import { Button, Col, Container, Row, Tab, Tabs } from "react-bootstrap";
import 'select2';
import { useRouter } from "next/router";
import { getConfigsByHostName, replaceMediaUrl } from "@/api/defaultSettings";
import { resourceRepository } from "@/api/repositories/Resource";
import { ResourceDetailTitle } from "./ResourceDetailTitle";
import { ResourceDetailQuestion } from "./ResourceDetailQuestion";
import { PmtvAdminCourseSettings } from "@/api/settings/pmtv/education/course/PmtvCourseSettings";

interface ResourceGridEditProps {
    itemId: number;
    item: any;
    handleCancelEdit: () => void;
}

const ResourceGridEdit: React.FC<ResourceGridEditProps> = ({ itemId, item, handleCancelEdit }): React.ReactElement => {

    const [questions, setQuestions] = useState<any[]>([]);
    const [tests, setTests] = useState<any[]>([]);
    const router = useRouter();
    const [hostConfig, setHostConfig] = useState<any>(null);
    useEffect(() => {
        // load questions of test
        resourceRepository.getQuestions(itemId).then((resp: any) => {
            setQuestions(resp.data);
            console.log("Fetched questions:", resp.data);
        });
        const config = getConfigsByHostName();
        setHostConfig(config);
        if (config && config.appName == 'pmtv') {
            setTests([]);
        } else {
            resourceRepository.getTests(itemId).then((resp: any) => {
                setTests(resp.data);
                console.log("Fetched tests:", resp.data);
            }).catch((err: any) => {
                // do nothing
            });
        }

    }, [item]);
    const handleAddQuestion = () => {
        console.log('addQuestion', item);
        resourceRepository.getResource(item.courseId, PmtvAdminCourseSettings).then((resp: any) => {
            console.log('course', resp.data);
            let course = resp.data;
            router.push('/Table/admin_question2/add?backHref=/Table/admin_course_resource/' + item.id + '/detail'
                + '&field_categoryIds=' + course.categoryId
                + '&field_courseId=' + course.id
                + '&field_courseResourceId=' + item.id
                + '&field_status=1'
                + '&field_questionType=1'
            );
        })
        
    }

    return (
        <>
            <Container fluid>
                <h2 className="text-center">Danh sách câu hỏi của &quote;{item.name}&quote; - ID: {itemId}</h2>
                <Row>
                    <Col sm={12} className="mt-3 mb-3 pt-3 pb-3 bg-warning">
                        <Button variant="outline-secondary" onClick={() => handleCancelEdit()}>Quay lại</Button>
                    </Col>

                    <Col sm={12} className="mt-3 mb-3 pt-3 pb-3">
                        <ResourceDetailTitle hostConfig={hostConfig} item={item} />
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
                                        return <ResourceDetailQuestion key={question.id} question={question} index={index} item={item} hostConfig={hostConfig} />
                                    })}
                                    {!questions.length && <Col sm={12} className="p-3">Không có câu hỏi</Col>}
                                </Row>
                            </Tab>
                        </Tabs>
                    </Col>
                </Row>
            </Container>
        </>
    );
};
export default ResourceGridEdit;
