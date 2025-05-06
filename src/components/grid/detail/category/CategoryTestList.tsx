// components/grid/detail/category/CategoryTestList.tsx
import { Button, Col } from "react-bootstrap";

interface Props {
  tests: any[];
  item: any;
}

export const CategoryTestList: React.FC<Props> = ({ tests, item }) => {
  if (!tests.length) {
    return <Col sm={12} className="p-3">Không có đề thi</Col>;
  }
  return (
    <>
      {tests.map((test, index) => (
        <Col sm={12} key={test.id} className="mt-3 mb-3">
          <h5>
            {index + 1}. #{test.id}{" "}
            <span dangerouslySetInnerHTML={{ __html: test.name }} /> /{" "}
            <em dangerouslySetInnerHTML={{ __html: test.name_en }} /> - Số thứ tự: {test.ordering} -{" "}
            {test.status === "1" ? "Đã kích hoạt" : "Chưa kích hoạt"}{" "}
            <Button variant="primary" href={`/Table/admin_test/${test.id}/edit?backHref=/Table/admin_category/${item.id}/detail`}>
              Sửa
            </Button>{" "}
            <Button variant="primary" href={`/Table/admin_test/${test.id}/detail?backHref=/Table/admin_category/${item.id}/detail`}>
              Chi tiết
            </Button>{" "}
            <Button variant="danger">Xóa</Button>
          </h5>
        </Col>
      ))}
    </>
  );
};
