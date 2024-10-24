import { FullLookStudentSettings } from "@/api/settings/FullLookStudentSettings";
import { TableGrid } from "@/components/grid/TableGrid";
import React from "react";

export default function TableUsers(): React.ReactElement {
    return <>
        <TableGrid controller="admin_student" settings={FullLookStudentSettings} />
    </>
}