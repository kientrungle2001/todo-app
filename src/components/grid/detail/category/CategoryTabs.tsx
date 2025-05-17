import { Col, Row, Tabs } from "react-bootstrap";
import { QuestionTabPane } from "./QuestionTabPane";
import { TestTabPane } from "./TestTabPane";

interface Props {
  item: any;
  hostConfig?: any;
  questions: any[];
  tests: any[];
  handleAddQuestion: () => void;
  handleAddTest: () => void;
}

export const CategoryTabs: React.FC<Props> = ({
  item,
  hostConfig,
  questions,
  tests,
  handleAddQuestion,
  handleAddTest,
}) => (
  <Row>
    <Col sm={12} className="mt-3 mb-3 pt-3 pb-3">
      <Tabs defaultActiveKey="questions" id="category-tabs">
        <QuestionTabPane
          item={item}
          hostConfig={hostConfig}
          questions={questions}
          handleAddQuestion={handleAddQuestion}
        />
        <TestTabPane
          item={item}
          tests={tests}
          handleAddTest={handleAddTest}
        />
      </Tabs>
    </Col>
  </Row>
);
