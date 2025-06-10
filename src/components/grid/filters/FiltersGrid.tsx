import { Form } from "react-bootstrap";
import { DataGridSortOption } from "@/types/grid/DataGridSortOption";
import { DataGridSort } from "@/types/grid/DataGridSort";
import { DataGridFilterColumn } from "@/types/grid/DataGridFilterColumn";
import { DataGridFilterColumnType } from "@/types/grid/DataGridFilterColumnType";
import React, { useEffect } from "react";
import { getAxios } from "@/api/axiosInstance";
import { storage } from "@/api/storage";
import { useRouter } from "next/router";
import { buildTree, flatTree } from "@/api/tree";
import $ from "jquery";
import 'select2';
import { tableRepository } from "@/api/repositories/Table";

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
            <Form.Control size="sm" type="text" value={filterData?.[filter.index] || ''} onChange={(e) => setFilterData({ ...filterData, [filter.index]: e.target.value })} placeholder={filter.label} />
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
                }} placeholder={"start " + filter.label} />
                <Form.Control type="number" value={filterData?.[filter.index] && filterData?.[filter.index]['end'] || ''} onChange={(e) => {
                    let updatedFilterData = { ...filterData };
                    if (typeof filterData[filter.index] === 'undefined') updatedFilterData[filter.index] = {};
                    updatedFilterData[filter.index]['end'] = Number(e.target.value);
                    setFilterData(updatedFilterData);
                }} placeholder={"end " + filter.label} />
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
                }} placeholder={"start " + filter.label} />
                <Form.Control type="date" value={filterData?.[filter.index] && filterData?.[filter.index]['end'] || ''} onChange={(e) => {
                    let updatedFilterData = { ...filterData };
                    if (typeof filterData[filter.index] === 'undefined') updatedFilterData[filter.index] = {};
                    updatedFilterData[filter.index]['end'] = Number(e.target.value);
                    setFilterData(updatedFilterData);
                }} placeholder={"end " + filter.label} />
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
                }} placeholder={"start " + filter.label} />
                <Form.Control type="number" value={filterData?.[filter.index] && filterData?.[filter.index]['end'] || ''} onChange={(e) => {
                    let updatedFilterData = { ...filterData };
                    if (typeof filterData[filter.index] === 'undefined') updatedFilterData[filter.index] = {};
                    updatedFilterData[filter.index]['end'] = Number(e.target.value);
                    setFilterData(updatedFilterData);
                }} placeholder={"end " + filter.label} />
            </>
        );
    }

    const FilterSelectRenderer = (filter: DataGridFilterColumn) => {
        const selectRef: any = {};
        selectRef[filter.index] = React.useRef(null);

        useEffect(() => {
            if (filter.select2 && selectRef[filter.index].current && (filter.options || maps[filter.index])) {
                const $select = $(selectRef[filter.index].current);

                $select.select2({
                    theme: 'bootstrap-5', // Optional: you can customize the theme
                    placeholder: 'Chọn ' + filter.label,
                    allowClear: true,
                });

                // When the selection changes, update the item state
                $select.on('change', function () {
                    const selectedValues = $select.val();
                    if (typeof selectedValues === 'string') {
                        let updatedItem = { ...filterData };
                        updatedItem[filter.index] = selectedValues;
                        setFilterData(updatedItem);
                    } else if (typeof selectedValues !== 'undefined') {
                        let updatedItem = { ...filterData };
                        updatedItem[filter.index] = (selectedValues as string[])?.[0] ?? '';
                        setFilterData(updatedItem);
                    }
                });

                // Clean up Select2 on unmount
                return () => {
                    $select.select2('destroy');
                };
            }
        }, [filter, filterData, maps[filter.index], filter.options]); // Re-run when options or maps change

        if (filter.options) {
            return (
                <Form.Select ref={selectRef[filter.index]} size="sm" value={filterData?.[filter.index] || ''} onChange={(event) => {
                    let updatedFilterData = { ...filterData };
                    updatedFilterData[filter.index] = event.target.value;
                    setFilterData(updatedFilterData);
                }} aria-placeholder={filter.label}>
                    <option>Chọn {filter.label}</option>
                    {filter.options.map((option, index) => (
                        <option key={index} value={option.value}>{option.label}</option>
                    ))}
                </Form.Select>
            );
        } else if (filter.table && typeof maps[filter.index] === 'object') {
            return (
                <Form.Select ref={selectRef[filter.index]} size="sm" value={filterData[filter.index] ?? ''} onChange={(event) => {
                    let updatedFilterData = { ...filterData };
                    updatedFilterData[filter.index] = event.target.value;
                    setFilterData(updatedFilterData);
                }} aria-placeholder={filter.label}>
                    <option>Chọn {filter.label}</option>
                    {maps[filter.index].map((option: any) => (
                        <option key={option[filter.valueField as string]} value={option[filter.valueField as string]}

                        >
                            {filter.treeMode ? '|____'.repeat(option.__level + 1) : ''}
                            #{option[filter.valueField as string]}&nbsp;-&nbsp;
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
                let updatedFilterData = { ...filterData };
                updatedFilterData[filter.index] = event.target.value;
                setFilterData(updatedFilterData);
            }}>
                <option value={''}>Chọn {filter.label}</option>
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
    const router = useRouter();
    React.useEffect(() => {
        const updatedMaps = { ...maps };
        filters.forEach(filter => {
            if (filter.type === DataGridFilterColumnType.SELECT && filter.table) {
                let condition = null;
                if (filter.tableCondition) {
                    if (typeof filter.tableCondition === 'function') {
                        condition = filter.tableCondition(filterData);
                    } else {
                        condition = filter.tableCondition;
                    }
                }
                const fields = [filter.valueField, filter.labelField];
                if (filter.treeMode) {
                    fields.push(filter.treeParentField ?? 'parent');
                }
                const data: any = {
                    fields: fields,
                    condition: condition
                };
                if (filter.treeMode) {
                    data.orderBy = filter.orderBy ?? 'ordering asc';
                } else {
                    data.orderBy = filter.orderBy ?? 'id asc';
                }
                tableRepository.getItemsForSelect(filter.table, data).then((response: any) => {
                    let items: any[] = response.data;
                    if (filter.treeMode) {
                        items = buildTree(items, filter.treeParentField ?? 'parent');
                        items = flatTree(items);
                    }
                    updatedMaps[filter.index] = items;
                });
            }
        });
        setTimeout(() => {
            setMaps(updatedMaps);
        }, 200);
    }, [filterData]);

    return <Form className="row g-1">
        <Form.Group controlId={"formGroupSearch"} className="mb-1 col-md-2">
            {/*<Form.Label>Tìm kiếm</Form.Label>*/}
            <Form.Control value={searchText} onChange={(event) => setSearchText(event.target.value)} size="sm" type="text" placeholder={`Từ khóa`} />
        </Form.Group>
        {filters.map(filter => (
            <Form.Group controlId={"formGroup" + filter.index} key={filter.index} className={"mb-1 col-md-" + (filter.size ?? 2)}>
                {/*<Form.Label>{filter.label}</Form.Label>*/}
                {renderFilter(filter)}
            </Form.Group>
        ))}
        {sortOptions && <Form.Group controlId="formGroupSort" key="formGroupSort" className="mb-1 col-md-2">
            {/*<Form.Label>Sắp xếp theo</Form.Label>*/}
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
