import React, { useEffect } from "react";
import { TableGridSettings } from "@/types/TableGridSettings";
import { getSettingsByController } from "@/api/settings";
import { TableGridAdd } from "./TableGridAdd";

interface TableGridWrapperProps {
    controller: string;
}

export const TableGridAddWrapper: React.FC<TableGridWrapperProps> = ({ controller }): React.ReactElement => {
    const [hostname, setHostname] = React.useState<string | null>(null);

    useEffect(() => { setHostname(window.location.hostname); }, []);
    if (null === hostname) return <h1>Not Found</h1>;

    let settings: TableGridSettings | null = getSettingsByController(controller, hostname);
    if (null === settings) return <h1>Not Found</h1>;

    return <TableGridAdd controller={controller} settings={settings} />
}
