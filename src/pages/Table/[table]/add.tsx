import { HistoryPaymentSettings } from "@/api/settings/HistoryPaymentSettings";
import { StudentSettings } from "@/api/settings/StudentSettings";
import { UserSettings } from "@/api/settings/UserSettings";
import { TableGridAdd } from "@/components/grid/TableGridAdd";
import { useRouter } from "next/router";
import React from "react";

export default function TableAdd(): React.ReactElement {
    let router = useRouter();
    const { table } = router.query;
    if (table === "student") {
        return <>
            <TableGridAdd settings={StudentSettings} />
        </>
    } else if (table === "user") {
        return <>
            <TableGridAdd settings={UserSettings} />
        </>
    } else if (table === "history_payment") {
        return <>
            <TableGridAdd settings={HistoryPaymentSettings} />
        </>
    }
    return <div>Not found</div>;
}