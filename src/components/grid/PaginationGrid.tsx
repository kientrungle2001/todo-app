import { Form, Pagination } from "react-bootstrap";
import { DataGridPagination } from "./DataGrid";

interface PaginationGridProps {
    pagination?: DataGridPagination;
    totalItems: number;
    setCurrentPage: (page: number) => void;
    setPageSize: (pageSize: number) => void;
}

export const PaginationGrid: React.FC<PaginationGridProps> = ({ pagination, setCurrentPage, setPageSize, totalItems }) => {
    if (!pagination) return <></>;
    let totalPages = Math.ceil(totalItems / pagination.pageSize);
    let pages = [];
    pages.push(1);
    for(let i = pagination.currentPage - 5; i <= pagination.currentPage + 4; i++) {
        if(i > 1 && i < totalPages) {
            pages.push(i);
        }
    }
    pages.push(totalPages);
    return <>
        Số mục: <Form.Select size="sm" value={pagination.pageSize} onChange={(event) => {
            setPageSize(parseInt(event.target.value));
        }} style={{ width: "auto", display: "inline-block" }}>
            <option value={10}>10</option>
            <option value={20}>20</option>
            <option value={50}>50</option>
            <option value={100}>100</option>
            <option value={200}>200</option>
            <option value={500}>500</option>
            <option value={1000}>1000</option>
            <option value={2000}>2000</option>
            <option value={5000}>5000</option>
        </Form.Select> Trang:
        <Pagination size="sm" style={{ display: "inline-flex" }} className="ms-2 me-2 mb-0">
            {/* Previous button */}
            <Pagination.Prev />
            {
                pages.map(page => (
                    <Pagination.Item active={page === pagination.currentPage} key={page} onClick={() => setCurrentPage(page)}>
                        {page}
                    </Pagination.Item>
                ))
            }
            {/* Next button */}
            <Pagination.Next />
        </Pagination>
        ({totalItems} bản ghi)
    </>
}