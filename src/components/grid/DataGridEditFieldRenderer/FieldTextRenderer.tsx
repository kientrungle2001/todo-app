import { Form } from "react-bootstrap";
import { DataGridEditField } from "../DataGridEditTypes";

export const FieldTextRenderer = (field: DataGridEditField, item: any, setItem: (item: any) => void) => {
    return (
        <Form.Control type="text" value={item[field.index]} onChange={(event) => {
            item[field.index] = event.target.value;
        }} />
    );
}