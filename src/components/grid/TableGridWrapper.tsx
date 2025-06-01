import React, { useEffect } from "react";
import { TableGrid } from "./TableGrid";
import { TableGridSettings } from "../../types/TableGridSettings";
import { getSettingsByController } from "@/api/settings";

interface TableGridWrapperProps { controller: string; }

export const TableGridWrapper: React.FC<TableGridWrapperProps> = ({ controller }): React.ReactElement => {
    const [hostname, setHostname] = React.useState<string | null>(null);

    useEffect(() => { setHostname(window.location.hostname); }, []);
    if (null === hostname) return <h1>Not Found</h1>

    let settings: TableGridSettings | null = getSettingsByController(controller as string, hostname);
    if (null === settings) return <h1>Not Found</h1>

    return <TableGrid controller={controller} settings={settings} />
}
