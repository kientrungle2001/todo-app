import { format } from "date-fns";
import { DataGridEditField } from "../DataGridEdit";
import { Form } from "react-bootstrap";

export const FieldDateRenderer = (field: DataGridEditField, item: any, setItem: (item: any) => void) => {
    return (
        <Form.Control type="date" value={format(new Date(item[field.index]), 'yyyy-MM-dd')} onChange={(event) => {
            let updatedItem = { ...item };
            updatedItem[field.index] = event.target.value;
            setItem(updatedItem);
        }} />
    );
}