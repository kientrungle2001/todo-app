import { Col, Row, Button, Tab } from "react-bootstrap";
import { CategoryTestList } from "./CategoryTestList";

interface Props {
    item: any;
    tests: any[];
    handleAddTest: () => void;
}

export const TestTabPane: React.FC<Props> = ({ item, tests, handleAddTest }) => (
    <Tab eventKey="tests" title="Đề thi">
        <Row>
            <Col sm={12} className="p-3">
                <Button variant="primary" onClick={handleAddTest}>+ Thêm Đề Thi</Button>
            </Col>
            <CategoryTestList tests={tests} item={item} />
        </Row>
    </Tab>
);
