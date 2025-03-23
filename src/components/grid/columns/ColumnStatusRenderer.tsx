import { Form } from "react-bootstrap";
import { DataGridColumn } from "../DataGridColumnTypes";
import { tableRepository } from "@/api/repositories/Table";

export const ColumnStatusRenderer = (column: DataGridColumn, item: any, table: string, inputableMap: any, setInputableMap: (inputableMap: any) => void, onAfterChangeStatus: (column: DataGridColumn, item: any) => void) => {
    const handleChangeStatusField = (status: number) => {
        tableRepository.updateItemColumn(table, item.id, [column], { [column.index]: status }).then(() => {
            item[column.index] = status;
            onAfterChangeStatus(column, item);
        });
    }

    const getStatusLabel = (status: number) => {
        if (column.map) {
            return column.map[status] ?? '-';
        }
        return (status === 1) ? 'Active' : 'Inactive';
    }

    if (column.statusToggable) {
        return <Form.Check
            type="switch"
            label={column.hideLabel ? '' : getStatusLabel(item[column.index])}
            checked={item[column.index] === 1}
            onChange={() => handleChangeStatusField(item[column.index] === 1 ? 0 : 1)}
        />

    } else {
        return getStatusLabel(item[column.index]);
    }

};
