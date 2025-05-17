import { Col, Row } from "react-bootstrap";
import { replaceMediaUrl } from "@/api/defaultSettings";

interface AnswerListProps {
    answers: any[];
    appName: string;
}

export const AnswerList: React.FC<AnswerListProps> = ({ answers, appName }) => (
    <Row>
        {answers.map(answer => (
            <Col sm={12} key={answer.id}>
                <div dangerouslySetInnerHTML={{ __html: replaceMediaUrl(answer.content) }} />
                {appName !== 'pmtv' && (
                    <div dangerouslySetInnerHTML={{ __html: replaceMediaUrl(answer.content_vn) }} />
                )}
            </Col>
        ))}
    </Row>
);
