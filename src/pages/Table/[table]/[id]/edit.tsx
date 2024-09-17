import { StudentSettings } from "@/api/settings/StudentSettings";
import { TableGridEdit } from "@/components/grid/TableGridEdit";
import { useRouter } from "next/router";
import React from "react";

export default function TableEdit(): React.ReactElement {
    let router = useRouter();
    const { table } = router.query;
    const { id } = router.query;
    if (!id || typeof id !== "string") {
        return <div>Invalid ID</div>;
    }
    const itemId: number = parseInt(id);
    if (table === "student") {
        return <>
            <TableGridEdit itemId={itemId} settings={StudentSettings} />
        </>
    }
    return <div>Not found</div>;
}