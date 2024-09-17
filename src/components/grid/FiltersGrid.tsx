import { Form } from "react-bootstrap";
import { DataGridFilterColumn, DataGridFilterColumnType, DataGridSort, DataGridSortOption } from "./DataGrid"
import React from "react";
import axios from "@/api/axiosInstance";

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
            <Form.Control size="sm" type="text" value={filterData?.[filter.index] || ''} onChange={(e) => setFilterData({ ...filterData, [filter.index]: e.target.value })} />
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
        return (
            <>
                <Form.Control type="date" value={filterData?.[filter.index] && filterData?.[filter.index]['start'] || ''} onChange={(e) => {
                    let updatedFilterData = { ...filterData };
                    if (typeof filterData[filter.index] === 'undefined') updatedFilterData[filter.index] = {};
                    updatedFilterData[filter.index]['start'] = Number(e.target.value);
                    setFilterData(updatedFilterData);
                }} placeholder="start" />
                <Form.Control type="date" value={filterData?.[filter.index] && filterData?.[filter.index]['end'] || ''} onChange={(e) => {
                    let updatedFilterData = { ...filterData };
                    if (typeof filterData[filter.index] === 'undefined') updatedFilterData[filter.index] = {};
                    updatedFilterData[filter.index]['end'] = Number(e.target.value);
                    setFilterData(updatedFilterData);
                }} placeholder="end" />
            </>
        );
    }

    const FilterCurrencyRenderer = (filter: DataGridFilterColumn) => {
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

    const FilterSelectRenderer = (filter: DataGridFilterColumn) => {
        if (filter.options) {
            return (
                <Form.Select size="sm" value={filterData?.[filter.index] || ''} onChange={(event) => {
                    let updatedFilterData = {...filterData };
                    updatedFilterData[filter.index] = event.target.value;
                    setFilterData(updatedFilterData);
                }}>
                    {filter.options.map((option, index) => (
                        <option key={index} value={option.value}>{option.label}</option>
                    ))}
                </Form.Select>
            );
        } else if (filter.table && typeof maps[filter.index] === 'object') {
            return (
                <Form.Select size="sm" value={filterData[filter.index]} onChange={(event) => {
                    let updatedFilterData = {...filterData };
                    updatedFilterData[filter.index] = event.target.value;
                    setFilterData(updatedFilterData);
                }}>
                    <option value={''}>Chọn</option>
                    {maps[filter.index].map((option: any) => (
                        <option key={option[filter.valueField as string]} value={option[filter.valueField as string]}>
                            {option[filter.labelField as string]}
                        </option>
                    ))}
                </Form.Select>
            )
        } else {
            return '-';
        }
        
    }

    const FilterCheckboxRenderer = (filter: DataGridFilterColumn) => {
        return (
            <Form.Check type="checkbox" checked={filterData?.[filter.index] || false} onChange={(event) => {
                let updatedFilterData = { ...filterData };
                updatedFilterData[filter.index] = event.target.checked;
                setFilterData(updatedFilterData);
            }} />
        );
    }

    const FilterStatusRenderer = (filter: DataGridFilterColumn) => {
        return (
            <Form.Select size="sm" value={filterData?.[filter.index] || ''} onChange={(event) => {
                let updatedFilterData = {...filterData };
                updatedFilterData[filter.index] = event.target.value;
                setFilterData(updatedFilterData);
            }}>
                <option value={''}>Chọn</option>
                <option value={1}>
                    {filter?.map ? filter?.map[1] : 'Active'}
                </option>
                <option value={0}>
                    {filter?.map ? filter?.map[0] : 'Inactive'}
                </option>
            </Form.Select>
        )
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

    const [maps, setMaps] = React.useState<{ [key: string]: any }>(filterData);
    React.useEffect(() => {
        filters.forEach(filter => {
            if (filter.type === DataGridFilterColumnType.SELECT && filter.table) {
                axios.post(`/tables/${filter.table}/map`, {
                    fields: [filter.valueField, filter.labelField]
                })
                    .then(response => {
                        let updatedMaps = { ...maps };
                        updatedMaps[filter.index] = response.data;
                        setMaps(updatedMaps);
                    })
                    .catch(error => {
                        console.error('Error fetching map data:', error);
                    });
            }
        });
    }, []);

    return <Form>
        <Form.Group controlId={"formGroupSearch"} className="mb-3">
            <Form.Label>Tìm kiếm</Form.Label>
            <Form.Control value={searchText} onChange={(event) => setSearchText(event.target.value)} size="sm" type="text" placeholder={`Từ khóa`} />
        </Form.Group>
        {filters.map(filter => (
            <Form.Group controlId={"formGroup" + filter.index} key={filter.index} className="mb-3">
                <Form.Label>{filter.label}</Form.Label>
                {renderFilter(filter)}
            </Form.Group>
        ))}
        {sortOptions && <Form.Group controlId="formGroupSort" key="formGroupSort" className="mb-3">
            <Form.Label>Sắp xếp theo</Form.Label>
            <Form.Select value={sortOptionSelected} size="sm" onChange={(event) => {
                setSortOptionSelected(event.target.value);
                let selectedOption = sortOptions.find(option => option.index === event.target.value);
                if (selectedOption) {
                    setSorts(selectedOption.sorts);
                } else {
                    setSorts(defaultSorts ?? []);
                }
            }}>
                <option value="">Chọn sắp xếp</option>
                {sortOptions?.map(option => (
                    <option key={option.index} value={option.index}>{option.label}</option>
                ))}
            </Form.Select>
        </Form.Group>}
    </Form>
}