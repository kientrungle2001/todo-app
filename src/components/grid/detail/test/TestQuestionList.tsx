// components/grid/detail/test/TestQuestionList.tsx
import { Col, Row, Button } from "react-bootstrap";
import { replaceMediaUrl } from "@/api/defaultSettings";

interface TestQuestionListProps {
  questions: any[];
  item: any;
}

export const TestQuestionList: React.FC<TestQuestionListProps> = ({
  questions,
  item,
}) => (
  <>
    {questions.map((question, index) => (
      <Col md={12} key={question.id} className="mt-3 mb-3">
        <h5>
          {index + 1}. Mã câu hỏi #{question.id} - Số thứ tự: {question.ordering} -{" "}
          {question.status === "1" ? "Đã kích hoạt" : "Chưa kích hoạt"}{" "}
          <Button
            variant="primary"
            href={`/Table/admin_question2/${question.id}/edit?backHref=/Table/admin_test/${item.id}/detail`}
          >
            Sửa
          </Button>{" "}
          <Button variant="danger">Xóa</Button>
        </h5>
        <Row>
          <Col md={6}>
            <div
              dangerouslySetInnerHTML={{ __html: replaceMediaUrl(question.name) }}
            />
          </Col>
          <Col md={6}>
            <div
              dangerouslySetInnerHTML={{ __html: replaceMediaUrl(question.name_vn) }}
            />
          </Col>
        </Row>

        <Row>
          <Col md={12}>
            <h6>Đáp án</h6>
            <blockquote className="ps-3">
              <Row>
                {question.answers.map((answer: any) => (
                  <Col md={3} key={answer.id}>
                    <div
                      dangerouslySetInnerHTML={{ __html: replaceMediaUrl(answer.content) }}
                    />
                    <div
                      dangerouslySetInnerHTML={{ __html: replaceMediaUrl(answer.content_vn) }}
                    />
                  </Col>
                ))}
              </Row>
            </blockquote>
          </Col>
        </Row>
      </Col>
    ))}
  </>
);
