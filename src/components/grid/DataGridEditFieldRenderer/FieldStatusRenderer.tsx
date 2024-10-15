import { Form } from "react-bootstrap";
import { DataGridEditField } from "../DataGridEdit";

export const FieldStatusRenderer = (field: DataGridEditField, item: any, setItem: (item: any) => void) => {
    const getStatusLabel = (status: number) => {
        if (field.map && typeof field.map === 'object') {
            return field.map[status] ?? 'Unknown';
        }
        return status === 1 ? 'Active' : 'Inactive';
    }
    if (field.statusToggable) {
        return (
            <Form.Check type="switch" checked={item[field.index] === 1} onChange={(event) => {
                let updatedItem = { ...item };
                updatedItem[field.index] = updatedItem[field.index] === 1 ? 0 : 1;
                setItem(updatedItem);
            }} label={getStatusLabel(item[field.index] ?? 0)} />
        );
    }
    return (
        <Form.Select value={item[field.index]} onChange={(event) => {
            let updatedItem = { ...item };
            updatedItem[field.index] = event.target.value;
            setItem(updatedItem);
        }}>
            <option value={1}>
                {field.map[1] ?? 'Active'}
            </option>
            <option value={0}>
                {field.map[0] ?? 'Inactive'}
            </option>
        </Form.Select>
    );
}