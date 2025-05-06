// components/grid/detail/resource/ResourceTabs.tsx
import { Col, Row, Button, Tab, Tabs } from "react-bootstrap";
import { ResourceDetailQuestion } from "./ResourceDetailQuestion";

interface ResourceTabsProps {
  item: any;
  questions: any[];
  hostConfig?: any;
  handleAddQuestion: () => void;
}

export const ResourceTabs: React.FC<ResourceTabsProps> = ({ item, questions, hostConfig, handleAddQuestion }) => (
  <Row>
    <Col sm={12} className="mt-3 mb-3 pt-3 pb-3">
      <Tabs>
        <Tab title="Câu hỏi" eventKey="questions">
          <Row>
            <Col sm={12} className="p-3">
              <Button variant="primary" onClick={handleAddQuestion}>+ Thêm Câu hỏi</Button>
            </Col>
            {questions.length ? (
              questions.map((question, index) => (
                <ResourceDetailQuestion
                  key={question.id}
                  question={question}
                  index={index}
                  item={item}
                  hostConfig={hostConfig}
                />
              ))
            ) : (
              <Col sm={12} className="p-3">Không có câu hỏi</Col>
            )}
          </Row>
        </Tab>
      </Tabs>
    </Col>
  </Row>
);
