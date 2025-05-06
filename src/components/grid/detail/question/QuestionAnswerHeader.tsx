// components/grid/detail/question/QuestionAnswerHeader.tsx
import { Col } from "react-bootstrap";
import { DataGridEditMode } from "../../DataGridEditTypes";
import { Button } from "react-bootstrap";

interface Props {
  mode: DataGridEditMode;
  itemId?: number;
  addNewLabel?: string;
  handleCancelEdit?: () => void;
  handleCancelAdd?: () => void;
}

export const QuestionAnswerHeader: React.FC<Props> = ({
  mode,
  itemId,
  addNewLabel,
  handleCancelEdit,
  handleCancelAdd,
}) => (
  <Col md={12} className="mt-3 mb-3 pt-3 pb-3 bg-warning">
    <Button size="lg" variant="primary" type="submit" className="me-2">
      {mode === DataGridEditMode.EDIT ? "Cập nhật" : addNewLabel || "Thêm mới"}
    </Button>
    <Button
      variant="outline-secondary"
      onClick={() => {
        mode === DataGridEditMode.ADD
          ? handleCancelAdd?.()
          : handleCancelEdit?.();
      }}
    >
      Hủy bỏ
    </Button>
  </Col>
);
