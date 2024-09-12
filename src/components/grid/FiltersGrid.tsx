import { Form } from "react-bootstrap";
import { DataGridFilterColumn, DataGridSort, DataGridSortOption } from "./DataGrid"
import React from "react";

interface FiltersGridProps {
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

export const FiltersGrid: React.FC<FiltersGridProps> = ({ filters, sortOptions, sorts, setSorts, defaultSorts, filterData, setFilterData, searchText, setSearchText }) => {
    const [sortOptionSelected, setSortOptionSelected] = React.useState<string>('');
    return <Form>
        <Form.Group controlId={"formGroupSearch"} className="mb-3">
            <Form.Label>Search</Form.Label>
            <Form.Control value={searchText} onChange={(event) => setSearchText(event.target.value)} size="sm" type="text" placeholder={`Search text`} />
        </Form.Group>
        {filters.map(filter => (
            <Form.Group controlId={"formGroup" + filter.index} key={filter.index} className="mb-3">
                <Form.Label>{filter.label}</Form.Label>
                <Form.Control value={filterData[filter.index] ? filterData[filter.index] : ''} onChange={(event) => {
                    let updatedFilterData = { ...filterData };
                    updatedFilterData[filter.index] = event.target.value;
                    setFilterData(updatedFilterData);
                }} size="sm" type="text" placeholder={`Filter by ${filter.label}`} />
            </Form.Group>
        ))}
        {sortOptions && <Form.Group controlId="formGroupSort" key="formGroupSort" className="mb-3">
            <Form.Label>Sort by</Form.Label>
            <Form.Select value={sortOptionSelected} size="sm" onChange={(event) => {
                setSortOptionSelected(event.target.value);
                let selectedOption = sortOptions.find(option => option.index === event.target.value);
                if (selectedOption) {
                    setSorts(selectedOption.sorts);
                } else {
                    setSorts(defaultSorts ?? []);
                }
            }}>
                <option value="">Select sort option</option>
                {sortOptions?.map(option => (
                    <option key={option.index} value={option.index}>{option.label}</option>
                ))}
            </Form.Select>
        </Form.Group>}
    </Form>
}