import { Form } from "react-bootstrap";
import { DataGridColumn } from "../DataGrid";

export const ColumnTextRenderer = (column: DataGridColumn, item: any, table: string, inputableMap: any, setInputableMap: (inputableMap: any) => void) => {
    if (column.inputable) {
        return <>
            {(column.treeMode ? '|__'.repeat(item.__level) + ' ' : '')}
            <Form.Control style={{ width: "100%" }} type="text" value={typeof inputableMap[item.id] !== 'undefined' && typeof inputableMap[item.id][column.index] !== 'undefined' ? inputableMap[item.id][column.index] : ''} onChange={(e) => {
                let updatedInputableMap = { ...inputableMap };
                if (typeof updatedInputableMap[item.id] === "undefined") {
                    updatedInputableMap[item.id] = {};
                }
                updatedInputableMap[item.id][column.index] = e.target.value;
                setInputableMap(updatedInputableMap);
            }} />
        </>;
    }
    if (column.isHtml) {
        let content = column.customFormat ? column.customFormat(item[column.index], item, table) : item[column.index] ?? '';
        content = content.replaceAll('http://s1.nextnobels.com', 'https://stg.media.nextnobels.com').replaceAll('http://fulllooksongngu.com', 'https://stg.media.nextnobels.com');
        return <>
            <div dangerouslySetInnerHTML={{ __html: content }} />
        </>;
    }
    if (column.map) {
        return (column.treeMode ? '|__'.repeat(item.__level) + ' ' : '') + (column.map[item[column.index]] ?? '-');
    }
    return (column.treeMode ? '|__'.repeat(item.__level) + ' ' : '') + (column.customFormat ? column.customFormat(item[column.index], item, table) : item[column.index] ?? '');
};