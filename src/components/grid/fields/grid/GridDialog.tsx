import React, { useState, useEffect } from 'react';
import { Button, Modal, Row, Col, Card } from 'react-bootstrap';
import { useRouter } from 'next/router';
import { TableGridSettings } from '../../TableGrid';
import { DataGridColumn, DataGridFilterColumn, DataGridMessage, DataGridPagination, DataGridSort, DataGridSortOption, DataGridTableJoin } from "@/components/grid/DataGridColumnTypes";
import { buildTree, flatTree } from "@/api/tree";
import { storage } from "@/api/storage";
import { tableRepository } from "@/api/repositories/Table";
import { DataGridEditField } from '../../DataGridEditTypes';
import GridDataGrid from './GridDataGrid';

interface GridDialogProps {
    field: DataGridEditField;
    show: boolean;
    value: any;
    onClose: () => void;
    onSelect: (item: any) => void;
    settings: TableGridSettings;
}

export const GridDialog: React.FC<GridDialogProps> = ({ field, value, show, onClose, onSelect, settings }) => {
    const [selectedItem, setSelectedItem] = useState<string | null>();
    const router = useRouter();

    const [pagination, setPagination] = React.useState<DataGridPagination>(settings.pagination);
    const [items, setItems] = React.useState<any[]>([]);
    const [totalItems, setTotalItems] = React.useState<number>(0);
    const [filterData, setFilterData] = React.useState<any>({});
    const [searchText, setSearchText] = React.useState("");
    const [sorts, setSorts] = React.useState<DataGridSort[]>(settings.defaultSorts);
    const [messages, setMessages] = React.useState<DataGridMessage[]>([]);
    const [isCheckedAll, setIsCheckedAll] = React.useState<boolean>(false);
    const [checkedItemIds, setCheckedItemIds] = React.useState<number[]>([]);
    const [sortData, setSortData] = React.useState<any>({});

    const setCurrentPage = (page: number) => { setPagination({ ...pagination, currentPage: page }); };
    const setPageSize = (pageSize: number) => { setPagination({ ...pagination, pageSize: pageSize, currentPage: 1 }); };
    const setSavedFilterData = (data: any) => { storage.set((field.index + '.' + settings.table) + '.filterData', data); };

    useEffect(() => {
        const savedFilterData = storage.get((field.index + '.' + settings.table) + '.filterData');
        if (savedFilterData) {
            setFilterData(savedFilterData.filterData);
            setSortData(savedFilterData.sortData);
            setPagination({ pageSize: savedFilterData.pageSize, currentPage: savedFilterData.currentPage });
            setSearchText(savedFilterData.searchText);
        }
    }, []);

    useEffect(() => {
        setSavedFilterData({ filterData, sortData, searchText, currentPage: pagination.currentPage, pageSize: pagination.pageSize, sorts });
    }, [filterData, sortData, searchText, pagination.currentPage, pagination.pageSize, sorts]);

    const handleDeleteItem = (item: any) => {
        // Implement your delete logic here
        if (window.confirm(`Are you sure you want to delete item with ID: ${item.id}?`)) {
            console.log(`Deleting item with ID: ${item.id}`);
            tableRepository.deleteItem(settings, item).then(() => {
                handleAfterDelete(item);
            });
        }
    };

    const handleAfterDelete = (item: any) => {
        let updatedMessages: DataGridMessage[] = [...messages];
        updatedMessages.push({
            label: `Item #${item.id} has been deleted successfully`,
            variant: "success"
        });
        setMessages(updatedMessages);
        handleListItems();
    };

    const handleAfterChangeStatus = (column: DataGridColumn, item: any) => {
        handleListItems();
    }

    const handleAfterSaveInputableColumn = (column: DataGridColumn) => {
        let updatedMessages: DataGridMessage[] = [...messages];
        updatedMessages.push({
            label: `Column #${column.label} has been updated successfully`,
            variant: "success"
        });
        setMessages(updatedMessages);
        handleListItems();
    }

    const handleListItems = () => {
        let sortDatas: DataGridSort[] = [];
        for (var field in sortData) {
            sortDatas.push({
                index: field,
                direction: sortData[field]
            });
        }
        tableRepository.getList(settings, {
            settings: JSON.parse(JSON.stringify(settings)),
            search: searchText, filterData: JSON.parse(JSON.stringify(filterData)),
            sorts: JSON.parse(JSON.stringify(sortDatas.length ? sortDatas : sorts)),
            page: pagination.currentPage, pageSize: pagination.pageSize
        })
            .then((resp: any) => {
                if (settings.treeMode)
                    setItems(flatTree(buildTree(resp && resp.data ? resp.data.items : [],
                        settings.treeParentField ?? 'parent')));
                else
                    setItems(resp && resp.data ? resp.data.items : []);
                setTotalItems(resp && resp.data ? resp.data.totalItems : 0);
                setIsCheckedAll(false);
                setCheckedItemIds([]);
            });
    };


    useEffect(() => { setPagination({ ...pagination, currentPage: 1 }); }, [searchText, filterData]);

    useEffect(() => {
        const handler = setTimeout(() => { handleListItems(); }, 300);
        return () => { clearTimeout(handler); };
    }, [pagination, searchText, sorts, filterData, sortData]);

    // Handle folder navigation and file selection
    const handleItemClick = (item: any) => {

    };

    useEffect(() => {
        if (show) {

        }
    }, [show, selectedItem]);

    return (
        <Modal show={show} onHide={onClose} size="xl">
            <Modal.Header closeButton>
                <Modal.Title>Select Image</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <GridDataGrid
                    title={settings.title}
                     table={settings.table} defaultSorts={settings.defaultSorts}
                    software={settings.software} site={settings.site}
                    pagination={pagination} totalItems={totalItems} setCurrentPage={setCurrentPage} setPageSize={setPageSize}
                    columns={settings.columns} filters={settings.filters}
                    sortOptions={settings.sortOptions} sorts={sorts} setSorts={setSorts}
                    items={items}
                    filterData={filterData} setFilterData={setFilterData}
                    searchText={searchText} setSearchText={setSearchText}
                    onDeleteItem={handleDeleteItem} onAfterChangeStatus={handleAfterChangeStatus}
                    onAfterSaveInputableColumn={handleAfterSaveInputableColumn}
                    isCheckedAll={isCheckedAll} setIsCheckedAll={setIsCheckedAll}
                    checkedItemIds={checkedItemIds} setCheckedItemIds={setCheckedItemIds}
                    addNewLabel={settings.addNewLabel} deleteSelectedsLabel={settings.deleteSelectedsLabel}
                    sortData={sortData} setSortData={setSortData}
                />
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onClose}>
                    Cancel
                </Button>
                <Button
                    variant="primary"
                    disabled={!selectedItem}
                    onClick={() => selectedItem && onSelect(selectedItem)}
                >
                    Done
                </Button>
            </Modal.Footer>
        </Modal>
    );
};
