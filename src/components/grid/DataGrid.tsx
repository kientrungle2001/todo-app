import { Button, Card, Col, Container, Form, Row, Table } from "react-bootstrap";
import { PaginationGrid } from "./PaginationGrid";
import { useRouter } from "next/router";
import Link from "next/link";
import React, { useEffect, useState } from "react";

import { ColumnTextRenderer } from "./columns/ColumnTextRenderer";
import { ColumnNumberRenderer } from "./columns/ColumnNumberRenderer";
import { ColumnImageRenderer } from "./columns/ColumnImageRenderer";
import { ColumnCurrencyRenderer } from "./columns/ColumnCurrencyRenderer";
import { ColumnDateRenderer } from "./columns/ColumnDateRenderer";
import { ColumnStatusRenderer } from "./columns/ColumnStatusRenderer";
import { ColumnReferenceRenderer } from "./columns/ColumnReferenceRenderer";
import { DataGridColumn, DataGridColumnActionType, DataGridColumnType, DataGridFilterColumn, DataGridMessage, DataGridPagination, DataGridSort, DataGridSortOption } from "./DataGridColumnTypes";
import { FiltersGridCard } from "./filters/FilterGridCard";
import { DataGridMessages } from "./messages/DataGridMessages";
import { DataGridTitle } from "./title/DataGridTitle";
import { DataGridBottomToolbar } from "./bottom/DataGridBottomToolbar";
import { DataGridHead } from "./header/DataGridHead";

interface DataGridProps {
    title: string;
    controller: string;
    table: string;
    software?: number;
    site?: number;
    columns: DataGridColumn[];
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
    onAfterChangeStatus: (column: DataGridColumn, item: any) => void;
    onAfterSaveInputableColumn: (column: DataGridColumn) => void;
    messages: DataGridMessage[];
    setMessages: (messages: DataGridMessage[]) => void;
    isCheckedAll: boolean;
    setIsCheckedAll: (isCheckedAll: boolean) => void;
    checkedItemIds: number[];
    setCheckedItemIds: (checkedItemIds: number[]) => void;
    addNewLabel?: string;
    deleteSelectedsLabel?: string;
}

const DataGrid: React.FC<DataGridProps> = ({ title, controller, table, software, site, columns = [], filters = [], defaultSorts, sortOptions, items = [], pagination, setCurrentPage, setPageSize, searchText, setSearchText, filterData, setFilterData, sorts, setSorts, totalItems, onDeleteItem, messages, setMessages, isCheckedAll, setIsCheckedAll, checkedItemIds, setCheckedItemIds, addNewLabel, deleteSelectedsLabel, onAfterChangeStatus, onAfterSaveInputableColumn }) => {
    const router = useRouter();
    // Function to handle navigation
    const handleNavigation = (path: string) => { router.push(path); };
    const handleEditItem = (item: any) => { handleNavigation(`/Table/${controller}/${item.id}/edit`); }

    const handleAddChildItem = (item: any, column: DataGridColumn) => {
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

    const ColumnActionsRenderer = (column: DataGridColumn, item: any) => {
        if (column.customFormat) {
            return column.customFormat ? column.customFormat(null, item, table) : '-';
        } else {
            if (column.actionType === DataGridColumnActionType.EDIT) {
                return <Button variant="primary" size="sm" onClick={() => handleEditItem(item)}>
                    {column.label}
                </Button>
            } else if (column.actionType === DataGridColumnActionType.DELETE) {
                return <Button variant="danger" size="sm" onClick={() => onDeleteItem(item)}>
                    {column.label}
                </Button>
            } else if (column.actionType === DataGridColumnActionType.ADD_CHILD) {
                return <Button variant="secondary" size="sm" onClick={() => handleAddChildItem(item, column)}>
                    {column.label}
                </Button>
            }
        }
    };

    const ColumnUndefinedRenderer = () => {
        return '-';
    }

    const ColumnGroupRenderer = (column: DataGridColumn, item: any, table: string,
        inputableMap: any, setInputableMap: (inputableMap: any) => void,
        onAfterChangeStatus: (column: DataGridColumn, item: any) => void) => {
        return column.groupChildren?.map((childColumn: DataGridColumn, index) => {
            return <React.Fragment key={index}>
                {index > 0 && <br />} <strong>{childColumn.label}: </strong> {renderColumn(childColumn, item)}
            </React.Fragment>
        });
    };

    const getColumnRenderer = (columnType: DataGridColumnType) => {
        switch (columnType) {
            case DataGridColumnType.TEXT:
                return ColumnTextRenderer;
            case DataGridColumnType.NUMBER:
                return ColumnNumberRenderer;
            case DataGridColumnType.IMAGE:
                return ColumnImageRenderer;
            case DataGridColumnType.CURRENCY:
                return ColumnCurrencyRenderer;
            case DataGridColumnType.DATE:
                return ColumnDateRenderer;
            case DataGridColumnType.REFERENCE:
                return ColumnReferenceRenderer;
            case DataGridColumnType.GROUP:
                return ColumnGroupRenderer;
            case DataGridColumnType.STATUS:
                return ColumnStatusRenderer;
            case DataGridColumnType.ACTIONS:
                return ColumnActionsRenderer;
            default:
                return ColumnUndefinedRenderer;
        }
    };

    const renderColumn = (column: DataGridColumn, item: any) => {
        const columnRenderer = getColumnRenderer(column.type ?? DataGridColumnType.TEXT);
        if (column.linkFormat) {
            return <Link style={{ textDecoration: "none" }} href={column.linkFormat(item[column.index], item)}>{columnRenderer(column, item, table, inputableMap, setInputableMap, onAfterChangeStatus)}</Link>;
        }
        return columnRenderer(column, item, table, inputableMap, setInputableMap, onAfterChangeStatus);
    };

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
                        <DataGridTitle controller={controller} title={title} addNewLabel={addNewLabel} deleteSelectedsLabel={deleteSelectedsLabel} />
                        <DataGridMessages messages={messages} setMessages={setMessages} />
                        <div className="table-responsive">
                            <Table size="sm" striped hover>
                                <thead>
                                    <tr>
                                        <DataGridHead table={table} columns={columns} items={items} isCheckedAll={isCheckedAll} setIsCheckedAll={setIsCheckedAll} checkedItemIds={checkedItemIds} setCheckedItemIds={setCheckedItemIds} inputableMap={inputableMap} setInputableMap={setInputableMap} onAfterSaveInputableColumn={onAfterSaveInputableColumn} />
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
                                            {columns.map(column => (
                                                <td key={column.index} style={{ width: column.width, whiteSpace: (column.inputable) ? 'nowrap' : 'normal' }}>
                                                    {renderColumn(column, item)}
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
