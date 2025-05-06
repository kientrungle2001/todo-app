// components/grid/detail/question/AnswerList.tsx
import { Col } from "react-bootstrap";
import { AnswerItem } from "./AnswerItem";

interface Props {
  answers: any[];
  setAnswers: (answers: any[]) => void;
  appName: string;
}

export const AnswerList: React.FC<Props> = ({ answers, setAnswers, appName }) => (
  <>
    <Col md={12}>
      <h2>Danh sách câu trả lời:</h2>
    </Col>
    {answers.map((answer, index) => (
      <AnswerItem
        key={answer.id}
        index={index}
        answer={answer}
        answers={answers}
        setAnswers={setAnswers}
        appName={appName}
      />
    ))}
  </>
);
