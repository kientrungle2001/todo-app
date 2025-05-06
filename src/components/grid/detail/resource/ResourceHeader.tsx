// components/grid/detail/resource/ResourceHeader.tsx
import { Col, Row, Button } from "react-bootstrap";
import { ResourceDetailTitle } from "./ResourceDetailTitle";

interface ResourceHeaderProps {
  item: any;
  itemId: number;
  hostConfig?: any;
  handleCancelEdit: () => void;
}

export const ResourceHeader: React.FC<ResourceHeaderProps> = ({ item, itemId, handleCancelEdit, hostConfig }) => (
  <>
    <h2 className="text-center">Danh sách câu hỏi của: {item.name} - ID: {itemId}</h2>
    <Row>
      <Col sm={12} className="mt-3 mb-3 pt-3 pb-3 bg-warning">
        <Button variant="outline-secondary" onClick={handleCancelEdit}>Quay lại</Button>
      </Col>

      <Col sm={12} className="mt-3 mb-3 pt-3 pb-3">
        <ResourceDetailTitle hostConfig={hostConfig} item={item} />
      </Col>
    </Row>
  </>
);
