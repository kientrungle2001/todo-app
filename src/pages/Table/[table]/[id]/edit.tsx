import { HistoryPaymentSettings } from "@/api/settings/HistoryPaymentSettings";
import { StudentSettings } from "@/api/settings/StudentSettings";
import { UserSettings } from "@/api/settings/UserSettings";
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
    } else if (table === "user") {
        return <>
            <TableGridEdit itemId={itemId} settings={UserSettings} />
        </>
    } else if (table === "history_payment") {
        return <>
            <TableGridEdit itemId={itemId} settings={HistoryPaymentSettings} />
        </>
    }
    return <div>Not found</div>;
}