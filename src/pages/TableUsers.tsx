import { UserSettings } from "@/api/settings/UserSettings";
import { TableGrid } from "@/components/grid/TableGrid";
import React from "react";

export default function TableUsers(): React.ReactElement {
    return <>
        <TableGrid settings={UserSettings} />
    </>
}