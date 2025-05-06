// components/grid/detail/renderer/DetailFieldsList.tsx
import { DataGridDetailField } from "../../TableGrid";
import { DetailFieldItem } from "./DetailFieldItem";

interface Props {
  fields: DataGridDetailField[];
  item: any;
  table: string;
}

export const DetailFieldsList: React.FC<Props> = ({ fields, item, table }) => (
  <>
    {fields.map((field, index) => (
      <DetailFieldItem key={index} field={field} item={item} table={table} />
    ))}
  </>
);
