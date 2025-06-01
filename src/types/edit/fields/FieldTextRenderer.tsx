import { Form } from "react-bootstrap";
import { DataGridEditField } from "@/types/edit/DataGridEditField";

export const FieldTextRenderer = (field: DataGridEditField, item: any, setItem: (item: any) => void) => {
    return (
        <Form.Control type="text" value={item[field.index]} onChange={(event) => {
            let updatedItem: any = { ...item };
            updatedItem[field.index] = event.target.value;
            setItem(updatedItem);
        }} />
    );
}
