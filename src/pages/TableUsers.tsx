import { StudentSettings } from "@/api/settings/StudentSettings";
import { TableGrid } from "@/components/grid/TableGrid";
import React from "react";

export default function TableUsers(): React.ReactElement {
    return <>
        <TableGrid controller="admin_student" settings={StudentSettings} />
    </>
}