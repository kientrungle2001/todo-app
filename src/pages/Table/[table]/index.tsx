import { StudentSettings } from "@/api/settings/StudentSettings";
import { TableGrid } from "@/components/grid/TableGrid";
import { useRouter } from "next/router";
import React from "react";

export default function TableIndex(): React.ReactElement {
    let router = useRouter();
    const { table } = router.query;
    if (table === "student") {
        return <>
            <TableGrid settings={StudentSettings} />
        </>
    }
    return <div>Not found</div>;
}