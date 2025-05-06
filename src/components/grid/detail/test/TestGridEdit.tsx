// components/grid/detail/test/TestGridEdit.tsx
import React, { useEffect, useState } from "react";
import { Col, Container, Form, Row } from "react-bootstrap";
import { useRouter } from "next/router";
import { getAxios } from "@/api/axiosInstance";
import { storage } from "@/api/storage";
import { DataGridEditField, DataGridEditMode } from "../../DataGridEditTypes";
import { replaceMediaUrl } from "@/api/defaultSettings";

import { TestHeader } from "./TestHeader";
import { TestForm } from "./TestForm";
import { TestQuestionList } from "./TestQuestionList";
import { QuestionAnswerEditor } from "../../question/QuestionAnswerEditor";

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
  const [questions, setQuestions] = useState<any[]>([]);
  const router = useRouter();

  useEffect(() => {
    getAxios(window.location.hostname)
      .post(`/tests/questions/${itemId}`, {}, {
        headers: { Authorization: `Bearer ${storage.get("token") || ""}` },
      })
      .then((resp: any) => setQuestions(resp.data))
      .catch((err: any) => {
        if (err.response?.status === 401 && err.response.data.error === "Invalid token") {
          storage.clearTokenInfo();
          router.push("/login");
        }
      });
  }, [item]);

  const handleAddQuestion = () => {
    router.push(
      `/Table/admin_question2/add?backHref=/Table/admin_test/${item.id}/detail` +
      `&field_testId=${item.id}&field_questionType=1&field_status=1&field_categoryIds=${item.categoryIds}`
    );
  };

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    if (mode === DataGridEditMode.EDIT && handleUpdateItem) {
      item.questions = questions;
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

            <Col md={12} xs={12}>
              <h2>Đề bài</h2>
              <QuestionAnswerEditor
                value={item.content}
                updateValue={(value) => (item.content = value)}
              />
            </Col>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default TestGridEdit;
