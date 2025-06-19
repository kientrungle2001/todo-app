// components/grid/detail/category/CategoryGridEdit.tsx
import React, { useEffect, useState } from "react";
import { Container, Row } from "react-bootstrap";
import { useRouter } from "next/router";
import { getConfigsByHostName } from "@/api/defaultSettings";
import { categoryRepository } from "@/api/repositories/Category";

import { CategoryHeader } from "./CategoryHeader";
import { CategoryTabs } from "./CategoryTabs";

interface Props {
  itemId: number;
  item: any;
  handleCancelEdit: () => void;
}

const CategoryGridEdit: React.FC<Props> = ({ itemId, item, handleCancelEdit }) => {
  const [questions, setQuestions] = useState<any[]>([]);
  const [tests, setTests] = useState<any[]>([]);
  const [hostConfig, setHostConfig] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    categoryRepository.getQuestions(itemId).then((resp: any) => setQuestions(resp.data));
    const config = getConfigsByHostName();
    setHostConfig(config);

    if (config?.appName !== "pmtv") {
      categoryRepository.getTests(itemId).then((resp: any) => setTests(resp.data)).catch(() => {});
    }
  }, [item]);

  const handleAddQuestion = () => {
    window.location.href = (`/Table/admin_question2/add?backHref=/Table/admin_category/${item.id}/detail&field_categoryIds=${item.parents}&field_status=1&field_questionType=1`);
  };

  const handleAddTest = () => {
    window.location.href = (`/Table/admin_test/add?backHref=/Table/admin_category/${item.id}/detail&field_categoryIds=${item.parents}&field_status=1`);
  };

  return (
    <Container fluid>
      <CategoryHeader itemId={itemId} item={item} hostConfig={hostConfig} handleCancelEdit={handleCancelEdit} />
      <CategoryTabs
        item={item}
        hostConfig={hostConfig}
        questions={questions}
        tests={tests}
        handleAddQuestion={handleAddQuestion}
        handleAddTest={handleAddTest}
      />
    </Container>
  );
};

export default CategoryGridEdit;
