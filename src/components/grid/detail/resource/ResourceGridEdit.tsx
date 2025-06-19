// components/grid/detail/resource/ResourceGridEdit.tsx
import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { useRouter } from "next/router";
import { getConfigsByHostName } from "@/api/defaultSettings";
import { resourceRepository } from "@/api/repositories/Resource";
import { PmtvAdminCourseSettings } from "@/api/settings/pmtv/education/course/PmtvCourseSettings";

import { ResourceHeader } from "./ResourceHeader";
import { ResourceTabs } from "./ResourceTabs";

interface ResourceGridEditProps {
  itemId: number;
  item: any;
  handleCancelEdit: () => void;
}

const ResourceGridEdit: React.FC<ResourceGridEditProps> = ({ itemId, item, handleCancelEdit }) => {
  const [questions, setQuestions] = useState<any[]>([]);
  const [tests, setTests] = useState<any[]>([]);
  const [hostConfig, setHostConfig] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    resourceRepository.getQuestions(itemId).then((resp: any) => setQuestions(resp.data));
    const config = getConfigsByHostName();
    setHostConfig(config);

    if (config?.appName !== "pmtv") {
      resourceRepository.getTests(itemId).then((resp: any) => setTests(resp.data)).catch(() => {});
    }
  }, [item]);

  const handleAddQuestion = () => {
    resourceRepository.getResource(item.courseId, PmtvAdminCourseSettings).then((resp: any) => {
      const course = resp.data;
      window.location.href = (
        `/Table/admin_question2/add?backHref=/Table/admin_course_resource/${item.id}/detail` +
        `&field_categoryIds=${course.categoryId}` +
        `&field_courseId=${course.id}` +
        `&field_courseResourceId=${item.id}` +
        `&field_status=1&field_questionType=1`
      );
    });
  };

  return (
    <Container fluid>
      <ResourceHeader item={item} itemId={itemId} handleCancelEdit={handleCancelEdit} hostConfig={hostConfig} />

      <ResourceTabs
        item={item}
        questions={questions}
        handleAddQuestion={handleAddQuestion}
        hostConfig={hostConfig}
      />
    </Container>
  );
};

export default ResourceGridEdit;
