import React from "react";
import { TableGrid, TableGridSettings } from "./TableGrid";
import { getSettingsByController } from "@/api/settings";

interface TableGridWrapperProps {
    controller: string;
}

export const TableGridWrapper: React.FC<TableGridWrapperProps> = ({ controller }): React.ReactElement => {
    const hostname = window.location.hostname;
    let settings: TableGridSettings | null = getSettingsByController(controller as string, hostname);
    return <TableGrid controller={controller} settings={settings} />
}
