import { Form } from "react-bootstrap";
import { DataGridEditField } from "../DataGridEditTypes";

export const FieldCheckboxRenderer = (field: DataGridEditField, item: any, setItem: (item: any) => void) => {
    return (
        <Form.Check type="checkbox" checked={item[field.index]} onChange={(event) => {
            item[field.index] = event.target.checked;
        }} />
    );
}