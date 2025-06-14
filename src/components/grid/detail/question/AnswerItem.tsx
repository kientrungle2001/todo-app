// components/grid/detail/question/AnswerItem.tsx
import { Col, InputGroup, Button, Row } from "react-bootstrap";
import { QuestionAnswerEditor } from "../../question/QuestionAnswerEditor";

interface Props {
  answer: any;
  index: number;
  answers: any[];
  setAnswers: (answers: any[]) => void;
  appName: string;
}

export const AnswerItem: React.FC<Props> = ({ answer, index, answers, setAnswers, appName }) => {
  const toggleCorrect = () => {
    const updated = answers.map((a) => ({ ...a, status: "0" }));
    updated[index].status = "1";
    setAnswers(updated);
  };

  const remove = () => {
    const updated = [...answers];
    updated.splice(index, 1);
    setAnswers(updated);
  };

  return (
    <Col md={12} className="mt-3 mb-3">
      <InputGroup>
        <InputGroup.Radio
          checked={answer.status === "1"}
          onClick={toggleCorrect}
        />
        <Row className="g-0 w-100">
          <Col md={appName !== "pmtv" ? 6 : 12}>
            <QuestionAnswerEditor
              value={answer.content}
              updateValue={(val) => (answer.content = val)}
            />
          </Col>
          {appName !== "pmtv" && (
            <Col md={6}>
              <QuestionAnswerEditor
                value={answer.content_vn}
                updateValue={(val) => (answer.content_vn = val)}
              />
            </Col>
          )}
        </Row>
        <Button variant="danger" onClick={remove}>X</Button>
      </InputGroup>
    </Col>
  );
};
