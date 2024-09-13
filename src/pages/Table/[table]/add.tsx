import { UserSettings } from "@/api/settings/UserSettings";
import { TableGridAdd } from "@/components/grid/TableGridAdd";
import { useRouter } from "next/router";
import React from "react";

export default function TableAdd(): React.ReactElement {
    let router = useRouter();
    const { table } = router.query;
    if (table === "student") {
        return <>
            <TableGridAdd settings={UserSettings} />
        </>
    }
    return <div>Not found</div>;
}