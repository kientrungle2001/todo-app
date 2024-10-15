import { Form } from "react-bootstrap";
import { DataGridEditField } from "../DataGridEdit";

export const FieldNumberRenderer = (field: DataGridEditField, item: any, setItem: (item: any) => void) => {
    return (
        <Form.Control type="number" value={item[field.index]} onChange={(event) => {
            let updatedItem = { ...item };
            updatedItem[field.index] = Number(event.target.value);
            setItem(updatedItem);
        }} />
    );
}