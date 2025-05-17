import { Col } from "react-bootstrap";
import { QuestionAnswerEditor } from "../../question/QuestionAnswerEditor";

interface Props {
  value: string;
  updateValue: (value: string) => void;
}

export const TestContentEditor: React.FC<Props> = ({ value, updateValue }) => (
  <Col md={12} xs={12}>
    <h2>Đề bài</h2>
    <QuestionAnswerEditor value={value} updateValue={updateValue} />
  </Col>
);
