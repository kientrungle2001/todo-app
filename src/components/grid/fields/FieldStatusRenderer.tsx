import { Form } from "react-bootstrap";
import { DataGridEditField } from "../DataGridEditTypes";

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
                let updatedItem: any = { ...item };
                updatedItem[field.index] = updatedItem[field.index] === 1 ? 0 : 1;
                setItem(updatedItem);
            }} label={getStatusLabel(item[field.index] ?? 0)} />
        );
    }
    return (
        <Form.Select value={item[field.index]} onChange={(event) => {
            item[field.index] = event.target.value;
        }}>
            <option value={1}>
                {getStatusLabel(1)}
            </option>
            <option value={0}>
                {getStatusLabel(0)}
            </option>
        </Form.Select>
    );
}