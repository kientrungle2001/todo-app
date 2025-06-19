import React from "react";
import { Col, Container, Form, Row } from "react-bootstrap";
import { useRouter } from "next/router";
import { DataGridEditField } from "@/types/edit/DataGridEditField";
import { DataGridEditMode } from "@/types/edit/DataGridEditMode";
import { TestHeader } from "./TestHeader";
import { TestForm } from "./TestForm";
import { TestQuestionList } from "./TestQuestionList";
import { TestContentEditor } from "./TestContentEditor";
import { useLoadTestQuestions } from "./useLoadTestQuestions";

interface TestGridEditProps {
  mode: DataGridEditMode;
  table: string;
  itemId?: number;
  addNewLabel?: string;
  updateLabel?: string;
  fields: DataGridEditField[];
  item: any;
  setItem: (item: any) => void;
  handleUpdateItem?: (item: any, fields: DataGridEditField[], event: React.FormEvent<HTMLFormElement>) => void;
  handleCancelEdit?: () => void;
  handleAddItem?: (item: any, fields: DataGridEditField[], event: React.FormEvent<HTMLFormElement>) => void;
  handleCancelAdd?: () => void;
}

const TestGridEdit: React.FC<TestGridEditProps> = ({
  mode,
  table,
  itemId,
  addNewLabel,
  updateLabel,
  fields,
  item,
  setItem,
  handleUpdateItem,
  handleCancelEdit,
  handleAddItem,
  handleCancelAdd,
}) => {
  const router = useRouter();
  const { questions, setQuestions } = useLoadTestQuestions(itemId);

  const handleAddQuestion = () => {
    window.location.href = (
      `/Table/admin_question2/add?backHref=/Table/admin_test/${item.id}/detail` +
      `&field_testId=${item.id}&field_questionType=1&field_status=1&field_categoryIds=${item.categoryIds}`
    );
  };

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    item.questions = questions;
    if (mode === DataGridEditMode.EDIT && handleUpdateItem) {
      handleUpdateItem(item, fields, event);
    }
    if (mode === DataGridEditMode.ADD && handleAddItem) {
      handleAddItem(item, fields, event);
    }
  };

  return (
    <Container fluid>
      <TestHeader
        mode={mode}
        itemId={itemId}
        addNewLabel={addNewLabel}
        handleCancelAdd={handleCancelAdd}
        handleCancelEdit={handleCancelEdit}
      />

      <Row>
        <Col md={12}>
          <Form onSubmit={onSubmit}>
            <TestForm
              mode={mode}
              item={item}
              handleAddQuestion={handleAddQuestion}
              fields={fields}
              handleCancelAdd={handleCancelAdd}
              handleCancelEdit={handleCancelEdit}
            />

            <TestQuestionList questions={questions} item={item} />
            <TestContentEditor value={item.content} updateValue={(value) => (item.content = value)} />
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default TestGridEdit;