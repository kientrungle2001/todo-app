import { Card, Col, Container, Row } from "react-bootstrap";
import { FiltersGridCard } from "../../../../components/grid/filters/FilterGridCard";
import { GridTableWrapper } from "./GridTableWrapper";

interface Props {
    title: string;
    table: string;
    software?: number;
    site?: number;
    columns: any[];
    items: any[];
    totalItems: number;
    filters?: any[];
    defaultSorts?: any[];
    sortOptions?: any[];
    pagination?: any;
    sorts: any[];
    setSorts: (sorts: any[]) => void;
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

const GridDataGrid: React.FC<Props> = ({
    title,
    table,
    software,
    site,
    columns,
    items,
    totalItems,
    filters = [],
    defaultSorts,
    sortOptions,
    pagination,
    sorts,
    setSorts,
    searchText,
    setSearchText,
    filterData,
    setFilterData,
    setCurrentPage,
    setPageSize,
    sortData,
    setSortData,
    selectedItem,
    setSelectedItem,
}) => {
    return (
        <Container fluid className="mb-0 mt-0">
            <Row className="g-0">
                <Col sm={12} md={12} lg={12}>
                    <FiltersGridCard
                        filters={filters}
                        sortOptions={sortOptions}
                        filterData={filterData}
                        setFilterData={setFilterData}
                        searchText={searchText}
                        setSearchText={setSearchText}
                        sorts={sorts}
                        setSorts={setSorts}
                        defaultSorts={defaultSorts}
                    />
                </Col>
                <Col sm={12} md={12} lg={12}>
                    <Card className="border-0">
                        <Card.Body className="border-0 pt-0">
                            <Card.Title className="d-flex justify-content-between align-items-center">
                                <span>{title}</span>
                            </Card.Title>

                            <GridTableWrapper
                                table={table}
                                columns={columns}
                                items={items}
                                sortData={sortData}
                                setSortData={setSortData}
                                selectedItem={selectedItem}
                                setSelectedItem={setSelectedItem}
                                pagination={pagination}
                                totalItems={totalItems}
                                setCurrentPage={setCurrentPage}
                                setPageSize={setPageSize}
                            />
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default GridDataGrid;
