import { Card, Col, Container, Row, Table } from "react-bootstrap";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

import {
    DataGridColumn as Column, DataGridFilterColumn,
    DataGridPagination,
    DataGridSort,
    DataGridSortOption
} from "../../DataGridColumnTypes";
import { FiltersGridCard } from "../../filters/FilterGridCard";
import { PaginationGrid } from "../../PaginationGrid";
import { renderColumn } from "../../columns/renderColumn";
import { GridDataGridHead } from "./GridDataGridHead";

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
    sortData: any;
    setSortData: (sortData: any) => void;
    selectedItem: any;
    setSelectedItem: (selectedItem: any) => void;
}

const GridDataGrid: React.FC<GridDataGridProps> = ({ title, table, software, site, columns = [], filters = [], defaultSorts, sortOptions, items = [], pagination, setCurrentPage, setPageSize, searchText, setSearchText, filterData, setFilterData, sorts, setSorts, totalItems, sortData, setSortData, selectedItem, setSelectedItem }) => {

    const toggleCheckedItem = (item: any) => {
        if (selectedItem === item) {
            setSelectedItem(null);
        } else {
            setSelectedItem(item);
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
                                        <GridDataGridHead table={table} columns={columns} sortData={sortData} setSortData={setSortData} />
                                    </tr>
                                    <tr>
                                        <td colSpan={columns.length + 1}>
                                            <PaginationGrid totalItems={totalItems} setCurrentPage={setCurrentPage} setPageSize={setPageSize} pagination={pagination} />
                                        </td>
                                    </tr>
                                </thead>
                                <tbody>
                                    {items.length ? items.map((item, index) =>
                                        <tr key={index} onClick={() => toggleCheckedItem(item)} style={{ "cursor": "pointer" }}
                                            className={selectedItem === item ? 'table-primary' : ''}>

                                            {columns.map(column => (
                                                <td key={column.index} style={{ width: column.width, whiteSpace: (column.inputable) ? 'nowrap' : 'normal' }}>
                                                    {renderColumn(column, item, table, {}, () => { }, () => { }, () => { }, () => { }, () => { })}
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
