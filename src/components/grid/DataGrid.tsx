import { Card, Col, Container, Form, Row, Table } from "react-bootstrap";
import { PaginationGrid } from "./PaginationGrid";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

import { DataGridMessage } from "@/types/grid/DataGridMessage";
import { DataGridPagination } from "@/types/grid/DataGridPagination";
import { DataGridSortOption } from "@/types/grid/DataGridSortOption";
import { DataGridSort } from "@/types/grid/DataGridSort";
import { DataGridFilterColumn } from "@/types/grid/DataGridFilterColumn";
import { DataGridColumn as Column } from "@/types/grid/DataGridColumn";
import { FiltersGridCard } from "./filters/FilterGridCard";
import { DataGridMessages } from "./messages/DataGridMessages";
import { DataGridTitle } from "./title/DataGridTitle";
import { DataGridBottomToolbar } from "./bottom/DataGridBottomToolbar";
import { DataGridHead } from "./header/DataGridHead";
import { renderColumn } from "@/types/grid/columns/renderColumn";
import { TableGridSettings } from "@/types/TableGridSettings";

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
        window.location.href = (path);
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

    const [bulkAction, setBulkAction] = useState<string>("");

    const handleApplyBulkAction = () => {
        if (!bulkAction || checkedItemIds.length === 0) return;

        if (bulkAction === "delete") {
            if (!confirm("Bạn có chắc chắn muốn xoá các mục đã chọn không?")) return;
            checkedItemIds.forEach(id => {
                const item = items.find(i => i.id === id);
                if (item) onDeleteItem(item);
            });
        }

        if (bulkAction === "publish" || bulkAction === "unpublish") {
            const publishValue = bulkAction === "publish" ? 1 : 0;
            const statusColumn = columns.find(col => col.index === "published" || col.index === "status");

            if (statusColumn) {
                checkedItemIds.forEach(id => {
                    const item = items.find(i => i.id === id);
                    if (item) {
                        item[statusColumn.index] = publishValue;
                        onAfterChangeStatus(statusColumn, item);
                    }
                });
            }
        }

        setCheckedItemIds([]);
        setBulkAction("");
    };

    return <Container fluid className="mb-0 mt-0">
        <Row className="g-0">
            <Col sm={12} md={12} lg={12}>
                <FiltersGridCard filters={filters} sortOptions={sortOptions} filterData={filterData} setFilterData={setFilterData} searchText={searchText} setSearchText={setSearchText} sorts={sorts} setSorts={setSorts} defaultSorts={defaultSorts} />
            </Col>
            <Col sm={12} md={12} lg={12}>
                <Card className="border-0">
                    <Card.Body className="border-0 pt-0">
                        <DataGridTitle controller={controller} title={title} addNewLabel={addNewLabel} deleteSelectedsLabel={deleteSelectedsLabel} parentController={parentController}
                            parentSettings={parentSettings} parentItem={parentItem} defaultFilters={defaultFilters} />
                        <Form className="d-flex align-items-center gap-2 mb-2 d-none">
                            <Form.Select size="sm" value={bulkAction} onChange={(e) => setBulkAction(e.target.value)} style={{ maxWidth: '200px' }}>
                                <option value="">-- Chọn hành động --</option>
                                <option value="delete">Xoá</option>
                                <option value="publish">Đăng</option>
                                <option value="unpublish">Gỡ đăng</option>
                            </Form.Select>
                            <button
                                type="button"
                                className="btn btn-sm btn-primary"
                                onClick={handleApplyBulkAction}
                                disabled={!bulkAction || checkedItemIds.length === 0}
                            >
                                Áp dụng
                            </button>
                        </Form>
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
                                                <td key={column.index} style={{ width: column.width, whiteSpace: (column.inputable) ? 'nowrap' : 'normal', wordBreak: 'break-all' }}>
                                                    <div style={{ width: column.width ? (column.width == '1%' ? 'auto' : column.width) : 'auto', whiteSpace: (column.inputable) ? 'nowrap' : (column.width && column.width == '1%' ? 'nowrap' : 'normal'), wordBreak: 'break-all' }}>
                                                        {renderColumn(column, item, table, inputableMap, setInputableMap, onAfterChangeStatus, handleEditItem, onDeleteItem, handleAddChildItem)}
                                                    </div>
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
