// components/grid/detail/category/CategoryQuestionList.tsx
import { Col } from "react-bootstrap";
import { CategoryDetailQuestion } from "./CategoryDetailQuestion";

interface Props {
  questions: any[];
  item: any;
  hostConfig?: any;
}

export const CategoryQuestionList: React.FC<Props> = ({ questions, item, hostConfig }) => {
  if (!questions.length) {
    return <Col sm={12} className="p-3">Không có câu hỏi</Col>;
  }
  return (
    <>
      {questions.map((question, index) => (
        <CategoryDetailQuestion
          key={question.id}
          question={question}
          index={index}
          item={item}
          hostConfig={hostConfig}
        />
      ))}
    </>
  );
};
