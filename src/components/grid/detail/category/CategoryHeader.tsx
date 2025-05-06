// components/grid/detail/category/CategoryHeader.tsx
import { Button, Col, Row } from "react-bootstrap";
import { CategoryDetailTitle } from "./CategoryDetailTitle";

interface Props {
  itemId: number;
  item: any;
  hostConfig?: any;
  handleCancelEdit: () => void;
}

export const CategoryHeader: React.FC<Props> = ({ itemId, item, hostConfig, handleCancelEdit }) => (
  <>
    <h2 className="text-center">Danh sách câu hỏi của danh mục - ID: {itemId}</h2>
    <Row>
      <Col sm={12} className="mt-3 mb-3 pt-3 pb-3 bg-warning">
        <Button variant="outline-secondary" onClick={handleCancelEdit}>Quay lại</Button>
      </Col>
      <Col sm={12} className="mt-3 mb-3 pt-3 pb-3">
        <CategoryDetailTitle item={item} hostConfig={hostConfig} />
      </Col>
    </Row>
  </>
);
