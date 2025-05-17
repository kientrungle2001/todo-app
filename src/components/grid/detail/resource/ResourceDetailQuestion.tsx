import { Col, Row } from "react-bootstrap";
import { QuestionHeader } from "./QuestionHeader";
import { QuestionContent } from "./QuestionContent";
import { AnswerList } from "./AnswerList";
interface ResourceDetailQuestionProps {
    hostConfig?: any;
    item: any;
    question: any;
    index: number;
}

export const ResourceDetailQuestion: React.FC<ResourceDetailQuestionProps> = ({ hostConfig, question, index, item }) => {
    const appName = hostConfig?.appName ?? '';
    return (
        <Col sm={12} className="mt-3 mb-3">
            <QuestionHeader question={question} index={index} itemId={item.id} />
            <QuestionContent question={question} appName={appName} />
            <Row>
                <Col sm={12}>
                    <h6>Đáp án</h6>
                    <blockquote className="ps-3">
                        <AnswerList answers={question.answers} appName={appName} />
                    </blockquote>
                </Col>
            </Row>
        </Col>
    );
};
