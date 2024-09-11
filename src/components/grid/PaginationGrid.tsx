import { Form, Pagination } from "react-bootstrap";

export default function PaginationGrid() {
    return <>
        Số mục: <Form.Select size="sm" value={200} style={{ width: "auto", display: "inline-block" }}>
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

            <Pagination.Item active>1</Pagination.Item>
            <Pagination.Item>2</Pagination.Item>
            <Pagination.Item>3</Pagination.Item>

            {/* Next button */}
            <Pagination.Next />
        </Pagination>
        (2 bản ghi)
    </>
}