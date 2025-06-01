// components/grid/detail/renderer/TableGridDetailRendererDetail.tsx
import React, { useEffect, useState } from "react";
import { TableGridDetail, DataGridDetailField } from "../../TableGrid";
import { TableGridSettings } from "../../../../types/TableGridSettings";
import { tableRepository } from "@/api/repositories/Table";
import { Row } from "react-bootstrap";

import { DetailLabel } from "./DetailLabel";
import { DetailFieldsList } from "./DetailFieldsList";

interface Props {
  itemId: number;
  controller: string;
  settings: TableGridSettings;
  detail: TableGridDetail;
}

export const TableGridDetailRendererDetail: React.FC<Props> = ({
  controller,
  settings,
  itemId,
  detail,
}) => {
  const [item, setItem] = useState<any>(null);

  useEffect(() => {
    tableRepository.getItem(settings, itemId).then((resp) => {
      setItem(resp?.data ?? null);
    });
  }, [itemId]);

  if (!item) return null;

  return (
    <>
      <DetailLabel label={detail.label} />
      <Row>
        <DetailFieldsList fields={detail.fields || []} item={item} table={settings.table} />
      </Row>
    </>
  );
};
