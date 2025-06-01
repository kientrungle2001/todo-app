import { Form } from "react-bootstrap";
import { DataGridEditField } from "@/types/edit/DataGridEditField";

export const FieldNumberRenderer = (field: DataGridEditField, item: any, setItem: (item: any) => void) => {
    return (
        <Form.Control type="number" value={item[field.index]} onChange={(event) => {
            item[field.index] = Number(event.target.value);
        }} />
    );
}