import { Alert, Button, Card, Col, Container, Form, Row, Table } from "react-bootstrap";
import { PaginationGrid } from "./PaginationGrid";
import { FiltersGrid } from "./FiltersGrid";
import { useRouter } from "next/router";
import { getAxios } from "@/api/axiosInstance";
import { ButtonVariant } from "react-bootstrap/esm/types";
import Link from "next/link";
import React, { useEffect, useState } from "react";

import { storage } from "@/api/storage";
import { ColumnTextRenderer } from "./DataGridColumnRenderer/ColumnTextRenderer";
import { ColumnNumberRenderer } from "./DataGridColumnRenderer/ColumnNumberRenderer";
import { ColumnImageRenderer } from "./DataGridColumnRenderer/ColumnImageRenderer";
import { ColumnCurrencyRenderer } from "./DataGridColumnRenderer/ColumnCurrencyRenderer";
import { ColumnDateRenderer } from "./DataGridColumnRenderer/ColumnDateRenderer";
import { ColumnStatusRenderer } from "./DataGridColumnRenderer/ColumnStatusRenderer";
import { ColumnReferenceRenderer } from "./DataGridColumnRenderer/ColumnReferenceRenderer";

export enum DataGridColumnType {
    TEXT = "text",
    NUMBER = "number",
    IMAGE = "image",
    DATE = "date",
    CURRENCY = "currency",
    STATUS = "status",
    WORKFLOW = "workflow",
    REFERENCE = "reference",
    GROUP = "group",
    ACTIONS = "actions"
}

export enum DataGridFilterColumnType {
    TEXT = "text",
    NUMBER = "number",
    DATE = "date",
    CURRENCY = "currency",
    SELECT = "select",
    CHECKBOX = "checkbox",
    STATUS = "status",
}

export enum DataGridColumnActionType {
    EDIT = "edit",
    DELETE = "delete",
    ADD_CHILD = "add_child"
}

export interface DataGridTableJoin {
    table: string;
    alias?: string;
    type?: "inner" | "left" | "right";
    condition?: string;
}

export interface DataGridWorkflowState {
    state: string | number;
    label: string;
    actions?: DataGridWorkflowAction[];
}

export interface DataGridWorkflowAction {
    label: string;
    newState: string | number; // new state to transition to
}

export interface DataGridColumn {
    index: string;
    label: string;
    type?: DataGridColumnType;
    treeMode?: boolean;
    multiple?: boolean;
    inputable?: boolean;
    statusToggable?: boolean;
    format?: string;
    customFormat?: (value: any, item: any, table: string) => string | React.ReactNode;
    options?: any[];
    linkFormat?: (value: any, item: any) => string;
    sortable?: boolean;
    actionType?: DataGridColumnActionType;
    actionLinkFormat?: (item: any, column: DataGridColumn, controller: string) => string | React.ReactNode,
    actionAddChildParentField?: string,
    actionAddChildParentFields?: string[],
    actionAddChildController?: string,
    width?: string;
    map?: any;
    workflow?: DataGridWorkflowState[];
    hideLabel?: boolean;
    isHtml?: boolean;
    groupSeparator?: string;
    groupChildren?: DataGridColumn[];
    referenceTable?: string;
    referenceField?: string;
}

export interface DataGridFilterColumn {
    index: string;
    label: string;
    sqlIndex?: string;
    comparisonOperator?: "like" | "equal" | "inset";
    type?: DataGridFilterColumnType;
    table?: string;
    valueField?: string;
    labelField?: string;
    treeMode?: boolean;
    treeParentField?: string;
    orderBy?: string;
    format?: string;
    customFormat?: (value: any, item: any) => string | React.ReactNode;
    options?: any[];
    map?: any;
    select2?: boolean;
}

// declare map 

export const DataGridFilterColumns: { [key: string]: DataGridFilterColumn } = {
    status: {
        index: "status", label: "Trạng thái", type: DataGridFilterColumnType.STATUS, map: {
            0: 'Chưa kích hoạt',
            1: 'Đã kích hoạt'
        },
        comparisonOperator: "equal"
    },
    id: { index: "id", label: "ID", type: DataGridFilterColumnType.TEXT },
    trial: {
        index: "trial",
        label: "Dùng thử",
        type: DataGridFilterColumnType.STATUS,
        map: {
            0: 'Chưa kích hoạt',
            1: 'Đã kích hoạt'
        },
        comparisonOperator: "equal"
    },
    categoryId: {
        index: "categoryId", label: "Danh mục", type: DataGridFilterColumnType.SELECT,
        table: "categories",
        valueField: "id",
        labelField: "name",
        select2: true,
        comparisonOperator: "equal",
        treeMode: true,
    },
    categoryIds: {
        index: "categoryIds", label: "Danh mục", type: DataGridFilterColumnType.SELECT,
        table: "categories",
        valueField: "id",
        labelField: "name",
        select2: true,
        comparisonOperator: "inset",
        treeMode: true,
    },
    testId: {
        index: "testId", label: "Đề thi", type: DataGridFilterColumnType.SELECT,
        table: "tests",
        valueField: "id",
        labelField: "name",
        select2: true,
        comparisonOperator: "inset",
        treeMode: true,
    },
    courseId: {
        index: "courseId", label: "Khóa học", type: DataGridFilterColumnType.SELECT,
        table: "courses",
        valueField: "id",
        labelField: "name",
        select2: true,
        comparisonOperator: "equal",
        treeMode: false,
    },
    courseResourceId: {
        index: "courseResourceId", label: "Tài nguyên Khóa học", type: DataGridFilterColumnType.SELECT,
        table: "courses_resources",
        valueField: "id",
        labelField: "name",
        select2: true,
        comparisonOperator: "equal",
        treeMode: true,
    },
};

export interface DataGridSort {
    index: string;
    direction: DataGridSortDirection;
}

export enum DataGridSortDirection {
    ASCENDING = "asc",
    DESCENDING = "desc"
}

export interface DataGridSortOption {
    index: string;
    label: string;
    sorts: DataGridSort[];
}

export const DataGridSortOptions: { [key: string]: DataGridSortOption } = {
    idAsc: {
        index: "idAsc",
        label: "ID tăng",
        sorts: [{ index: "id", direction: DataGridSortDirection.ASCENDING },]
    },
    idDesc: {
        index: "idDesc",
        label: "ID giảm",
        sorts: [{ index: "id", direction: DataGridSortDirection.DESCENDING },]
    },
    orderingAsc: {
        index: "orderingAsc",
        label: "Thứ tự tăng",
        sorts: [
            { index: "ordering", direction: DataGridSortDirection.ASCENDING },
            { index: "id", direction: DataGridSortDirection.DESCENDING },
        ],
    },
    orderingDesc: {
        index: "orderingDesc",
        label: "Thứ tự giảm",
        sorts: [
            { index: "ordering", direction: DataGridSortDirection.DESCENDING },
            { index: "id", direction: DataGridSortDirection.ASCENDING },
        ],
    },
};

export interface DataGridPagination {
    currentPage: number;
    pageSize: number;
}

export interface DataGridMessage {
    label: string;
    variant: ButtonVariant;
}

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
    onAfterDelete: (item: any) => void;
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

const DataGrid: React.FC<DataGridProps> = ({ title, controller, table, software, site, columns = [], filters = [], defaultSorts, sortOptions, items = [], pagination, setCurrentPage, setPageSize, searchText, setSearchText, filterData, setFilterData, sorts, setSorts, totalItems, onAfterDelete, messages, setMessages, isCheckedAll, setIsCheckedAll, checkedItemIds, setCheckedItemIds, addNewLabel, deleteSelectedsLabel, onAfterChangeStatus, onAfterSaveInputableColumn }) => {
    const router = useRouter();
    // Function to handle navigation
    const handleNavigation = (path: string) => {
        router.push(path);
    };
    const handleEditItem = (item: any) => {
        handleNavigation(`/Table/${controller}/${item.id}/edit`);
    }

    const handleAddItem = () => {
        handleNavigation(`/Table/${controller}/add`);
    }

    const handleDeleteItem = (item: any) => {
        // Implement your delete logic here
        if (window.confirm(`Are you sure you want to delete item with ID: ${item.id}?`)) {
            console.log(`Deleting item with ID: ${item.id}`);
            getAxios(window.location.hostname).delete(`/tables/${table}/delete/${item.id}`, {
                headers: {
                    'Authorization': `Bearer ${storage.get('token') || ''}`
                }
            }).then(() => {
                onAfterDelete(item);
            }).catch((error: any) => {
                if (error.response && error.response.status === 401 && error.response.data.error === 'Invalid token') {
                    storage.clearTokenInfo();
                    router.push('/login');
                }
            });
        }
    };

    const handleAddChildItem = (item: any, column: DataGridColumn) => {
        let addChildLink = `/Table/${column.actionAddChildController ?? controller}/add?field_`+(column.actionAddChildParentField ?? 'parent')+`=` + item.id;
        if (column.actionAddChildParentFields) {
            column.actionAddChildParentFields.forEach(field => {
                console.log('item[field]', item[field]);
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
                return <Button variant="danger" size="sm" onClick={() => handleDeleteItem(item)}>
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

    const handleResetFilter = () => {
        setFilterData({});
        setSearchText('');
    };

    const handleCloseMessage = (message: DataGridMessage, index: number) => {
        let updatedMessages: DataGridMessage[] = [...messages];
        updatedMessages.splice(index, 1);
        setMessages(updatedMessages);
    };

    const handleCheckAll = (event: React.ChangeEvent<HTMLInputElement>) => {
        let checked = event.target.checked;
        setIsCheckedAll(checked);
        if (checked === false) {
            setCheckedItemIds([]);
        } else {
            setCheckedItemIds(items.map(item => item.id));
        }
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

    const handleSaveInputableColumn = (column: DataGridColumn) => {
        let values: any[] = [];
        for (let itemId in inputableMap) {
            let inputableItem = inputableMap[itemId];
            values.push({
                id: itemId,
                value: inputableItem[column.index]
            });
        }
        getAxios(window.location.hostname).put(`/tables/${table}/update-column`, { column: column, values }, {
            headers: {
                'Authorization': `Bearer ${storage.get('token') || ''}`
            }
        }).then(() => {
            onAfterSaveInputableColumn(column);
        }).catch((error: any) => {
            if (error.response && error.response.status === 401 && error.response.data.error === 'Invalid token') {
                storage.clearTokenInfo();
                router.push('/login');
            }
        });;
    }

    return (
        <>

            <Container fluid className="mb-3 mt-3">
                <Row className="g-2">
                    <Col sm={12} md={3} lg={12}>
                        <Card className="border-0">
                            <Card.Body className="border-0">
                                <Card.Title className="d-flex justify-content-between align-items-center">
                                    <span>Bộ lọc</span>
                                    <div>
                                        <Button size="sm" variant="danger" onClick={handleResetFilter}>Reset</Button>
                                    </div>
                                </Card.Title>
                                <FiltersGrid filters={filters} sortOptions={sortOptions} filterData={filterData} setFilterData={setFilterData} searchText={searchText} setSearchText={setSearchText} sorts={sorts} setSorts={setSorts} defaultSorts={defaultSorts} />
                            </Card.Body>
                        </Card>

                    </Col>
                    <Col sm={12} md={9} lg={12}>
                        <Card className="border-0">

                            <Card.Body className="border-0">
                                <Card.Title className="d-flex justify-content-between align-items-center">
                                    {/* Title on the left */}
                                    <span>{title}</span>

                                    {/* Buttons on the right */}
                                    <div>
                                        {/* Button as a link */}
                                        <Button size="sm" variant="primary" className="me-2" onClick={handleAddItem}>{addNewLabel ?? 'Add New'}</Button>
                                        {/* Regular Button */}
                                        <Button size="sm" variant="danger">{deleteSelectedsLabel ?? 'Delete Selecteds'}</Button>
                                    </div>
                                </Card.Title>
                                {
                                    messages.map((message: DataGridMessage, index: number) => {
                                        return (
                                            <Alert key={index} variant={message.variant} dismissible onClose={() => handleCloseMessage(message, index)}>{message.label}</Alert>
                                        )
                                    })
                                }
                                <Table size="sm" striped hover>
                                    <thead>
                                        <tr>
                                            <th style={{ width: "1%" }}>
                                                <Form.Check type="checkbox" checked={isCheckedAll} onChange={handleCheckAll} />
                                            </th>
                                            {columns.map(column => (
                                                <th key={column.index} style={{ width: column.width }}>
                                                    {column.label}
                                                    {column.inputable && <>
                                                        <Button className="ms-2" size="sm" variant="primary" onClick={() => handleSaveInputableColumn(column)}>
                                                            Lưu
                                                        </Button>
                                                    </>}
                                                </th>
                                            ))}
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
                                <div className="d-flex justify-content-end">
                                    <Button variant="primary" className="me-2" onClick={handleAddItem}>{addNewLabel ?? 'Add New'}</Button>
                                    <Button variant="danger" className="me-2">{deleteSelectedsLabel ?? 'Delete Selecteds'}</Button>
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </>
    );
}

export default DataGrid;
