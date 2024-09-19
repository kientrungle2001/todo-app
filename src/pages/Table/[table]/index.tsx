import { HistoryPaymentSettings } from "@/api/settings/HistoryPaymentSettings";
import { StudentSettings } from "@/api/settings/StudentSettings";
import { UserSettings } from "@/api/settings/UserSettings";
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
    } else if (table === "user") {
        return <>
            <TableGrid settings={UserSettings} />
        </>
    } else if (table === "history_payment") {
        return <>
            <TableGrid settings={HistoryPaymentSettings} />
        </>
    }
    return <div>Not found</div>;
}