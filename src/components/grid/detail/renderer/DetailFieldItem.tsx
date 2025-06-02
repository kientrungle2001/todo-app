// components/grid/detail/renderer/DetailFieldItem.tsx
import { Col } from "react-bootstrap";
import { DataGridDetailField } from "@/types/detail/DataGridDetailField";
import { renderColumn } from "@/types/grid/columns/renderColumn";

interface Props {
  field: DataGridDetailField;
  item: any;
  table: string;
}

export const DetailFieldItem: React.FC<Props> = ({ field, item, table }) => (
  <Col md={field.size ?? 12} className="mb-3 bordered">
    <h5>
      <strong>{field.label}</strong>:{" "}
      {renderColumn(field, item, table, {}, () => {}, () => {}, () => {}, () => {}, () => {})}
    </h5>
  </Col>
);
