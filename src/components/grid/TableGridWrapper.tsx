import React, { useEffect, useState } from "react";
import { TableGrid } from "./TableGrid";
import { TableGridSettings } from "@/types/TableGridSettings";
import { getSettingsByController } from "@/api/settings";

interface TableGridWrapperProps {
  controller: string;
}

export const TableGridWrapper: React.FC<TableGridWrapperProps> = ({ controller }): React.ReactElement => {
  const [hostname, setHostname] = useState<string | null>(null);
  const [settings, setSettings] = useState<TableGridSettings | null>(null);

  useEffect(() => {
    const h = window.location.hostname;
    setHostname(h);

    const s = getSettingsByController(controller, h);
    setSettings(s);
  }, [controller]);

  if (!hostname || !settings) {
    return <h1>Not Found</h1>;
  }

  return <TableGrid controller={controller} settings={settings} />;
};
