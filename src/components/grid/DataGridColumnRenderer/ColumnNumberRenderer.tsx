import { Form } from "react-bootstrap";
import { DataGridColumn } from "../DataGridColumnTypes";

export const ColumnNumberRenderer = (column: DataGridColumn, item: any, table: string, inputableMap: any, setInputableMap: (inputableMap: any) => void) => {
    if (column.inputable) {
        return <>
            {(column.treeMode ? '|__'.repeat(item.__level) + ' ' : '')}
            <Form.Control size="sm" style={{ width: "60px", display: "inline-block" }} type="number" value={typeof inputableMap[item.id] !== 'undefined' && typeof inputableMap[item.id][column.index] !== 'undefined' ? inputableMap[item.id][column.index] : 0} onChange={(e) => {
                let updatedInputableMap = { ...inputableMap };
                if (typeof updatedInputableMap[item.id] === "undefined") {
                    updatedInputableMap[item.id] = {};
                }
                updatedInputableMap[item.id][column.index] = Number(e.target.value);
                setInputableMap(updatedInputableMap);
            }} />
        </>;
    }
    return <>
        {(column.treeMode ? '|__'.repeat(item.__level) + ' ' : '')}
        {column.customFormat ? column.customFormat(item[column.index], item, table) : String(item[column.index])}
    </>;
};