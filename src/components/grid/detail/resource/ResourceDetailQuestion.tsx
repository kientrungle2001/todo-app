import { replaceMediaUrl } from "@/api/defaultSettings"
import { Button, Col, Row } from "react-bootstrap"

interface ResourceDetailQuestionProps {
    hostConfig?: any;
    item: any;
    question: any;
    index: number;
}

export const ResourceDetailQuestion: React.FC<ResourceDetailQuestionProps> = ({ hostConfig, question, index, item }): React.ReactElement => {
    return <Col sm={12} key={question.id} className="mt-3 mb-3">
        <h5>{index + 1}. Mã câu hỏi #{question.id} - Số thứ tự: {question.ordering} - {question.status === '1' ? 'Đã kích hoạt' : 'Chưa kích hoạt'} <Button variant="primary"
            href={"/Table/admin_question2/" + question.id + '/edit?backHref='
                + "/Table/admin_course_resource/" + item.id + '/detail'}>Sửa</Button> <Button variant="danger">Xóa</Button> </h5>
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
}