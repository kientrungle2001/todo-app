import { Form } from "react-bootstrap";
import { DataGridSortOption } from "@/types/grid/DataGridSortOption";
import { DataGridSort } from "@/types/grid/DataGridSort";
import { DataGridFilterColumn } from "@/types/grid/DataGridFilterColumn";
import { DataGridFilterColumnType } from "@/types/grid/DataGridFilterColumnType";
import React, { useEffect, useRef, useState } from "react";
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
    const [sortOptionSelected, setSortOptionSelected] = useState<string>('');
    const selectRefs = useRef<{ [key: string]: React.RefObject<HTMLSelectElement> }>({});

    const FilterTextRenderer = (filter: DataGridFilterColumn) => (
        <Form.Control size="sm" type="text" value={filterData?.[filter.index] || ''} onChange={(e) => setFilterData({ ...filterData, [filter.index]: e.target.value })} placeholder={filter.label} />
    );

    const FilterNumberRenderer = (filter: DataGridFilterColumn) => (
        <>
            <Form.Control type="number" value={filterData?.[filter.index]?.start || ''} onChange={(e) => {
                const updatedFilterData = { ...filterData };
                if (!updatedFilterData[filter.index]) updatedFilterData[filter.index] = {};
                updatedFilterData[filter.index].start = Number(e.target.value);
                setFilterData(updatedFilterData);
            }} placeholder={"start " + filter.label} />
            <Form.Control type="number" value={filterData?.[filter.index]?.end || ''} onChange={(e) => {
                const updatedFilterData = { ...filterData };
                if (!updatedFilterData[filter.index]) updatedFilterData[filter.index] = {};
                updatedFilterData[filter.index].end = Number(e.target.value);
                setFilterData(updatedFilterData);
            }} placeholder={"end " + filter.label} />
        </>
    );

    const FilterDateRenderer = FilterNumberRenderer;
    const FilterCurrencyRenderer = FilterNumberRenderer;

    const FilterSelectRenderer = (filter: DataGridFilterColumn) => {
        if (!selectRefs.current[filter.index]) {
            selectRefs.current[filter.index] = React.createRef();
        }
        const selectRef = selectRefs.current[filter.index];

        useEffect(() => {
            if (filter.select2 && selectRef.current && (filter.options || maps[filter.index])) {
                const $select = $(selectRef.current);

                $select.select2({
                    theme: 'bootstrap-5',
                    placeholder: 'Chọn ' + filter.label,
                    allowClear: true,
                });

                $select.on('change', function () {
                    const selectedValues = $select.val();
                    const updatedItem = { ...filterData };
                    updatedItem[filter.index] = typeof selectedValues === 'string' ? selectedValues : (selectedValues as string[])[0] ?? '';
                    setFilterData(updatedItem);
                });

                return () => {
                    $select.select2('destroy');
                };
            }
        }, [filter, filterData, maps[filter.index], filter.options]);

        if (filter.options) {
            return (
                <Form.Select ref={selectRef} size="sm" value={filterData?.[filter.index] || ''} onChange={(e) => {
                    const updatedFilterData = { ...filterData };
                    updatedFilterData[filter.index] = e.target.value;
                    setFilterData(updatedFilterData);
                }}>
                    <option value="">Chọn {filter.label}</option>
                    {filter.options.map((option, index) => (
                        <option key={index} value={option.value}>{option.label}</option>
                    ))}
                </Form.Select>
            );
        } else if (filter.table && Array.isArray(maps[filter.index])) {
            return (
                <Form.Select ref={selectRef} size="sm" value={filterData[filter.index] ?? ''} onChange={(e) => {
                    const updatedFilterData = { ...filterData };
                    updatedFilterData[filter.index] = e.target.value;
                    setFilterData(updatedFilterData);
                }}>
                    <option value="">Chọn {filter.label}</option>
                    {maps[filter.index].map((option: any) => (
                        <option key={option[filter.valueField as string]} value={option[filter.valueField as string]}>
                            {filter.treeMode ? '|____'.repeat(option.__level + 1) : ''}
                            #{option[filter.valueField as string]} - {option[filter.labelField as string]}
                        </option>
                    ))}
                </Form.Select>
            );
        } else {
            return '-';
        }
    };

    const FilterCheckboxRenderer = (filter: DataGridFilterColumn) => (
        <Form.Check type="checkbox" checked={filterData?.[filter.index] || false} onChange={(e) => {
            const updatedFilterData = { ...filterData };
            updatedFilterData[filter.index] = e.target.checked;
            setFilterData(updatedFilterData);
        }} />
    );

    const FilterStatusRenderer = (filter: DataGridFilterColumn) => (
        <Form.Select size="sm" value={filterData?.[filter.index] || ''} onChange={(e) => {
            const updatedFilterData = { ...filterData };
            updatedFilterData[filter.index] = e.target.value;
            setFilterData(updatedFilterData);
        }}>
            <option value="">Chọn {filter.label}</option>
            <option value={1}>{filter?.map ? filter?.map[1] : 'Active'}</option>
            <option value={0}>{filter?.map ? filter?.map[0] : 'Inactive'}</option>
        </Form.Select>
    );

    const FilterUndefinedRenderer = () => '-';

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
    };

    const renderFilter = (filter: DataGridFilterColumn): any => {
        const renderer = getFilterRenderer(filter.type ?? DataGridFilterColumnType.TEXT);
        return renderer(filter);
    };

    const [maps, setMaps] = useState<{ [key: string]: any }>(filterData);
    const router = useRouter();

    useEffect(() => {
        const updatedMaps = { ...maps };
        filters.forEach(filter => {
            if (filter.type === DataGridFilterColumnType.SELECT && filter.table) {
                let condition = typeof filter.tableCondition === 'function'
                    ? filter.tableCondition(filterData)
                    : filter.tableCondition;

                const fields = [filter.valueField, filter.labelField];
                if (filter.treeMode) fields.push(filter.treeParentField ?? 'parent');

                const data: any = {
                    fields,
                    condition,
                    orderBy: filter.orderBy ?? (filter.treeMode ? 'ordering asc' : 'id asc')
                };

                tableRepository.getItemsForSelect(filter.table, data).then((response: any) => {
                    let items: any[] = response.data;
                    if (filter.treeMode) {
                        items = flatTree(buildTree(items, filter.treeParentField ?? 'parent'));
                    }
                    updatedMaps[filter.index] = items;
                });
            }
        });
        setTimeout(() => setMaps(updatedMaps), 200);
    }, [filterData]);

    return <Form className="row g-1">
        <Form.Group controlId="formGroupSearch" className="mb-1 col-md-2">
            <Form.Control value={searchText} onChange={(e) => setSearchText(e.target.value)} size="sm" type="text" placeholder={`Từ khóa`} />
        </Form.Group>
        {filters.map(filter => (
            <Form.Group controlId={"formGroup" + filter.index} key={filter.index} className={"mb-1 col-md-" + (filter.size ?? 2)}>
                {renderFilter(filter)}
            </Form.Group>
        ))}
        {sortOptions && (
            <Form.Group controlId="formGroupSort" key="formGroupSort" className="mb-1 col-md-2">
                <Form.Select value={sortOptionSelected} size="sm" onChange={(e) => {
                    setSortOptionSelected(e.target.value);
                    const selectedOption = sortOptions.find(option => option.index === e.target.value);
                    setSorts(selectedOption ? selectedOption.sorts : (defaultSorts ?? []));
                }}>
                    <option value="">Chọn sắp xếp</option>
                    {sortOptions.map(option => (
                        <option key={option.index} value={option.index}>{option.label}</option>
                    ))}
                </Form.Select>
            </Form.Group>
        )}
    </Form>;
};
