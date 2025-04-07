import { Button, Form } from "react-bootstrap";
import { DataGridColumn } from "../DataGridColumnTypes";
import { tableRepository } from "@/api/repositories/Table";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronCircleUp, faChevronDown, faChevronUp, faEnvelope } from '@fortawesome/free-solid-svg-icons'

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
    sortData: any;
    setSortData: (sortData: any) => void;
}

export const DataGridHead: React.FC<DataGridHeadProps> = ({ table, columns, items, isCheckedAll, setIsCheckedAll, checkedItemIds, setCheckedItemIds, inputableMap, setInputableMap, onAfterSaveInputableColumn, defaultFilters, sortData, setSortData }) => {
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
    const toggleSortColumn = (index: string) => {
        let updatedSortData = { ...sortData };
        console.log(index);
        if (typeof updatedSortData[index] === 'undefined') {
            updatedSortData[index] = 'asc';
        } else if (updatedSortData[index] === 'asc') {
            updatedSortData[index] = 'desc';
        } else if (updatedSortData[index] === 'desc') {
            delete updatedSortData[index];
        }
        setSortData(updatedSortData);
    };
    const isSortASC = (index: string) => {
        return typeof sortData[index] !== 'undefined' && sortData[index] == 'asc';
    }
    const isSortDESC = (index: string) => {
        return typeof sortData[index] !== 'undefined' && sortData[index] == 'desc';
    }
    return <>
        <th style={{ width: "1%" }}>
            <Form.Check type="checkbox" checked={isCheckedAll} onChange={handleCheckAll} />
        </th>
        {columns.filter((column) => typeof defaultFilters == 'undefined' || typeof defaultFilters[column.index] == 'undefined').map(column => (
            <th key={column.index} style={{ width: column.width }}>
                {
                    typeof column.sortable == 'undefined' || column.sortable ? <a className="text-nowrap" href="#" onClick={(evt) => {
                        toggleSortColumn(column.index);
                        evt.preventDefault();
                    }}>
                        {column.label}
                        {isSortASC(column.index) && <>{' '} <FontAwesomeIcon icon={faChevronUp} /></>}
                        {isSortDESC(column.index) && <>{' '} <FontAwesomeIcon icon={faChevronDown} /></>}
                    </a> :
                        column.label
                }
                {column.inputable && <>
                    <Button className="ms-2" size="sm" variant="primary" onClick={() => handleSaveInputableColumn(column)}>
                        Lưu
                    </Button>
                </>}
            </th>
        ))}
    </>
}