import { Col, Row, Button, Tab } from "react-bootstrap";
import { CategoryQuestionList } from "./CategoryQuestionList";

interface Props {
    item: any;
    hostConfig?: any;
    questions: any[];
    handleAddQuestion: () => void;
}

export const QuestionTabPane: React.FC<Props> = ({ item, hostConfig, questions, handleAddQuestion }) => (
    <Tab eventKey="questions" title="Câu hỏi">
        <Row>
            <Col sm={12} className="p-3">
                <Button variant="primary" onClick={handleAddQuestion}>+ Thêm Câu hỏi</Button>
            </Col>
            <CategoryQuestionList questions={questions} item={item} hostConfig={hostConfig} />
        </Row>
    </Tab>
);
