import { Card, Col, Container, Form, Row, Table } from "react-bootstrap";
import { PaginationGrid } from "./PaginationGrid";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

import {
    DataGridColumn as Column, DataGridFilterColumn,
    DataGridMessage,
    DataGridPagination,
    DataGridSort,
    DataGridSortOption
} from "./DataGridColumnTypes";
import { FiltersGridCard } from "./filters/FilterGridCard";
import { DataGridMessages } from "./messages/DataGridMessages";
import { DataGridTitle } from "./title/DataGridTitle";
import { DataGridBottomToolbar } from "./bottom/DataGridBottomToolbar";
import { DataGridHead } from "./header/DataGridHead";
import { renderColumn } from "./columns/renderColumn";
import { TableGridSettings } from "./TableGrid";

interface DataGridProps {
    title: string;
    controller: string;
    table: string;
    software?: number;
    site?: number;
    columns: Column[];
    items: any[];
    totalItems: number;
    filters?: DataGridFilterColumn[];
    defaultSorts?: DataGridSort[];
    sortOptions?: DataGridSortOption[];
    pagination?: DataGridPagination;
    sorts: DataGridSort[];
    setSorts: (sorts: DataGridSort[]) => void;
    searchText?: string;
    setSearchText: (searchText: string) => void;
    filterData?: any;
    setFilterData: (filterData: any) => void;
    setCurrentPage: (page: number) => void;
    setPageSize: (pageSize: number) => void;
    onDeleteItem: (item: any) => void;
    onAfterChangeStatus: (column: Column, item: any) => void;
    onAfterSaveInputableColumn: (column: Column) => void;
    messages: DataGridMessage[];
    setMessages: (messages: DataGridMessage[]) => void;
    isCheckedAll: boolean;
    setIsCheckedAll: (isCheckedAll: boolean) => void;
    checkedItemIds: number[];
    setCheckedItemIds: (checkedItemIds: number[]) => void;
    addNewLabel?: string;
    deleteSelectedsLabel?: string;
    defaultFilters?: any;
    parentController?: string;
    parentSettings?: TableGridSettings;
    parentItem?: any;
    sortData: any;
    setSortData: (sortData: any) => void;
}

const DataGrid: React.FC<DataGridProps> = ({ title, controller, table, software, site, columns = [], filters = [], defaultSorts, sortOptions, items = [], pagination, setCurrentPage, setPageSize, searchText, setSearchText, filterData, setFilterData, sorts, setSorts, totalItems, onDeleteItem, messages, setMessages, isCheckedAll, setIsCheckedAll, checkedItemIds, setCheckedItemIds, addNewLabel, deleteSelectedsLabel, onAfterChangeStatus, onAfterSaveInputableColumn, defaultFilters, parentController, parentSettings, parentItem, sortData, setSortData }) => {
    const router = useRouter();
    // Function to handle navigation
    const handleNavigation = (path: string) => {
        if (parentController) {
            if (path.includes('?')) {
                path += `&backHref=/Table/${parentController}/${parentItem.id}/detail`;
            } else {
                path += `?backHref=/Table/${parentController}/${parentItem.id}/detail`;
            }
        } 
        router.push(path); 
    };
    const handleEditItem = (item: any) => { handleNavigation(`/Table/${controller}/${item.id}/edit`); }

    const handleAddChildItem = (item: any, column: Column) => {
        let addChildLink = `/Table/${column.actionAddChildController ?? controller}/add?field_` + (column.actionAddChildParentField ?? 'parent') + `=` + item.id;
        if (column.actionAddChildParentFields) {
            column.actionAddChildParentFields.forEach(field => {
                if (typeof item[field] === 'object' && typeof item[field][0] === 'object') {
                    addChildLink += '&field_' + field + '=' + item[field][0].id;
                } else {
                    addChildLink += '&field_' + field + '=' + item[field];
                }
            });
        }
        handleNavigation(addChildLink);
    }

    const [inputableMap, setInputableMap] = useState<any>({});

    useEffect(() => {
        let updatedInputableMap: any = {};
        items.forEach((item) => {
            updatedInputableMap[item.id] = {};
            columns.forEach((column) => {
                if (column.inputable) {
                    updatedInputableMap[item.id][column.index] = item[column.index];
                }
            });
        });
        setInputableMap(updatedInputableMap);
    }, [items]);


    const toggleCheckedItem = (id: number) => {
        if (checkedItemIds.indexOf(id) === -1) {
            checkedItemIds.push(id);
            setCheckedItemIds([...checkedItemIds]);
        } else {
            checkedItemIds.splice(checkedItemIds.indexOf(id), 1);
            setCheckedItemIds([...checkedItemIds]);
        }
    }

    return <Container fluid className="mb-0 mt-0">
        <Row className="g-0">
            <Col sm={12} md={3} lg={12}>
                <FiltersGridCard filters={filters} sortOptions={sortOptions} filterData={filterData} setFilterData={setFilterData} searchText={searchText} setSearchText={setSearchText} sorts={sorts} setSorts={setSorts} defaultSorts={defaultSorts} />
            </Col>
            <Col sm={12} md={9} lg={12}>
                <Card className="border-0">
                    <Card.Body className="border-0 pt-0">
                        <DataGridTitle controller={controller} title={title} addNewLabel={addNewLabel} deleteSelectedsLabel={deleteSelectedsLabel} parentController={parentController}
                        parentSettings={parentSettings} parentItem={parentItem} />
                        <DataGridMessages messages={messages} setMessages={setMessages} />
                        <div className="table-responsive">
                            <Table size="sm" striped hover>
                                <thead>
                                    <tr>
                                        <DataGridHead table={table} columns={columns} items={items} isCheckedAll={isCheckedAll} setIsCheckedAll={setIsCheckedAll} checkedItemIds={checkedItemIds} setCheckedItemIds={setCheckedItemIds} inputableMap={inputableMap} setInputableMap={setInputableMap} onAfterSaveInputableColumn={onAfterSaveInputableColumn} defaultFilters={defaultFilters} sortData={sortData} setSortData={setSortData} />
                                    </tr>
                                    <tr>
                                        <td colSpan={columns.length + 1}>
                                            <PaginationGrid totalItems={totalItems} setCurrentPage={setCurrentPage} setPageSize={setPageSize} pagination={pagination} />
                                        </td>
                                    </tr>
                                </thead>
                                <tbody>
                                    {items.length ? items.map((item, index) =>
                                        <tr key={index} onClick={() => toggleCheckedItem(item.id)} className={checkedItemIds.indexOf(item.id) !== -1 ? "table-success" : ""} style={{ "cursor": "pointer" }}>
                                            <td style={{ width: "1%" }}>
                                                <Form.Check type="checkbox" checked={checkedItemIds.indexOf(item.id) !== -1} onChange={() => toggleCheckedItem(item.id)} />
                                            </td>
                                            {columns.filter((column) => typeof defaultFilters == 'undefined' || typeof defaultFilters[column.index] == 'undefined').map(column => (
                                                <td key={column.index} style={{ width: column.width, whiteSpace: (column.inputable) ? 'nowrap' : 'normal' }}>
                                                    {renderColumn(column, item, table, inputableMap, setInputableMap, onAfterChangeStatus, handleEditItem, onDeleteItem, handleAddChildItem)}
                                                </td>
                                            ))}
                                        </tr>)
                                        : <tr>
                                            <td colSpan={columns.length + 1} className="text-center">No data available.</td>
                                        </tr>}
                                </tbody>
                                <tfoot>
                                    <tr>
                                        <td colSpan={columns.length + 1}>
                                            <PaginationGrid totalItems={totalItems} setCurrentPage={setCurrentPage} setPageSize={setPageSize} pagination={pagination} />
                                        </td>
                                    </tr>
                                </tfoot>
                            </Table>
                        </div>
                        <DataGridBottomToolbar addNewLabel={addNewLabel} controller={controller} deleteSelectedsLabel={deleteSelectedsLabel} />
                    </Card.Body>
                </Card>
            </Col>
        </Row>
    </Container>
}

export default DataGrid;
