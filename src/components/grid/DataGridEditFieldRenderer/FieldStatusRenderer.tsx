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
                item[field.index] = item[field.index] === 1 ? 0 : 1;
            }} label={getStatusLabel(item[field.index] ?? 0)} />
        );
    }
    return (
        <Form.Select value={item[field.index]} onChange={(event) => {
            item[field.index] = event.target.value;
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