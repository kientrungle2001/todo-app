import { Col, Row } from "react-bootstrap";
import { replaceMediaUrl } from "@/api/defaultSettings";

interface Props {
    item: any;
    appName: string;
}

export const QuestionNameRenderer: React.FC<Props> = ({ item, appName }) => (
    <Row>
        <Col md={6}>
            <div dangerouslySetInnerHTML={{ __html: replaceMediaUrl(item.name) }} />
        </Col>
        {appName !== "pmtv" && (
            <Col md={6}>
                <div dangerouslySetInnerHTML={{ __html: replaceMediaUrl(item.name_vn) }} />
            </Col>
        )}
    </Row>
);
