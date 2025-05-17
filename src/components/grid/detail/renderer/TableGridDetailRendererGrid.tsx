import React, { useEffect, useState } from "react";
import { Row } from "react-bootstrap";
import { tableRepository } from "@/api/repositories/Table";
import { DetailLabel } from "./DetailLabel";
import { useDefaultFilters } from "./useDefaultFilters";
import { TableGridDetailWrapper } from "./TableGridDetailWrapper";

interface Props {
  itemId: number;
  controller: string;
  settings: any;
  detail: any;
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
      <TableGridDetailWrapper
        detail={detail}
        controller={controller}
        settings={settings}
        item={item}
        defaultFilters={defaultFilters}
      />
    </>
  );
};
