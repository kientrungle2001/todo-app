import { UserSettings } from "@/api/settings/UserSettings";
import { TableGrid } from "@/components/grid/TableGrid";
import { useRouter } from "next/router";
import React from "react";

export default function TableIndex(): React.ReactElement {
    let router = useRouter();
    const { table } = router.query;
    if (table === "student") {
        return <>
            <TableGrid settings={UserSettings} />
        </>
    }
    return <div>Not found</div>;
}