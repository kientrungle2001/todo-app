import { format } from "date-fns";
import { Form } from "react-bootstrap";
import { DataGridEditField } from "../DataGridEditTypes";

export const FieldDateRenderer = (field: DataGridEditField, item: any, setItem: (item: any) => void) => {
    return (
        <Form.Control type="date" value={format(new Date(item[field.index]), 'yyyy-MM-dd')} onChange={(event) => {
            let updatedItem: any = { ...item };
            updatedItem[field.index] = event.target.value;
            setItem(updatedItem);
        }} />
    );
}
