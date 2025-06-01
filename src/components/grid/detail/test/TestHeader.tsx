// components/grid/detail/test/TestHeader.tsx
import { DataGridEditMode } from "@/types/edit/DataGridEditMode";
import { Button, Col, Row } from "react-bootstrap";

interface TestHeaderProps {
  mode: DataGridEditMode;
  itemId?: number;
  addNewLabel?: string;
  handleCancelEdit?: () => void;
  handleCancelAdd?: () => void;
}

export const TestHeader: React.FC<TestHeaderProps> = ({
  mode,
  itemId,
  addNewLabel,
  handleCancelAdd,
  handleCancelEdit,
}) => (
  <Row>
    <Col md={12} className="text-center mt-3">
      <h2>
        {mode === DataGridEditMode.EDIT
          ? `Danh sách câu hỏi của đề thi - ID: ${itemId}`
          : addNewLabel}
      </h2>
    </Col>
  </Row>
);
