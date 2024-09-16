import { Form } from "react-bootstrap";
import { DataGridFilterColumn, DataGridFilterColumnType, DataGridSort, DataGridSortOption } from "./DataGrid"
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


    const FilterTextRenderer = (filter: DataGridFilterColumn) => {
        return (
            <Form.Control type="text" value={filterData?.[filter.index] || ''} onChange={(e) => setFilterData({ ...filterData, [filter.index]: e.target.value })} />
        );
    }

    const FilterNumberRenderer = (filter: DataGridFilterColumn) => {
        return (
            <>
                <Form.Control type="number" value={filterData?.[filter.index] && filterData?.[filter.index]['start'] || ''} onChange={(e) => {
                    let updatedFilterData = { ...filterData };
                    if (typeof filterData[filter.index] === 'undefined') updatedFilterData[filter.index] = {};
                    updatedFilterData[filter.index]['start'] = Number(e.target.value);
                    setFilterData(updatedFilterData);
                }} placeholder="start" />
                <Form.Control type="number" value={filterData?.[filter.index] && filterData?.[filter.index]['end'] || ''} onChange={(e) => {
                    let updatedFilterData = { ...filterData };
                    if (typeof filterData[filter.index] === 'undefined') updatedFilterData[filter.index] = {};
                    updatedFilterData[filter.index]['end'] = Number(e.target.value);
                    setFilterData(updatedFilterData);
                }} placeholder="end" />
            </>
        );
    }

    const FilterDateRenderer = (filter: DataGridFilterColumn) => {
    }

    const FilterCurrencyRenderer = (filter: DataGridFilterColumn) => {
    }

    const FilterSelectRenderer = (filter: DataGridFilterColumn) => {
    }

    const FilterCheckboxRenderer = (filter: DataGridFilterColumn) => {
    }

    const FilterStatusRenderer = (filter: DataGridFilterColumn) => {
    }

    const FilterUndefinedRenderer = (filter: DataGridFilterColumn) => {
        return '-';
    }

    const getFilterRenderer = (filterType: DataGridFilterColumnType) => {
        switch (filterType) {
            case DataGridFilterColumnType.TEXT:
                return FilterTextRenderer;
            case DataGridFilterColumnType.NUMBER:
                return FilterNumberRenderer;
            case DataGridFilterColumnType.DATE:
                return FilterDateRenderer;
            case DataGridFilterColumnType.CURRENCY:
                return FilterCurrencyRenderer;
            case DataGridFilterColumnType.SELECT:
                return FilterSelectRenderer;
            case DataGridFilterColumnType.CHECKBOX:
                return FilterCheckboxRenderer;
            case DataGridFilterColumnType.STATUS:
                return FilterStatusRenderer;
            default:
                return FilterUndefinedRenderer;
        }
    }

    const renderFilter = (filter: DataGridFilterColumn): any => {
        const renderer = getFilterRenderer(filter.type ?? DataGridFilterColumnType.TEXT);
        return renderer(filter);
    }

    return <Form>
        <Form.Group controlId={"formGroupSearch"} className="mb-3">
            <Form.Label>Search</Form.Label>
            <Form.Control value={searchText} onChange={(event) => setSearchText(event.target.value)} size="sm" type="text" placeholder={`Search text`} />
        </Form.Group>
        {filters.map(filter => (
            <Form.Group controlId={"formGroup" + filter.index} key={filter.index} className="mb-3">
                <Form.Label>{filter.label}</Form.Label>
                {renderFilter(filter)}
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