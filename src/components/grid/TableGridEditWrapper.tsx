import React, { useEffect } from "react";
import { TableGridSettings } from "./TableGrid";
import { getSettingsByController } from "@/api/settings";
import { TableGridEdit } from "./TableGridEdit";

interface TableGridWrapperProps {
    controller: string;
    itemId: number;
}

export const TableGridEditWrapper: React.FC<TableGridWrapperProps> = ({ controller, itemId }): React.ReactElement => {
    const [hostname, setHostname] = React.useState<string | null>(null);
    
    useEffect(() => {
        setHostname(window.location.hostname);
    }, []);
    if (null === hostname) {
        return (<>
            <h1>Not Found</h1>
        </>)
    }
    let settings: TableGridSettings | null = getSettingsByController(controller as string, hostname);
    if (null === settings) return (<>
        <h1>Not Found</h1>
    </>)
    return <TableGridEdit controller={controller} settings={settings} itemId={itemId}  />
}
