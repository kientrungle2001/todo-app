// components/grid/detail/test/TestForm.tsx
import { Button, Col, Row } from "react-bootstrap";
import { replaceMediaUrl } from "@/api/defaultSettings";
import { DataGridEditField } from "@/types/edit/DataGridEditField";
import { DataGridEditMode } from "@/types/edit/DataGridEditMode";

interface TestFormProps {
  mode: DataGridEditMode;
  item: any;
  handleAddQuestion: () => void;
  fields: DataGridEditField[];
  handleCancelEdit?: () => void;
  handleCancelAdd?: () => void;
}

export const TestForm: React.FC<TestFormProps> = ({
  mode,
  item,
  handleAddQuestion,
  handleCancelEdit,
  handleCancelAdd,
}) => (
  <>
    <Col md={12} className="mt-3 mb-3 pt-3 pb-3 bg-warning">
      <Button size="lg" variant="primary" type="submit" className="me-2">
        {mode === DataGridEditMode.EDIT ? "Cập nhật" : "Thêm mới"}
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

    <Col md={12} className="mb-3">
      <Row>
        <Col sm={12}>
          Tên đề thi:{" "}
          <span
            className="text-justify"
            dangerouslySetInnerHTML={{ __html: replaceMediaUrl(item.name) }}
          />{" "}
          /{" "}
          <em
            className="text-justify"
            dangerouslySetInnerHTML={{ __html: replaceMediaUrl(item.name_en) }}
          />
        </Col>
      </Row>
    </Col>

    <Col md={12} className="mb-3">
      <h2>Câu hỏi:</h2>
      <Button variant="primary" onClick={handleAddQuestion}>
        Thêm
      </Button>
    </Col>
  </>
);
