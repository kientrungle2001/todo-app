
// QuestionHeader.tsx
import { Button } from "react-bootstrap";

interface QuestionHeaderProps {
    question: any;
    index: number;
    itemId: number;
}

export const QuestionHeader: React.FC<QuestionHeaderProps> = ({ question, index, itemId }) => (
    <h5>
        {index + 1}. Mã câu hỏi #{question.id} - Số thứ tự: {question.ordering} - {question.status === '1' ? 'Đã kích hoạt' : 'Chưa kích hoạt'}
        <Button variant="primary" href={`/Table/admin_question2/${question.id}/edit?backHref=/Table/admin_course_resource/${itemId}/detail`}>
            Sửa
        </Button>
        <Button variant="danger">Xóa</Button>
    </h5>
);