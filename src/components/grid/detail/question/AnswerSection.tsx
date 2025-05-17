import { Button, Col } from "react-bootstrap";
import { AnswerList } from "./AnswerList";

interface Props {
    answers: any[];
    setAnswers: (answers: any[]) => void;
    appName: string;
    handleAddAnswer: () => void;
}

export const AnswerSection: React.FC<Props> = ({ answers, setAnswers, appName, handleAddAnswer }) => (
    <>
        <AnswerList answers={answers} setAnswers={setAnswers} appName={appName} />
        <Col sm={12}>
            <Button variant="primary" onClick={handleAddAnswer}>
                + Thêm câu trả lời
            </Button>
        </Col>
    </>
);