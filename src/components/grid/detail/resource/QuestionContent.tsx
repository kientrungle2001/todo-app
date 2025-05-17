import { Col, Row } from "react-bootstrap";
import { replaceMediaUrl } from "@/api/defaultSettings";

interface QuestionContentProps {
    question: any;
    appName: string;
}

export const QuestionContent: React.FC<QuestionContentProps> = ({ question, appName }) => (
    appName !== 'pmtv' ? (
        <Row>
            <Col md={6}><div dangerouslySetInnerHTML={{ __html: replaceMediaUrl(question.name) }} /></Col>
            <Col md={6}><div dangerouslySetInnerHTML={{ __html: replaceMediaUrl(question.name_vn) }} /></Col>
        </Row>
    ) : (
        <Row>
            <Col md={12}><div dangerouslySetInnerHTML={{ __html: replaceMediaUrl(question.name) }} /></Col>
        </Row>
    )
);