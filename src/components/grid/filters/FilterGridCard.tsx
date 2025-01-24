import { Button, Card } from "react-bootstrap";
import { DataGridFilterColumn, DataGridSort, DataGridSortOption } from "../DataGridColumnTypes";
import { FiltersGrid } from "./FiltersGrid";

interface FiltersGridCardProps {
    filters: DataGridFilterColumn[];
    sortOptions?: DataGridSortOption[];
    filterData?: any;
    setFilterData: (filterData: any) => void;
    searchText?: string;
    setSearchText: (searchText: string) => void;
    sorts: DataGridSort[];
    setSorts: (sorts: DataGridSort[]) => void;
    defaultSorts?: DataGridSort[];
}
export const FiltersGridCard: React.FC<FiltersGridCardProps> = ({ filters, sortOptions, sorts, setSorts, defaultSorts, filterData, setFilterData, searchText, setSearchText }) => {
    const handleResetFilter = () => {
        setFilterData({});
        setSearchText('');
    };
    return <Card className="border-0">
        <Card.Body className="border-0 pt-0">
            <Card.Title className="d-flex justify-content-between align-items-center">
                <span>Bộ lọc</span>
                <div>
                    <Button size="sm" variant="danger" onClick={handleResetFilter}>Reset</Button>
                </div>
            </Card.Title>
            <FiltersGrid filters={filters} sortOptions={sortOptions} filterData={filterData} setFilterData={setFilterData} searchText={searchText} setSearchText={setSearchText} sorts={sorts} setSorts={setSorts} defaultSorts={defaultSorts} />
        </Card.Body>
    </Card>
}
