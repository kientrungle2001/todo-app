import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';
import { DataGridColumn } from "../../DataGridColumnTypes";

interface GridDataGridHeadProps {
    table: string;
    columns: DataGridColumn[];
    sortData: any;
    setSortData: (sortData: any) => void;
}

export const GridDataGridHead: React.FC<GridDataGridHeadProps> = ({ table, columns, sortData, setSortData }) => {
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
        
        {columns.map(column => (
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
            </th>
        ))}
    </>
}