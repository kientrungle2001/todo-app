import { Button, Form } from "react-bootstrap";
import { DataGridColumn } from "../DataGridColumnTypes";
import { tableRepository } from "@/api/repositories/Table";

interface DataGridHeadProps {
    table: string;
    columns: DataGridColumn[];
    isCheckedAll: boolean;
    setIsCheckedAll: (isCheckedAll: boolean) => void;
    checkedItemIds: number[];
    setCheckedItemIds: (checkedItemIds: number[]) => void;
    items: any[];
    inputableMap: any;
    setInputableMap: (inputableMap: any) => void;
    onAfterSaveInputableColumn: (column: DataGridColumn) => void;
    defaultFilters?: any;
}

export const DataGridHead: React.FC<DataGridHeadProps> = ({ table, columns, items, isCheckedAll, setIsCheckedAll, checkedItemIds, setCheckedItemIds, inputableMap, setInputableMap, onAfterSaveInputableColumn, defaultFilters }) => {
    const handleSaveInputableColumn = (column: DataGridColumn) => {
        let values: any[] = [];
        for (let itemId in inputableMap) {
            let inputableItem = inputableMap[itemId];
            values.push({
                id: itemId,
                value: inputableItem[column.index]
            });
        }
        tableRepository.updateColumn(table, column, values).then(() => {
            onAfterSaveInputableColumn(column);
        });
    }
    const handleCheckAll = (event: React.ChangeEvent<HTMLInputElement>) => {
        let checked = event.target.checked;
        setIsCheckedAll(checked);
        if (checked === false) {
            setCheckedItemIds([]);
        } else {
            setCheckedItemIds(items.map(item => item.id));
        }
    };
    return <>
        <th style={{ width: "1%" }}>
            <Form.Check type="checkbox" checked={isCheckedAll} onChange={handleCheckAll} />
        </th>
        {columns.filter((column) => typeof defaultFilters == 'undefined' || typeof defaultFilters[column.index] == 'undefined').map(column => (
            <th key={column.index} style={{ width: column.width }}>
                {column.label}
                {column.inputable && <>
                    <Button className="ms-2" size="sm" variant="primary" onClick={() => handleSaveInputableColumn(column)}>
                        Lưu
                    </Button>
                </>}
            </th>
        ))}
    </>
}