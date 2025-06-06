import { format } from "date-fns";
import { Form } from "react-bootstrap";
import { DataGridEditField } from "@/types/edit/DataGridEditField";

export const FieldDateRenderer = (field: DataGridEditField, item: any, setItem: (item: any) => void) => {
    let dateValue: Date|null = new Date(item[field.index] ?? (new Date()));
    if (dateValue.toString() === 'Invalid Date' || isNaN(dateValue.getTime())) {
        dateValue = null;
    }
    return (
        <Form.Control type="date" value={dateValue ? format(dateValue, 'yyyy-MM-dd') : ''} onChange={(event) => {
            let updatedItem: any = { ...item };
            updatedItem[field.index] = event.target.value;
            setItem(updatedItem);
        }} />
    );
}
