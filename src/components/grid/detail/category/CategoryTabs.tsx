// components/grid/detail/category/CategoryTabs.tsx
import { Col, Row, Tabs, Tab, Button } from "react-bootstrap";
import { CategoryQuestionList } from "./CategoryQuestionList";
import { CategoryTestList } from "./CategoryTestList";

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
        <Tab eventKey="questions" title="Câu hỏi">
          <Row>
            <Col sm={12} className="p-3">
              <Button variant="primary" onClick={handleAddQuestion}>+ Thêm Câu hỏi</Button>
            </Col>
            <CategoryQuestionList questions={questions} item={item} hostConfig={hostConfig} />
          </Row>
        </Tab>
        <Tab eventKey="tests" title="Đề thi">
          <Row>
            <Col sm={12} className="p-3">
              <Button variant="primary" onClick={handleAddTest}>+ Thêm Đề Thi</Button>
            </Col>
            <CategoryTestList tests={tests} item={item} />
          </Row>
        </Tab>
      </Tabs>
    </Col>
  </Row>
);
