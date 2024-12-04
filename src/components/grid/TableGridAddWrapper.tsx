import React from "react";
import { TableGridSettings } from "./TableGrid";
import { getSettingsByController } from "@/api/settings";
import { TableGridAdd } from "./TableGridAdd";

interface TableGridWrapperProps {
    controller: string;
}

export const TableGridAddWrapper: React.FC<TableGridWrapperProps> = ({ controller }): React.ReactElement => {
    const hostname = window.location.hostname;
    let settings: TableGridSettings | null = getSettingsByController(controller as string, hostname);
    if (null === settings) return (<>
        <h1>Not Found</h1>
    </>)
    return <TableGridAdd controller={controller} settings={settings} />
}
