// components/grid/detail/question/QuestionAnswerGridEdit.tsx
import React, { useEffect, useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { useRouter } from "next/router";
import { getAxios } from "@/api/axiosInstance";
import { storage } from "@/api/storage";
import { getConfigsByHostName, replaceMediaUrl } from "@/api/defaultSettings";
import { DataGridEditField, DataGridEditMode } from "../../DataGridEditTypes";

import { QuestionAnswerHeader } from "./QuestionAnswerHeader";
import { AnswerList } from "./AnswerList";
import { ExplanationEditor } from "./ExplanationEditor";

interface Props {
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

const QuestionAnswerGridEdit: React.FC<Props> = ({
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
  const [answers, setAnswers] = useState<any[]>([]);
  const [appName, setAppName] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const config = getConfigsByHostName(window.location.hostname);
    setAppName(config.appName);
  }, []);

  useEffect(() => {
    getAxios(window.location.hostname)
      .post(`/questions/answers/${itemId}`, {}, {
        headers: { Authorization: `Bearer ${storage.get("token") || ""}` },
      })
      .then((resp: any) => {
        setAnswers(resp.data.length > 0 ? resp.data : [{
          id: "uid" + Math.floor(Math.random() * 1000000),
          content: "",
          content_vn: "",
          status: "0",
        }]);
      })
      .catch((err: any) => {
        if (err.response?.status === 401 && err.response.data.error === "Invalid token") {
          storage.clearTokenInfo();
          router.push("/login");
        }
      });
  }, [item]);

  const handleAddAnswer = () => {
    setAnswers([...answers, {
      id: "uid" + Math.floor(Math.random() * 1000000),
      content: "",
      content_vn: "",
      status: "0",
    }]);
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    item.answers = answers;
    if (mode === DataGridEditMode.EDIT) handleUpdateItem?.(item, fields, e);
    if (mode === DataGridEditMode.ADD) handleAddItem?.(item, fields, e);
  };

  if (!appName) return <h1>Not Found</h1>;

  return (
    <Container fluid>
      <QuestionAnswerHeader
        mode={mode}
        itemId={itemId}
        addNewLabel={addNewLabel}
        handleCancelEdit={handleCancelEdit}
        handleCancelAdd={handleCancelAdd}
      />

      <Form onSubmit={onSubmit}>
        <Row>
          <Col md={6}>
            <div dangerouslySetInnerHTML={{ __html: replaceMediaUrl(item.name) }} />
          </Col>
          {appName !== "pmtv" && (
            <Col md={6}>
              <div dangerouslySetInnerHTML={{ __html: replaceMediaUrl(item.name_vn) }} />
            </Col>
          )}
        </Row>

        <AnswerList
          answers={answers}
          setAnswers={setAnswers}
          appName={appName}
        />

        <Col sm={12}>
          <Button variant="primary" onClick={handleAddAnswer}>+ Thêm câu trả lời</Button>
        </Col>

        <ExplanationEditor item={item} />

        <QuestionAnswerHeader
          mode={mode}
          itemId={itemId}
          addNewLabel={addNewLabel}
          handleCancelEdit={handleCancelEdit}
          handleCancelAdd={handleCancelAdd}
        />
      </Form>
    </Container>
  );
};

export default QuestionAnswerGridEdit;
