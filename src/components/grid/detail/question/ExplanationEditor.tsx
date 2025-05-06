// components/grid/detail/question/ExplanationEditor.tsx
import { Col } from "react-bootstrap";
import { QuestionAnswerEditor } from "../../question/QuestionAnswerEditor";

interface Props {
  item: any;
}

export const ExplanationEditor: React.FC<Props> = ({ item }) => (
  <Col md={12}>
    <h2>Lý giải</h2>
    <QuestionAnswerEditor
      value={item.explaination}
      updateValue={(val) => (item.explaination = val)}
    />
  </Col>
);
