import { Form } from "react-bootstrap";
import { DataGridEditField } from "../DataGridEdit";

export const FieldCheckboxRenderer = (field: DataGridEditField, item: any, setItem: (item: any) => void) => {
    return (
        <Form.Check type="checkbox" checked={item[field.index]} onChange={(event) => {
            let updatedItem = { ...item };
            updatedItem[field.index] = event.target.checked;
            setItem(updatedItem);
        }} />
    );
}