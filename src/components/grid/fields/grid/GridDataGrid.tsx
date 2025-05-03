import { Card, Col, Container, Form, Row, Table } from "react-bootstrap";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

import {
    DataGridColumn as Column, DataGridFilterColumn,
    DataGridPagination,
    DataGridSort,
    DataGridSortOption
} from "../../DataGridColumnTypes";
import { FiltersGridCard } from "../../filters/FilterGridCard";
import { DataGridHead } from "../../header/DataGridHead";
import { PaginationGrid } from "../../PaginationGrid";
import { renderColumn } from "../../columns/renderColumn";
import { TableGridSettings } from "../../TableGrid";

interface GridDataGridProps {
    title: string;
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

const GridDataGrid: React.FC<GridDataGridProps> = ({ title, table, software, site, columns = [], filters = [], defaultSorts, sortOptions, items = [], pagination, setCurrentPage, setPageSize, searchText, setSearchText, filterData, setFilterData, sorts, setSorts, totalItems, onDeleteItem, isCheckedAll, setIsCheckedAll, checkedItemIds, setCheckedItemIds, addNewLabel, deleteSelectedsLabel, onAfterChangeStatus, onAfterSaveInputableColumn, defaultFilters, parentController, parentSettings, parentItem, sortData, setSortData }) => {
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
    const handleEditItem = (item: any) => {  }

    const handleAddChildItem = (item: any, column: Column) => {
        
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
                        <Card.Title className="d-flex justify-content-between align-items-center">
                            {/* Title on the left */}
                            <span>{title}</span>
                        </Card.Title>

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
                    </Card.Body>
                </Card>
            </Col>
        </Row>
    </Container>
}

export default GridDataGrid;
