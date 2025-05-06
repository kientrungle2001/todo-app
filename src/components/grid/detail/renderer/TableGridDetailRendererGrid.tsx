// components/grid/detail/renderer/TableGridDetailRendererGrid.tsx
import React, { useEffect, useState } from "react";
import { Row } from "react-bootstrap";
import { TableGrid, TableGridSettings, TableGridDetail } from "../../TableGrid";
import { tableRepository } from "@/api/repositories/Table";
import { useDefaultFilters } from "./useDefaultFilters";
import { DetailLabel } from "./DetailLabel";

interface Props {
  itemId: number;
  controller: string;
  settings: TableGridSettings;
  detail: TableGridDetail;
}

export const TableGridDetailRendererGrid: React.FC<Props> = ({ controller, settings, itemId, detail }) => {
  const [item, setItem] = useState<any>(null);

  useEffect(() => {
    tableRepository.getItem(settings, itemId).then((resp: any) => {
      setItem(resp?.data ?? null);
    });
  }, [itemId]);

  const defaultFilters = useDefaultFilters(detail, itemId, item);

  if (!item) return null;

  return (
    <>
      <DetailLabel label={detail.label} />
      <Row>
        {detail.settings && (
          <TableGrid
            controller={detail.controller as string}
            settings={detail.settings}
            defaultFilters={defaultFilters}
            parentController={controller}
            parentSettings={settings}
            parentItem={item}
          />
        )}
      </Row>
    </>
  );
};
